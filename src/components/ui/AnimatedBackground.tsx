"use client";

interface AnimatedBackgroundProps {
  opacity?: number;
  showEmojis?: boolean;
  emojiOpacity?: number;
  className?: string;
  singleAnimal?: { emoji: string; color: string };
}

export function AnimatedBackground({
  opacity = 0.3,
  showEmojis = true,
  emojiOpacity = 0.2,
  className = "",
  singleAnimal,
}: AnimatedBackgroundProps) {
  // Build gradient based on whether we have a single animal or all 4
  const gradient = singleAnimal
    ? `
        radial-gradient(ellipse at 20% 20%, ${singleAnimal.color}40 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, ${singleAnimal.color}30 0%, transparent 50%),
        radial-gradient(ellipse at 20% 80%, ${singleAnimal.color}30 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, ${singleAnimal.color}40 0%, transparent 50%)
      `
    : `
        radial-gradient(ellipse at 20% 20%, #dc262640 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, #0891b240 0%, transparent 50%),
        radial-gradient(ellipse at 20% 80%, #d9770640 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, #05966940 0%, transparent 50%)
      `;

  return (
    <>
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
        <div
          className="absolute inset-0"
          style={{ background: gradient }}
        />
      </div>

      {/* Floating emojis */}
      {showEmojis && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {singleAnimal ? (
            <>
              <span
                className="absolute text-8xl animate-float"
                style={{ top: "10%", left: "5%", animationDelay: "0s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
              <span
                className="absolute text-7xl animate-float"
                style={{ top: "15%", right: "10%", animationDelay: "1s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
              <span
                className="absolute text-8xl animate-float"
                style={{ bottom: "20%", left: "8%", animationDelay: "2s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
              <span
                className="absolute text-7xl animate-float"
                style={{ bottom: "15%", right: "5%", animationDelay: "0.5s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
            </>
          ) : (
            <>
              <span
                className="absolute text-8xl animate-float"
                style={{ top: "10%", left: "5%", animationDelay: "0s", opacity: emojiOpacity }}
              >
                🦁
              </span>
              <span
                className="absolute text-7xl animate-float"
                style={{ top: "15%", right: "10%", animationDelay: "1s", opacity: emojiOpacity }}
              >
                🐧
              </span>
              <span
                className="absolute text-8xl animate-float"
                style={{ bottom: "20%", left: "8%", animationDelay: "2s", opacity: emojiOpacity }}
              >
                🐕
              </span>
              <span
                className="absolute text-7xl animate-float"
                style={{ bottom: "15%", right: "5%", animationDelay: "0.5s", opacity: emojiOpacity }}
              >
                🦫
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}
