"use client";

import { AnimalType } from "@/types";
import { getPrimaryMasteryPlan } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";

interface ThirtyDayPlanPageProps {
  primaryType: AnimalType;
  secondaryType: AnimalType;
}

export function ThirtyDayPlanPage({ primaryType, secondaryType }: ThirtyDayPlanPageProps) {
  const plan = getPrimaryMasteryPlan(primaryType, secondaryType);
  const primaryAnimal = animals[primaryType];
  const secondaryAnimal = animals[secondaryType];

  const weekColors = [
    primaryAnimal.color,
    "#8b5cf6", // purple
    secondaryAnimal.color,
    "#10b981", // green
  ];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your 30-Day Action Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {plan.subtitle}
        </p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ backgroundColor: `${primaryAnimal.color}15` }}
        >
          <span className="text-xl">{primaryAnimal.emoji}</span>
          <span className="font-medium" style={{ color: primaryAnimal.color }}>
            {plan.title}
          </span>
          <span className="text-gray-400">+</span>
          <span className="text-xl">{secondaryAnimal.emoji}</span>
        </div>
      </div>

      {/* Daily Habit */}
      <div
        className="mb-6 p-4 rounded-xl border-2"
        style={{ borderColor: primaryAnimal.color, backgroundColor: `${primaryAnimal.color}08` }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: primaryAnimal.color }}
          >
            <span className="text-white text-lg">✦</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Daily Habit</h3>
            <p className="text-gray-700 dark:text-gray-200">{plan.dailyHabit}</p>
          </div>
        </div>
      </div>

      {/* Weekly Plans */}
      <div className="space-y-6">
        {plan.weeks.map((week, i) => (
          <div key={i} className="rounded-xl border overflow-hidden">
            {/* Week Header */}
            <div
              className="px-4 py-3 text-white"
              style={{ backgroundColor: weekColors[i] }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-80">Week {week.week}</p>
                  <h4 className="font-bold">{week.theme}</h4>
                </div>
                <div className="text-3xl font-bold opacity-30">
                  {week.week}
                </div>
              </div>
            </div>

            {/* Week Content */}
            <div className="p-4 bg-white dark:bg-gray-800">
              {/* Actions */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Actions
                </p>
                <ul className="space-y-2">
                  {week.actions.map((action, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs mt-0.5"
                        style={{ backgroundColor: weekColors[i] }}
                      >
                        {j + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Success Metric */}
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${weekColors[i]}15` }}
              >
                <p className="text-xs font-semibold uppercase mb-1" style={{ color: weekColors[i] }}>
                  Success Metric
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-200">{week.successMetric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Note */}
      <div
        className="mt-6 p-4 rounded-xl"
        style={{ backgroundColor: `${primaryAnimal.color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Your {primaryAnimal.name}-{secondaryAnimal.name} Blend:</span> This plan helps you
          master your natural {primaryAnimal.name} strengths while strategically leveraging your {secondaryAnimal.name}
          tendencies. Week 3 specifically focuses on combining both styles for maximum impact.
        </p>
      </div>
    </div>
  );
}
