"use client";

import { AnimalType, GrowthPlanContent, SalesContext } from "@/types";
import { getContextualGrowthPlan } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";
import { GrowthGapChart } from "@/components/report/ReportCharts";

interface GrowthPlanPageProps {
  primaryType: AnimalType;
  scores: Record<AnimalType, number>;
  salesContext: SalesContext;
  part?: 1 | 2; // Split content across two pages
}

export function GrowthPlanPage({ primaryType, scores, salesContext, part }: GrowthPlanPageProps) {
  const animalData = animals;
  const growthPlan = getContextualGrowthPlan(scores, primaryType, salesContext);
  const primaryAnimal = animalData[primaryType];

  // Calculate lowest and second-lowest scores
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => a - b);

  const lowestType = sortedScores[0][0] as AnimalType;
  const lowestScore = sortedScores[0][1];
  const secondLowestType = sortedScores[1][0] as AnimalType;
  const secondLowestScore = sortedScores[1][1];

  const lowestAnimal = animalData[lowestType];
  const secondLowestAnimal = animalData[secondLowestType];

  // Part 1: Header, Growth Areas, Chart, Why It Matters
  // Part 2: Action Steps, Quick Wins, Tips, Tracking
  const showPart1 = !part || part === 1;
  const showPart2 = !part || part === 2;

  return (
    <div>
      {showPart1 && (
        <>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Strengthen Your Weakest Animals
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Develop the {lowestAnimal.name} and {secondLowestAnimal.name} skills you&apos;re missing
            </p>
          </div>

          {/* Two Lowest Areas */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Lowest Area */}
            <div
              className="rounded-2xl p-5 border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              style={{ borderColor: lowestAnimal.color, backgroundColor: `${lowestAnimal.color}08` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${lowestAnimal.color}20` }}
                >
                  <span className="text-3xl">{lowestAnimal.emoji}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: lowestAnimal.color }}>
                    #1 Growth Area (Lowest)
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {lowestAnimal.name} Skills
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Score: {lowestScore}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {lowestType === "lion" && "Develop directness, urgency, and confident decision-pushing."}
                {lowestType === "penguin" && "Build enthusiasm, storytelling, and relationship energy."}
                {lowestType === "retriever" && "Grow patience, empathy, and trust-building skills."}
                {lowestType === "beaver" && "Strengthen preparation, detail-focus, and reliability."}
              </p>
            </div>

            {/* Second Lowest Area */}
            <div
              className="rounded-2xl p-5 border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              style={{ borderColor: secondLowestAnimal.color, backgroundColor: `${secondLowestAnimal.color}08` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${secondLowestAnimal.color}20` }}
                >
                  <span className="text-3xl">{secondLowestAnimal.emoji}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: secondLowestAnimal.color }}>
                    #2 Growth Area
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {secondLowestAnimal.name} Skills
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Score: {secondLowestScore}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {secondLowestType === "lion" && "Develop directness, urgency, and confident decision-pushing."}
                {secondLowestType === "penguin" && "Build enthusiasm, storytelling, and relationship energy."}
                {secondLowestType === "retriever" && "Grow patience, empathy, and trust-building skills."}
                {secondLowestType === "beaver" && "Strengthen preparation, detail-focus, and reliability."}
              </p>
            </div>
          </div>

          {/* Growth Gap Chart */}
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
              Your Growth Opportunities
            </h3>
            <GrowthGapChart scores={scores} primaryType={primaryType} />
          </div>

          {/* Why This Matters */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Why Developing These Areas Matters
            </h3>
            <div
              className="p-4 rounded-xl border-l-4 bg-slate-100 dark:bg-gray-800"
              style={{ borderColor: lowestAnimal.color }}
            >
              <p className="text-gray-700 dark:text-gray-200">
                As a strong {primaryAnimal.name}, you excel at{" "}
                {primaryType === "lion" && "driving deals and closing with urgency"}
                {primaryType === "penguin" && "building relationships and generating enthusiasm"}
                {primaryType === "retriever" && "creating trust and supporting clients"}
                {primaryType === "beaver" && "thorough preparation and building credibility"}.
                But buyers with {lowestAnimal.name} or {secondLowestAnimal.name} preferences may feel your approach
                doesn&apos;t resonate. Developing these weaker areas helps you
                connect with a wider range of buyers.
              </p>
            </div>
          </div>
        </>
      )}

      {showPart2 && (
        <>
          {/* Part 2 Header */}
          {part === 2 && (
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Growth Action Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Specific steps to develop your {lowestAnimal.name} and {secondLowestAnimal.name} skills
              </p>
            </div>
          )}

          {/* Action Steps for Lowest */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">{lowestAnimal.emoji}</span>
              Action Steps to Develop {lowestAnimal.name} Skills
            </h3>
            <div className="space-y-3">
              {growthPlan.actionSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: lowestAnimal.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps for Second Lowest */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">{secondLowestAnimal.emoji}</span>
              Action Steps to Develop {secondLowestAnimal.name} Skills
            </h3>
            <div className="space-y-3">
              <div
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ backgroundColor: secondLowestAnimal.color }}
                >
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-200 pt-1">
                  {secondLowestType === "lion" && "Practice getting to the point faster in conversations. Cut unnecessary context."}
                  {secondLowestType === "penguin" && "Add more energy and stories to your presentations. Show enthusiasm."}
                  {secondLowestType === "retriever" && "Slow down and ask more questions about their personal situation."}
                  {secondLowestType === "beaver" && "Come to meetings with more detailed preparation and documentation."}
                </p>
              </div>
              <div
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ backgroundColor: secondLowestAnimal.color }}
                >
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-200 pt-1">
                  {secondLowestType === "lion" && "Set clear timelines and ask for decisions more directly."}
                  {secondLowestType === "penguin" && "Build more personal rapport before diving into business."}
                  {secondLowestType === "retriever" && "Follow up more consistently and show you remember details about them."}
                  {secondLowestType === "beaver" && "Provide more specific data and evidence to support your recommendations."}
                </p>
              </div>
              <div
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ backgroundColor: secondLowestAnimal.color }}
                >
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-200 pt-1">
                  {secondLowestType === "lion" && "When you sense hesitation, address it head-on rather than waiting."}
                  {secondLowestType === "penguin" && "Share client success stories and paint a vision of what's possible."}
                  {secondLowestType === "retriever" && "Check in on how decisions affect their team and stakeholders."}
                  {secondLowestType === "beaver" && "Create checklists and timelines that show your attention to detail."}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Wins */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              Quick Wins for Both Areas
            </h3>
            <div className="grid gap-3">
              {growthPlan.quickWins.map((win, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: `${lowestAnimal.color}08` }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: lowestAnimal.color }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{win}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Context-Specific Tips */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Tips for Your Sales Environment
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Specific guidance for {salesContext.sellType} sales, {salesContext.customerType.toUpperCase()}, {salesContext.salesChannel} sales
            </p>
            <div className="grid gap-3">
              {growthPlan.contextTips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-500">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Progress */}
          <div
            className="mt-8 p-4 rounded-xl"
            style={{ backgroundColor: `${primaryAnimal.color}10` }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Track Your Progress</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Growth in {lowestAnimal.name} and {secondLowestAnimal.name} skills won&apos;t happen overnight, but small
              consistent actions add up. Try one quick win this week for each area, then add an
              action step next week. Within a month, you&apos;ll notice these new
              behaviors becoming more natural.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
