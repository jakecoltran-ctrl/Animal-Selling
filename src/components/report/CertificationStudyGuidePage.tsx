"use client";

import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { Trophy, Target, AlertTriangle, ShoppingCart } from "lucide-react";

interface CertificationStudyGuidePageProps {
  primaryType: AnimalType;
}

const studyGuideData: Record<
  AnimalType,
  {
    title: string;
    buyerSignals: string[];
    keyTraits: string[];
    blindSpots: string[];
    sellingToThem: string[];
  }
> = {
  lion: {
    title: "The Closer",
    buyerSignals: [
      "Direct, short responses ('Yes', 'No', 'Get to the point')",
      "Focuses on ROI, results, and bottom-line impact",
      "Impatient with small talk and detailed explanations",
      "Mentions targets, deadlines, and competitive pressure",
      "Interrupts presentations to ask about outcomes",
    ],
    keyTraits: [
      "Decisive under pressure",
      "Results-driven and goal-oriented",
      "Competitive and confident",
      "Direct communicator",
      "Natural leader who takes charge",
    ],
    blindSpots: [
      "Can push too hard and create buyer resistance",
      "May miss relationship needs and emotional cues",
      "Impatient with slow decision-makers",
      "Can overlook important details in rush to close",
    ],
    sellingToThem: [
      "Be direct - lead with results and ROI",
      "Respect their time - skip the small talk",
      "Have data ready but don't over-present",
      "Match their pace and decisiveness",
      "Focus on competitive advantage",
    ],
  },
  penguin: {
    title: "The Connector",
    buyerSignals: [
      "Starts with personal conversation and small talk",
      "Introduces you to colleagues and other departments",
      "Mentions relationships, partnerships, collaboration",
      "Enthusiastic and expressive communication style",
      "Suggests informal meetings (coffee, lunch, events)",
    ],
    keyTraits: [
      "Creates genuine, lasting connections",
      "Enthusiastic and positive energy",
      "Natural networker who expands pipelines",
      "Collaborative and team-oriented",
      "Expressive and engaging communicator",
    ],
    blindSpots: [
      "May over-promise in the heat of enthusiasm",
      "Can have scattered focus across opportunities",
      "May avoid difficult conversations",
      "Sometimes prioritizes relationships over results",
    ],
    sellingToThem: [
      "Build rapport first - invest in the relationship",
      "Show enthusiasm and match their energy",
      "Leverage their network for referrals",
      "Focus on partnership and collaboration",
      "Keep things fun and engaging",
    ],
  },
  retriever: {
    title: "The Trusted Advisor",
    buyerSignals: [
      "Mentions team impact and how others feel",
      "Wants consensus before making decisions",
      "Values loyalty and long-term relationships",
      "Patient, methodical decision process",
      "Thanks you for your patience and support",
    ],
    keyTraits: [
      "Creates deep, lasting client relationships",
      "Patient and consistent follow-through",
      "Team-focused and consensus-builder",
      "Trustworthy and reliable",
      "De-escalates tense situations",
    ],
    blindSpots: [
      "Slow to decide - may miss opportunities",
      "Avoids necessary confrontation",
      "Can be too accommodating",
      "May struggle with aggressive negotiators",
    ],
    sellingToThem: [
      "Show patience - don't rush their process",
      "Address team concerns and impact",
      "Provide steady, consistent support",
      "Build trust through reliability",
      "Respect their need for consensus",
    ],
  },
  beaver: {
    title: "The Specialist",
    buyerSignals: [
      "Asks detailed, specific questions",
      "Requests documentation, specs, and data",
      "Methodical evaluation process",
      "Wants to 'run the numbers' before deciding",
      "Creates comparison matrices and analyses",
    ],
    keyTraits: [
      "Deep expertise and product knowledge",
      "Thorough preparation and research",
      "Analytical and detail-oriented",
      "Builds bulletproof proposals",
      "Systematic approach to everything",
    ],
    blindSpots: [
      "Analysis paralysis can slow deals",
      "May miss the big picture for details",
      "Can be slow to act on opportunities",
      "May struggle with relationship-first buyers",
    ],
    sellingToThem: [
      "Provide comprehensive data and documentation",
      "Be prepared to answer detailed questions",
      "Give them time to analyze and evaluate",
      "Respect their systematic process",
      "Have backup data and proof points ready",
    ],
  },
};

export function CertificationStudyGuidePage({
  primaryType,
}: CertificationStudyGuidePageProps) {
  const animalTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-3">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Certification Study Guide
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Quick-reference guide to ace your certification games
        </p>
      </div>

      {/* Intro Note */}
      <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Pro Tip:</strong> The certification tests your ability to identify buyer types and
          understand each animal's strengths and blind spots. Use this cheat sheet to review before
          each game!
        </p>
      </div>

      {/* Animal Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animalTypes.map((type) => {
          const animal = animals[type];
          const guide = studyGuideData[type];
          const isUserType = type === primaryType;

          return (
            <div
              key={type}
              className={`rounded-xl border-2 overflow-hidden transition-all ${
                isUserType
                  ? "border-2 ring-2 ring-offset-2"
                  : "border-gray-200 dark:border-gray-700"
              }`}
              style={{
                borderColor: isUserType ? animal.color : undefined,
                // @ts-expect-error - CSS custom property for ring color
                "--tw-ring-color": isUserType ? animal.color : undefined,
              }}
            >
              {/* Card Header */}
              <div
                className="px-4 py-3 flex items-center gap-3"
                style={{ backgroundColor: `${animal.color}15` }}
              >
                <AnimalIcon type={type} size="md" />
                <div>
                  <h3 className="font-bold" style={{ color: animal.color }}>
                    {animal.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{guide.title}</p>
                </div>
                {isUserType && (
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 font-medium">
                    You
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3 bg-white dark:bg-gray-900">
                {/* Buyer Signals */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Target className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Buyer Signals
                    </span>
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                    {guide.buyerSignals.slice(0, 3).map((signal, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Blind Spots */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Blind Spots
                    </span>
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                    {guide.blindSpots.slice(0, 2).map((spot, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        {spot}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selling To Them */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <ShoppingCart className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Selling To Them
                    </span>
                  </div>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                    {guide.sellingToThem.slice(0, 2).map((tip, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-slate-100 dark:bg-gray-800 rounded-xl">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">
          Game Day Tips
        </h3>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">1.</span>
            Read scenarios carefully - buyer signals reveal their type
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">2.</span>
            Match selling approach to buyer type, not your own type
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">3.</span>
            Blind spots are common test topics - know each type's weaknesses
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-500">4.</span>
            When in doubt, think about what that buyer would value most
          </li>
        </ul>
      </div>
    </div>
  );
}
