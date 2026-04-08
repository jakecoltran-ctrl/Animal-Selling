"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // For now, just simulate sending - can integrate with email service later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Integrate with email service (e.g., Resend, SendGrid, etc.)
    console.log("Form submitted:", formData);

    setStatus("sent");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 py-16 relative overflow-hidden">
      <AnimatedBackground opacity={0.1} emojiOpacity={0.08} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">📧</div>
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <a
                  href="mailto:animalselling2026@gmail.com"
                  className="text-cyan-400 hover:underline text-sm"
                >
                  animalselling2026@gmail.com
                </a>
                <p className="text-gray-500 text-xs mt-2">
                  We typically respond within 24 hours
                </p>
              </div>

              {/* Common Topics */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">💡</div>
                <h3 className="text-lg font-bold text-white mb-3">Common Topics</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">→</span>
                    Quiz questions or results
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">→</span>
                    Team Safari™ setup help
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">→</span>
                    Premium report issues
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">→</span>
                    Partnership inquiries
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-cyan-400">→</span>
                    Feedback & suggestions
                  </li>
                </ul>
              </div>

              {/* Response Time */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-3">⏱️</div>
                <h3 className="text-lg font-bold text-white mb-2">Quick Support</h3>
                <p className="text-gray-400 text-sm">
                  For immediate help, check out our{" "}
                  <Link href="/about" className="text-cyan-400 hover:underline">
                    FAQ section
                  </Link>{" "}
                  on the About page.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                {status === "sent" ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Thanks for reaching out. We'll get back to you soon.
                    </p>
                    <Button
                      onClick={() => setStatus("idle")}
                      variant="outline"
                      className="border-white/20 hover:bg-white/5"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      >
                        <option value="" className="bg-gray-900">Select a topic...</option>
                        <option value="general" className="bg-gray-900">General Question</option>
                        <option value="quiz" className="bg-gray-900">Quiz / Results Help</option>
                        <option value="team" className="bg-gray-900">Team Safari™ Support</option>
                        <option value="premium" className="bg-gray-900">Premium Report Issue</option>
                        <option value="partnership" className="bg-gray-900">Partnership Inquiry</option>
                        <option value="feedback" className="bg-gray-900">Feedback / Suggestion</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      size="lg"
                      className="w-full text-white font-semibold py-6 hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                      style={{ background: "linear-gradient(90deg, #dc2626, #d97706, #0891b2, #059669)" }}
                    >
                      {status === "sending" ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>

                    {status === "error" && (
                      <p className="text-red-400 text-sm text-center">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}
                  </form>
                )}
              </div>
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
