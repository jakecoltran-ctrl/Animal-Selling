import { QuizQuestion, SalesContext } from "@/types";

// Helper to create spectrum question scoring (Lion ↔ Retriever or Penguin ↔ Beaver)
function spectrumScoring(
  primaryHigh: "lion" | "penguin",
  primaryLow: "retriever" | "beaver"
): QuizQuestion["scoring"] {
  return {
    5: { [primaryHigh]: 7, [primaryLow]: -1, lion: 0, penguin: 0, retriever: 0, beaver: 0, ...{ [primaryHigh]: 7, [primaryLow]: -1 } },
    4: { lion: 0, penguin: 0, retriever: 0, beaver: 0, [primaryHigh]: 4 },
    3: { lion: 0, penguin: 0, retriever: 0, beaver: 0, [primaryHigh]: 1, [primaryLow]: 1 },
    2: { lion: 0, penguin: 0, retriever: 0, beaver: 0, [primaryLow]: 4 },
    1: { [primaryLow]: 7, [primaryHigh]: -1, lion: 0, penguin: 0, retriever: 0, beaver: 0, ...{ [primaryLow]: 7, [primaryHigh]: -1 } },
  } as QuizQuestion["scoring"];
}

// Lion ↔ Retriever spectrum scoring
const lionRetrieverScoring: QuizQuestion["scoring"] = {
  5: { lion: 7, penguin: 0, retriever: -1, beaver: 0 },
  4: { lion: 4, penguin: 0, retriever: 0, beaver: 0 },
  3: { lion: 1, penguin: 0, retriever: 1, beaver: 0 },
  2: { lion: 0, penguin: 0, retriever: 4, beaver: 0 },
  1: { lion: -1, penguin: 0, retriever: 7, beaver: 0 },
};

// Penguin ↔ Beaver spectrum scoring
const penguinBeaverScoring: QuizQuestion["scoring"] = {
  5: { lion: 0, penguin: 7, retriever: 0, beaver: -1 },
  4: { lion: 0, penguin: 4, retriever: 0, beaver: 0 },
  3: { lion: 0, penguin: 1, retriever: 0, beaver: 1 },
  2: { lion: 0, penguin: 0, retriever: 0, beaver: 4 },
  1: { lion: 0, penguin: -1, retriever: 0, beaver: 7 },
};

