import { AnimalType, Industry } from "@/types";

export interface IndustryTipContent {
  industryName: string;
  strengths: string[];
  tips: string[];
  scenarios: { situation: string; approach: string }[];
}

export const industryLabels: Record<Industry, string> = {
  tech: "Tech/SaaS",
  financial: "Financial Services",
  realestate: "Real Estate",
  professional: "Professional Services",
};

export const industryTips: Record<Industry, Record<AnimalType, IndustryTipContent>> = {
  // TECH/SAAS BUYERS
  tech: {
    lion: {
      industryName: "Tech/SaaS",
      strengths: [
        "Tech buyers appreciate your directness and ability to get to the point quickly",
        "Your confidence resonates with fast-paced tech executives and founders",
        "You can match the urgency of tech decision-makers who move fast",
        "Your results-focus aligns with data-driven tech cultures",
      ],
      tips: [
        "Tech buyers value efficiency — skip the small talk and lead with value",
        "Speak their language: ROI, scalability, integration, time-to-value",
        "Be prepared for technical questions — have a specialist ready if needed",
        "Tech buyers research heavily — they may know your product before you meet",
        "Respect their time — they're often juggling multiple priorities",
      ],
      scenarios: [
        {
          situation: "A CTO says they're too busy for a meeting this quarter",
          approach: "Be direct about the value: 'I understand — I'll take 10 minutes max. If I can't show clear ROI in that time, I'll leave. Fair?' Tech buyers respect boldness.",
        },
        {
          situation: "A tech buyer keeps asking detailed technical questions",
          approach: "Don't bluff. Say: 'Great question — let me get you an exact answer from our engineering team.' Tech buyers respect honesty over handwaving.",
        },
        {
          situation: "The tech buyer seems skeptical of your claims",
          approach: "Offer proof: 'I hear the skepticism — totally fair. Let me connect you with [similar company] who saw [specific result].' Tech buyers trust peer validation.",
        },
      ],
    },
    penguin: {
      industryName: "Tech/SaaS",
      strengths: [
        "Your enthusiasm can energize tech teams excited about innovation",
        "Tech buyers enjoy exploring new possibilities — you can brainstorm with them",
        "Your relationship skills help navigate complex stakeholder environments",
        "You bring energy to demo calls that can differentiate from boring competitors",
      ],
      tips: [
        "Channel your energy into their tech vision — what could they build with your solution?",
        "Tech buyers love innovation stories — share exciting use cases",
        "Be ready to go deep on details — tech buyers will test your knowledge",
        "Balance enthusiasm with substance — tech buyers are naturally skeptical",
        "Connect with their passion for technology and building things",
      ],
      scenarios: [
        {
          situation: "A product manager wants to explore all the possibilities",
          approach: "Match their exploration energy but guide it: 'I love your vision! Let's prioritize — which of these would have the biggest impact in 90 days?' Keep them focused.",
        },
        {
          situation: "A tech buyer seems unimpressed by your enthusiasm",
          approach: "Shift to substance: 'Let me show you the actual data behind this.' Tech buyers respond to proof over promises.",
        },
        {
          situation: "The tech team is excited but there's no clear decision-maker",
          approach: "Ask directly: 'Who signs off on this? I want to make sure we're building the right case for them too.' Use your relationship skills to navigate.",
        },
      ],
    },
    retriever: {
      industryName: "Tech/SaaS",
      strengths: [
        "Your patience helps with tech buyers who need time to evaluate thoroughly",
        "Tech teams appreciate your genuine interest in understanding their challenges",
        "Your collaborative nature fits well with consensus-driven tech decisions",
        "You build trust that leads to long-term partnerships tech companies value",
      ],
      tips: [
        "Tech buyers may seem blunt — don't take directness personally",
        "Ask about their tech stack and challenges — show genuine curiosity",
        "Be patient with their evaluation process but keep momentum",
        "Focus on how you'll support them post-sale — tech buyers value partnerships",
        "Learn enough technical language to have meaningful conversations",
      ],
      scenarios: [
        {
          situation: "A tech buyer is being very direct and seems impatient",
          approach: "Adapt your pace: 'Let me cut to what matters most — here's the key benefit for your team.' Match their directness while staying warm.",
        },
        {
          situation: "Multiple stakeholders keep adding requirements",
          approach: "Your patience is an asset: 'I want to make sure everyone's needs are covered. Can we schedule a group call to align?' Facilitate consensus.",
        },
        {
          situation: "The tech buyer goes quiet after initial interest",
          approach: "Reach out genuinely: 'Just checking in — I know you're busy. Is there anything blocking progress I can help with?' Your care often resurfaces stalled deals.",
        },
      ],
    },
    beaver: {
      industryName: "Tech/SaaS",
      strengths: [
        "Tech buyers appreciate your thorough preparation and attention to detail",
        "Your methodical approach matches their analytical evaluation process",
        "You can navigate complex technical requirements and documentation",
        "Your reliability builds trust with quality-focused tech teams",
      ],
      tips: [
        "Come prepared with specs, integrations, and technical documentation",
        "Tech buyers will verify your claims — make sure everything is accurate",
        "Create detailed comparison materials that help their evaluation",
        "Offer clear implementation timelines and success metrics",
        "Be ready for security and compliance questions with thorough answers",
      ],
      scenarios: [
        {
          situation: "A tech buyer asks for detailed technical specifications",
          approach: "You're ready for this: 'I have a comprehensive technical document — let me walk you through the key sections relevant to your stack.' Your preparation shines.",
        },
        {
          situation: "The tech buyer wants to move faster than you're comfortable with",
          approach: "Advocate for quality: 'I want this to succeed. Can we take one more day to verify [specific item]? It'll prevent issues later.' Tech buyers respect thoroughness.",
        },
        {
          situation: "A tech buyer challenges your methodology",
          approach: "Engage substantively: 'That's a fair question — here's the data behind our approach. I'm curious what you've seen work.' Show expertise without being defensive.",
        },
      ],
    },
  },

  // FINANCIAL SERVICES BUYERS
  financial: {
    lion: {
      industryName: "Financial Services",
      strengths: [
        "Financial buyers respect your confidence when discussing significant decisions",
        "Your directness cuts through the formality that often slows finance deals",
        "You can match the intensity of finance executives making high-stakes choices",
        "Your results-focus resonates with ROI-driven financial decision-makers",
      ],
      tips: [
        "Financial buyers are risk-aware — back confidence with data and proof",
        "Speak their language: compliance, risk mitigation, audit trails, ROI",
        "Respect their regulatory constraints — don't push against compliance",
        "Be prepared for longer cycles — finance moves carefully by design",
        "Build credibility by understanding their regulatory environment",
      ],
      scenarios: [
        {
          situation: "A CFO keeps asking about compliance and risk",
          approach: "Don't dismiss it: 'Compliance is critical — let me show you exactly how we address [specific regulation].' Your confidence paired with substance wins finance buyers.",
        },
        {
          situation: "A financial buyer says they need months to evaluate",
          approach: "Respect the process while creating focus: 'I understand — what specific information would help accelerate your evaluation?' Finance buyers appreciate efficiency within their constraints.",
        },
        {
          situation: "The finance buyer seems overly cautious",
          approach: "Reframe risk: 'I hear you. Let's discuss the risk of NOT acting — what's the cost of the status quo?' Finance buyers respond to quantified risk both ways.",
        },
      ],
    },
    penguin: {
      industryName: "Financial Services",
      strengths: [
        "Your energy can enliven conversations with formal finance professionals",
        "Financial buyers appreciate your ability to make complex topics engaging",
        "You can build relationships across multiple levels in finance organizations",
        "Your storytelling helps humanize decisions in a numbers-focused industry",
      ],
      tips: [
        "Finance buyers value substance — balance energy with solid data",
        "Share success stories from similar financial institutions they'll respect",
        "Be prepared for detailed questions — they will test your knowledge",
        "Tone down flashiness — finance culture tends toward conservative",
        "Connect on shared values like client protection and trust",
      ],
      scenarios: [
        {
          situation: "A finance buyer seems unimpressed by your enthusiasm",
          approach: "Shift gears: 'Let me get into the specifics you care about.' Lead with data and compliance details. Match their formal communication style.",
        },
        {
          situation: "The finance team wants extensive documentation before meeting",
          approach: "Provide it gladly: 'Happy to send everything upfront. What specific areas should I prioritize?' Show you respect their process.",
        },
        {
          situation: "A financial buyer keeps bringing up competitors",
          approach: "Engage professionally: 'They're solid — here's specifically where we differ on [key issue].' Finance buyers respect objective comparisons.",
        },
      ],
    },
    retriever: {
      industryName: "Financial Services",
      strengths: [
        "Financial buyers value the trust and reliability you naturally build",
        "Your patience matches finance's careful, methodical decision-making",
        "You excel at the relationship-based nature of financial services",
        "Your genuine care resonates in an industry often seen as impersonal",
      ],
      tips: [
        "Finance buyers take time — your patience is a genuine asset here",
        "Build relationships with multiple stakeholders including compliance",
        "Understand their fiduciary responsibilities and regulatory constraints",
        "Focus on long-term partnership — finance values stability",
        "Be consistent and reliable — finance penalizes unpredictability",
      ],
      scenarios: [
        {
          situation: "A finance buyer is moving very slowly through the process",
          approach: "Support their pace: 'I know you're being thorough — that's exactly right for a decision like this. What else would be helpful?' Your patience builds trust.",
        },
        {
          situation: "The finance buyer seems stressed about regulatory pressure",
          approach: "Show empathy: 'I can see compliance is a real concern. Let me show you exactly how we've helped similar firms address that.' Your care differentiates.",
        },
        {
          situation: "Multiple finance stakeholders have different concerns",
          approach: "Facilitate alignment: 'Let me understand each perspective — I want to make sure we address everyone's requirements.' Your collaborative nature helps navigate complexity.",
        },
      ],
    },
    beaver: {
      industryName: "Financial Services",
      strengths: [
        "Finance buyers deeply appreciate your thorough preparation",
        "Your attention to detail matches their compliance-focused culture",
        "You can navigate complex regulatory documentation with ease",
        "Your reliability builds the trust financial institutions require",
      ],
      tips: [
        "Bring comprehensive documentation — finance buyers expect it",
        "Understand relevant regulations and compliance requirements",
        "Be accurate in every detail — finance catches and remembers errors",
        "Create clear audit trails and documentation they can reference",
        "Your methodical approach fits naturally with finance culture",
      ],
      scenarios: [
        {
          situation: "A finance buyer asks for extensive compliance documentation",
          approach: "You're prepared: 'I have everything organized by regulation. Let me walk you through the key compliance points.' Your thoroughness is exactly what they need.",
        },
        {
          situation: "The financial buyer spots an error in your proposal",
          approach: "Own it immediately: 'You're right — thank you for catching that. Here's the corrected information.' Your honesty and precision build trust.",
        },
        {
          situation: "A complex approval process has many steps",
          approach: "Map it clearly: 'Let me create a timeline with all approvals and responsible parties.' Your organizational skills help them navigate their own process.",
        },
      ],
    },
  },

  // REAL ESTATE BUYERS
  realestate: {
    lion: {
      industryName: "Real Estate",
      strengths: [
        "Real estate buyers appreciate your decisive, action-oriented approach",
        "Your confidence helps navigate fast-moving property decisions",
        "You can match the competitive energy of real estate professionals",
        "Your directness resonates with results-focused property investors",
      ],
      tips: [
        "Real estate buyers often move quickly — match their urgency",
        "Speak their language: ROI, cap rates, appreciation, market timing",
        "Be prepared for negotiation — real estate culture is deal-focused",
        "Understand market dynamics and property-specific factors",
        "Real estate buyers respect those who can keep up with their pace",
      ],
      scenarios: [
        {
          situation: "A property investor wants a quick decision on your offering",
          approach: "Match their energy: 'Let's cut to it — here's the ROI impact and timeline.' Real estate buyers respect directness and speed.",
        },
        {
          situation: "A real estate buyer is negotiating aggressively",
          approach: "Stand firm confidently: 'I understand — let me show you why this pricing makes sense given [market factors].' They respect those who hold their ground.",
        },
        {
          situation: "The real estate buyer seems skeptical of your value proposition",
          approach: "Go to proof: 'Fair question — here's what [similar client] achieved. Let me connect you with them.' Real estate buyers trust peer validation.",
        },
      ],
    },
    penguin: {
      industryName: "Real Estate",
      strengths: [
        "Your enthusiasm can excite real estate buyers about possibilities",
        "Real estate buyers appreciate your ability to paint a vision",
        "You can build relationships across their team and partners",
        "Your energy brings life to property discussions and opportunities",
      ],
      tips: [
        "Real estate buyers appreciate vision — show them the potential",
        "Be prepared with market data to back up your enthusiasm",
        "Understand their investment goals and timeline",
        "Real estate culture values relationships — use your strength there",
        "Balance big-picture excitement with concrete specifics",
      ],
      scenarios: [
        {
          situation: "A real estate developer wants to explore new possibilities",
          approach: "Match their vision: 'I love where you're going with this — here's how we could support that growth.' Channel enthusiasm into their goals.",
        },
        {
          situation: "A property manager seems all-business with no small talk",
          approach: "Adapt quickly: 'Let me get straight to how this impacts your bottom line.' Some real estate buyers prefer efficiency over relationship-building.",
        },
        {
          situation: "The real estate buyer keeps comparing you to others",
          approach: "Differentiate with energy and specifics: 'Here's what makes us different — and I'm happy to show you proof.' Enthusiasm backed by substance wins.",
        },
      ],
    },
    retriever: {
      industryName: "Real Estate",
      strengths: [
        "Real estate is relationship-driven — your natural strength",
        "Property buyers value your patience during complex decisions",
        "You build trust that leads to long-term partnerships",
        "Your genuine care differentiates in a transactional industry",
      ],
      tips: [
        "Real estate buyers often have tight timelines — balance patience with responsiveness",
        "Build relationships with their team, not just the decision-maker",
        "Understand the emotional and financial stakes of their property decisions",
        "Your reliability is valued in an industry with many moving parts",
        "Ask about their broader property portfolio and goals",
      ],
      scenarios: [
        {
          situation: "A real estate buyer seems stressed about a tight timeline",
          approach: "Support them: 'I know you're under pressure — let me show you exactly how we can meet your timeline.' Your calm reliability helps.",
        },
        {
          situation: "A property investor is considering multiple options",
          approach: "Be patient and helpful: 'I want to make sure this is right for you. What would help you compare options?' Your genuine approach builds trust.",
        },
        {
          situation: "The real estate buyer's team has different opinions",
          approach: "Facilitate: 'Let me understand everyone's perspective — I want to address all concerns.' Your collaborative nature helps align stakeholders.",
        },
      ],
    },
    beaver: {
      industryName: "Real Estate",
      strengths: [
        "Real estate buyers appreciate your attention to detail and accuracy",
        "Your thorough approach helps navigate complex property decisions",
        "You can handle detailed contracts and due diligence requirements",
        "Property investors trust your methodical evaluation process",
      ],
      tips: [
        "Come prepared with thorough documentation and data",
        "Real estate involves complex contracts — your strength is an asset",
        "Understand market comparables and property specifics",
        "Be ready for due diligence questions with detailed answers",
        "Balance thoroughness with real estate's fast pace when needed",
      ],
      scenarios: [
        {
          situation: "A real estate buyer asks for detailed market analysis",
          approach: "You're ready: 'I have comprehensive data on [market/property]. Let me walk you through the key factors.' Your preparation impresses.",
        },
        {
          situation: "The property buyer wants to move faster than feels comfortable",
          approach: "Advocate for quality: 'I want this to work well — can we take one more day to verify [key item]? It'll prevent issues.' Balance speed with thoroughness.",
        },
        {
          situation: "A real estate investor questions your methodology",
          approach: "Engage substantively: 'Good question — here's the data behind our approach. What's been your experience?' Your expertise shines in detailed discussions.",
        },
      ],
    },
  },

  // PROFESSIONAL SERVICES BUYERS
  professional: {
    lion: {
      industryName: "Professional Services",
      strengths: [
        "Professional services buyers appreciate your confident, direct approach",
        "Your decisiveness helps lawyers and consultants who value efficiency",
        "You can match the intensity of high-performing professional services firms",
        "Your results-focus resonates with outcome-driven professionals",
      ],
      tips: [
        "Professional services buyers value expertise — show you know your stuff",
        "Speak their language: ROI, efficiency gains, competitive advantage, risk",
        "Respect their time — lawyers and consultants bill by the hour",
        "Be prepared for tough questions — professionals probe deeply",
        "Professional services buyers appreciate those who can keep up intellectually",
      ],
      scenarios: [
        {
          situation: "A partner at a law firm has only 15 minutes for you",
          approach: "Be efficient: 'Let me give you the key points in 10 minutes, and you tell me if you want to go deeper.' Professionals respect time efficiency.",
        },
        {
          situation: "A consultant is challenging your methodology",
          approach: "Engage intellectually: 'Good question — here's our reasoning. What's your perspective?' Professional services buyers respect substantive debate.",
        },
        {
          situation: "The professional services buyer seems skeptical",
          approach: "Go to proof: 'I hear you. Let me share results from [similar firm]. Happy to connect you.' Professionals trust peer validation.",
        },
      ],
    },
    penguin: {
      industryName: "Professional Services",
      strengths: [
        "Your enthusiasm can energize professionals focused on client service",
        "Professional services buyers appreciate your ability to build relationships",
        "You can connect across multiple practice areas and partners",
        "Your energy differentiates in often-formal professional environments",
      ],
      tips: [
        "Professional services buyers value substance — back enthusiasm with expertise",
        "Understand their business model: billable hours, utilization, client service",
        "Be prepared for intellectual rigor — professionals test your knowledge",
        "Adapt your energy level to their more formal culture if needed",
        "Connect on shared passion for client success and quality work",
      ],
      scenarios: [
        {
          situation: "A professional services buyer seems unimpressed by energy",
          approach: "Shift to substance: 'Let me show you the specific results and methodology.' Match their professional tone while maintaining warmth.",
        },
        {
          situation: "A consulting firm wants extensive references and case studies",
          approach: "Provide gladly: 'Happy to share — which areas are most relevant to your practice?' Professionals value thorough evaluation.",
        },
        {
          situation: "The professional keeps interrupting to ask detailed questions",
          approach: "Welcome it: 'Great questions — let me address each one.' Professionals appreciate those who can handle scrutiny.",
        },
      ],
    },
    retriever: {
      industryName: "Professional Services",
      strengths: [
        "Professional services is relationship-based — your natural strength",
        "Lawyers and consultants value your genuine interest in their challenges",
        "You build the long-term partnerships professional firms prefer",
        "Your collaborative nature fits their team-oriented culture",
      ],
      tips: [
        "Build relationships with multiple partners and practice areas",
        "Understand their client service pressures and business model",
        "Be patient but responsive — professionals have demanding schedules",
        "Your reliability is highly valued by quality-focused firms",
        "Ask about their clients' challenges to understand their needs better",
      ],
      scenarios: [
        {
          situation: "A professional services buyer is extremely busy",
          approach: "Be accommodating: 'I know your schedule is demanding — I'm flexible. What works best for you?' Your patience and flexibility build trust.",
        },
        {
          situation: "A partner refers you to an associate to handle details",
          approach: "Treat them with equal respect: 'Great to work with you on this. How can I make your job easier?' Relationships at all levels matter.",
        },
        {
          situation: "The professional firm has high standards and past vendor issues",
          approach: "Listen and reassure: 'Tell me about what went wrong before — I want to make sure we address those concerns.' Your genuine care differentiates.",
        },
      ],
    },
    beaver: {
      industryName: "Professional Services",
      strengths: [
        "Professional services buyers appreciate your thorough preparation",
        "Your attention to detail matches their quality-focused culture",
        "You can navigate complex proposals and documentation requirements",
        "Lawyers and consultants trust your methodical, accurate approach",
      ],
      tips: [
        "Come prepared with comprehensive, well-organized materials",
        "Professional services buyers catch and remember errors — be accurate",
        "Understand their quality standards and compliance requirements",
        "Be ready for detailed questions with thorough answers",
        "Your methodical approach fits naturally with professional cultures",
      ],
      scenarios: [
        {
          situation: "A law firm asks for extensive documentation before meeting",
          approach: "Provide it: 'I have everything organized. Let me send it in advance so we can use our time efficiently.' Preparation impresses professionals.",
        },
        {
          situation: "The professional services buyer spots an inconsistency",
          approach: "Own it: 'You're right — thank you for catching that. Here's the correction.' Professionals respect honesty and attention to detail.",
        },
        {
          situation: "A consulting firm wants to understand your methodology deeply",
          approach: "Engage fully: 'Let me walk you through our approach step by step.' Your thoroughness builds confidence with quality-focused buyers.",
        },
      ],
    },
  },
};

export function getIndustryTips(industry: Industry, animalType: AnimalType): IndustryTipContent {
  return industryTips[industry][animalType];
}
