import { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata: Metadata = {
  title: "Terms of Service | Animal Selling",
  description: "Terms and conditions for using the Animal Selling platform and services.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "March 26, 2025";

  return (
    <div className="min-h-screen bg-gray-950 py-16 relative overflow-hidden">
      <AnimatedBackground opacity={0.1} emojiOpacity={0.08} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-gray max-w-none">
            <div className="space-y-8">
              {/* Acceptance */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing or using Animal Selling ("the Service"), you agree to be bound
                  by these Terms of Service ("Terms"). If you do not agree to these Terms,
                  please do not use the Service. We reserve the right to modify these Terms
                  at any time, and such modifications will be effective immediately upon
                  posting.
                </p>
              </section>

              {/* Description of Service */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">2. Description of Service</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Animal Selling is a sales training platform that provides:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>A personality assessment to identify your sales style</li>
                  <li>Personalized insights and recommendations based on your results</li>
                  <li>Team collaboration features ("Team Safari")</li>
                  <li>Educational content about different selling styles</li>
                  <li>Optional premium reports and features</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">3. User Accounts</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To access certain features, you must create an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access to your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  We reserve the right to suspend or terminate accounts that violate these Terms.
                </p>
              </section>

              {/* User Conduct */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">4. User Conduct</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect or harvest user data without consent</li>
                  <li>Use automated systems to access the Service without permission</li>
                  <li>Share your account credentials with others</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The Animal Selling framework, including the four animal archetypes (Lion,
                  Penguin, Retriever, Beaver), assessment questions, scoring methodology,
                  and all associated content, graphics, and code are owned by Animal Selling
                  and protected by intellectual property laws.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works from
                  our content without explicit written permission. Your quiz results are yours
                  to use personally and share, but the underlying framework remains our property.
                </p>
              </section>

              {/* Payment Terms */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">6. Payment Terms</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Some features require payment. By purchasing premium features, you agree that:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>All payments are processed securely through our payment provider</li>
                  <li>Prices are listed in USD unless otherwise specified</li>
                  <li>Purchases are for personal or internal business use only</li>
                  <li>Refunds are available within 7 days of purchase if you're unsatisfied</li>
                </ul>
              </section>

              {/* Assessment Disclaimer */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">7. Assessment Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The Animal Selling assessment is designed for educational and professional
                  development purposes. Please understand that:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Results are based on self-reported responses and may vary</li>
                  <li>The assessment is not a clinical psychological evaluation</li>
                  <li>Results should be used as a guide, not absolute truth</li>
                  <li>Individual performance depends on many factors beyond selling style</li>
                </ul>
              </section>

              {/* Disclaimers */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">8. Disclaimers</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF
                  ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Warranties that the Service will be uninterrupted or error-free</li>
                  <li>Warranties regarding the accuracy or reliability of results</li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, ANIMAL SELLING SHALL NOT BE LIABLE
                  FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
                  OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING
                  FROM YOUR USE OF THE SERVICE.
                </p>
              </section>

              {/* Indemnification */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">10. Indemnification</h2>
                <p className="text-gray-300 leading-relaxed">
                  You agree to indemnify and hold harmless Animal Selling and its officers,
                  directors, employees, and agents from any claims, damages, losses, or
                  expenses (including reasonable attorney fees) arising from your use of
                  the Service or violation of these Terms.
                </p>
              </section>

              {/* Termination */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">11. Termination</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We may terminate or suspend your access to the Service immediately, without
                  prior notice, for any reason, including breach of these Terms. Upon
                  termination:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Your right to use the Service will immediately cease</li>
                  <li>We may delete your account and associated data</li>
                  <li>Provisions that should survive termination will remain in effect</li>
                </ul>
              </section>

              {/* Governing Law */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">12. Governing Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws
                  of the United States, without regard to its conflict of law provisions.
                  Any disputes arising from these Terms or your use of the Service shall be
                  resolved in the appropriate courts.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">13. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will provide
                  notice of significant changes by posting the updated Terms on this page
                  and updating the "Last updated" date. Your continued use of the Service
                  after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">14. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-300 mt-4">
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:legal@animalselling.com" className="text-cyan-400 hover:underline">
                    legal@animalselling.com
                  </a>
                </p>
              </section>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
