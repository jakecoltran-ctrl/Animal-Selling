"use client";

import Image from "next/image";

interface TeamSafariBubbleProps {
  className?: string;
}

export function TeamSafariBubble({ className = "" }: TeamSafariBubbleProps) {
  return (
    <div className={`flex flex-col items-center w-full max-w-xs mx-auto ${className}`}>
      {/* Safari Scene - Logo Image */}
      <Image
        src="/team-safari-logo.png"
        alt="Team Safari - Animals in a safari jeep"
        width={240}
        height={140}
        className="mb-3 w-full h-auto max-w-[240px]"
        priority
      />

      {/* Bubble Letters */}
      <div className="flex flex-col items-center w-full">
        <span
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight whitespace-nowrap"
          style={{
            background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.1))"
          }}
        >
          TEAM SAFARI™
        </span>
      </div>
    </div>
  );
}

// Simpler inline version for smaller spaces
export function TeamSafariText({ className = "" }: TeamSafariBubbleProps) {
  return (
    <span
      className={`font-black tracking-tight whitespace-nowrap ${className}`}
      style={{
        background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Team Safari™
    </span>
  );
}

// Version with jeep icon inline
export function TeamSafariWithJeep({ className = "" }: TeamSafariBubbleProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/team-safari-logo.png"
        alt="Team Safari"
        width={40}
        height={24}
        className="h-6 w-auto"
      />
      <span
        className="text-xl font-black tracking-tight whitespace-nowrap"
        style={{
          background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Team Safari™
      </span>
    </div>
  );
}
