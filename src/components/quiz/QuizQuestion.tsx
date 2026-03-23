"use client";

import { cn } from "@/lib/utils";

interface QuizQuestionCardProps {
  questionText: string;
  value: number | null;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
}

const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;

export function QuizQuestionCard({
  questionText,
  value,
  onChange,
}: QuizQuestionCardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-lg md:text-xl font-medium text-center">
        {questionText}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        {likertOptions.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 min-w-[100px]",
              "transition-all duration-200 hover-scale press-effect animate-fade-in",
              value === option.value
                ? "border-primary bg-primary/10 text-primary shadow-md scale-105"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-2xl font-bold mb-1">{option.value}</span>
            <span className="text-xs text-center text-muted-foreground">
              {option.label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground px-4 animate-fade-in delay-300">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
}
