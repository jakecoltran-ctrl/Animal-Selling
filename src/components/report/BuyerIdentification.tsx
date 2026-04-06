"use client";

import { useState } from "react";
import { AnimalType, SalesContext } from "@/types";
import { buyerIdentificationSignals } from "@/lib/report-data";
import { animals } from "@/lib/animal-data";
import { ContextBadge } from "@/components/report/ContextBadge";
import { AnimalIcon } from "@/components/ui/AnimalIcon";

interface BuyerIdentificationProps {
  primaryType: AnimalType;
  salesContext: SalesContext;
  showBuyerType?: AnimalType; // Force display of a specific buyer type (for PDF)
  hideSelector?: boolean; // Hide the type selector (for PDF)
}

// Perspective-based tips for how each seller type can identify each buyer type
const identificationTips: Record<AnimalType, Record<AnimalType, string[]>> = {
  lion: {
    lion: [
      "You'll recognize them instantly - they match your energy and directness",
      "They'll challenge you right back, which you'll respect",
      "Watch for power struggles - two Lions can butt heads",
      "Use your shared drive: get to the point and compete on results",
    ],
    penguin: [
      "They'll want to chat when you want to close - that's your sign",
      "They get excited easily, which might feel unfocused to you",
      "Slow down slightly - your directness can shut them down",
      "Let them talk about relationships before you drive to business",
    ],
    retriever: [
      "They'll seem slow to decide - frustrating for you, but it's their process",
      "They keep asking about their team when you want to talk ROI",
      "Your urgency can scare them off - ease up on the pressure",
      "They need trust before speed - give them references upfront",
    ],
    beaver: [
      "They'll ask detailed questions that feel like they're stalling",
      "Your gut-based decisions confuse them - they need data",
      "Don't rush them or they'll dig in deeper",
      "Come prepared with specs and proof - it speeds them up",
    ],
  },
  penguin: {
    lion: [
      "They'll cut off your stories and small talk - don't take it personally",
      "They seem cold, but they just want the bottom line fast",
      "Resist the urge to build rapport first - get to business quickly",
      "Your enthusiasm won't win them - results and speed will",
    ],
    penguin: [
      "You'll click immediately and have a great conversation",
      "Warning: you might both get excited and forget to close",
      "Fun meeting, but make sure someone drives to a decision",
      "Use your connection, but set a time to talk business",
    ],
    retriever: [
      "They're warm like you, but quieter - let them talk more",
      "They genuinely care about their team, not just saying it",
      "Your energy might overwhelm them - dial it back slightly",
      "Build the relationship, but focus on how you'll support them",
    ],
    beaver: [
      "They won't match your enthusiasm - that's okay, it's not personal",
      "Your stories and vision won't convince them - data will",
      "They need proof, not excitement",
      "Prepare documentation before the meeting - they'll ask for it",
    ],
  },
  retriever: {
    lion: [
      "They'll seem aggressive and rushed - don't let it throw you off",
      "They don't want to build a relationship first like you do",
      "Your careful approach may frustrate them - pick up the pace",
      "Focus on results and speed, save the relationship building for later",
    ],
    penguin: [
      "They're friendly like you, but much more energetic",
      "They'll bounce between topics - gently guide them back",
      "You'll enjoy the connection, but don't forget your agenda",
      "They decide emotionally - your trustworthiness is your advantage",
    ],
    retriever: [
      "You'll feel comfortable with them - same steady energy",
      "You might both avoid pushing for a decision",
      "Someone needs to move things forward - it might have to be you",
      "Build the relationship, but set clear next steps",
    ],
    beaver: [
      "They're cautious like you, but focused on data not people",
      "They won't small talk much - get to the details they want",
      "Your patience is an asset here - they need time too",
      "Provide thorough information and give them space to analyze",
    ],
  },
  beaver: {
    lion: [
      "They'll want a decision before you've finished your analysis",
      "Your detailed approach will frustrate them - lead with conclusions",
      "They trust their gut when you want to see the data",
      "Give them the bottom line first, details only if they ask",
    ],
    penguin: [
      "They'll seem scattered and unfocused to you",
      "They make decisions based on feelings, not your careful analysis",
      "Your detailed presentation may lose their attention",
      "Lead with the vision and story, save the specs for follow-up",
    ],
    retriever: [
      "They're methodical like you, but focused on people not process",
      "They need to check with their team - similar to your need to analyze",
      "Your thoroughness reassures them - use it",
      "Include information about support and service, not just specs",
    ],
    beaver: [
      "You'll appreciate each other's thoroughness",
      "The sale might take longer as you both analyze everything",
      "You speak the same language - use detailed documentation",
      "Be prepared for extensive due diligence - you'd do the same",
    ],
  },
};

