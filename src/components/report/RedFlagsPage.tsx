"use client";

import { AnimalType } from "@/types";
import { getRedFlagScenarios } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";

interface RedFlagsPageProps {
  primaryType: AnimalType;
}

export function RedFlagsPage({ primaryType }: RedFlagsPageProps) {
  const scenarios = getRedFlagScenarios(primaryType);
  const animal = animals[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Red Flag Moments for {animal.name}s
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Catch yourself before your natural instincts work against you
        </p>
      </div>

      {/* Intro */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:scale-[1.01]">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <p className="text-gray-700 dark:text-gray-200">
            Your {animal.name} strengths become weaknesses when overused. These scenarios describe
            moments where your natural instincts might lead you astray - and what to do instead.
          </p>
        </div>
      </div>

      {/* Scenarios */}
      <div className="space-y-4 sm:space-y-6">
        {scenarios.map((scenario, i) => (
          <div
            key={i}
            className="rounded-xl border overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
          >
            {/* Trigger */}
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold"
                  style={{ backgroundColor: animal.color }}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Trigger Situation
                </span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {scenario.trigger}
              </p>
            </div>

            {/* Body */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-5">
              {/* Internal Sign - Red Flag */}
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3">
                  <span className="text-lg">🚩</span>
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase mb-1">
                      Red Flag (What You're Feeling)
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                      {scenario.internalSign}
                    </p>
                  </div>
                </div>
              </div>

              {/* Correction - Warning */}
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 uppercase mb-1">
                      Why It's a Problem
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                      {scenario.correction}
                    </p>
                  </div>
                </div>
              </div>

              {/* Better Approach - Green */}
              <div className="p-3 sm:p-4 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase mb-1">
                      Better Approach
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                      {scenario.betterApproach}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tip */}
      <div
        className="mt-8 p-5 rounded-xl transition-all duration-300 hover:scale-[1.01]"
        style={{ backgroundColor: `${animal.color}10` }}
      >
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Building Self-Awareness</h3>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          The key to growth isn't eliminating your {animal.name} instincts - it's recognizing when they're
          helping versus hurting. When you notice one of these red flags, that awareness itself is the first victory.
          Take a breath, choose the better approach, and notice what happens.
        </p>
      </div>
    </div>
  );
}
