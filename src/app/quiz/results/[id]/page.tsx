"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart } from "@/components/results/RadarChart";
import { getAnimal, getAllAnimals, getContextualTips, animals } from "@/lib/animal-data";
import { getContextualBlendDescription } from "@/lib/quiz-scoring";
import { QuizResult, AnimalType } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { checkPurchaseStatus } from "@/lib/purchases";
import { getQuizResult } from "@/lib/quiz-sync";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

// Report Preview Carousel Component
function ReportPreviewCarousel({ primaryAnimal }: { primaryAnimal: { id: AnimalType; name: string; color: string } }) {
  const [currentPage, setCurrentPage] = useState(0);
  const animalTypes: AnimalType[] = ['lion', 'penguin', 'retriever', 'beaver'];

  const pages = [
    {
      title: "Cover",
      content: (
        <>
          <div className="text-center pb-3 mb-3 border-b" style={{ borderColor: `${primaryAnimal.color}30` }}>
            <div className="flex justify-center">
              <AnimalIcon type={primaryAnimal.id} size="lg" variant="head" />
            </div>
            <p className="text-xs font-bold mt-1" style={{ color: primaryAnimal.color }}>{primaryAnimal.name}</p>
          </div>
          <p className="text-[10px] text-center text-gray-500 mb-2">Premium Sales Report</p>
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full" />
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-4/5" />
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full" />
          </div>
        </>
      ),
    },
    {
      title: "Score Breakdown",
      content: (
        <>
          <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 mb-3">Score Breakdown</p>
          <div className="space-y-2.5">
            {animalTypes.map((type, i) => (
              <div key={i} className="flex items-center gap-2">
                <AnimalIcon type={type} size="sm" variant="head" />
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full" />
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
          </div>
        </>
      ),
    },
    {
      title: "Action Plan",
      content: (
        <>
          <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 mb-3">30-Day Action Plan</p>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded" style={{ width: `${70 - i * 10}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full" />
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-4/5" />
            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
          </div>
        </>
      ),
    },
  ];

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % pages.length);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-36 h-48 sm:w-48 sm:h-64 cursor-pointer group"
        onClick={nextPage}
      >
        {/* Stacked pages effect */}
        <div
          className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg transform rotate-3 translate-x-2"
          style={{ border: `1px solid ${primaryAnimal.color}20` }}
        />
        <div
          className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg transform -rotate-2 -translate-x-1"
          style={{ border: `1px solid ${primaryAnimal.color}20` }}
        />
        {/* Main page */}
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 h-full flex flex-col transition-transform group-hover:scale-[1.02]"
          style={{ border: `2px solid ${primaryAnimal.color}40` }}
        >
          {pages[currentPage].content}
          <div className="mt-auto pt-2 text-center">
            <span className="text-[10px] text-gray-400">Page {currentPage + 1} of 15</span>
          </div>
        </div>
        {/* Click indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            Click to preview
          </div>
        </div>
      </div>
      {/* Page dots */}
      <div className="flex gap-1.5 mt-4">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentPage
                ? 'w-4'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            }`}
            style={i === currentPage ? { backgroundColor: primaryAnimal.color } : {}}
          />
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const params = useParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const loadResult = async () => {
      if (!params.id) {
        setLoading(false);
        return;
      }

      // Try localStorage first, then database
      const quizResult = await getQuizResult(params.id as string);
      if (quizResult) {
        setResult(quizResult);
      }
      setLoading(false);

      // Check purchase status if user is logged in
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user && params.id) {
        const purchased = await checkPurchaseStatus(user.id, params.id as string);
        setIsPurchased(purchased);
      }
    };

    loadResult();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎯</div>
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    // Redirect to animals page - this happens when someone visits a shared link
    // without having the quiz data in their localStorage
    if (typeof window !== "undefined") {
      window.location.href = "/#animals";
    }
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl animate-spin mb-4">🎯</div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  const primaryAnimal = getAnimal(result.primaryType);
  const secondaryAnimal = getAnimal(result.secondaryType);

  // Fallback for older quiz results that don't have salesContext
  const salesContext = result.salesContext || {
    sellType: "product" as const,
    customerType: "b2b" as const,
    salesChannel: "outside" as const,
  };

  const blendDescription = getContextualBlendDescription(
    result.primaryType,
    result.secondaryType,
    salesContext
  );
  const contextualTips = getContextualTips(result.primaryType, salesContext);

  const contextLabels = {
    sellType: salesContext.sellType === "product" ? "Product" : "Service",
    customerType: salesContext.customerType.toUpperCase(),
    salesChannel: salesContext.salesChannel === "inside" ? "Inside" : "Outside",
  };

  const handleShare = async () => {
    const shareText = `I just discovered I'm a ${primaryAnimal.emoji} ${primaryAnimal.name} (${primaryAnimal.title}) with Animal Selling™! Take the quiz to find your sales animal.`;
    // Share link to the animal page, not personal results
    const shareUrl = `${window.location.origin}/animals/${result.primaryType}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Animal Selling™ Results",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
      >
        {/* Light mode gradient - more visible */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryAnimal.color}20 0%, ${primaryAnimal.color}35 100%)`
          }}
        />
        {/* Dark mode gradient - subtle */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background: `linear-gradient(135deg, ${primaryAnimal.color}08 0%, ${primaryAnimal.color}15 100%)`
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Context Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default">
                {contextLabels.sellType}
              </span>
              <span className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default">
                {contextLabels.customerType}
              </span>
              <span className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default">
                {contextLabels.salesChannel} Sales
              </span>
            </div>

            {/* Main Result */}
            <div
              className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 shadow-xl bg-white dark:bg-gray-800"
              style={{ border: `4px solid ${primaryAnimal.color}` }}
            >
              <AnimalIcon type={primaryAnimal.id} size="2xl" />
            </div>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Your Sales Animal
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: primaryAnimal.color }}>
              The {primaryAnimal.name}
            </h1>

            <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
              {primaryAnimal.title}
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
              {primaryAnimal.tagline}
            </p>

            {/* Secondary Type */}
            <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-5 py-2.5 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
              <span className="text-sm text-gray-500 dark:text-gray-400">Secondary:</span>
              <AnimalIcon type={secondaryAnimal.id} size="md" variant="head" />
              <span className="font-semibold" style={{ color: secondaryAnimal.color }}>
                {secondaryAnimal.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Report Teaser Banner - Only show if not purchased */}
      {!isPurchased && (
        <div className="container mx-auto px-4 py-4">
          <Link href={`/quiz/results/${result.id}/upgrade`}>
            <div
              className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.01] cursor-pointer"
              style={{
                backgroundColor: `${primaryAnimal.color}08`,
                border: `1px solid ${primaryAnimal.color}25`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primaryAnimal.color}15` }}
                >
                  <svg className="w-4 h-4" style={{ color: primaryAnimal.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Unlock your full 15-page report
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <span className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <span
                        className="block h-full rounded-full"
                        style={{ width: '20%', backgroundColor: primaryAnimal.color }}
                      />
                    </span>
                    20% unlocked
                  </span>
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                style={{
                  color: primaryAnimal.color,
                  backgroundColor: `${primaryAnimal.color}12`,
                }}
              >
                Get Full Report
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Score Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Style Blend - Show scores if purchased */}
            <Card className="shadow-md border-0 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-center">Your Style Blend</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <RadarChart scores={result.percentages} hideScores={!isPurchased} />
                {/* Unlock banner below chart - only show if not purchased */}
                {!isPurchased && (
                  <div className="flex flex-col items-center mt-4 gap-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">See exact percentages for all 4 types</p>
                    <Link href={`/quiz/results/${result.id}/upgrade`}>
                      <Button size="sm" variant="outline" className="text-xs gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Unlock
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Score Breakdown - Primary visible, others have blurred scores */}
            <Card className="shadow-md border-0 flex flex-col transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Primary Score - Fully Visible */}
                  {(() => {
                    const primary = animals[result.primaryType];
                    const primaryScore = result.percentages[result.primaryType];
                    return (
                      <div className="space-y-2 animate-fade-in">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <AnimalIcon type={result.primaryType} size="md" variant="head" />
                            <span className="font-medium text-base">{primary.name}</span>
                            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Primary</span>
                          </span>
                          <span className="font-bold text-lg" style={{ color: primary.color }}>{primaryScore}%</span>
                        </div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${primaryScore}%`,
                              backgroundColor: primary.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  {/* Other Scores - Locked unless purchased */}
                  {Object.entries(result.percentages)
                    .filter(([key]) => key !== result.primaryType)
                    .sort(([, a], [, b]) => b - a)
                    .map(([key, score]) => {
                      const animal = animals[key as keyof typeof animals];
                      const isSecondary = key === result.secondaryType;
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <AnimalIcon type={key as AnimalType} size="md" variant="head" />
                              <span className="font-medium text-base">{animal.name}</span>
                              {isSecondary && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Secondary</span>
                              )}
                            </span>
                            {isPurchased ? (
                              <span className="font-bold text-lg" style={{ color: animal.color }}>{score}%</span>
                            ) : (
                              <span className="text-gray-400">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                            {isPurchased ? (
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${score}%`,
                                  backgroundColor: animal.color,
                                }}
                              />
                            ) : (
                              /* Fake gradient bar that doesn't reveal actual score */
                              <div
                                className="h-full rounded-full opacity-30"
                                style={{
                                  width: "100%",
                                  background: `linear-gradient(to right, ${animal.color}, transparent)`,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Unlock CTA - only show if not purchased */}
                {!isPurchased && (
                  <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">View your complete score breakdown</p>
                    <Link href={`/quiz/results/${result.id}/upgrade`}>
                      <Button size="sm" variant="outline" className="text-xs gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Unlock
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Context Tips - Featured Section */}
        {contextualTips.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: `linear-gradient(135deg, ${primaryAnimal.color}10 0%, ${primaryAnimal.color}05 100%)`,
                border: `2px solid ${primaryAnimal.color}30`
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: primaryAnimal.color }}
                >
                  <span className="text-white text-lg">🎯</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tips for Your Context</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contextLabels.sellType} sales, {contextLabels.customerType}, {contextLabels.salesChannel}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {contextualTips.map((tip, i) => {
                  const isLocked = !isPurchased && i >= 2; // Lock 3rd tip and beyond unless purchased

                  if (isLocked) {
                    return (
                      <div key={i} className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          {/* Skeleton placeholder bars */}
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                            <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">More personalized tips in full report</p>
                          </div>
                          <Link href={`/quiz/results/${result.id}/upgrade`} className="ml-4 flex-shrink-0">
                            <Button size="sm" variant="outline" className="text-xs">
                              Unlock
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: primaryAnimal.color }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{tip}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Strengths & Blind Spots */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Know Your Strengths & Blind Spots
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-md border-0 border-t-4 transition-all duration-300 hover:shadow-lg" style={{ borderTopColor: '#22c55e' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm">✓</span>
                  </span>
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {primaryAnimal.strengths.slice(0, 4).map((strength, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0 border-t-4 transition-all duration-300 hover:shadow-lg" style={{ borderTopColor: '#f59e0b' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-sm">!</span>
                  </span>
                  Watch Out For
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPurchased ? (
                  <ul className="space-y-3">
                    {primaryAnimal.blindSpots.slice(0, 4).map((blindSpot, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{blindSpot}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <ul className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          <span className="flex-1">
                            <span className="block h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" style={{ width: `${90 - i * 12}%` }} />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Discover your blind spots to avoid</p>
                      <Link href={`/quiz/results/${result.id}/upgrade`}>
                        <Button size="sm" variant="outline" className="text-xs gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Unlock
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selling to Others */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            How to Sell to Each Type
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Adapt your approach based on who you&apos;re selling to
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {getAllAnimals().map((animal) => (
                <Card
                  key={animal.id}
                  className="shadow-md border-0 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  style={animal.id === result.primaryType ? { borderLeft: `4px solid ${animal.color}` } : {}}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${animal.color}20` }}
                      >
                        <AnimalIcon type={animal.id} size="md" variant="head" />
                      </div>
                      <div>
                        <CardTitle className="text-base" style={{ color: animal.color }}>
                          {animal.name}s
                        </CardTitle>
                        {animal.id === result.primaryType && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">Same type as you</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {primaryAnimal.sellingToOthers[animal.id]}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* General Growth Tips */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${primaryAnimal.color}20` }}
            >
              <svg className="w-5 h-5" style={{ color: primaryAnimal.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tips for Growth
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {primaryAnimal.tips.map((tip, i) => {
              const isLocked = !isPurchased && i >= 3; // Lock tips 4 and 5 (index 3+) unless purchased

              if (isLocked) {
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div className="flex-1 flex items-center justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                        </div>
                        <Link href={`/quiz/results/${result.id}/upgrade`} className="ml-4 flex-shrink-0">
                          <Button size="sm" variant="outline" className="text-xs">
                            Unlock
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: primaryAnimal.color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{tip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Report CTA - Premium Section - Only show if not purchased */}
        {!isPurchased && (
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className="rounded-3xl p-8 md:p-10 overflow-hidden relative"
              style={{
                background: `linear-gradient(135deg, ${primaryAnimal.color}12 0%, ${primaryAnimal.color}05 50%, ${primaryAnimal.color}12 100%)`,
                border: `2px solid ${primaryAnimal.color}30`,
              }}
            >
              {/* Subtle animated glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${primaryAnimal.color}40 0%, transparent 50%)`,
                }}
              />

              {/* Progress Indicator */}
              <div className="relative mb-8 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    You&apos;ve unlocked <span className="font-bold" style={{ color: primaryAnimal.color }}>20%</span> of your insights
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">80% remaining</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: '20%', backgroundColor: primaryAnimal.color }}
                  />
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                {/* Report Mockup Carousel */}
                <ReportPreviewCarousel primaryAnimal={primaryAnimal} />

                {/* Content Side */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Your Full Premium Report
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    15 pages of personalized insights for your {primaryAnimal.name} style
                  </p>

                  {/* What's Inside Checklist */}
                  <div className="space-y-3 mb-8">
                    {[
                      'Complete Score Breakdown',
                      'Your Blind Spots Revealed',
                      'Objection Handling Scripts',
                      'Red Flag Moments to Avoid',
                      '30-Day Action Plan',
                      'Self-Coaching Questions',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:scale-[1.02]">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${primaryAnimal.color}20` }}
                        >
                          <svg className="w-3 h-3" style={{ color: primaryAnimal.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                    <p className="text-xs text-gray-400 dark:text-gray-500 pl-8">+ 9 more sections...</p>
                  </div>

                  {/* Price + CTA */}
                  <div className="space-y-4">
                    <Link href={`/quiz/results/${result.id}/upgrade`} className="block">
                      <Button
                        size="lg"
                        className="w-full text-white text-lg font-semibold py-6 shadow-lg hover:shadow-xl transition-all gap-2"
                        style={{ backgroundColor: primaryAnimal.color }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        Unlock Full Report
                      </Button>
                    </Link>

                    {/* Guarantee */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      100% Satisfaction Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Full Report CTA - Only show if purchased */}
        {isPurchased && (
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className="rounded-2xl p-6 md:p-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${primaryAnimal.color}10 0%, ${primaryAnimal.color}05 100%)`,
                border: `2px solid ${primaryAnimal.color}30`,
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-600 dark:text-green-400 font-semibold">Report Unlocked</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Full {primaryAnimal.name} Report is Ready
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Access your complete 15-page personalized sales report
              </p>
              <Link href={`/quiz/results/${result.id}/report`}>
                <Button
                  size="lg"
                  className="text-white text-lg font-semibold py-6 px-8 shadow-lg hover:shadow-xl transition-all gap-2"
                  style={{ backgroundColor: primaryAnimal.color }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Full Report
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <Button onClick={handleShare} variant="outline" size="lg" className="gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Results
            </Button>
            <Link href={`/animals/${result.primaryType}`}>
              <Button
                size="lg"
                className="text-white"
                style={{ backgroundColor: primaryAnimal.color }}
              >
                Learn More About {primaryAnimal.name}s
              </Button>
            </Link>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Want to see how your team&apos;s styles complement each other?
            </p>
            <Link href="/dashboard/team">
              <Button variant="outline">
                Explore Team Safari™ →
              </Button>
            </Link>
          </div>
        </div>

        {/* Explore Other Types */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Explore All Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {getAllAnimals().map((animal) => (
              <Link key={animal.id} href={`/animals/${animal.id}`}>
                <Card
                  className={`text-center p-5 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-2 ${
                    animal.id === result.primaryType
                      ? "shadow-md"
                      : "border-transparent hover:border-gray-200"
                  }`}
                  style={
                    animal.id === result.primaryType
                      ? { borderColor: animal.color, backgroundColor: `${animal.color}08` }
                      : {}
                  }
                >
                  <div className="flex justify-center mb-3">
                    <AnimalIcon type={animal.id} size="xl" />
                  </div>
                  <p className="font-semibold" style={{ color: animal.color }}>
                    {animal.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{animal.title}</p>
                  {animal.id === result.primaryType && (
                    <span
                      className="inline-block text-xs mt-2 px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: animal.color }}
                    >
                      You
                    </span>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
