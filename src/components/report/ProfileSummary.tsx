"use client";

import { AnimalInfo, AnimalType, SalesContext } from "@/types";
import { RadarChart } from "@/components/results/RadarChart";
import { BlendPieChart } from "@/components/report/ReportCharts";
import { ContextBadge } from "@/components/report/ContextBadge";
import { animals } from "@/lib/animal-data";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

interface ProfileSummaryProps {
  primaryAnimal: AnimalInfo;
  secondaryAnimal: AnimalInfo;
  percentages: Record<AnimalType, number>;
  blendDescription: string;
  salesContext: SalesContext;
}

export function ProfileSummary({
  primaryAnimal,
  secondaryAnimal,
  percentages,
  blendDescription,
  salesContext,
}: ProfileSummaryProps) {
  // Sort animals by percentage to show ranking
  const rankedAnimals = (Object.entries(percentages) as [AnimalType, number][])
    .sort(([, a], [, b]) => b - a)
    .map(([type, score], index) => ({
      type,
      score,
      rank: index + 1,
      animal: animals[type],
      label: index === 0 ? "Primary" : index === 1 ? "Secondary" : index === 2 ? "Tertiary" : "Fourth",
    }));

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Sales Profile Summary
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Understanding your unique blend of sales strengths
        </p>
        <ContextBadge salesContext={salesContext} compact />
      </div>

      {/* Ranked Animal Display - Shows clear hierarchy */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
          Your Selling Style Breakdown
        </h3>
        <div className="flex flex-col gap-3">
          {rankedAnimals.map(({ type, score, rank, animal, label }) => {
            const isPrimary = rank === 1;
            const isSecondary = rank === 2;
            const isTop2 = isPrimary || isSecondary;

            return (
              <div
                key={type}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
                  isPrimary ? "ring-2 ring-offset-2" : ""
                }`}
                style={{
                  "--tw-ring-color": isPrimary ? animal.color : undefined,
                } as React.CSSProperties}
              >
                {/* Background bar showing percentage */}
                <div
                  className="absolute inset-0 transition-all"
                  style={{
                    width: `${score}%`,
                    backgroundColor: `${animal.color}${isPrimary ? "30" : isSecondary ? "20" : "10"}`,
                  }}
                />

                {/* Content */}
                <div className={`relative flex items-center gap-4 p-4 ${isPrimary ? "py-5" : ""}`}>
                  {/* Rank Badge */}
                  <div
                    className={`flex-shrink-0 rounded-full flex items-center justify-center font-bold text-white ${
                      isPrimary ? "w-10 h-10 text-lg" : isSecondary ? "w-8 h-8 text-base" : "w-6 h-6 text-xs"
                    }`}
                    style={{ backgroundColor: animal.color }}
                  >
                    {rank}
                  </div>

                  {/* Animal Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <AnimalIcon type={type} size={isPrimary ? "xl" : isSecondary ? "lg" : "md"} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${isPrimary ? "text-xl" : isSecondary ? "text-lg" : "text-base"}`}
                          style={{ color: isTop2 ? animal.color : "#6b7280" }}
                        >
                          {animal.name}
                        </span>
                        {isTop2 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white`}
                            style={{ backgroundColor: animal.color }}
                          >
                            {label}
                          </span>
                        )}
                      </div>
                      {isTop2 && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                          {isPrimary
                            ? "Your dominant selling approach"
                            : "Influences how you adapt your style"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <span
                      className={`font-bold ${isPrimary ? "text-2xl" : isSecondary ? "text-xl" : "text-lg"}`}
                      style={{ color: isTop2 ? animal.color : "#6b7280" }}
                    >
                      {score}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Radar Chart */}
        <div className="bg-slate-100 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center mb-3">
            Style Balance
          </h3>
          <RadarChart scores={percentages} />
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-100 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center mb-3">
            Type Distribution
          </h3>
          <BlendPieChart percentages={percentages} primaryType={primaryAnimal.id} />
        </div>
      </div>

      {/* Blend Description */}
      <div
        className="rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${primaryAnimal.color}10 0%, ${secondaryAnimal.color}10 100%)`,
        }}
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <div className="flex -space-x-3 sm:-space-x-4">
            <div
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 sm:border-4 border-white dark:border-gray-700 shadow-md"
              style={{ backgroundColor: `${primaryAnimal.color}20` }}
            >
              <AnimalIcon type={primaryAnimal.id} size="lg" />
            </div>
            <div
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 sm:border-4 border-white dark:border-gray-700 shadow-md"
              style={{ backgroundColor: `${secondaryAnimal.color}20` }}
            >
              <AnimalIcon type={secondaryAnimal.id} size="lg" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {primaryAnimal.name}-{secondaryAnimal.name} Blend
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your unique combination</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
          {blendDescription}
        </p>
      </div>

    </div>
  );
}
