"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { updateGameProgress } from "@/lib/certification";
import { beaverQuestions, gameMetadata, badges } from "@/lib/game-content";
import { BadgeType } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  Loader2,
} from "lucide-react";

type GameState = "intro" | "playing" | "results";

interface Answer {
  questionId: string;
  selectedAnswer: string | boolean;
  isCorrect: boolean;
}

export default function BeaverGamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
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

  const meta = gameMetadata.beaver;
  const questions = beaverQuestions;

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/certification/games/beaver");
        return;
      }
      setUserId(user.id);
    }
    checkAuth();
  }, [router]);

  const startGame = () => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer: string | boolean) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        selectedAnswer,
        isCorrect,
      },
    ]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };

  const finishGame = useCallback(async () => {
    if (!userId || !startTime) return;

    setSubmitting(true);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const score = answers.filter((a) => a.isCorrect).length + (selectedAnswer !== null ? (questions[currentQuestion].correctAnswer === selectedAnswer ? 1 : 0) : 0);
    const accuracy = (score / questions.length) * 100;
    const passed = accuracy >= 80;

    try {
      const answersMap: Record<string, string | boolean> = {};
      answers.forEach((a) => {
        answersMap[a.questionId] = a.selectedAnswer;
      });

      const { badgesAwarded } = await updateGameProgress(
        userId,
        "beaver",
        score,
        questions.length,
        timeTaken,
        answersMap as Record<string, string | number>
      );

      setResults({
        score,
        accuracy,
        passed,
        badgesAwarded,
      });
      setGameState("results");
    } catch (error) {
      console.error("Error saving game progress:", error);
    } finally {
      setSubmitting(false);
    }
  }, [userId, startTime, answers, selectedAnswer, currentQuestion, questions]);

  const question = questions[currentQuestion];

  // Intro Screen
  if (gameState === "intro") {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.2}
          emojiOpacity={0.15}
          singleAnimal={{ type: "beaver", color: meta.color }}
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
                <AnimalIcon type="beaver" size="2xl" />
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
                    <div className="text-sm text-muted-foreground">Questions</div>
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
              Test your comprehensive knowledge of all animal types with a mix of
              true/false, multiple choice, and identification questions.
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
  if (gameState === "playing" && question) {
    return (
      <div className="py-12 relative overflow-hidden min-h-screen">
        <AnimatedBackground
          opacity={0.1}
          emojiOpacity={0.08}
          singleAnimal={{ type: "beaver", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium" style={{ color: meta.color }}>
                  {answers.filter((a) => a.isCorrect).length} correct
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>
            </div>

            {/* Question Type Badge */}
            <div className="mb-4">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
              >
                {question.type === "true_false"
                  ? "True or False"
                  : question.type === "multiple_choice"
                  ? "Multiple Choice"
                  : "Identification"}
              </span>
            </div>

            {/* Question */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${meta.color}20` }}
                  >
                    <AnimalIcon type="beaver" size="sm" />
                  </div>
                  <p className="text-lg">{question.question}</p>
                </div>

                <div className="space-y-3">
                  {question.type === "true_false" ? (
                    // True/False options
                    <>
                      {[true, false].map((value) => {
                        const isSelected = selectedAnswer === value;
                        const showCorrect = showFeedback && value === question.correctAnswer;
                        const showWrong = showFeedback && isSelected && value !== question.correctAnswer;

                        return (
                          <button
                            key={String(value)}
                            onClick={() => handleAnswerSelect(value)}
                            disabled={showFeedback}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              showCorrect
                                ? "border-green-500 bg-green-500/10"
                                : showWrong
                                ? "border-red-500 bg-red-500/10"
                                : isSelected
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  showCorrect
                                    ? "bg-green-500 text-white"
                                    : showWrong
                                    ? "bg-red-500 text-white"
                                    : isSelected
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-700 text-gray-400"
                                }`}
                              >
                                {showCorrect ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : showWrong ? (
                                  <XCircle className="w-4 h-4" />
                                ) : value ? (
                                  "T"
                                ) : (
                                  "F"
                                )}
                              </div>
                              <span className="font-medium">{value ? "True" : "False"}</span>
                            </div>
                          </button>
                        );
                      })}
                    </>
                  ) : (
                    // Multiple choice / Identification options
                    <>
                      {question.options?.map((option, index) => {
                        const isSelected = selectedAnswer === option;
                        const showCorrect = showFeedback && option === question.correctAnswer;
                        const showWrong = showFeedback && isSelected && option !== question.correctAnswer;
                        const letters = ["A", "B", "C", "D"];

                        return (
                          <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showFeedback}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              showCorrect
                                ? "border-green-500 bg-green-500/10"
                                : showWrong
                                ? "border-red-500 bg-red-500/10"
                                : isSelected
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  showCorrect
                                    ? "bg-green-500 text-white"
                                    : showWrong
                                    ? "bg-red-500 text-white"
                                    : isSelected
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-700 text-gray-400"
                                }`}
                              >
                                {showCorrect ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : showWrong ? (
                                  <XCircle className="w-4 h-4" />
                                ) : (
                                  letters[index]
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            {showFeedback && (
              <Card
                className="mb-6 border-2"
                style={{
                  borderColor: selectedAnswer === question.correctAnswer ? "#22c55e" : "#ef4444",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {selectedAnswer === question.correctAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium mb-1">
                        {selectedAnswer === question.correctAnswer ? "Correct!" : "Not quite..."}
                      </p>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
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
                  disabled={selectedAnswer === null}
                  style={{ backgroundColor: selectedAnswer !== null ? meta.color : undefined }}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} style={{ backgroundColor: meta.color }}>
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next Question
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
          singleAnimal={{ type: "beaver", color: meta.color }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  results.passed
                    ? "bg-gradient-to-br from-green-500 to-emerald-600"
                    : "bg-gradient-to-br from-emerald-500 to-teal-600"
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
              {results.passed ? "Excellent Work!" : "Keep Studying!"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {results.passed
                ? "You've mastered the details like a true Specialist!"
                : "Review the animal types and try again. You need 80% to pass!"}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: meta.color }}>
                      {results.score}/{questions.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div
                      className={`text-3xl font-bold ${
                        results.passed ? "text-green-500" : "text-emerald-500"
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
              <Card className="mb-8 border-2 border-emerald-500/50">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Badges Earned!</h3>
                  <div className="flex justify-center gap-4 flex-wrap">
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
