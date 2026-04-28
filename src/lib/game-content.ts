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
        text: "Absolutely, I'll schedule a follow-up call for next Tuesday to address any questions that come up.",
        isCorrect: false,
        explanation: "While proactive, this accepts the delay rather than addressing concerns now.",
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
        text: "I'll prepare a detailed comparison document your team can review together.",
        isCorrect: false,
        explanation: "Helpful, but delays the decision without uncovering the real concern.",
      },
      {
        id: "d",
        text: "Would it help if I joined the discussion with your team to answer questions directly?",
        isCorrect: false,
        explanation: "Collaborative approach, but doesn't address the underlying hesitation first.",
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
        text: "We can be flexible on pricing for the right partnership. Let me see what I can do.",
        isCorrect: false,
        explanation: "Opens the door to discounting without establishing value first.",
      },
      {
        id: "b",
        text: "That's a significant discount. What's driving their price reduction right now?",
        isCorrect: false,
        explanation: "Deflects but doesn't redirect to your value proposition.",
      },
      {
        id: "c",
        text: "Price matters, but so does the cost of choosing wrong. What would a failed implementation cost your team?",
        isCorrect: true,
        explanation:
          "Lions redirect to value and outcomes, not price wars.",
      },
      {
        id: "d",
        text: "Our pricing reflects the premium support and features included. Let me walk you through what you get.",
        isCorrect: false,
        explanation: "Defensive approach that doesn't tie back to their specific needs.",
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
        text: "This has been valuable. I'll send a summary and we can pick this up when you're ready.",
        isCorrect: false,
        explanation: "Polite but ends without commitment or clear direction.",
      },
      {
        id: "b",
        text: "Before we wrap up, what other stakeholders should I connect with to move this forward?",
        isCorrect: false,
        explanation: "Good question, but doesn't propose a specific commitment.",
      },
      {
        id: "c",
        text: "Based on what we've discussed, I'd recommend we schedule a demo for next Tuesday. Does 2pm work?",
        isCorrect: true,
        explanation:
          "Lions take charge and propose specific next steps with a concrete time.",
      },
      {
        id: "d",
        text: "What information would be most helpful for me to send over after this call?",
        isCorrect: false,
        explanation: "Puts the burden on the prospect instead of leading the process.",
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
        text: "Empower the junior person with everything they need to make a strong internal case.",
        isCorrect: false,
        explanation: "Useful tactic, but doesn't address the access-to-power problem.",
      },
      {
        id: "b",
        text: "Email the decision-maker directly: 'I've identified 3 outcomes at risk without 15 minutes of your time.'",
        isCorrect: true,
        explanation:
          "Lions go direct to power and create urgency with concrete business impact.",
      },
      {
        id: "c",
        text: "Ask the junior person what would make the decision-maker want to join a call.",
        isCorrect: false,
        explanation: "Indirect approach that relies on the junior person's willingness to advocate.",
      },
      {
        id: "d",
        text: "Continue building value with the junior person - they'll escalate when they're convinced.",
        isCorrect: false,
        explanation: "Patient approach, but accepts being blocked from the real decision-maker.",
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
        text: "I hear that often. Would it be helpful to see how other companies made the transition?",
        isCorrect: false,
        explanation: "Opens the door but doesn't probe their current pain points.",
      },
      {
        id: "b",
        text: "That's exactly why companies switch to us. What's the #1 thing that solution isn't delivering?",
        isCorrect: true,
        explanation:
          "Lions find the gap and position switching as the smart move, not a loss.",
      },
      {
        id: "c",
        text: "Understood. If we can demonstrate 2x the value, would that change the equation?",
        isCorrect: false,
        explanation: "Hypothetical question that doesn't uncover their actual pain.",
      },
      {
        id: "d",
        text: "What would need to change for you to consider alternatives?",
        isCorrect: false,
        explanation: "Good discovery question, but doesn't lead toward action.",
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
        text: "I can offer a quarterly option, but let me show you the value difference with annual.",
        isCorrect: false,
        explanation: "Immediately offers a compromise before understanding their concern.",
      },
      {
        id: "b",
        text: "Annual commitment gets you dedicated support, locked-in pricing, and roadmap input. That's why customers choose it.",
        isCorrect: true,
        explanation:
          "Lions stand firm but tie it to customer benefit, not company policy.",
      },
      {
        id: "c",
        text: "Help me understand what's driving that request - is it budget timing or flexibility concerns?",
        isCorrect: false,
        explanation: "Good discovery, but delays demonstrating the value of the commitment.",
      },
      {
        id: "d",
        text: "Let me talk to my team about what options we might have for you.",
        isCorrect: false,
        explanation: "Defers authority and delays the conversation.",
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
        text: "Send a brief email: 'Wanted to check in on the proposal. Any questions I can address?'",
        isCorrect: false,
        explanation: "Standard follow-up that doesn't create urgency or add new value.",
      },
      {
        id: "b",
        text: "Give them space - they'll reach out when ready. Follow up again in a few days.",
        isCorrect: false,
        explanation: "Passive approach that risks losing momentum entirely.",
      },
      {
        id: "c",
        text: "Call directly: 'I have an update on implementation timelines that affects your Q3 launch.'",
        isCorrect: true,
        explanation:
          "Lions create urgency with relevant, timely information that demands attention.",
      },
      {
        id: "d",
        text: "Send a case study from a similar company showing the results they achieved.",
        isCorrect: false,
        explanation: "Adds value but doesn't create the urgency needed to re-engage.",
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
        text: "Great question! Let me finish this section and then we'll dive deep into ROI.",
        isCorrect: false,
        explanation: "Delays addressing the CFO's priority when they're engaged now.",
      },
      {
        id: "b",
        text: "Stop the demo. 'Great question. Based on similar companies, here's the 12-month impact...' and pull up ROI data.",
        isCorrect: true,
        explanation:
          "Lions read the room and immediately address executive priorities.",
      },
      {
        id: "c",
        text: "I'd love to share ROI data. What specific metrics does your finance team track most closely?",
        isCorrect: false,
        explanation: "Good discovery, but misses the moment to lead with value.",
      },
      {
        id: "d",
        text: "I can send you our ROI calculator after this call - it's quite detailed.",
        isCorrect: false,
        explanation: "Defers the conversation when executive attention is at its peak.",
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
        text: "Ask your champion to check in with legal and let you know if there are sticking points.",
        isCorrect: false,
        explanation: "Puts the burden on your champion rather than taking direct action.",
      },
      {
        id: "b",
        text: "Propose a call where your legal team and theirs can resolve issues in real-time.",
        isCorrect: true,
        explanation:
          "Lions take action to remove blockers directly and efficiently.",
      },
      {
        id: "c",
        text: "Send a summary of all the terms we've agreed on to help legal see the alignment.",
        isCorrect: false,
        explanation: "Helpful documentation, but doesn't accelerate the actual review process.",
      },
      {
        id: "d",
        text: "Be patient - pushing legal too hard could damage the relationship.",
        isCorrect: false,
        explanation: "Risk-averse approach that accepts unnecessary delay.",
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
        text: "I understand. Let me set a reminder to reconnect when the new budget cycle begins.",
        isCorrect: false,
        explanation: "Accepts the delay without exploring creative solutions.",
      },
      {
        id: "b",
        text: "What if we structured payment to start next quarter while you begin implementation now?",
        isCorrect: true,
        explanation:
          "Lions find creative solutions to close deals faster.",
      },
      {
        id: "c",
        text: "Is there any discretionary budget or a different cost center that could cover this?",
        isCorrect: false,
        explanation: "Puts the problem-solving work entirely on the prospect.",
      },
      {
        id: "d",
        text: "Would a smaller initial deployment work within your current budget?",
        isCorrect: false,
        explanation: "Reduces deal size rather than solving the timing problem.",
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
