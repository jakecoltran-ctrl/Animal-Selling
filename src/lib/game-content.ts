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
// "The Closer Challenge"
// ============================================

export const lionQuestions: ScenarioQuestion[] = [
  {
    id: "lion-1",
    scenario:
      "A prospect says, 'I need to think about it and discuss with my team.' What's the most effective Lion response?",
    options: [
      {
        id: "a",
        text: "Take all the time you need. I'll follow up next week.",
        isCorrect: false,
        explanation: "This is too passive and loses momentum.",
      },
      {
        id: "b",
        text: "What specifically do you need to think about? Let's address those concerns now.",
        isCorrect: true,
        explanation:
          "Lions get to the root of objections directly and keep the conversation moving.",
      },
      {
        id: "c",
        text: "Let me send you some additional case studies to share with your team.",
        isCorrect: false,
        explanation: "This delays the decision without addressing the real concern.",
      },
      {
        id: "d",
        text: "I completely understand. Would you like to schedule a call with your whole team?",
        isCorrect: false,
        explanation: "While collaborative, this doesn't address the underlying hesitation.",
      },
    ],
  },
  {
    id: "lion-2",
    scenario:
      "Your competitor just dropped their price by 20%. Your prospect brings this up. How should a Lion respond?",
    options: [
      {
        id: "a",
        text: "Let me check with my manager about matching that price.",
        isCorrect: false,
        explanation: "This immediately devalues your offering and shows weakness.",
      },
      {
        id: "b",
        text: "That's interesting. What made you share that with me?",
        isCorrect: false,
        explanation: "While curious, it avoids addressing the competitive threat.",
      },
      {
        id: "c",
        text: "Price is important, but let's talk about the cost of choosing the wrong solution. What would a failed implementation cost your team?",
        isCorrect: true,
        explanation:
          "Lions redirect to value and outcomes, not price wars.",
      },
      {
        id: "d",
        text: "I appreciate you letting me know. Our product does have premium features that justify the investment.",
        isCorrect: false,
        explanation: "Defensive without tying back to the prospect's specific needs.",
      },
    ],
  },
  {
    id: "lion-3",
    scenario:
      "You've been in a 45-minute call with no clear next steps emerging. What does a Lion do?",
    options: [
      {
        id: "a",
        text: "Thank them for their time and offer to send a summary email.",
        isCorrect: false,
        explanation: "This ends the call without any commitment.",
      },
      {
        id: "b",
        text: "Keep the conversation going to build more rapport.",
        isCorrect: false,
        explanation: "Lions value efficiency and won't waste time without purpose.",
      },
      {
        id: "c",
        text: "Based on what we've discussed, I'd recommend we schedule a demo for next Tuesday. Does 2pm work?",
        isCorrect: true,
        explanation:
          "Lions take charge and propose specific next steps.",
      },
      {
        id: "d",
        text: "What would you like to do next?",
        isCorrect: false,
        explanation: "This puts the burden on the prospect instead of leading.",
      },
    ],
  },
  {
    id: "lion-4",
    scenario:
      "A decision-maker keeps delegating your calls to a junior team member. How does a Lion handle this?",
    options: [
      {
        id: "a",
        text: "Build a strong relationship with the junior person - they might influence the decision.",
        isCorrect: false,
        explanation: "While useful, this doesn't address access to power.",
      },
      {
        id: "b",
        text: "Send a direct email to the decision-maker outlining 3 specific outcomes they'll miss without a conversation.",
        isCorrect: true,
        explanation:
          "Lions go direct to power and create urgency with concrete impact.",
      },
      {
        id: "c",
        text: "Accept working with the junior person and do a great job.",
        isCorrect: false,
        explanation: "This accepts being blocked from the real decision-maker.",
      },
      {
        id: "d",
        text: "Ask the junior person to arrange a meeting with their boss.",
        isCorrect: false,
        explanation: "This puts them in an awkward position and rarely works.",
      },
    ],
  },
  {
    id: "lion-5",
    scenario:
      "Your prospect says, 'We've already invested heavily in a competitor's solution.' What's the Lion play?",
    options: [
      {
        id: "a",
        text: "I understand. If things change, please keep us in mind.",
        isCorrect: false,
        explanation: "This immediately gives up on the opportunity.",
      },
      {
        id: "b",
        text: "That's exactly why companies switch to us. What's the #1 thing that solution isn't delivering for you?",
        isCorrect: true,
        explanation:
          "Lions find the gap and position switching as the smart move.",
      },
      {
        id: "c",
        text: "Would you be interested in seeing how we compare?",
        isCorrect: false,
        explanation: "Too generic - doesn't address their specific pain.",
      },
      {
        id: "d",
        text: "How long have you been using them?",
        isCorrect: false,
        explanation: "Gathering information without driving toward action.",
      },
    ],
  },
  {
    id: "lion-6",
    scenario:
      "You're in contract negotiation and the prospect wants to remove the annual commitment. What does a Lion do?",
    options: [
      {
        id: "a",
        text: "Agree to the change to close the deal faster.",
        isCorrect: false,
        explanation: "This sets a bad precedent and reduces deal value.",
      },
      {
        id: "b",
        text: "Explain why the annual commitment benefits them: dedicated support, locked-in pricing, and priority roadmap input.",
        isCorrect: true,
        explanation:
          "Lions stand firm but tie it to customer benefit, not just company policy.",
      },
      {
        id: "c",
        text: "Escalate to your manager for approval.",
        isCorrect: false,
        explanation: "This shows you don't have authority and delays the close.",
      },
      {
        id: "d",
        text: "Offer a 6-month trial period as a compromise.",
        isCorrect: false,
        explanation: "Immediately compromising without understanding their concern.",
      },
    ],
  },
  {
    id: "lion-7",
    scenario:
      "A prospect goes silent after receiving your proposal. It's been a week. What's the Lion move?",
    options: [
      {
        id: "a",
        text: "Send a friendly check-in email asking if they have questions.",
        isCorrect: false,
        explanation: "Too passive - doesn't create urgency or offer value.",
      },
      {
        id: "b",
        text: "Wait another week - they're probably busy.",
        isCorrect: false,
        explanation: "Lions don't wait and hope. They drive action.",
      },
      {
        id: "c",
        text: "Call directly with a specific reason: 'I have an update on implementation timelines that affects your Q3 launch.'",
        isCorrect: true,
        explanation:
          "Lions create urgency with relevant, timely information.",
      },
      {
        id: "d",
        text: "Ask a mutual connection to put in a good word.",
        isCorrect: false,
        explanation: "Indirect when direct communication is needed.",
      },
    ],
  },
  {
    id: "lion-8",
    scenario:
      "During a demo, the prospect's CFO joins unexpectedly and immediately asks about ROI. How does a Lion pivot?",
    options: [
      {
        id: "a",
        text: "Continue with the planned demo and address ROI at the end.",
        isCorrect: false,
        explanation: "Ignoring the CFO's interest could lose executive buy-in.",
      },
      {
        id: "b",
        text: "Stop the demo. 'Great question. Based on similar companies, here's the 12-month impact...' and pull up your ROI calculator.",
        isCorrect: true,
        explanation:
          "Lions read the room and immediately address executive priorities.",
      },
      {
        id: "c",
        text: "Promise to send an ROI analysis after the call.",
        isCorrect: false,
        explanation: "Delays addressing the CFO's concern when they're engaged now.",
      },
      {
        id: "d",
        text: "Ask the CFO what specific metrics matter most to them.",
        isCorrect: false,
        explanation: "Good discovery, but Lions lead with value first.",
      },
    ],
  },
  {
    id: "lion-9",
    scenario:
      "You've won the deal verbally, but legal is dragging their feet on contract review. It's been 3 weeks. What's the Lion approach?",
    options: [
      {
        id: "a",
        text: "Check in weekly with your champion to ask for updates.",
        isCorrect: false,
        explanation: "Passive and puts burden on your champion.",
      },
      {
        id: "b",
        text: "Offer to have your legal team join a call with their legal team to resolve issues in real-time.",
        isCorrect: true,
        explanation:
          "Lions take action to remove blockers directly.",
      },
      {
        id: "c",
        text: "Wait patiently - rushing legal could backfire.",
        isCorrect: false,
        explanation: "Lions don't wait when there's a deal to close.",
      },
      {
        id: "d",
        text: "Escalate to your manager to contact their executive sponsor.",
        isCorrect: false,
        explanation: "This might work but doesn't solve the actual blocker.",
      },
    ],
  },
  {
    id: "lion-10",
    scenario:
      "Your prospect says, 'We love it, but we need to wait until next quarter's budget.' How does a Lion respond?",
    options: [
      {
        id: "a",
        text: "I understand. Let's reconnect in January.",
        isCorrect: false,
        explanation: "Accepts delay without exploring alternatives.",
      },
      {
        id: "b",
        text: "If budget is the only barrier, what if we structured payment to start next quarter while you begin implementation now?",
        isCorrect: true,
        explanation:
          "Lions find creative solutions to close deals faster.",
      },
      {
        id: "c",
        text: "Is there any way to pull budget from another initiative?",
        isCorrect: false,
        explanation: "Puts the work on the prospect without offering a solution.",
      },
      {
        id: "d",
        text: "Let me send you some resources to review in the meantime.",
        isCorrect: false,
        explanation: "Accepts the delay instead of pushing through it.",
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
    name: "The Closer Challenge",
    title: "Lion",
    description:
      "Test your sales closing skills with 10 real-world objection scenarios. Can you respond like a Lion?",
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
    name: "Trust Builder",
    title: "Retriever",
    description:
      "Match sales traits to their animal types. Test your knowledge of what makes each type unique.",
    totalQuestions: 12,
    passingScore: 80,
    estimatedTime: "3 minutes",
    color: "#d97706",
  },
  beaver: {
    name: "The Detail Master",
    title: "Beaver",
    description:
      "A comprehensive quiz covering all animal types. True/false, multiple choice, and identification questions.",
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
