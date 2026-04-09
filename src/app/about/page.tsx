"use client";

import Link from "next/link";
import Image from "next/image";
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

      {/* Origin Story - 4 Parts */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-12 text-center">The Origin Story</h2>

            {/* Part 1: The Evolution of Animal Selling */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">The Evolution of Animal Selling</h3>
              </div>

              <div className="space-y-5 text-gray-300 leading-relaxed pl-13">
                <p>
                  Animal Selling™ was developed by C2 Unlimited, LLC as a simple, relatable framework
                  designed to help sales professionals quickly understand one of the most important
                  truths in selling:
                </p>

                <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20">
                  <p className="text-xl font-bold text-white text-center">
                    Sell to people the way THEY want to buy—not the way you want to sell.
                  </p>
                </div>

                <p>
                  Built around our <span className="text-amber-500 font-semibold">Customer Preference Principle™</span>:
                </p>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white font-medium text-center">
                    Know your animal. Spot their animal. Adapt your approach. Close their way.
                  </p>
                </div>

                {/* Text with image to the right */}
                <div className="sm:flex sm:gap-6">
                  <div className="sm:flex-1">
                    <p className="mb-4">This framework gives sales professionals a practical way to:</p>

                    <ul className="space-y-2 ml-4 mb-5">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>Identify their own natural selling style</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>Recognize the behavioral tendencies of their customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>Adjust in real-time to create connection and trust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>Close more effectively by aligning with how the customer prefers to make decisions</span>
                      </li>
                    </ul>

                    <p>
                      Backed by years of real-world application, C2 has built a reputation for creating
                      training that is simple, fast to implement, and results-driven—and Animal Selling™
                      is a direct reflection of that philosophy.
                    </p>
                  </div>

                  {/* C2 Unlimited Image */}
                  <div className="mt-5 sm:mt-0 sm:w-64 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg self-start">
                    <Image
                      src="/images/animal-selling-c2.png"
                      alt="Animal Selling - C2 Coaching & Training by C2 Unlimited, LLC"
                      width={400}
                      height={225}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Proven in the Field */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Proven in the Field</h3>
              </div>

              <div className="space-y-5 text-gray-300 leading-relaxed pl-13">
                <p>
                  Since 2008, these concepts have been implemented at scale with over{" "}
                  <span className="text-white font-semibold">10,000 sales professionals</span> across
                  North America through programs developed and delivered by C2 Unlimited, LLC.
                </p>

                <p>Animal Selling™ has been taught in:</p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Live workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>In-store retail trainings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>In-home sales environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Corporate leadership sessions</span>
                  </li>
                </ul>

                <div className="p-5 rounded-xl bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-orange-500/20">
                  <p className="text-gray-300">
                    Including training initiatives with <span className="text-white font-semibold">The Home Depot</span>,
                    one of the largest retailers in the world.
                  </p>
                </div>

                <p>In these environments, the framework has helped associates:</p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Better understand customer behavior in real time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Improve confidence in conversations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Create stronger connections on the sales floor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Enhance the overall buying experience</span>
                  </li>
                </ul>

                <p className="text-white font-medium">
                  This isn't theory—it's been built, tested, and refined by a company that specializes
                  in training thousands of sales professionals across multiple industries.
                </p>
              </div>
            </div>

            {/* Part 3: 2026 and Beyond */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white">2026 and Beyond</h3>
              </div>

              <div className="space-y-5 text-gray-300 leading-relaxed pl-13">
                <p>
                  Today, Animal Selling™ has evolved—continuing the innovation driven by C2 Unlimited, LLC.
                </p>

                <p className="text-gray-400 italic">
                  What once required a live training session, role plays, and in-person coaching…
                </p>

                <p className="text-2xl font-bold text-white text-center py-2">
                  can now happen instantly.
                </p>

                <p>
                  In 2026, we've transformed the program into a digital experience where sales professionals can:
                </p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Take a quick online quiz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Immediately discover their primary and secondary animal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Learn how to spot their customer's animal in real time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Get simple, actionable strategies to adapt their approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">•</span>
                    <span>Apply it instantly to real conversations</span>
                  </li>
                </ul>

                <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20">
                  <p className="text-gray-300">
                    This allows organizations to scale what C2 has been doing for years—
                    <span className="text-white font-semibold"> but now faster, more consistently, and with immediate impact.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Part 4: Why It Works */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h3 className="text-2xl font-bold text-white">Why It Works</h3>
              </div>

              <div className="space-y-5 text-gray-300 leading-relaxed pl-13">
                <p>
                  Animal Selling™ is a behavior-based sales system that teaches professionals how to
                  identify a customer's preferred buying style—and adapt their approach in real time to match it.
                </p>

                <p>Because in the real world:</p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Salespeople don't have time for complex theory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Customers don't announce how they want to be sold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>And connection has to happen fast</span>
                  </li>
                </ul>

                <div className="p-6 rounded-xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-green-500/10 border border-white/10 text-center space-y-3">
                  <p className="text-xl font-bold text-white">Animal Selling™ bridges that gap.</p>
                  <p className="text-lg text-gray-300">It turns awareness into action.</p>
                  <p className="text-lg text-gray-300">It turns theory into behavior.</p>
                  <p className="text-lg text-white font-medium">
                    And most importantly… it helps sales professionals meet customers where they are.
                  </p>
                </div>
              </div>
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
                The Customer Preference Principle™
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
