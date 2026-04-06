export type AnimalType = "lion" | "penguin" | "retriever" | "beaver";

// Sales Context Types
export type SellType = "product" | "service";
export type CustomerType = "b2b" | "b2c";
export type SalesChannel = "inside" | "outside";
export type Industry = "tech" | "financial" | "realestate" | "professional";

export interface SalesContext {
  sellType: SellType;
  customerType: CustomerType;
  salesChannel: SalesChannel;
  industry?: Industry;
}

// Context-specific tips for each animal type
export interface ContextualTip {
  context: {
    sellType?: SellType;
    customerType?: CustomerType;
    salesChannel?: SalesChannel;
  };
  tip: string;
}

export interface AnimalInfo {
  id: AnimalType;
  name: string;
  title: string;
  emoji: string;
  icon: string;
  iconHead: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  tagline: string;
  strengths: string[];
  blindSpots: string[];
  sellingStyle: string;
  idealRoles: string[];
  tips: string[];
  contextualTips: ContextualTip[];
  sellingToOthers: {
    lion: string;
    penguin: string;
    retriever: string;
    beaver: string;
  };
}

// Question variant based on sales context
export interface QuestionVariant {
  sellType: SellType;
  customerType?: CustomerType;
  salesChannel?: SalesChannel;
  text: string;
}

// Scoring map for each Likert position
export interface ScoreDistribution {
  lion: number;
  penguin: number;
  retriever: number;
  beaver: number;
}

export type QuestionType = "spectrum" | "quadrant";
export type SalesStage = "prospecting" | "discovery" | "presenting" | "objections" | "closing" | "retention";

export interface QuizQuestion {
  id: string;
  baseText: string;
  variants: QuestionVariant[];
  questionType: QuestionType;
  spectrumPair?: [AnimalType, AnimalType];
  scoring: {
    1: ScoreDistribution;
    2: ScoreDistribution;
    3: ScoreDistribution;
    4: ScoreDistribution;
    5: ScoreDistribution;
  };
  primaryType: AnimalType;
  salesStage: SalesStage;
}

export interface QuizAnswer {
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5;
}

export interface QuizResult {
  id: string;
  salesContext: SalesContext;
  scores: {
    lion: number;
    penguin: number;
    retriever: number;
    beaver: number;
  };
  percentages: {
    lion: number;
    penguin: number;
    retriever: number;
    beaver: number;
  };
  primaryType: AnimalType;
  secondaryType: AnimalType;
  answers: QuizAnswer[];
  createdAt: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  animalType: AnimalType;
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  inviteCode: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
}

// Report Types

export interface PrimaryDeepDive {
  animalType: AnimalType;
  context: Partial<SalesContext>;
  behaviors: string[];
  superpowers: string[];
  blindSpots: string[];
  idealEnvironment: string;
}

export interface BlendProfile {
  primary: AnimalType;
  secondary: AnimalType;
  title: string;
  description: string;
  howSecondaryModifies: string[];
  uniqueStrengths: string[];
  watchFor: string[];
}

export interface TypeComparison {
  dimension: string;
  lion: string;
  penguin: string;
  retriever: string;
  beaver: string;
}

export interface SellingPlaybook {
  yourType: AnimalType;
  theirType: AnimalType;
  recognitionSignals: string[];
  approachStrategy: string;
  keyMotivators: string[];
  avoid: string[];
  closingTechnique: string;
}

export interface GrowthPlanContent {
  targetArea: AnimalType;
  diagnosis: string;
  actionSteps: string[];
  quickWins: string[];
}