export const quizQuestions: QuizQuestion[] = [
  // ============================================
  // TYPE A: SPECTRUM QUESTIONS (14 total)
  // Lion ↔ Retriever Axis (7 questions)
  // ============================================

  {
    id: "q1",
    baseText: "When reaching out to a new prospect, I prefer to get straight to the point rather than warm up the conversation first.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "When cold-calling a potential corporate buyer, I get straight to my value proposition rather than spending time on small talk.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When approaching a new customer in the store, I quickly identify what they need rather than chatting to build rapport first.",
      },
      {
        sellType: "service",
        customerType: "b2b",
        text: "When reaching out to a potential client, I lead with how we can solve their problem rather than warming up the conversation.",
      },
      {
        sellType: "service",
        customerType: "b2c",
        text: "When a potential client contacts me, I quickly get to understanding their needs rather than extended introductions.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "prospecting",
  },

  {
    id: "q2",
    baseText: "I'd rather qualify a prospect quickly and move on than invest extra time understanding their full situation.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "In discovery with a corporate buyer, I focus on determining fit quickly rather than exploring their entire business context.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When a customer is browsing, I quickly assess if they're ready to buy rather than learning everything about their situation.",
      },
      {
        sellType: "service",
        customerType: "b2b",
        text: "On discovery calls, I qualify budget and timeline early rather than spending extensive time understanding their challenges.",
      },
      {
        sellType: "service",
        customerType: "b2c",
        text: "In consultations, I determine if someone is a fit quickly rather than diving deep into their full background.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "discovery",
  },

  {
    id: "q3",
    baseText: "During presentations, I focus on driving toward a decision rather than ensuring everyone feels completely comfortable.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "In product demos, I keep pushing toward next steps rather than pausing to make sure every stakeholder is fully comfortable.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When showing products, I guide customers toward a purchase decision rather than letting them take unlimited time.",
      },
      {
        sellType: "service",
        text: "In pitch meetings, I drive toward commitment rather than extending discussions to ensure everyone is completely at ease.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "presenting",
  },

  {
    id: "q4",
    baseText: "When a prospect raises concerns, I address them head-on rather than taking time to fully explore their feelings.",
    variants: [
      {
        sellType: "product",
        text: "When a buyer objects to pricing, I counter with value justification rather than deeply exploring their budget concerns.",
      },
      {
        sellType: "service",
        text: "When a client raises objections, I address them directly rather than spending extensive time understanding the emotion behind them.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "objections",
  },

  {
    id: "q5",
    baseText: "I ask for the business as soon as buying signals appear rather than waiting until the prospect initiates.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "When a corporate buyer shows interest, I propose next steps immediately rather than waiting for them to ask.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When a customer seems interested, I move to close the sale rather than waiting for them to decide on their own.",
      },
      {
        sellType: "service",
        text: "When a prospect shows enthusiasm, I ask for the engagement rather than waiting for them to bring up next steps.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "closing",
  },

  {
    id: "q6",
    baseText: "After closing, I focus on the next opportunity rather than investing heavily in post-sale relationship building.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "After closing a corporate deal, I move to new prospects rather than spending extensive time on account nurturing.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "After a customer buys, I focus on new customers rather than extensive follow-up with past buyers.",
      },
      {
        sellType: "service",
        text: "After landing a client, I focus on new business development rather than intensive relationship maintenance.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "retention",
  },

  {
    id: "q7",
    baseText: "In competitive situations, I energize from the challenge of winning rather than finding collaborative solutions.",
    variants: [
      {
        sellType: "product",
        text: "In competitive bids, I'm motivated by beating the competition rather than finding win-win outcomes.",
      },
      {
        sellType: "service",
        text: "In RFP situations, I focus on winning against competitors rather than exploring collaborative approaches.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "presenting",
  },

  // ============================================
  // Penguin ↔ Beaver Axis (7 questions)
  // ============================================

  {
    id: "q8",
    baseText: "When prospecting, I lead with energy and enthusiasm rather than detailed research about their business.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "When reaching out to new corporate prospects, I lead with enthusiasm and energy rather than detailed company research.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When greeting new customers, I focus on creating excitement rather than asking detailed questions first.",
      },
      {
        sellType: "service",
        text: "When connecting with potential clients, I lead with personality and energy rather than showcasing my research about them.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "prospecting",
  },

  {
    id: "q9",
    baseText: "I prefer conversational, free-flowing discovery calls over following a structured question framework.",
    variants: [
      {
        sellType: "product",
        text: "In discovery meetings, I let the conversation flow naturally rather than following a structured list of questions.",
      },
      {
        sellType: "service",
        text: "On discovery calls, I prefer organic conversation over methodically working through a question framework.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "discovery",
  },

  {
    id: "q10",
    baseText: "My presentations rely more on storytelling and excitement than detailed specs and data.",
    variants: [
      {
        sellType: "product",
        text: "In product presentations, I focus on telling compelling stories rather than walking through detailed specifications.",
      },
      {
        sellType: "service",
        text: "When pitching services, I lead with inspiring narratives rather than detailed methodologies and data.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "presenting",
  },

  {
    id: "q11",
    baseText: "I handle objections by redirecting with enthusiasm rather than responding with detailed evidence.",
    variants: [
      {
        sellType: "product",
        text: "When buyers raise concerns, I redirect with energy and positive framing rather than countering with detailed data.",
      },
      {
        sellType: "service",
        text: "When clients object, I address it with enthusiasm and reframing rather than detailed evidence and documentation.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "objections",
  },

  {
    id: "q12",
    baseText: "I close deals by making it feel like a natural next step in our relationship rather than presenting a thorough summary.",
    variants: [
      {
        sellType: "product",
        text: "I close by making the purchase feel like a natural extension of our conversation rather than presenting a detailed recap.",
      },
      {
        sellType: "service",
        text: "I close engagements by building on our relationship momentum rather than presenting a comprehensive summary.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "closing",
  },

  {
    id: "q13",
    baseText: "I stay in touch with clients through casual, personal check-ins rather than structured reviews with metrics.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "I maintain corporate relationships through personal touchpoints rather than formal quarterly business reviews.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "I keep in touch with past customers through friendly messages rather than structured follow-up sequences.",
      },
      {
        sellType: "service",
        text: "I nurture client relationships through casual check-ins rather than formal reviews with performance metrics.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "retention",
  },

  {
    id: "q14",
    baseText: "I trust my instincts and adapt on the fly rather than following a detailed plan.",
    variants: [
      {
        sellType: "product",
        text: "In sales situations, I trust my gut and improvise rather than sticking to a detailed script or plan.",
      },
      {
        sellType: "service",
        text: "In client interactions, I adapt based on feel rather than following a predetermined approach.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: penguinBeaverScoring,
    primaryType: "penguin",
    salesStage: "presenting",
  },

  // ============================================
  // TYPE B: QUADRANT QUESTIONS (10 total)
  // All four types score based on answer position
  // ============================================

  {
    id: "q15",
    baseText: "When I identify a promising lead, my first instinct is to reach out immediately rather than research them thoroughly first.",
    variants: [
      {
        sellType: "product",
        text: "When I find a promising prospect, I reach out immediately rather than spending time researching their company first.",
      },
      {
        sellType: "service",
        text: "When I identify a potential client, I connect quickly rather than thoroughly researching them beforehand.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 2, retriever: 0, beaver: 0 },
      4: { lion: 3, penguin: 1, retriever: 0, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 2, beaver: 3 },
      1: { lion: 0, penguin: 0, retriever: 2, beaver: 5 },
    },
    primaryType: "lion",
    salesStage: "prospecting",
  },

  {
    id: "q16",
    baseText: "In discovery meetings, I'm most satisfied when I uncover the key pain point quickly rather than building deep personal rapport.",
    variants: [
      {
        sellType: "product",
        text: "In discovery calls, I feel successful when I identify the core need fast rather than when I build a personal connection.",
      },
      {
        sellType: "service",
        text: "In initial consultations, I prioritize finding the problem to solve over establishing a personal relationship first.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 0, retriever: 0, beaver: 2 },
      4: { lion: 3, penguin: 0, retriever: 1, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 3, retriever: 2, beaver: 0 },
      1: { lion: 0, penguin: 5, retriever: 2, beaver: 0 },
    },
    primaryType: "lion",
    salesStage: "discovery",
  },

  {
    id: "q17",
    baseText: "The best compliment I could receive after a presentation is 'That was compelling and energizing' rather than 'That was thorough and well-prepared.'",
    variants: [
      {
        sellType: "product",
        text: "After a product demo, I'd rather hear 'That was exciting!' than 'That covered everything in detail.'",
      },
      {
        sellType: "service",
        text: "After pitching, I'd rather hear 'That was inspiring!' than 'That was comprehensive and well-documented.'",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 2, penguin: 5, retriever: 0, beaver: 0 },
      4: { lion: 1, penguin: 3, retriever: 0, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 2, beaver: 3 },
      1: { lion: 0, penguin: 0, retriever: 2, beaver: 5 },
    },
    primaryType: "penguin",
    salesStage: "presenting",
  },

  {
    id: "q18",
    baseText: "When a decision-maker pushes back hard, I welcome the challenge rather than seeking to fully understand their concern.",
    variants: [
      {
        sellType: "product",
        text: "When a buyer challenges my proposal, I lean into the debate rather than stepping back to understand their perspective.",
      },
      {
        sellType: "service",
        text: "When a client pushes back, I engage the challenge directly rather than first seeking to fully understand their viewpoint.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 2, retriever: 0, beaver: 0 },
      4: { lion: 3, penguin: 1, retriever: 0, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 3, beaver: 2 },
      1: { lion: 0, penguin: 0, retriever: 5, beaver: 2 },
    },
    primaryType: "lion",
    salesStage: "objections",
  },

  {
    id: "q19",
    baseText: "After closing a big deal, I immediately think about the next opportunity rather than celebrating with the team and client.",
    variants: [
      {
        sellType: "product",
        text: "After a big sale, my mind goes to the next deal rather than celebrating the win with colleagues and the customer.",
      },
      {
        sellType: "service",
        text: "After landing a major client, I shift focus to new opportunities rather than taking time to celebrate with the team.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 0, retriever: 0, beaver: 2 },
      4: { lion: 3, penguin: 0, retriever: 1, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 3, retriever: 2, beaver: 0 },
      1: { lion: 0, penguin: 5, retriever: 2, beaver: 0 },
    },
    primaryType: "lion",
    salesStage: "closing",
  },

  {
    id: "q20",
    baseText: "My ideal client relationship is efficient and results-focused rather than warm and personally connected.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "With corporate accounts, I prefer efficient, results-focused interactions over building personal friendships.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "With customers, I prefer helpful, efficient service over becoming personally invested in their lives.",
      },
      {
        sellType: "service",
        text: "With clients, I prefer professional, results-oriented partnerships over becoming close personal friends.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 4, penguin: 0, retriever: 0, beaver: 3 },
      4: { lion: 3, penguin: 0, retriever: 1, beaver: 2 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 2, retriever: 3, beaver: 0 },
      1: { lion: 0, penguin: 3, retriever: 4, beaver: 0 },
    },
    primaryType: "lion",
    salesStage: "retention",
  },

  {
    id: "q21",
    baseText: "When learning a new product or service to sell, I jump in and learn by doing rather than studying all documentation first.",
    variants: [
      {
        sellType: "product",
        text: "When learning a new product, I start selling and learn as I go rather than studying every specification first.",
      },
      {
        sellType: "service",
        text: "When learning a new service offering, I start conversations with prospects rather than mastering all the details first.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 2, penguin: 5, retriever: 0, beaver: 0 },
      4: { lion: 1, penguin: 3, retriever: 0, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 2, beaver: 3 },
      1: { lion: 0, penguin: 0, retriever: 2, beaver: 5 },
    },
    primaryType: "penguin",
    salesStage: "presenting",
  },

  {
    id: "q22",
    baseText: "In team meetings, I typically drive for decisions and action items rather than ensuring everyone's voice is heard.",
    variants: [
      {
        sellType: "product",
        text: "In sales team meetings, I push for decisions and next steps rather than making sure everyone shares their perspective.",
      },
      {
        sellType: "service",
        text: "In team discussions, I drive toward action items rather than facilitating input from every team member.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 0, retriever: 0, beaver: 2 },
      4: { lion: 3, penguin: 0, retriever: 1, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 2, retriever: 3, beaver: 0 },
      1: { lion: 0, penguin: 2, retriever: 5, beaver: 0 },
    },
    primaryType: "lion",
    salesStage: "presenting",
  },

  {
    id: "q23",
    baseText: "When a deal is at risk, I prefer to take bold action to save it rather than analyze what went wrong methodically.",
    variants: [
      {
        sellType: "product",
        text: "When a deal is slipping, I take immediate action rather than stepping back to analyze the situation thoroughly.",
      },
      {
        sellType: "service",
        text: "When an engagement is at risk, I move quickly to address it rather than conducting a detailed root cause analysis.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 2, retriever: 0, beaver: 0 },
      4: { lion: 3, penguin: 1, retriever: 0, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 2, beaver: 3 },
      1: { lion: 0, penguin: 0, retriever: 2, beaver: 5 },
    },
    primaryType: "lion",
    salesStage: "objections",
  },

  {
    id: "q24",
    baseText: "I measure my success more by revenue and wins this quarter rather than relationships and reputation built over time.",
    variants: [
      {
        sellType: "product",
        text: "I judge my performance by sales numbers this quarter rather than by customer relationships cultivated.",
      },
      {
        sellType: "service",
        text: "I measure success by revenue closed rather than by the depth of client relationships I've built.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      5: { lion: 5, penguin: 0, retriever: 0, beaver: 2 },
      4: { lion: 3, penguin: 0, retriever: 1, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 2, retriever: 3, beaver: 0 },
      1: { lion: 0, penguin: 2, retriever: 5, beaver: 0 },
    },
    primaryType: "lion",
    salesStage: "retention",
  },
];

/**
 * Get the appropriate question text based on sales context.
 * Tries to find the most specific matching variant, falls back to baseText.
 */
export function getQuestionText(question: QuizQuestion, context: SalesContext): string {
  // Try to find exact match first
  let bestMatch = question.variants.find(
    (v) =>
      v.sellType === context.sellType &&
      v.customerType === context.customerType &&
      v.salesChannel === context.salesChannel
  );

  // Try sellType + customerType
  if (!bestMatch) {
    bestMatch = question.variants.find(
      (v) =>
        v.sellType === context.sellType &&
        v.customerType === context.customerType &&
        !v.salesChannel
    );
  }

  // Try sellType + salesChannel
  if (!bestMatch) {
    bestMatch = question.variants.find(
      (v) =>
        v.sellType === context.sellType &&
        v.salesChannel === context.salesChannel &&
        !v.customerType
    );
  }

  // Try sellType only
  if (!bestMatch) {
    bestMatch = question.variants.find(
      (v) => v.sellType === context.sellType && !v.customerType && !v.salesChannel
    );
  }

  // Fall back to any variant with matching sellType
  if (!bestMatch) {
    bestMatch = question.variants.find((v) => v.sellType === context.sellType);
  }

  return bestMatch?.text || question.baseText;
}

export function getShuffledQuestions(): QuizQuestion[] {
  const shuffled = [...quizQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
