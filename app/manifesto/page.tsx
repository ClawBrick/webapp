"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Bot,
  Wallet,
  Shield,
  Globe,
  Zap,
  Network,
  Cpu,
  Rocket,
  Users,
  ArrowRight,
  Scale,
  Stethoscope,
  GraduationCap,
  Sprout,
  Factory,
  UtensilsCrossed,
  Briefcase,
  Code,
} from "lucide-react";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function ManifestoPage() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const industries = [
    {
      icon: Scale,
      title: "Law Firms",
      description: "Reads contracts, researches case law, and drafts standard documents overnight — so your lawyers spend time winning cases, not digging through paperwork.",
      gradient: "from-amber-500 to-orange-400",
    },
    {
      icon: Stethoscope,
      title: "Clinics & Healthcare",
      description: "Books appointments, handles patient intake, and sends follow-up reminders automatically — giving your staff more time for the care that matters.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: GraduationCap,
      title: "Schools & Educators",
      description: "Personalizes learning for each student, grades assignments, and answers questions 24/7 — so teachers can focus on teaching, not admin.",
      gradient: "from-blue-500 to-indigo-400",
    },
    {
      icon: Sprout,
      title: "Farms & Agriculture",
      description: "Monitors crops, forecasts weather impact, and streamlines your supply chain — helping you grow more with less guesswork.",
      gradient: "from-green-500 to-lime-400",
    },
    {
      icon: Factory,
      title: "Factories & Manufacturing",
      description: "Predicts equipment failures before they happen, flags quality issues in real time, and keeps your supply chain running smoothly.",
      gradient: "from-slate-500 to-gray-400",
    },
    {
      icon: UtensilsCrossed,
      title: "Restaurants & Hospitality",
      description: "Handles reservations, manages inventory, and responds to guest enquiries instantly — so your team can focus on the experience.",
      gradient: "from-rose-500 to-pink-400",
    },
  ];

  const principles = [
    {
      icon: Globe,
      title: "Built for Everyone",
      description: "You shouldn't need a technical team or a big budget to benefit from AI. Every business deserves access.",
    },
    {
      icon: Shield,
      title: "Privacy You Can Trust",
      description: "Your data is safe by design. Every agent follows the privacy and compliance rules of your specific industry.",
    },
    {
      icon: Users,
      title: "People First, Always",
      description: "AI handles the routine so that your people can focus on the decisions that actually require human judgment.",
    },
    {
      icon: Zap,
      title: "Results, Not Hype",
      description: "We measure success by what it means to you: time saved, money recovered, and customers better served.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,122,95,0.2) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(94,96,206,0.15) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)] text-[var(--clay-accent-primary)] text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-[var(--clay-text-secondary)]">
              Our Story & Mission
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-[var(--clay-text-primary)]">
            Your Business,
            <br />
            <span className="gradient-text-animated">Agentic from Today</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-[var(--clay-text-tertiary)] font-light max-w-3xl mx-auto leading-relaxed mb-6">
            Every traditional business — a law firm, a clinic, a farm, a restaurant —
            can now become an Agentic business: one that runs smarter, serves better,
            and never stops working, even when you do.
          </p>
          <p className="text-lg text-[var(--clay-text-secondary)] max-w-2xl mx-auto">
            You don&apos;t need a tech department. You don&apos;t need to understand AI.
            You just need ClawBrick.
          </p>
        </motion.div>

        {/* The Divide Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
              The Opportunity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Big Tech Has AI. <span className="gradient-text">Your Business Can Too.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Saturated Side */}
            <ClayCard className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                  <Code className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--clay-text-primary)]">
                    Already Covered
                  </h3>
                  <p className="text-[var(--clay-text-muted)]">
                    Tech-first industries got here first
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {["Software & Tech Companies", "Online & E-commerce Businesses", "Financial Services", "Digital Marketing"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[var(--clay-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--clay-border)]">
                <p className="text-emerald-600 font-semibold">
                  Well served • Many tools to choose from
                </p>
              </div>
            </ClayCard>

            {/* Untapped Side */}
            <ClayCard className="p-8 relative overflow-hidden border-l-4 border-l-[var(--clay-accent-primary)]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--clay-accent-primary)]/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--clay-accent-primary)]/20 flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-[var(--clay-accent-primary)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--clay-text-primary)]">
                    Your Chance
                  </h3>
                  <p className="text-[var(--clay-text-muted)]">
                    Where ClawBrick changes everything
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {["Law Firms & Professional Services", "Clinics, Hospitals & Pharmacies", "Schools, Tutors & Trainers", "Farms, Factories & Hospitality", "Physical Retail & Local Businesses", "Any Traditional or SaaS Business"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                    <span className="text-[var(--clay-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--clay-border)]">
                <p className="text-[var(--clay-accent-primary)] font-semibold">
                  Huge opportunity • ClawBrick is built for you
                </p>
              </div>
            </ClayCard>
          </div>
        </motion.div>

        {/* Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[var(--clay-accent-indigo)] uppercase tracking-widest">
              What Your Agent Can Do
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              An AI That <span className="gradient-text">Actually Knows Your Business</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-3xl mx-auto">
              ClawBrick agents aren&apos;t generic chatbots. They are trained for the way your type of
              business actually operates — your workflows, your compliance, your customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ClayCard interactive className="h-full group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <industry.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-[var(--clay-text-primary)] group-hover:text-[var(--clay-accent-primary)] transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] leading-relaxed group-hover:text-[var(--clay-text-secondary)] transition-colors">
                    {industry.description}
                  </p>
                </ClayCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Infrastructure Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <ClayCard className="p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--clay-accent-primary)] to-[var(--clay-accent-indigo)] opacity-10 blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
                  How It Works
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-[var(--clay-text-primary)]">
                  Up and Running in Minutes
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Your Industry, Pre-Configured
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      Every agent comes ready for your business type. No setup hassle, no jargon,
                      no learning curve. Just pick your industry and go.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Cloud or On-Site — Your Choice
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      Run your agent in the cloud for convenience, or use Genevieve hardware
                      to keep everything on your premises for maximum privacy.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      You Stay in Control
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      Your agent handles the repetitive work and flags anything that needs
                      a human decision. You approve, you decide, you stay in charge.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Live in Under 5 Minutes
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      No IT team needed. No technical knowledge required.
                      Select your business type, answer a few simple questions, and your agent is live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ClayCard>
        </motion.div>

        {/* Principles Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--clay-text-primary)] mb-4">
              What We Believe In
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ClayCard interactive className="h-full text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center mx-auto mb-6">
                    <principle.icon className="w-8 h-8 text-[var(--clay-accent-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--clay-text-primary)] mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </ClayCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <ClayCard className="p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[var(--clay-accent-primary)] to-[var(--clay-accent-indigo)] opacity-10 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-[var(--clay-accent-indigo)] to-[var(--clay-accent-primary)] opacity-10 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--clay-text-primary)]">
                Turning Every Business into an <span className="gradient-text">Agentic Business</span>
              </h2>
              <p className="text-lg text-[var(--clay-text-tertiary)] leading-relaxed mb-6">
                The biggest productivity leap in a generation shouldn&apos;t only go to the biggest companies.
                A family clinic should be able to run like a hospital with an AI team.
                A small law firm should be able to compete like a big one.
              </p>
              <p className="text-lg text-[var(--clay-text-secondary)] leading-relaxed">
                ClawBrick is how every business becomes an Agentic business — one powered by AI,
                running 24/7, and growing without limits.
              </p>
            </div>
          </ClayCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--clay-text-primary)]">
            Make Your Business <span className="gradient-text">Agentic Today</span>
          </h2>
          <p className="text-[var(--clay-text-tertiary)] text-lg mb-8 max-w-2xl mx-auto">
            Join the thousands of businesses going agentic. Set up your first AI agent today
            and start saving time, serving customers better, and growing without limits.
          </p>

          {/* $100K Reward Announcement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <div className="inline-block relative">
              <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[var(--clay-accent-primary)] via-amber-400 to-[var(--clay-accent-indigo)] opacity-70 blur-sm" />
              <div className="relative rounded-3xl bg-[var(--clay-surface)] px-8 py-7 shadow-[var(--shadow-clay-floating)] max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Builder Reward
                  </span>
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold gradient-text-animated mb-3">
                  $100,000 USD
                </p>
                <p className="text-[var(--clay-text-secondary)] text-base leading-relaxed max-w-lg mx-auto">
                  We are putting up a{" "}
                  <span className="text-[var(--clay-accent-primary)] font-semibold">
                    $100K USD reward
                  </span>{" "}
                  for builders and projects that bring AI to industries traditionally overlooked.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/agents">
              <ClayButton
                variant="primary"
                className="flex items-center gap-2 text-white px-8 py-4"
              >
                Deploy My First Agent
                <ArrowRight className="w-5 h-5" />
              </ClayButton>
            </Link>
            <ClayButton
              variant="default"
              className="text-[var(--clay-text-secondary)] px-8 py-4 font-semibold"
              onClick={() => { setShowForm(true); setSubmitted(false); setEmail(""); }}
            >
              Get Early Access
            </ClayButton>

          </div>
        </motion.div>

        {/* Registration Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-3xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-floating)] p-8"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--clay-bg)] flex items-center justify-center text-[var(--clay-text-tertiary)] hover:text-[var(--clay-accent-primary)] transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--clay-accent-primary)] to-amber-400 flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--clay-text-primary)] mb-2">
                    You&apos;re in! 🎉
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] leading-relaxed">
                    Thanks for registering your interest in the{" "}
                    <span className="text-[var(--clay-accent-primary)] font-semibold">
                      $100K Builder Reward
                    </span>
                    . We&apos;ll be in touch at{" "}
                    <span className="font-semibold text-[var(--clay-text-secondary)]">{email}</span>{" "}
                    with everything you need to get started.
                  </p>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--clay-accent-primary)] to-amber-400 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 text-amber-400 text-sm font-semibold mb-4">
                      <Sparkles className="w-4 h-4" />
                      $100K Builder Reward
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--clay-text-primary)] mb-2">
                      Register Your Interest
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)] text-sm">
                      Enter your email and we&apos;ll keep you updated on how to
                      participate and shape the future of industry AI.
                    </p>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label
                        htmlFor="reward-email"
                        className="block text-sm font-medium text-[var(--clay-text-secondary)] mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="reward-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--clay-bg)] border border-[var(--clay-border)] text-[var(--clay-text-primary)] placeholder-[var(--clay-text-tertiary)] focus:outline-none focus:border-[var(--clay-accent-primary)] transition-colors text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--clay-accent-primary)] to-amber-400 text-white font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        <>
                          Register Now
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
