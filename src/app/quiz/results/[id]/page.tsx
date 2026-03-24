"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart } from "@/components/results/RadarChart";
import { getAnimal, getAllAnimals, getContextualTips, animals } from "@/lib/animal-data";
import { getContextualBlendDescription } from "@/lib/quiz-scoring";
import { QuizResult } from "@/types";

export default function ResultsPage() {
  const params = useParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`quiz_result_${params.id}`);
    if (stored) {
      setResult(JSON.parse(stored));
    }
    setLoading(false);
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
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Results Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn&apos;t find your quiz results. They may have expired or been cleared.
          </p>
          <Link href="/quiz">
            <Button>Take the Quiz Again</Button>
          </Link>
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
    const shareText = `I just discovered I'm a ${primaryAnimal.emoji} ${primaryAnimal.name} (${primaryAnimal.title}) with Animal Selling! Take the quiz to find your sales animal.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Animal Selling Results",
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
              <span className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm">
                {contextLabels.sellType}
              </span>
              <span className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm">
                {contextLabels.customerType}
              </span>
              <span className="px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm">
                {contextLabels.salesChannel} Sales
              </span>
            </div>

            {/* Main Result */}
            <div
              className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 shadow-xl bg-white dark:bg-gray-800"
              style={{ border: `4px solid ${primaryAnimal.color}` }}
            >
              <span className="text-6xl">{primaryAnimal.emoji}</span>
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
            <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-5 py-2.5 shadow-md">
              <span className="text-sm text-gray-500 dark:text-gray-400">Secondary:</span>
              <span className="text-2xl">{secondaryAnimal.emoji}</span>
              <span className="font-semibold" style={{ color: secondaryAnimal.color }}>
                {secondaryAnimal.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Score Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Style Blend - Numbers hidden */}
            <Card className="shadow-md border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-center">Your Style Blend</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <RadarChart scores={result.percentages} hideScores />
                {/* Unlock banner below chart */}
                <div className="flex items-center justify-center mt-4">
                  <Link href={`/quiz/results/${result.id}/report`}>
                    <Button size="sm" variant="outline" className="text-xs gap-2">
                      <span>🔒</span> Unlock Score Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown - Primary visible, others have blurred scores */}
            <Card className="shadow-md border-0 flex flex-col">
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
                            <span className="text-2xl">{primary.emoji}</span>
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

                  {/* Other Scores - Locked */}
                  {Object.entries(result.percentages)
                    .filter(([key]) => key !== result.primaryType)
                    .sort(([, a], [, b]) => b - a)
                    .map(([key]) => {
                      const animal = animals[key as keyof typeof animals];
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              <span className="text-2xl">{animal.emoji}</span>
                              <span className="font-medium text-base">{animal.name}</span>
                            </span>
                            <span className="text-gray-400 flex items-center gap-1">
                              <span>🔒</span>
                            </span>
                          </div>
                          <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                            {/* Fake gradient bar that doesn't reveal actual score */}
                            <div
                              className="h-full rounded-full opacity-30"
                              style={{
                                width: "100%",
                                background: `linear-gradient(to right, ${animal.color}, transparent)`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Unlock CTA */}
                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <Link href={`/quiz/results/${result.id}/report`}>
                    <Button size="sm" variant="outline" className="gap-2">
                      <span>🔒</span> Unlock All Scores
                    </Button>
                  </Link>
                </div>
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
                  const isLocked = i >= 2; // Lock 3rd tip and beyond

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
                          </div>
                          <Link href={`/quiz/results/${result.id}/report`} className="ml-4 flex-shrink-0">
                            <Button size="sm" variant="outline" className="text-xs">
                              Unlock
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
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
            <Card className="shadow-md border-0 border-t-4" style={{ borderTopColor: '#22c55e' }}>
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

            <Card className="shadow-md border-0 border-t-4" style={{ borderTopColor: '#f59e0b' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-sm">!</span>
                  </span>
                  Watch Out For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {primaryAnimal.blindSpots.slice(0, 4).map((blindSpot, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{blindSpot}</span>
                    </li>
                  ))}
                </ul>
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
                  className="shadow-md border-0"
                  style={animal.id === result.primaryType ? { borderLeft: `4px solid ${animal.color}` } : {}}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${animal.color}20` }}
                      >
                        <span className="text-xl">{animal.emoji}</span>
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
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Tips for Growth
          </h2>
          <Card className="shadow-md border-0">
            <CardContent className="p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {primaryAnimal.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: primaryAnimal.color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Report CTA */}
        <div className="max-w-4xl mx-auto mb-16">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${primaryAnimal.color}15 0%, ${primaryAnimal.color}08 100%)`,
              border: `2px solid ${primaryAnimal.color}30`,
            }}
          >
            <div className="text-4xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Get Your Full 15-Page Premium Report
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
              Deep dive into your sales animal with a comprehensive report including
              objection handling, red flag moments, a 30-day action plan, self-coaching
              questions, and much more.
            </p>
            <Link href={`/quiz/results/${result.id}/report`}>
              <Button
                size="lg"
                className="text-white gap-2"
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

          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Want to see how your team&apos;s styles complement each other?
            </p>
            <Link href="/dashboard/team">
              <Button variant="outline">
                Explore Team Safari →
              </Button>
            </Link>
          </div>
        </div>

        {/* Explore Other Types */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Explore All Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getAllAnimals().map((animal) => (
              <Link key={animal.id} href={`/animals/${animal.id}`}>
                <Card
                  className={`text-center p-5 hover:shadow-lg transition-all cursor-pointer border-2 ${
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
                  <div className="text-4xl mb-3">{animal.emoji}</div>
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
