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

// Retriever ↔ Lion spectrum scoring (inverse - for flipped questions where agree = Retriever)
const retrieverLionScoring: QuizQuestion["scoring"] = {
  5: { lion: -1, penguin: 0, retriever: 7, beaver: 0 },
  4: { lion: 0, penguin: 0, retriever: 4, beaver: 0 },
  3: { lion: 1, penguin: 0, retriever: 1, beaver: 0 },
  2: { lion: 4, penguin: 0, retriever: 0, beaver: 0 },
  1: { lion: 7, penguin: 0, retriever: -1, beaver: 0 },
};

// Beaver ↔ Penguin spectrum scoring (inverse - for flipped questions where agree = Beaver)
const beaverPenguinScoring: QuizQuestion["scoring"] = {
  5: { lion: 0, penguin: -1, retriever: 0, beaver: 7 },
  4: { lion: 0, penguin: 0, retriever: 0, beaver: 4 },
  3: { lion: 0, penguin: 1, retriever: 0, beaver: 1 },
  2: { lion: 0, penguin: 4, retriever: 0, beaver: 0 },
  1: { lion: 0, penguin: 7, retriever: 0, beaver: -1 },
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
    baseText: "I invest extra time understanding a prospect's full situation rather than quickly qualifying and moving on.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "In discovery with a corporate buyer, I explore their entire business context rather than just determining fit quickly.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When a customer is browsing, I take time to learn about their situation rather than quickly assessing if they're ready to buy.",
      },
      {
        sellType: "service",
        customerType: "b2b",
        text: "On discovery calls, I spend time understanding their challenges rather than qualifying budget and timeline early.",
      },
      {
        sellType: "service",
        customerType: "b2c",
        text: "In consultations, I dive deep into their full background rather than quickly determining if someone is a fit.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: retrieverLionScoring,
    primaryType: "retriever",
    salesStage: "discovery",
  },

  {
    id: "q3",
    baseText: "During presentations, I ensure everyone feels completely comfortable before pushing toward a decision.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "In product demos, I pause to make sure every stakeholder is fully comfortable rather than pushing toward next steps.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When showing products, I let customers take the time they need rather than guiding them toward a quick purchase decision.",
      },
      {
        sellType: "service",
        text: "In pitch meetings, I extend discussions to ensure everyone is at ease rather than driving toward immediate commitment.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: retrieverLionScoring,
    primaryType: "retriever",
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
    baseText: "I wait for the prospect to be fully ready before asking for the business rather than jumping on early buying signals.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "When a corporate buyer shows interest, I wait for them to ask about next steps rather than proposing immediately.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "When a customer seems interested, I let them decide on their own rather than moving to close the sale.",
      },
      {
        sellType: "service",
        text: "When a prospect shows enthusiasm, I wait for them to bring up next steps rather than asking for the engagement.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: retrieverLionScoring,
    primaryType: "retriever",
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
    baseText: "In competitive situations, I prefer finding collaborative solutions rather than focusing on winning.",
    variants: [
      {
        sellType: "product",
        text: "In competitive bids, I look for win-win outcomes rather than focusing on beating the competition.",
      },
      {
        sellType: "service",
        text: "In RFP situations, I explore collaborative approaches rather than focusing on winning against competitors.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: retrieverLionScoring,
    primaryType: "retriever",
    salesStage: "presenting",
  },

  {
    id: "q7b",
    baseText: "When a deal stalls, I push to restart momentum rather than waiting for the prospect to re-engage.",
    variants: [
      {
        sellType: "product",
        text: "When a deal goes quiet, I proactively push to get things moving rather than waiting for the buyer to come back.",
      },
      {
        sellType: "service",
        text: "When a client goes silent, I reach out assertively to restart the conversation rather than giving them space.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["lion", "retriever"],
    scoring: lionRetrieverScoring,
    primaryType: "lion",
    salesStage: "closing",
  },

  // ============================================
  // Penguin ↔ Beaver Axis (8 questions)
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
    baseText: "I prefer following a structured question framework over free-flowing, conversational discovery calls.",
    variants: [
      {
        sellType: "product",
        text: "In discovery meetings, I follow a structured list of questions rather than letting the conversation flow naturally.",
      },
      {
        sellType: "service",
        text: "On discovery calls, I methodically work through a question framework rather than having organic conversation.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: beaverPenguinScoring,
    primaryType: "beaver",
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
    baseText: "I handle objections with detailed evidence rather than redirecting with enthusiasm.",
    variants: [
      {
        sellType: "product",
        text: "When buyers raise concerns, I counter with detailed data rather than redirecting with energy and positive framing.",
      },
      {
        sellType: "service",
        text: "When clients object, I provide detailed evidence and documentation rather than addressing it with enthusiasm and reframing.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: beaverPenguinScoring,
    primaryType: "beaver",
    salesStage: "objections",
  },

  {
    id: "q12",
    baseText: "I close deals by presenting a thorough summary rather than just making it feel like a natural next step.",
    variants: [
      {
        sellType: "product",
        text: "I close by presenting a detailed recap rather than just making the purchase feel like a natural extension of our conversation.",
      },
      {
        sellType: "service",
        text: "I close engagements by presenting a comprehensive summary rather than just building on relationship momentum.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: beaverPenguinScoring,
    primaryType: "beaver",
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
    baseText: "I follow a detailed plan rather than trusting my instincts and adapting on the fly.",
    variants: [
      {
        sellType: "product",
        text: "In sales situations, I stick to a detailed script or plan rather than trusting my gut and improvising.",
      },
      {
        sellType: "service",
        text: "In client interactions, I follow a predetermined approach rather than adapting based on feel.",
      },
    ],
    questionType: "spectrum",
    spectrumPair: ["penguin", "beaver"],
    scoring: beaverPenguinScoring,
    primaryType: "beaver",
    salesStage: "presenting",
  },

  {
    id: "q14b",
    baseText: "I build excitement and momentum in conversations rather than focusing on covering all the details.",
    variants: [
      {
        sellType: "product",
        text: "In product discussions, I focus on generating excitement rather than ensuring every specification is covered.",
      },
      {
        sellType: "service",
        text: "In client meetings, I prioritize building enthusiasm rather than methodically reviewing all deliverables.",
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
    baseText: "When I identify a promising lead, I prefer to research them thoroughly before reaching out.",
    variants: [
      {
        sellType: "product",
        text: "When I find a promising prospect, I spend time researching their company before reaching out.",
      },
      {
        sellType: "service",
        text: "When I identify a potential client, I thoroughly research them before making contact.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Beaver (research) + Retriever (thoughtful) | Disagree: Penguin (energy) + Lion (action)
      5: { lion: 0, penguin: 0, retriever: 2, beaver: 4 },
      4: { lion: 0, penguin: 0, retriever: 1, beaver: 2 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 1, penguin: 2, retriever: 0, beaver: 0 },
      1: { lion: 2, penguin: 4, retriever: 0, beaver: 0 },
    },
    primaryType: "beaver",
    salesStage: "prospecting",
  },

  {
    id: "q16",
    baseText: "In discovery meetings, I focus on building deep personal rapport before diving into their pain points.",
    variants: [
      {
        sellType: "product",
        text: "In discovery calls, I prioritize building a personal connection before identifying their core needs.",
      },
      {
        sellType: "service",
        text: "In initial consultations, I establish a personal relationship first before focusing on the problem to solve.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Retriever (relationship) + Penguin (rapport) | Disagree: Lion (results) + Beaver (analytical)
      5: { lion: 0, penguin: 2, retriever: 4, beaver: 0 },
      4: { lion: 0, penguin: 1, retriever: 2, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 2, penguin: 0, retriever: 0, beaver: 1 },
      1: { lion: 4, penguin: 0, retriever: 0, beaver: 2 },
    },
    primaryType: "retriever",
    salesStage: "discovery",
  },

  {
    id: "q17",
    baseText: "The best compliment I could receive after a presentation is 'That was thorough and well-prepared' rather than 'That was compelling and energizing.'",
    variants: [
      {
        sellType: "product",
        text: "After a product demo, I'd rather hear 'That covered everything in detail' than 'That was exciting!'",
      },
      {
        sellType: "service",
        text: "After pitching, I'd rather hear 'That was comprehensive and well-documented' than 'That was inspiring!'",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Beaver (thorough) + Retriever (careful) | Disagree: Penguin (energy) + Lion (compelling)
      5: { lion: 0, penguin: 0, retriever: 2, beaver: 4 },
      4: { lion: 0, penguin: 0, retriever: 1, beaver: 2 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 1, penguin: 2, retriever: 0, beaver: 0 },
      1: { lion: 2, penguin: 4, retriever: 0, beaver: 0 },
    },
    primaryType: "beaver",
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
      // Agree: Lion (challenge) + Beaver (logic) | Disagree: Retriever (understand) + Penguin (empathy)
      5: { lion: 4, penguin: 0, retriever: 0, beaver: 2 },
      4: { lion: 2, penguin: 0, retriever: 0, beaver: 1 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 1, retriever: 2, beaver: 0 },
      1: { lion: 0, penguin: 2, retriever: 4, beaver: 0 },
    },
    primaryType: "lion",
    salesStage: "objections",
  },

  {
    id: "q19",
    baseText: "After closing a big deal, I take time to celebrate with the team and client before thinking about the next opportunity.",
    variants: [
      {
        sellType: "product",
        text: "After a big sale, I celebrate the win with colleagues and the customer before moving to the next deal.",
      },
      {
        sellType: "service",
        text: "After landing a major client, I take time to celebrate with the team before shifting focus to new opportunities.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Penguin (celebrate) + Retriever (team) | Disagree: Lion (next deal) + Beaver (efficient)
      5: { lion: 0, penguin: 4, retriever: 2, beaver: 0 },
      4: { lion: 0, penguin: 2, retriever: 1, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 2, penguin: 0, retriever: 0, beaver: 1 },
      1: { lion: 4, penguin: 0, retriever: 0, beaver: 2 },
    },
    primaryType: "penguin",
    salesStage: "closing",
  },

  {
    id: "q20",
    baseText: "I prefer to dive into client meetings with energy and enthusiasm rather than preparing extensively beforehand.",
    variants: [
      {
        sellType: "product",
        customerType: "b2b",
        text: "With corporate accounts, I bring energy and think on my feet rather than preparing detailed agendas.",
      },
      {
        sellType: "product",
        customerType: "b2c",
        text: "With customers, I rely on my enthusiasm and presence rather than scripted approaches.",
      },
      {
        sellType: "service",
        text: "With clients, I lead with energy and adapt in the moment rather than following a detailed preparation plan.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Lion (action) + Penguin (energy) | Disagree: Beaver (prepare) + Retriever (careful)
      5: { lion: 4, penguin: 2, retriever: 0, beaver: 0 },
      4: { lion: 2, penguin: 1, retriever: 0, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 1, beaver: 2 },
      1: { lion: 0, penguin: 0, retriever: 2, beaver: 4 },
    },
    primaryType: "lion",
    salesStage: "retention",
  },

  {
    id: "q21",
    baseText: "When learning a new product or service to sell, I study all documentation first rather than jumping in to learn by doing.",
    variants: [
      {
        sellType: "product",
        text: "When learning a new product, I study every specification first rather than starting to sell and learning as I go.",
      },
      {
        sellType: "service",
        text: "When learning a new service offering, I master all the details first rather than starting conversations with prospects.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Beaver (study) + Lion (master) | Disagree: Penguin (jump in) + Retriever (learn socially)
      5: { lion: 2, penguin: 0, retriever: 0, beaver: 4 },
      4: { lion: 1, penguin: 0, retriever: 0, beaver: 2 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 2, retriever: 1, beaver: 0 },
      1: { lion: 0, penguin: 4, retriever: 2, beaver: 0 },
    },
    primaryType: "beaver",
    salesStage: "presenting",
  },

  {
    id: "q22",
    baseText: "In team meetings, I ensure everyone's voice is heard before pushing for decisions.",
    variants: [
      {
        sellType: "product",
        text: "In sales team meetings, I make sure everyone shares their perspective before pushing for decisions and next steps.",
      },
      {
        sellType: "service",
        text: "In team discussions, I facilitate input from every team member before driving toward action items.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Retriever (inclusive) + Penguin (voices) | Disagree: Lion (decisive) + Beaver (efficient)
      5: { lion: 0, penguin: 2, retriever: 4, beaver: 0 },
      4: { lion: 0, penguin: 1, retriever: 2, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 2, penguin: 0, retriever: 0, beaver: 1 },
      1: { lion: 4, penguin: 0, retriever: 0, beaver: 2 },
    },
    primaryType: "retriever",
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
      // Agree: Penguin (quick action) + Lion (bold) | Disagree: Beaver (analyze) + Retriever (thoughtful)
      5: { lion: 2, penguin: 4, retriever: 0, beaver: 0 },
      4: { lion: 1, penguin: 2, retriever: 0, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 0, penguin: 0, retriever: 1, beaver: 2 },
      1: { lion: 0, penguin: 0, retriever: 2, beaver: 4 },
    },
    primaryType: "penguin",
    salesStage: "objections",
  },

  {
    id: "q24",
    baseText: "I measure my success more by relationships and reputation built over time rather than revenue and wins this quarter.",
    variants: [
      {
        sellType: "product",
        text: "I judge my performance by customer relationships cultivated rather than by sales numbers this quarter.",
      },
      {
        sellType: "service",
        text: "I measure success by the depth of client relationships I've built rather than by revenue closed.",
      },
    ],
    questionType: "quadrant",
    scoring: {
      // Agree: Retriever (relationships) + Penguin (people) | Disagree: Lion (revenue) + Beaver (metrics)
      5: { lion: 0, penguin: 2, retriever: 4, beaver: 0 },
      4: { lion: 0, penguin: 1, retriever: 2, beaver: 0 },
      3: { lion: 1, penguin: 1, retriever: 1, beaver: 1 },
      2: { lion: 2, penguin: 0, retriever: 0, beaver: 1 },
      1: { lion: 4, penguin: 0, retriever: 0, beaver: 2 },
    },
    primaryType: "retriever",
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
