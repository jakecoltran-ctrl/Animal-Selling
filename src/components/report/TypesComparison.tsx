"use client";

import { AnimalType, TypeComparison } from "@/types";
import { typeComparisons } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";
import { ComparisonBarChart } from "@/components/report/ReportCharts";

interface TypesComparisonProps {
  primaryType: AnimalType;
}

export function TypesComparison({ primaryType }: TypesComparisonProps) {
  const animalData = animals;

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Four Types Compared
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          See where you fit in the bigger picture
        </p>
      </div>

      {/* Mobile scroll hint */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 sm:hidden">
        ← Scroll horizontally to see all types →
      </p>

      {/* Scrollable comparison table container */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[500px]">
          {/* Animal Headers */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Dimension</div>
            {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map(
              (type) => (
                <div
                  key={type}
                  className={`text-center p-2 rounded-lg ${
                    type === primaryType ? "ring-2 ring-offset-2" : ""
                  }`}
                  style={{
                    backgroundColor:
                      type === primaryType
                        ? `${animalData[type].color}20`
                        : "transparent",
                    // @ts-expect-error - CSS custom property for Tailwind ring color
                    "--tw-ring-color": type === primaryType ? animalData[type].color : undefined,
                  }}
                >
                  <span className="text-xl sm:text-2xl">{animalData[type].emoji}</span>
                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: animalData[type].color }}
                  >
                    {animalData[type].name}
                  </p>
                  {type === primaryType && (
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">(You)</span>
                  )}
                </div>
              )
            )}
          </div>

          {/* Comparison Rows */}
          <div className="space-y-2 sm:space-y-3">
            {typeComparisons.map((comparison, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-2 items-start"
              >
                <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white py-2 sm:py-3 pr-2">
                  {comparison.dimension}
                </div>
                {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map(
                  (type) => (
                    <div
                      key={type}
                      className={`text-xs p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        type === primaryType
                          ? "bg-slate-200 dark:bg-gray-700 border-2"
                          : "bg-slate-100 dark:bg-gray-800"
                      }`}
                      style={{
                        borderColor:
                          type === primaryType ? animalData[type].color : undefined,
                      }}
                    >
                      <p className="text-gray-700 dark:text-gray-200">
                        {comparison[type]}
                      </p>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Bar Chart */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
          Key Dimensions at a Glance
        </h3>
        <ComparisonBarChart primaryType={primaryType} />
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-slate-100 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.01]">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">Understanding the Grid</h3>
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div
              className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0"
              style={{ borderColor: animalData[primaryType].color }}
            />
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Your type</strong> is highlighted throughout the grid.
              Notice where your natural tendencies fall on each dimension.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Other types</strong> show different approaches. When
              selling to them, understand their natural preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div
        className="mt-6 p-4 rounded-xl transition-all duration-300 hover:scale-[1.01]"
        style={{ backgroundColor: `${animalData[primaryType].color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-medium">Key Insight:</span> There's no "best"
          type - each has unique strengths. The most effective sellers
          understand their natural style and learn to adapt when needed. Your{" "}
          {animalData[primaryType].name} style excels in certain situations,
          and awareness of other styles helps you adapt.
        </p>
      </div>
    </div>
  );
}
