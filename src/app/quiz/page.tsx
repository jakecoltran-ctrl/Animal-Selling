"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { QuizQuestionCard } from "@/components/quiz/QuizQuestion";
import { getShuffledQuestions, getQuestionText } from "@/lib/quiz-questions";
import { generateQuizResult } from "@/lib/quiz-scoring";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  QuizAnswer,
  QuizQuestion,
  SalesContext,
  SellType,
  CustomerType,
  SalesChannel,
  AnimalType,
} from "@/types";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { saveQuizResultsToDB } from "@/lib/quiz-sync";
import { useScrollIntoView } from "@/hooks/useScrollIntoView";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

type QuizStage = "intro" | "setup" | "questions" | "signup" | "calculating";

interface ToggleButtonProps {
  options: { value: string; label: string; description: string }[];
  value: string;
  onChange: (value: string) => void;
}

function ToggleButton({ options, value, onChange }: ToggleButtonProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`p-4 rounded-lg border-2 text-left transition-all ${
            value === option.value
              ? "border-primary bg-primary/5 shadow-md"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
          }`}
        >
          <div className="font-medium">{option.label}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {option.description}
          </div>
        </button>
      ))}
    </div>
  );
}

const ANALYSIS_STEPS = [
  { message: "Analyzing your responses...", duration: 2500 },
  { message: "Identifying your patterns...", duration: 2500 },
  { message: "Matching your sales style...", duration: 2500 },
  { message: "Discovering your animal...", duration: 2500 },
];

const ANIMALS: { type: AnimalType; name: string; color: string }[] = [
  { type: "lion", name: "Lion", color: "rgb(220, 38, 38)" },
  { type: "penguin", name: "Penguin", color: "rgb(8, 145, 178)" },
  { type: "retriever", name: "Retriever", color: "rgb(217, 119, 6)" },
  { type: "beaver", name: "Beaver", color: "rgb(5, 150, 105)" },
];

