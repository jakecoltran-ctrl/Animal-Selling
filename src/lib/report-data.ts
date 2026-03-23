import {
  AnimalType,
  BlendProfile,
  TypeComparison,
  SellingPlaybook,
  SalesContext,
  GrowthPlanContent,
} from "@/types";

// ============================================
// BUYER IDENTIFICATION SIGNALS
// ============================================

export interface BuyerIdentificationSignals {
  type: AnimalType;
  communicationCues: string[];
  meetingBehavior: string[];
  callBehavior: string[]; // For inside sales - phone/video call behaviors
  emailStyle: string[];
  decisionMaking: string[];
  questionsTheyAsk: string[];
  environmentCues: string[];
  videoCues: string[]; // For inside sales - what you see on video calls
  quickIdentifiers: string[];
}

export const buyerIdentificationSignals: BuyerIdentificationSignals[] = [
  {
    type: "lion",
    communicationCues: [
      "Cuts to the chase - 'What's the bottom line?'",
      "Interrupts your pitch to ask direct questions",
      "Uses competitive language: 'win', 'beat', 'dominate'",
      "Tells you exactly how much time you have",
      "Challenges your claims to test your confidence",
    ],
    meetingBehavior: [
      "Takes control of your sales meeting agenda",
      "Glances at watch or phone during your presentation",
      "Sits in power position, leans forward aggressively",
      "Asks 'So what?' after your feature descriptions",
      "Wants to skip the small talk and get to business",
    ],
    callBehavior: [
      "Interrupts you mid-sentence to get to the point",
      "Multitasking - you can hear typing or clicking",
      "Asks 'How much longer is this going to take?'",
      "Ends calls abruptly when they've heard enough",
      "Schedules short calls - 15 minutes max",
    ],
    emailStyle: [
      "One-line responses or bullet points only",
      "Replies at 6am or 11pm - always working",
      "Ignores emails that don't get to the point",
      "Forwards to subordinates with 'Handle this'",
      "Subject lines like 'Decision needed' or 'Quick question'",
    ],
    decisionMaking: [
      "Can sign off on deals in a single meeting",
      "Trusts their gut over lengthy evaluations",
      "Hates committee decisions and buying processes",
      "Will pay more for faster implementation",
      "Decides based on competitive advantage, not features",
    ],
    questionsTheyAsk: [
      "'What's the ROI and how fast will we see it?'",
      "'Who are your biggest clients?'",
      "'Why should I choose you over [competitor]?'",
      "'What's your best price - no games'",
      "'When can we start?'",
    ],
    environmentCues: [
      "Sales awards, 'President's Club' plaques on wall",
      "Leaderboards or competitive metrics visible",
      "Minimal personal items - all business",
      "Corner office or premium workspace",
      "Books about winning, leadership, or business strategy",
    ],
    videoCues: [
      "Professional, minimal background - no distractions",
      "Camera positioned to show authority (slightly looking down)",
      "Impatient body language - checking watch, looking away",
      "Mutes themselves to take other calls or talk to someone",
      "Virtual background showing corporate branding or achievements",
    ],
    quickIdentifiers: [
      "Rushes your pitch - wants the bottom line",
      "Challenges you to prove your claims",
      "Asks about competitors and market position",
      "Makes quick decisions with confidence",
      "Values their time above all else",
    ],
  },
  {
    type: "penguin",
    communicationCues: [
      "Starts meetings asking about you personally",
      "Gets excited: 'Oh that's amazing!' 'I love that!'",
      "Shares stories about other vendors they like",
      "Name-drops people and companies frequently",
      "Uses 'we' and 'us' - wants partnership, not vendor",
    ],
    meetingBehavior: [
      "Runs over scheduled meeting time chatting",
      "Introduces you to everyone in the office",
      "Gets distracted by tangents and new ideas",
      "Wants to brainstorm possibilities with you",
      "More interested in the vision than the details",
    ],
    callBehavior: [
      "Calls run long - they love to chat and connect",
      "Goes off on tangents about exciting new ideas",
      "You hear them greeting others in the background",
      "Suggests adding more people to the call",
      "High energy voice with lots of enthusiasm",
    ],
    emailStyle: [
      "Enthusiastic with exclamation points!!!",
      "Forwards articles: 'Thought you'd find this interesting'",
      "Long emails with personal anecdotes mixed in",
      "Response time depends on how excited they are",
      "CC's lots of people to share the excitement",
    ],
    decisionMaking: [
      "Buys from people they like and trust",
      "Influenced by who else is using your product",
      "Gets excited fast but may cool off just as fast",
      "Needs to feel special - not just another customer",
      "Makes emotional decisions, justifies with logic later",
    ],
    questionsTheyAsk: [
      "'Who else is using this that I might know?'",
      "'What's your vision for where this is going?'",
      "'Can you tell me a great success story?'",
      "'How will this make our team look?'",
      "'What's the most innovative thing about this?'",
    ],
    environmentCues: [
      "Photos with industry people and at events",
      "Creative, colorful office with personality",
      "Awards for innovation or 'culture' achievements",
      "Swag and memorabilia from conferences",
      "Vision boards or inspirational quotes visible",
    ],
    videoCues: [
      "Fun, creative background - plants, art, personality",
      "Animated facial expressions and hand gestures",
      "Might be in a coffee shop or co-working space",
      "Uses virtual backgrounds with fun or trendy images",
      "Leans in close to camera, very engaged and expressive",
    ],
    quickIdentifiers: [
      "Wants to connect personally before business",
      "Gets visibly excited about possibilities",
      "Asks who else you work with",
      "Talks about relationships and partnerships",
      "High energy, talkative, enthusiastic",
    ],
  },
  {
    type: "retriever",
    communicationCues: [
      "Asks how long you've been with your company",
      "Wants to know about your support and service team",
      "Says 'Let me check with my team' frequently",
      "Uses 'we' language - very team-oriented",
      "Genuinely asks how your day is going and means it",
    ],
    meetingBehavior: [
      "Brings other team members to your meeting",
      "Takes careful notes to share with colleagues",
      "Asks how this will affect their people",
      "Uncomfortable making decisions alone",
      "Wants everyone to have input before moving forward",
    ],
    callBehavior: [
      "Quiet, thoughtful pauses before responding",
      "Asks if they can loop in a colleague",
      "Takes notes and asks you to slow down",
      "Wants to schedule a follow-up with the team",
      "Thanks you sincerely for your time at the end",
    ],
    emailStyle: [
      "Always CC's their team or manager",
      "Polite openers and closings on every email",
      "Asks for references and customer testimonials",
      "Thanks you for your patience and time",
      "Responds reliably but not urgently",
    ],
    decisionMaking: [
      "Needs buy-in from their team before committing",
      "Wants to talk to your existing customers first",
      "Prefers proven, safe solutions over cutting-edge",
      "Takes longer but stays loyal once committed",
      "Risk-averse - worried about what could go wrong",
    ],
    questionsTheyAsk: [
      "'How will this affect our day-to-day team workflow?'",
      "'What does your onboarding and support look like?'",
      "'Can we speak with some of your current customers?'",
      "'How long have your customers been with you?'",
      "'What happens if we have problems after we buy?'",
    ],
    environmentCues: [
      "Team photos and group awards displayed",
      "Family pictures on desk",
      "Thank you cards from colleagues visible",
      "Comfortable, welcoming office setup",
      "'People first' or teamwork-themed décor",
    ],
    videoCues: [
      "Family photos or team pictures visible in background",
      "Warm, genuine smile - makes eye contact through camera",
      "Home office with personal, comfortable touches",
      "May have kids or pets appear in the background",
      "Calm, unhurried demeanor - takes their time",
    ],
    quickIdentifiers: [
      "Asks about your support and service",
      "Wants to involve their team in the decision",
      "Asks for references and case studies",
      "Concerned about implementation impact on people",
      "Warm, patient, genuinely caring demeanor",
    ],
  },
  {
    type: "beaver",
    communicationCues: [
      "Asks very specific technical questions",
      "Pauses to think before responding to you",
      "Requests documentation, specs, and whitepapers",
      "Points out inconsistencies in your materials",
      "Uses precise language: 'Can you clarify exactly...'",
    ],
    meetingBehavior: [
      "Arrives with a list of prepared questions",
      "Takes detailed notes on everything you say",
      "Asks follow-up questions to your answers",
      "Wants to see the product, not just slides",
      "Skeptical of marketing claims - wants proof",
    ],
    callBehavior: [
      "Has a written list of questions ready",
      "Asks you to repeat things so they can note them down",
      "Long pauses while they process information",
      "Requests screen share to see exactly how things work",
      "Asks you to send documentation before the call",
    ],
    emailStyle: [
      "Numbered questions in organized format",
      "Attaches spreadsheets comparing vendors",
      "Requests technical documentation and SLAs",
      "Follows up on every unanswered question",
      "Professional, formal tone throughout",
    ],
    decisionMaking: [
      "Creates detailed comparison matrices",
      "Needs to understand exactly how it works",
      "Takes time - won't be rushed into a decision",
      "Wants pilot programs or trials before committing",
      "Skeptical until you prove your claims with data",
    ],
    questionsTheyAsk: [
      "'Can you send me the technical specifications?'",
      "'What's your uptime SLA and how do you measure it?'",
      "'Walk me through exactly how this process works'",
      "'What security certifications do you have?'",
      "'Can we do a pilot or proof of concept first?'",
    ],
    environmentCues: [
      "Organized desk with filing systems",
      "Technical books and industry publications",
      "Certifications and credentials on the wall",
      "Multiple monitors with spreadsheets open",
      "Process diagrams or flowcharts visible",
    ],
    videoCues: [
      "Clean, organized background - nothing out of place",
      "Multiple monitors visible - checking data while talking",
      "Professional lighting and camera setup",
      "May share screen to show you their analysis",
      "Serious, focused expression - rarely smiles until trust is built",
    ],
    quickIdentifiers: [
      "Asks detailed technical questions",
      "Requests documentation and proof",
      "Skeptical of claims until verified",
      "Takes extensive notes",
      "Methodical, analytical approach to everything",
    ],
  },
];

/**
 * Get identification signals for a specific buyer type
 */
export function getBuyerSignals(type: AnimalType): BuyerIdentificationSignals | undefined {
  return buyerIdentificationSignals.find(s => s.type === type);
}

// ============================================
// BLEND PROFILES (12 Primary-Secondary Combos)
// ============================================

export const blendProfiles: BlendProfile[] = [
  // Lion Primary
  {
    primary: "lion",
    secondary: "penguin",
    title: "The Charismatic Closer",
    description:
      "You combine decisive action with magnetic energy. You drive deals forward with urgency while keeping the room engaged and excited. Your confidence opens doors, and your social finesse keeps them open.",
    howSecondaryModifies: [
      "Your Penguin side softens your directness with warmth",
      "You read the room better than pure Lions, knowing when to push and when to connect",
      "Your enthusiasm makes your urgency feel exciting rather than pressuring",
      "You build rapport quickly, then leverage it to close efficiently",
    ],
    uniqueStrengths: [
      "Commanding presence that energizes rather than intimidates",
      "Ability to create urgency while maintaining likability",
      "Strong networking instincts paired with closing ability",
      "Can rally stakeholders around a decision",
    ],
    watchFor: [
      "May promise more than you can deliver in the heat of the moment",
      "Could rush relationship-building to get to the close",
      "Might dominate conversations when listening would serve better",
    ],
  },
  {
    primary: "lion",
    secondary: "retriever",
    title: "The Driven Partner",
    description:
      "You push hard for results while genuinely caring about client success. Your drive is tempered by loyalty, making you someone who closes deals and keeps accounts long-term.",
    howSecondaryModifies: [
      "Your Retriever side adds patience to your urgency",
      "You build trust while still driving toward decisions",
      "Your reliability softens the intensity of your closing style",
      "You think about the relationship beyond the immediate deal",
    ],
    uniqueStrengths: [
      "Clients trust your recommendations because they sense your genuine care",
      "Strong follow-through on commitments made during the sale",
      "Ability to push when needed while maintaining long-term relationships",
      "Balance of hunter and farmer mentality",
    ],
    watchFor: [
      "May struggle with the tension between closing now and nurturing longer",
      "Could feel internal conflict between driving results and serving clients",
      "Might take rejection more personally than pure Lions",
    ],
  },
  {
    primary: "lion",
    secondary: "beaver",
    title: "The Strategic Closer",
    description:
      "You combine decisive action with thorough preparation. You close with confidence backed by data, making you formidable in complex, high-stakes deals where credibility matters.",
    howSecondaryModifies: [
      "Your Beaver side ensures you come prepared with facts",
      "You back your bold claims with solid evidence",
      "Your proposals are both compelling and bulletproof",
      "You anticipate objections and prepare responses in advance",
    ],
    uniqueStrengths: [
      "Credibility with analytical buyers who respect preparation",
      "Ability to close decisively while satisfying due diligence requirements",
      "Strong performance in RFP and competitive evaluation situations",
      "Command of details that supports your confident assertions",
    ],
    watchFor: [
      "May over-prepare when quick action would serve better",
      "Could get stuck in analysis when the deal needs a push",
      "Might come across as intimidating when combining directness with expertise",
    ],
  },

  // Penguin Primary
  {
    primary: "penguin",
    secondary: "lion",
    title: "The Energetic Driver",
    description:
      "You lead with enthusiasm and back it with action. Your warmth opens relationships, and your Lion edge ensures they move toward commitment. You're the life of the room who also closes business.",
    howSecondaryModifies: [
      "Your Lion side adds decisiveness to your natural warmth",
      "You know when to shift from building rapport to asking for the business",
      "Your social energy has purpose and direction",
      "You can take charge when the situation calls for it",
    ],
    uniqueStrengths: [
      "Natural ability to create excitement and then channel it toward action",
      "Prospects enjoy the process and feel motivated to move forward",
      "Strong at creating momentum in stalled deals",
      "Comfortable asking for the close without losing likability",
    ],
    watchFor: [
      "May push too hard when the relationship needs more nurturing",
      "Could let competitive instincts override relationship-building",
      "Might prioritize winning over what's best for the client",
    ],
  },
  {
    primary: "penguin",
    secondary: "retriever",
    title: "The Relationship Architect",
    description:
      "You build deep, lasting connections through genuine warmth and consistent follow-through. Your enthusiasm creates instant rapport, and your reliability turns prospects into lifelong advocates.",
    howSecondaryModifies: [
      "Your Retriever side ensures you follow through on every promise",
      "Your connections are deep rather than just wide",
      "You remember the personal details that matter",
      "Your enthusiasm is matched by steady presence",
    ],
    uniqueStrengths: [
      "Exceptional at building referral networks",
      "Clients become advocates because they genuinely like and trust you",
      "Strong retention and expansion within existing accounts",
      "Natural at consultative, relationship-based selling",
    ],
    watchFor: [
      "May avoid pushing for the close to preserve the relationship",
      "Could spend too much time nurturing unqualified opportunities",
      "Might struggle with competitive or transactional sales environments",
    ],
  },
  {
    primary: "penguin",
    secondary: "beaver",
    title: "The Credible Connector",
    description:
      "You combine social magnetism with substance. Your warmth makes you approachable, and your preparation makes you credible. You're the person prospects both like and trust with important decisions.",
    howSecondaryModifies: [
      "Your Beaver side adds depth to your natural charm",
      "You bring data and proof to support your enthusiasm",
      "Your presentations are both engaging and thorough",
      "You can pivot from rapport-building to detailed Q&A seamlessly",
    ],
    uniqueStrengths: [
      "Able to connect with both relationship-focused and analytical buyers",
      "Enthusiasm backed by evidence is highly persuasive",
      "Strong at building consensus across diverse stakeholder groups",
      "Presentations that are both compelling and credible",
    ],
    watchFor: [
      "May overwhelm with information when connection is what's needed",
      "Could struggle with the tension between being liked and being thorough",
      "Might prepare too long instead of engaging prospects directly",
    ],
  },

  // Retriever Primary
  {
    primary: "retriever",
    secondary: "lion",
    title: "The Trusted Advocate",
    description:
      "You build deep trust and know when to leverage it for action. Your patience earns loyalty, and your Lion edge ensures you can guide clients to decisions when they're ready.",
    howSecondaryModifies: [
      "Your Lion side gives you the confidence to ask for the business",
      "You can push when you know it's in the client's best interest",
      "Your patience has a purpose - you're working toward a goal",
      "You advocate assertively for solutions you believe in",
    ],
    uniqueStrengths: [
      "Clients trust your recommendations completely",
      "Ability to guide hesitant buyers to confident decisions",
      "Strong at navigating complex internal politics with patience and purpose",
      "Long-term relationships that produce consistent revenue",
    ],
    watchFor: [
      "May hold back your assertive side too long",
      "Could feel conflicted when pushing is necessary",
      "Might revert to pure patience when the deal needs urgency",
    ],
  },
  {
    primary: "retriever",
    secondary: "penguin",
    title: "The Warm Networker",
    description:
      "You combine steady loyalty with social grace. Your genuine care for people makes you beloved by clients, and your Penguin energy helps you expand your network beyond existing relationships.",
    howSecondaryModifies: [
      "Your Penguin side adds energy to your steady presence",
      "You're more comfortable in social settings and networking events",
      "Your warmth has an engaging, outgoing quality",
      "You actively grow relationships rather than just maintaining them",
    ],
    uniqueStrengths: [
      "Exceptional at earning referrals through genuine relationships",
      "Clients feel supported and enjoy working with you",
      "Strong community-building within your account base",
      "Natural at customer success and account expansion",
    ],
    watchFor: [
      "May prioritize being liked over addressing difficult issues",
      "Could avoid necessary confrontations that would help clients",
      "Might spread yourself too thin across too many relationships",
    ],
  },
  {
    primary: "retriever",
    secondary: "beaver",
    title: "The Methodical Partner",
    description:
      "You combine patient relationship-building with thorough expertise. Clients trust you because you genuinely care AND because you know your stuff inside and out.",
    howSecondaryModifies: [
      "Your Beaver side adds expertise to your supportive nature",
      "You provide detailed, well-researched recommendations",
      "Your follow-through includes comprehensive documentation",
      "You guide clients with both heart and head",
    ],
    uniqueStrengths: [
      "Deep trust built on both relationship and competence",
      "Excellent at complex, consultative sales requiring expertise",
      "Strong at implementation and customer success",
      "Clients rely on you for both support and guidance",
    ],
    watchFor: [
      "May over-deliver on service at the expense of new business",
      "Could get lost in details when clients need simple answers",
      "Might avoid conflict even when technical accuracy requires it",
    ],
  },

  // Beaver Primary
  {
    primary: "beaver",
    secondary: "lion",
    title: "The Expert Closer",
    description:
      "You combine deep expertise with decisive action. Your thorough preparation builds credibility, and your Lion edge ensures you can close when the time is right.",
    howSecondaryModifies: [
      "Your Lion side gives you confidence to act on your analysis",
      "You don't just present findings - you drive decisions",
      "Your expertise has momentum and direction",
      "You know when the data is good enough and it's time to move",
    ],
    uniqueStrengths: [
      "Unshakeable credibility paired with closing ability",
      "Dominate technical evaluations and then win the business",
      "Strong at handling analytical objections decisively",
      "Command respect from both technical and business stakeholders",
    ],
    watchFor: [
      "May come across as intimidating or dismissive of less analytical buyers",
      "Could bulldoze through objections instead of addressing underlying concerns",
      "Might win the technical battle but lose the relationship war",
    ],
  },
  {
    primary: "beaver",
    secondary: "penguin",
    title: "The Approachable Expert",
    description:
      "You combine deep knowledge with genuine warmth. Your expertise earns respect, and your Penguin side makes that expertise accessible and engaging.",
    howSecondaryModifies: [
      "Your Penguin side makes technical content engaging",
      "You connect with people before diving into details",
      "Your presentations are both thorough and enjoyable",
      "You translate complex concepts without condescension",
    ],
    uniqueStrengths: [
      "Rare ability to be both credible and likable",
      "Strong at presenting to mixed audiences of technical and non-technical buyers",
      "Build trust through expertise without creating distance",
      "Effective at training, demos, and educational selling",
    ],
    watchFor: [
      "May oversimplify to maintain connection when precision is needed",
      "Could prioritize engagement over accuracy",
      "Might struggle in purely analytical evaluation environments",
    ],
  },
  {
    primary: "beaver",
    secondary: "retriever",
    title: "The Reliable Specialist",
    description:
      "You combine meticulous expertise with steady, supportive presence. Clients trust your recommendations because you clearly know your field and genuinely have their interests at heart.",
    howSecondaryModifies: [
      "Your Retriever side adds warmth to your technical expertise",
      "You focus on what's best for the client, not just what's technically correct",
      "Your thoroughness feels supportive rather than overwhelming",
      "You build long-term relationships based on ongoing value",
    ],
    uniqueStrengths: [
      "Deep trust built on both competence and care",
      "Exceptional at complex implementation and ongoing support",
      "Clients view you as a true partner, not just a vendor",
      "Strong retention through demonstrated expertise and reliability",
    ],
    watchFor: [
      "May over-service existing clients at the expense of new business",
      "Could avoid pushing for decisions to preserve the relationship",
      "Might get stuck in support mode instead of expanding accounts",
    ],
  },
];

