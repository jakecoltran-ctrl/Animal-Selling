"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { updateGameProgress } from "@/lib/certification";
import { retrieverPairs, gameMetadata, badges } from "@/lib/game-content";
import { BadgeType, AnimalType } from "@/types";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  Loader2,
  Zap,
} from "lucide-react";

type GameState = "intro" | "playing" | "results";

interface Answer {
  traitId: string;
  selectedType: AnimalType;
  correctType: AnimalType;
  isCorrect: boolean;
}

const animalTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];

export default function RetrieverGamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{ selected: AnimalType; correct: AnimalType } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    accuracy: number;
    passed: boolean;
    badgesAwarded: BadgeType[];
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const meta = gameMetadata.retriever;
  const [traits, setTraits] = useState(retrieverPairs);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/certification/games/retriever");
        return;
      }
      setUserId(user.id);
    }
    checkAuth();
  }, [router]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    setTraits(shuffleArray(retrieverPairs));
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentIndex(0);
    setAnswers([]);
    setShowFeedback(false);
    setLastAnswer(null);
  };

  const handleTypeSelect = (selectedType: AnimalType) => {
    if (showFeedback) return;

    const trait = traits[currentIndex];
    const isCorrect = selectedType === trait.animalType;

    const answer: Answer = {
      traitId: trait.id,
      selectedType,
      correctType: trait.animalType,
      isCorrect,
    };

    setAnswers((prev) => [...prev, answer]);
    setLastAnswer({ selected: selectedType, correct: trait.animalType });
    setShowFeedback(true);

    // Auto-advance after brief feedback
    setTimeout(() => {
      if (currentIndex < traits.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setShowFeedback(false);
        setLastAnswer(null);
      } else {
        finishGame([...answers, answer]);
      }
    }, 1000);
  };

  const finishGame = useCallback(async (finalAnswers: Answer[]) => {
    if (!startTime) return;

    setSubmitting(true);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const score = finalAnswers.filter((a) => a.isCorrect).length;
    const accuracy = (score / traits.length) * 100;
    const passed = accuracy >= 80;

    let badgesAwarded: BadgeType[] = [];

    if (userId) {
      try {
        const answersMap: Record<string, string> = {};
        finalAnswers.forEach((a) => {
          answersMap[a.traitId] = a.selectedType;
        });

        const result = await updateGameProgress(
          userId,
          "retriever",
          score,
          traits.length,
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
  }, [userId, startTime, traits.length]);

  const getAnimalName = (type: AnimalType) => {
    return type === "retriever" ? "Golden Retriever" : type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getAnimalColor = (type: AnimalType) => {
    const colors: Record<AnimalType, string> = {
      lion: "#dc2626",
      penguin: "#0891b2",
      retriever: "#d97706",
      beaver: "#059669",
    };
    return colors[type];
  };

  const trait = traits[currentIndex];

  // Intro Screen
  if (gameState === "intro") {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.2}
          emojiOpacity={0.15}
          singleAnimal={{ type: "retriever", color: meta.color }}
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
                <AnimalIcon type="retriever" size="2xl" />
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
                    <div className="text-2xl font-bold">{traits.length}</div>
                    <div className="text-sm text-muted-foreground">Traits</div>
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
              You&apos;ll see traits and characteristics one at a time. Quickly categorize each one
              by clicking the animal type it belongs to. Fast-paced and fun!
            </p>

            <Button
              size="lg"
              className="px-12"
              style={{ backgroundColor: meta.color }}
              onClick={startGame}
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === "playing" && trait) {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.1}
          emojiOpacity={0.08}
          singleAnimal={{ type: "retriever", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Trait {currentIndex + 1} of {traits.length}
                </span>
                <span className="text-sm font-medium" style={{ color: meta.color }}>
                  {answers.filter((a) => a.isCorrect).length} correct
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / traits.length) * 100}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>
            </div>

            {/* Trait Card */}
            <Card className={`mb-8 transition-all duration-300 ${showFeedback ? (lastAnswer?.selected === lastAnswer?.correct ? 'border-green-500 border-2' : 'border-red-500 border-2') : ''}`}>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {trait.category === "strength" ? "💪 Strength" : "👁️ Blind Spot"}
                  </div>
                  <p className="text-2xl font-medium mb-2">{trait.trait}</p>
                  <p className="text-sm text-muted-foreground">
                    Which animal type does this describe?
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            {showFeedback && lastAnswer && (
              <div className={`text-center mb-6 py-3 px-4 rounded-lg ${lastAnswer.selected === lastAnswer.correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {lastAnswer.selected === lastAnswer.correct ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Correct!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" /> It&apos;s {getAnimalName(lastAnswer.correct)}
                  </span>
                )}
              </div>
            )}

            {/* Animal Type Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {animalTypes.map((type) => {
                const color = getAnimalColor(type);
                const isSelected = showFeedback && lastAnswer?.selected === type;
                const isCorrect = showFeedback && lastAnswer?.correct === type;

                return (
                  <button
                    key={type}
                    onClick={() => handleTypeSelect(type)}
                    disabled={showFeedback}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                      isCorrect
                        ? "border-green-500 bg-green-500/20 scale-105"
                        : isSelected && !isCorrect
                        ? "border-red-500 bg-red-500/20"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-500 hover:scale-105"
                    }`}
                    style={!showFeedback ? {
                      '--hover-border': color,
                    } as React.CSSProperties : undefined}
                  >
                    <AnimalIcon type={type} size="lg" />
                    <span className="font-medium" style={{ color: showFeedback ? undefined : color }}>
                      {getAnimalName(type)}
                    </span>
                  </button>
                );
              })}
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
          singleAnimal={{ type: "retriever", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  results.passed
                    ? "bg-gradient-to-br from-green-500 to-emerald-600"
                    : "bg-gradient-to-br from-amber-500 to-orange-600"
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
              {results.passed ? "Well Done!" : "Keep Practicing!"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {results.passed
                ? "You know your animal traits!"
                : "You need 80% to pass. Try again!"}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: meta.color }}>
                      {results.score}/{traits.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div
                      className={`text-3xl font-bold ${
                        results.passed ? "text-green-500" : "text-amber-500"
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
              <Card className="mb-8 border-2 border-amber-500/50">
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
