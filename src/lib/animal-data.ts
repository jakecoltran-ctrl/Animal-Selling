import { AnimalInfo, AnimalType, SalesContext } from "@/types";

export const animals: Record<AnimalType, AnimalInfo> = {
  lion: {
    id: "lion",
    name: "Lion",
    title: "The Closer",
    emoji: "🦁",
    color: "#dc2626",
    bgColor: "bg-lion-100",
    textColor: "text-lion-600",
    tagline: "Drive results. Close deals. Lead from the front.",
    description:
      "Lions are natural closers who thrive on competition and results. They cut through complexity, make quick decisions, and push deals across the finish line. When others hesitate, Lions act. Their directness and confidence command respect in high-stakes negotiations.",
    strengths: [
      "Decisive under pressure — makes quick judgment calls when deals stall",
      "Results-driven — consistently hits or exceeds quota",
      "Direct communicator — gets to the point and respects others' time",
      "Competitive edge — thrives when there's a target to beat",
      "Natural leader — takes charge in team selling situations",
      "Resilient — bounces back from rejection faster than most",
    ],
    blindSpots: [
      "May push too hard and create buyer resistance",
      "Can overlook relationship-building in pursuit of the close",
      "Impatience with slower decision-makers may cost deals",
      "Direct style can feel abrasive to some personalities",
      "May skip discovery steps to rush toward proposal",
      "Risk of burning bridges by prioritizing short-term wins",
    ],
    sellingStyle:
      "Lions sell with urgency and conviction. They excel at executive conversations, handling objections head-on, and creating momentum. Their approach works best with decisive buyers who value efficiency.",
    idealRoles: [
      "Enterprise Account Executive",
      "Sales Team Lead",
      "Business Development (Outbound)",
      "Strategic Account Manager",
      "VP of Sales",
    ],
    tips: [
      "Slow down your discovery process — the extra time builds trust",
      "Practice active listening before presenting solutions",
      "Match the prospect's pace, not your own",
      "Build in cooling-off periods for relationship-focused buyers",
      "Celebrate team wins, not just personal victories",
    ],
    contextualTips: [
      // Product tips
      { context: { sellType: "product" }, tip: "Your directness is an asset in product sales — buyers often appreciate a seller who can help them decide quickly." },
      { context: { sellType: "product", customerType: "b2b" }, tip: "In B2B product sales, your decisiveness wins deals, but remember that procurement teams often need documentation you might want to skip." },
      { context: { sellType: "product", customerType: "b2c" }, tip: "Retail customers respond to your confidence. Just watch for those who need more hand-holding before committing." },
      // Service tips
      { context: { sellType: "service" }, tip: "In service sales, slow down the discovery phase — clients need to feel truly understood before trusting you with ongoing work." },
      { context: { sellType: "service", customerType: "b2b" }, tip: "B2B service buyers are investing in a relationship, not just a deliverable. Your push-to-close style may feel premature if trust isn't established." },
      { context: { sellType: "service", customerType: "b2c" }, tip: "Consumer service buyers often make emotional decisions. Let them feel the relationship before you push for commitment." },
      // Channel tips
      { context: { salesChannel: "inside" }, tip: "In virtual selling, your directness can read as abrupt. Add warmth cues since prospects can't see your full body language." },
      { context: { salesChannel: "outside" }, tip: "Your in-person energy is commanding. Use it to take charge of meetings, but read the room for relationship-first buyers." },
    ],
    sellingToOthers: {
      lion:
        "Be direct and respect their time. Focus on results and competitive advantages. Let them feel in control of the decision.",
      penguin:
        "Show enthusiasm but stay focused. Allow time for their ideas and relationship-building, but keep the conversation on track.",
      retriever:
        "Slow down and build trust first. Avoid high-pressure tactics. Give them time to consult their team before deciding.",
      beaver:
        "Come prepared with data and documentation. Answer their questions thoroughly. Don't rush them past their analysis phase.",
    },
  },
  penguin: {
    id: "penguin",
    name: "Penguin",
    title: "The Connector",
    emoji: "🐧",
    color: "#0891b2",
    bgColor: "bg-penguin-100",
    textColor: "text-penguin-600",
    tagline: "Build relationships. Inspire action. Create momentum.",
    description:
      "Penguins are the social architects of sales. They build networks, energize rooms, and turn cold prospects into warm advocates. Their enthusiasm is contagious, and they excel at creating the emotional connection that drives buying decisions.",
    strengths: [
      "Relationship builder — creates genuine connections that last",
      "Persuasive communicator — inspires others with vision and energy",
      "Networking natural — expands pipelines through referrals",
      "Optimistic presence — keeps deals alive during tough stretches",
      "Creative problem-solver — finds unconventional paths to yes",
      "Team energizer — lifts morale and collaboration",
    ],
    blindSpots: [
      "May over-promise in the heat of enthusiasm",
      "Can struggle with follow-through on administrative details",
      "Optimism may delay recognizing dead deals",
      "Might prioritize being liked over asking hard questions",
      "Can get distracted by new opportunities before closing current ones",
      "May underestimate analytical buyers' need for data",
    ],
    sellingStyle:
      "Penguins sell through connection and enthusiasm. They're masters at creating excitement, building consensus among stakeholders, and making prospects feel valued. Their warmth opens doors that pure logic cannot.",
    idealRoles: [
      "Account Executive (Relationship-driven)",
      "Partner & Channel Sales",
      "Customer Success Manager",
      "Sales Development Representative",
      "Field Sales & Events",
    ],
    tips: [
      "Create systems to track your follow-ups and commitments",
      "Balance enthusiasm with concrete details and timelines",
      "Practice asking uncomfortable qualifying questions",
      "Set clear deal criteria to avoid chasing unlikely opportunities",
      "Prepare data-driven materials for analytical stakeholders",
    ],
    contextualTips: [
      // Product tips
      { context: { sellType: "product" }, tip: "Your storytelling brings products to life. Share customer success stories to make features feel tangible and exciting." },
      { context: { sellType: "product", customerType: "b2b" }, tip: "In B2B product sales, your relationship skills help navigate complex buying committees. Just ensure you bring the specs when technical stakeholders join." },
      { context: { sellType: "product", customerType: "b2c" }, tip: "Consumer buyers love your energy! Your enthusiasm helps them feel excited about their purchase decision." },
      // Service tips
      { context: { sellType: "service" }, tip: "Your relationship skills are gold in service sales where repeat business depends on personal connection." },
      { context: { sellType: "service", customerType: "b2b" }, tip: "B2B service relationships thrive on your warmth. Build the personal connection and referrals will follow naturally." },
      { context: { sellType: "service", customerType: "b2c" }, tip: "Consumers choosing services want to like and trust their provider. Your natural warmth makes this easy." },
      // Channel tips
      { context: { salesChannel: "inside" }, tip: "On video calls, your energy still shines through. Use camera presence and verbal enthusiasm to build connection remotely." },
      { context: { salesChannel: "outside" }, tip: "Your in-person energy is magnetic at events, demos, and face-to-face meetings. Work the room and build your network." },
    ],
    sellingToOthers: {
      lion:
        "Get to the point faster. Focus on outcomes and ROI. They appreciate your energy but need you to respect their time.",
      penguin:
        "Match their energy and let the conversation flow naturally. Build the relationship, but ensure you both stay focused on next steps.",
      retriever:
        "Be genuine and patient. They value your warmth but need consistency over flash. Follow through on every commitment.",
      beaver:
        "Tone down the enthusiasm and bring the data. They need proof, not promises. Be prepared for detailed questions.",
    },
  },
  retriever: {
    id: "retriever",
    name: "Golden Retriever",
    title: "The Trusted Advisor",
    emoji: "🐕",
    color: "#d97706",
    bgColor: "bg-retriever-100",
    textColor: "text-retriever-600",
    tagline: "Earn trust. Deliver value. Build for the long term.",
    description:
      "Golden Retrievers are the trusted advisors of sales. They win through patience, reliability, and genuine care for client success. Their clients stay for years because they know their Retriever will always have their back.",
    strengths: [
      "Trust builder — creates deep, lasting client relationships",
      "Patient listener — truly understands client needs",
      "Consistent performer — reliable quota attainment year over year",
      "Retention champion — keeps churn low through ongoing care",
      "Team player — supports colleagues without seeking spotlight",
      "Calming presence — de-escalates tense situations with clients",
    ],
    blindSpots: [
      "May avoid necessary confrontation or tough conversations",
      "Can be too accommodating to unreasonable client requests",
      "Patience can become passivity when deals need pushing",
      "May struggle to ask for the close directly",
      "Conflict avoidance can let issues fester",
      "Risk of being seen as too soft in competitive situations",
    ],
    sellingStyle:
      "Retrievers sell through service and trust. They excel at consultative selling, customer retention, and building accounts over time. Their approach wins with clients who value partnership over transaction.",
    idealRoles: [
      "Customer Success Manager",
      "Account Manager (Expansion)",
      "Inside Sales (Relationship-based)",
      "Client Services Lead",
      "Renewals Specialist",
    ],
    tips: [
      "Practice assertive communication — it's not rude to be direct",
      "Set boundaries early with demanding clients",
      "Don't wait for the perfect moment to ask for the close",
      "Track your assertiveness wins to build confidence",
      "Remember: saying no to one thing means saying yes to something better",
    ],
    contextualTips: [
      // Product tips
      { context: { sellType: "product" }, tip: "Your consultative approach helps customers choose the right product configuration. Don't rush the recommendation process." },
      { context: { sellType: "product", customerType: "b2b" }, tip: "In B2B product sales, your patience with long procurement cycles is a strength. Stay steady while competitors get frustrated." },
      { context: { sellType: "product", customerType: "b2c" }, tip: "Consumer product buyers appreciate your no-pressure approach. They'll come back and refer others because you didn't push." },
      // Service tips
      { context: { sellType: "service" }, tip: "Service sales play to your strengths — clients want advisors who genuinely care about their success, not just the contract." },
      { context: { sellType: "service", customerType: "b2b" }, tip: "B2B service relationships reward your patience. Multi-year engagements are built on exactly the kind of trust you naturally create." },
      { context: { sellType: "service", customerType: "b2c" }, tip: "Consumer service clients often feel vulnerable asking for help. Your calm, supportive presence puts them at ease." },
      // Channel tips
      { context: { salesChannel: "inside" }, tip: "In virtual selling, your warmth still comes through. Use thoughtful follow-ups and genuine check-ins to build trust remotely." },
      { context: { salesChannel: "outside" }, tip: "Face-to-face, your authentic care is unmistakable. Clients sense that you're genuinely invested in their success." },
    ],
    sellingToOthers: {
      lion:
        "Be more direct than feels comfortable. They respect confidence. Get to the point and propose clear next steps.",
      penguin:
        "Match some of their energy and be open to tangents. Let them talk, but guide back to outcomes when needed.",
      retriever:
        "Take your time and build genuine rapport. They'll sense if you're rushing. Focus on how you'll support them long-term.",
      beaver:
        "Be patient with their questions and never wing it. Provide documented answers and respect their process.",
    },
  },
  beaver: {
    id: "beaver",
    name: "Beaver",
    title: "The Specialist",
    emoji: "🦫",
    color: "#059669",
    bgColor: "bg-beaver-100",
    textColor: "text-beaver-600",
    tagline: "Master the details. Know the product. Win with expertise.",
    description:
      "Beavers are the specialists who win through preparation and expertise. They know their product inside and out, anticipate every objection, and build bulletproof proposals. When the competition is tough, Beavers win with substance.",
    strengths: [
      "Product expert — knows features, use cases, and edge cases",
      "Thorough preparation — never walks in unprepared",
      "Data-driven selling — builds compelling business cases",
      "Quality-focused — proposals are polished and accurate",
      "Process-oriented — follows methodologies consistently",
      "Risk mitigator — anticipates and addresses concerns early",
    ],
    blindSpots: [
      "May over-explain and lose the audience's attention",
      "Analysis paralysis can slow deal velocity",
      "Perfectionism may delay proposals and follow-ups",
      "Can struggle with ambiguity and fast-changing situations",
      "May undervalue emotional factors in buying decisions",
      "Risk of seeming inflexible when clients need creativity",
    ],
    sellingStyle:
      "Beavers sell through expertise and thoroughness. They excel at technical sales, complex procurement processes, and winning business where credibility matters. Their attention to detail builds confidence with risk-averse buyers.",
    idealRoles: [
      "Solutions Engineer / Sales Engineer",
      "Technical Account Manager",
      "Enterprise Sales (Complex deals)",
      "Product Specialist",
      "RFP/Proposal Manager",
    ],
    tips: [
      "Lead with outcomes before diving into details",
      "Practice the executive summary — start with the bottom line",
      "Set time limits for analysis phases to maintain momentum",
      "Build rapport before launching into data",
      "Remember: good enough today beats perfect next week",
    ],
    contextualTips: [
      // Product tips
      { context: { sellType: "product" }, tip: "Your deep product knowledge is a major advantage. Buyers trust sellers who can answer every technical question." },
      { context: { sellType: "product", customerType: "b2b" }, tip: "In B2B product sales, your detailed proposals win RFPs and technical evaluations. Procurement teams appreciate your precision." },
      { context: { sellType: "product", customerType: "b2c" }, tip: "Consumers appreciate expertise, but don't overwhelm them with specs. Lead with benefits, offer details on request." },
      // Service tips
      { context: { sellType: "service" }, tip: "In service sales, your thorough scoping prevents scope creep and sets clear expectations. Clients feel safe with your precision." },
      { context: { sellType: "service", customerType: "b2b" }, tip: "B2B service buyers need confidence in your methodology. Your detailed proposals show you've thought through the engagement." },
      { context: { sellType: "service", customerType: "b2c" }, tip: "Consumer service clients want to know exactly what they're getting. Your clear documentation builds confidence." },
      // Channel tips
      { context: { salesChannel: "inside" }, tip: "Virtual selling plays to your strengths — you can share screens, send detailed materials, and follow up with documentation." },
      { context: { salesChannel: "outside" }, tip: "In-person, bring materials to support your expertise. Leave-behinds and detailed handouts reinforce your credibility." },
    ],
    sellingToOthers: {
      lion:
        "Lead with the punchline, then offer details on request. They want results, not process. Be concise.",
      penguin:
        "Lighten up and connect before presenting data. They need to like you before they trust your numbers.",
      retriever:
        "Show that you've thought through the impact on their team. Be patient and thorough, but warm.",
      beaver:
        "Bring your A-game with documentation. They'll respect your preparation. Be ready for deep-dive questions.",
    },
  },
};

