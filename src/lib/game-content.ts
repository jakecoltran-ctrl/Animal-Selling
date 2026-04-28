import {
  ScenarioQuestion,
  BuyerProfile,
  MatchingPair,
  ComprehensiveQuestion,
  BadgeInfo,
  BadgeType,
} from "@/types";

// ============================================
// BADGE DEFINITIONS
// ============================================

export const badges: Record<BadgeType, BadgeInfo> = {
  lion_master: {
    type: "lion_master",
    name: "Lion Tamer",
    description: "Pass the Lion Closer Challenge",
    icon: "🦁",
    color: "#dc2626",
  },
  penguin_master: {
    type: "penguin_master",
    name: "Penguin Whisperer",
    description: "Pass the Penguin Buyer Identifier",
    icon: "🐧",
    color: "#0891b2",
  },
  retriever_master: {
    type: "retriever_master",
    name: "Retriever's Best Friend",
    description: "Pass the Retriever Trust Builder",
    icon: "🐕",
    color: "#d97706",
  },
  beaver_master: {
    type: "beaver_master",
    name: "Beaver Builder",
    description: "Pass the Beaver Detail Master",
    icon: "🦫",
    color: "#059669",
  },
  perfect_lion: {
    type: "perfect_lion",
    name: "Perfect Closer",
    description: "Score 100% on the Lion game",
    icon: "👑",
    color: "#dc2626",
  },
  perfect_penguin: {
    type: "perfect_penguin",
    name: "Perfect Connector",
    description: "Score 100% on the Penguin game",
    icon: "💎",
    color: "#0891b2",
  },
  perfect_retriever: {
    type: "perfect_retriever",
    name: "Perfect Advisor",
    description: "Score 100% on the Retriever game",
    icon: "⭐",
    color: "#d97706",
  },
  perfect_beaver: {
    type: "perfect_beaver",
    name: "Perfect Specialist",
    description: "Score 100% on the Beaver game",
    icon: "🏆",
    color: "#059669",
  },
  perfection: {
    type: "perfection",
    name: "Perfection",
    description: "Score 100% on all four games",
    icon: "💯",
    color: "#8b5cf6",
  },
  speed_demon: {
    type: "speed_demon",
    name: "Speed Demon",
    description: "Complete any game in under 2 minutes",
    icon: "⚡",
    color: "#f59e0b",
  },
  certified: {
    type: "certified",
    name: "Certified Animal Seller",
    description: "Earn your Animal Selling certificate",
    icon: "📜",
    color: "#10b981",
  },
};

// ============================================
// LION GAME - SCENARIO QUIZ (10 questions)
// "Sales Scenario Challenge"
// Tests knowledge of when to use each animal's approach
// ============================================