// ============================================
// TYPE COMPARISONS (Side-by-Side Analysis)
// ============================================

export const typeComparisons: TypeComparison[] = [
  {
    dimension: "Decision Speed",
    lion: "Fast and decisive - acts on gut instinct",
    penguin: "Quick when excited - can be impulsive",
    retriever: "Deliberate - wants to consider all stakeholders",
    beaver: "Methodical - needs complete information first",
  },
  {
    dimension: "Relationship Focus",
    lion: "Task-first - relationships serve the goal",
    penguin: "People-first - thrives on connection",
    retriever: "Deep bonds - loyalty over breadth",
    beaver: "Respect-based - earned through competence",
  },
  {
    dimension: "Risk Tolerance",
    lion: "Bold - comfortable with uncertainty",
    penguin: "Optimistic - sees opportunity in risk",
    retriever: "Cautious - protects what matters",
    beaver: "Calculated - risk only with data support",
  },
  {
    dimension: "Communication Style",
    lion: "Direct and concise - gets to the point",
    penguin: "Expressive and engaging - tells stories",
    retriever: "Warm and supportive - listens first",
    beaver: "Precise and detailed - thorough explanations",
  },
  {
    dimension: "Closing Approach",
    lion: "Push - creates urgency and asks directly",
    penguin: "Inspire - generates excitement to act",
    retriever: "Guide - helps them reach their own decision",
    beaver: "Prove - builds undeniable case for action",
  },
  {
    dimension: "Under Pressure",
    lion: "Takes charge - becomes more directive",
    penguin: "Rallies support - seeks collaboration",
    retriever: "Stays steady - provides calm presence",
    beaver: "Digs deeper - seeks more information",
  },
];

// ============================================
// SELLING PLAYBOOKS (16 Your Type → Their Type)
// ============================================

