"use client";

import { AnimalType } from "@/types";
import { getSalesScripts } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";

interface SalesScriptsPageProps {
  primaryType: AnimalType;
}

export function SalesScriptsPage({ primaryType }: SalesScriptsPageProps) {
  const scripts = getSalesScripts(primaryType);
  const animal = animals[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Scripts & Phrases That Work for {animal.name}s
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ready-to-use language that fits your natural style
        </p>
      </div>

      {/* Opening Lines */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: animal.color }}
          >
            1
          </span>
          Opening Lines
        </h3>
        <div className="space-y-3">
          {scripts.openingLines.map((item, i) => (
            <div key={i} className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 border border-slate-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                {item.situation}
              </p>
              <p className="text-gray-800 dark:text-white italic">"{item.script}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Discovery Questions */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: animal.color }}
          >
            2
          </span>
          Discovery Questions
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {scripts.discoveryQuestions.map((item, i) => (
            <div key={i} className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 border border-slate-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                {item.purpose}
              </p>
              <p className="text-gray-800 dark:text-white italic">"{item.script}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Value Statements */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: animal.color }}
          >
            3
          </span>
          Value Statements
        </h3>
        <div className="space-y-3">
          {scripts.valueStatements.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4 border-l-4"
              style={{ backgroundColor: `${animal.color}08`, borderColor: animal.color }}
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                {item.context}
              </p>
              <p className="text-gray-800 dark:text-white italic">"{item.script}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Phrases */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: animal.color }}
          >
            4
          </span>
          Closing Phrases
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {scripts.closingPhrases.map((item, i) => (
            <div key={i} className="bg-slate-100 dark:bg-gray-800 rounded-xl p-4 border border-slate-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                {item.situation}
              </p>
              <p className="text-gray-800 dark:text-white italic">"{item.script}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Follow-Up Templates */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor: animal.color }}
          >
            5
          </span>
          Follow-Up Templates
        </h3>
        <div className="space-y-3">
          {scripts.followUpTemplates.map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border dark:border-gray-700 shadow-sm">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                {item.scenario}
              </p>
              <p className="text-gray-800 dark:text-white italic text-sm">"{item.script}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div
        className="mt-8 p-4 rounded-xl"
        style={{ backgroundColor: `${animal.color}10` }}
      >
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Pro Tip:</span> These scripts are starting points, not rigid rules.
          Adapt the language to feel natural for you while keeping the underlying approach that works for your {animal.name} style.
        </p>
      </div>
    </div>
  );
}
