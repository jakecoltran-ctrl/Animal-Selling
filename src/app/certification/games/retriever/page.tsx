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
import { BadgeType, AnimalType, MatchingPair } from "@/types";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  Loader2,
  Shuffle,
} from "lucide-react";

type GameState = "intro" | "playing" | "results";

interface CardState {
  id: string;
  content: string;
  type: "trait" | "animal";
  animalType: AnimalType;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function RetrieverGamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("intro");
  const [cards, setCards] = useState<CardState[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState(0);
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
  const totalPairs = retrieverPairs.length;

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

  const initializeCards = useCallback(() => {
    const cardPairs: CardState[] = [];

    retrieverPairs.forEach((pair) => {
      // Trait card
      cardPairs.push({
        id: `trait-${pair.id}`,
        content: pair.trait,
        type: "trait",
        animalType: pair.animalType,
        isFlipped: false,
        isMatched: false,
      });
      // Animal card
      cardPairs.push({
        id: `animal-${pair.id}`,
        content: pair.animalType,
        type: "animal",
        animalType: pair.animalType,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(shuffleArray(cardPairs));
  }, []);

  const startGame = () => {
    initializeCards();
    setGameState("playing");
    setStartTime(Date.now());
    setMatchedPairs(0);
    setMoves(0);
    setSelectedCards([]);
  };

  const handleCardClick = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || selectedCards.length >= 2) return;

    // Flip the card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    // Check for match when 2 cards are selected
    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId)!;
      const secondCard = cards.find((c) => c.id === secondId)!;

      // Cards match if they have the same animalType and different types (trait vs animal)
      const isMatch =
        firstCard.animalType === secondCard.animalType &&
        firstCard.type !== secondCard.type;

      if (isMatch) {
        // Mark as matched
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setSelectedCards([]);
        }, 500);
      } else {
        // Flip back after delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // Check for game completion
  useEffect(() => {
    if (gameState === "playing" && matchedPairs === totalPairs) {
      finishGame();
    }
  }, [matchedPairs, totalPairs, gameState]);

  const finishGame = useCallback(async () => {
    if (!startTime) return;

    setSubmitting(true);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    // Calculate score based on efficiency (fewer moves = better)
    // Perfect game = totalPairs moves (each move finds a match)
    // Passing threshold is finding all matches with reasonable efficiency
    const perfectMoves = totalPairs;
    const maxReasonableMoves = totalPairs * 3; // Allow 3x perfect as maximum
    const efficiency = Math.max(0, 1 - (moves - perfectMoves) / (maxReasonableMoves - perfectMoves));
    const score = matchedPairs; // Score is just number of matches found
    const accuracy = (matchedPairs / totalPairs) * 100; // Did they find all matches?
    const passed = matchedPairs === totalPairs; // Pass if all matches found

    let badgesAwarded: BadgeType[] = [];

    // Try to save progress, but show results even if it fails
    if (userId) {
      try {
        const answersMap: Record<string, number> = {
          matchedPairs,
          moves,
          efficiency: Math.round(efficiency * 100),
        };

        const result = await updateGameProgress(
          userId,
          "retriever",
          score,
          totalPairs,
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
  }, [userId, startTime, matchedPairs, moves, totalPairs]);

  const getAnimalName = (type: AnimalType) => {
    return type === "retriever" ? "Golden Retriever" : type.charAt(0).toUpperCase() + type.slice(1);
  };

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
                    <div className="text-2xl font-bold">{totalPairs}</div>
                    <div className="text-sm text-muted-foreground">Pairs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
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
              Match each sales trait or characteristic to its correct animal type.
              Click two cards to flip them - if they match, they stay revealed!
            </p>

            <Button
              size="lg"
              className="px-12"
              style={{ backgroundColor: meta.color }}
              onClick={startGame}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === "playing") {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.1}
          emojiOpacity={0.08}
          singleAnimal={{ type: "retriever", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {matchedPairs} of {totalPairs} pairs matched
                </span>
                <span className="text-sm font-medium" style={{ color: meta.color }}>
                  {moves} moves
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(matchedPairs / totalPairs) * 100}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {cards.map((card) => {
                const isSelected = selectedCards.includes(card.id);
                const cardColor = gameMetadata[card.animalType]?.color || meta.color;

                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    disabled={card.isFlipped || card.isMatched}
                    className={`aspect-square rounded-xl border-2 transition-all duration-300 transform ${
                      card.isMatched
                        ? "border-green-500 bg-green-500/10 scale-95"
                        : card.isFlipped
                        ? "border-amber-500 bg-gray-800"
                        : "border-gray-700 bg-gray-800/80 hover:border-gray-600 hover:scale-105 cursor-pointer"
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-2">
                        {card.type === "animal" ? (
                          <>
                            <AnimalIcon type={card.animalType} size="md" />
                            <span
                              className="text-xs font-medium mt-1 text-center"
                              style={{ color: cardColor }}
                            >
                              {getAnimalName(card.animalType)}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-center text-muted-foreground leading-tight px-1">
                            {card.content}
                          </span>
                        )}
                        {card.isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 absolute top-1 right-1" />
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">❓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instructions */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Click cards to flip them. Match traits to their animal types!
            </p>
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
              {results.passed ? "Well Done!" : "Almost There!"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {results.passed
                ? "You matched all the traits correctly!"
                : "Keep trying to match all the pairs!"}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: meta.color }}>
                      {matchedPairs}/{totalPairs}
                    </div>
                    <div className="text-sm text-muted-foreground">Pairs Matched</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{moves}</div>
                    <div className="text-sm text-muted-foreground">Moves</div>
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