export const sellingPlaybooks: SellingPlaybook[] = [
  // Lion selling to...
  {
    yourType: "lion",
    theirType: "lion",
    recognitionSignals: [
      "Speaks in results and outcomes",
      "Wants to get to the bottom line quickly",
      "Challenges your assertions directly",
      "Values their time visibly",
    ],
    approachStrategy:
      "Be direct and respect their time. Lead with results and competitive advantages. Show confidence without being combative.",
    keyMotivators: [
      "Winning against competition",
      "Achieving measurable results",
      "Gaining control and autonomy",
      "Speed to value",
    ],
    avoid: [
      "Getting into a power struggle - two Lions can butt heads",
      "Letting ego clashes derail the conversation",
      "Both trying to dominate - someone needs to listen",
      "Competing instead of collaborating toward the close",
    ],
    closingTechnique:
      "Give them options and let them choose. Frame the decision as putting them in control of the outcome.",
  },
  {
    yourType: "lion",
    theirType: "penguin",
    recognitionSignals: [
      "Enthusiastic and talkative",
      "Shares stories and personal connections",
      "Wants to know about you as a person",
      "Gets excited about possibilities",
    ],
    approachStrategy:
      "Show genuine interest in them before diving into business. Let them talk and express enthusiasm. Match their energy but stay focused.",
    keyMotivators: [
      "Recognition and visibility",
      "Being part of something exciting",
      "Positive impact on their team",
      "Personal connection with you",
    ],
    avoid: [
      "Being too transactional or cold",
      "Cutting off their stories abruptly",
      "Focusing only on data and facts",
      "Rushing past relationship-building",
    ],
    closingTechnique:
      "Paint a picture of success and get them excited about the outcome. Use their enthusiasm to create momentum.",
  },
  {
    yourType: "lion",
    theirType: "retriever",
    recognitionSignals: [
      "Asks about impact on their team",
      "Wants to consult with others before deciding",
      "Speaks softly and listens carefully",
      "Concerned about risk and change management",
    ],
    approachStrategy:
      "Slow down and build trust first. Show that you understand their concerns and won't pressure them. Demonstrate reliability.",
    keyMotivators: [
      "Team harmony and support",
      "Low-risk, proven solutions",
      "Long-term partnership",
      "Genuine care for their success",
    ],
    avoid: [
      "High-pressure tactics",
      "Dismissing their need for consensus",
      "Being impatient with their pace",
      "Focusing only on your agenda",
    ],
    closingTechnique:
      "Provide reassurance and support. Offer to help them present to their team. Give them time while maintaining gentle follow-up.",
  },
  {
    yourType: "lion",
    theirType: "beaver",
    recognitionSignals: [
      "Asks detailed technical questions",
      "Wants documentation and proof",
      "Skeptical of bold claims",
      "Takes notes and follows up precisely",
    ],
    approachStrategy:
      "Come prepared with data, documentation, and proof. Respect their process and answer questions thoroughly. Don't rush them.",
    keyMotivators: [
      "Accuracy and quality",
      "Proven methodology",
      "Detailed understanding",
      "Risk mitigation through preparation",
    ],
    avoid: [
      "Making claims you can't substantiate",
      "Pushing for quick decisions",
      "Being vague or general",
      "Dismissing their questions as overthinking",
    ],
    closingTechnique:
      "Build an airtight case with evidence. Give them a clear process and timeline. Let the data do the convincing.",
  },

  // Penguin selling to...
  {
    yourType: "penguin",
    theirType: "lion",
    recognitionSignals: [
      "Direct and time-conscious",
      "Focused on results and outcomes",
      "May seem impatient with small talk",
      "Asks pointed questions",
    ],
    approachStrategy:
      "Get to the point faster than feels natural. Lead with outcomes and ROI. Show respect for their time and decision-making ability.",
    keyMotivators: [
      "Winning and achieving",
      "Speed and efficiency",
      "Control over outcomes",
      "Competitive advantage",
    ],
    avoid: [
      "Too much personal conversation upfront",
      "Lengthy storytelling",
      "Appearing uncertain or indecisive",
      "Not having answers ready",
    ],
    closingTechnique:
      "Be direct in asking for the business. Present clear options and let them decide. Show confidence in your solution.",
  },
  {
    yourType: "penguin",
    theirType: "penguin",
    recognitionSignals: [
      "High energy and enthusiasm",
      "Loves to brainstorm and explore",
      "Easily distracted by new ideas",
      "Values the relationship",
    ],
    approachStrategy:
      "Match their energy and let the conversation flow naturally. Build genuine connection but keep one eye on moving forward.",
    keyMotivators: [
      "Excitement and novelty",
      "Personal connection",
      "Creative possibilities",
      "Being part of something great",
    ],
    avoid: [
      "Getting so excited together that you forget to close the deal",
      "Too much socializing and not enough business progress",
      "Both getting distracted by new ideas and tangents",
      "Assuming the relationship means the sale - still ask for the business",
    ],
    closingTechnique:
      "Channel the enthusiasm into action. Create urgency through excitement about what's possible. Make moving forward feel fun.",
  },
  {
    yourType: "penguin",
    theirType: "retriever",
    recognitionSignals: [
      "Warm and genuine",
      "Asks about others' experiences",
      "Takes time to build trust",
      "Values consistency over excitement",
    ],
    approachStrategy:
      "Be genuine and patient. Tone down the enthusiasm slightly and focus on steady, reliable support. Build trust over time.",
    keyMotivators: [
      "Security and stability",
      "Trust and reliability",
      "Supporting their team",
      "Long-term partnership",
    ],
    avoid: [
      "Overwhelming with energy",
      "Pushing too fast",
      "Making promises you might not keep",
      "Appearing inconsistent",
    ],
    closingTechnique:
      "Emphasize the relationship and ongoing support. Show that you'll be there for them. Give them time but stay consistently present.",
  },
  {
    yourType: "penguin",
    theirType: "beaver",
    recognitionSignals: [
      "Reserved and analytical",
      "Asks for specifics and data",
      "Skeptical of enthusiasm",
      "Processes information carefully",
    ],
    approachStrategy:
      "Tone down the energy and bring substance. Have data ready and be prepared for detailed questions. Let them set the pace.",
    keyMotivators: [
      "Proof and evidence",
      "Quality and accuracy",
      "Understanding details",
      "Making the right decision",
    ],
    avoid: [
      "Being too enthusiastic or salesy",
      "Making broad generalizations",
      "Avoiding their detailed questions",
      "Rushing past their analysis",
    ],
    closingTechnique:
      "Provide thorough documentation and give them time to review. Follow up with additional information they request. Let evidence build conviction.",
  },

  // Retriever selling to...
  {
    yourType: "retriever",
    theirType: "lion",
    recognitionSignals: [
      "Moves fast and expects others to keep up",
      "Focused on results",
      "May seem impatient",
      "Values confidence and competence",
    ],
    approachStrategy:
      "Be more direct than feels comfortable. Lead with outcomes and be confident in your recommendations. Respect their pace.",
    keyMotivators: [
      "Achieving results",
      "Saving time",
      "Winning",
      "Control and autonomy",
    ],
    avoid: [
      "Being too slow or hesitant",
      "Over-explaining or qualifying",
      "Not having a clear recommendation",
      "Appearing uncertain",
    ],
    closingTechnique:
      "Make a clear, confident recommendation. Propose specific next steps. Be ready to act when they say yes.",
  },
  {
    yourType: "retriever",
    theirType: "penguin",
    recognitionSignals: [
      "Energetic and social",
      "Enjoys conversation and connection",
      "Gets excited easily",
      "May go on tangents",
    ],
    approachStrategy:
      "Match some of their energy and be open to tangents. Let them talk and build connection naturally. Guide gently back to business.",
    keyMotivators: [
      "Being liked and appreciated",
      "Exciting possibilities",
      "Social proof and success stories",
      "Personal connection",
    ],
    avoid: [
      "Being too reserved or quiet",
      "Killing their enthusiasm",
      "Not engaging with their ideas",
      "Being purely transactional",
    ],
    closingTechnique:
      "Build on their excitement and help them see the path forward. Use their energy to create momentum toward a decision.",
  },
  {
    yourType: "retriever",
    theirType: "retriever",
    recognitionSignals: [
      "Warm and genuine",
      "Takes time to build relationship",
      "Considers impact on others",
      "Values trust and reliability",
    ],
    approachStrategy:
      "Take your time and build genuine rapport. They'll sense if you're rushing. Focus on how you'll support them long-term.",
    keyMotivators: [
      "Trust and security",
      "Supporting their team",
      "Long-term partnership",
      "Genuine care",
    ],
    avoid: [
      "Both avoiding the close - someone needs to move things forward",
      "Being so accommodating that neither makes a decision",
      "Endless relationship-building without business progress",
      "Waiting for the other to take the lead - it might have to be you",
    ],
    closingTechnique:
      "Let the relationship lead to the close naturally. When trust is established, gently guide them toward a decision that feels right.",
  },
  {
    yourType: "retriever",
    theirType: "beaver",
    recognitionSignals: [
      "Asks detailed questions",
      "Wants documentation",
      "Analytical and careful",
      "May seem skeptical",
    ],
    approachStrategy:
      "Be patient with their questions and never wing it. Provide documented answers and respect their thorough process.",
    keyMotivators: [
      "Accuracy and quality",
      "Understanding details",
      "Proven approach",
      "Risk mitigation",
    ],
    avoid: [
      "Guessing at answers",
      "Being vague or general",
      "Rushing past their analysis",
      "Taking their skepticism personally",
    ],
    closingTechnique:
      "Provide all requested information thoroughly. Give them space to analyze. Follow up with additional proof points when needed.",
  },

  // Beaver selling to...
  {
    yourType: "beaver",
    theirType: "lion",
    recognitionSignals: [
      "Wants the bottom line immediately",
      "Time-conscious",
      "Results-focused",
      "May seem impatient with details",
    ],
    approachStrategy:
      "Lead with the punchline, then offer details on request. Be concise and confident. Save your deep analysis for when they ask.",
    keyMotivators: [
      "Results and outcomes",
      "Saving time",
      "Winning",
      "Competitive advantage",
    ],
    avoid: [
      "Leading with extensive background",
      "Burying the recommendation in data",
      "Being tentative about your conclusions",
      "Taking too long to get to the point",
    ],
    closingTechnique:
      "Present a clear recommendation with confidence. Have details ready if they ask, but lead with action and outcomes.",
  },
  {
    yourType: "beaver",
    theirType: "penguin",
    recognitionSignals: [
      "Energetic and talkative",
      "May skip over details",
      "Wants to like you as a person",
      "Gets bored with too much data",
    ],
    approachStrategy:
      "Lighten up and connect before presenting data. Make your expertise accessible and engaging. Show personality.",
    keyMotivators: [
      "Excitement and possibility",
      "Personal connection",
      "Recognition",
      "Being part of something great",
    ],
    avoid: [
      "Overwhelming with data upfront",
      "Being too formal or stiff",
      "Skipping relationship-building",
      "Making them feel judged for not knowing details",
    ],
    closingTechnique:
      "Connect the solution to their vision and excitement. Help them see how it enables what they care about. Make it feel good.",
  },
  {
    yourType: "beaver",
    theirType: "retriever",
    recognitionSignals: [
      "Warm and considerate",
      "Asks about impact on team",
      "Takes time to decide",
      "Values trust and reliability",
    ],
    approachStrategy:
      "Show that you've thought through the impact on their team. Be patient and thorough, but warm. Demonstrate care alongside competence.",
    keyMotivators: [
      "Team success",
      "Security and support",
      "Long-term relationship",
      "Trustworthy partnership",
    ],
    avoid: [
      "Being cold or purely analytical",
      "Ignoring relationship dynamics",
      "Pushing for quick decisions",
      "Making them feel pressured",
    ],
    closingTechnique:
      "Show how the solution supports their team and reduces risk. Offer ongoing support and build confidence through reliability.",
  },
  {
    yourType: "beaver",
    theirType: "beaver",
    recognitionSignals: [
      "Asks detailed questions",
      "Values thorough preparation",
      "Analytical and careful",
      "Respects expertise",
    ],
    approachStrategy:
      "Bring your A-game with documentation and preparation. Be ready for deep-dive questions. Respect their analytical process.",
    keyMotivators: [
      "Accuracy and quality",
      "Thorough understanding",
      "Proven methodology",
      "Making the right decision",
    ],
    avoid: [
      "Analysis paralysis - you both might over-research forever",
      "Getting lost in details together without reaching a decision",
      "Neither of you pushing toward action - someone has to",
      "Bonding over thoroughness while the deal stalls out",
    ],
    closingTechnique:
      "Let the quality of your preparation speak for itself. Provide a clear process for moving forward with all details documented.",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get blend profile for a primary-secondary combination
 */
export function getBlendProfile(
  primary: AnimalType,
  secondary: AnimalType
): BlendProfile | undefined {
  return blendProfiles.find(
    (b) => b.primary === primary && b.secondary === secondary
  );
}

/**
 * Get selling playbook for your type selling to another type
 */
export function getSellingPlaybook(
  yourType: AnimalType,
  theirType: AnimalType
): SellingPlaybook | undefined {
  return sellingPlaybooks.find(
    (p) => p.yourType === yourType && p.theirType === theirType
  );
}

/**
 * Get growth plan based on weakest score
 */
export function getGrowthPlan(
  scores: Record<AnimalType, number>,
  primaryType: AnimalType
): GrowthPlanContent {
  // Find weakest area (lowest score, excluding primary)
  const sortedScores = Object.entries(scores)
    .filter(([type]) => type !== primaryType)
    .sort(([, a], [, b]) => a - b);

  const weakestArea = sortedScores[0][0] as AnimalType;

  const growthPlans: Record<AnimalType, GrowthPlanContent> = {
    lion: {
      targetArea: "lion",
      diagnosis:
        "Your directness and decisiveness scores are lower, which may mean you're leaving deals on the table by not pushing when appropriate.",
      actionSteps: [
        "Practice asking for the business directly at the end of each call",
        "Set personal deadlines for deals and communicate them to prospects",
        "When you feel hesitation, ask yourself: what would a more decisive seller do?",
        "Role-play objection handling until responses feel natural and confident",
      ],
      quickWins: [
        "End your next three calls with a clear ask for commitment",
        "Create a personal rule: never leave a meeting without a scheduled next step",
        "Practice saying 'What would it take to move forward today?' until it's comfortable",
      ],
    },
    penguin: {
      targetArea: "penguin",
      diagnosis:
        "Your relationship-building and enthusiasm scores are lower, which may mean you're missing connection opportunities that could accelerate trust.",
      actionSteps: [
        "Spend the first 5 minutes of calls on genuine rapport-building",
        "Research prospects personally before calls - find common ground",
        "Share relevant stories and examples, not just facts",
        "Express genuine enthusiasm when you believe in a solution",
      ],
      quickWins: [
        "Ask one personal question at the start of your next five calls",
        "Find and mention something specific you have in common with each prospect",
        "Practice telling your product story in a way that includes emotion, not just features",
      ],
    },
    retriever: {
      targetArea: "retriever",
      diagnosis:
        "Your trust-building and patience scores are lower, which may mean you're not giving prospects the consistency and support they need to feel comfortable.",
      actionSteps: [
        "Slow down your follow-up cadence and focus on being helpful, not just closing",
        "Always do what you say you'll do, exactly when you say you'll do it",
        "Check in on prospects without an agenda - show you care about their success",
        "Take detailed notes and reference past conversations to show you listen",
      ],
      quickWins: [
        "Send a helpful article or resource to three prospects with no ask attached",
        "Follow up on something personal a prospect mentioned last call",
        "Create a follow-through checklist and hit 100% on your next five commitments",
      ],
    },
    beaver: {
      targetArea: "beaver",
      diagnosis:
        "Your preparation and detail scores are lower, which may mean analytical buyers don't see you as credible enough to trust with important decisions.",
      actionSteps: [
        "Create detailed preparation notes for every call with company research",
        "Build a library of proof points, case studies, and data you can reference",
        "When you don't know an answer, write it down and follow up with documentation",
        "Practice walking through detailed ROI calculations confidently",
      ],
      quickWins: [
        "Prepare twice as long for your next important call as you normally would",
        "Create a one-page proof point sheet you can reference on calls",
        "Follow up on your next call with a detailed summary email within one hour",
      ],
    },
  };

  return growthPlans[weakestArea];
}

// ============================================
// CONTEXT-SPECIFIC DATA
// ============================================

interface ContextualContent {
  behaviors: string[];
  blindSpots: string[];
  superpowers: string[];
  tips: string[];
}

type ContextKey = `${AnimalType}_${"product" | "service"}_${"b2b" | "b2c"}_${"inside" | "outside"}`;

// Full context-specific content for all 32 combinations (4 animals × 2 sellType × 2 customerType × 2 channel)
const contextualContentMap: Record<string, Partial<ContextualContent>> = {
  // ========== LION CONTEXTS ==========
  // Lion + Product + B2B + Inside
  "lion_product_b2b_inside": {
    behaviors: [
      "Drives virtual demos with clear agendas and time boundaries",
      "Uses screen sharing to control the narrative and highlight key features",
      "Pushes for quick pilot programs to prove value fast",
      "Leverages data and dashboards to show competitive positioning",
      "Books next meetings before ending calls to maintain momentum",
    ],
    blindSpots: [
      "May rush through product details that technical buyers need",
      "Could seem pushy on video calls where rapport is harder to build",
      "Might underestimate the complexity of B2B procurement timelines",
      "May not allocate enough time for consensus-building among stakeholders",
    ],
    superpowers: [
      "Efficiently qualifies opportunities through direct questioning",
      "Maintains high call volume while driving deals forward",
      "Creates urgency that shortens typically long B2B cycles",
      "Quickly identifies and engages economic buyers",
    ],
    tips: [
      "Send a 3-bullet email before each call outlining what you'll cover",
      "After demos, send a clear decision timeline with specific dates",
      "Use mutual action plans to keep complex B2B deals on track",
    ],
  },
  // Lion + Product + B2B + Outside
  "lion_product_b2b_outside": {
    behaviors: [
      "Commands on-site meetings with executive presence",
      "Uses in-person product demonstrations to create impact",
      "Negotiates directly with decision-makers face-to-face",
      "Builds urgency through competitive intel gathered in the field",
      "Closes deals on-site when possible to capitalize on momentum",
    ],
    blindSpots: [
      "May bypass technical gatekeepers who influence decisions",
      "Could overlook relationship dynamics visible only in person",
      "Might push too hard in cultures that value consensus",
      "May underestimate travel time needed for proper preparation",
    ],
    superpowers: [
      "Commanding physical presence that instills confidence",
      "Ability to read the room and adjust approach in real-time",
      "Creates memorable impressions that differentiate from competitors",
      "Closes significant deals through face-to-face negotiation",
    ],
    tips: [
      "Arrive early to observe office culture and adjust your approach",
      "Bring physical leave-behinds that reinforce your value proposition",
      "Request facility tours to uncover additional needs and stakeholders",
    ],
  },
  // Lion + Product + B2C + Inside
  "lion_product_b2c_inside": {
    behaviors: [
      "Quickly qualifies consumer budget and timeline",
      "Creates urgency with limited-time offers and scarcity",
      "Handles price objections with confident value positioning",
      "Drives high transaction volume through efficient call handling",
      "Uses social proof and reviews to accelerate decisions",
    ],
    blindSpots: [
      "May come across as aggressive to relationship-oriented consumers",
      "Could miss emotional buying triggers by focusing on features",
      "Might not build enough trust for high-consideration purchases",
      "May struggle with consumers who need time to decide",
    ],
    superpowers: [
      "High conversion rate on inbound leads",
      "Ability to handle objections and close quickly",
      "Creates excitement that drives impulse decisions",
      "Maintains energy through high-volume call days",
    ],
    tips: [
      "Open with a benefit statement that grabs attention immediately",
      "Use assumptive language: 'When would you like this delivered?'",
      "Have a same-day incentive ready for hesitant buyers",
    ],
  },
  // Lion + Product + B2C + Outside
  "lion_product_b2c_outside": {
    behaviors: [
      "Takes control of in-home or in-store presentations",
      "Creates urgency through one-call-close techniques",
      "Demonstrates products with confidence and showmanship",
      "Handles spousal or family objections directly",
      "Negotiates on the spot to close before leaving",
    ],
    blindSpots: [
      "May pressure consumers in ways that create buyer's remorse",
      "Could miss buying signals while driving toward the close",
      "Might alienate family members who feel steamrolled",
      "May not build enough trust for referral generation",
    ],
    superpowers: [
      "High closing rate on in-person appointments",
      "Confidence that reassures uncertain buyers",
      "Ability to handle objections from multiple family members",
      "Creates memorable presentations that stand out",
    ],
    tips: [
      "Involve all decision-makers from the start of your presentation",
      "Use physical product interaction to create ownership feelings",
      "Offer a 'today only' incentive that's genuinely valuable",
    ],
  },
  // Lion + Service + B2B + Inside
  "lion_service_b2b_inside": {
    behaviors: [
      "Positions service engagements as strategic investments with clear ROI",
      "Drives virtual consultations with clear outcomes and next steps",
      "Creates proposals that emphasize results and deliverables over process",
      "Pushes for pilot engagements to prove value quickly",
      "Uses case studies with measurable outcomes to build credibility",
    ],
    blindSpots: [
      "May oversimplify complex service delivery to close faster",
      "Could overpromise on timelines or outcomes under pressure",
      "Might not address client concerns about ongoing support",
      "May underestimate the importance of relationship in service sales",
    ],
    superpowers: [
      "Quickly identifies and engages executive sponsors",
      "Creates urgency around business problems that need solving",
      "Positions services as competitive necessities",
      "Negotiates scope and pricing with confidence",
    ],
    tips: [
      "Lead with business outcomes, not service descriptions",
      "Create a 'cost of inaction' analysis to drive urgency",
      "Propose phased engagements with clear success milestones",
    ],
  },
  // Lion + Service + B2B + Outside
  "lion_service_b2b_outside": {
    behaviors: [
      "Commands executive meetings with strategic presence",
      "Uses on-site discovery to uncover urgent business needs",
      "Presents solutions directly to C-suite decision-makers",
      "Negotiates large service contracts face-to-face",
      "Creates urgency through competitive and market insights",
    ],
    blindSpots: [
      "May bypass operational stakeholders who must execute",
      "Could underestimate cultural factors affecting service adoption",
      "Might close deals that aren't well-scoped for delivery",
      "May not allocate time for the relationship-building services require",
    ],
    superpowers: [
      "Opens doors at the executive level through confident outreach",
      "Positions services as critical strategic initiatives",
      "Negotiates premium pricing based on value, not hours",
      "Creates momentum that accelerates long service sales cycles",
    ],
    tips: [
      "Request executive sponsorship meetings early in the process",
      "Bring delivery team members to build credibility and trust",
      "Use on-site workshops to create collaborative momentum",
    ],
  },
  // Lion + Service + B2C + Inside
  "lion_service_b2c_inside": {
    behaviors: [
      "Qualifies consumer urgency and budget quickly",
      "Creates urgency around problems that need solving now",
      "Handles price objections with value-based responses",
      "Drives consultations toward same-day commitment",
      "Uses testimonials and before/after stories to motivate",
    ],
    blindSpots: [
      "May push consumers who need time to trust a service provider",
      "Could oversimplify service offerings to close faster",
      "Might not build the trust needed for high-touch services",
      "May struggle with consumers comparing multiple providers",
    ],
    superpowers: [
      "Converts inquiries to consultations efficiently",
      "Creates urgency that drives faster decisions",
      "Handles objections about service value confidently",
      "Maintains energy through high consultation volumes",
    ],
    tips: [
      "Open by acknowledging the problem they called to solve",
      "Use 'limited availability' honestly to create urgency",
      "Offer a clear guarantee to reduce perceived risk",
    ],
  },
  // Lion + Service + B2C + Outside
  "lion_service_b2c_outside": {
    behaviors: [
      "Commands in-home consultations with professional presence",
      "Demonstrates service value through confident presentations",
      "Handles household objections directly and persuasively",
      "Closes service agreements on the spot when possible",
      "Uses visual aids and testimonials to build credibility",
    ],
    blindSpots: [
      "May pressure consumers in their own homes inappropriately",
      "Could miss trust signals that are crucial for service buying",
      "Might not connect with the emotional side of service decisions",
      "May struggle when consumers want to 'think about it'",
    ],
    superpowers: [
      "High conversion rate on in-home consultations",
      "Confident presence that reassures uncertain buyers",
      "Ability to overcome objections from multiple household members",
      "Creates urgency that drives same-visit decisions",
    ],
    tips: [
      "Involve all household decision-makers from the start",
      "Use before/after visuals to demonstrate service value",
      "Offer a meaningful same-day decision incentive",
    ],
  },

  // ========== PENGUIN CONTEXTS ==========
  // Penguin + Product + B2B + Inside
  "penguin_product_b2b_inside": {
    behaviors: [
      "Builds rapport quickly through genuine curiosity about their business",
      "Creates excitement in demos by focusing on possibilities, not just features",
      "Develops champions across departments through relationship-building",
      "Uses storytelling to make product value memorable",
      "Leverages LinkedIn and social selling to expand connections",
    ],
    blindSpots: [
      "May spend too much time on rapport at the expense of qualification",
      "Could struggle to drive urgency in long B2B cycles",
      "Might over-promise to maintain the positive relationship",
      "May lose track of multiple stakeholders in complex deals",
    ],
    superpowers: [
      "Creates internal champions who sell on your behalf",
      "Builds excitement that spreads through organizations",
      "Maintains relationships through long B2B cycles",
      "Turns customers into enthusiastic references",
    ],
    tips: [
      "Use the first 5 minutes to connect, then transition to business",
      "Create a 'champion briefing' document they can share internally",
      "Schedule regular check-ins to maintain momentum through long cycles",
    ],
  },
  // Penguin + Product + B2B + Outside
  "penguin_product_b2b_outside": {
    behaviors: [
      "Lights up rooms at client sites with infectious enthusiasm",
      "Builds relationships across all levels of the organization",
      "Uses meals and events to deepen connections with stakeholders",
      "Creates memorable product presentations that stand out",
      "Networks at industry events to generate referrals",
    ],
    blindSpots: [
      "May prioritize relationships over moving deals forward",
      "Could be perceived as 'all show, no substance' by analytical buyers",
      "Might struggle with the isolation of field sales travel",
      "May overspend on relationship-building activities",
    ],
    superpowers: [
      "Exceptional at building face-to-face relationships that last",
      "Creates excitement that differentiates from competitors",
      "Builds networks that generate consistent referrals",
      "Memorable presence that keeps you top of mind",
    ],
    tips: [
      "Plan relationship-building activities with business outcomes in mind",
      "Prepare key technical talking points for analytical stakeholders",
      "Use travel time for thoughtful follow-up and preparation",
    ],
  },
  // Penguin + Product + B2C + Inside
  "penguin_product_b2c_inside": {
    behaviors: [
      "Creates instant connection with consumers through warmth and energy",
      "Generates excitement about product possibilities and lifestyle fit",
      "Uses stories and testimonials to create emotional resonance",
      "Builds rapport that leads to referrals and repeat business",
      "Makes purchasing feel fun and exciting rather than transactional",
    ],
    blindSpots: [
      "May struggle to close when the conversation is going well",
      "Could spend too much time on calls that won't convert",
      "Might take rejection personally and lose momentum",
      "May not effectively qualify buyer readiness upfront",
    ],
    superpowers: [
      "Creates positive experiences that generate word-of-mouth",
      "Builds emotional connections that overcome price objections",
      "Turns one-time buyers into loyal repeat customers",
      "Maintains enthusiasm through high-volume call days",
    ],
    tips: [
      "Set a friendly time check at 10 minutes to stay on track",
      "Use enthusiasm to transition to commitment: 'This is perfect for you!'",
      "Ask for referrals while the positive energy is high",
    ],
  },
  // Penguin + Product + B2C + Outside
  "penguin_product_b2c_outside": {
    behaviors: [
      "Creates warm, welcoming atmosphere in consumer settings",
      "Demonstrates products with enthusiasm and showmanship",
      "Builds connections that extend to the whole family",
      "Uses social proof and community testimonials effectively",
      "Turns customers into advocates through memorable experiences",
    ],
    blindSpots: [
      "May struggle to ask for the sale after building rapport",
      "Could get sidetracked by enjoyable conversations",
      "Might not effectively handle analytical family members",
      "May struggle with consumers who want quick transactions",
    ],
    superpowers: [
      "Creates experiences that customers tell their friends about",
      "Builds trust quickly through genuine warmth",
      "Generates referrals naturally through positive relationships",
      "Makes the buying process enjoyable and memorable",
    ],
    tips: [
      "Share your genuine enthusiasm for why you love the product",
      "Involve the whole family to build multiple advocates",
      "Close by painting a picture of them enjoying the product",
    ],
  },
  // Penguin + Service + B2B + Inside
  "penguin_service_b2b_inside": {
    behaviors: [
      "Builds trust for service relationships through genuine connection",
      "Creates excitement about partnership possibilities",
      "Develops multiple champions within client organizations",
      "Uses storytelling to make service outcomes tangible",
      "Maintains relationships that lead to contract renewals and expansions",
    ],
    blindSpots: [
      "May oversell service capabilities to maintain enthusiasm",
      "Could struggle to discuss difficult contract terms",
      "Might avoid addressing service delivery concerns directly",
      "May lose focus on business outcomes in favor of relationship",
    ],
    superpowers: [
      "Builds service relationships that feel like partnerships",
      "Creates internal advocates who protect and expand contracts",
      "Maintains client enthusiasm through challenging projects",
      "Generates referrals through genuine relationship networks",
    ],
    tips: [
      "Connect emotionally first, then transition to business outcomes",
      "Use client success stories to paint vivid pictures of results",
      "Schedule regular 'relationship check-ins' separate from project updates",
    ],
  },
  // Penguin + Service + B2B + Outside
  "penguin_service_b2b_outside": {
    behaviors: [
      "Creates memorable impressions at client sites",
      "Builds relationships with stakeholders at all levels on-site",
      "Uses workshops and events to create collaborative energy",
      "Networks across industries to generate service referrals",
      "Brings energy to on-site delivery that clients remember",
    ],
    blindSpots: [
      "May prioritize being liked over delivering tough feedback",
      "Could overpromise service outcomes to maintain relationships",
      "Might struggle with the detail work of service scoping",
      "May not address underperformance concerns proactively",
    ],
    superpowers: [
      "Creates client relationships that transcend individual projects",
      "Builds executive relationships through charismatic presence",
      "Generates referrals through extensive professional networks",
      "Maintains client enthusiasm through long service engagements",
    ],
    tips: [
      "Bring delivery team members to share credit and build trust",
      "Use on-site time for relationship-building with executives",
      "Document relationship insights for account planning",
    ],
  },
  // Penguin + Service + B2C + Inside
  "penguin_service_b2c_inside": {
    behaviors: [
      "Creates warm, trust-building consultations over phone/video",
      "Generates excitement about how services will improve their life",
      "Uses testimonials and stories to build emotional connection",
      "Builds relationships that generate referrals and reviews",
      "Makes service discussions feel personal and caring",
    ],
    blindSpots: [
      "May struggle to qualify budget and readiness directly",
      "Could spend too much time on calls that won't convert",
      "Might overpromise to keep the positive energy going",
      "May take cancellations or complaints personally",
    ],
    superpowers: [
      "Creates trust quickly essential for service purchases",
      "Builds emotional connections that overcome price objections",
      "Generates positive reviews and referrals naturally",
      "Maintains enthusiasm that's essential for service sales",
    ],
    tips: [
      "Share your genuine passion for helping people",
      "Use before/after stories that create emotional resonance",
      "Ask for referrals right after creating a positive connection",
    ],
  },
  // Penguin + Service + B2C + Outside
  "penguin_service_b2c_outside": {
    behaviors: [
      "Creates warm, welcoming presence in consumer homes",
      "Builds trust essential for in-home service purchases",
      "Connects with families through genuine interest and care",
      "Generates referrals through memorable positive experiences",
      "Makes service consultations feel like friendly visits",
    ],
    blindSpots: [
      "May struggle to ask for commitment after building rapport",
      "Could have difficulty with consumers who want quick quotes",
      "Might overpromise on service delivery to please people",
      "May not effectively handle skeptical family members",
    ],
    superpowers: [
      "Creates trust in sensitive in-home situations",
      "Builds relationships that extend to neighbors and friends",
      "Generates referral networks through community connections",
      "Makes consumers feel cared for, not sold to",
    ],
    tips: [
      "Find genuine common ground within the first minutes",
      "Use community testimonials from their area if available",
      "Close by expressing how much you'd enjoy working with them",
    ],
  },

  // ========== RETRIEVER CONTEXTS ==========
  // Retriever + Product + B2B + Inside
  "retriever_product_b2b_inside": {
    behaviors: [
      "Takes time to understand each stakeholder's individual needs",
      "Builds trust through consistent, reliable follow-through",
      "Supports prospects through complex B2B evaluation processes",
      "Creates detailed notes to remember personal details and preferences",
      "Focuses on long-term partnership potential, not just the initial sale",
    ],
    blindSpots: [
      "May not create enough urgency to move deals forward",
      "Could spend too much time with unqualified opportunities",
      "Might avoid pushing back when prospects go dark",
      "May struggle to navigate competitive situations assertively",
    ],
    superpowers: [
      "Builds deep trust that survives long B2B cycles",
      "Creates advocates who champion your product internally",
      "Maintains relationships that lead to renewals and expansions",
      "Supports complex implementations that drive customer success",
    ],
    tips: [
      "Set clear next steps at the end of every interaction",
      "Use CRM reminders to follow up consistently without being pushy",
      "Create a 'concern resolution' document to address objections systematically",
    ],
  },
  // Retriever + Product + B2B + Outside
  "retriever_product_b2b_outside": {
    behaviors: [
      "Builds deep relationships through regular in-person presence",
      "Becomes a trusted advisor that clients rely on beyond the product",
      "Supports clients through implementation and adoption challenges",
      "Creates account plans focused on long-term partnership",
      "Develops relationships across all levels of client organizations",
    ],
    blindSpots: [
      "May become so focused on existing clients that new business suffers",
      "Could struggle to close new logos without established trust",
      "Might avoid difficult conversations about expansions or changes",
      "May not leverage competitive situations effectively",
    ],
    superpowers: [
      "Creates 'for life' client relationships that competitors can't break",
      "Builds trust that leads to sole-source purchasing decisions",
      "Develops multi-level relationships that protect accounts",
      "Supports clients in ways that generate genuine referrals",
    ],
    tips: [
      "Allocate specific time for new business development separately",
      "Use your strong client relationships for warm introductions",
      "Create 'trusted advisor' touchpoints beyond just sales conversations",
    ],
  },
  // Retriever + Product + B2C + Inside
  "retriever_product_b2c_inside": {
    behaviors: [
      "Takes time to understand each consumer's unique situation",
      "Builds trust through patient, helpful conversations",
      "Supports consumers through their decision-making process",
      "Creates follow-up systems to stay connected without being pushy",
      "Focuses on finding the right solution, not just making the sale",
    ],
    blindSpots: [
      "May struggle with high-velocity transactional sales",
      "Could spend too much time with browsers who won't buy",
      "Might not create enough urgency for impulse-driven products",
      "May take too long to qualify buyer readiness",
    ],
    superpowers: [
      "Builds trust that overcomes hesitation in major purchases",
      "Creates customers who become long-term repeat buyers",
      "Generates referrals through genuine helpfulness",
      "Reduces buyer's remorse through careful needs matching",
    ],
    tips: [
      "Use a friendly qualifying question early: 'What's prompting your call today?'",
      "Set a helpful time frame: 'Let me help you figure this out in the next 15 minutes'",
      "Create a follow-up email template that's helpful, not salesy",
    ],
  },
  // Retriever + Product + B2C + Outside
  "retriever_product_b2c_outside": {
    behaviors: [
      "Creates comfortable, low-pressure in-home or in-store experiences",
      "Takes time to understand household needs and dynamics",
      "Builds trust with all family members through patient listening",
      "Focuses on finding the right fit rather than pushing a sale",
      "Creates relationships that generate repeat business and referrals",
    ],
    blindSpots: [
      "May struggle with one-call-close sales models",
      "Could be too passive when commitment is needed",
      "Might not effectively handle dominant family members",
      "May leave appointments without clear next steps",
    ],
    superpowers: [
      "Creates trust in high-consideration consumer purchases",
      "Builds relationships that include the whole family",
      "Reduces buyer's remorse through careful needs matching",
      "Generates organic referrals through genuine care",
    ],
    tips: [
      "Set expectations upfront: 'By the end of today, I want you to feel confident'",
      "Use your trustworthiness to ask for the business when it's right",
      "Leave something helpful whether they buy or not—it generates referrals",
    ],
  },
  // Retriever + Service + B2B + Inside
  "retriever_service_b2b_inside": {
    behaviors: [
      "Builds trust essential for service relationships through consistent presence",
      "Takes time to understand client needs before proposing solutions",
      "Supports clients through complex service evaluation processes",
      "Creates detailed documentation of client preferences and history",
      "Focuses on partnership fit, not just winning the contract",
    ],
    blindSpots: [
      "May not push hard enough to advance service opportunities",
      "Could struggle to expand scope with existing clients",
      "Might avoid difficult pricing or terms conversations",
      "May invest too much time in opportunities that won't close",
    ],
    superpowers: [
      "Builds service relationships that become true partnerships",
      "Creates trust that leads to sole-source contracting",
      "Maintains client relationships through service challenges",
      "Generates referrals through genuine client success focus",
    ],
    tips: [
      "Create a structured discovery process to understand needs thoroughly",
      "Use mutual success criteria to align on expected outcomes",
      "Build in regular relationship check-ins beyond project status updates",
    ],
  },
  // Retriever + Service + B2B + Outside
  "retriever_service_b2b_outside": {
    behaviors: [
      "Develops deep partnerships through regular on-site presence",
      "Becomes embedded in client organizations as a trusted advisor",
      "Supports clients through service delivery and beyond",
      "Creates multi-level relationships that protect accounts",
      "Focuses on client success above contract expansion",
    ],
    blindSpots: [
      "May become too focused on existing clients to develop new business",
      "Could struggle to address underperformance or scope issues",
      "Might not leverage success for references and case studies",
      "May avoid difficult conversations about service changes",
    ],
    superpowers: [
      "Creates 'for life' service partnerships that competitors can't break",
      "Builds executive relationships based on genuine trust",
      "Supports clients in ways that create lasting loyalty",
      "Develops reference clients who actively advocate",
    ],
    tips: [
      "Balance client service time with dedicated new business development",
      "Use strong relationships to ask for introductions and referrals",
      "Document client success stories to leverage in new pursuits",
    ],
  },
  // Retriever + Service + B2C + Inside
  "retriever_service_b2c_inside": {
    behaviors: [
      "Creates safe, trust-building conversations for nervous consumers",
      "Takes time to understand personal situations before recommending",
      "Supports consumers through emotional service decisions",
      "Follows up consistently without being pushy",
      "Focuses on finding the right service fit, not just making sales",
    ],
    blindSpots: [
      "May struggle with consumers who want quick decisions",
      "Could spend too much time on calls that won't convert",
      "Might not create enough urgency for time-sensitive services",
      "May take cancellations or complaints too personally",
    ],
    superpowers: [
      "Creates trust essential for personal service decisions",
      "Builds relationships that generate repeat business and referrals",
      "Reduces cancellations through careful expectation setting",
      "Supports consumers through anxiety about service purchases",
    ],
    tips: [
      "Acknowledge the difficulty of service decisions: 'This is important, take your time'",
      "Use gentle urgency: 'I want to make sure you get the help you need'",
      "Create a helpful follow-up sequence for those not ready to commit",
    ],
  },
  // Retriever + Service + B2C + Outside
  "retriever_service_b2c_outside": {
    behaviors: [
      "Creates comfortable, trust-building atmosphere in consumer homes",
      "Takes time to understand household situations and concerns",
      "Builds trust with all family members through patient listening",
      "Focuses on service fit rather than pushing for commitment",
      "Creates relationships that extend to neighbors and community",
    ],
    blindSpots: [
      "May struggle with same-visit closing requirements",
      "Could be too passive when dealing with pushy household members",
      "Might not effectively create urgency for needed services",
      "May leave without clear commitment or next steps",
    ],
    superpowers: [
      "Creates trust essential for in-home service purchases",
      "Builds relationships with entire households and communities",
      "Reduces cancellations through careful needs matching",
      "Generates referral networks through genuine community connections",
    ],
    tips: [
      "Set gentle expectations: 'My goal is for you to feel confident in your decision'",
      "Address the whole household to build multiple advocates",
      "Offer to be a resource whether they choose you or not—it generates referrals",
    ],
  },

  // ========== BEAVER CONTEXTS ==========
  // Beaver + Product + B2B + Inside
  "beaver_product_b2b_inside": {
    behaviors: [
      "Prepares detailed research on each prospect's business before calls",
      "Creates comprehensive demos that address technical requirements",
      "Provides thorough documentation and proof points",
      "Answers technical questions with precision and depth",
      "Builds credibility through demonstrated expertise on video calls",
    ],
    blindSpots: [
      "May overwhelm prospects with too much technical detail",
      "Could struggle to build rapport in virtual settings",
      "Might miss emotional or political buying factors",
      "May lose deals to less qualified but more personable competitors",
    ],
    superpowers: [
      "Wins technical evaluations and proof-of-concepts",
      "Builds credibility that survives scrutiny",
      "Creates proposals that address detailed requirements",
      "Supports complex implementations with deep knowledge",
    ],
    tips: [
      "Start calls with a brief personal connection before diving into details",
      "Prepare an executive summary for non-technical stakeholders",
      "Use your preparation to anticipate and address objections proactively",
    ],
  },
  // Beaver + Product + B2B + Outside
  "beaver_product_b2b_outside": {
    behaviors: [
      "Arrives at meetings thoroughly prepared with research and materials",
      "Presents detailed product information with expert confidence",
      "Conducts thorough on-site assessments and needs analyses",
      "Builds credibility through technical demonstrations",
      "Creates comprehensive proposals based on detailed discovery",
    ],
    blindSpots: [
      "May seem cold or overly formal in face-to-face settings",
      "Could miss relationship cues that happen outside meetings",
      "Might struggle with executives who want high-level overviews",
      "May over-prepare at the expense of relationship-building activities",
    ],
    superpowers: [
      "Commands respect in technical and procurement meetings",
      "Wins competitive evaluations through superior preparation",
      "Builds trust with technical stakeholders who influence decisions",
      "Creates detailed proposals that address complex requirements",
    ],
    tips: [
      "Use travel time for relationship-building, not just preparation",
      "Prepare executive-level talking points separate from technical details",
      "Find opportunities for informal connection before formal meetings",
    ],
  },
  // Beaver + Product + B2C + Inside
  "beaver_product_b2c_inside": {
    behaviors: [
      "Provides detailed product information that builds consumer confidence",
      "Answers questions thoroughly and accurately",
      "Creates comparison guides that help consumers make informed decisions",
      "Follows up with additional information when requested",
      "Builds credibility through deep product knowledge",
    ],
    blindSpots: [
      "May overwhelm consumers with too much information",
      "Could struggle with consumers who make emotional decisions",
      "Might miss buying signals while explaining features",
      "May seem impersonal or transactional to relationship-oriented buyers",
    ],
    superpowers: [
      "Builds confidence in high-consideration consumer purchases",
      "Earns trust through accurate, detailed information",
      "Reduces returns and complaints through proper expectation setting",
      "Wins with analytical consumers who do extensive research",
    ],
    tips: [
      "Ask how much detail they want: 'Would you like the overview or deep dive?'",
      "Watch for buying signals and transition to close when ready",
      "Lead with benefits, then offer details for those who want them",
    ],
  },
  // Beaver + Product + B2C + Outside
  "beaver_product_b2c_outside": {
    behaviors: [
      "Arrives at appointments thoroughly prepared with product information",
      "Provides detailed demonstrations that build consumer confidence",
      "Answers all questions accurately and completely",
      "Creates professional presentations with supporting documentation",
      "Follows up with additional information after visits",
    ],
    blindSpots: [
      "May seem too formal or salesy in casual home settings",
      "Could overwhelm with details when consumers want simplicity",
      "Might miss emotional buying triggers from analytical focus",
      "May struggle with same-visit closing requirements",
    ],
    superpowers: [
      "Builds trust through thorough, professional presentations",
      "Wins high-consideration sales with discerning consumers",
      "Reduces buyer's remorse through proper expectation setting",
      "Earns referrals from consumers who appreciate expertise",
    ],
    tips: [
      "Read the room—some families want details, others want reassurance",
      "Bring professional materials but don't overwhelm the kitchen table",
      "Use your expertise to make a confident recommendation",
    ],
  },
  // Beaver + Service + B2B + Inside
  "beaver_service_b2b_inside": {
    behaviors: [
      "Conducts thorough needs analyses before proposing solutions",
      "Creates detailed proposals that address specific requirements",
      "Provides comprehensive documentation of service approaches",
      "Answers technical questions with precision and case study evidence",
      "Builds credibility through demonstrated methodology expertise",
    ],
    blindSpots: [
      "May over-engineer proposals for straightforward needs",
      "Could struggle to sell intangible service outcomes",
      "Might miss relationship and political factors in decisions",
      "May lose to competitors who connect better personally",
    ],
    superpowers: [
      "Wins competitive service evaluations through superior preparation",
      "Builds credibility that justifies premium pricing",
      "Creates proposals that address procurement requirements",
      "Supports successful service delivery through thorough scoping",
    ],
    tips: [
      "Balance detailed proposals with executive summaries",
      "Connect service methodology to business outcomes they care about",
      "Build relationships with both technical and business stakeholders",
    ],
  },
  // Beaver + Service + B2B + Outside
  "beaver_service_b2b_outside": {
    behaviors: [
      "Conducts thorough on-site assessments and discovery",
      "Presents detailed service proposals with expert confidence",
      "Provides comprehensive documentation of approach and methodology",
      "Builds credibility through deep industry and technical expertise",
      "Creates detailed implementation plans based on on-site findings",
    ],
    blindSpots: [
      "May focus on methodology at expense of relationship-building",
      "Could seem rigid or inflexible in dynamic client situations",
      "Might miss political and cultural factors affecting decisions",
      "May over-prepare instead of engaging stakeholders informally",
    ],
    superpowers: [
      "Commands respect in technical and executive meetings",
      "Wins complex service engagements through superior scoping",
      "Builds trust through demonstrated methodology rigor",
      "Creates proposals that survive legal and procurement scrutiny",
    ],
    tips: [
      "Use on-site time for informal relationship-building, not just assessment",
      "Prepare different messages for technical vs. executive audiences",
      "Connect detailed methodology to outcomes executives care about",
    ],
  },
  // Beaver + Service + B2C + Inside
  "beaver_service_b2c_inside": {
    behaviors: [
      "Provides detailed service explanations that build consumer confidence",
      "Answers questions thoroughly with supporting evidence",
      "Creates clear documentation of service expectations and processes",
      "Follows up with additional information when requested",
      "Builds credibility through deep service knowledge",
    ],
    blindSpots: [
      "May overwhelm consumers with service details",
      "Could struggle to connect emotionally on personal services",
      "Might seem cold or clinical when warmth is needed",
      "May lose consumers who want quick, simple answers",
    ],
    superpowers: [
      "Builds confidence in high-stakes service decisions",
      "Reduces cancellations through clear expectation setting",
      "Wins analytical consumers who research extensively",
      "Earns referrals from consumers who appreciate professionalism",
    ],
    tips: [
      "Lead with reassurance, then offer details for those who want them",
      "Match your communication style to the consumer's preferences",
      "Use your expertise to make confident recommendations",
    ],
  },
  // Beaver + Service + B2C + Outside
  "beaver_service_b2c_outside": {
    behaviors: [
      "Arrives at appointments thoroughly prepared with materials and references",
      "Conducts detailed assessments before providing recommendations",
      "Presents service options with comprehensive documentation",
      "Answers all questions accurately and professionally",
      "Follows up with detailed written proposals after visits",
    ],
    blindSpots: [
      "May seem overly formal in casual home settings",
      "Could overwhelm with information when simplicity is wanted",
      "Might miss the emotional side of in-home service decisions",
      "May struggle with same-visit closing expectations",
    ],
    superpowers: [
      "Builds trust through professional, thorough presentations",
      "Wins discerning consumers who value expertise",
      "Reduces complaints through clear expectation setting",
      "Earns referrals from consumers who appreciate competence",
    ],
    tips: [
      "Gauge how much detail each household wants before diving deep",
      "Use your expertise to make a clear, confident recommendation",
      "Leave professional documentation that differentiates you",
    ],
  },
};

/**
 * Get contextual behaviors for deep dive based on sales context
 */
export function getContextualBehaviors(
  animalType: AnimalType,
  context: SalesContext
): string[] {
  const key = `${animalType}_${context.sellType}_${context.customerType}_${context.salesChannel}`;
  const contextContent = contextualContentMap[key];

  if (contextContent?.behaviors) {
    return contextContent.behaviors;
  }

  // Fallback to base behaviors if specific context not found
  const baseBehaviors: Record<AnimalType, string[]> = {
    lion: [
      "Takes control of sales conversations from the start",
      "Drives toward decisions with clear timelines",
      "Handles objections directly and confidently",
      "Creates urgency to accelerate deal cycles",
      "Focuses on ROI and competitive positioning",
    ],
    penguin: [
      "Builds instant rapport through genuine enthusiasm",
      "Creates excitement around possibilities",
      "Rallies stakeholders through energy and vision",
      "Leverages network and referrals effectively",
      "Makes prospects feel special and valued",
    ],
    retriever: [
      "Takes time to understand prospect needs deeply",
      "Builds trust through consistent follow-through",
      "Focuses on long-term relationship over quick close",
      "Supports prospects through complex decisions",
      "Creates advocates through genuine care",
    ],
    beaver: [
      "Prepares thoroughly for every interaction",
      "Answers technical questions with precision",
      "Builds credibility through demonstrated expertise",
      "Provides comprehensive documentation",
      "Reduces risk through thorough analysis",
    ],
  };

  return baseBehaviors[animalType];
}

/**
 * Get context-specific blind spots
 */
export function getContextualBlindSpots(
  animalType: AnimalType,
  context: SalesContext
): string[] {
  const key = `${animalType}_${context.sellType}_${context.customerType}_${context.salesChannel}`;
  const contextContent = contextualContentMap[key];

  if (contextContent?.blindSpots) {
    return contextContent.blindSpots;
  }

  // Fallback blind spots
  const baseBlindSpots: Record<AnimalType, string[]> = {
    lion: [
      "May come across as too aggressive or pushy",
      "Could miss relationship cues while driving to close",
      "Might overlook important details in pursuit of speed",
      "May struggle with prospects who need time to decide",
    ],
    penguin: [
      "May struggle to drive urgency and ask for commitment",
      "Could overpromise to maintain positive relationships",
      "Might lose focus on business outcomes while socializing",
      "May not qualify opportunities rigorously enough",
    ],
    retriever: [
      "May not create enough urgency to move deals forward",
      "Could be too passive when assertiveness is needed",
      "Might over-invest in unqualified opportunities",
      "May avoid difficult conversations that need to happen",
    ],
    beaver: [
      "May overwhelm prospects with too much information",
      "Could miss emotional and relationship factors",
      "Might struggle to build rapport and warmth",
      "May over-prepare at the expense of action",
    ],
  };

  return baseBlindSpots[animalType];
}

/**
 * Get context-specific superpowers
 */
export function getContextualSuperpowers(
  animalType: AnimalType,
  context: SalesContext
): string[] {
  const key = `${animalType}_${context.sellType}_${context.customerType}_${context.salesChannel}`;
  const contextContent = contextualContentMap[key];

  if (contextContent?.superpowers) {
    return contextContent.superpowers;
  }

  // Fallback superpowers
  const baseSuperpowers: Record<AnimalType, string[]> = {
    lion: [
      "Closes deals with confidence and urgency",
      "Drives stalled opportunities forward",
      "Handles tough negotiations effectively",
      "Creates momentum that accelerates sales cycles",
    ],
    penguin: [
      "Builds instant rapport with almost anyone",
      "Creates excitement that spreads to stakeholders",
      "Generates referrals through positive relationships",
      "Makes the buying experience enjoyable",
    ],
    retriever: [
      "Builds deep trust that competitors can't break",
      "Creates customer loyalty that lasts for years",
      "Supports customers through complex decisions",
      "Develops advocates who refer consistently",
    ],
    beaver: [
      "Wins technical evaluations with superior preparation",
      "Builds credibility that justifies premium pricing",
      "Reduces risk through thorough due diligence",
      "Creates proposals that address all requirements",
    ],
  };

  return baseSuperpowers[animalType];
}

/**
 * Get context-specific tips
 */
export function getContextualTips(
  animalType: AnimalType,
  context: SalesContext
): string[] {
  const key = `${animalType}_${context.sellType}_${context.customerType}_${context.salesChannel}`;
  const contextContent = contextualContentMap[key];

  if (contextContent?.tips) {
    return contextContent.tips;
  }

  // Fallback tips
  return [
    "Focus on your natural strengths while being aware of blind spots",
    "Adapt your approach based on buyer signals",
    "Practice skills outside your comfort zone regularly",
  ];
}

/**
 * Get context-modified growth plan
 */
export function getContextualGrowthPlan(
  scores: Record<AnimalType, number>,
  primaryType: AnimalType,
  context: SalesContext
): GrowthPlanContent & { contextTips: string[] } {
  const basePlan = getGrowthPlan(scores, primaryType);
  const targetKey = `${basePlan.targetArea}_${context.sellType}_${context.customerType}_${context.salesChannel}`;
  const targetContent = contextualContentMap[targetKey];

  // Get context-specific tips for developing the target area
  const contextTips = targetContent?.tips || [
    `Practice ${basePlan.targetArea} skills in low-stakes situations first`,
    `Observe how successful ${basePlan.targetArea} types operate in your environment`,
    `Start with one behavior change and build from there`,
  ];

  return {
    ...basePlan,
    contextTips,
  };
}

// ============================================
// PREMIUM REPORT CONTENT
// ============================================

// ============================================
// 1. SALES SCRIPTS & PHRASES
// ============================================

export interface SalesScripts {
  type: AnimalType;
  openingLines: { situation: string; script: string }[];
  discoveryQuestions: { purpose: string; script: string }[];
  valueStatements: { context: string; script: string }[];
  closingPhrases: { situation: string; script: string }[];
  followUpTemplates: { scenario: string; script: string }[];
}

export const salesScripts: Record<AnimalType, SalesScripts> = {
  lion: {
    type: "lion",
    openingLines: [
      {
        situation: "Cold outreach",
        script: "I'll be direct - I've got something that could give you a competitive edge. Do you have 5 minutes to see if it's worth a longer conversation?"
      },
      {
        situation: "Warm intro",
        script: "[Name] mentioned you're looking to accelerate results in [area]. I've helped [similar company] achieve [specific result]. Worth a quick call?"
      },
      {
        situation: "Follow-up after no response",
        script: "I know you're busy, so I'll keep this short: [One compelling result]. If that's not relevant, just say so and I'll stop reaching out."
      },
      {
        situation: "Executive meeting",
        script: "I respect your time, so let me start with the bottom line: we can help you [key outcome]. Here's the 60-second version of how."
      }
    ],
    discoveryQuestions: [
      {
        purpose: "Uncover urgency",
        script: "What happens if this problem doesn't get solved in the next 90 days?"
      },
      {
        purpose: "Find decision authority",
        script: "When you've made decisions like this before, what was your process?"
      },
      {
        purpose: "Understand competition",
        script: "Who else is solving this for you right now, and where are they falling short?"
      },
      {
        purpose: "Quantify the pain",
        script: "If you had to put a dollar figure on what this problem costs you monthly, what would it be?"
      }
    ],
    valueStatements: [
      {
        context: "ROI focused",
        script: "Companies like yours typically see [X%] improvement within [timeframe]. That translates to roughly [dollar amount] in your case."
      },
      {
        context: "Competitive advantage",
        script: "Your competitors are already doing this. The question isn't if you'll make a change, it's whether you'll lead or follow."
      },
      {
        context: "Time savings",
        script: "This will give you back [X hours] per week. What would you do with that time?"
      }
    ],
    closingPhrases: [
      {
        situation: "After demo",
        script: "Based on what you've seen, does this solve your problem? If yes, let's talk about getting started."
      },
      {
        situation: "Handling delay",
        script: "I understand you need time. But waiting costs [quantified impact]. What would it take to make a decision this week?"
      },
      {
        situation: "Final push",
        script: "You've seen the value. You've got the budget. What's the one thing stopping us from moving forward right now?"
      },
      {
        situation: "Creating urgency",
        script: "I can hold this pricing until [date], but after that, it goes up. When can you give me a final answer?"
      }
    ],
    followUpTemplates: [
      {
        scenario: "After meeting - no decision",
        script: "Thanks for your time today. You mentioned [key pain point] is costing you [amount]. I'll follow up [specific day] to get your decision. If anything changes before then, you have my number."
      },
      {
        scenario: "After proposal sent",
        script: "Proposal's in your inbox. The numbers speak for themselves: [key ROI point]. I'll call you [day/time] to answer any questions and lock this in."
      }
    ]
  },
  penguin: {
    type: "penguin",
    openingLines: [
      {
        situation: "Cold outreach",
        script: "Hey [Name]! I came across your work on [specific thing] and was genuinely impressed. I think we might be able to help each other out - mind if I share a quick idea?"
      },
      {
        situation: "Warm intro",
        script: "[Mutual connection] said amazing things about you! They thought we should connect because [reason]. I'd love to hear about what you're working on."
      },
      {
        situation: "Follow-up after no response",
        script: "I know things get crazy! Just wanted to pop back up - still excited about the possibility of working together. Coffee sometime?"
      },
      {
        situation: "Networking event",
        script: "I couldn't help but overhear you mention [topic]. That's so interesting! I actually work in [related area]. What brought you to this event?"
      }
    ],
    discoveryQuestions: [
      {
        purpose: "Build rapport first",
        script: "Before we dive in, I'd love to hear more about your journey. How did you end up in this role?"
      },
      {
        purpose: "Understand their vision",
        script: "If you could wave a magic wand and change one thing about how this works, what would it be?"
      },
      {
        purpose: "Find the story",
        script: "Tell me about the last time this problem really frustrated you. What happened?"
      },
      {
        purpose: "Connect to their values",
        script: "What would solving this mean for you personally, not just for the business?"
      }
    ],
    valueStatements: [
      {
        context: "Excitement building",
        script: "This is exactly why I love what we do! Imagine [painted vision of success] - that's what we're going to create together."
      },
      {
        context: "Social proof",
        script: "You know [known company/person]? They had the same hesitation, and now they can't imagine going back. Let me tell you what happened..."
      },
      {
        context: "Partnership framing",
        script: "I don't want to just be a vendor - I want to be your go-to partner for this. When you win, I win."
      }
    ],
    closingPhrases: [
      {
        situation: "Soft close",
        script: "I'm so excited about what we could do together! How are you feeling about moving forward?"
      },
      {
        situation: "Collaborative close",
        script: "Let's figure this out together. What would need to be true for you to feel great about saying yes?"
      },
      {
        situation: "Vision close",
        script: "Picture this time next year - [describe success state]. Ready to make that happen?"
      },
      {
        situation: "Relationship close",
        script: "I genuinely believe this is right for you, and I wouldn't say that if I didn't mean it. Can I earn your trust on this?"
      }
    ],
    followUpTemplates: [
      {
        scenario: "After meeting - building relationship",
        script: "So great chatting with you today! I loved hearing about [personal detail they shared]. I'll put together some ideas based on our conversation. Let's talk again soon!"
      },
      {
        scenario: "After proposal sent",
        script: "Just sent over the proposal! I included some extra ideas I think you'll love. Can't wait to hear what you think - call me anytime to chat through it!"
      }
    ]
  },
  retriever: {
    type: "retriever",
    openingLines: [
      {
        situation: "Cold outreach",
        script: "Hi [Name], I hope I'm not catching you at a bad time. I wanted to reach out because I think I might be able to help with [specific challenge]. Would you be open to a brief conversation?"
      },
      {
        situation: "Warm intro",
        script: "[Mutual connection] thought it might be helpful for us to connect. They mentioned you've been looking at [area] - I'd be happy to share some thoughts if that would be useful."
      },
      {
        situation: "Follow-up after no response",
        script: "I wanted to check in - I know things get busy. Whenever you have time to chat, I'm here. No pressure at all."
      },
      {
        situation: "Supporting their process",
        script: "I understand decisions like this take time. I'm here to support you through the process - what information would be most helpful right now?"
      }
    ],
    discoveryQuestions: [
      {
        purpose: "Understanding their concerns",
        script: "What's weighing on you most when you think about making a change like this?"
      },
      {
        purpose: "Team impact",
        script: "How would this affect your team? I want to make sure we support everyone through the transition."
      },
      {
        purpose: "Past experience",
        script: "Have you tried something like this before? What worked well, and what didn't?"
      },
      {
        purpose: "Support needs",
        script: "What kind of support would make you feel confident about moving forward?"
      }
    ],
    valueStatements: [
      {
        context: "Trust building",
        script: "We'll be with you every step of the way. Our team doesn't disappear after the sale - we're partners for the long haul."
      },
      {
        context: "Risk reduction",
        script: "I want you to feel completely comfortable. That's why we offer [guarantee/support]. You're not in this alone."
      },
      {
        context: "Team focus",
        script: "This isn't just about the technology - it's about making your team's lives easier. Here's how we'll support them..."
      }
    ],
    closingPhrases: [
      {
        situation: "Gentle close",
        script: "It sounds like this could really help. When you're ready, I'm here to take the next step with you."
      },
      {
        situation: "Supportive close",
        script: "I want to make sure you feel good about this. What questions can I answer to help you feel confident?"
      },
      {
        situation: "Consensus close",
        script: "Have you had a chance to talk this over with your team? I'm happy to join a call to address any of their concerns."
      },
      {
        situation: "Reassurance close",
        script: "I know this is a big decision. I genuinely believe it's the right one, and I'll be here to support you every step of the way."
      }
    ],
    followUpTemplates: [
      {
        scenario: "After meeting - nurturing",
        script: "Thank you for taking the time to meet today. I really appreciated you sharing [specific concern they mentioned]. I've been thinking about it and wanted to send you [helpful resource]. Take your time - I'm here whenever you need me."
      },
      {
        scenario: "After proposal sent",
        script: "I've sent over the proposal and wanted to make sure you received it. Please don't hesitate to reach out with any questions. I'm happy to walk through it together whenever works for you."
      }
    ]
  },
  beaver: {
    type: "beaver",
    openingLines: [
      {
        situation: "Cold outreach",
        script: "Hi [Name], I've done some research on [their company/industry] and identified a specific area where we might add value. I have data showing [specific insight]. Would you be interested in seeing the analysis?"
      },
      {
        situation: "Warm intro",
        script: "[Mutual connection] mentioned you're evaluating solutions for [area]. I've put together a comparison that might be useful for your evaluation. When would be a good time to review it?"
      },
      {
        situation: "Follow-up after no response",
        script: "Following up on my previous message. I've attached a one-page summary of the key findings. Happy to schedule time to discuss the details when you're ready."
      },
      {
        situation: "Technical evaluation",
        script: "I'd like to walk you through our technical specifications and answer any detailed questions. I've prepared documentation covering [key areas]. Shall I send it ahead of our call?"
      }
    ],
    discoveryQuestions: [
      {
        purpose: "Understanding requirements",
        script: "Can you walk me through your current process step by step? I want to make sure I understand all the requirements."
      },
      {
        purpose: "Technical criteria",
        script: "What are the must-have technical requirements versus nice-to-haves?"
      },
      {
        purpose: "Evaluation process",
        script: "What criteria will you use to evaluate options? I want to make sure I address each one."
      },
      {
        purpose: "Integration needs",
        script: "What systems does this need to integrate with? I'll document the technical specifications for each."
      }
    ],
    valueStatements: [
      {
        context: "Data-driven",
        script: "Based on our analysis of 47 similar implementations, you can expect [specific metric] with a margin of error of [range]."
      },
      {
        context: "Risk mitigation",
        script: "We've identified three potential risks and have mitigation strategies for each. Let me walk you through the documentation."
      },
      {
        context: "Comprehensive approach",
        script: "Our implementation checklist covers 127 items across 8 categories. Nothing falls through the cracks."
      }
    ],
    closingPhrases: [
      {
        situation: "After thorough evaluation",
        script: "We've covered all the requirements on your list. Based on the data, does this meet your criteria for moving forward?"
      },
      {
        situation: "Documentation close",
        script: "I've prepared the contract with all specifications we discussed. Shall I walk through each section before you sign?"
      },
      {
        situation: "Risk-addressed close",
        script: "We've addressed each of your concerns with documented solutions. What additional information would you need to proceed?"
      },
      {
        situation: "Process-oriented close",
        script: "According to your timeline, we need to begin implementation by [date] to meet your go-live target. Shall we finalize the agreement this week?"
      }
    ],
    followUpTemplates: [
      {
        scenario: "After meeting - documentation",
        script: "Following up with the documentation we discussed: attached you'll find [list of documents]. Each addresses the specific points you raised. I've highlighted the key sections for your review."
      },
      {
        scenario: "After proposal sent",
        script: "Proposal attached with detailed specifications, implementation timeline, and pricing breakdown. Page 4 addresses your technical requirements; page 7 covers the integration plan. I'm available to discuss any section in detail."
      }
    ]
  }
};

// ============================================
// 2. OBJECTION HANDLING BY BUYER TYPE
// ============================================

export interface ObjectionResponse {
  objection: string;
  response: string;
  keyPrinciple: string;
}

export interface ObjectionHandling {
  buyerType: AnimalType;
  commonObjections: ObjectionResponse[];
}

export const objectionHandling: Record<AnimalType, ObjectionResponse[]> = {
  lion: [
    {
      objection: "This is too expensive",
      response: "I hear you - let's talk ROI. If this saves you [X hours/dollars] per month, you break even in [timeframe]. After that, it's pure profit. What's your current cost of not solving this?",
      keyPrinciple: "Lions respect directness about money. Focus on ROI and competitive advantage, not discounts."
    },
    {
      objection: "I need to think about it",
      response: "I respect that. But in my experience, 'think about it' usually means there's a specific concern I haven't addressed. What's really holding you back?",
      keyPrinciple: "Lions appreciate being challenged. Don't accept vague delays - dig for the real objection."
    },
    {
      objection: "We're happy with our current solution",
      response: "That's great you have something working. But let me ask - are you ahead of your competitors, or just keeping pace? Because they're not standing still.",
      keyPrinciple: "Appeal to their competitive nature. Status quo means falling behind."
    },
    {
      objection: "I need to run this by my team",
      response: "Of course. But you're the decision-maker here - if this made sense to you, could you make it happen? What would you need to see?",
      keyPrinciple: "Lions often use team buy-in as a delay tactic. Confirm they have authority and get their personal buy-in first."
    }
  ],
  penguin: [
    {
      objection: "This is too expensive",
      response: "I totally get it - budget matters. But think about what success looks like: [paint vision]. That's the experience we're creating together. And honestly, I'd feel terrible if price was the only thing standing between you and that outcome.",
      keyPrinciple: "Penguins buy emotionally. Connect the investment to the experience and relationship, not just features."
    },
    {
      objection: "I need to think about it",
      response: "Absolutely, take your time! But I'm curious - what's your gut telling you right now? Sometimes our instincts know before our brains catch up.",
      keyPrinciple: "Penguins often know what they want but seek permission. Help them trust their instincts."
    },
    {
      objection: "We're happy with our current solution",
      response: "That's awesome that you have a good relationship there! I'm not looking to replace that - but I've seen so many people like you get even better results when they add this to their toolkit. Can I show you what I mean?",
      keyPrinciple: "Don't attack their current vendor - Penguins are loyal. Position as additive, not replacement."
    },
    {
      objection: "I need to run this by my team",
      response: "Love that you're thinking about the team! What if I joined that conversation? I'd love to meet everyone and make sure all their questions get answered.",
      keyPrinciple: "Penguins genuinely value consensus. Offer to help build it - they'll appreciate the support."
    }
  ],
  retriever: [
    {
      objection: "This is too expensive",
      response: "I understand - these decisions aren't easy. Let me ask: if budget wasn't a concern, would this be the right solution for your team? Because if it is, let's figure out together how to make it work.",
      keyPrinciple: "Retrievers worry about making the wrong decision. Separate the 'is this right?' question from the 'can we afford it?' question."
    },
    {
      objection: "I need to think about it",
      response: "Of course, take all the time you need. Is there specific information I can provide that would help you feel more confident? I'm here to support you through this decision.",
      keyPrinciple: "Don't pressure Retrievers - it backfires. Offer support and patience instead."
    },
    {
      objection: "We're happy with our current solution",
      response: "It sounds like you have a good thing going, and that's important. I wouldn't want you to change anything that's working well. But if you ever have concerns or want a second opinion, I'm always happy to help - no strings attached.",
      keyPrinciple: "Retrievers value loyalty. Position yourself as a supportive resource, not a threat to existing relationships."
    },
    {
      objection: "I need to run this by my team",
      response: "That makes complete sense - you clearly care about your team's input. Would it help if I prepared some materials that address the questions they might have? I want to make sure everyone feels comfortable.",
      keyPrinciple: "Retrievers genuinely need team consensus. Support them in getting it rather than trying to bypass it."
    }
  ],
  beaver: [
    {
      objection: "This is too expensive",
      response: "Let's look at the numbers together. Here's our detailed ROI analysis with conservative, moderate, and aggressive scenarios. Based on your specific situation, which scenario seems most realistic to you?",
      keyPrinciple: "Beavers need data to justify decisions. Provide detailed financial analysis, not emotional appeals."
    },
    {
      objection: "I need to think about it",
      response: "Understood. What specific areas would you like to analyze further? I can provide additional documentation on [technical specs/case studies/implementation details] to support your evaluation.",
      keyPrinciple: "Beavers' 'think about it' often means they need more data. Find out what's missing and provide it."
    },
    {
      objection: "We're happy with our current solution",
      response: "That's good to know. Would you be open to seeing a side-by-side comparison? I've documented the specific differences across [key criteria]. You may find areas where your current solution actually outperforms us - I'm happy to show you either way.",
      keyPrinciple: "Beavers respect objectivity. Offer fair comparisons and be willing to acknowledge competitor strengths."
    },
    {
      objection: "I need to run this by my team",
      response: "Of course. I've prepared technical documentation for each stakeholder group. Would it help if I created a summary tailored to each team's specific concerns?",
      keyPrinciple: "Beavers often need to satisfy other analytical stakeholders. Help them build their internal case."
    }
  ]
};

// ============================================
// 3. 30-DAY ACTION PLAN
// ============================================

export interface WeeklyAction {
  week: number;
  theme: string;
  actions: string[];
  successMetric: string;
}

export interface ThirtyDayPlan {
  animalType: AnimalType;
  focusArea: string;
  weeks: WeeklyAction[];
  dailyHabit: string;
}

export function getThirtyDayPlan(
  primaryType: AnimalType,
  targetType: AnimalType
): ThirtyDayPlan {
  const plans: Record<string, ThirtyDayPlan> = {
    // Lion developing Penguin skills
    "lion_penguin": {
      animalType: "lion",
      focusArea: "Building Relationships & Rapport",
      dailyHabit: "Start every call with 2 minutes of genuine personal connection before business",
      weeks: [
        {
          week: 1,
          theme: "Active Listening",
          actions: [
            "In every meeting, wait 3 seconds before responding to let the other person fully finish",
            "Ask at least 2 follow-up questions about what prospects share personally",
            "Write down one personal detail about each prospect to remember for next time",
            "Practice summarizing what you heard before giving your response"
          ],
          successMetric: "Complete 5 conversations where you asked more questions than you made statements"
        },
        {
          week: 2,
          theme: "Emotional Connection",
          actions: [
            "Share a brief personal story in at least 3 sales conversations",
            "Send a non-business related article or resource to 5 prospects based on their interests",
            "Acknowledge feelings before jumping to solutions ('That sounds frustrating...')",
            "Practice matching the energy level of whoever you're speaking with"
          ],
          successMetric: "Receive at least 2 responses mentioning they appreciated your thoughtfulness"
        },
        {
          week: 3,
          theme: "Celebration & Optimism",
          actions: [
            "Celebrate small wins with your prospects ('That's great that you...')",
            "Replace 'problem' language with 'opportunity' language",
            "Send congratulations notes to 5 people in your network for any wins you see",
            "Practice expressing genuine excitement when prospects share good news"
          ],
          successMetric: "Build 3 new warm relationships with people who weren't in your pipeline"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Start each week planning one relationship-building activity",
            "Identify 3 prospects to nurture long-term without immediate sales expectations",
            "Ask for introductions from happy clients (leverage relationships for growth)",
            "Reflect: Which relationship-building tactics felt most natural?"
          ],
          successMetric: "Generate 1 referral from relationship-building efforts"
        }
      ]
    },
    // Lion developing Retriever skills
    "lion_retriever": {
      animalType: "lion",
      focusArea: "Building Trust & Patience",
      dailyHabit: "Send one thoughtful, non-sales follow-up to a prospect each day",
      weeks: [
        {
          week: 1,
          theme: "Slowing Down",
          actions: [
            "Add 5 minutes to every sales call for unhurried conversation",
            "When you feel the urge to push, pause and ask a question instead",
            "Practice saying 'Take your time' and meaning it",
            "Document prospect concerns without immediately solving them"
          ],
          successMetric: "Complete 5 conversations where you didn't mention closing or next steps until they did"
        },
        {
          week: 2,
          theme: "Supporting, Not Pushing",
          actions: [
            "Create a helpful resource (guide, checklist) for your prospects with no ask attached",
            "Follow up on personal things prospects mentioned ('How did your daughter's recital go?')",
            "Offer to help with something outside your product scope",
            "Practice accepting 'not yet' without countering"
          ],
          successMetric: "Have 3 prospects explicitly thank you for your patience or support"
        },
        {
          week: 3,
          theme: "Long-term Relationship Building",
          actions: [
            "Identify 5 'nurture' accounts with 6+ month potential timelines",
            "Create a quarterly touch plan for important relationships",
            "Introduce two people in your network who should know each other",
            "Check in with a closed-won customer just to see how they're doing"
          ],
          successMetric: "Re-engage 2 'dead' opportunities through patient nurturing"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Balance your pipeline: ensure 30% of activity is relationship-nurturing, not just closing",
            "Set a personal rule: no follow-up more than 1x per week unless they initiate",
            "Practice the phrase: 'I'm here when you're ready'",
            "Reflect: Which patience tactics improved your close rate?"
          ],
          successMetric: "Close a deal that required more than 4 touchpoints"
        }
      ]
    },
    // Lion developing Beaver skills
    "lion_beaver": {
      animalType: "lion",
      focusArea: "Preparation & Detail Orientation",
      dailyHabit: "Spend 15 minutes researching each prospect before any call",
      weeks: [
        {
          week: 1,
          theme: "Pre-Call Research",
          actions: [
            "Create a pre-call checklist: company news, LinkedIn updates, industry trends",
            "Document 3 specific, researched talking points before every call",
            "Read the last 3 months of prospect's company press releases",
            "Prepare answers to the 5 most likely objections in writing"
          ],
          successMetric: "Have 5 prospects comment that you 'really did your homework'"
        },
        {
          week: 2,
          theme: "Documentation & Follow-Through",
          actions: [
            "Send detailed meeting recaps within 2 hours of every call",
            "Create a FAQ document addressing common technical questions",
            "Build a ROI calculator specific to your solution",
            "Track every commitment you make and deliver early"
          ],
          successMetric: "Achieve 100% on-time delivery of promised follow-ups"
        },
        {
          week: 3,
          theme: "Data-Driven Selling",
          actions: [
            "Lead with data in 5 sales conversations before sharing opinions",
            "Prepare case studies with specific metrics for different industries",
            "Create comparison charts (you vs. competitors) based on objective criteria",
            "Practice saying 'Let me get you the exact data on that' instead of estimating"
          ],
          successMetric: "Win a deal where the prospect cited your 'thoroughness' as a factor"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Build a reusable preparation template for different prospect types",
            "Schedule 'prep time' blocks on your calendar before all important calls",
            "Create a library of supporting documents for quick access",
            "Reflect: How has preparation affected your win rate?"
          ],
          successMetric: "Reduce 'I'll get back to you on that' responses by 50%"
        }
      ]
    },
    // Penguin developing Lion skills
    "penguin_lion": {
      animalType: "penguin",
      focusArea: "Directness & Closing",
      dailyHabit: "Ask for a specific commitment at the end of every sales conversation",
      weeks: [
        {
          week: 1,
          theme: "Getting to the Point",
          actions: [
            "Practice your 30-second pitch until it's crisp and benefit-focused",
            "Start 3 calls by stating the purpose upfront: 'I'm calling because...'",
            "Time yourself: keep discovery questions to 10 minutes max before presenting",
            "Replace 'I think maybe we could' with 'Here's what I recommend'"
          ],
          successMetric: "Complete 5 calls in under 30 minutes that still achieve their objective"
        },
        {
          week: 2,
          theme: "Asking for the Close",
          actions: [
            "Practice asking 'Are you ready to move forward?' at least 3 times this week",
            "When you sense buying signals, ask: 'What would it take to close this today?'",
            "Set a deadline for decisions: 'I can hold this offer until Friday'",
            "Role-play closing conversations with a colleague"
          ],
          successMetric: "Ask for the business directly in every qualified opportunity"
        },
        {
          week: 3,
          theme: "Handling Stalls",
          actions: [
            "When someone says 'Let me think about it,' ask 'What specifically do you need to consider?'",
            "Create urgency by quantifying the cost of delay",
            "Practice comfortable silence after asking a closing question",
            "Identify 3 stalled deals and push for definitive answers (yes or no)"
          ],
          successMetric: "Convert 2 'thinking about it' responses into decisions"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Track your closing attempts vs. closes - aim for 80% ask rate",
            "Balance relationship-building with clear business outcomes",
            "Set personal commitments for when you'll ask for decisions",
            "Reflect: Which directness tactics felt authentic to you?"
          ],
          successMetric: "Shorten average sales cycle by 20%"
        }
      ]
    },
    // Penguin developing Retriever skills
    "penguin_retriever": {
      animalType: "penguin",
      focusArea: "Consistency & Follow-Through",
      dailyHabit: "Review and act on your commitment list every morning before anything else",
      weeks: [
        {
          week: 1,
          theme: "Promise Tracking",
          actions: [
            "Create a 'promises made' list and review it daily",
            "Under-promise by 20% on timelines, then over-deliver",
            "Send what you said you'd send within 24 hours - no exceptions",
            "Acknowledge when you can't meet a commitment immediately, and set a new timeline"
          ],
          successMetric: "Achieve 100% follow-through on commitments for 7 consecutive days"
        },
        {
          week: 2,
          theme: "Steady Communication",
          actions: [
            "Create a follow-up schedule for each prospect and stick to it",
            "Replace sporadic 'checking in' with planned, valuable touchpoints",
            "Send the same level of attention to existing customers as new prospects",
            "Respond to all emails within 4 business hours"
          ],
          successMetric: "Have 3 prospects comment on your reliability or consistency"
        },
        {
          week: 3,
          theme: "Depth Over Breadth",
          actions: [
            "Focus on 10 key relationships instead of 30 casual ones",
            "Have a longer, deeper conversation with 3 key prospects",
            "Document personal details and preferences for your top 10 accounts",
            "Say 'no' to one new opportunity to better serve existing relationships"
          ],
          successMetric: "Deepen 3 relationships with additional contacts or referrals"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Build a personal CRM habit: update notes within 1 hour of every call",
            "Create templates for consistent follow-up messaging",
            "Schedule weekly relationship review: who needs attention?",
            "Reflect: How has consistency affected trust with your prospects?"
          ],
          successMetric: "Receive unsolicited positive feedback about your reliability"
        }
      ]
    },
    // Penguin developing Beaver skills
    "penguin_beaver": {
      animalType: "penguin",
      focusArea: "Precision & Preparation",
      dailyHabit: "Verify one fact or claim you plan to use in sales conversations",
      weeks: [
        {
          week: 1,
          theme: "Fact-Checking",
          actions: [
            "Review your pitch for any claims that need supporting data",
            "Create a 'proof points' document with verified statistics",
            "Before using a number, confirm it's current and accurate",
            "Replace 'I think it's about...' with exact figures"
          ],
          successMetric: "Deliver 5 presentations with zero unverified claims"
        },
        {
          week: 2,
          theme: "Detailed Preparation",
          actions: [
            "Create a written agenda for every meeting and share it in advance",
            "Prepare answers to technical questions you typically deflect",
            "Build a FAQ document you can reference or share",
            "Practice pausing to look things up rather than guessing"
          ],
          successMetric: "Reduce 'I'll get back to you on that' to once per meeting maximum"
        },
        {
          week: 3,
          theme: "Managing Details",
          actions: [
            "Create a checklist for deal stages to ensure nothing falls through cracks",
            "Review proposals twice before sending - once for content, once for accuracy",
            "Document all pricing and terms in writing, never verbal only",
            "Build a system for tracking action items and deadlines"
          ],
          successMetric: "Send 5 error-free proposals"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Build preparation time into your calendar before important meetings",
            "Create templates that force detail orientation (checklists, forms)",
            "Partner with a detail-oriented colleague for proposal review",
            "Reflect: How has precision affected your credibility?"
          ],
          successMetric: "Win a deal where accuracy or preparation was cited as a factor"
        }
      ]
    },
    // Retriever developing Lion skills
    "retriever_lion": {
      animalType: "retriever",
      focusArea: "Assertiveness & Closing",
      dailyHabit: "Make one direct request or ask for something you want each day",
      weeks: [
        {
          week: 1,
          theme: "Finding Your Voice",
          actions: [
            "Practice saying 'I recommend' instead of 'You might consider'",
            "Set a specific ask for each sales call and write it down beforehand",
            "When you want to soften a statement, say it directly instead",
            "Give your opinion first before asking for theirs in 3 conversations"
          ],
          successMetric: "Make a direct recommendation in every sales conversation"
        },
        {
          week: 2,
          theme: "Asking for the Close",
          actions: [
            "Script 3 closing questions and practice them until comfortable",
            "When you feel the impulse to give more time, ask for a decision instead",
            "Practice asking 'What's holding you back?' when deals stall",
            "Role-play with a colleague: they push back, you stand firm"
          ],
          successMetric: "Ask for the close in 100% of qualified opportunities"
        },
        {
          week: 3,
          theme: "Comfortable with Discomfort",
          actions: [
            "Have one difficult conversation you've been avoiding",
            "Practice sitting in silence after asking a closing question",
            "Push back respectfully on an unreasonable request",
            "Name a pricing boundary and hold it in negotiation"
          ],
          successMetric: "Successfully hold your ground in a negotiation"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Track your assertiveness: how many direct asks per week?",
            "Celebrate when directness leads to positive outcomes",
            "Build scripts that feel authentic but are still direct",
            "Reflect: Which assertiveness tactics felt right for you?"
          ],
          successMetric: "Increase close rate by being more direct about next steps"
        }
      ]
    },
    // Retriever developing Penguin skills
    "retriever_penguin": {
      animalType: "retriever",
      focusArea: "Energy & Enthusiasm",
      dailyHabit: "Share one piece of exciting news or positive story with your team or prospect",
      weeks: [
        {
          week: 1,
          theme: "Expressing Enthusiasm",
          actions: [
            "Practice verbal enthusiasm: 'I'm really excited about...'",
            "Add energy words to your vocabulary: 'amazing,' 'fantastic,' 'love'",
            "Record yourself on a call and assess your energy level",
            "Smile while speaking on phone calls (it changes your tone)"
          ],
          successMetric: "Receive feedback that you seem more energetic"
        },
        {
          week: 2,
          theme: "Storytelling",
          actions: [
            "Prepare 3 customer success stories with emotional hooks",
            "Practice painting a vision of success for prospects",
            "Share a personal anecdote in at least 2 sales conversations",
            "Use metaphors and analogies to make concepts more engaging"
          ],
          successMetric: "Have a prospect say 'Tell me more' unprompted"
        },
        {
          week: 3,
          theme: "Expanding Connections",
          actions: [
            "Attend one networking event or virtual mixer",
            "Reconnect with 5 contacts you haven't spoken to in 3+ months",
            "Introduce yourself to someone new in a prospect organization",
            "Suggest a casual coffee or lunch with a potential partner"
          ],
          successMetric: "Add 3 new meaningful contacts to your network"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Build energy habits: music before calls, standing during presentations",
            "Create excitement by framing solutions as opportunities, not fixes",
            "Practice enthusiastic language until it feels natural",
            "Reflect: How has increased energy affected engagement?"
          ],
          successMetric: "Book a meeting through networking or an enthusiastic referral"
        }
      ]
    },
    // Retriever developing Beaver skills
    "retriever_beaver": {
      animalType: "retriever",
      focusArea: "Structure & Analysis",
      dailyHabit: "Document one piece of data or metric that supports your value proposition",
      weeks: [
        {
          week: 1,
          theme: "Adding Structure",
          actions: [
            "Create agendas for all meetings and share them in advance",
            "Build a standard discovery question framework",
            "Document your sales process step-by-step",
            "Start tracking key metrics: calls, meetings, proposals, closes"
          ],
          successMetric: "Follow a documented process for 5 consecutive deals"
        },
        {
          week: 2,
          theme: "Data Confidence",
          actions: [
            "Prepare ROI calculations for your top 3 use cases",
            "Learn to explain technical aspects of your product confidently",
            "Create a comparison chart: your solution vs. alternatives",
            "Practice answering 'What makes you different?' with specific data"
          ],
          successMetric: "Lead with data in at least 3 sales conversations"
        },
        {
          week: 3,
          theme: "Thorough Preparation",
          actions: [
            "Research each prospect for 15+ minutes before calls",
            "Prepare written answers to likely objections",
            "Create proposal templates with detailed specifications",
            "Build a library of case studies with specific metrics"
          ],
          successMetric: "Have 3 prospects comment on your preparation"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Build prep time into your calendar as non-negotiable",
            "Create systems for capturing and organizing information",
            "Balance data with your natural warmth - lead with data, connect with heart",
            "Reflect: How has structure improved your confidence?"
          ],
          successMetric: "Win a deal against a more 'polished' competitor through preparation"
        }
      ]
    },
    // Beaver developing Lion skills
    "beaver_lion": {
      animalType: "beaver",
      focusArea: "Decisiveness & Action",
      dailyHabit: "Make one decision in 5 minutes or less that you'd normally research for hours",
      weeks: [
        {
          week: 1,
          theme: "Speed Over Perfection",
          actions: [
            "Set time limits for analysis: 30 minutes max before proposing a solution",
            "Practice the phrase: 'Based on what we know now, I recommend...'",
            "Send proposals within 24 hours of qualifying calls",
            "Reply to emails within 4 hours even if you don't have perfect answers"
          ],
          successMetric: "Reduce average proposal turnaround time by 50%"
        },
        {
          week: 2,
          theme: "Direct Communication",
          actions: [
            "Start emails and calls with your main point/recommendation",
            "Practice giving answers in 30 seconds before providing detail",
            "Replace 'It depends' with 'Here's what I'd do and why'",
            "Cut your presentation deck by 50% - focus on key points only"
          ],
          successMetric: "Complete 5 calls where you led with recommendations, not context"
        },
        {
          week: 3,
          theme: "Asking for Decisions",
          actions: [
            "Set specific decision deadlines with prospects: 'Let's plan to decide by [date]'",
            "Practice the question: 'What's preventing us from moving forward today?'",
            "When deals stall, call to get a definitive yes or no",
            "Create urgency by quantifying cost of delay"
          ],
          successMetric: "Ask for a decision in every qualified opportunity"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Track your decision-to-action ratio and aim for faster cycles",
            "Build 'good enough' standards - when analysis is sufficient, not perfect",
            "Balance thoroughness with momentum",
            "Reflect: When did faster action lead to better outcomes?"
          ],
          successMetric: "Close a deal faster than your typical sales cycle"
        }
      ]
    },
    // Beaver developing Penguin skills
    "beaver_penguin": {
      animalType: "beaver",
      focusArea: "Relationship Building & Energy",
      dailyHabit: "Start every call with 3 minutes of personal conversation before business",
      weeks: [
        {
          week: 1,
          theme: "Warming Up",
          actions: [
            "Add personal questions to your discovery call framework",
            "Learn one personal detail about each prospect before data discussions",
            "Practice small talk with colleagues to build comfort",
            "Record yourself and listen for warmth and friendliness in tone"
          ],
          successMetric: "Have 5 calls where prospects share something personal"
        },
        {
          week: 2,
          theme: "Building Connection",
          actions: [
            "Share a brief personal story or opinion in 3 sales conversations",
            "Send a non-business article or content to 5 prospects based on their interests",
            "Comment on or like prospects' social media posts",
            "Use more expressive language: 'I'm excited about...' 'I really think...'"
          ],
          successMetric: "Receive a personal response (not just business) from a prospect"
        },
        {
          week: 3,
          theme: "Networking",
          actions: [
            "Attend one industry event or virtual networking session",
            "Ask 3 current customers for introductions to others",
            "Connect people in your network who should know each other",
            "Schedule a coffee chat with someone interesting - no agenda"
          ],
          successMetric: "Generate a lead from networking or referral"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Build relationship time into your sales process formally",
            "Create systems for remembering personal details (CRM notes)",
            "Practice moving between rapport and business naturally",
            "Reflect: How has relationship focus affected deal outcomes?"
          ],
          successMetric: "Win a deal where the prospect chose you partly because they liked you"
        }
      ]
    },
    // Beaver developing Retriever skills
    "beaver_retriever": {
      animalType: "beaver",
      focusArea: "Trust & Patience",
      dailyHabit: "Send one supportive message to a prospect or customer with no ask attached",
      weeks: [
        {
          week: 1,
          theme: "Active Support",
          actions: [
            "Create helpful resources (guides, checklists) to give away freely",
            "Ask 'How can I support you?' in every conversation",
            "Follow up on personal things prospects mentioned",
            "Offer to help with something outside your product scope"
          ],
          successMetric: "Have 3 prospects explicitly thank you for your support"
        },
        {
          week: 2,
          theme: "Patient Communication",
          actions: [
            "Practice accepting 'not yet' without countering with more data",
            "Add buffer time to your estimates - then deliver early",
            "Create a 6-month nurture track for prospects who aren't ready",
            "Respond to concerns with empathy before solutions"
          ],
          successMetric: "Successfully nurture a prospect who said 'not now' into a future conversation"
        },
        {
          week: 3,
          theme: "Long-term Thinking",
          actions: [
            "Check in with 5 existing customers to see how they're doing",
            "Build a referral strategy based on customer relationships, not just results",
            "Identify and remove any 'fine print' that could damage trust later",
            "Practice the phrase: 'I want what's best for you, even if it's not us'"
          ],
          successMetric: "Receive an unsolicited referral from a happy customer"
        },
        {
          week: 4,
          theme: "Integration",
          actions: [
            "Balance data precision with emotional intelligence",
            "Build 'care' touchpoints into your sales process",
            "Create follow-up templates that lead with support, not pitching",
            "Reflect: How has a support-first approach affected customer relationships?"
          ],
          successMetric: "Expand an existing account through trust and relationship"
        }
      ]
    }
  };

  const key = `${primaryType}_${targetType}`;
  return plans[key] || plans[`${primaryType}_lion`]; // Fallback to Lion development if combo not found
}

