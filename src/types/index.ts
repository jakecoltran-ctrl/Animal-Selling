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

// ============================================
// CERTIFICATION & GAMES TYPES
// ============================================

export type GameType = AnimalType; // 'lion' | 'penguin' | 'retriever' | 'beaver'

export type BadgeType =
  | "lion_master"
  | "penguin_master"
  | "retriever_master"
  | "beaver_master"
  | "perfect_lion"
  | "perfect_penguin"
  | "perfect_retriever"
  | "perfect_beaver"
  | "perfection"
  | "speed_demon"
  | "certified";

export interface GameProgress {
  id: string;
  userId: string;
  gameType: GameType;
  attempts: number;
  bestScore: number;
  totalQuestions: number;
  bestAccuracy: number;
  passed: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GameAttempt {
  id: string;
  userId: string;
  gameType: GameType;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeTakenSeconds: number | null;
  answers: Record<string, string | number>;
  passed: boolean;
  createdAt: string;
}

export interface Badge {
  id: string;
  userId: string;
  badgeType: BadgeType;
  earnedAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  certificateNumber: string;
  userName: string;
  primaryAnimalType: AnimalType | null;
  averageAccuracy: number;
  completedAt: string;
}

export interface BadgeInfo {
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Game Question Types
export interface ScenarioQuestion {
  id: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
}

export interface BuyerProfile {
  id: string;
  description: string;
  correctType: AnimalType;
  explanation: string;
}

export interface MatchingPair {
  id: string;
  trait: string;
  animalType: AnimalType;
  category: "strength" | "blindspot";
}

export interface ComprehensiveQuestion {
  id: string;
  type: "true_false" | "multiple_choice" | "identification";
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface GameContent {
  lion: {
    name: string;
    title: string;
    description: string;
    questions: ScenarioQuestion[];
  };
  penguin: {
    name: string;
    title: string;
    description: string;
    profiles: BuyerProfile[];
  };
  retriever: {
    name: string;
    title: string;
    description: string;
    pairs: MatchingPair[];
  };
  beaver: {
    name: string;
    title: string;
    description: string;
    questions: ComprehensiveQuestion[];
  };
}
