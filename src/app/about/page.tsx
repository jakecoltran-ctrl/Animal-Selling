"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function AboutPage() {
  const faqs = [
    {
      q: "How long does the quiz take?",
      a: "The assessment takes about 5 minutes. It's 24 questions designed to identify your natural selling tendencies."
    },
    {
      q: "Can my type change over time?",
      a: "Your core type tends to stay consistent, but you can develop skills from other types. Many successful salespeople learn to flex between styles."
    },
    {
      q: "Is one type better than others?",
      a: "No! Each type has unique strengths. The best salespeople understand their natural style and learn when to adapt."
    },
    {
      q: "How does Team Safari work?",
      a: "Create a team, invite members via link, and see your team's composition. Balanced teams with multiple types often perform best."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 relative">
        <AnimatedBackground opacity={0.2} emojiOpacity={0.15} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              About Animal Selling
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Born from decades of sales research and real-world experience, Animal Selling
              transforms how teams understand themselves and connect with customers.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8">The Origin Story</h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Every salesperson has experienced it: a pitch that works perfectly with one
                customer falls completely flat with another. Why? Because people are different—they
                process information differently, make decisions differently, and respond to
                communication differently.
              </p>

              <p>
                Animal Selling was created to solve this problem. By mapping selling styles to
                four memorable animal archetypes, we've made it easy for anyone to understand
                their natural approach and recognize the preferences of others.
              </p>

              <p>
                The framework draws on established behavioral models while making them accessible
                and immediately practical. No jargon, no complex charts—just four animals that
                stick in your mind and change how you sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8 text-center">The Science Behind It</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">Behavioral Psychology</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our framework is rooted in established personality research, including the
                  DISC model and Myers-Briggs typology. We've distilled complex theories into
                  practical, memorable categories.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">Two Key Dimensions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Research shows communication preferences cluster around two axes:
                  task-oriented vs. people-oriented, and fast-paced vs. methodical.
                  Our four animals map to these quadrants.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Sales-Specific Design</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unlike generic personality tests, every aspect of Animal Selling is
                  designed for sales contexts—from the questions we ask to the advice we give.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-2xl mb-3">🔄</div>
                <h3 className="text-xl font-bold text-white mb-3">Adaptive Selling</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Studies show that salespeople who adapt their style to match customer
                  preferences close more deals. Animal Selling makes this adaptation intuitive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to find your animal?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Take the quiz and discover your selling style in 5 minutes.
            </p>
            <Link href="/quiz">
              <Button
                size="lg"
                className="text-lg px-8 py-6 text-white font-bold"
                style={{ background: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)" }}
              >
                Take the Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
