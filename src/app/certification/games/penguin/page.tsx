"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { updateGameProgress } from "@/lib/certification";
import { penguinProfiles, gameMetadata, badges } from "@/lib/game-content";
import { BadgeType, AnimalType } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  Loader2,
  User,
} from "lucide-react";

type GameState = "intro" | "playing" | "results";

interface Answer {
  profileId: string;
  selectedType: AnimalType;
  isCorrect: boolean;
}

const animalTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];

export default function PenguinGamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("intro");
  const [currentProfile, setCurrentProfile] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedType, setSelectedType] = useState<AnimalType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    accuracy: number;
    passed: boolean;
    badgesAwarded: BadgeType[];
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const meta = gameMetadata.penguin;
  const profiles = penguinProfiles;

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/certification/games/penguin");
        return;
      }
      setUserId(user.id);
    }
    checkAuth();
  }, [router]);

  const startGame = () => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentProfile(0);
    setAnswers([]);
    setSelectedType(null);
    setShowFeedback(false);
  };

  const handleTypeSelect = (type: AnimalType) => {
    if (showFeedback) return;
    setSelectedType(type);
  };

  const handleSubmitAnswer = () => {
    if (!selectedType) return;

    const profile = profiles[currentProfile];
    const isCorrect = selectedType === profile.correctType;

    setAnswers((prev) => [
      ...prev,
      {
        profileId: profile.id,
        selectedType,
        isCorrect,
      },
    ]);
    setShowFeedback(true);
  };

  const handleNextProfile = () => {
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile((prev) => prev + 1);
      setSelectedType(null);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };

  const finishGame = useCallback(async () => {
    if (!startTime) return;

    setSubmitting(true);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const score = answers.filter((a) => a.isCorrect).length + (selectedType ? (profiles[currentProfile].correctType === selectedType ? 1 : 0) : 0);
    const accuracy = (score / profiles.length) * 100;
    const passed = accuracy >= 80;

    let badgesAwarded: BadgeType[] = [];

    // Try to save progress, but show results even if it fails
    if (userId) {
      try {
        const answersMap: Record<string, string> = {};
        answers.forEach((a) => {
          answersMap[a.profileId] = a.selectedType;
        });

        const result = await updateGameProgress(
          userId,
          "penguin",
          score,
          profiles.length,
          timeTaken,
          answersMap
        );
        badgesAwarded = result.badgesAwarded;
      } catch (error) {
        console.error("Error saving game progress:", error);
      }
    }

    setResults({
      score,
      accuracy,
      passed,
      badgesAwarded,
    });
    setGameState("results");
    setSubmitting(false);
  }, [userId, startTime, answers, selectedType, currentProfile, profiles]);

  const profile = profiles[currentProfile];

  // Intro Screen
  if (gameState === "intro") {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.2}
          emojiOpacity={0.15}
          singleAnimal={{ type: "penguin", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => router.push("/certification")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Certification
            </Button>

            <div className="flex justify-center mb-6">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${meta.color}20` }}
              >
                <AnimalIcon type="penguin" size="2xl" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2" style={{ color: meta.color }}>
              {meta.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{meta.description}</p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{meta.totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Profiles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{meta.passingScore}%</div>
                    <div className="text-sm text-muted-foreground">To Pass</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{meta.estimatedTime}</div>
                    <div className="text-sm text-muted-foreground">Estimated</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-muted-foreground mb-8">
              Read each buyer profile carefully and identify their animal type based on
              their behavior, communication style, and priorities.
            </p>

            <Button
              size="lg"
              className="px-12"
              style={{ backgroundColor: meta.color }}
              onClick={startGame}
            >
              Start Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === "playing" && profile) {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.1}
          emojiOpacity={0.08}
          singleAnimal={{ type: "penguin", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Profile {currentProfile + 1} of {profiles.length}
                </span>
                <span className="text-sm font-medium" style={{ color: meta.color }}>
                  {answers.filter((a) => a.isCorrect).length} correct
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((currentProfile + 1) / profiles.length) * 100}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>
            </div>

            {/* Buyer Profile */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${meta.color}20` }}
                  >
                    <User className="w-6 h-6" style={{ color: meta.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Buyer Profile</h3>
                    <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    What animal type is this buyer?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {animalTypes.map((type) => {
                      const isSelected = selectedType === type;
                      const showCorrect = showFeedback && type === profile.correctType;
                      const showWrong = showFeedback && isSelected && type !== profile.correctType;
                      const typeMeta = gameMetadata[type];

                      return (
                        <button
                          key={type}
                          onClick={() => handleTypeSelect(type)}
                          disabled={showFeedback}
                          className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                            showCorrect
                              ? "border-green-500 bg-green-500/10"
                              : showWrong
                              ? "border-red-500 bg-red-500/10"
                              : isSelected
                              ? "border-cyan-500 bg-cyan-500/10"
                              : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                          }`}
                        >
                          <AnimalIcon type={type} size="md" />
                          <span className="font-medium capitalize">{type === "retriever" ? "Golden Retriever" : type}</span>
                          {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />}
                          {showWrong && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            {showFeedback && (
              <Card className="mb-6 border-2" style={{ borderColor: selectedType === profile.correctType ? "#22c55e" : "#ef4444" }}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {selectedType === profile.correctType ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium mb-1">
                        {selectedType === profile.correctType ? "Correct!" : `This is a ${profile.correctType === "retriever" ? "Golden Retriever" : profile.correctType.charAt(0).toUpperCase() + profile.correctType.slice(1)} buyer`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {profile.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedType}
                  style={{ backgroundColor: selectedType ? meta.color : undefined }}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextProfile} style={{ backgroundColor: meta.color }}>
                  {currentProfile < profiles.length - 1 ? (
                    <>
                      Next Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      See Results
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (gameState === "results" && results) {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.2}
          emojiOpacity={0.15}
          singleAnimal={{ type: "penguin", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  results.passed
                    ? "bg-gradient-to-br from-green-500 to-emerald-600"
                    : "bg-gradient-to-br from-cyan-500 to-blue-600"
                }`}
              >
                {results.passed ? (
                  <Trophy className="w-12 h-12 text-white" />
                ) : (
                  <RotateCcw className="w-12 h-12 text-white" />
                )}
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2">
              {results.passed ? "Great Work!" : "Keep Practicing!"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {results.passed
                ? "You can spot buyer types like a true Connector!"
                : "You need 80% to pass. Try reading the profiles more carefully!"}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: meta.color }}>
                      {results.score}/{profiles.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div
                      className={`text-3xl font-bold ${
                        results.passed ? "text-green-500" : "text-cyan-500"
                      }`}
                    >
                      {results.accuracy.toFixed(0)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {results.passed ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500 mx-auto" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {results.passed ? "Passed" : "Not Passed"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges Awarded */}
            {results.badgesAwarded.length > 0 && (
              <Card className="mb-8 border-2 border-cyan-500/50">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Badges Earned!</h3>
                  <div className="flex justify-center gap-4">
                    {results.badgesAwarded.map((badgeType) => {
                      const badge = badges[badgeType];
                      return (
                        <div
                          key={badgeType}
                          className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900"
                        >
                          <div className="text-4xl mb-2">{badge.icon}</div>
                          <div className="text-sm font-medium" style={{ color: badge.color }}>
                            {badge.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={startGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button
                onClick={() => router.push("/certification")}
                style={{ backgroundColor: meta.color }}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Certification
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading/Submitting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}