export const lionQuestions: ScenarioQuestion[] = [
  {
    id: "lion-1",
    scenario:
      "You're meeting a new prospect who spent 10 minutes asking about your family and hobbies before discussing business. What approach works best here?",
    options: [
      {
        id: "a",
        text: "Politely redirect: 'I appreciate the conversation, but let's dive into how we can help your business.'",
        isCorrect: false,
        explanation: "This Lion approach may feel abrupt to a relationship-focused buyer.",
      },
      {
        id: "b",
        text: "Engage warmly, share stories, and let the relationship develop before discussing business.",
        isCorrect: true,
        explanation:
          "This buyer shows Penguin traits - they value connection first. Match their energy to build trust.",
      },
      {
        id: "c",
        text: "Prepare detailed documentation about your solution to share when the conversation turns to business.",
        isCorrect: false,
        explanation: "Beaver preparation is good, but this buyer wants connection, not data.",
      },
      {
        id: "d",
        text: "Ask thoughtful questions about their team and how changes typically happen in their organization.",
        isCorrect: false,
        explanation: "Retriever approach is relationship-focused but misses this buyer's social energy.",
      },
    ],
  },
  {
    id: "lion-2",
    scenario:
      "A prospect asks for your security certifications, API documentation, SLA details, and wants to understand your pricing formula. What type of buyer is this?",
    options: [
      {
        id: "a",
        text: "Lion - they want to make a fast, confident decision",
        isCorrect: false,
        explanation: "Lions want results and bottom-line impact, not detailed documentation.",
      },
      {
        id: "b",
        text: "Penguin - they're building rapport through questions",
        isCorrect: false,
        explanation: "Penguins focus on relationships, not technical specifications.",
      },
      {
        id: "c",
        text: "Retriever - they're being thorough to protect their team",
        isCorrect: false,
        explanation: "Retrievers care about team impact, but these are technical/analytical questions.",
      },
      {
        id: "d",
        text: "Beaver - they need comprehensive data before deciding",
        isCorrect: true,
        explanation:
          "This is classic Beaver behavior - analytical, detail-oriented, and needs thorough documentation.",
      },
    ],
  },
  {
    id: "lion-3",
    scenario:
      "Your prospect says, 'I want to make sure everyone on my team feels good about this decision before we move forward.' How should you adapt?",
    options: [
      {
        id: "a",
        text: "Push for a decision: 'The team will feel good once they see the results. Let's get started.'",
        isCorrect: false,
        explanation: "Lion directness will feel dismissive of their team-focused values.",
      },
      {
        id: "b",
        text: "Offer to present to different team members and provide materials for internal discussions.",
        isCorrect: true,
        explanation:
          "This is a Retriever buyer who values consensus. Support their process with patience and resources.",
      },
      {
        id: "c",
        text: "Send detailed comparison documents so the team can analyze the options together.",
        isCorrect: false,
        explanation: "Helpful, but this buyer needs relationship support, not just data.",
      },
      {
        id: "d",
        text: "Suggest a team lunch or event where you can meet everyone in a relaxed setting.",
        isCorrect: false,
        explanation: "Penguin approach, but this buyer wants process support, not social events.",
      },
    ],
  },
  {
    id: "lion-4",
    scenario:
      "A buyer interrupts your demo saying, 'Skip the features - just tell me the ROI and when we can start.' What animal type is this?",
    options: [
      {
        id: "a",
        text: "Lion - results-focused and ready to move fast",
        isCorrect: true,
        explanation:
          "Classic Lion behavior: direct, impatient with details, focused on outcomes and action.",
      },
      {
        id: "b",
        text: "Penguin - enthusiastic and eager to get going",
        isCorrect: false,
        explanation: "Penguins are enthusiastic but would engage more with the relationship aspect.",
      },
      {
        id: "c",
        text: "Retriever - wanting to quickly help their team",
        isCorrect: false,
        explanation: "Retrievers would ask about team impact, not just ROI.",
      },
      {
        id: "d",
        text: "Beaver - efficiently gathering the key data points",
        isCorrect: false,
        explanation: "Beavers want MORE details, not fewer. They wouldn't skip the demo.",
      },
    ],
  },
  {
    id: "lion-5",
    scenario:
      "You're selling to someone who keeps mentioning other departments that 'might find this interesting' and offers to introduce you to their CEO. What approach should you take?",
    options: [
      {
        id: "a",
        text: "Focus the conversation on closing this deal first, then explore expansions later.",
        isCorrect: false,
        explanation: "Lion focus is good, but you'd miss this buyer's natural networking strength.",
      },
      {
        id: "b",
        text: "Embrace their connector energy - take the introductions and explore partnership opportunities.",
        isCorrect: true,
        explanation:
          "This Penguin buyer expands deals through relationships. Leverage their enthusiasm for connections.",
      },
      {
        id: "c",
        text: "Prepare detailed business cases for each department they mention.",
        isCorrect: false,
        explanation: "Beaver preparation, but this buyer wants to connect people, not review documents.",
      },
      {
        id: "d",
        text: "Ask how each department's adoption would affect their team's workload.",
        isCorrect: false,
        explanation: "Retriever concern for team, but doesn't match this buyer's expansive energy.",
      },
    ],
  },
  {
    id: "lion-6",
    scenario:
      "A long-time customer mentions they've been approached by a competitor. They've been loyal for 5 years. What's the best response?",
    options: [
      {
        id: "a",
        text: "Match or beat the competitor's offer immediately to protect the account.",
        isCorrect: false,
        explanation: "Lion reaction, but devalues the relationship you've built.",
      },
      {
        id: "b",
        text: "Ask what attracted them to the competitor - are they feeling undervalued or is something missing?",
        isCorrect: true,
        explanation:
          "Retriever approach: acknowledge the relationship, understand their needs, and address gaps with care.",
      },
      {
        id: "c",
        text: "Prepare a detailed comparison showing why your solution is technically superior.",
        isCorrect: false,
        explanation: "Beaver analysis, but this situation needs relationship repair first.",
      },
      {
        id: "d",
        text: "Set up a meeting with your leadership to show them how much you value the partnership.",
        isCorrect: false,
        explanation: "Penguin relationship move, but you need to understand the problem first.",
      },
    ],
  },
  {
    id: "lion-7",
    scenario:
      "Which animal type is most likely to win deals through thorough preparation, detailed proposals, and comprehensive business cases?",
    options: [
      {
        id: "a",
        text: "Lion - their confidence comes from preparation",
        isCorrect: false,
        explanation: "Lions rely on confidence and decisiveness, not detailed documentation.",
      },
      {
        id: "b",
        text: "Penguin - their enthusiasm is backed by research",
        isCorrect: false,
        explanation: "Penguins win through relationships and connections, not paperwork.",
      },
      {
        id: "c",
        text: "Retriever - their trustworthiness requires proof",
        isCorrect: false,
        explanation: "Retrievers build trust through consistency and care, not documentation.",
      },
      {
        id: "d",
        text: "Beaver - their expertise shines in detailed analysis",
        isCorrect: true,
        explanation:
          "Beavers are specialists who excel at preparation, documentation, and thorough business cases.",
      },
    ],
  },
  {
    id: "lion-8",
    scenario:
      "A prospect who normally responds within hours has gone silent for a week after receiving your proposal. They're known to be decisive and results-driven. What happened and what should you do?",
    options: [
      {
        id: "a",
        text: "They're probably busy. Wait another week and send a gentle check-in.",
        isCorrect: false,
        explanation: "This passive approach doesn't match how Lions operate or expect to be treated.",
      },
      {
        id: "b",
        text: "A Lion going silent means something's wrong. Call directly with new, relevant information.",
        isCorrect: true,
        explanation:
          "Lions are decisive - silence signals a blocker. Re-engage with urgency and value.",
      },
      {
        id: "c",
        text: "Send additional case studies and documentation to strengthen the proposal.",
        isCorrect: false,
        explanation: "Beaver approach, but Lions don't want more data - they want action.",
      },
      {
        id: "d",
        text: "Reach out to see if there's anything happening personally that's affecting timing.",
        isCorrect: false,
        explanation: "Retriever care, but Lions separate personal from business decisions.",
      },
    ],
  },
  {
    id: "lion-9",
    scenario:
      "You're a Beaver seller (detail-oriented, analytical) meeting with a Lion buyer (decisive, results-focused). What's your biggest challenge?",
    options: [
      {
        id: "a",
        text: "Getting enough information to build a thorough proposal",
        isCorrect: false,
        explanation: "That's a Beaver concern, but Lions will give you what you need quickly.",
      },
      {
        id: "b",
        text: "Moving fast enough and leading with outcomes instead of details",
        isCorrect: true,
        explanation:
          "Beavers want to share details; Lions want the bottom line. Beavers must adapt by being concise and action-oriented.",
      },
      {
        id: "c",
        text: "Building enough personal rapport before discussing business",
        isCorrect: false,
        explanation: "That's a Penguin concern. Lions don't prioritize personal rapport.",
      },
      {
        id: "d",
        text: "Making sure the buyer's team is comfortable with the decision",
        isCorrect: false,
        explanation: "That's a Retriever concern. Lions make decisions independently.",
      },
    ],
  },
  {
    id: "lion-10",
    scenario:
      "Which blind spot should a Penguin seller be most aware of when managing customer expectations?",
    options: [
      {
        id: "a",
        text: "Being too direct and potentially damaging relationships",
        isCorrect: false,
        explanation: "That's a Lion blind spot. Penguins are rarely too direct.",
      },
      {
        id: "b",
        text: "Over-promising in the heat of enthusiasm and not delivering",
        isCorrect: true,
        explanation:
          "Penguins' enthusiasm and desire to please can lead to commitments they can't keep.",
      },
      {
        id: "c",
        text: "Spending too much time on analysis instead of taking action",
        isCorrect: false,
        explanation: "That's a Beaver blind spot. Penguins act on relationships, not analysis.",
      },
      {
        id: "d",
        text: "Avoiding difficult conversations to preserve harmony",
        isCorrect: false,
        explanation: "That's a Retriever blind spot. Penguins are comfortable with conversations.",
      },
    ],
  },
];

