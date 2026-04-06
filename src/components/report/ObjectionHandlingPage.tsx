"use client";

import { AnimalType } from "@/types";
import { getObjectionHandling } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

interface ObjectionHandlingPageProps {
  primaryType: AnimalType;
}

export function ObjectionHandlingPage({ primaryType }: ObjectionHandlingPageProps) {
  const buyerTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];
  const primaryAnimal = animals[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Handling Objections by Buyer Animal Types
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          What to say when each type pushes back
        </p>
      </div>

      {/* Objections by Buyer Type */}
      <div className="space-y-6 sm:space-y-8">
        {buyerTypes.map((buyerType) => {
          const objections = getObjectionHandling(buyerType);
          const buyerAnimal = animals[buyerType];

          return (
            <div key={buyerType}>
              {/* Buyer Type Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${buyerAnimal.color}20` }}
                >
                  <AnimalIcon type={buyerType} size="md" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    When a {buyerAnimal.name} Says...
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {buyerType === primaryType ? "(Same type as you)" : ""}
                  </p>
                </div>
              </div>

              {/* Objections */}
              <div className="space-y-3">
                {objections.slice(0, 2).map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
                    style={{ borderColor: `${buyerAnimal.color}40` }}
                  >
                    {/* Objection */}
                    <div
                      className="px-3 py-2 sm:px-4 sm:py-3"
                      style={{ backgroundColor: `${buyerAnimal.color}10` }}
                    >
                      <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                        "{item.objection}"
                      </p>
                    </div>

                    {/* Response */}
                    <div className="px-3 py-2 sm:px-4 sm:py-3 bg-white dark:bg-gray-800">
                      <p className="text-xs font-semibold text-green-600 uppercase mb-1">
                        Your Response:
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 italic text-sm mb-3">
                        "{item.response}"
                      </p>
                      <div className="bg-slate-100 dark:bg-gray-700 rounded-lg p-2">
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          <span className="font-semibold">Key Principle:</span> {item.keyPrinciple}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Tip */}
      <div
        className="mt-8 p-4 rounded-xl transition-all duration-300 hover:scale-[1.01]"
        style={{ backgroundColor: `${primaryAnimal.color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Remember:</span> As a {primaryAnimal.name}, your instinct might be to
          {primaryType === "lion" && " overcome objections with force and urgency"}
          {primaryType === "penguin" && " charm your way past objections with enthusiasm"}
          {primaryType === "retriever" && " accommodate the objection to avoid conflict"}
          {primaryType === "beaver" && " counter with data and detailed explanations"}
          . These responses help you adapt your approach to what each buyer type actually needs to hear.
        </p>
      </div>
    </div>
  );
}
