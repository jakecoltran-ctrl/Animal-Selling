"use client";

import Link from "next/link";
import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";
import { Button } from "@/components/ui/button";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { Users, Trophy, Award, Gamepad2 } from "lucide-react";

interface TeamPreviewProps {
  primaryType: AnimalType;
}

export function TeamPreview({ primaryType }: TeamPreviewProps) {
  const primaryAnimal = animals[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Continue Your Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Take your Animal Selling knowledge to the next level
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Team Safari Section */}
        <div
          className="rounded-2xl p-5 sm:p-6 border-2 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(217,119,6,0.08) 25%, rgba(8,145,178,0.08) 50%, rgba(5,150,105,0.08) 100%)",
            borderColor: "#d9770640",
          }}
        >
          <div className="flex justify-center gap-1.5 mb-3">
            <AnimalIcon type="lion" size="lg" />
            <AnimalIcon type="penguin" size="lg" />
            <AnimalIcon type="retriever" size="lg" />
            <AnimalIcon type="beaver" size="lg" />
          </div>

          <div className="text-center mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
              Team Safari™
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              See how your team's animal types work together
            </p>
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>View team composition & balance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span>Discover optimal pairings for deals</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Match sellers to buyer types</span>
            </div>
          </div>

          <Link href="/dashboard/team" className="block">
            <Button
              className="w-full text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
            >
              <Users className="w-4 h-4 mr-2" />
              Start Team Safari™
            </Button>
          </Link>
        </div>

        {/* Certification Section */}
        <div
          className="rounded-2xl p-5 sm:p-6 border-2 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(234,88,12,0.08) 100%)",
            borderColor: "#f59e0b40",
          }}
        >
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
              Get Certified
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Prove your Animal Selling expertise
            </p>
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Gamepad2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>4 interactive games to test your knowledge</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Award className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span>Earn badges for your achievements</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Trophy className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Download your official certificate</span>
            </div>
          </div>

          <Link href="/certification" className="block">
            <Button
              className="w-full text-white shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Start Certification
            </Button>
          </Link>
        </div>
      </div>

      {/* How Your Type Fits */}
      <div
        className="mt-6 p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.01]"
        style={{
          backgroundColor: `${primaryAnimal.color}08`,
          borderColor: `${primaryAnimal.color}40`,
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${primaryAnimal.color}20` }}
          >
            <AnimalIcon type={primaryType} size="md" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
            How {primaryAnimal.name}s Contribute to Teams
          </h3>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          {primaryType === "lion" &&
            "Lions bring urgency and accountability. You push the team toward action and hold everyone to high standards. Your directness cuts through ambiguity when decisions need to be made."}
          {primaryType === "penguin" &&
            "Penguins bring energy and connection. You keep morale high and help the team build relationships with customers. Your enthusiasm is contagious during tough stretches."}
          {primaryType === "retriever" &&
            "Retrievers bring stability and trust. You're the steady presence that keeps customers loyal and team members supported. Your patience balances more aggressive teammates."}
          {primaryType === "beaver" &&
            "Beavers bring rigor and credibility. You ensure the team's proposals are bulletproof and commitments are realistic. Your preparation prevents costly mistakes."}
        </p>
      </div>

      {/* Pro Tip */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-xs text-amber-800 dark:text-amber-200 text-center">
          <strong>Pro Tip:</strong> Use pages 13-14 of this report (Certification Study Guide & Discovery Questions) to ace the certification games!
        </p>
      </div>
    </div>
  );
}
