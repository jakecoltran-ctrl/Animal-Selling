import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certification | Animal Selling™",
  description:
    "Complete all four games to earn your Animal Selling Certification. Test your knowledge of sales personalities and buyer types.",
};

export default function CertificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
