"use client";

import { AnimalInfo, BlendProfile } from "@/types";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

interface SecondaryInfluenceProps {
  primaryAnimal: AnimalInfo;
  secondaryAnimal: AnimalInfo;
  blendProfile: BlendProfile;
}

export function SecondaryInfluence({
  primaryAnimal,
  secondaryAnimal,
  blendProfile,
}: SecondaryInfluenceProps) {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="flex justify-center -space-x-3 sm:-space-x-4 mb-4 sm:mb-6">
          <div
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-2 sm:border-4 border-white dark:border-gray-700 shadow-lg"
            style={{ backgroundColor: `${primaryAnimal.color}20` }}
          >
            <AnimalIcon type={primaryAnimal.id} size="2xl" className="relative z-10" />
          </div>
          <div
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-2 sm:border-4 border-white dark:border-gray-700 shadow-lg"
            style={{ backgroundColor: `${secondaryAnimal.color}20` }}
          >
            <AnimalIcon type={secondaryAnimal.id} size="2xl" className="relative z-10" />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {blendProfile.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          How your {secondaryAnimal.name} side influences your {primaryAnimal.name} core
        </p>
      </div>

      {/* Blend Description */}
      <div
        className="rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${primaryAnimal.color}15 0%, ${secondaryAnimal.color}15 100%)`,
        }}
      >
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
          {blendProfile.description}
        </p>
      </div>

      {/* How Secondary Modifies Primary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          How Your {secondaryAnimal.name} Side Shapes You
        </h3>
        <div className="grid gap-4">
          {blendProfile.howSecondaryModifies.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${secondaryAnimal.color}20` }}
              >
                <AnimalIcon type={secondaryAnimal.id} size="md" />
              </div>
              <p className="text-gray-700 dark:text-gray-200 pt-2">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Unique Strengths & Watch For */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Unique Strengths */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              +
            </span>
            Unique Blend Strengths
          </h3>
          <div className="space-y-3">
            {blendProfile.uniqueStrengths.map((strength, i) => (
              <div
                key={i}
                className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800 transition-all duration-300 hover:scale-[1.02]"
              >
                <p className="text-gray-700 dark:text-gray-200">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Watch For */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
              !
            </span>
            Blend Tensions to Manage
          </h3>
          <div className="space-y-3">
            {blendProfile.watchFor.map((item, i) => (
              <div
                key={i}
                className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:scale-[1.02]"
              >
                <p className="text-gray-700 dark:text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blend Insight */}
      <div
        className="mt-8 p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
        style={{ borderColor: primaryAnimal.color }}
      >
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <AnimalIcon type={primaryAnimal.id} size="md" />
          <AnimalIcon type={secondaryAnimal.id} size="md" />
          Your Blend in Action
        </h3>
        <p className="text-gray-700 dark:text-gray-200">
          As a {primaryAnimal.name}-{secondaryAnimal.name}, you have a unique advantage:
          your primary {primaryAnimal.name} drive is moderated by {secondaryAnimal.name} qualities
          that help you connect with a wider range of buyers. Use your {secondaryAnimal.name} instincts
          to read situations where pure {primaryAnimal.name} energy might be too much,
          and lean into your {primaryAnimal.name} core when decisiveness is needed.
        </p>
      </div>
    </div>
  );
}
