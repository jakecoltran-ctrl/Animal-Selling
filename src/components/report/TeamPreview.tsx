"use client";

import Link from "next/link";
import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";
import { Button } from "@/components/ui/button";

interface TeamPreviewProps {
  primaryType: AnimalType;
}

export function TeamPreview({ primaryType }: TeamPreviewProps) {
  const primaryAnimal = animals[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🦁🐧🐕🦫</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Team Safari: Better Together
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Great sales teams have a mix of styles. Understanding your team's
          composition helps you leverage complementary strengths.
        </p>
      </div>

      {/* Team Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-white/10 rounded-xl border-2 border-red-200 dark:border-red-500/30 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Team Composition</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            See how your team's animal types are distributed. Identify gaps
            and strengths in your collective selling style.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-white/10 rounded-xl border-2 border-amber-200 dark:border-amber-500/30 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Optimal Pairings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Discover which team members work best together on deals. Pair
            complementary styles for maximum effectiveness.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-white/10 rounded-xl border-2 border-cyan-200 dark:border-cyan-500/30 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Account Assignment</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Match sellers to accounts based on buyer preferences. Lions on
            Lion buyers, Retrievers on Retriever buyers.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-white/10 rounded-xl border-2 border-emerald-200 dark:border-emerald-500/30 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Team Development</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Identify which skills your team needs to develop collectively.
            Build a balanced, adaptable sales organization.
          </p>
        </div>
      </div>

      {/* Main CTA - Start or Join Team */}
      <div
        className="rounded-2xl p-10 text-center border-4 mb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(217,119,6,0.1) 25%, rgba(8,145,178,0.1) 50%, rgba(5,150,105,0.1) 100%)",
          borderImage: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669) 1",
        }}
      >
        <div className="text-6xl mb-4">🦁🐧🐕🦫</div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Start Your Team Safari
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
          Create your team and invite teammates to discover your collective
          selling strengths. See how your animal types complement each other.
        </p>
        <Link href="/dashboard/team">
          <Button
            size="lg"
            className="text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all press-effect hover-glow"
            style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
          >
            Create Your Team Safari
          </Button>
        </Link>
      </div>

      {/* Secondary CTA - Join Existing Team */}
      <div className="rounded-xl p-6 text-center bg-white dark:bg-white/10 border-2 border-dashed border-gray-300 dark:border-gray-500">
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <span className="font-semibold">Already have a team?</span> If your manager or teammate sent you an invite link, use it to join your team.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your results will automatically be added to the team dashboard.
        </p>
      </div>

      {/* How Your Type Fits */}
      <div
        className="mt-8 p-6 rounded-xl border-2"
        style={{
          backgroundColor: `${primaryAnimal.color}08`,
          borderColor: `${primaryAnimal.color}40`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${primaryAnimal.color}20` }}
          >
            <span className="text-2xl">{primaryAnimal.emoji}</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white">
            How {primaryAnimal.name}s Contribute to Teams
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-200">
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
    </div>
  );
}
