"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Cpu,
  ChevronRight,
  Play,
  Activity,
  Terminal,
  Box,
  Wifi,
  Lock,
  Building2,
  Stethoscope,
  GraduationCap,
  Scale,
  UtensilsCrossed,
  Sprout,
  Factory,
  Briefcase,
  Code,
} from "lucide-react";
import { GenevieveShowcase } from "@/components/GenevieveShowcase";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 200]),
    springConfig,
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: Building2,
      title: "Works for Any Business",
      description:
        "Whether you run a law office, clinic, restaurant, school, or factory — we have an agent built just for your world",
      gradient: "from-[var(--clay-accent-primary)] to-[#F4A261]",
    },
    {
      icon: Shield,
      title: "Safe & Private by Default",
      description:
        "Your business data stays yours. Every agent is built with the privacy and compliance rules of your industry baked in",
      gradient:
        "from-[var(--clay-accent-indigo)] to-[var(--clay-accent-indigo-soft)]",
    },
    {
      icon: Cpu,
      title: "Up and Running Today",
      description:
        "No technical team needed. Pick your business type, set it up in minutes, and your AI assistant starts working",
      gradient:
        "from-[var(--clay-text-secondary)] to-[var(--clay-text-tertiary)]",
    },
  ];

  const industries = [
    {
      icon: Scale,
      name: "Law Firms",
      description: "Reads contracts, researches cases, and drafts documents overnight — so lawyers can focus on winning",
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: Stethoscope,
      name: "Clinics & Healthcare",
      description: "Books appointments, handles patient intake, and chases follow-up — letting your staff focus on care",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: GraduationCap,
      name: "Schools & Tutors",
      description: "Personalizes lessons, grades papers, and answers student questions around the clock",
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      icon: UtensilsCrossed,
      name: "Restaurants & Hotels",
      description: "Manages reservations, handles orders, and replies to guests instantly — even at midnight",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      icon: Sprout,
      name: "Farms & Agriculture",
      description: "Monitors crops, predicts yields, and manages supply chains — turning data into better harvests",
      color: "from-green-500/20 to-lime-500/20",
    },
    {
      icon: Factory,
      name: "Factories & Manufacturing",
      description: "Catches quality issues, predicts breakdowns, and tracks inventory before anything goes wrong",
      color: "from-slate-500/20 to-gray-500/20",
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Soft, warm background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: mousePosition.x * 30 - 15,
              y: mousePosition.y * 30 - 15,
            }}
            transition={{ type: "spring", damping: 50 }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(224,122,95,0.25) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
          <motion.div
            animate={{
              x: (1 - mousePosition.x) * 20 - 10,
              y: (1 - mousePosition.y) * 20 - 10,
            }}
            transition={{ type: "spring", damping: 50, delay: 0.1 }}
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(94,96,206,0.2) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)] text-[var(--clay-accent-primary)] text-sm font-semibold mb-8"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[var(--clay-success)] shadow-[0_0_10px_var(--clay-success)]"
                />
                <span className="text-[var(--clay-text-secondary)]">
                  Agentic as a Service — Now Open
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--clay-text-muted)]" />
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[var(--clay-text-primary)]"
              >
                <span className="block gradient-text-animated">ClawBrick</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl text-[var(--clay-text-tertiary)] font-light max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Give your business its own{" "}
                <span className="text-[var(--clay-accent-primary)] font-semibold">
                  AI-powered team
                </span>
                .
                <br />
                <span className="text-[var(--clay-text-secondary)]">
                  ClawBrick turns any traditional or SaaS business into an
                  Agentic business — one that works smarter, faster, and 24/7.
                </span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              >
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
                  className="flex items-center gap-3 text-[var(--clay-text-secondary)] px-6 py-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5 text-[var(--clay-accent-primary)]" />
                  </div>
                  See How It Works
                </ClayButton>
              </motion.div>

              {/* Stats - Clean & Simple */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              >
                {[
                  { value: "6+", label: "Business Types" },
                  { value: "24/7", label: "Always On" },
                  { value: "5min", label: "To Go Live" },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                      className="text-2xl sm:text-3xl font-bold text-[var(--clay-text-primary)]"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-[var(--clay-text-muted)] mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Genevieve Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block"
            >
              <GenevieveShowcase />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-7 h-12 rounded-full bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-[var(--clay-text-muted)]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* The Gap Section - Clean & Visual */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
              The Opportunity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Big Tech Has AI.{" "}
              <span className="gradient-text-animated">Now So Does Your Business.</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--clay-text-tertiary)] leading-relaxed">
              Fortune 500 companies have been using AI for years — cutting costs, serving customers faster,
              and never sleeping. ClawBrick gives the same power to your business,
              without needing a tech team or a big budget.
            </p>
          </motion.div>

          {/* Clean Visual Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Tech Side */}
            <ClayCard className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Code className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--clay-text-primary)]">
                    Tech Giants & Startups
                  </h3>
                  <p className="text-sm text-[var(--clay-text-muted)]">
                    Already using AI everywhere
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[var(--clay-text-secondary)]">Software companies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[var(--clay-text-secondary)]">Online businesses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[var(--clay-text-secondary)]">Digital agencies</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--clay-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">Well served</span>
                </div>
              </div>
            </ClayCard>

            {/* Everyone Else Side */}
            <ClayCard className="p-8 relative overflow-hidden border-l-4 border-l-[var(--clay-accent-primary)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--clay-accent-primary)]/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--clay-accent-primary)]/20 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[var(--clay-accent-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--clay-text-primary)]">
                    Traditional Businesses
                  </h3>
                  <p className="text-sm text-[var(--clay-text-muted)]">
                    This is where ClawBrick comes in
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                  <span className="text-[var(--clay-text-secondary)]">Law firms & consultancies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                  <span className="text-[var(--clay-text-secondary)]">Clinics, hospitals & pharmacies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                  <span className="text-[var(--clay-text-secondary)]">Schools, restaurants & farms</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--clay-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[var(--clay-accent-primary)]">Ready for you</span>
                </div>
              </div>
            </ClayCard>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="relative py-24 overflow-hidden bg-[var(--clay-surface)]/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--clay-accent-indigo)] uppercase tracking-widest">
              Built for Your World
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Your Business Type, <span className="gradient-text">Your Agent</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              Every agent is pre-built for the way your industry actually works — no setup headaches, no learning curve
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ClayCard interactive className="h-full group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <industry.icon className="w-7 h-7 text-[var(--clay-text-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--clay-text-primary)] mb-2 group-hover:text-[var(--clay-accent-primary)] transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] text-sm">
                    {industry.description}
                  </p>
                </ClayCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--clay-text-primary)]">
              Your Business, <span className="gradient-text-animated">Upgraded</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--clay-text-tertiary)] leading-relaxed">
              You don&apos;t have to be a technology company to think and act like one.
              ClawBrick gives every business — from a family-run clinic to a growing
              restaurant chain — the same AI advantage that billion-dollar companies pay
              millions to build. No jargon, no code, no guesswork. Just results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Dashboard Preview */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Get Your AI Assistant{" "}
              <span className="gradient-text">Running Today</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              No tech skills needed. Pick your business type, answer a few questions, and your agent is live.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {/* Large Card: Active Agents */}
            <ClayCard
              className="md:col-span-2 flex flex-col justify-between"
              interactive
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--clay-text-primary)]">
                    Your AI Workforce
                  </h3>
                  <p className="text-[var(--clay-text-muted)] text-sm mt-1">
                    One dashboard for every industry agent
                  </p>
                </div>
                <span className="w-3 h-3 rounded-full bg-[var(--clay-success)] shadow-[0_0_15px_var(--clay-success)] animate-pulse" />
              </div>
              <div className="flex gap-4 mt-auto">
                {["Contract Helper", "Booking Assistant", "Customer Support"].map(
                  (name, i) => (
                    <div
                      key={i}
                      className="h-16 flex-1 max-w-[140px] rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center"
                    >
                      <span className="text-xs text-[var(--clay-text-tertiary)] font-medium">
                        {name}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </ClayCard>

            {/* Small Card: Wallet */}
            <ClayCard
              interactive
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--clay-accent-indigo)] to-[var(--clay-accent-indigo-soft)] shadow-lg" />
              </div>
              <p className="text-sm font-semibold text-[var(--clay-text-primary)]">
                Start Free
              </p>
              <p className="text-xs text-[var(--clay-text-muted)] mt-1">
                No credit card needed
              </p>
            </ClayCard>

            {/* Card: Templates */}
            <ClayCard interactive>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                  <Box className="w-6 h-6 text-[var(--clay-accent-indigo)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--clay-text-primary)]">
                    Ready-Made Agents
                  </h3>
                  <p className="text-[var(--clay-text-muted)] text-sm mt-1">
                    Pick one and go live in minutes
                  </p>
                </div>
              </div>
              <div className="flex -space-x-3 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--clay-surface)] to-[var(--clay-surface-hover)] border-2 border-[var(--clay-surface)] shadow-md flex items-center justify-center"
                  >
                    <span className="text-xs text-[var(--clay-text-tertiary)]">
                      {i}
                    </span>
                  </div>
                ))}
              </div>
            </ClayCard>

            {/* Card: Terminal */}
            <ClayCard interactive className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-[var(--clay-success)]" />
                </div>
                <span className="text-sm font-semibold text-[var(--clay-text-primary)]">
                  Telegram Control
                </span>
              </div>
              <div className="flex-1 bg-[var(--clay-surface)] rounded-2xl shadow-[var(--shadow-clay-pressed)] p-4 font-mono text-xs text-[var(--clay-text-muted)] overflow-hidden">
                <span className="text-[var(--clay-accent-primary)]">→</span>{" "}
                Your agent is ready. Say hi!
              </div>
            </ClayCard>

            {/* Card: Activity */}
            <ClayCard interactive>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[var(--clay-warning)]" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-[var(--clay-text-primary)]">
                    Work Done
                  </span>
                  <p className="text-xs text-[var(--clay-text-muted)]">
                    Tasks handled by your agents
                  </p>
                </div>
              </div>
              <div className="flex items-end gap-1 h-16">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[var(--clay-accent-primary)]/30 rounded-t-lg"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </ClayCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--clay-accent-indigo)] uppercase tracking-widest">
              Why ClawBrick
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Built for Business, <span className="gradient-text">Not for Tech Teams</span>
            </h2>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ClayCard key={i} interactive className="group">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl font-semibold mb-3 text-[var(--clay-text-primary)] group-hover:text-[var(--clay-accent-primary)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[var(--clay-text-tertiary)] leading-relaxed group-hover:text-[var(--clay-text-secondary)] transition-colors">
                  {feature.description}
                </p>
              </ClayCard>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Preview Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
              For Sensitive Businesses
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              AI That Never <span className="gradient-text">Leaves Your Office</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              For businesses where privacy is everything — like clinics, law firms, and any regulated industry.
              Genevieve keeps all your data on-site, always.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ClayCard className="p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Genevieve Device Illustration */}
                  <div className="w-48 h-64 bg-gradient-to-b from-[var(--clay-surface)] to-[var(--clay-surface-hover)] rounded-[2.5rem] shadow-[var(--shadow-clay-floating)] flex flex-col items-center justify-center p-6">
                    {/* Status lights */}
                    <div className="flex gap-2 mb-8">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--clay-accent-primary)] shadow-[0_0_10px_var(--clay-accent-primary)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--clay-accent-indigo)] shadow-[0_0_10px_var(--clay-accent-indigo)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--clay-success)] shadow-[0_0_10px_var(--clay-success)]" />
                    </div>
                    {/* Logo */}
                    <div className="w-20 h-20 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-[var(--clay-accent-primary)]" />
                    </div>
                    <p className="text-[var(--clay-text-primary)] font-semibold">
                      Genevieve
                    </p>
                    <p className="text-[var(--clay-text-muted)] text-xs">
                      Gen.1 Core
                    </p>
                  </div>
                </div>
              </ClayCard>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {[
                {
                  icon: Lock,
                  title: "Stays On Your Premises",
                  desc: "Patient records, legal files, financial data — nothing ever leaves your building",
                },
                {
                  icon: Zap,
                  title: "Instant Responses",
                  desc: "Your agent replies in real-time, even faster than cloud-based tools",
                },
                {
                  icon: Wifi,
                  title: "Works Without Internet",
                  desc: "Keep running in remote areas, outages, or high-security environments",
                },
                {
                  icon: Shield,
                  title: "Bank-Level Security",
                  desc: "Your data is encrypted and protected like a vault — always",
                },
              ].map((item, i) => (
                <ClayCard
                  key={i}
                  interactive
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[var(--clay-accent-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--clay-text-primary)]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--clay-text-tertiary)]">
                      {item.desc}
                    </p>
                  </div>
                </ClayCard>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[var(--clay-text-primary)]">
              Ready to Make Your <span className="gradient-text">Business Smarter?</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg mb-10 max-w-xl mx-auto">
              Thousands of businesses are already using AI agents to save time,
              cut costs, and serve customers better — around the clock.
              Yours can be next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/agents">
                <ClayButton
                  variant="primary"
                  className="flex items-center gap-2 text-white px-8 py-4"
                >
                  Deploy My First Agent
                  <ArrowRight className="w-5 h-5" />
                </ClayButton>
              </Link>
              <a
                href="https://docs.clawbrick.xyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ClayButton
                  variant="default"
                  className="text-[var(--clay-text-secondary)] px-8 py-4"
                >
                  Learn More
                </ClayButton>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