export function BuyerIdentification({ primaryType, salesContext, showBuyerType, hideSelector }: BuyerIdentificationProps) {
  const animalData = animals;
  const allTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];
  const [selectedType, setSelectedType] = useState<AnimalType>(
    showBuyerType || allTypes.find(t => t !== primaryType) || "lion"
  );

  // Use forced type if provided (for PDF)
  const displayType = showBuyerType || selectedType;

  const selectedSignals = buyerIdentificationSignals.find(s => s.type === displayType);
  const selectedAnimal = animalData[displayType];
  const myAnimal = animalData[primaryType];
  const tips = identificationTips[primaryType][displayType];

  const contextLabel = salesContext.customerType === "b2b" ? "B2B" : "B2C";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Reading Your {contextLabel} Buyers
        </h2>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
          Recognizing - Determining - Knowing
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Your {myAnimal.name} selling style meets different buyer types - here's how to spot them
        </p>
        <ContextBadge salesContext={salesContext} compact />
      </div>

      {/* Type Selector - hidden for PDF */}
      {!hideSelector && (
        <>
          <div className="flex justify-center gap-2 sm:gap-3 mb-3">
            {allTypes.map((type) => {
              const animal = animalData[type];
              const isSelected = selectedType === type;
              const isYou = type === primaryType;

              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center p-2 sm:p-3 rounded-xl border-2 transition-all duration-300 ${
                    isSelected ? "shadow-lg scale-105" : "hover:shadow-md hover:scale-105 opacity-70"
                  } ${!isSelected ? "bg-white dark:bg-gray-800" : ""}`}
                  style={{
                    borderColor: animal.color,
                    backgroundColor: isSelected ? `${animal.color}15` : undefined,
                  }}
                >
                  <div className="mb-1">
                    <AnimalIcon type={type} size="lg" />
                  </div>
                  <span
                    className="text-xs sm:text-sm font-bold"
                    style={{ color: animal.color }}
                  >
                    {animal.name}
                  </span>
                  {isYou && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">(You)</span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            👆 Click on any animal above to see how to sell to that buyer type
          </p>
        </>
      )}

      {/* Selected Type Details */}
      {selectedSignals && (
        <div>
          {/* Your Perspective Tips */}
          <div
            className="rounded-xl p-5 mb-6 transition-all duration-300 hover:scale-[1.01]"
            style={{ backgroundColor: `${myAnimal.color}10` }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <AnimalIcon type={primaryType} size="md" />
              Your {myAnimal.name} Selling Style vs {selectedAnimal.name} Buyers
            </h3>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: myAnimal.color }}
                  >
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Identifiers */}
          <div
            className="rounded-xl p-4 mb-6 border-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
            style={{ borderColor: selectedAnimal.color, backgroundColor: `${selectedAnimal.color}08` }}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span>
              Quick Signs You're Talking to a {selectedAnimal.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedSignals.quickIdentifiers.map((signal, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-gray-800"
                  style={{ color: selectedAnimal.color }}
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Signals Grid */}
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            {/* In Sales Conversations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: selectedAnimal.color }}
                >
                  💬
                </span>
                What You'll Hear
              </h4>
              <ul className="space-y-2">
                {selectedSignals.communicationCues.map((cue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedAnimal.color }}
                    />
                    {cue}
                  </li>
                ))}
              </ul>
            </div>

            {/* In Sales Meetings/Calls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: selectedAnimal.color }}
                >
                  {salesContext.salesChannel === "inside" ? "📞" : "🤝"}
                </span>
                {salesContext.salesChannel === "inside"
                  ? "What You'll Notice on Calls"
                  : "What You'll See in Meetings"}
              </h4>
              <ul className="space-y-2">
                {(salesContext.salesChannel === "inside"
                  ? selectedSignals.callBehavior
                  : selectedSignals.meetingBehavior
                ).map((behavior, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedAnimal.color }}
                    />
                    {behavior}
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions They Ask */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: selectedAnimal.color }}
                >
                  ❓
                </span>
                Questions They'll Ask You
              </h4>
              <ul className="space-y-2">
                {selectedSignals.questionsTheyAsk.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200 italic">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedAnimal.color }}
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* How They Buy */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: selectedAnimal.color }}
                >
                  🧠
                </span>
                How They'll Buy From You
              </h4>
              <ul className="space-y-2">
                {selectedSignals.decisionMaking.map((style, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedAnimal.color }}
                    />
                    {style}
                  </li>
                ))}
              </ul>
            </div>

            {/* Email Behavior */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: selectedAnimal.color }}
                >
                  📧
                </span>
                Their Emails to You
              </h4>
              <ul className="space-y-2">
                {selectedSignals.emailStyle.map((style, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedAnimal.color }}
                    />
                    {style}
                  </li>
                ))}
              </ul>
            </div>

            {/* Office/Video Cues */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
                <span
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: selectedAnimal.color }}
                >
                  {salesContext.salesChannel === "inside" ? "📹" : "🏢"}
                </span>
                {salesContext.salesChannel === "inside"
                  ? "What You'll See on Video Calls"
                  : "What Their Office Shows You"}
              </h4>
              <ul className="space-y-2">
                {(salesContext.salesChannel === "inside"
                  ? selectedSignals.videoCues
                  : selectedSignals.environmentCues
                ).map((cue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedAnimal.color }}
                    />
                    {cue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
