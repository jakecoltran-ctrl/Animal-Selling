import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Personality Quiz - Find Your Animal Type",
  description:
    "Take our free 5-minute sales personality quiz to discover if you're a Lion, Penguin, Retriever, or Beaver. Get personalized insights to improve your selling style.",
  openGraph: {
    title: "Sales Personality Quiz - Find Your Animal Type",
    description:
      "Take our free 5-minute sales personality quiz to discover your unique selling style. Are you a Lion, Penguin, Retriever, or Beaver?",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