// ============================================
// PRIMARY MASTERY 30-DAY PLANS
// ============================================

export interface PrimaryMasteryPlan {
  primaryType: AnimalType;
  secondaryType: AnimalType;
  title: string;
  subtitle: string;
  dailyHabit: string;
  weeks: WeeklyAction[];
}

export function getPrimaryMasteryPlan(
  primaryType: AnimalType,
  secondaryType: AnimalType
): PrimaryMasteryPlan {
  const plans: Record<AnimalType, PrimaryMasteryPlan> = {
    lion: {
      primaryType: "lion",
      secondaryType: secondaryType,
      title: "Mastering Your Lion Strengths",
      subtitle: "Maximize your drive and directness while avoiding burnout",
      dailyHabit: "Set one clear, measurable goal each morning and track your progress by end of day",
      weeks: [
        {
          week: 1,
          theme: "Sharpening Your Closing Edge",
          actions: [
            "Review your last 10 deals - identify patterns in what made you close successfully",
            "Create a 'power hour' each day dedicated solely to closing activities",
            "Practice 3 different closing techniques and note which feels most natural",
            "Set specific revenue targets for the week and track daily progress"
          ],
          successMetric: "Close at least 2 deals using intentional closing techniques"
        },
        {
          week: 2,
          theme: "Strategic Urgency Creation",
          actions: [
            "Develop 3 legitimate urgency drivers for your product/service (not fake deadlines)",
            "Practice quantifying the cost of inaction for prospects",
            "Create a 'decision timeline' template to share with prospects",
            "Identify and push forward 3 stalled deals with renewed urgency"
          ],
          successMetric: "Shorten your average sales cycle by at least 1 step"
        },
        {
          week: 3,
          theme: `Leveraging Your ${secondaryType === "penguin" ? "Penguin" : secondaryType === "retriever" ? "Retriever" : secondaryType === "beaver" ? "Beaver" : "Secondary"} Side`,
          actions: [
            secondaryType === "penguin"
              ? "Use your Penguin energy to build excitement before going for the close"
              : secondaryType === "retriever"
              ? "Use your Retriever patience to let high-value deals develop naturally"
              : secondaryType === "beaver"
              ? "Use your Beaver preparation to anticipate objections before they arise"
              : "Identify 2 situations where your secondary style serves you better",
            "Practice switching between Lion directness and your secondary approach mid-conversation",
            "Note which prospects respond better to your secondary style",
            "Develop a 'style switch' trigger - when X happens, try Y approach"
          ],
          successMetric: "Successfully use your secondary style to save or advance 2 deals"
        },
        {
          week: 4,
          theme: "Sustainable High Performance",
          actions: [
            "Audit your energy - when are you most effective for closing vs. nurturing?",
            "Build a weekly rhythm that matches your Lion intensity to high-value activities",
            "Create boundaries to protect your drive from low-value distractions",
            "Identify one Lion tendency to dial back when it's hurting you"
          ],
          successMetric: "Maintain your closing rate while working more strategically (not just harder)"
        }
      ]
    },
    penguin: {
      primaryType: "penguin",
      secondaryType: secondaryType,
      title: "Mastering Your Penguin Strengths",
      subtitle: "Amplify your natural charisma while building consistency",
      dailyHabit: "Reach out to one person in your network just to connect - no agenda",
      weeks: [
        {
          week: 1,
          theme: "Maximizing Your Relationship Network",
          actions: [
            "Map your top 20 relationships and identify untapped referral potential",
            "Schedule 'relationship maintenance' time - 3 catch-up calls with past clients",
            "Turn one casual connection into a strategic partnership conversation",
            "Ask for 2 introductions from people who love working with you"
          ],
          successMetric: "Generate 3 warm leads purely from relationship outreach"
        },
        {
          week: 2,
          theme: "Turning Enthusiasm into Momentum",
          actions: [
            "Identify your 'enthusiasm triggers' - what gets you genuinely excited to share",
            "Create a story bank: 5 success stories you can tell with authentic energy",
            "Practice channeling excitement into specific value propositions",
            "Use your energy to create urgency without pressure"
          ],
          successMetric: "Have 3 prospects say 'your enthusiasm is contagious' or similar"
        },
        {
          week: 3,
          theme: `Leveraging Your ${secondaryType === "lion" ? "Lion" : secondaryType === "retriever" ? "Retriever" : secondaryType === "beaver" ? "Beaver" : "Secondary"} Side`,
          actions: [
            secondaryType === "lion"
              ? "Use your Lion directness to ask for decisions when rapport is high"
              : secondaryType === "retriever"
              ? "Use your Retriever depth to turn surface relationships into deep trust"
              : secondaryType === "beaver"
              ? "Use your Beaver precision to back up your enthusiasm with solid data"
              : "Identify 2 situations where your secondary style serves you better",
            "Practice the handoff: build excitement (Penguin) then pivot to your secondary strength",
            "Notice which deals need more of your secondary style to close",
            "Create a checklist: 'Before I get too excited, have I...'"
          ],
          successMetric: "Close 2 deals by combining Penguin rapport with secondary style execution"
        },
        {
          week: 4,
          theme: "Building Consistency Into Creativity",
          actions: [
            "Create templates for follow-up that still feel personal (not robotic)",
            "Build a 'promise tracker' to ensure your enthusiasm leads to follow-through",
            "Develop a system to capture the commitments you make in conversation",
            "Schedule 'admin time' to turn relationship energy into documented progress"
          ],
          successMetric: "Achieve 100% follow-through on promises made this week"
        }
      ]
    },
    retriever: {
      primaryType: "retriever",
      secondaryType: secondaryType,
      title: "Mastering Your Retriever Strengths",
      subtitle: "Deepen your trust-building while driving results",
      dailyHabit: "Send one genuine 'thinking of you' message to a client or prospect",
      weeks: [
        {
          week: 1,
          theme: "Deepening Trust Into Loyalty",
          actions: [
            "Identify your top 10 relationships and create a personalized value-add for each",
            "Reach out to 3 past clients to see how they're doing (no pitch)",
            "Document what you know about each key contact's personal life and goals",
            "Create a 'trust deposit' plan - consistent small touches that build over time"
          ],
          successMetric: "Receive unprompted positive feedback from 2 clients about your support"
        },
        {
          week: 2,
          theme: "Converting Trust to Referrals",
          actions: [
            "Ask 5 happy clients: 'Who else do you know who might benefit from this?'",
            "Create a simple referral process that feels natural, not salesy",
            "Follow up on every referral within 24 hours with a warm intro",
            "Thank referrers meaningfully (not just transactionally)"
          ],
          successMetric: "Generate 3 qualified referrals from existing relationships"
        },
        {
          week: 3,
          theme: `Leveraging Your ${secondaryType === "lion" ? "Lion" : secondaryType === "penguin" ? "Penguin" : secondaryType === "beaver" ? "Beaver" : "Secondary"} Side`,
          actions: [
            secondaryType === "lion"
              ? "Use your Lion side to ask for the close when trust is established"
              : secondaryType === "penguin"
              ? "Use your Penguin energy to express genuine excitement about helping"
              : secondaryType === "beaver"
              ? "Use your Beaver thoroughness to demonstrate expertise, building deeper trust"
              : "Identify 2 situations where your secondary style serves you better",
            "Practice using your secondary style for 'the ask' after building trust",
            "Identify deals where being 'too supportive' is stalling progress",
            "Create scripts that combine warmth with forward momentum"
          ],
          successMetric: "Move 2 long-standing relationships to the next stage by adding secondary style"
        },
        {
          week: 4,
          theme: "Protecting Your Energy While Serving",
          actions: [
            "Audit your time: where are you over-serving low-value relationships?",
            "Create boundaries that let you say 'not right now' while preserving relationships",
            "Identify clients who take more than they give - develop a strategy",
            "Build in recovery time after high-empathy interactions"
          ],
          successMetric: "Maintain relationship quality while reclaiming 3+ hours of time"
        }
      ]
    },
    beaver: {
      primaryType: "beaver",
      secondaryType: secondaryType,
      title: "Mastering Your Beaver Strengths",
      subtitle: "Leverage your expertise while accelerating action",
      dailyHabit: "Share one piece of valuable insight or data with a prospect or client",
      weeks: [
        {
          week: 1,
          theme: "Turning Expertise Into Authority",
          actions: [
            "Document your top 5 insights that prospects consistently find valuable",
            "Create a 'credibility kit' - case studies, data points, proof that you know your stuff",
            "Practice explaining complex topics in 60 seconds or less",
            "Position yourself as a trusted advisor, not just a vendor"
          ],
          successMetric: "Have 3 prospects explicitly acknowledge your expertise"
        },
        {
          week: 2,
          theme: "Preparation as Competitive Advantage",
          actions: [
            "Create a pre-meeting research checklist that takes 15 minutes max",
            "Develop industry-specific talk tracks that showcase your knowledge",
            "Build a library of relevant questions for different buyer scenarios",
            "Anticipate the top 3 objections for your next 5 calls and prepare responses"
          ],
          successMetric: "Have 2 prospects comment on how well-prepared you were"
        },
        {
          week: 3,
          theme: `Leveraging Your ${secondaryType === "lion" ? "Lion" : secondaryType === "penguin" ? "Penguin" : secondaryType === "retriever" ? "Retriever" : "Secondary"} Side`,
          actions: [
            secondaryType === "lion"
              ? "Use your Lion directness to move from analysis to recommendation faster"
              : secondaryType === "penguin"
              ? "Use your Penguin warmth to make your expertise feel accessible, not intimidating"
              : secondaryType === "retriever"
              ? "Use your Retriever patience to support clients through complex decisions"
              : "Identify 2 situations where your secondary style serves you better",
            "Practice leading with your secondary style, then backing it with Beaver proof",
            "Note which prospects need connection before they'll accept your data",
            "Develop a 'warm expert' approach - knowledgeable but approachable"
          ],
          successMetric: "Close 2 deals by combining expertise with secondary style connection"
        },
        {
          week: 4,
          theme: "Speed Without Sacrificing Quality",
          actions: [
            "Identify your 'good enough' threshold - when is more analysis not helpful?",
            "Create templates that maintain quality while reducing prep time",
            "Practice giving recommendations with 80% information (not waiting for 100%)",
            "Set time limits for analysis: when the timer goes, make the call"
          ],
          successMetric: "Reduce average prep time by 25% while maintaining win rate"
        }
      ]
    }
  };

  return {
    ...plans[primaryType],
    secondaryType: secondaryType
  };
}

