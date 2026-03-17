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
      title: "Industry Native",
      description:
        "Built for legal, healthcare, education, hospitality, agriculture, and manufacturing",
      gradient: "from-[var(--clay-accent-primary)] to-[#F4A261]",
    },
    {
      icon: Shield,
      title: "Enterprise Secure",
      description:
        "HIPAA, GDPR, and SOC compliant. Your data never leaves your control",
      gradient:
        "from-[var(--clay-accent-indigo)] to-[var(--clay-accent-indigo-soft)]",
    },
    {
      icon: Cpu,
      title: "Deploy in Minutes",
      description:
        "Pre-built templates for your industry. No AI expertise required",
      gradient:
        "from-[var(--clay-text-secondary)] to-[var(--clay-text-tertiary)]",
    },
  ];

  const industries = [
    {
      icon: Scale,
      name: "Legal",
      description: "Contract review, discovery, legal research",
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: Stethoscope,
      name: "Healthcare",
      description: "Patient coordination, intake, records",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: GraduationCap,
      name: "Education",
      description: "Tutoring, grading, curriculum",
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      icon: UtensilsCrossed,
      name: "Hospitality",
      description: "Inventory, reservations, service",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      icon: Sprout,
      name: "Agriculture",
      description: "Monitoring, forecasting, supply chain",
      color: "from-green-500/20 to-lime-500/20",
    },
    {
      icon: Factory,
      name: "Manufacturing",
      description: "Quality control, maintenance, logistics",
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
                  Now in private beta
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
                AI agents for the{" "}
                <span className="text-[var(--clay-accent-primary)] font-semibold">
                  other eighty percent
                </span>
                .
                <br />
                <span className="text-[var(--clay-text-secondary)]">
                  While tech races ahead, most industries remain untouched.
                  We&apos;re changing that.
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
                    Launch App
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
                  Watch Demo
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
                  { value: "6", label: "Industries" },
                  { value: "70%", label: "Untapped" },
                  { value: "5min", label: "To Deploy" },
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
              The AI Divide
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Tech Has Its Agents.{" "}
              <span className="gradient-text-animated">What About Everyone Else?</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--clay-text-tertiary)] leading-relaxed">
              Developers and office workers have AI at their fingertips. Meanwhile,
              lawyers still slog through documents. Doctors drown in paperwork.
              Teachers grade by hand. We built ClawBrick for them.
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
                    Technology
                  </h3>
                  <p className="text-sm text-[var(--clay-text-muted)]">
                    Saturated with AI tools
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[var(--clay-text-secondary)]">Code assistants</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[var(--clay-text-secondary)]">Automated testing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[var(--clay-text-secondary)]">Documentation writers</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--clay-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">Covered</span>
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
                    Everyone Else
                  </h3>
                  <p className="text-sm text-[var(--clay-text-muted)]">
                    Waiting for their AI
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                  <span className="text-[var(--clay-text-secondary)]">Legal contract review</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                  <span className="text-[var(--clay-text-secondary)]">Medical intake & scheduling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--clay-accent-primary)]" />
                  <span className="text-[var(--clay-text-secondary)]">Educational grading & tutoring</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--clay-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[var(--clay-accent-primary)]">Untapped</span>
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
              Industries We Serve
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Built for <span className="gradient-text">Real Work</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              Pre-configured agents that understand your workflows, compliance needs, and day-to-day challenges
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
              Democratizing the <span className="gradient-text-animated">AI Revolution</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--clay-text-tertiary)] leading-relaxed">
              The greatest productivity gains of our lifetime should not be limited
              to software engineers. Every lawyer, doctor, teacher, farmer, and
              restaurant owner deserves the same advantage. ClawBrick is the bridge
              between AI potential and the industries that power our world.
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
              Platform
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Deploy Industry AI{" "}
              <span className="gradient-text">In Minutes</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              No machine learning PhD required. Select your industry, customize your agent, deploy.
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
                {["Legal Review", "Patient Intake", "Menu Optimizer"].map(
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
                Connect Wallet
              </p>
              <p className="text-xs text-[var(--clay-text-muted)] mt-1">
                Solana supported
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
                    Industry Templates
                  </h3>
                  <p className="text-[var(--clay-text-muted)] text-sm mt-1">
                    Pre-built for your sector
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
                  API Access
                </span>
              </div>
              <div className="flex-1 bg-[var(--clay-surface)] rounded-2xl shadow-[var(--shadow-clay-pressed)] p-4 font-mono text-xs text-[var(--clay-text-muted)] overflow-hidden">
                <span className="text-[var(--clay-accent-primary)]">$</span>{" "}
                clawbrick deploy legal-agent
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
                    Activity
                  </span>
                  <p className="text-xs text-[var(--clay-text-muted)]">
                    Cross-industry deployments
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
              Capabilities
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Enterprise Ready, <span className="gradient-text">Industry Focused</span>
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
              Hardware
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Genevieve <span className="gradient-text">Edge AI</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              When your data cannot leave the building. On-premise AI for healthcare,
              legal, and regulated industries.
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
                  title: "Air-Gapped Security",
                  desc: "Data never leaves your premises. HIPAA, GDPR, attorney-client privilege protected",
                },
                {
                  icon: Zap,
                  title: "Sub-50ms Response",
                  desc: "Local inference faster than cloud round-trips",
                },
                {
                  icon: Wifi,
                  title: "Works Offline",
                  desc: "No internet required. Perfect for field work and secure facilities",
                },
                {
                  icon: Shield,
                  title: "Hardware Encryption",
                  desc: "Military-grade security at the silicon level",
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
              Bring AI to <span className="gradient-text">Your Industry</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg mb-10 max-w-xl mx-auto">
              Join thousands of businesses deploying AI agents tailored to their
              unique workflows. From law firms to hospitals, schools to farms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/agents">
                <ClayButton
                  variant="primary"
                  className="flex items-center gap-2 text-white px-8 py-4"
                >
                  Get Started
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
                  Read Documentation
                </ClayButton>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
