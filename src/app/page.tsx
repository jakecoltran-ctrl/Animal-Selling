"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { TeamSafariBubble } from "@/components/ui/TeamSafariLogo";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { AnimalType } from "@/types";

// Animated counter hook
function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
}

// Intersection observer hook for animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function Home() {
  const statsSection = useInView(0.3);
  const notAboutYouSection = useInView(0.3);
  const typesSection = useInView(0.2);
  const howItWorksSection = useInView(0.2);
  const quadrantSection = useInView(0.3);

  const stat1 = useCounter(4, 1500, statsSection.inView);
  const stat2 = useCounter(92, 2000, statsSection.inView);
  const stat3 = useCounter(24, 1800, statsSection.inView);

  const animals: {
    type: AnimalType;
    name: string;
    title: string;
    color: string;
    traits: string[];
    motto: string;
    description: string;
    strength: string;
    challenge: string;
  }[] = [
    {
      type: "lion",
      name: "The Lion",
      title: "The Closer",
      color: "#dc2626",
      traits: ["Direct", "Competitive", "Results-driven"],
      motto: "Let's get this done.",
      description: "Lions are natural closers who thrive on competition and results. They cut through noise, take charge, and drive deals to completion with confidence and urgency.",
      strength: "Closing deals fast",
      challenge: "May rush relationships"
    },
    {
      type: "penguin",
      name: "The Penguin",
      title: "The Connector",
      color: "#0891b2",
      traits: ["Enthusiastic", "Social", "Persuasive"],
      motto: "People buy from people they like.",
      description: "Penguins build instant rapport and create excitement around every opportunity. Their energy is contagious, making customers feel valued and engaged.",
      strength: "Building relationships",
      challenge: "May overlook details"
    },
    {
      type: "retriever",
      name: "The Retriever",
      title: "The Trusted Advisor",
      color: "#d97706",
      traits: ["Patient", "Reliable", "Supportive"],
      motto: "I'm here to help you succeed.",
      description: "Retrievers earn deep trust through genuine care and consistency. They prioritize long-term partnerships over quick wins, becoming indispensable to their clients.",
      strength: "Customer loyalty",
      challenge: "May avoid confrontation"
    },
    {
      type: "beaver",
      name: "The Beaver",
      title: "The Specialist",
      color: "#059669",
      traits: ["Analytical", "Thorough", "Expert"],
      motto: "Let me show you the data.",
      description: "Beavers win through expertise and preparation. They provide comprehensive solutions backed by research, earning respect as trusted authorities in their field.",
      strength: "Technical credibility",
      challenge: "May over-prepare"
    }
  ];

  const steps = [
    { num: "01", title: "Know Your Animal", desc: "Discover your natural selling style and tendencies through our 5-minute assessment" },
    { num: "02", title: "Spot Their Animal", desc: "Learn to quickly identify your customer's buying style from behavioral cues" },
    { num: "03", title: "Adapt Your Approach", desc: "Flex your communication to match their preferences, not yours" },
    { num: "04", title: "Close Their Way", desc: "Use the right close for each animal type and win more deals" }
  ];

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 20%, #dc262640 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, #0891b240 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, #d9770640 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, #05966940 0%, transparent 50%)
              `
            }}
          />
        </div>

        {/* Floating animal head icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-12 sm:w-12 md:w-20 lg:w-24 opacity-15 sm:opacity-20 animate-float" style={{ top: '10%', left: '3%', animationDelay: '0s' }}>
            <Image src="/animals/lion-head.png" alt="" width={96} height={96} unoptimized />
          </div>
          <div className="absolute w-10 sm:w-10 md:w-16 lg:w-20 opacity-15 sm:opacity-20 animate-float" style={{ top: '12%', right: '3%', animationDelay: '1s' }}>
            <Image src="/animals/penguin-head.png" alt="" width={80} height={80} unoptimized />
          </div>
          <div className="absolute w-12 sm:w-12 md:w-20 lg:w-24 opacity-15 sm:opacity-20 animate-float" style={{ bottom: '18%', left: '5%', animationDelay: '2s' }}>
            <Image src="/animals/retriever-head.png" alt="" width={96} height={96} unoptimized />
          </div>
          <div className="absolute w-10 sm:w-10 md:w-16 lg:w-20 opacity-15 sm:opacity-20 animate-float" style={{ bottom: '12%', right: '2%', animationDelay: '0.5s' }}>
            <Image src="/animals/beaver-head.png" alt="" width={80} height={80} unoptimized />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="text-white">Sell the way</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)",
              }}
            >
              Customers want to buy
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Four animal archetypes. One powerful framework.
            <span className="text-white"> Understand yourself, read your customers, and close more deals.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button
                size="lg"
                className="text-lg px-8 py-6 text-white font-bold"
                style={{ background: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)" }}
              >
                Discover Your Animal
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/5">
                How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsSection.ref} className="py-20 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-700 cursor-default hover:scale-105 ${statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-2">{stat1}</div>
              <div className="text-gray-400 text-base sm:text-lg">Distinct Selling Styles</div>
            </div>
            <div className={`transition-all duration-700 delay-200 cursor-default hover:scale-105 ${statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-2">{stat2}%</div>
              <div className="text-gray-400 text-base sm:text-lg">Of salespeople have a dominant animal type</div>
            </div>
            <div className={`transition-all duration-700 delay-400 cursor-default hover:scale-105 ${statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-2">{stat3}</div>
              <div className="text-gray-400 text-base sm:text-lg">Questions in our assessment</div>
            </div>
          </div>
        </div>
      </section>

      {/* It's Not About You Section - Customer Preference Principle */}
      <section ref={notAboutYouSection.ref} className="py-24 relative">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 50%, #dc262630 0%, transparent 50%),
                radial-gradient(ellipse at 70% 50%, #05966930 0%, transparent 50%)
              `
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Principle Badge */}
          <div className={`inline-block mb-6 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 transition-all duration-700 ${notAboutYouSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">The Customer Preference Principle™</span>
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight transition-all duration-700 ${notAboutYouSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white">It's Not About You,</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)",
              }}
            >
              It's About Them
            </span>
          </h2>

          <p className={`text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 transition-all duration-700 delay-200 ${notAboutYouSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Most salespeople focus on what matters to them—but customers buy based on what matters to <span className="text-white">them</span>.
            That's why understanding your animal and recognizing your customer's is key to building
            <span className="text-white"> trust</span>, <span className="text-white">connection</span>, and <span className="text-white">closing more sales</span>.
          </p>

          <p className={`text-lg text-gray-500 max-w-2xl mx-auto italic transition-all duration-700 delay-300 ${notAboutYouSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            "Sell to people the way THEY want to buy—not the way you want to sell."
          </p>
        </div>
      </section>

      {/* The Four Types - Infographic Grid */}
      <section ref={typesSection.ref} className="py-24 relative" id="types">
        {/* Gradient background like hero */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 20%, #dc262640 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, #0891b240 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, #d9770640 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, #05966940 0%, transparent 50%)
              `
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Four Animal Types
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Each type brings unique strengths to sales. Which one sounds like you?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {animals.map((animal, index) => (
              <Link key={animal.type} href={`/animals/${animal.type}`}>
                <div
                  className={`relative group transition-all duration-700 ${typesSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div
                    className="relative overflow-hidden rounded-2xl p-8 h-full border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    style={{
                      backgroundColor: `${animal.color}08`,
                      borderColor: `${animal.color}30`,
                    }}
                  >
                    {/* Background glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${animal.color}15 0%, transparent 70%)`
                      }}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <AnimalIcon type={animal.type} size="xl" className="mb-4" />
                          <h3 className="text-2xl font-black text-white">{animal.name}</h3>
                          <p className="text-lg font-medium" style={{ color: animal.color }}>{animal.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end max-w-[140px]">
                          {animal.traits.map((trait) => (
                            <span
                              key={trait}
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{
                                backgroundColor: `${animal.color}20`,
                                color: animal.color
                              }}
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Motto */}
                      <blockquote
                        className="text-lg italic mb-6 pl-4 border-l-2"
                        style={{ borderColor: animal.color, color: `${animal.color}` }}
                      >
                        "{animal.motto}"
                      </blockquote>

                      {/* Description */}
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {animal.description}
                      </p>

                      {/* Strength & Challenge */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Superpower</div>
                          <div className="text-white font-medium">{animal.strength}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Watch Out</div>
                          <div className="text-white font-medium">{animal.challenge}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksSection.ref} className="py-24" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Four simple steps to transform your sales approach
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.num}
                  className={`relative transition-all duration-700 ${howItWorksSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-white/20 to-transparent" />
                  )}

                  <div className="text-center p-4 rounded-xl transition-all duration-300 hover:bg-white/5 hover:scale-[1.03]">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-black mb-4 text-white"
                      style={{
                        background: `linear-gradient(135deg, ${animals[index].color}40, ${animals[index].color}20)`,
                        border: `2px solid ${animals[index].color}50`
                      }}
                    >
                      {step.num}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Safari Section */}
      <section ref={quadrantSection.ref} className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${quadrantSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="text-center mb-12">
              <TeamSafariBubble className="mb-6" />
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Unlock your team's full potential by understanding how your selling styles work together.
              </p>
            </div>

            {/* What is Team Safari */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-white mb-2">Team Composition</h3>
                <p className="text-gray-400 text-sm">
                  See the distribution of Lions, Penguins, Retrievers, and Beavers across your sales team at a glance.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-bold text-white mb-2">Better Collaboration</h3>
                <p className="text-gray-400 text-sm">
                  Understand how different styles complement each other and where friction might occur in deals.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-white mb-2">Strategic Pairing</h3>
                <p className="text-gray-400 text-sm">
                  Pair team members strategically for different sales scenarios based on their animal strengths.
                </p>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-10">
              <h3 className="text-xl font-bold text-white mb-6 text-center">How Team Safari™ Works</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Create a Team</h4>
                    <p className="text-gray-400 text-sm">Set up your team and get a unique invite code to share.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-cyan-500 flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Invite Members</h4>
                    <p className="text-gray-400 text-sm">Share the code with colleagues who've taken the quiz.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">View Insights</h4>
                    <p className="text-gray-400 text-sm">See your team's animal mix and collaboration dynamics.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/dashboard/team">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 text-white font-bold hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  Start Your Safari
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Adapt Your Style Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Adapt to Any Customer
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The real power of Animal Selling™ is reading your customer's type and adjusting your approach
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {animals.map((animal) => (
              <div
                key={animal.type}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AnimalIcon type={animal.type} size="lg" variant="head" />
                  <div>
                    <div className="font-bold text-white">Selling to a {animal.name.replace('The ', '')}</div>
                    <div className="text-sm" style={{ color: animal.color }}>{animal.title}</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  {animal.type === 'lion' && (
                    <>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Get to the point quickly</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Focus on results and ROI</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Be confident and direct</li>
                    </>
                  )}
                  {animal.type === 'penguin' && (
                    <>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Build personal rapport first</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Share success stories</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Keep the energy high</li>
                    </>
                  )}
                  {animal.type === 'retriever' && (
                    <>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Take time to build trust</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Show genuine care for their needs</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Don't pressure or rush</li>
                    </>
                  )}
                  {animal.type === 'beaver' && (
                    <>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Come prepared with data</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Answer questions thoroughly</li>
                      <li className="flex items-start gap-2"><span style={{ color: animal.color }}>→</span> Give them time to analyze</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: "linear-gradient(135deg, #dc262615 0%, #d9770615 25%, #0891b215 50%, #05966915 100%)"
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-2 mb-6">
              <AnimalIcon type="lion" size="2xl" />
              <AnimalIcon type="penguin" size="2xl" />
              <AnimalIcon type="retriever" size="2xl" />
              <AnimalIcon type="beaver" size="2xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to discover your animal?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Take our 5-minute quiz and unlock your personalized selling insights.
              Join thousands of salespeople who've transformed their approach.
            </p>
            <Link href="/quiz">
              <Button
                size="lg"
                className="text-xl px-12 py-8 text-white font-bold shadow-2xl hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)" }}
              >
                Take the Quiz Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
