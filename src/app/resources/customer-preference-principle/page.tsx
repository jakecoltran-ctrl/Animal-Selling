"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { Check } from "lucide-react";

export default function CustomerPreferencePrinciplePage() {
  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 relative">
        <AnimatedBackground opacity={0.2} emojiOpacity={0.15} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-4">
              The Foundation of Animal Selling
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              The Customer Preference Principle™
            </h1>
            <p className="text-2xl text-white font-medium mb-4">
              Sell to people the way THEY want to buy—not the way you want to sell.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              This simple shift in mindset is the difference between good intentions and closed deals.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8 text-center">The Problem with "Natural" Selling</h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Most salespeople naturally communicate the way <span className="text-white font-semibold">they</span> want
                to be communicated with. They emphasize what matters to them, move at their own pace, and close deals
                the way they'd want to be sold.
              </p>

              <p className="text-lg">
                It feels natural. It's comfortable. <span className="text-red-400 font-semibold">It's also why so many deals fall through.</span>
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4">The Golden Rule Approach</h3>
                  <p className="text-gray-400 mb-3">"Treat others how YOU want to be treated"</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Assumes everyone thinks like you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Ignores customer preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Creates friction in conversations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Leads to lost deals and frustrated customers</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">The Customer Preference Principle™</h3>
                  <p className="text-gray-400 mb-3">"Treat customers how THEY want to be treated"</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Recognizes different buying styles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Adapts to customer needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Builds trust faster</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Closes more deals through alignment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-lg">
                The truth is, customers buy based on what matters to <span className="text-white font-semibold">them</span>.
                A data-driven buyer doesn't care about your enthusiasm. A relationship-focused customer won't respond to
                pressure tactics. And a decisive executive doesn't want to wade through every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Animals Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-4 text-center">The Four Buying Styles</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Animal Selling™ identifies four distinct buying preferences. Understanding these helps you
              recognize what your customer needs—and adapt accordingly.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Lion */}
              <div className="bg-white/5 border border-lion-500/30 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <AnimalIcon type="lion" size="lg" variant="head" />
                  <div>
                    <h3 className="text-xl font-bold text-lion-500">The Lion</h3>
                    <p className="text-sm text-gray-400">Results-Driven Buyer</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Lions want the bottom line. They're decisive, direct, and don't want their time wasted.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400"><span className="text-lion-500 font-semibold">They want:</span> Quick answers, clear benefits, control of the process</p>
                  <p className="text-gray-400"><span className="text-lion-500 font-semibold">They avoid:</span> Small talk, excessive details, being told what to do</p>
                  <p className="text-gray-400"><span className="text-lion-500 font-semibold">To win them:</span> Be direct, respect their time, let them lead</p>
                </div>
              </div>

              {/* Penguin */}
              <div className="bg-white/5 border border-penguin-500/30 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <AnimalIcon type="penguin" size="lg" variant="head" />
                  <div>
                    <h3 className="text-xl font-bold text-penguin-500">The Penguin</h3>
                    <p className="text-sm text-gray-400">Enthusiastic Buyer</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Penguins buy with emotion and excitement. They love new ideas and want to feel inspired.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400"><span className="text-penguin-500 font-semibold">They want:</span> Energy, vision, recognition, fun experiences</p>
                  <p className="text-gray-400"><span className="text-penguin-500 font-semibold">They avoid:</span> Boring presentations, too many details, negativity</p>
                  <p className="text-gray-400"><span className="text-penguin-500 font-semibold">To win them:</span> Match their energy, paint the big picture, make it exciting</p>
                </div>
              </div>

              {/* Retriever */}
              <div className="bg-white/5 border border-retriever-500/30 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <AnimalIcon type="retriever" size="lg" variant="head" />
                  <div>
                    <h3 className="text-xl font-bold text-retriever-500">The Retriever</h3>
                    <p className="text-sm text-gray-400">Relationship Buyer</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Retrievers need to trust you before they buy. They value connection and want to feel cared for.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400"><span className="text-retriever-500 font-semibold">They want:</span> Personal connection, reassurance, patience, sincerity</p>
                  <p className="text-gray-400"><span className="text-retriever-500 font-semibold">They avoid:</span> Pushy tactics, rushing, conflict, feeling pressured</p>
                  <p className="text-gray-400"><span className="text-retriever-500 font-semibold">To win them:</span> Build rapport, listen actively, don't rush the close</p>
                </div>
              </div>

              {/* Beaver */}
              <div className="bg-white/5 border border-beaver-500/30 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <AnimalIcon type="beaver" size="lg" variant="head" />
                  <div>
                    <h3 className="text-xl font-bold text-beaver-500">The Beaver</h3>
                    <p className="text-sm text-gray-400">Analytical Buyer</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Beavers need data, proof, and time to decide. They do their homework and expect you to do yours.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400"><span className="text-beaver-500 font-semibold">They want:</span> Facts, comparisons, documentation, time to think</p>
                  <p className="text-gray-400"><span className="text-beaver-500 font-semibold">They avoid:</span> Hype, vague claims, pressure to decide quickly</p>
                  <p className="text-gray-400"><span className="text-beaver-500 font-semibold">To win them:</span> Come prepared, provide proof, respect their process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply It Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8 text-center">How to Apply the Principle</h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Know Your Animal</h3>
                  <p className="text-gray-300">
                    Take the quiz to discover your natural selling style. Understanding your default approach
                    helps you recognize when you're projecting your preferences onto customers instead of
                    adapting to theirs.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Spot Their Animal</h3>
                  <p className="text-gray-300">
                    Within the first few minutes of a conversation, observe your customer's behavior. Are they
                    direct and impatient (Lion)? Enthusiastic and talkative (Penguin)? Warm and relationship-focused
                    (Retriever)? Or analytical and detail-oriented (Beaver)?
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Adapt Your Approach</h3>
                  <p className="text-gray-300">
                    Adjust your pace, your language, and your focus to match what your customer needs.
                    Speed up for Lions. Bring energy for Penguins. Slow down for Retrievers. Bring data for Beavers.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Close Their Way</h3>
                  <p className="text-gray-300">
                    When it's time to close, do it in a way that respects their buying style. Lions want
                    a direct ask. Penguins need to feel excited. Retrievers need reassurance. Beavers need
                    time and documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8 text-center">The Principle in Action</h2>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Scenario: A customer walks in looking for new flooring</h3>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AnimalIcon type="lion" size="sm" variant="head" />
                      <span className="font-semibold text-lion-500">If they're a Lion:</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-7">
                      "Here are your top 3 options based on durability and value. This one's our best seller
                      for high-traffic areas. Want me to write up a quote?"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AnimalIcon type="penguin" size="sm" variant="head" />
                      <span className="font-semibold text-penguin-500">If they're a Penguin:</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-7">
                      "Oh, you're going to love this new collection! Picture this in your living room—it's
                      going to completely transform the space. Let me show you what's trending!"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AnimalIcon type="retriever" size="sm" variant="head" />
                      <span className="font-semibold text-retriever-500">If they're a Retriever:</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-7">
                      "Tell me about your home—do you have kids, pets? I want to make sure we find something
                      that really works for your family. There's no rush, take your time."
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AnimalIcon type="beaver" size="sm" variant="head" />
                      <span className="font-semibold text-beaver-500">If they're a Beaver:</span>
                    </div>
                    <p className="text-gray-400 text-sm pl-7">
                      "Here's a comparison sheet showing durability ratings, warranty terms, and price per
                      square foot. I can also get you samples to take home and test."
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-gray-400 italic">
                Same product. Four completely different approaches. Each one designed to meet the
                customer where they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-6">The Bottom Line</h2>

            <div className="p-8 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-green-500/10 border border-white/10 space-y-4">
              <p className="text-xl text-gray-300">
                The Customer Preference Principle™ isn't about manipulation or putting on an act.
              </p>
              <p className="text-xl text-gray-300">
                It's about <span className="text-white font-semibold">serving customers better</span> by
                understanding what they actually need from you.
              </p>
              <p className="text-2xl text-white font-bold mt-6">
                When you meet customers where they are, everybody wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to discover your animal?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Take the quiz to find your natural selling style and learn how to adapt to any customer.
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
