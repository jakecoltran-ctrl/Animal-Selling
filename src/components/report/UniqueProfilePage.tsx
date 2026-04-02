"use client";

import { AnimalType, SalesContext } from "@/types";
import { generateUniqueProfileNarrative } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";

interface UniqueProfilePageProps {
  scores: Record<AnimalType, number>;
  primaryType: AnimalType;
  secondaryType: AnimalType;
  salesContext: SalesContext;
}

export function UniqueProfilePage({
  scores,
  primaryType,
  secondaryType,
  salesContext,
}: UniqueProfilePageProps) {
  const narrative = generateUniqueProfileNarrative(scores, primaryType, secondaryType, salesContext);
  const primaryAnimal = animals[primaryType];
  const secondaryAnimal = animals[secondaryType];

  // Sort scores for display
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => ({
      type: type as AnimalType,
      score,
      animal: animals[type as AnimalType],
    }));

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Unique Sales Profile
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A personalized analysis based on your specific scores
        </p>
      </div>

      {/* Visual Score Display */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        <div className="flex justify-center items-end gap-3 mb-6">
          {sortedScores.map(({ type, score, animal }, i) => (
            <div key={type} className="text-center transition-all duration-300 hover:scale-105">
              <div
                className="w-20 rounded-t-lg flex items-end justify-center"
                style={{
                  height: `${score * 1.5}px`,
                  backgroundColor: animal.color,
                  opacity: i === 0 ? 1 : i === 1 ? 0.8 : 0.5,
                }}
              >
                <span className="text-2xl mb-2">{animal.emoji}</span>
              </div>
              <div
                className="w-20 py-2 rounded-b-lg"
                style={{ backgroundColor: `${animal.color}20` }}
              >
                <p className="text-lg font-bold" style={{ color: animal.color }}>
                  {score}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">{type === "retriever" ? "Retriever" : animal.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Blend Badge */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${primaryAnimal.color}20 0%, ${secondaryAnimal.color}20 100%)`,
            }}
          >
            <span className="text-xl">{primaryAnimal.emoji}</span>
            <span className="text-gray-400">/</span>
            <span className="text-xl">{secondaryAnimal.emoji}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {primaryAnimal.name}-{secondaryAnimal.name} Blend
            </span>
          </div>
        </div>
      </div>

      {/* Personalized Narrative */}
      <div
        className="rounded-2xl p-8 mb-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${primaryAnimal.color}08 0%, ${secondaryAnimal.color}08 100%)`,
          borderLeft: `4px solid ${primaryAnimal.color}`,
        }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Your Profile Story
        </h3>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
          {narrative}
        </p>
      </div>

      {/* Context Reminder */}
      <div className="bg-slate-100 dark:bg-gray-800 rounded-xl p-5 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.01]">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Sales Context</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm transition-all duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">What You Sell</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {salesContext.sellType === "product" ? "Products" : "Services"}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm transition-all duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Who You Sell To</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {salesContext.customerType === "b2b" ? "Businesses (B2B)" : "Consumers (B2C)"}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm transition-all duration-300 hover:scale-105">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">How You Sell</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {salesContext.salesChannel === "inside" ? "Virtual/Inside" : "In-Person/Outside"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
          The insights in this report are tailored to your specific sales environment
        </p>
      </div>

      {/* What Makes You Unique */}
      <div className="mt-8">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
          What Makes Your Profile Unique
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: `${primaryAnimal.color}10` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{primaryAnimal.emoji}</span>
              <span className="font-semibold" style={{ color: primaryAnimal.color }}>
                Primary: {primaryAnimal.name} ({scores[primaryType]}%)
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              This is your home base - the style you default to naturally. It's your superpower
              when used intentionally and your potential blind spot when overused.
            </p>
          </div>
          <div
            className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: `${secondaryAnimal.color}10` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{secondaryAnimal.emoji}</span>
              <span className="font-semibold" style={{ color: secondaryAnimal.color }}>
                Secondary: {secondaryAnimal.name} ({scores[secondaryType]}%)
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              This adds nuance to your primary style. When your {primaryAnimal.name} approach
              isn't working, you can tap into {secondaryAnimal.name} tendencies to adapt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
