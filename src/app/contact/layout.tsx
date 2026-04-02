import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Animal Selling™ team. We'd love to hear from you about sales training, team assessments, or partnership opportunities.",
  openGraph: {
    title: "Contact Animal Selling™",
    description:
      "Get in touch with us about sales training, team assessments, or partnership opportunities.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
