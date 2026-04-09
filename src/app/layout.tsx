import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { LegalFooter } from "@/components/marketing/LegalFooter";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://animalselling.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Animal Selling™ - Discover Your Sales Animal",
    template: "%s | Animal Selling™",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "Discover your unique sales personality with Animal Selling™. Take our free quiz to find out if you're a Lion, Penguin, Retriever, or Beaver - and learn how to sell more effectively.",
  keywords: [
    "sales training",
    "sales personality test",
    "selling style assessment",
    "sales team training",
    "B2B sales",
    "sales quiz",
    "Lion Penguin Retriever Beaver",
    "sales coaching",
    "sales personality types",
    "improve sales skills",
  ],
  authors: [{ name: "Animal Selling" }],
  creator: "Animal Selling",
  publisher: "Animal Selling",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Animal Selling™",
    title: "Animal Selling™ - Discover Your Sales Animal",
    description:
      "Take our free quiz to discover your sales personality type. Are you a Lion, Penguin, Retriever, or Beaver? Learn how to sell more effectively with personalized insights.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Animal Selling - Discover Your Sales Animal Type",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animal Selling™ - Discover Your Sales Animal",
    description:
      "Take our free quiz to discover your sales personality type. Are you a Lion, Penguin, Retriever, or Beaver?",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};


// JSON-LD structured data for organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Animal Selling",
  description:
    "Sales training platform using animal archetypes to help salespeople understand their selling style.",
  url: "https://animalselling.com",
  logo: "https://animalselling.com/logo.png",
  sameAs: [],
  offers: {
    "@type": "Offer",
    name: "Sales Personality Assessment",
    description: "Discover your sales animal type with our free quiz",
    price: "0",
    priceCurrency: "USD",
  },
};

// Quiz structured data
const quizJsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Animal Selling Sales Personality Quiz",
  description:
    "A 24-question assessment to discover your sales personality type: Lion, Penguin, Retriever, or Beaver.",
  educationalLevel: "Professional",
  learningResourceType: "Assessment",
  provider: {
    "@type": "Organization",
    name: "Animal Selling",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-gray-950">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <LegalFooter />
        </div>
      </body>
    </html>
  );
}
