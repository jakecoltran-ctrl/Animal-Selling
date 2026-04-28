"use client";

import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { MessageCircleQuestion, Lightbulb } from "lucide-react";

interface DiscoveryQuestionsPageProps {
  primaryType: AnimalType;
}

interface QuestionCategory {
  name: string;
  description: string;
  questions: string[];
}

const discoveryQuestionsByType: Record<AnimalType, QuestionCategory[]> = {
  lion: [
    {
      name: "Opening (Direct Approach)",
      description: "Get to the point and show you value their time",
      questions: [
        "What's the #1 outcome you need from this investment?",
        "What's driving the urgency to solve this now?",
        "If this works, what does success look like in 90 days?",
      ],
    },
    {
      name: "Pain Discovery (Results-Focused)",
      description: "Uncover problems that affect their goals",
      questions: [
        "What's this problem costing you right now - in revenue or time?",
        "What happens if you don't solve this by [deadline]?",
        "What's preventing you from hitting your targets today?",
        "How does this gap affect your competitive position?",
      ],
    },
    {
      name: "Budget & Authority (Decisive)",
      description: "Qualify quickly without wasting time",
      questions: [
        "What's the budget range you're working with?",
        "Who else needs to sign off, and what do they care about most?",
        "What would make this a clear 'yes' for you?",
      ],
    },
    {
      name: "Timeline & Competition (Action-Oriented)",
      description: "Create urgency and understand the landscape",
      questions: [
        "What's your deadline for having this implemented?",
        "What alternatives are you considering?",
        "What would it take to move forward this week?",
      ],
    },
  ],
  penguin: [
    {
      name: "Opening (Relationship-First)",
      description: "Build connection before diving into business",
      questions: [
        "How did you get into this role? What do you enjoy most about it?",
        "Who else on your team will this impact?",
        "I'd love to hear the story behind this initiative...",
      ],
    },
    {
      name: "Pain Discovery (People-Centered)",
      description: "Understand impact on people and relationships",
      questions: [
        "How is this challenge affecting your team day-to-day?",
        "Who else is feeling the pain of this problem?",
        "What feedback have you gotten from customers/stakeholders?",
        "How would solving this change the energy on your team?",
      ],
    },
    {
      name: "Budget & Authority (Collaborative)",
      description: "Understand the decision ecosystem",
      questions: [
        "Who else should we loop into this conversation?",
        "What would help you build internal support for this?",
        "How do decisions like this typically get made here?",
      ],
    },
    {
      name: "Partnership & Vision (Expansive)",
      description: "Explore broader opportunities together",
      questions: [
        "If this goes well, where else could we work together?",
        "Who else in your network might benefit from this?",
        "What would an ideal partnership look like to you?",
      ],
    },
  ],
  retriever: [
    {
      name: "Opening (Trust-Building)",
      description: "Create a safe space for honest conversation",
      questions: [
        "Thanks for taking the time - what would make this meeting valuable for you?",
        "Help me understand your world - what's your biggest priority right now?",
        "What's important for me to know about your team and how you work?",
      ],
    },
    {
      name: "Pain Discovery (Empathetic)",
      description: "Understand challenges with genuine care",
      questions: [
        "What's been the most frustrating part of dealing with this?",
        "How long have you been working around this issue?",
        "What impact is this having on your team's morale?",
        "What have you tried before? What worked and what didn't?",
      ],
    },
    {
      name: "Support & Security (Reliable)",
      description: "Address concerns about ongoing support",
      questions: [
        "What does great support look like to you?",
        "What's most important for your team during implementation?",
        "How can I help make sure everyone feels comfortable with this change?",
      ],
    },
    {
      name: "Long-Term Relationship (Loyal)",
      description: "Build foundation for lasting partnership",
      questions: [
        "How do you prefer to stay in touch after we get started?",
        "What would make you feel confident referring us to others?",
        "What can I do to be a reliable resource for you going forward?",
      ],
    },
  ],
  beaver: [
    {
      name: "Opening (Thorough)",
      description: "Set the stage for detailed exploration",
      questions: [
        "I want to make sure I understand your requirements fully. What are the key criteria you're evaluating?",
        "Walk me through your current process step by step.",
        "What documentation would be most helpful for your evaluation?",
      ],
    },
    {
      name: "Pain Discovery (Analytical)",
      description: "Quantify problems with precision",
      questions: [
        "Can you help me quantify the impact - how much time/money is this costing?",
        "What metrics are you tracking around this challenge?",
        "What does the data tell you about where things break down?",
        "How does this compare to industry benchmarks you've seen?",
      ],
    },
    {
      name: "Technical & Process (Detailed)",
      description: "Understand specifications and requirements",
      questions: [
        "What integrations are critical for your workflow?",
        "What security and compliance requirements do you need to meet?",
        "Walk me through your ideal implementation timeline phase by phase.",
      ],
    },
    {
      name: "Evaluation & Comparison (Systematic)",
      description: "Support their thorough decision process",
      questions: [
        "What criteria are you using to compare options?",
        "What information do you need for your recommendation document?",
        "What questions does your technical team need answered?",
        "Would a detailed ROI analysis be helpful for your stakeholders?",
      ],
    },
  ],
};

export function DiscoveryQuestionsPage({ primaryType }: DiscoveryQuestionsPageProps) {
  const animal = animals[primaryType];
  const questions = discoveryQuestionsByType[primaryType];

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
          style={{ backgroundColor: `${animal.color}20` }}
        >
          <MessageCircleQuestion className="w-6 h-6" style={{ color: animal.color }} />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Discovery Questions for {animal.name}s
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Questions tailored to your natural selling style
        </p>
      </div>

      {/* Intro */}
      <div
        className="mb-6 p-4 rounded-xl border"
        style={{
          backgroundColor: `${animal.color}08`,
          borderColor: `${animal.color}30`,
        }}
      >
        <div className="flex items-start gap-3">
          <AnimalIcon type={primaryType} size="md" />
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              As a <strong style={{ color: animal.color }}>{animal.name}</strong>, these questions
              align with your natural strengths. They'll feel authentic when you ask them and help
              you uncover what you need to know.
            </p>
          </div>
        </div>
      </div>

      {/* Question Categories */}
      <div className="space-y-5">
        {questions.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div
              className="px-4 py-3 border-b border-gray-200 dark:border-gray-700"
              style={{ backgroundColor: `${animal.color}10` }}
            >
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">{category.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{category.description}</p>
            </div>
            <div className="p-4">
              <ul className="space-y-2.5">
                {category.questions.map((question, qIndex) => (
                  <li key={qIndex} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                      style={{ backgroundColor: animal.color }}
                    >
                      {qIndex + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      &ldquo;{question}&rdquo;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Adaptation Tips */}
      <div className="mt-6 p-4 bg-slate-100 dark:bg-gray-800 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">Adapting to Buyer Types</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-start gap-2">
            <AnimalIcon type="lion" size="sm" />
            <span>
              <strong>With Lions:</strong> Be more direct, skip warm-up questions, focus on results
            </span>
          </div>
          <div className="flex items-start gap-2">
            <AnimalIcon type="penguin" size="sm" />
            <span>
              <strong>With Penguins:</strong> Add more relationship questions, be enthusiastic
            </span>
          </div>
          <div className="flex items-start gap-2">
            <AnimalIcon type="retriever" size="sm" />
            <span>
              <strong>With Retrievers:</strong> Ask about team impact, show patience and support
            </span>
          </div>
          <div className="flex items-start gap-2">
            <AnimalIcon type="beaver" size="sm" />
            <span>
              <strong>With Beavers:</strong> Add technical questions, be ready with data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