// ============================================
// PENGUIN GAME - BUYER PROFILES (8 profiles)
// "Buyer Profile Identifier"
// ============================================

export const penguinProfiles: BuyerProfile[] = [
  {
    id: "profile-1",
    description:
      "This buyer responds to your emails within minutes, often with just 'Yes' or 'No.' In meetings, they cut off small talk quickly, asking 'What's the bottom line?' They mention their quarterly targets three times in your first call and seem annoyed when you ask about their team dynamics.",
    correctType: "lion",
    explanation:
      "This is a Lion buyer: direct, results-focused, impatient with small talk, and driven by targets and outcomes.",
  },
  {
    id: "profile-2",
    description:
      "In your first meeting, this buyer spent 15 minutes telling you about their recent vacation and asked about your weekend plans. They've introduced you to five different colleagues 'who might find this interesting' and suggested grabbing coffee to 'really get to know each other.' They seem more interested in your company culture than your product specs.",
    correctType: "penguin",
    explanation:
      "This is a Penguin buyer: relationship-focused, enthusiastic about connections, and values personal rapport over technical details.",
  },
  {
    id: "profile-3",
    description:
      "This buyer has been with their company for 12 years. They've mentioned twice that they want to 'make sure everyone on the team feels good about this decision.' When you asked about timeline, they said, 'We don't want to rush - we need to think about how this affects everyone.' They send thoughtful follow-up emails thanking you for your patience.",
    correctType: "retriever",
    explanation:
      "This is a Retriever buyer: loyal, consensus-seeking, patient, and focused on team harmony and long-term relationships.",
  },
  {
    id: "profile-4",
    description:
      "Before your demo, this buyer sent you a list of 23 questions. During the call, they asked about your SLA uptime percentages, security certifications, and integration documentation. They took detailed notes and asked you to explain your pricing model three different ways. They mentioned they'll need to 'run the numbers' before any next steps.",
    correctType: "beaver",
    explanation:
      "This is a Beaver buyer: analytical, detail-oriented, thorough in research, and needs comprehensive data before deciding.",
  },
  {
    id: "profile-5",
    description:
      "This buyer interrupted your presentation twice to say, 'Let's skip ahead - I get it.' They asked, 'Who else in our industry uses this?' and 'What results did they get?' When you mentioned a case study, they said, 'Just send me the numbers, I'll read it tonight.' They've already scheduled a follow-up with their procurement team.",
    correctType: "lion",
    explanation:
      "This is a Lion buyer: moves fast, wants proof of results, skips unnecessary details, and takes decisive action.",
  },
  {
    id: "profile-6",
    description:
      "This buyer keeps bringing up how your solution could help other departments. They offered to introduce you to their CEO because 'she'd love your story.' In your proposal review, they focused on the partnership section, asking about joint marketing opportunities and customer advisory boards.",
    correctType: "penguin",
    explanation:
      "This is a Penguin buyer: thinks expansively about relationships, loves making connections, and is motivated by collaboration and visibility.",
  },
  {
    id: "profile-7",
    description:
      "This buyer asked for references from customers who've been using your product for at least 3 years. They mentioned their current vendor twice, saying 'they've been good to us.' When discussing implementation, they asked detailed questions about training and support for their junior team members. They ended the call saying, 'I want to make sure we're making the right choice for everyone.'",
    correctType: "retriever",
    explanation:
      "This is a Retriever buyer: values long-term relationships, loyalty to existing partners, and focuses on team impact and support.",
  },
  {
    id: "profile-8",
    description:
      "This buyer created a detailed evaluation matrix comparing you to four competitors. They asked for your API documentation, audit logs, and compliance certifications. When you shared pricing, they asked how each line item was calculated. They mentioned they'll present their findings to the committee in a 12-page recommendation document.",
    correctType: "beaver",
    explanation:
      "This is a Beaver buyer: systematic evaluator, needs comprehensive documentation, and builds thorough business cases with detailed analysis.",
  },
];

