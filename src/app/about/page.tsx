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
                Animal Selling was developed by Chris Coltran, co-founder of C2 Unlimited, LLC.,
                a coaching and training company, and a multi-book author and professional sales
                trainer with over 25 years of experience across retail, wholesale, manufacturing,
                and distribution. Through decades of working directly with thousands of salespeople
                and leaders, C2 recognized a common challenge of salespeople naturally communicating
                and selling based on their own preferences rather than adapting to the customer.
              </p>

              <p>
                Building on his earlier work, including the Grandmother Philosophy, Animal Selling
                was created as a simple, relatable framework to help sales professionals quickly
                identify behavioral styles of their own and their customer's, and adjust their
                approach to better connect, build trust, and close more sales. These concepts have
                been implemented at scale, including training initiatives with The Home Depot, one
                of the largest retailers in the world, where the Animal Selling framework has helped
                associates better understand customers and improve the overall buying experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Influences */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8">The Influences</h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Animal Selling is influenced by both DISC and The Five Love Languages, bringing
                together the power of understanding how people communicate and how they prefer to
                be treated. Most people naturally interact with others the way they want to be
                treated—communicating in their own style, emphasizing what matters to them, and
                moving at a pace that feels comfortable.
              </p>

              <p>
                But just like The Five Love Languages teaches us to give love in the way the other
                person wants to receive it, Animal Selling reinforces that customers need to be
                communicated with in a way that fits them. While DISC helps us understand general
                communication tendencies, your sales animal is not the same as your DISC profile—they
                are different. DISC reflects broader behavioral traits, while your sales animal
                represents how you naturally show up in a sales conversation and how you tend to sell.
              </p>

              <p>
                Animal Selling simplifies these concepts into an easy-to-use framework that helps
                salespeople slow down, get to know the customer, build genuine rapport, and adjust
                their approach to match how that customer thinks, feels, and makes decisions—before
                ever trying to make the sale.
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="text-xl font-bold text-white mb-3">Behavioral Psychology</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our framework is rooted in established personality research and behavioral
                  psychology. We've distilled complex theories into practical, memorable categories.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">Two Key Dimensions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Research shows communication preferences cluster around two axes:
                  task-oriented vs. people-oriented, and fast-paced vs. methodical.
                  Our four animals map to these quadrants.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Sales-Specific Design</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unlike generic personality tests, every aspect of Animal Selling is
                  designed for sales contexts—from the questions we ask to the advice we give.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
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
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01]">
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
                className="text-lg px-8 py-6 text-white font-bold hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
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