// ============================================
// 4. SELF-COACHING QUESTIONS
// ============================================

export interface CoachingQuestion {
  category: string;
  question: string;
  followUp: string;
}

export const selfCoachingQuestions: Record<AnimalType, CoachingQuestion[]> = {
  lion: [
    {
      category: "Pace & Patience",
      question: "When did you last lose a deal because you pushed too hard or too fast?",
      followUp: "What signals did you miss that the prospect needed more time?"
    },
    {
      category: "Relationship Building",
      question: "How much do you know about your top 5 prospects as people, not just buyers?",
      followUp: "What's one thing you could ask them about that isn't business-related?"
    },
    {
      category: "Listening vs. Telling",
      question: "In your last sales call, what percentage of the time were you talking vs. listening?",
      followUp: "What might you have learned if you'd asked one more question before presenting?"
    },
    {
      category: "Team Dynamics",
      question: "When did you last acknowledge a colleague's contribution to a win?",
      followUp: "How might sharing credit affect your long-term success?"
    },
    {
      category: "Emotional Intelligence",
      question: "Think of a prospect who seems 'slow' to you. What might they be experiencing that explains their pace?",
      followUp: "How could meeting them where they are actually accelerate the deal?"
    }
  ],
  penguin: [
    {
      category: "Follow-Through",
      question: "What promises have you made in the last week that you haven't yet kept?",
      followUp: "What system could help you track and deliver on commitments?"
    },
    {
      category: "Depth vs. Breadth",
      question: "Are you spreading yourself too thin across too many relationships?",
      followUp: "Which 10 relationships deserve your deepest attention right now?"
    },
    {
      category: "Asking for the Close",
      question: "When did you last avoid asking for a decision because you didn't want to seem pushy?",
      followUp: "What's the cost to both you and the prospect of extending their uncertainty?"
    },
    {
      category: "Substance Over Style",
      question: "Do prospects see you as fun to talk to, or as an expert who can solve their problems?",
      followUp: "What's one way you could demonstrate deeper expertise in your next conversation?"
    },
    {
      category: "Realistic Expectations",
      question: "Think of a deal you lost. Did you see it coming, or did optimism blind you?",
      followUp: "What early warning signs should you watch for in current deals?"
    }
  ],
  retriever: [
    {
      category: "Assertiveness",
      question: "What do you need to say to a prospect that you've been avoiding?",
      followUp: "What's the worst that could happen if you said it directly?"
    },
    {
      category: "Boundary Setting",
      question: "Where have you over-extended yourself for a customer at your own expense?",
      followUp: "How can you serve them well AND protect your own time and energy?"
    },
    {
      category: "Asking for What You Want",
      question: "When did you last negotiate for yourself as hard as you'd negotiate for a customer?",
      followUp: "What would you ask for if you knew the answer would be yes?"
    },
    {
      category: "Comfortable with Conflict",
      question: "Is there a necessary but uncomfortable conversation you've been postponing?",
      followUp: "What would it feel like to have it behind you?"
    },
    {
      category: "Taking Credit",
      question: "Do people know about the value you've created, or do you downplay your contributions?",
      followUp: "How could appropriate self-advocacy actually help others trust you more?"
    }
  ],
  beaver: [
    {
      category: "Speed vs. Perfection",
      question: "What task are you over-preparing for that could be 'good enough' today?",
      followUp: "What's the real risk of moving forward with 80% of the information?"
    },
    {
      category: "Human Connection",
      question: "Think of your last 5 sales conversations. How many included anything personal?",
      followUp: "What's one personal question you could add to your next call?"
    },
    {
      category: "Flexibility",
      question: "When did you last change your approach based on who you were talking to?",
      followUp: "How might being less attached to your process serve certain buyers better?"
    },
    {
      category: "Emotional Factors",
      question: "Beyond logic, what emotional factors might be influencing your current prospects?",
      followUp: "How could you address feelings, not just facts, in your next conversation?"
    },
    {
      category: "Action Bias",
      question: "What analysis are you doing that's actually procrastination in disguise?",
      followUp: "What would happen if you took action right now with what you know?"
    }
  ]
};