// ============================================
// RETRIEVER GAME - MATCHING PAIRS (12 pairs)
// "Trust Builder"
// ============================================

export const retrieverPairs: MatchingPair[] = [
  // Lion traits
  {
    id: "pair-1",
    trait: "Decisive under pressure",
    animalType: "lion",
    category: "strength",
  },
  {
    id: "pair-2",
    trait: "May push too hard and create buyer resistance",
    animalType: "lion",
    category: "blindspot",
  },
  {
    id: "pair-3",
    trait: "Bounces back from rejection faster than most",
    animalType: "lion",
    category: "strength",
  },
  // Penguin traits
  {
    id: "pair-4",
    trait: "Creates genuine connections that last",
    animalType: "penguin",
    category: "strength",
  },
  {
    id: "pair-5",
    trait: "May over-promise in the heat of enthusiasm",
    animalType: "penguin",
    category: "blindspot",
  },
  {
    id: "pair-6",
    trait: "Expands pipelines through referrals and networking",
    animalType: "penguin",
    category: "strength",
  },
  // Retriever traits
  {
    id: "pair-7",
    trait: "Creates deep, lasting client relationships",
    animalType: "retriever",
    category: "strength",
  },
  {
    id: "pair-8",
    trait: "May avoid necessary confrontation or tough conversations",
    animalType: "retriever",
    category: "blindspot",
  },
  {
    id: "pair-9",
    trait: "De-escalates tense situations with clients",
    animalType: "retriever",
    category: "strength",
  },
  // Beaver traits
  {
    id: "pair-10",
    trait: "Knows features, use cases, and edge cases inside out",
    animalType: "beaver",
    category: "strength",
  },
  {
    id: "pair-11",
    trait: "Analysis paralysis can slow deal velocity",
    animalType: "beaver",
    category: "blindspot",
  },
  {
    id: "pair-12",
    trait: "Builds bulletproof proposals with thorough preparation",
    animalType: "beaver",
    category: "strength",
  },
];

