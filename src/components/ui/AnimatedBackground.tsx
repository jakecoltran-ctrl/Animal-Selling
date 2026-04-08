"use client";

import Image from "next/image";
import { AnimalType } from "@/types";
import { animals } from "@/lib/animal-data";

interface AnimatedBackgroundProps {
  opacity?: number;
  showEmojis?: boolean;
  emojiOpacity?: number;
  className?: string;
  singleAnimal?: { type: AnimalType; color: string } | { emoji: string; color: string };
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

      {/* Floating animal icons */}
      {showEmojis && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {singleAnimal && 'type' in singleAnimal ? (
            // Single animal page - show same animal head 4 times
            <>
              <div
                className="absolute w-12 sm:w-12 md:w-20 lg:w-24 animate-float"
                style={{ top: "10%", left: "3%", animationDelay: "0s", opacity: emojiOpacity }}
              >
                <Image src={animals[singleAnimal.type].iconHead} alt="" width={96} height={96} unoptimized />
              </div>
              <div
                className="absolute w-10 sm:w-10 md:w-16 lg:w-20 animate-float"
                style={{ top: "12%", right: "3%", animationDelay: "1s", opacity: emojiOpacity }}
              >
                <Image src={animals[singleAnimal.type].iconHead} alt="" width={80} height={80} unoptimized />
              </div>
              <div
                className="absolute w-12 sm:w-12 md:w-20 lg:w-24 animate-float"
                style={{ bottom: "18%", left: "5%", animationDelay: "2s", opacity: emojiOpacity }}
              >
                <Image src={animals[singleAnimal.type].iconHead} alt="" width={96} height={96} unoptimized />
              </div>
              <div
                className="absolute w-10 sm:w-10 md:w-16 lg:w-20 animate-float"
                style={{ bottom: "12%", right: "2%", animationDelay: "0.5s", opacity: emojiOpacity }}
              >
                <Image src={animals[singleAnimal.type].iconHead} alt="" width={80} height={80} unoptimized />
              </div>
            </>
          ) : (
            // Default - show all 4 animal heads
            <>
              <div
                className="absolute w-12 sm:w-12 md:w-20 lg:w-24 animate-float"
                style={{ top: "10%", left: "3%", animationDelay: "0s", opacity: emojiOpacity }}
              >
                <Image src="/animals/lion-head.png" alt="" width={96} height={96} unoptimized />
              </div>
              <div
                className="absolute w-10 sm:w-10 md:w-16 lg:w-20 animate-float"
                style={{ top: "12%", right: "3%", animationDelay: "1s", opacity: emojiOpacity }}
              >
                <Image src="/animals/penguin-head.png" alt="" width={80} height={80} unoptimized />
              </div>
              <div
                className="absolute w-12 sm:w-12 md:w-20 lg:w-24 animate-float"
                style={{ bottom: "18%", left: "5%", animationDelay: "2s", opacity: emojiOpacity }}
              >
                <Image src="/animals/retriever-head.png" alt="" width={96} height={96} unoptimized />
              </div>
              <div
                className="absolute w-10 sm:w-10 md:w-16 lg:w-20 animate-float"
                style={{ bottom: "12%", right: "2%", animationDelay: "0.5s", opacity: emojiOpacity }}
              >
                <Image src="/animals/beaver-head.png" alt="" width={80} height={80} unoptimized />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
