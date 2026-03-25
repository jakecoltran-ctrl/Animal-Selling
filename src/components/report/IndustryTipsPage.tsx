"use client";

import { AnimalType, Industry } from "@/types";
import { getIndustryTips, industryLabels } from "@/lib/industry-tips";
import { animals } from "@/lib/animal-data";

interface IndustryTipsPageProps {
  primaryType: AnimalType;
}

const industries: { id: Industry; emoji: string; color: string; jobs: string }[] = [
  { id: "tech", emoji: "💻", color: "#6366f1", jobs: "CTOs, IT directors, developers, product managers" },
  { id: "financial", emoji: "💰", color: "#059669", jobs: "CFOs, accountants, bankers, financial analysts" },
  { id: "realestate", emoji: "🏠", color: "#d97706", jobs: "Property managers, developers, investors, agents" },
  { id: "professional", emoji: "📋", color: "#7c3aed", jobs: "Lawyers, consultants, agency owners, partners" },
];

export function IndustryTipsPage({ primaryType }: IndustryTipsPageProps) {
  const primaryAnimal = animals[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          How A {primaryAnimal.name} {primaryAnimal.emoji} Sells to Industry Buyers
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Adapt your {primaryAnimal.name} approach for buyers in different industries
        </p>
      </div>

      {/* Industry Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {industries.map((industry) => {
          const tips = getIndustryTips(industry.id, primaryType);

          return (
            <div
              key={industry.id}
              className="rounded-xl border-2 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              style={{ borderColor: industry.color }}
            >
              {/* Card Header */}
              <div
                className="p-4 flex items-center gap-3"
                style={{ backgroundColor: `${industry.color}15` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${industry.color}30` }}
                >
                  <span className="text-2xl">{industry.emoji}</span>
                </div>
                <div>
                  <h3
                    className="font-bold"
                    style={{ color: industry.color }}
                  >
                    {industryLabels[industry.id]}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {industry.jobs}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-4">
                {/* Key Strengths */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    What Works With These Buyers
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {tips.strengths.slice(0, 2).map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: industry.color }}>•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Top Tips */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Key Tactics
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {tips.tips.slice(0, 2).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                          style={{ backgroundColor: industry.color }}
                        >
                          {i + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scenario */}
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${industry.color}10` }}
                >
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: industry.color }}
                  >
                    Common Scenario
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-200 mb-1">
                    <span className="font-medium">Situation:</span> {tips.scenarios[0]?.situation}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Your Move:</span> {tips.scenarios[0]?.approach}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tip */}
      <div
        className="mt-6 p-4 rounded-xl"
        style={{ backgroundColor: `${primaryAnimal.color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-medium">Pro Tip:</span> As a{" "}
          {primaryAnimal.name}, your core strengths
          {primaryType === "lion" && " — confidence and directness —"}
          {primaryType === "penguin" && " — enthusiasm and energy —"}
          {primaryType === "retriever" && " — empathy and patience —"}
          {primaryType === "beaver" && " — precision and reliability —"}
          {" "}work with buyers from any industry. Learn the terminology and priorities
          of each industry to connect faster, but stay true to your natural style.
        </p>
      </div>
    </div>
  );
}