// ============================================
// BEAVER GAME - COMPREHENSIVE QUIZ (10 questions)
// "The Detail Master"
// ============================================

export const beaverQuestions: ComprehensiveQuestion[] = [
  {
    id: "beaver-1",
    type: "true_false",
    question: "Lions are known for being patient and taking time to build consensus before making decisions.",
    correctAnswer: false,
    explanation:
      "False. Lions are decisive and results-driven. They prefer quick action over lengthy consensus-building.",
  },
  {
    id: "beaver-2",
    type: "true_false",
    question: "Penguins are most likely to expand their pipeline through networking and referrals.",
    correctAnswer: true,
    explanation:
      "True. Penguins are natural connectors who build relationships that lead to referrals and expanded networks.",
  },
  {
    id: "beaver-3",
    type: "true_false",
    question: "Retrievers tend to prioritize closing deals quickly over building long-term relationships.",
    correctAnswer: false,
    explanation:
      "False. Retrievers are focused on trust and long-term relationships, often prioritizing these over quick closes.",
  },
  {
    id: "beaver-4",
    type: "multiple_choice",
    question: "Which animal type is most likely to win deals through thorough preparation and detailed proposals?",
    options: ["Lion", "Penguin", "Retriever", "Beaver"],
    correctAnswer: "Beaver",
    explanation:
      "Beavers are specialists who excel at preparation, documentation, and building bulletproof business cases.",
  },
  {
    id: "beaver-5",
    type: "multiple_choice",
    question: "When selling to a Lion buyer, you should:",
    options: [
      "Take time to build personal rapport first",
      "Provide extensive documentation and data",
      "Be direct and focus on results and ROI",
      "Emphasize how the decision will affect their team",
    ],
    correctAnswer: "Be direct and focus on results and ROI",
    explanation:
      "Lions value directness, efficiency, and results. They don't want small talk or excessive detail.",
  },
  {
    id: "beaver-6",
    type: "multiple_choice",
    question: "Which blind spot is most commonly associated with Penguins?",
    options: [
      "Being too direct with prospects",
      "Over-promising in the heat of enthusiasm",
      "Spending too much time on data analysis",
      "Avoiding difficult conversations",
    ],
    correctAnswer: "Over-promising in the heat of enthusiasm",
    explanation:
      "Penguins' enthusiasm can lead them to make commitments they can't always keep.",
  },
  {
    id: "beaver-7",
    type: "identification",
    question: "Which animal type has 'The Trusted Advisor' as their title?",
    options: ["Lion", "Penguin", "Retriever", "Beaver"],
    correctAnswer: "Retriever",
    explanation:
      "Retrievers are known as 'The Trusted Advisor' because they win through patience, reliability, and genuine care.",
  },
  {
    id: "beaver-8",
    type: "multiple_choice",
    question: "A Beaver's biggest challenge when selling to a Penguin buyer is likely to be:",
    options: [
      "Providing enough data and documentation",
      "Moving too fast through the sales process",
      "Building personal rapport before diving into details",
      "Being too pushy about closing",
    ],
    correctAnswer: "Building personal rapport before diving into details",
    explanation:
      "Beavers prefer data and details, but Penguins need connection first. Beavers must warm up before presenting.",
  },
  {
    id: "beaver-9",
    type: "identification",
    question: "Which animal type is described as 'The Closer'?",
    options: ["Lion", "Penguin", "Retriever", "Beaver"],
    correctAnswer: "Lion",
    explanation:
      "Lions are 'The Closer' - they thrive on competition, make quick decisions, and push deals across the finish line.",
  },
  {
    id: "beaver-10",
    type: "multiple_choice",
    question: "What's the best strategy when a Retriever buyer says they need more time to decide?",
    options: [
      "Push harder with urgency and limited-time offers",
      "Give them space and continue to provide steady support",
      "Introduce them to other stakeholders in your company",
      "Send detailed competitive analysis documents",
    ],
    correctAnswer: "Give them space and continue to provide steady support",
    explanation:
      "Retrievers value trust and patience. Pushing them creates resistance. Consistent, supportive follow-up works best.",
  },
];

