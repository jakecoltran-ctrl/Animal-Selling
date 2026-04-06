"use client";

interface TeamSafariBubbleProps {
  className?: string;
}

export function TeamSafariBubble({ className = "" }: TeamSafariBubbleProps) {
  return (
    <div className={`flex flex-col items-center w-full max-w-xs mx-auto ${className}`}>
      {/* Safari Scene - Jeep and Tree */}
      <svg
        viewBox="0 0 160 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-3 w-full h-auto max-w-[240px]"
      >
        {/* Acacia Tree on the left */}
        {/* Tree trunk - tapered */}
        <path d="M22 57 L20 40 Q24 38 28 40 L26 57 Z" fill="#78350f" />

        {/* Main branches */}
        <path d="M24 40 Q16 35 11 32" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M24 40 Q32 35 38 30" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M24 42 Q14 38 9 38" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M24 42 Q34 38 41 36" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Foliage clusters - layered for depth */}
        <ellipse cx="11" cy="30" rx="8" ry="5" fill="#065f46" />
        <ellipse cx="38" cy="28" rx="9" ry="5" fill="#065f46" />
        <ellipse cx="9" cy="36" rx="7" ry="4" fill="#065f46" />
        <ellipse cx="41" cy="34" rx="8" ry="4" fill="#065f46" />

        {/* Top layer foliage - lighter green */}
        <ellipse cx="12" cy="28" rx="7" ry="4" fill="#059669" />
        <ellipse cx="36" cy="26" rx="8" ry="4" fill="#059669" />
        <ellipse cx="24" cy="24" rx="10" ry="5" fill="#059669" />
        <ellipse cx="10" cy="34" rx="6" ry="3" fill="#059669" />
        <ellipse cx="40" cy="32" rx="7" ry="3" fill="#059669" />

        {/* Highlight foliage */}
        <ellipse cx="24" cy="22" rx="8" ry="4" fill="#10b981" />
        <ellipse cx="14" cy="27" rx="5" ry="3" fill="#10b981" />
        <ellipse cx="34" cy="25" rx="6" ry="3" fill="#10b981" />

        {/* Ground line */}
        <line x1="0" y1="57" x2="160" y2="57" stroke="#d97706" strokeWidth="2" strokeDasharray="4 2" />

        {/* Jeep body - moved to right side */}
        <rect x="60" y="30" width="55" height="18" rx="3" fill="#92400e" />

        {/* Roof/canopy frame */}
        <rect x="65" y="20" width="40" height="12" rx="2" fill="none" stroke="#78350f" strokeWidth="3" />

        {/* Windshield */}
        <rect x="95" y="23" width="8" height="8" rx="1" fill="#fef3c7" fillOpacity="0.6" />

        {/* Windows */}
        <rect x="70" y="23" width="10" height="8" rx="1" fill="#fef3c7" fillOpacity="0.6" />
        <rect x="82" y="23" width="10" height="8" rx="1" fill="#fef3c7" fillOpacity="0.6" />

        {/* Front grille */}
        <rect x="110" y="33" width="8" height="12" rx="1" fill="#78350f" />
        <line x1="112" y1="35" x2="112" y2="43" stroke="#451a03" strokeWidth="1" />
        <line x1="114" y1="35" x2="114" y2="43" stroke="#451a03" strokeWidth="1" />
        <line x1="116" y1="35" x2="116" y2="43" stroke="#451a03" strokeWidth="1" />

        {/* Headlight */}
        <circle cx="116" cy="34" r="2" fill="#fbbf24" />

        {/* Bumper */}
        <rect x="58" y="45" width="62" height="3" rx="1" fill="#78350f" />

        {/* Wheels */}
        <circle cx="72" cy="50" r="8" fill="#292524" />
        <circle cx="72" cy="50" r="5" fill="#57534e" />
        <circle cx="72" cy="50" r="2" fill="#292524" />

        <circle cx="102" cy="50" r="8" fill="#292524" />
        <circle cx="102" cy="50" r="5" fill="#57534e" />
        <circle cx="102" cy="50" r="2" fill="#292524" />

        {/* Spare tire on back */}
        <circle cx="55" cy="40" r="6" fill="#292524" />
        <circle cx="55" cy="40" r="4" fill="#57534e" />

        {/* Animal passengers - just heads peeking out */}
        <image href="/animals/lion.png" x="69" y="21" width="12" height="12" />
        <image href="/animals/penguin.png" x="81" y="21" width="12" height="12" />
        <image href="/animals/retriever.png" x="93" y="21" width="12" height="12" />

        {/* Second smaller tree on far right */}
        {/* Trunk */}
        <path d="M140 57 L139 45 Q142 43 145 45 L144 57 Z" fill="#78350f" />

        {/* Branches */}
        <path d="M142 45 Q136 42 134 38" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M142 45 Q148 42 152 40" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Foliage - darker base */}
        <ellipse cx="134" cy="36" rx="6" ry="4" fill="#065f46" />
        <ellipse cx="150" cy="38" rx="6" ry="4" fill="#065f46" />

        {/* Mid foliage */}
        <ellipse cx="142" cy="34" rx="8" ry="4" fill="#059669" />
        <ellipse cx="135" cy="35" rx="5" ry="3" fill="#059669" />
        <ellipse cx="149" cy="36" rx="5" ry="3" fill="#059669" />

        {/* Highlight */}
        <ellipse cx="142" cy="32" rx="6" ry="3" fill="#10b981" />

        {/* Sun */}
        <circle cx="145" cy="12" r="8" fill="#fbbf24" fillOpacity="0.8" />
      </svg>

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
      <svg
        width="40"
        height="24"
        viewBox="0 0 80 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified jeep */}
        <rect x="10" y="15" width="55" height="18" rx="3" fill="#374151" />
        <rect x="15" y="5" width="40" height="12" rx="2" fill="none" stroke="#374151" strokeWidth="3" />
        <rect x="60" y="18" width="8" height="12" rx="1" fill="#4b5563" />
        <circle cx="66" cy="19" r="2" fill="#fbbf24" />
        <rect x="8" y="30" width="62" height="3" rx="1" fill="#4b5563" />
        <circle cx="22" cy="35" r="8" fill="#1f2937" />
        <circle cx="22" cy="35" r="5" fill="#4b5563" />
        <circle cx="52" cy="35" r="8" fill="#1f2937" />
        <circle cx="52" cy="35" r="5" fill="#4b5563" />
      </svg>
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