// ============================================
// 5. RED FLAG SCENARIOS
// ============================================

export interface RedFlagScenario {
  trigger: string;
  internalSign: string;
  correction: string;
  betterApproach: string;
}

export const redFlagScenarios: Record<AnimalType, RedFlagScenario[]> = {
  lion: [
    {
      trigger: "The prospect asks for more time to think",
      internalSign: "You feel the urge to overcome the objection immediately or create artificial urgency",
      correction: "Pause. Ask what specifically they need to consider. Offer to support their process.",
      betterApproach: "Say: 'I understand. What information would help you feel confident about a decision?'"
    },
    {
      trigger: "A meeting is running long without clear progress",
      internalSign: "You start checking your watch, interrupting, or pushing to 'get to the point'",
      correction: "Some buyers need to process verbally. Your impatience signals you don't value their input.",
      betterApproach: "Ask a clarifying question that shows you're engaged: 'That's interesting - tell me more about [specific thing they said].'"
    },
    {
      trigger: "The deal requires multiple stakeholder approvals",
      internalSign: "You try to go around 'blockers' or push your champion to override others",
      correction: "This damages trust and often backfires. Work with the process, not against it.",
      betterApproach: "Say: 'Who else needs to be comfortable with this? Let's make sure they have what they need.'"
    },
    {
      trigger: "A prospect expresses concerns about your solution",
      internalSign: "You immediately counter their concern with evidence or competitive comparisons",
      correction: "Defending too quickly makes you seem dismissive. First acknowledge, then address.",
      betterApproach: "Say: 'That's a fair concern. Can you tell me more about what's driving that worry?'"
    },
    {
      trigger: "You've 'won' a negotiation on price or terms",
      internalSign: "You feel triumphant or think about how you got the better end of the deal",
      correction: "If the customer feels like they lost, you've damaged the relationship for future business.",
      betterApproach: "Aim for deals where both sides feel good. A sustainable win is better than a maximum win."
    }
  ],
  penguin: [
    {
      trigger: "A prospect seems excited and wants to move fast",
      internalSign: "You match their excitement and skip qualification or discovery steps",
      correction: "Enthusiasm isn't the same as fit. Slow down to ensure this is actually a good opportunity.",
      betterApproach: "Say: 'I love your energy! Let me make sure we're the right fit - can I ask a few quick questions?'"
    },
    {
      trigger: "You're about to commit to a timeline or feature",
      internalSign: "You're saying yes because it feels good in the moment, not because you've checked",
      correction: "Over-promising destroys trust faster than under-delivering builds it.",
      betterApproach: "Say: 'I want to give you an accurate answer. Let me verify that and get back to you by [specific time].'"
    },
    {
      trigger: "A deal has been 'almost closed' for weeks",
      internalSign: "You keep believing it will happen because the relationship feels good",
      correction: "Good relationships don't always equal closed deals. Get real about where this stands.",
      betterApproach: "Ask directly: 'I want to be honest - are we still moving forward, or have things changed?'"
    },
    {
      trigger: "A prospect asks a detailed technical question",
      internalSign: "You give a confident answer based on general knowledge, not specifics",
      correction: "Analytical buyers will fact-check you. Wrong answers damage credibility.",
      betterApproach: "Say: 'Great question - I want to make sure I give you the accurate details. Can I get back to you with the specifics?'"
    },
    {
      trigger: "You're spending a lot of time with a friendly prospect",
      internalSign: "Conversations are fun but aren't progressing toward a decision",
      correction: "Relationship warmth can mask lack of progress. Separate liking someone from qualifying them.",
      betterApproach: "Set a gentle checkpoint: 'I'm really enjoying our conversations. Help me understand - what would need to happen for this to become a priority?'"
    }
  ],
  retriever: [
    {
      trigger: "A prospect asks for something that stretches your boundaries",
      internalSign: "You say yes because you want to be helpful, even though it's not sustainable",
      correction: "Saying yes now and failing later is worse than setting boundaries upfront.",
      betterApproach: "Say: 'I want to help, and I also want to be realistic. Here's what I can commit to confidently.'"
    },
    {
      trigger: "It's time to ask for the close",
      internalSign: "You think of one more thing you could do to add value first",
      correction: "Endless value-adding can actually signal lack of confidence. They're ready - ask.",
      betterApproach: "Say: 'I think we've covered everything important. Are you ready to move forward?'"
    },
    {
      trigger: "A customer makes an unreasonable demand",
      internalSign: "You immediately try to figure out how to make it work to keep them happy",
      correction: "Not all requests should be met. Healthy relationships have boundaries.",
      betterApproach: "Say: 'I want to understand what's driving this request. Help me see it from your perspective, and then I'll share what I can do.'"
    },
    {
      trigger: "A competitor says something negative about you",
      internalSign: "You stay silent because you don't want to seem aggressive or 'salesy'",
      correction: "Failing to defend yourself can actually hurt your prospect by letting misinformation stand.",
      betterApproach: "Calmly correct: 'I've heard that before. Here's what's actually true, and I'm happy to provide evidence.'"
    },
    {
      trigger: "You have an opinion that differs from the prospect's",
      internalSign: "You soften or withhold your view to avoid potential disagreement",
      correction: "They're paying for your expertise, not your agreement. Respectful challenge builds trust.",
      betterApproach: "Say: 'I see it a little differently, and I think it's worth sharing. Can I give you another perspective?'"
    }
  ],
  beaver: [
    {
      trigger: "You don't have complete information but need to respond",
      internalSign: "You delay response to gather more data, even when timing matters",
      correction: "Perfectionism can cost you deals. Sometimes 'good enough now' beats 'perfect later.'",
      betterApproach: "Say: 'Based on what I know now, here's my recommendation. I can refine this as we learn more.'"
    },
    {
      trigger: "A prospect makes a decision based on emotion or relationship",
      internalSign: "You feel frustrated that they're not being 'logical' about the evaluation",
      correction: "Emotions are valid decision factors. Meet people where they are, not where you think they should be.",
      betterApproach: "Acknowledge their process: 'It sounds like the relationship aspect is really important to you. Tell me more about what you're looking for there.'"
    },
    {
      trigger: "You're preparing for an important meeting",
      internalSign: "You keep researching and adding slides instead of practicing delivery",
      correction: "Overloaded presentations lose attention. Preparation isn't just content - it's also connection.",
      betterApproach: "Cap prep time. Spend the last 30% practicing how you'll deliver, not what you'll deliver."
    },
    {
      trigger: "A prospect wants to move faster than your process suggests",
      internalSign: "You resist because 'we haven't covered everything yet'",
      correction: "Your process serves the buyer - if they're ready, follow their lead.",
      betterApproach: "Say: 'It sounds like you're ready to move forward. Let me make sure we cover the essentials and we can accelerate from there.'"
    },
    {
      trigger: "Small talk happens at the start of a call",
      internalSign: "You feel impatient to get to the 'real' agenda items",
      correction: "Rapport isn't wasted time - it's the foundation of trust. Invest in it.",
      betterApproach: "Set a mental goal: Learn one personal thing about them before discussing business."
    }
  ]
};

