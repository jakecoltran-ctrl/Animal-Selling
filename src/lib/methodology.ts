/**
 * Animal Selling Methodology
 * Core philosophy, principles, and framework definitions
 */

export const CORE_PRINCIPLE = {
  name: "The Customer Preference Principle™",
  tagline: "Sell to people the way THEY want to buy",
  shortTagline: "Sell Their Way",
  description:
    "People respond best when you treat them the way THEY want to be treated—not the way you want to treat them.",
  differentiator:
    "Most salespeople sell how they like to buy. The best salespeople sell how their customer wants to buy.",
  insight:
    "The Golden Rule says treat others how you want to be treated. Animal Selling says treat customers how THEY want to be treated. That's the difference between good intentions and closed deals.",
} as const;

export const FRAMEWORK_POSITIONING =
  "Animal Selling is a behavior-based sales system that helps you identify how your customer wants to be treated—and adapt in real time.";

export const FRAMEWORK_STEPS = [
  {
    num: "01",
    name: "Know Your Animal",
    title: "Know",
    description: "Understand your natural selling style and tendencies",
    detail:
      "Take our assessment to discover how you naturally show up in sales conversations—your strengths, blind spots, and default approach.",
  },
  {
    num: "02",
    name: "Spot Their Animal",
    title: "Spot",
    description: "Learn to quickly identify your customer's buying style",
    detail:
      "Develop observation skills to read behavioral cues and recognize which animal type your customer is within the first few minutes.",
  },
  {
    num: "03",
    name: "Adapt Your Approach",
    title: "Adapt",
    description: "Flex your communication to match their preferences",
    detail:
      "Adjust your pace, tone, and focus based on what your customer needs—not what feels natural to you.",
  },
  {
    num: "04",
    name: "Close Their Way",
    title: "Close",
    description: "Use the right close for each animal type",
    detail:
      "Different customers need different closes. Lions want decisiveness. Penguins want enthusiasm. Retrievers want reassurance. Beavers want proof.",
  },
] as const;

export const PHILOSOPHY_POINTS = [
  {
    title: "The Gap",
    content:
      "Most salespeople naturally communicate the way they want to be communicated with—emphasizing what matters to them, moving at their own pace. But customers buy based on what matters to them.",
  },
  {
    title: "The Shift",
    content:
      "Animal Selling teaches you to slow down, recognize how your customer thinks and makes decisions, and adjust your approach before ever trying to make the sale.",
  },
  {
    title: "The Result",
    content:
      "When you serve customers the way they want to be served, you build trust faster, reduce friction, and close more deals—not through pressure, but through alignment.",
  },
] as const;

export const SCIENCE_PILLARS = [
  {
    icon: "brain",
    title: "Behavioral Psychology",
    description:
      "Our framework is built on decades of research into how people communicate, make decisions, and respond to different interaction styles.",
  },
  {
    icon: "chart",
    title: "Two Key Dimensions",
    description:
      "Communication preferences cluster around two axes: task-oriented vs. people-oriented, and fast-paced vs. methodical. Our four animals map to these behavioral quadrants.",
  },
  {
    icon: "target",
    title: "Sales-Specific Design",
    description:
      "Unlike generic personality assessments, every aspect of Animal Selling is designed for sales contexts—from how we measure style to the advice we give.",
  },
  {
    icon: "refresh",
    title: "Adaptive Selling",
    description:
      "Research consistently shows that salespeople who adapt their style to match customer preferences build stronger relationships and close more deals.",
  },
] as const;
