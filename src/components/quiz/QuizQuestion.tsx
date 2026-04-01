"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

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
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClick = (optionValue: 1 | 2 | 3 | 4 | 5, index: number) => {
    // Blur the button to remove focus/active state on mobile
    buttonRefs.current[index]?.blur();
    onChange(optionValue);
  };

  return (
    <div className="space-y-6">
      <p className="text-lg md:text-xl font-medium text-center">
        {questionText}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        {likertOptions.map((option, index) => (
          <button
            key={option.value}
            ref={(el) => { buttonRefs.current[index] = el; }}
            onClick={() => handleClick(option.value, index)}
            className={cn(
              "flex flex-col items-center p-3 sm:p-4 rounded-lg border-2 min-w-[60px] sm:min-w-[100px]",
              "transition-colors duration-150 focus:outline-none active:scale-95",
              "select-none touch-manipulation",
              value === option.value
                ? "border-primary bg-primary/10 text-primary shadow-md"
                : "border-gray-200 dark:border-gray-700 bg-transparent"
            )}
          >
            <span className="text-2xl font-bold mb-1">{option.value}</span>
            <span className="text-xs text-center text-muted-foreground">
              {option.label}
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground px-4">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
}
