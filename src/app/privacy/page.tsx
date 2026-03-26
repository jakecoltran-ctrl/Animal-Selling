import { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata: Metadata = {
  title: "Privacy Policy | Animal Selling",
  description: "Learn how Animal Selling collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "March 26, 2025";

  return (
    <div className="min-h-screen bg-gray-950 py-16 relative overflow-hidden">
      <AnimatedBackground opacity={0.1} emojiOpacity={0.08} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-gray max-w-none">
            <div className="space-y-8">
              {/* Introduction */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Animal Selling ("we," "our," or "us") respects your privacy and is committed
                  to protecting your personal information. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when you use our
                  website and services.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Information We Collect</h2>

                <h3 className="text-lg font-semibold text-white mt-4 mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Account Information:</strong> When you create an account, we collect your email address and name.</li>
                  <li><strong>Quiz Responses:</strong> Your answers to our sales personality assessment questions.</li>
                  <li><strong>Team Information:</strong> Team names and member information when you use Team Safari.</li>
                  <li><strong>Payment Information:</strong> If you purchase premium features, payment is processed by our third-party payment processor. We do not store your full payment card details.</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6 mb-2">Information Collected Automatically</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and interactions with features.</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                  <li><strong>Local Storage:</strong> Quiz results are stored locally in your browser for your convenience.</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To generate your personalized sales animal results</li>
                  <li>To enable team features and collaboration</li>
                  <li>To process transactions and send related information</li>
                  <li>To send you updates about our services (with your consent)</li>
                  <li>To improve and optimize our website and services</li>
                  <li>To detect and prevent fraud or abuse</li>
                </ul>
              </section>

              {/* Data Storage and Security */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Data Storage and Security</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use industry-standard security measures to protect your information. Your
                  account data is stored securely using Supabase, a trusted database platform
                  with built-in security features including encryption at rest and in transit.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Quiz results are primarily stored in your browser's local storage. If you
                  create an account, results can be linked to your profile for access across
                  devices.
                </p>
              </section>

              {/* Third-Party Services */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Third-Party Services</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use the following third-party services to operate our platform:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Supabase:</strong> Authentication and database services</li>
                  <li><strong>Vercel:</strong> Website hosting and deployment</li>
                  <li><strong>Stripe:</strong> Payment processing (if applicable)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  These services have their own privacy policies governing their use of your data.
                </p>
              </section>

              {/* Your Rights */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Your Rights</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to processing of your personal data</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information below.
                </p>
              </section>

              {/* Cookies */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Cookies and Local Storage</h2>
                <p className="text-gray-300 leading-relaxed">
                  We use essential cookies and local storage to provide core functionality,
                  such as keeping you logged in and storing your quiz progress. We do not
                  use tracking cookies for advertising purposes.
                </p>
              </section>

              {/* Data Retention */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Data Retention</h2>
                <p className="text-gray-300 leading-relaxed">
                  We retain your personal information for as long as your account is active
                  or as needed to provide you services. You can request deletion of your
                  account and associated data at any time by contacting us.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not
                  knowingly collect personal information from children under 13. If you believe
                  we have collected information from a child under 13, please contact us
                  immediately.
                </p>
              </section>

              {/* Changes to Policy */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Changes to This Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of
                  any changes by posting the new Privacy Policy on this page and updating the
                  "Last updated" date. We encourage you to review this Privacy Policy
                  periodically.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices,
                  please contact us at:
                </p>
                <p className="text-gray-300 mt-4">
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:privacy@animalselling.com" className="text-cyan-400 hover:underline">
                    privacy@animalselling.com
                  </a>
                </p>
              </section>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white hover:scale-105 transition-all duration-300 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