function CalculatingAnimation() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeAnimal, setActiveAnimal] = useState(-1);

  useEffect(() => {
    // Progress bar animation - reaches 100 in 10 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // Reaches 100 in 10 seconds (100 intervals at 100ms)
      });
    }, 100);

    // Step messages
    let stepTime = 0;
    ANALYSIS_STEPS.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, stepTime);
      stepTime += step.duration;
    });

    // Animal highlights - cycle through each animal over 10 seconds
    const animalTimings = [1000, 3500, 6000, 8500];
    animalTimings.forEach((time, index) => {
      setTimeout(() => {
        setActiveAnimal(index);
      }, time);
    });

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 relative overflow-hidden">
      <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
      <div className="container mx-auto px-4 relative z-10">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Animals Grid */}
            <div className="flex justify-center gap-4 mb-8">
              {ANIMALS.map((animal, index) => (
                <div
                  key={animal.name}
                  className={`relative transition-all duration-500 ${
                    activeAnimal === index
                      ? "scale-125 opacity-100"
                      : activeAnimal > index
                      ? "scale-100 opacity-60"
                      : "scale-100 opacity-30 grayscale"
                  }`}
                >
                  <div
                    className={`${
                      activeAnimal === index ? "animate-bounce" : ""
                    }`}
                    style={{
                      filter: activeAnimal === index ? `drop-shadow(0 0 10px ${animal.color})` : "none",
                    }}
                  >
                    <AnimalIcon type={animal.type} size="xl" />
                  </div>
                  {activeAnimal === index && (
                    <div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: animal.color }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Message */}
            <h2 className="text-xl font-bold mb-2 transition-all duration-300">
              {ANALYSIS_STEPS[currentStep]?.message || "Almost there..."}
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100 ease-out"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
                }}
              />
            </div>

            {/* Percentage */}
            <p className="text-sm text-muted-foreground">
              {Math.min(Math.round(progress), 100)}% complete
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const [stage, setStage] = useState<QuizStage>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 1 | 2 | 3 | 4 | 5>>({});
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Sales context state
  const [salesContext, setSalesContext] = useState<SalesContext>({
    sellType: "product",
    customerType: "b2b",
    salesChannel: "inside",
  });

  const questionCardRef = useRef<HTMLDivElement>(null);
  const setupFormRef = useRef<HTMLDivElement>(null);
  const { scrollIntoViewOnMobile } = useScrollIntoView();

  // Scroll to top of page on mobile
  const scrollToTopOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setQuestions(getShuffledQuestions());

    // Check auth state
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress =
    questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Get the context-specific question text
  const currentQuestionText = currentQuestion
    ? getQuestionText(currentQuestion, salesContext)
    : "";

  const handleAnswer = (value: 1 | 2 | 3 | 4 | 5) => {
    if (!currentQuestion) return;

    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const startCalculating = (quizAnswers: Record<string, 1 | 2 | 3 | 4 | 5>) => {
    setStage("calculating");

    // After 10 second animation, check if logged in
    setTimeout(async () => {
      // Re-check auth state to ensure we have the latest
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (currentUser) {
        // User is logged in, process results and save to database
        const formattedAnswers: QuizAnswer[] = Object.entries(quizAnswers).map(
          ([questionId, value]) => ({
            questionId,
            value,
          })
        );
        const result = generateQuizResult(formattedAnswers, salesContext, currentUser.email);

        // Save to database and wait for completion
        try {
          const saveSuccess = await saveQuizResultsToDB([result]);
          if (!saveSuccess) {
            console.error("Failed to save quiz results to database");
          }
        } catch (err) {
          console.error("Error saving quiz results:", err);
        }

        // Small delay to ensure database write is complete
        await new Promise(resolve => setTimeout(resolve, 500));

        router.push(`/quiz/results/${result.id}`);
      } else {
        // User needs to create account - save pending data to database via API
        try {
          await fetch("/api/pending-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: quizAnswers, salesContext }),
          });
        } catch (error) {
          console.error("Error saving pending quiz data:", error);
        }
        setStage("signup");
      }
    }, 10000);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };


  // Intro Stage
  if (stage === "intro") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 relative overflow-hidden">
        <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center gap-2 mb-6">
                <AnimalIcon type="lion" size="xl" />
                <AnimalIcon type="penguin" size="xl" />
                <AnimalIcon type="retriever" size="xl" />
                <AnimalIcon type="beaver" size="xl" />
              </div>
              <h1 className="text-3xl font-bold mb-4">
                Animal Selling™ Assessment
              </h1>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Discover your natural sales animal in under 5 minutes. Answer 24
                questions honestly — there are no right or wrong answers.
              </p>
              <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
                {[
                  "Get your primary and secondary sales animal",
                  "Learn your selling strengths and blind spots",
                  "Discover how to adapt to different buyer types",
                  "Get tips tailored to your specific sales context"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" onClick={() => {
                setStage("setup");
                scrollToTopOnMobile();
              }}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Setup Stage - Sales Context Selection
  if (stage === "setup") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 relative overflow-hidden">
        <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Tell Us About Your Sales Role
                </h2>
                <p className="text-muted-foreground">
                  We'll tailor the questions to match your selling environment
                </p>
              </div>

              <div className="space-y-8">
                {/* What do you sell? */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">📦</span>
                    What do you sell?
                  </h3>
                  <ToggleButton
                    options={[
                      {
                        value: "product",
                        label: "Product",
                        description:
                          "Physical goods, software, equipment, etc.",
                      },
                      {
                        value: "service",
                        label: "Service",
                        description:
                          "Consulting, agencies, SaaS, financial services, etc.",
                      },
                    ]}
                    value={salesContext.sellType}
                    onChange={(v) =>
                      setSalesContext((prev) => ({
                        ...prev,
                        sellType: v as SellType,
                      }))
                    }
                  />
                </div>

                {/* Who do you sell to? */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    Who do you sell to?
                  </h3>
                  <ToggleButton
                    options={[
                      {
                        value: "b2b",
                        label: "B2B",
                        description: "Business to business",
                      },
                      {
                        value: "b2c",
                        label: "B2C",
                        description: "Business to consumer",
                      },
                    ]}
                    value={salesContext.customerType}
                    onChange={(v) =>
                      setSalesContext((prev) => ({
                        ...prev,
                        customerType: v as CustomerType,
                      }))
                    }
                  />
                </div>

                {/* How do you sell? */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    How do you sell?
                  </h3>
                  <ToggleButton
                    options={[
                      {
                        value: "inside",
                        label: "Inside Sales",
                        description: "Phone, email, video, virtual",
                      },
                      {
                        value: "outside",
                        label: "Outside Sales",
                        description: "In-person, field, face-to-face",
                      },
                    ]}
                    value={salesContext.salesChannel}
                    onChange={(v) =>
                      setSalesContext((prev) => ({
                        ...prev,
                        salesChannel: v as SalesChannel,
                      }))
                    }
                  />
                </div>

              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => {
                  setStage("intro");
                  scrollToTopOnMobile();
                }}>
                  ← Back
                </Button>
                <Button onClick={() => {
                  setStage("questions");
                  scrollToTopOnMobile();
                }}>
                  Start the Quiz →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculating Stage
  if (stage === "calculating") {
    return <CalculatingAnimation />;
  }

  // Signup Requirement Stage
  if (stage === "signup") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 relative overflow-hidden">
        <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center gap-2 mb-4">
                <AnimalIcon type="lion" size="xl" />
                <AnimalIcon type="penguin" size="xl" />
                <AnimalIcon type="retriever" size="xl" />
                <AnimalIcon type="beaver" size="xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Animal is Ready!</h2>
              <p className="text-muted-foreground mb-6">
                Sign up for free to discover your sales animal type and unlock
                your personalized results.
              </p>
              <div className="space-y-4">
                <Link href="/signup?redirect=quiz">
                  <Button className="w-full press-effect hover-glow">
                    Create Free Account
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login?redirect=quiz"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Questions Stage
  return (
    <div className="min-h-[80vh] py-6 md:py-12 relative overflow-hidden">
      <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Context Badge - Hidden on mobile for compactness */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-muted-foreground">
              {salesContext.sellType === "product" ? "📦 Product" : "🛎️ Service"}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-muted-foreground">
              {salesContext.customerType === "b2b" ? "🏢 B2B" : "👤 B2C"}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-muted-foreground">
              {salesContext.salesChannel === "inside"
                ? "💻 Inside"
                : "🚗 Outside"}
            </span>
          </div>

          {/* Progress */}
          <div className="mb-4 md:mb-8">
            <div className="flex justify-between text-xs md:text-sm text-muted-foreground mb-2">
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card ref={questionCardRef} className="mb-4 md:mb-8">
            <CardContent className="pt-4 pb-4 md:pt-8 md:pb-8">
              {currentQuestion && (
                <QuizQuestionCard
                  key={currentQuestion.id}
                  questionText={currentQuestionText}
                  value={answers[currentQuestion.id] ?? null}
                  onChange={handleAnswer}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                handlePrevious();
                scrollToTopOnMobile();
              }}
              disabled={currentIndex === 0}
            >
              ← Previous
            </Button>
            <Button
              onClick={() => {
                if (isLastQuestion) {
                  startCalculating(answers);
                } else {
                  setCurrentIndex((prev) => prev + 1);
                  scrollToTopOnMobile();
                }
              }}
              disabled={!currentQuestion || !answers[currentQuestion?.id]}
            >
              {isLastQuestion ? "Finish" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
