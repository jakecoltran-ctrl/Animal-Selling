import { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata: Metadata = {
  title: "Disclaimer | Animal Selling™",
  description: "Important disclaimers and limitations regarding the Animal Selling™ platform and assessment.",
};

export default function DisclaimerPage() {
  const lastUpdated = "April 2, 2025";

  return (
    <div className="min-h-screen bg-gray-950 py-16 relative overflow-hidden">
      <AnimatedBackground opacity={0.1} emojiOpacity={0.08} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Disclaimer
            </h1>
            <p className="text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-gray max-w-none">
            <div className="space-y-8">
              {/* General Disclaimer */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">General Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed">
                  The information provided on Animal Selling™ is for general informational and
                  educational purposes only. While we strive to provide accurate and up-to-date
                  information, we make no representations or warranties of any kind, express or
                  implied, about the completeness, accuracy, reliability, suitability, or
                  availability of the information, products, services, or related graphics
                  contained on this website.
                </p>
              </section>

              {/* Assessment Disclaimer */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Assessment Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The Animal Selling™ personality assessment is designed as a professional
                  development and educational tool. Please understand that:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>This assessment is not a scientifically validated psychological instrument</li>
                  <li>Results are based on self-reported responses and may vary over time</li>
                  <li>The assessment is not intended to diagnose any psychological conditions</li>
                  <li>Results should be used as a guide for self-reflection, not as absolute truth</li>
                  <li>Individual sales performance depends on many factors beyond personality type</li>
                  <li>The four animal archetypes are original to Animal Selling™ and are used for illustrative purposes</li>
                  <li>Industry-specific tips are general guidance, not specific business advice for your situation</li>
                  <li>30-day action plans are suggestions, not guaranteed strategies for success</li>
                </ul>
              </section>

              {/* No Professional Advice */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">No Professional Advice</h2>
                <p className="text-gray-300 leading-relaxed">
                  The content on this website does not constitute professional advice of any kind,
                  including but not limited to psychological, medical, legal, financial, or career
                  advice. You should consult with appropriate professionals before making any
                  decisions based on information provided on this website. Any reliance you place
                  on such information is strictly at your own risk.
                </p>
              </section>

              {/* Industry Tips Disclaimer */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Industry Tips Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our industry-specific selling tips and recommendations are provided for general
                  informational purposes. Please understand that:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Industry advice is generalized and may not apply to all businesses or situations within that industry</li>
                  <li>Market conditions, regulations, and best practices vary by region and change over time</li>
                  <li>You should adapt all recommendations to your specific business context and customer base</li>
                  <li>Industry tips do not constitute specialized consulting or strategic business advice</li>
                </ul>
              </section>

              {/* Action Plans Disclaimer */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Action Plans Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The 30-day action plans provided are suggested frameworks for professional development.
                  Please note:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Action plans are suggestions, not prescriptions for guaranteed success</li>
                  <li>Results will vary based on individual implementation, effort, and circumstances</li>
                  <li>Plans should be adapted to your specific role, industry, and organizational context</li>
                  <li>We do not guarantee any specific outcomes from following these action plans</li>
                </ul>
              </section>

              {/* Results and Outcomes */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Results and Outcomes</h2>
                <p className="text-gray-300 leading-relaxed">
                  We do not guarantee any specific results or outcomes from using our assessment
                  or implementing our recommendations. Success in sales depends on numerous factors
                  including but not limited to individual effort, market conditions, product quality,
                  training, experience, and circumstances beyond our control. Past performance or
                  testimonials do not guarantee future results.
                </p>
              </section>

              {/* Third-Party Links */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Third-Party Links</h2>
                <p className="text-gray-300 leading-relaxed">
                  This website may contain links to third-party websites or services that are not
                  owned or controlled by Animal Selling™ or C2 Unlimited LLC. We have no control
                  over, and assume no responsibility for, the content, privacy policies, or
                  practices of any third-party websites or services. We strongly advise you to
                  read the terms and conditions and privacy policies of any third-party websites
                  you visit.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed">
                  IN NO EVENT SHALL ANIMAL SELLING, C2 UNLIMITED LLC, OR ITS DIRECTORS, EMPLOYEES,
                  PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF
                  PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR
                  ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
                </p>
              </section>

              {/* Intellectual Property */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The Animal Selling™ framework, including but not limited to the four animal
                  archetypes (Lion, Penguin, Retriever, Beaver), assessment methodology, content,
                  graphics, and website design are the property of C2 Unlimited LLC and are
                  protected by intellectual property laws. Unauthorized use, reproduction, or
                  distribution of these materials is prohibited.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">Downloaded Content:</strong> PDF reports and other downloadable
                  materials are provided for your personal or internal business use only. You may not
                  redistribute, resell, publish, or share these materials publicly without explicit
                  written permission from C2 Unlimited LLC.
                </p>
              </section>

              {/* Changes to Disclaimer */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Changes to This Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify this disclaimer at any time. Changes will be
                  effective immediately upon posting to this page. We encourage you to review
                  this disclaimer periodically for any changes. Your continued use of the website
                  after changes are posted constitutes your acceptance of the modified disclaimer.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this Disclaimer, please contact us at:
                </p>
                <p className="text-gray-300 mt-4">
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:animalselling2026@gmail.com" className="text-cyan-400 hover:underline">
                    animalselling2026@gmail.com
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
