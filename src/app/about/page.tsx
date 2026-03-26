"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 30%, #dc262630 0%, transparent 50%),
                radial-gradient(ellipse at 70% 70%, #05966930 0%, transparent 50%)
              `
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-sm">🦁🐧🐕🦫</span>
              <span className="text-sm text-gray-400">About Us</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              The Story Behind{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)",
                }}
              >
                Animal Selling
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              A revolutionary approach to sales training that helps salespeople understand
              themselves, read their customers, and adapt their style for better results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-white mb-6">Our Mission</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  We believe that the best salespeople aren't born—they're developed. Our mission
                  is to give every salesperson the tools to understand their natural selling style
                  and adapt it to connect with any customer.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The Animal Selling framework isn't about changing who you are. It's about
                  understanding your strengths, recognizing your blind spots, and learning to
                  speak your customer's language.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-lion-500/10 border border-lion-500/30 rounded-xl p-6 text-center">
                  <span className="text-4xl block mb-2">🦁</span>
                  <div className="text-white font-bold">Lion</div>
                  <div className="text-lion-500 text-sm">The Closer</div>
                </div>
                <div className="bg-penguin-500/10 border border-penguin-500/30 rounded-xl p-6 text-center">
                  <span className="text-4xl block mb-2">🐧</span>
                  <div className="text-white font-bold">Penguin</div>
                  <div className="text-penguin-500 text-sm">The Connector</div>
                </div>
                <div className="bg-retriever-500/10 border border-retriever-500/30 rounded-xl p-6 text-center">
                  <span className="text-4xl block mb-2">🐕</span>
                  <div className="text-white font-bold">Retriever</div>
                  <div className="text-retriever-500 text-sm">The Advisor</div>
                </div>
                <div className="bg-beaver-500/10 border border-beaver-500/30 rounded-xl p-6 text-center">
                  <span className="text-4xl block mb-2">🦫</span>
                  <div className="text-white font-bold">Beaver</div>
                  <div className="text-beaver-500 text-sm">The Specialist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-12 text-center">Why Animal Selling Works</h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-lion-500/20 border border-lion-500/40 flex items-center justify-center text-2xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Memorable & Intuitive</h3>
                  <p className="text-gray-400">
                    Animal archetypes are easy to remember and instantly recognizable. Once you learn
                    the framework, you'll naturally start identifying types in every conversation.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-penguin-500/20 border border-penguin-500/40 flex items-center justify-center text-2xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Based on Real Psychology</h3>
                  <p className="text-gray-400">
                    Our framework is grounded in behavioral science and decades of sales research.
                    The four types map to proven personality dimensions that predict communication preferences.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-retriever-500/20 border border-retriever-500/40 flex items-center justify-center text-2xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Immediately Actionable</h3>
                  <p className="text-gray-400">
                    Unlike complex personality assessments, Animal Selling gives you practical tips
                    you can use in your very next customer interaction. No lengthy training required.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-beaver-500/20 border border-beaver-500/40 flex items-center justify-center text-2xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Team-Friendly</h3>
                  <p className="text-gray-400">
                    When your whole team speaks the same language, collaboration improves.
                    Use Team Safari to build balanced teams and leverage everyone's strengths.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-6">Our Philosophy</h2>
            <blockquote className="text-2xl text-gray-300 italic mb-8 leading-relaxed">
              "The best salespeople don't sell to customers—they sell <span className="text-white">with</span> customers.
              They adapt their approach to match how each customer wants to buy."
            </blockquote>
            <p className="text-gray-400">
              Animal Selling is built on a simple truth: people buy differently. Some want facts and figures.
              Others want to feel a personal connection. Some need time to think; others want to move fast.
              The key to sales success is recognizing these differences and adapting accordingly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">🦁🐧🐕🦫</div>
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to discover your selling style?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Take our 5-minute quiz and unlock personalized insights about your natural approach to sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 text-white font-bold"
                  style={{ background: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  Take the Quiz
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/5">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
