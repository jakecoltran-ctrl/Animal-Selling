import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Framework - Four Animal Sales Types",
  description:
    "Learn about the Animal Selling™ framework and the four sales personality types: Lion (The Closer), Penguin (The Enthusiast), Retriever (The Relationship Builder), and Beaver (The Analyst).",
  openGraph: {
    title: "About the Animal Selling™ Framework",
    description:
      "Discover the four animal sales types: Lion, Penguin, Retriever, and Beaver. Each represents a unique approach to selling.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
