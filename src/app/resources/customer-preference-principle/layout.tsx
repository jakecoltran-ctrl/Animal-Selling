import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Customer Preference Principle™ - Animal Selling",
  description:
    "Learn how the Customer Preference Principle transforms sales by teaching you to sell to people the way THEY want to buy—not the way you want to sell.",
  openGraph: {
    title: "The Customer Preference Principle™ - Animal Selling",
    description:
      "Sell to people the way THEY want to buy—not the way you want to sell. Discover the foundation of the Animal Selling framework.",
  },
};

export default function CustomerPreferencePrincipleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
