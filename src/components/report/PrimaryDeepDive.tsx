"use client";

import { AnimalInfo, SalesContext } from "@/types";
import {
  getContextualBehaviors,
  getContextualBlindSpots,
  getContextualSuperpowers,
  getContextualTips,
} from "@/lib/report-data";
import { StrengthsRadar } from "@/components/report/ReportCharts";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

interface PrimaryDeepDiveProps {
  primaryAnimal: AnimalInfo;
  salesContext: SalesContext;
}

export function PrimaryDeepDive({
  primaryAnimal,
  salesContext,
}: PrimaryDeepDiveProps) {
  const behaviors = getContextualBehaviors(primaryAnimal.id, salesContext);
  const blindSpots = getContextualBlindSpots(primaryAnimal.id, salesContext);
  const superpowers = getContextualSuperpowers(primaryAnimal.id, salesContext);
  const tips = getContextualTips(primaryAnimal.id, salesContext);

  const contextLabels = {
    sellType: salesContext.sellType === "product" ? "product" : "service",
    customerType: salesContext.customerType,
    salesChannel: salesContext.salesChannel,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
          style={{ backgroundColor: `${primaryAnimal.color}20` }}
        >
          <AnimalIcon type={primaryAnimal.id} size="xl" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            The {primaryAnimal.name}: Deep Dive
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{primaryAnimal.title}</p>
        </div>
      </div>

      {/* Context Note */}
      <div
        className="rounded-xl p-4 mb-8"
        style={{ backgroundColor: `${primaryAnimal.color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-medium">Tailored for:</span> {contextLabels.sellType} sales,{" "}
          {contextLabels.customerType.toUpperCase()},{" "}
          {contextLabels.salesChannel === "inside" ? "inside" : "outside"} sales
        </p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
          {primaryAnimal.description}
        </p>
      </div>

      {/* Strengths Radar */}
      <div className="mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
          Your Selling Strengths Profile
        </h3>
        <StrengthsRadar primaryType={primaryAnimal.id} />
      </div>

      {/* Selling Behaviors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: primaryAnimal.color }}
          >
            1
          </span>
          How You Sell
        </h3>
        <div className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.01]">
          <ul className="space-y-3">
            {behaviors.map((behavior, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: primaryAnimal.color }}
                />
                <span className="text-gray-700 dark:text-gray-200">{behavior}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Two Column: Superpowers & Blind Spots */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Superpowers */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs sm:text-sm">
              2
            </span>
            Your Superpowers
          </h3>
          <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800 transition-all duration-300 hover:scale-[1.02]">
            <ul className="space-y-3">
              {superpowers.map((superpower, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">+</span>
                  <span className="text-gray-700 dark:text-gray-200">{superpower}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Blind Spots */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs sm:text-sm">
              3
            </span>
            Watch Out For
          </h3>
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded-xl p-4 sm:p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:scale-[1.02]">
            <ul className="space-y-3">
              {blindSpots.map((blindSpot, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-500 mt-0.5">!</span>
                  <span className="text-gray-700 dark:text-gray-200">{blindSpot}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Context-Specific Tips */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: primaryAnimal.color }}
          >
            4
          </span>
          Tips for Your Environment
        </h3>
        <div
          className="rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{ backgroundColor: `${primaryAnimal.color}08` }}
        >
          <ul className="space-y-3 sm:space-y-4">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ backgroundColor: primaryAnimal.color }}
                >
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-200">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ideal Roles */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: primaryAnimal.color }}
          >
            5
          </span>
          Ideal Roles
        </h3>
        <div className="flex flex-wrap gap-3">
          {primaryAnimal.idealRoles.map((role, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: `${primaryAnimal.color}15`,
                color: primaryAnimal.color,
              }}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