// ============================================
// GAME METADATA
// ============================================

export const gameMetadata = {
  lion: {
    name: "Sales Scenario Challenge",
    title: "Lion",
    description:
      "Real-world sales scenarios where you identify buyer types and choose the best approach for each situation.",
    totalQuestions: 10,
    passingScore: 80,
    estimatedTime: "5 minutes",
    color: "#dc2626",
  },
  penguin: {
    name: "Buyer Profile Identifier",
    title: "Penguin",
    description:
      "Read buyer profiles and identify their animal type. Can you spot the signals that reveal how people buy?",
    totalQuestions: 8,
    passingScore: 80,
    estimatedTime: "4 minutes",
    color: "#0891b2",
  },
  retriever: {
    name: "Trait Matcher",
    title: "Retriever",
    description:
      "Match sales traits and characteristics to the correct animal types. Test your knowledge of what makes each type unique.",
    totalQuestions: 12,
    passingScore: 80,
    estimatedTime: "3 minutes",
    color: "#d97706",
  },
  beaver: {
    name: "Knowledge Quiz",
    title: "Beaver",
    description:
      "Comprehensive quiz covering all animal types - their strengths, blind spots, and how to work with each.",
    totalQuestions: 10,
    passingScore: 80,
    estimatedTime: "5 minutes",
    color: "#059669",
  },
};

// Helper function to calculate passing threshold
export function getPassingThreshold(gameType: keyof typeof gameMetadata): number {
  const game = gameMetadata[gameType];
  return Math.ceil((game.passingScore / 100) * game.totalQuestions);
}

// Helper to generate certificate number
export function generateCertificateNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AS-${year}-${random}`;
}
