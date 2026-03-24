"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAnimal, animals } from "@/lib/animal-data";
import { getContextualBlendDescription } from "@/lib/quiz-scoring";
import { ProfileSummary } from "@/components/report/ProfileSummary";
import { SellingPlaybookPage } from "@/components/report/SellingPlaybook";
import { GrowthPlanPage } from "@/components/report/GrowthPlanPage";
import { QuizResult, AnimalType } from "@/types";

export default function UpgradePage() {
  const params = useParams();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          <p className="text-muted-foreground">Loading...</p>
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
            We couldn&apos;t find your quiz results. Please take the quiz again.
          </p>
          <Link href="/quiz">
            <Button>Take the Quiz</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryAnimal = getAnimal(result.primaryType);
  const secondaryAnimal = getAnimal(result.secondaryType);

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

  const contextLabels = {
    sellType: salesContext.sellType === "product" ? "Products" : "Services",
    customerType: salesContext.customerType.toUpperCase(),
    salesChannel: salesContext.salesChannel === "inside" ? "Inside" : "Outside",
  };

  const handlePurchase = () => {
    // Placeholder for Stripe checkout - will be implemented later
    alert("Stripe checkout will be integrated here. For now, this is a placeholder.");
  };

  const reportSections = [
    {
      title: "Your Sales Profile Deep Dive",
      description: `Go beyond the basics. Learn exactly how your ${primaryAnimal.name} style shows up in real sales conversations — from prospecting to closing.`,
    },
    {
      title: `Your Power Combo: ${primaryAnimal.name} + ${secondaryAnimal.name}`,
      description: `Your specific blend of ${primaryAnimal.name} and ${secondaryAnimal.name} creates a unique selling superpower. Find out what it is and how to use it.`,
    },
    {
      title: "How You Compare to All 4 Types",
      description: "See where you stand against Lions, Penguins, Golden Retrievers, and Beavers — with a side-by-side breakdown of strengths, pace, and decision style.",
    },
    {
      title: "Your Adaptive Selling Playbook",
      description: "Get personalized strategies for selling to customers who are each of the 4 animal types — based on YOUR style, not generic advice.",
    },
    {
      title: "Your Growth Plan",
      description: "Discover your biggest blind spot and get a concrete action plan to become a more versatile seller this week.",
    },
    {
      title: "Team Dynamics Preview",
      description: "See which animal types you work best with, where friction might show up, and your ideal role on a sales team.",
    },
  ];

  const faqs = [
    {
      question: "What do I get?",
      answer: "A 15-page personalized sales profile report viewable in your browser and downloadable as a PDF. It includes your deep dive, power combo analysis, adaptive selling playbook, growth plan, and more.",
    },
    {
      question: "Is this a subscription?",
      answer: "No. It's a one-time payment of $4.99. You get permanent access to your report.",
    },
    {
      question: "Can I retake the quiz later?",
      answer: "Yes. You can retake the quiz anytime. If you want a new full report based on updated results, it's another $4.99.",
    },
    {
      question: "Is my payment secure?",
      answer: "Yes. All payments are processed securely through Stripe. We never see or store your credit card information.",
    },
    {
      question: "What if I'm not happy with the report?",
      answer: "Contact us and we'll make it right.",
    },
  ];

  // Score bars sorted by percentage
  const sortedScores = Object.entries(result.percentages)
    .map(([key, value]) => ({
      key: key as AnimalType,
      value,
      animal: animals[key as AnimalType],
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Section 1: Personalized Hook */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryAnimal.color}15 0%, ${primaryAnimal.color}05 100%)`,
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Animal Icon */}
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-xl bg-white dark:bg-gray-800"
              style={{ border: `4px solid ${primaryAnimal.color}` }}
            >
              <span className="text-5xl">{primaryAnimal.emoji}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Your <span style={{ color: primaryAnimal.color }}>{primaryAnimal.name}</span> Sales Profile is Ready
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              You&apos;re a <span className="font-semibold" style={{ color: primaryAnimal.color }}>{primaryAnimal.name}</span>-<span className="font-semibold" style={{ color: secondaryAnimal.color }}>{secondaryAnimal.name}</span> blend selling {contextLabels.sellType} in {contextLabels.customerType}. Your full report reveals exactly how this combination shapes your selling style — and what to do about it.
            </p>

            {/* Score Bars */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md max-w-md mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your Animal Blend</p>
              <div className="space-y-3">
                {sortedScores.map(({ key, value, animal }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xl w-8">{animal.emoji}</span>
                    <div className="flex-1">
                      <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${value}%`, backgroundColor: animal.color }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium w-10 text-right" style={{ color: animal.color }}>
                      {value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Section 2: What's Inside */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-900 dark:text-white">
            What&apos;s Inside Your Full Report
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            15 pages of personalized insights tailored to your unique sales profile
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {reportSections.map((section, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${primaryAnimal.color}15` }}
                    >
                      <svg
                        className="w-5 h-5"
                        style={{ color: primaryAnimal.color }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {section.description}
                      </p>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${primaryAnimal.color}10`,
                          color: primaryAnimal.color,
                        }}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Included in full report
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Visual Report Preview - Actual Report Pages with Blur */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-3 text-gray-900 dark:text-white">
            Preview Your Report
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Real pages from your personalized report
          </p>

          <div className="space-y-8">
            {/* Preview Page 1: Profile Summary */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: `${primaryAnimal.color}30` }}>
              {/* Page Header - Visible */}
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b" style={{ borderColor: `${primaryAnimal.color}20` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryAnimal.color }}>Page 3 of 15</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Sales Profile Summary</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Locked
                  </div>
                </div>
              </div>
              {/* Page Content - Blurred */}
              <div className="relative bg-white dark:bg-gray-900 overflow-hidden" style={{ maxHeight: "400px" }}>
                <div className="filter blur-[5px] pointer-events-none transform scale-[0.85] origin-top p-6">
                  <ProfileSummary
                    primaryAnimal={primaryAnimal}
                    secondaryAnimal={secondaryAnimal}
                    percentages={result.percentages}
                    blendDescription={blendDescription}
                    salesContext={salesContext}
                  />
                </div>
                {/* Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
                {/* Lock Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                      style={{ backgroundColor: `${primaryAnimal.color}20` }}
                    >
                      <svg className="w-8 h-8" style={{ color: primaryAnimal.color }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Unlock to view full content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Page 2: Selling Playbook */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: `${primaryAnimal.color}30` }}>
              {/* Page Header - Visible */}
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b" style={{ borderColor: `${primaryAnimal.color}20` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryAnimal.color }}>Page 8 of 15</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Adaptive Selling Playbook</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Locked
                  </div>
                </div>
              </div>
              {/* Page Content - Blurred */}
              <div className="relative bg-white dark:bg-gray-900 overflow-hidden" style={{ maxHeight: "400px" }}>
                <div className="filter blur-[5px] pointer-events-none transform scale-[0.85] origin-top p-6">
                  <SellingPlaybookPage
                    primaryType={result.primaryType}
                    salesContext={salesContext}
                  />
                </div>
                {/* Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
                {/* Lock Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                      style={{ backgroundColor: `${primaryAnimal.color}20` }}
                    >
                      <svg className="w-8 h-8" style={{ color: primaryAnimal.color }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Unlock to view full content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Page 3: Growth Plan */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border" style={{ borderColor: `${primaryAnimal.color}30` }}>
              {/* Page Header - Visible */}
              <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b" style={{ borderColor: `${primaryAnimal.color}20` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryAnimal.color }}>Page 12 of 15</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Growth Plan</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Locked
                  </div>
                </div>
              </div>
              {/* Page Content - Blurred */}
              <div className="relative bg-white dark:bg-gray-900 overflow-hidden" style={{ maxHeight: "400px" }}>
                <div className="filter blur-[5px] pointer-events-none transform scale-[0.85] origin-top p-6">
                  <GrowthPlanPage
                    primaryType={result.primaryType}
                    scores={result.percentages}
                    salesContext={salesContext}
                    part={1}
                  />
                </div>
                {/* Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
                {/* Lock Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                      style={{ backgroundColor: `${primaryAnimal.color}20` }}
                    >
                      <svg className="w-8 h-8" style={{ color: primaryAnimal.color }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Unlock to view full content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            These are actual pages from your personalized 15-page report
          </p>
        </div>

        {/* Section 4: What Makes This Different */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            What Makes This Different
          </h2>

          <div className="space-y-4">
            {[
              `Personalized to YOUR specific ${primaryAnimal.name}-${secondaryAnimal.name} blend — not a generic type description`,
              `Tailored to your sales context: ${contextLabels.sellType}, ${contextLabels.customerType}, ${contextLabels.salesChannel} Sales`,
              "Actionable strategies you can use in your next sales call",
              "Based on the proven DISC behavioral model, reimagined for modern sellers",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${primaryAnimal.color}20` }}
                >
                  <svg
                    className="w-4 h-4"
                    style={{ color: primaryAnimal.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Purchase CTA */}
        <div className="max-w-xl mx-auto mb-16">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${primaryAnimal.color}10 0%, ${primaryAnimal.color}05 100%)`,
              border: `2px solid ${primaryAnimal.color}30`,
            }}
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Unlock Your Full Report
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              One-time purchase • Instant access
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold" style={{ color: primaryAnimal.color }}>
                $4.99
              </span>
            </div>

            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full text-white text-lg font-semibold py-6 shadow-lg hover:shadow-xl transition-all gap-2 mb-4"
              style={{ backgroundColor: primaryAnimal.color }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              Get My Full Report — $4.99
            </Button>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Instant access • PDF download included • 15 personalized pages
            </p>

            {/* Stripe Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Secure payment via Stripe
            </div>
          </div>
        </div>

        {/* Section 6: FAQ */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href={`/quiz/results/${params.id}`}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to your results
          </Link>
        </div>
      </div>
    </div>
  );
}
