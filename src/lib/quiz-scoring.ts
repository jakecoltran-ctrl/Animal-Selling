import { AnimalType, QuizAnswer, QuizResult, SalesContext } from "@/types";
import { quizQuestions } from "./quiz-questions";

interface Scores {
  lion: number;
  penguin: number;
  retriever: number;
  beaver: number;
}

export function calculateScores(answers: QuizAnswer[]): Scores {
  const scores: Scores = { lion: 0, penguin: 0, retriever: 0, beaver: 0 };

  answers.forEach((answer) => {
    const question = quizQuestions.find((q) => q.id === answer.questionId);
    if (!question) return;

    // Get the score distribution for this answer value
    const distribution = question.scoring[answer.value];

    // Add points from the distribution
    scores.lion += distribution.lion;
    scores.penguin += distribution.penguin;
    scores.retriever += distribution.retriever;
    scores.beaver += distribution.beaver;
  });

  return scores;
}

export function calculatePercentages(scores: Scores): Scores {
  // Clamp negative scores
  const clamped: Scores = {
    lion: Math.max(0, scores.lion),
    penguin: Math.max(0, scores.penguin),
    retriever: Math.max(0, scores.retriever),
    beaver: Math.max(0, scores.beaver),
  };

  const total = clamped.lion + clamped.penguin + clamped.retriever + clamped.beaver;
  if (total === 0) return { lion: 25, penguin: 25, retriever: 25, beaver: 25 };

  // Use largest remainder method to ensure percentages sum to exactly 100
  const types: (keyof Scores)[] = ["lion", "penguin", "retriever", "beaver"];
  const exactPercentages = types.map((type) => ({
    type,
    exact: (clamped[type] / total) * 100,
    floor: Math.floor((clamped[type] / total) * 100),
    remainder: ((clamped[type] / total) * 100) % 1,
  }));

  const floorSum = exactPercentages.reduce((sum, p) => sum + p.floor, 0);
  let remaining = 100 - floorSum;

  // Sort by remainder descending and distribute remaining points
  exactPercentages.sort((a, b) => b.remainder - a.remainder);
  for (const p of exactPercentages) {
    if (remaining > 0) {
      p.floor += 1;
      remaining -= 1;
    }
  }

  return {
    lion: exactPercentages.find((p) => p.type === "lion")!.floor,
    penguin: exactPercentages.find((p) => p.type === "penguin")!.floor,
    retriever: exactPercentages.find((p) => p.type === "retriever")!.floor,
    beaver: exactPercentages.find((p) => p.type === "beaver")!.floor,
  };
}

export function determinePrimaryAndSecondary(
  scores: Scores
): { primary: AnimalType; secondary: AnimalType } {
  // Sort by raw scores (not rounded percentages) to handle ties properly
  // Even if percentages display as equal (e.g., both 25%), raw scores
  // will have the actual decimal precision to determine the true primary
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);

  return {
    primary: sorted[0][0] as AnimalType,
    secondary: sorted[1][0] as AnimalType,
  };
}

export function generateQuizResult(
  answers: QuizAnswer[],
  salesContext: SalesContext,
  email?: string
): QuizResult {
  const scores = calculateScores(answers);
  const percentages = calculatePercentages(scores);
  const { primary, secondary } = determinePrimaryAndSecondary(scores);

  return {
    id: crypto.randomUUID(),
    salesContext,
    scores,
    percentages,
    primaryType: primary,
    secondaryType: secondary,
    answers,
    createdAt: new Date().toISOString(),
    email,
  };
}

export function getBlendDescription(
  primary: AnimalType,
  secondary: AnimalType
): string {
  const blends: Record<string, string> = {
    "lion-penguin":
      "You're a charismatic closer who wins through confidence and connection. You drive deals forward while keeping relationships warm.",
    "lion-retriever":
      "You balance drive with dependability. You push for results while ensuring clients feel supported and valued.",
    "lion-beaver":
      "You combine decisiveness with thoroughness. You close efficiently while backing every claim with solid data.",
    "penguin-lion":
      "You lead with energy and back it up with action. Your enthusiasm opens doors, and your directness seals the deal.",
    "penguin-retriever":
      "You're a relationship powerhouse. You build networks through genuine warmth and keep them through consistent care.",
    "penguin-beaver":
      "You blend creativity with credibility. Your engaging style captures attention while your preparation earns trust.",
    "retriever-lion":
      "You're a trusted closer. You build deep relationships and know when to assertively guide clients to decisions.",
    "retriever-penguin":
      "You create lasting connections through genuine warmth. Clients stay because they genuinely like and trust you.",
    "retriever-beaver":
      "You're the reliable expert. You combine thorough knowledge with steady support to build unshakeable client trust.",
    "beaver-lion":
      "You're a data-driven closer. You win with preparation and know exactly when to push for the decision.",
    "beaver-penguin":
      "You balance expertise with approachability. Your knowledge impresses while your warmth makes it accessible.",
    "beaver-retriever":
      "You're the methodical partner. You combine deep expertise with patient support to guide clients confidently.",
  };

  return (
    blends[`${primary}-${secondary}`] ||
    "You have a unique blend of sales strengths."
  );
}

/**
 * Get a context-aware description of the blend
 */
export function getContextualBlendDescription(
  primary: AnimalType,
  secondary: AnimalType,
  context: SalesContext
): string {
  const baseBlend = getBlendDescription(primary, secondary);

  // Add context-specific flavor
  const contextNotes: string[] = [];

  if (context.sellType === "service") {
    if (primary === "lion") {
      contextNotes.push(
        "In service sales, be careful not to rush past the discovery phase — clients need to feel truly understood before they trust you with ongoing work."
      );
    }
    if (primary === "penguin") {
      contextNotes.push(
        "Your relationship skills are especially valuable in service sales where repeat business depends on personal connection."
      );
    }
  }

  if (context.sellType === "product") {
    if (primary === "beaver") {
      contextNotes.push(
        "Your product expertise is a major advantage — buyers trust sellers who know their products inside and out."
      );
    }
    if (primary === "lion") {
      contextNotes.push(
        "Your decisive nature works well in product sales where buyers often need a push to commit."
      );
    }
  }

  if (context.customerType === "b2b") {
    if (primary === "retriever") {
      contextNotes.push(
        "Your patience is a strength in B2B cycles where multiple stakeholders and longer timelines are the norm."
      );
    }
  }

  if (context.customerType === "b2c") {
    if (primary === "penguin") {
      contextNotes.push(
        "Your warmth creates instant rapport with consumers who want to feel good about who they're buying from."
      );
    }
  }

  if (context.salesChannel === "outside") {
    if (primary === "penguin") {
      contextNotes.push(
        "Your in-person energy is magnetic at events, demos, and face-to-face meetings."
      );
    }
  }

  if (context.salesChannel === "inside") {
    if (primary === "beaver") {
      contextNotes.push(
        "Your thorough preparation shines in virtual settings where you can share detailed materials and data."
      );
    }
  }

  if (contextNotes.length > 0) {
    return `${baseBlend}\n\n${contextNotes[0]}`;
  }

  return baseBlend;
}