// ============================================
// 6. UNIQUE PROFILE NARRATIVE GENERATOR
// ============================================

export function generateUniqueProfileNarrative(
  scores: Record<AnimalType, number>,
  primaryType: AnimalType,
  secondaryType: AnimalType,
  salesContext: SalesContext
): string {
  const primary = scores[primaryType];
  const secondary = scores[secondaryType];

  // Calculate profile characteristics
  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const dominant = primary >= 40;
  const balanced = primary - secondary <= 10;
  const third = sortedScores[2][1];
  const fourth = sortedScores[3][1];
  const hasStrongThird = third >= 20;
  const isQuadBalanced = primary - fourth <= 20;

  // Animal names for readability
  const animalNames: Record<AnimalType, string> = {
    lion: "Lion",
    penguin: "Penguin",
    retriever: "Golden Retriever",
    beaver: "Beaver"
  };

  // Context labels
  const contextLabels = {
    sellType: salesContext.sellType === "product" ? "product" : "service",
    customerType: salesContext.customerType === "b2b" ? "business" : "consumer",
    channel: salesContext.salesChannel === "inside" ? "virtual" : "in-person"
  };

  let narrative = "";

  // Opening based on dominance
  if (dominant) {
    narrative += `With ${primary}% ${animalNames[primaryType]} energy, you have a clearly defined selling style that shapes how you approach every conversation. `;
  } else if (balanced) {
    narrative += `Your profile shows a sophisticated blend of ${animalNames[primaryType]} (${primary}%) and ${animalNames[secondaryType]} (${secondary}%), giving you natural versatility in your approach. `;
  } else if (isQuadBalanced) {
    narrative += `You have a remarkably balanced profile, with meaningful scores across all four styles. This gives you chameleon-like ability to adapt, though it may sometimes make it harder to know which approach to lead with. `;
  } else {
    narrative += `Your ${primary}% ${animalNames[primaryType]} score is your dominant mode, complemented by ${animalNames[secondaryType]} tendencies (${secondary}%) that add nuance to your approach. `;
  }

  // Primary type description in context
  if (primaryType === "lion") {
    narrative += `In ${contextLabels.customerType} ${contextLabels.sellType} sales, your directness and drive for results serve you well - you cut through complexity and push deals forward. `;
    if (contextLabels.channel === "virtual") {
      narrative += `In your virtual selling environment, this means you likely run tight, efficient calls and expect quick decisions. `;
    } else {
      narrative += `Your in-person presence commands attention and respect in meetings. `;
    }
  } else if (primaryType === "penguin") {
    narrative += `In ${contextLabels.customerType} ${contextLabels.sellType} sales, your ability to build genuine connections and create excitement makes prospects want to work with you. `;
    if (contextLabels.channel === "virtual") {
      narrative += `Even through a screen, your energy and enthusiasm come through, making virtual meetings feel more personal. `;
    } else {
      narrative += `Face-to-face, your warmth and charisma make you memorable in a sea of salespeople. `;
    }
  } else if (primaryType === "retriever") {
    narrative += `In ${contextLabels.customerType} ${contextLabels.sellType} sales, your patience and genuine care for client success create deep, lasting relationships. `;
    if (contextLabels.channel === "virtual") {
      narrative += `Your thoughtful follow-ups and consistent presence build trust even without meeting in person. `;
    } else {
      narrative += `In-person, clients sense your authenticity and feel comfortable opening up about their real needs. `;
    }
  } else {
    narrative += `In ${contextLabels.customerType} ${contextLabels.sellType} sales, your expertise and thorough preparation build credibility that competitors can't match. `;
    if (contextLabels.channel === "virtual") {
      narrative += `Virtual selling plays to your strengths - you can share detailed documentation and follow up with comprehensive materials. `;
    } else {
      narrative += `In meetings, your command of details instills confidence that you've thought through everything. `;
    }
  }

  // Secondary influence
  if (secondary >= 20) {
    if (secondaryType === "lion") {
      narrative += `Your ${secondary}% Lion influence adds competitive edge and closing instinct to your style. `;
    } else if (secondaryType === "penguin") {
      narrative += `The ${secondary}% Penguin in you adds warmth and relationship-building ability that softens your approach when needed. `;
    } else if (secondaryType === "retriever") {
      narrative += `Your ${secondary}% Golden Retriever side ensures you never sacrifice relationships for short-term wins. `;
    } else {
      narrative += `With ${secondary}% Beaver influence, you bring more preparation and attention to detail than your primary style might suggest. `;
    }
  }

  // Third type if significant
  if (hasStrongThird) {
    const thirdType = sortedScores[2][0] as AnimalType;
    narrative += `Notably, your ${third}% ${animalNames[thirdType]} score gives you additional range - `;
    if (thirdType === "lion") {
      narrative += `you can tap into directness and urgency when deals need pushing forward. `;
    } else if (thirdType === "penguin") {
      narrative += `you can bring energy and enthusiasm when situations call for it. `;
    } else if (thirdType === "retriever") {
      narrative += `you can shift into supportive, patient mode when clients need it. `;
    } else {
      narrative += `you can go deep on details and data when analytical buyers require it. `;
    }
  }

  // Weakest area insight
  const weakestType = sortedScores[3][0] as AnimalType;
  const weakestScore = sortedScores[3][1];
  narrative += `Your ${weakestScore}% ${animalNames[weakestType]} score represents your growth edge - `;
  if (weakestType === "lion") {
    narrative += `developing more directness in asking for decisions and handling objections will expand your effectiveness. `;
  } else if (weakestType === "penguin") {
    narrative += `building more enthusiasm and relationship warmth will help you connect with socially-oriented buyers. `;
  } else if (weakestType === "retriever") {
    narrative += `cultivating more patience and long-term relationship focus will help you with trust-driven buyers. `;
  } else {
    narrative += `strengthening your preparation and detail orientation will help you win with analytical buyers. `;
  }

  // Closing insight
  narrative += `This unique combination of ${primary}% ${animalNames[primaryType]}, ${secondary}% ${animalNames[secondaryType]}, ${third}% ${animalNames[sortedScores[2][0] as AnimalType]}, and ${fourth}% ${animalNames[weakestType]} creates a profile that is distinctly yours - understanding these tendencies is the first step to intentionally adapting your approach for different buyers and situations.`;

  return narrative;
}

export function getSalesScripts(type: AnimalType): SalesScripts {
  return salesScripts[type];
}

export function getObjectionHandling(buyerType: AnimalType): ObjectionResponse[] {
  return objectionHandling[buyerType];
}

export function getSelfCoachingQuestions(type: AnimalType): CoachingQuestion[] {
  return selfCoachingQuestions[type];
}

export function getRedFlagScenarios(type: AnimalType): RedFlagScenario[] {
  return redFlagScenarios[type];
}
