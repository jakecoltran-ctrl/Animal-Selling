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
            // Single animal page - show same emoji 4 times
            <>
              <span
                className="absolute text-3xl sm:text-5xl md:text-7xl lg:text-8xl animate-float"
                style={{ top: "10%", left: "3%", animationDelay: "0s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
              <span
                className="absolute text-2xl sm:text-4xl md:text-6xl lg:text-7xl animate-float"
                style={{ top: "12%", right: "3%", animationDelay: "1s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
              <span
                className="absolute text-3xl sm:text-5xl md:text-7xl lg:text-8xl animate-float"
                style={{ bottom: "18%", left: "5%", animationDelay: "2s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
              <span
                className="absolute text-2xl sm:text-4xl md:text-6xl lg:text-7xl animate-float"
                style={{ bottom: "12%", right: "2%", animationDelay: "0.5s", opacity: emojiOpacity }}
              >
                {singleAnimal.emoji}
              </span>
            </>
          ) : (
            // Default - show all 4 animals
            <>
              <span
                className="absolute text-3xl sm:text-5xl md:text-7xl lg:text-8xl animate-float"
                style={{ top: "10%", left: "3%", animationDelay: "0s", opacity: emojiOpacity }}
              >
                🦁
              </span>
              <span
                className="absolute text-2xl sm:text-4xl md:text-6xl lg:text-7xl animate-float"
                style={{ top: "12%", right: "3%", animationDelay: "1s", opacity: emojiOpacity }}
              >
                🐧
              </span>
              <span
                className="absolute text-3xl sm:text-5xl md:text-7xl lg:text-8xl animate-float"
                style={{ bottom: "18%", left: "5%", animationDelay: "2s", opacity: emojiOpacity }}
              >
                🐕
              </span>
              <span
                className="absolute text-2xl sm:text-4xl md:text-6xl lg:text-7xl animate-float"
                style={{ bottom: "12%", right: "2%", animationDelay: "0.5s", opacity: emojiOpacity }}
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
