"use client";

import { AnimalType, SalesContext, SellingPlaybook } from "@/types";
import { getSellingPlaybook } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";
import { ContextBadge } from "@/components/report/ContextBadge";

interface SellingPlaybookPageProps {
  primaryType: AnimalType;
  salesContext: SalesContext;
}

export function SellingPlaybookPage({ primaryType, salesContext }: SellingPlaybookPageProps) {
  const animalData = animals;
  const targetTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];
  const contextLabel = salesContext.sellType === "product" ? "Product" : "Service";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          How A {animalData[primaryType].name} {animalData[primaryType].emoji} Sells {contextLabel}s
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Adapt your {animalData[primaryType].name} style to connect with any buyer
        </p>
        <ContextBadge salesContext={salesContext} compact />
      </div>

      {/* Playbook Grid */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {targetTypes.map((targetType) => {
          const playbook = getSellingPlaybook(primaryType, targetType);
          if (!playbook) return null;

          const targetAnimal = animalData[targetType];
          const isSameType = primaryType === targetType;

          return (
            <div
              key={targetType}
              className="rounded-xl border-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ borderColor: targetAnimal.color }}
            >
              {/* Card Header */}
              <div
                className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
                style={{ backgroundColor: `${targetAnimal.color}15` }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${targetAnimal.color}30` }}
                >
                  <span className="text-xl sm:text-2xl">{targetAnimal.emoji}</span>
                </div>
                <div>
                  <h3
                    className="font-bold"
                    style={{ color: targetAnimal.color }}
                  >
                    Selling to {targetAnimal.name}s
                  </h3>
                  {isSameType && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      (Same type as you)
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {/* Approach */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    Approach Strategy
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {playbook.approachStrategy}
                  </p>
                </div>

                {/* Recognition Signals */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    How to Spot Them
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {playbook.recognitionSignals.slice(0, 2).map((signal, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: targetAnimal.color }}>•</span>
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Motivators */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    What Motivates Them
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {playbook.keyMotivators.slice(0, 3).map((motivator, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${targetAnimal.color}15`,
                          color: targetAnimal.color,
                        }}
                      >
                        {motivator}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Avoid */}
                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-1">
                    Avoid
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {playbook.avoid.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Closing */}
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${targetAnimal.color}10` }}
                >
                  <h4
                    className="text-sm font-semibold mb-1"
                    style={{ color: targetAnimal.color }}
                  >
                    How to Close
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-200">
                    {playbook.closingTechnique}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Tip */}
      <div
        className="mt-6 p-4 rounded-xl transition-all duration-300 hover:scale-[1.01]"
        style={{ backgroundColor: `${animalData[primaryType].color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-medium">Pro Tip:</span> As a{" "}
          {animalData[primaryType].name}, your natural style works best with
          buyers who share your preferences. For other types, consciously
          adapt your approach - it may feel unnatural at first, but meeting
          buyers where they are dramatically improves your success rate.
        </p>
      </div>
    </div>
  );
}