export const animalTypes: AnimalType[] = ["lion", "penguin", "retriever", "beaver"];

export function getAnimal(type: AnimalType): AnimalInfo {
  return animals[type];
}

export function getAllAnimals(): AnimalInfo[] {
  return animalTypes.map((type) => animals[type]);
}

/**
 * Get contextual tips for an animal type based on sales context.
 * Returns tips that match the given context, ordered by specificity.
 */
export function getContextualTips(
  type: AnimalType,
  context: SalesContext
): string[] {
  const animal = animals[type];
  const matchingTips: { tip: string; score: number }[] = [];

  for (const ct of animal.contextualTips) {
    let score = 0;
    let matches = true;

    // Check sellType
    if (ct.context.sellType) {
      if (ct.context.sellType === context.sellType) {
        score += 3; // Most important match
      } else {
        matches = false;
      }
    }

    // Check customerType
    if (ct.context.customerType) {
      if (ct.context.customerType === context.customerType) {
        score += 2;
      } else {
        matches = false;
      }
    }

    // Check salesChannel
    if (ct.context.salesChannel) {
      if (ct.context.salesChannel === context.salesChannel) {
        score += 1;
      } else {
        matches = false;
      }
    }

    if (matches && score > 0) {
      matchingTips.push({ tip: ct.tip, score });
    }
  }

  // Sort by score (most specific first) and return tips
  return matchingTips
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // Return top 3 most relevant tips
    .map((t) => t.tip);
}
