"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { getCertificationStatus, CertificationStatus } from "@/lib/certification";
import { gameMetadata, badges as badgeInfo } from "@/lib/game-content";
import { GameType, BadgeType } from "@/types";
import { Trophy, Award, CheckCircle2, Lock, Play, Loader2 } from "lucide-react";

export default function CertificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<CertificationStatus | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatus() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login?redirect=/certification");
        return;
      }

      setUserId(user.id);

      try {
        const certStatus = await getCertificationStatus(user.id);
        setStatus(certStatus);
      } catch (error) {
        console.error("Error loading certification status:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const getGameStatus = (gameType: GameType) => {
    const progress = status?.progress.find((p) => p.gameType === gameType);
    return {
      played: !!progress,
      passed: progress?.passed || false,
      bestAccuracy: progress?.bestAccuracy || 0,
      attempts: progress?.attempts || 0,
    };
  };

  const hasBadge = (badgeType: BadgeType) => {
    return status?.badges.some((b) => b.badgeType === badgeType) || false;
  };

  const gameTypes: GameType[] = ["lion", "penguin", "retriever", "beaver"];

  return (
    <div className="py-12 relative overflow-hidden min-h-screen">
      <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Animal Selling <span className="text-amber-500">Certification</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Complete all four games with 80% accuracy to earn your certification.
            Test your knowledge of sales personalities, buyer types, and adaptive selling.
          </p>
          <p className="text-sm text-amber-500/80 flex items-center justify-center gap-2">
            <span className="text-lg">💡</span>
            Pro tip: Your full premium report contains all the answers you need to pass
          </p>
        </div>

        {/* Progress Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-1">Your Progress</h2>
                  <p className="text-muted-foreground">
                    {status?.completedGames || 0} of 4 games completed
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {gameTypes.map((type) => {
                    const gameStatus = getGameStatus(type);
                    const meta = gameMetadata[type];
                    return (
                      <div
                        key={type}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          gameStatus.passed
                            ? "ring-2 ring-green-500 ring-offset-2 ring-offset-background"
                            : "opacity-50"
                        }`}
                        style={{ backgroundColor: `${meta.color}20` }}
                      >
                        <AnimalIcon type={type} size="md" />
                      </div>
                    );
                  })}
                </div>

                <div className="text-center md:text-right">
                  {status?.isComplete ? (
                    <Link href="/certification/certificate">
                      <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                        <Award className="w-4 h-4 mr-2" />
                        View Certificate
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Certificate locked</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500"
                    style={{ width: `${((status?.completedGames || 0) / 4) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">The Four Games</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {gameTypes.map((type) => {
              const meta = gameMetadata[type];
              const gameStatus = getGameStatus(type);

              return (
                <Card
                  key={type}
                  className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                  style={{ borderColor: gameStatus.passed ? meta.color : undefined }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${meta.color}20` }}
                        >
                          <AnimalIcon type={type} size="md" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span style={{ color: meta.color }}>{meta.title}</span>
                            {gameStatus.passed && (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            )}
                          </CardTitle>
                          <CardDescription>{meta.name}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{meta.description}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{meta.totalQuestions} questions</span>
                      <span>{meta.estimatedTime}</span>
                    </div>

                    {gameStatus.played && (
                      <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-muted/50">
                        <div className="text-center">
                          <div className="text-lg font-bold" style={{ color: meta.color }}>
                            {gameStatus.bestAccuracy.toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Best Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{gameStatus.attempts}</div>
                          <div className="text-xs text-muted-foreground">Attempts</div>
                        </div>
                        <div className="flex-1 text-right">
                          {gameStatus.passed ? (
                            <span className="inline-flex items-center gap-1 text-green-500 text-sm font-medium">
                              <CheckCircle2 className="w-4 h-4" /> Passed
                            </span>
                          ) : (
                            <span className="text-amber-500 text-sm">Need 80% to pass</span>
                          )}
                        </div>
                      </div>
                    )}

                    <Link href={`/certification/games/${type}`}>
                      <Button
                        className="w-full group-hover:scale-[1.02] transition-transform"
                        style={{ backgroundColor: meta.color }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {gameStatus.played ? "Play Again" : "Start Game"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Badges Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Your Badges</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {Object.values(badgeInfo).map((badge) => {
              const earned = hasBadge(badge.type);
              return (
                <div
                  key={badge.type}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                    earned
                      ? "bg-gradient-to-br from-gray-800 to-gray-900"
                      : "bg-gray-900/50 opacity-40"
                  }`}
                  style={{
                    boxShadow: earned ? `0 0 0 2px ${badge.color}` : undefined
                  }}
                  title={badge.description}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <div
                    className="text-xs font-medium text-center"
                    style={{ color: earned ? badge.color : undefined }}
                  >
                    {badge.name}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {status?.badges.length || 0} of {Object.keys(badgeInfo).length} badges earned
          </p>
        </div>
      </div>
    </div>
  );
}
