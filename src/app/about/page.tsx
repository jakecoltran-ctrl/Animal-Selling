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
      q: "How does Team Safari™ work?",
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
              About Animal Selling™
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Born from decades of sales research and real-world experience, Animal Selling™
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
                Animal Selling™ was developed by Chris Coltran, co-founder of C2 Unlimited, LLC.,
                a coaching and training company, and a multi-book author and professional sales
                trainer with over 25 years of experience across retail, wholesale, manufacturing,
                and distribution. Through decades of working directly with thousands of salespeople
                and leaders, C2 recognized a common challenge of salespeople naturally communicating
                and selling based on their own preferences rather than adapting to the customer.
              </p>

              <p>
                Building on his earlier work, including the Grandmother Philosophy, Animal Selling™
                was created as a simple, relatable framework to help sales professionals quickly
                identify behavioral styles of their own and their customer's, and adjust their
                approach to better connect, build trust, and close more sales. These concepts have
                been implemented at scale, including training initiatives with The Home Depot, one
                of the largest retailers in the world, where the Animal Selling™ framework has helped
                associates better understand customers and improve the overall buying experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8">The Philosophy</h2>

            {/* Customer Preference Principle Callout */}
            <div className="mb-10 p-6 rounded-xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-cyan-500/10 border border-white/10">
              <div className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-2">
                The Customer Preference Principle
              </div>
              <p className="text-2xl font-bold text-white mb-3">
                Sell to people the way THEY want to buy—not the way you want to sell.
              </p>
              <p className="text-gray-400">
                The Golden Rule says treat others how you want to be treated. Animal Selling™ says
                treat customers how THEY want to be treated. That's the difference between good
                intentions and closed deals.
              </p>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Most salespeople naturally communicate the way they want to be communicated with—emphasizing
                what matters to them, moving at their own pace, and closing deals the way they'd want
                to be sold. It feels natural. It's also why so many deals fall through.
              </p>

              <p>
                The truth is, customers buy based on what matters to <span className="text-white font-medium">them</span>.
                A data-driven buyer doesn't care about your enthusiasm. A relationship-focused customer
                won't respond to pressure tactics. And a decisive executive doesn't want to wade through
                every detail.
              </p>

              <p>
                Animal Selling™ is a behavior-based sales system that helps you identify how your
                customer wants to be treated—and adapt in real time. It teaches you to slow down,
                recognize how your customer thinks and makes decisions, and adjust your approach
                before ever trying to make the sale.
              </p>

              <p>
                When you serve customers the way they want to be served, you build trust faster,
                reduce friction, and close more deals—not through pressure, but through alignment.
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
                  Our framework is built on decades of research into how people communicate,
                  make decisions, and respond to different interaction styles in buying situations.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">Two Key Dimensions</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Buying behavior clusters around two axes: task-oriented vs. people-oriented,
                  and fast-paced vs. methodical. Our four animals represent these distinct
                  buying and communication styles.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Sales-Specific Design</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unlike generic behavioral assessments, every aspect of Animal Selling™ is
                  designed for sales contexts—from how we measure style to the actionable advice we provide.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">🔄</div>
                <h3 className="text-xl font-bold text-white mb-3">Adaptive Selling</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Studies show that salespeople who adapt their style to match customer
                  preferences close more deals. Animal Selling™ makes this adaptation intuitive.
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
