"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

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
  const typesSection = useInView(0.2);
  const howItWorksSection = useInView(0.2);
  const quadrantSection = useInView(0.3);

  const stat1 = useCounter(4, 1500, statsSection.inView);
  const stat2 = useCounter(92, 2000, statsSection.inView);
  const stat3 = useCounter(30, 1800, statsSection.inView);

  const animals = [
    {
      type: "lion",
      emoji: "🦁",
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
      emoji: "🐧",
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
      emoji: "🐕",
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
      emoji: "🦫",
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
    { num: "01", title: "Discover", desc: "Take our 5-minute assessment to uncover your natural selling style" },
    { num: "02", title: "Understand", desc: "Learn your primary and secondary animal types and what drives your approach" },
    { num: "03", title: "Adapt", desc: "Recognize customer types and flex your style to match their preferences" },
    { num: "04", title: "Excel", desc: "Close more deals by speaking each customer's language" }
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

        {/* Floating emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-8xl opacity-20 animate-float" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>🦁</span>
          <span className="absolute text-7xl opacity-20 animate-float" style={{ top: '15%', right: '10%', animationDelay: '1s' }}>🐧</span>
          <span className="absolute text-8xl opacity-20 animate-float" style={{ bottom: '20%', left: '8%', animationDelay: '2s' }}>🐕</span>
          <span className="absolute text-7xl opacity-20 animate-float" style={{ bottom: '15%', right: '5%', animationDelay: '0.5s' }}>🦫</span>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="text-sm">🦁🐧🐕🦫</span>
            <span className="text-sm text-gray-400">The Animal Selling Framework</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="text-white">Sell the way</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)",
              }}
            >
              they want to buy
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
            <div className={`transition-all duration-700 ${statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-6xl md:text-7xl font-black text-white mb-2">{stat1}</div>
              <div className="text-gray-400 text-lg">Distinct Selling Styles</div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-6xl md:text-7xl font-black text-white mb-2">{stat2}%</div>
              <div className="text-gray-400 text-lg">Of salespeople have a dominant type</div>
            </div>
            <div className={`transition-all duration-700 delay-400 ${statsSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-6xl md:text-7xl font-black text-white mb-2">{stat3}+</div>
              <div className="text-gray-400 text-lg">Questions in our assessment</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Types - Infographic Grid */}
      <section ref={typesSection.ref} className="py-24" id="types">
        <div className="container mx-auto px-4">
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
                          <span className="text-6xl mb-4 block">{animal.emoji}</span>
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

      {/* The Quadrant Visual */}
      <section ref={quadrantSection.ref} className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Framework
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Two axes define your selling style: Task vs. People focus, and Fast vs. Methodical pace.
            </p>
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${quadrantSection.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative aspect-square max-w-2xl mx-auto">
              {/* Axes */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Vertical axis */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                {/* Horizontal axis */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* Axis Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium uppercase tracking-wider">
                Fast-Paced
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium uppercase tracking-wider">
                Methodical
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium uppercase tracking-wider -rotate-90 origin-center">
                Task-Focused
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium uppercase tracking-wider rotate-90 origin-center">
                People-Focused
              </div>

              {/* Quadrants */}
              <Link href="/animals/lion">
                <div className="absolute top-[5%] left-[5%] w-[42%] h-[42%] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer"
                     style={{ backgroundColor: '#dc262620', border: '2px solid #dc262650' }}>
                  <span className="text-5xl mb-2">🦁</span>
                  <div className="font-bold text-white text-lg">Lion</div>
                  <div className="text-sm" style={{ color: '#dc2626' }}>The Closer</div>
                </div>
              </Link>

              <Link href="/animals/penguin">
                <div className="absolute top-[5%] right-[5%] w-[42%] h-[42%] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer"
                     style={{ backgroundColor: '#0891b220', border: '2px solid #0891b250' }}>
                  <span className="text-5xl mb-2">🐧</span>
                  <div className="font-bold text-white text-lg">Penguin</div>
                  <div className="text-sm" style={{ color: '#0891b2' }}>The Connector</div>
                </div>
              </Link>

              <Link href="/animals/beaver">
                <div className="absolute bottom-[5%] left-[5%] w-[42%] h-[42%] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer"
                     style={{ backgroundColor: '#05966920', border: '2px solid #05966950' }}>
                  <span className="text-5xl mb-2">🦫</span>
                  <div className="font-bold text-white text-lg">Beaver</div>
                  <div className="text-sm" style={{ color: '#059669' }}>The Specialist</div>
                </div>
              </Link>

              <Link href="/animals/retriever">
                <div className="absolute bottom-[5%] right-[5%] w-[42%] h-[42%] rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-pointer"
                     style={{ backgroundColor: '#d9770620', border: '2px solid #d9770650' }}>
                  <span className="text-5xl mb-2">🐕</span>
                  <div className="font-bold text-white text-lg">Retriever</div>
                  <div className="text-sm" style={{ color: '#d97706' }}>The Trusted Advisor</div>
                </div>
              </Link>
            </div>
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

                  <div className="text-center">
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

      {/* Adapt Your Style Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Adapt to Any Customer
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The real power of Animal Selling is reading your customer's type and adjusting your approach
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {animals.map((animal) => (
              <div
                key={animal.type}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{animal.emoji}</span>
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
            <div className="text-6xl mb-6">🦁🐧🐕🦫</div>
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
