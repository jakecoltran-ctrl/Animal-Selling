"use client";

import { useState, useEffect } from "react";
import { AnimalType } from "@/types";
import { getSelfCoachingQuestions } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";

interface SelfCoachingPageProps {
  primaryType: AnimalType;
  resultId?: string;
}

export function SelfCoachingPage({ primaryType, resultId }: SelfCoachingPageProps) {
  const questions = getSelfCoachingQuestions(primaryType);
  const animal = animals[primaryType];

  const [reflections, setReflections] = useState<Record<number, string>>({});

  // Load saved reflections on mount
  useEffect(() => {
    if (resultId) {
      const saved = localStorage.getItem(`reflections_${resultId}`);
      if (saved) {
        setReflections(JSON.parse(saved));
      }
    }
  }, [resultId]);

  // Save reflection when it changes
  const handleReflectionChange = (index: number, value: string) => {
    const updated = { ...reflections, [index]: value };
    setReflections(updated);
    if (resultId) {
      localStorage.setItem(`reflections_${resultId}`, JSON.stringify(updated));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Self-Coaching Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Reflection prompts to accelerate your growth as a {animal.name}
        </p>
      </div>

      {/* Intro */}
      <div
        className="mb-8 p-6 rounded-xl"
        style={{ backgroundColor: `${animal.color}10` }}
      >
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          The best salespeople don't just work hard - they reflect intentionally on what's working and what isn't.
          These questions are designed to help you, as a {animal.name}, examine your blind spots and identify
          opportunities for growth. Set aside 15 minutes weekly to journal on one of these questions.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border-2 overflow-hidden"
            style={{ borderColor: `${animal.color}30` }}
          >
            {/* Category Header */}
            <div
              className="px-4 py-2 flex items-center gap-2"
              style={{ backgroundColor: `${animal.color}15` }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: animal.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm font-semibold" style={{ color: animal.color }}>
                {item.category}
              </span>
            </div>

            {/* Question Content */}
            <div className="p-5 bg-white dark:bg-gray-800">
              {/* Main Question */}
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                  {item.question}
                </p>
              </div>

              {/* Follow-up */}
              <div className="pl-4 border-l-2" style={{ borderColor: animal.color }}>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">
                  Go deeper:
                </p>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  {item.followUp}
                </p>
              </div>

              {/* Journaling Space */}
              <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                <textarea
                  className="w-full h-24 p-3 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRing: animal.color }}
                  placeholder="Space for reflection..."
                  value={reflections[i] || ""}
                  onChange={(e) => handleReflectionChange(i, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to Use */}
      <div className="mt-8 bg-slate-100 dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">How to Use These Questions</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
              style={{ backgroundColor: animal.color }}
            >
              1
            </span>
            <p className="text-gray-600 dark:text-gray-300">
              Pick one question per week - don't try to answer them all at once
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
              style={{ backgroundColor: animal.color }}
            >
              2
            </span>
            <p className="text-gray-600 dark:text-gray-300">
              Write your answers - the act of writing creates deeper insights than just thinking
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
              style={{ backgroundColor: animal.color }}
            >
              3
            </span>
            <p className="text-gray-600 dark:text-gray-300">
              Identify one action from your reflection and commit to trying it this week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
