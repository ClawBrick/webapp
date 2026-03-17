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
      title: "Legal",
      description: "Contract review, discovery, and research—freeing lawyers for strategy and advocacy.",
      gradient: "from-amber-500 to-orange-400",
    },
    {
      icon: Stethoscope,
      title: "Healthcare",
      description: "Intake, scheduling, and documentation—returning time to patient care.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Personalized learning, grading, and student support—amplifying teacher impact.",
      gradient: "from-blue-500 to-indigo-400",
    },
    {
      icon: Sprout,
      title: "Agriculture",
      description: "Crop monitoring, yield prediction, and logistics—turning data into harvests.",
      gradient: "from-green-500 to-lime-400",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Maintenance prediction, quality control, and supply chain—preventing downtime.",
      gradient: "from-slate-500 to-gray-400",
    },
    {
      icon: UtensilsCrossed,
      title: "Hospitality",
      description: "Inventory, reservations, and service—letting staff focus on guests.",
      gradient: "from-rose-500 to-pink-400",
    },
  ];

  const principles = [
    {
      icon: Globe,
      title: "Accessibility First",
      description: "AI should not be the exclusive domain of tech giants. Every business deserves access.",
    },
    {
      icon: Shield,
      title: "Compliance as Foundation",
      description: "Industry-specific AI must meet industry-specific requirements from day one.",
    },
    {
      icon: Users,
      title: "Human Augmentation",
      description: "AI handles the repetitive while humans provide judgment. Multiplication, not replacement.",
    },
    {
      icon: Zap,
      title: "Practical Impact",
      description: "We measure success by outcomes: hours saved, errors reduced, satisfaction improved.",
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
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--clay-text-tertiary)] hover:text-[var(--clay-accent-primary)] transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </motion.div>

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
              The Manifesto
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-[var(--clay-text-primary)]">
            AI for the
            <br />
            <span className="gradient-text-animated">Other Eighty Percent</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-[var(--clay-text-tertiary)] font-light max-w-3xl mx-auto leading-relaxed mb-6">
            While developers have coding assistants and office workers have writing tools,
            most industries remain frozen in the pre-AI era.
          </p>
          <p className="text-lg text-[var(--clay-text-secondary)] max-w-2xl mx-auto">
            Lawyers still review contracts by hand. Doctors drown in paperwork.
            Teachers grade into the night. We built ClawBrick for them.
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
              The Great Divide
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              AI Has Arrived. <span className="gradient-text">But Not for Everyone.</span>
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
                    Saturated
                  </h3>
                  <p className="text-[var(--clay-text-muted)]">
                    AI transformed these first
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {["Technology & Software", "Administrative Work", "Financial Analysis", "Data Processing"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[var(--clay-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--clay-border)]">
                <p className="text-emerald-600 font-semibold">
                  High adoption • High productivity gains
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
                    Untapped
                  </h3>
                  <p className="text-[var(--clay-text-muted)]">
                    Waiting for their AI
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {["Legal & Professional Services", "Healthcare & Medicine", "Education & Training", "Agriculture & Farming", "Manufacturing & Industry", "Hospitality & Food Service"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                    <span className="text-[var(--clay-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--clay-border)]">
                <p className="text-[var(--clay-accent-primary)] font-semibold">
                  Low adoption • Massive opportunity
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
              Beyond Generic Chatbots
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Specialized Agents for <span className="gradient-text">Real Work</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-3xl mx-auto">
              The future of industry AI is not a smarter chatbot. It is agents that understand your work.
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
                  Infrastructure
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-[var(--clay-text-primary)]">
                  Built for Real-World Deployment
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Compliance by Design
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      HIPAA for healthcare. Privilege protection for legal. FERPA for education.
                      Compliance is not a feature—it is the foundation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Deployment Flexibility
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      Cloud for convenience. Edge for privacy. Our Genevieve hardware
                      brings AI to your premises when data cannot leave.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Human-in-the-Loop
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      AI handles routine work while escalating complex decisions to human judgment.
                      Augmentation, not replacement.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] mb-2">
                      Template-Based Deployment
                    </h3>
                    <p className="text-[var(--clay-text-tertiary)]">
                      No AI expertise required. Select your industry, customize, deploy.
                      From zero to production in minutes.
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
              Our Principles
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              The foundation of everything we build
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
                Democratizing the <span className="gradient-text">AI Revolution</span>
              </h2>
              <p className="text-lg text-[var(--clay-text-tertiary)] leading-relaxed mb-6">
                The greatest productivity gains of our lifetime should not be limited to software engineers.
                Every lawyer, doctor, teacher, farmer, and restaurant owner deserves the same advantage.
              </p>
              <p className="text-lg text-[var(--clay-text-secondary)] leading-relaxed">
                ClawBrick is the bridge between AI potential and the industries that power our world.
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
            Join the <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-[var(--clay-text-tertiary)] text-lg mb-8 max-w-2xl mx-auto">
            The AI revolution does not have to concentrate benefits in the hands of the few.
            It can elevate every industry, every profession, every worker.
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
                Start Building
                <ArrowRight className="w-5 h-5" />
              </ClayButton>
            </Link>
            <ClayButton
              variant="default"
              className="text-[var(--clay-text-secondary)] px-8 py-4 font-semibold"
              onClick={() => { setShowForm(true); setSubmitted(false); setEmail(""); }}
            >
              Register Interest
            </ClayButton>
            <a
              href="https://docs.clawbrick.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ClayButton
                variant="default"
                className="text-[var(--clay-text-secondary)] px-8 py-4"
              >
                Read the Docs
              </ClayButton>
            </a>
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
