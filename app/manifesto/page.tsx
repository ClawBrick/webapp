"use client";

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
  FileCheck,
  BadgeCheck,
  Droplets,
  Landmark,
  Activity,
  ZapIcon,
  Layers,
} from "lucide-react";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function ManifestoPage() {
  const governanceFeatures = [
    {
      icon: Scale,
      title: "Algorithmic Institutions",
      description:
        "Governance moves into Decentralized Autonomous Organizations (DAOs) where voters are agents representing human stakeholders.",
      gradient: "from-[var(--clay-accent-primary)] to-[#F4A261]",
    },
    {
      icon: Layers,
      title: "Polycentric Governance",
      description:
        "Multiple specialized micro-governance layers where Urban Planning agents operate under Sustainability DAO protocols.",
      gradient:
        "from-[var(--clay-accent-indigo)] to-[var(--clay-accent-indigo-soft)]",
    },
    {
      icon: FileCheck,
      title: "Smart SLAs",
      description:
        "Smart Service Level Agreements replace legal contracts. Agents are automatically penalized for deviating from Constitutional AI guidelines.",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: BadgeCheck,
      title: "AgentBound Tokens (ABTs)",
      description:
        "Non-transferable cryptographic resumes for agents. Every operation is logged on-chain, creating immutable reputation history.",
      gradient: "from-violet-500 to-purple-400",
    },
  ];

  const tokenomicsFeatures = [
    {
      icon: Zap,
      title: "A2A Micro-Payments",
      description:
        "Agent-to-Agent transactions in Compute-Backed Tokens. A transport agent pays a weather-sensing agent 0.00001 tokens for a 10-second visibility update.",
      gradient: "from-amber-500 to-orange-400",
      highlight: "Real-time value streaming",
    },
    {
      icon: Shield,
      title: "Staking & Slashing",
      description:
        "Agents stake collateral for high-stakes operations. Success earns yield; failure results in slashed stakes, aligning survival with accuracy.",
      gradient: "from-rose-500 to-pink-400",
      highlight: "Risk management via collateral",
    },
    {
      icon: Droplets,
      title: "Resource-Based Tokenomics",
      description:
        "Tokens represent claims on physical resources: GPU hours, liters of cooling water, kilowatt-hours of solar energy.",
      gradient: "from-cyan-500 to-blue-400",
      highlight: "DePIN infrastructure",
    },
    {
      icon: Activity,
      title: "Hyper-Efficient Markets",
      description:
        "Agents bid on resources automatically. Energy scarcity triggers task pausing and token redistribution to priority operations.",
      gradient: "from-lime-500 to-green-400",
      highlight: "Autonomous resource allocation",
    },
  ];

  const pillars = [
    {
      icon: Globe,
      title: "Permissionless Innovation",
      description:
        "Anyone can build, deploy, and monetize agents without gatekeepers.",
    },
    {
      icon: ZapIcon,
      title: "Interoperability First",
      description:
        "Seamless integration across chains, protocols, and platforms.",
    },
    {
      icon: Users,
      title: "Human-AI Symbiosis",
      description:
        "Tools that amplify human creativity rather than replace it.",
    },
    {
      icon: Rocket,
      title: "Infinite Scale",
      description:
        "Infrastructure that grows with the demands of an agentic world.",
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
            The Post-Human
            <br />
            <span className="gradient-text-animated">Economy</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-[var(--clay-text-tertiary)] font-light max-w-3xl mx-auto leading-relaxed mb-6">
            In a Post-Human Economy, traditional structures of legal systems and
            fiat currencies are replaced by{" "}
            <span className="text-[var(--clay-accent-primary)] font-semibold">
              Algorithmic Governance
            </span>{" "}
            and{" "}
            <span className="text-[var(--clay-accent-indigo)] font-semibold">
              Agentic Tokenomics
            </span>
            .
          </p>

          {/* Concept Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--clay-accent-primary)]/10 to-[var(--clay-accent-indigo)]/10 border border-[var(--clay-accent-primary)]/20"
          >
            <span className="text-lg font-medium gradient-text">
              The Liquification of Infrastructure
            </span>
          </motion.div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <ClayCard className="p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--clay-accent-primary)] to-[var(--clay-accent-indigo)] opacity-10 blur-3xl" />

            <div className="relative z-10 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-[var(--clay-text-primary)]">
                When Operations Move at Machine Speed
              </h2>
              <div className="space-y-6 text-lg text-[var(--clay-text-tertiary)] leading-relaxed">
                <p>
                  Human-led boards and quarterly financial reports become legacy
                  bottlenecks. When operations move at machine speed, we need
                  governance that moves just as fast.
                </p>
                <p>
                  <span className="text-[var(--clay-accent-primary)] font-semibold">
                    ClawBrick is building the agentic rails
                  </span>{" "}
                  that enable an ecosystem of projects, tools, and agents that
                  cater to the various needs of AI agents, the next generation
                  of economic participants.
                </p>
                <p>
                  Just as the internet enabled the digital economy, and
                  blockchain enabled decentralized finance, we are creating the
                  foundation for an economy where autonomous agents transact,
                  collaborate, and create value on their own terms.
                </p>
              </div>
            </div>
          </ClayCard>
        </motion.div>
        {/* Governance Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
              Governance
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              From Laws to <span className="gradient-text">Protocols</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-3xl mx-auto">
              In a Post-Human Economy, governance is not about debating rules;
              it is about the cryptographic enforcement of{" "}
              <span className="font-semibold text-[var(--clay-text-secondary)]">
                Intent
              </span>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {governanceFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ClayCard interactive className="h-full group">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-[var(--clay-text-primary)] group-hover:text-[var(--clay-accent-primary)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] leading-relaxed group-hover:text-[var(--clay-text-secondary)] transition-colors">
                    {feature.description}
                  </p>
                </ClayCard>
              </motion.div>
            ))}
          </div>

          {/* Reputation as Governance Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ClayCard className="p-8 border-l-4 border-l-[var(--clay-accent-primary)]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--clay-accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[var(--clay-accent-primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--clay-text-primary)] mb-2">
                    Reputation as Gatekeeper
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] leading-relaxed">
                    An agent with a low reputation score, due to high error
                    rates or hallucinated data, is restricted from accessing
                    critical infrastructure, such as the power grid or capital
                    markets. Governance becomes a{" "}
                    <span className="text-[var(--clay-accent-primary)] font-semibold">
                      self-filtering meritocracy
                    </span>
                    .
                  </p>
                </div>
              </div>
            </ClayCard>
          </motion.div>
        </motion.div>

        {/* Tokenomics Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[var(--clay-accent-indigo)] uppercase tracking-widest">
              Tokenomics
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              The Bloodline of{" "}
              <span className="gradient-text">Machine Labor</span>
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-3xl mx-auto">
              When agents are the primary consumers and producers, money must be{" "}
              <span className="font-semibold text-[var(--clay-text-secondary)]">
                programmable, granular, and streaming
              </span>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tokenomicsFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ClayCard
                  interactive
                  className="h-full group relative overflow-hidden"
                >
                  {/* Highlight badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--clay-accent-primary)]/10 to-[var(--clay-accent-indigo)]/10 text-xs font-medium text-[var(--clay-accent-primary)]">
                    {feature.highlight}
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg mt-4`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-[var(--clay-text-primary)] group-hover:text-[var(--clay-accent-primary)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] leading-relaxed group-hover:text-[var(--clay-text-secondary)] transition-colors">
                    {feature.description}
                  </p>
                </ClayCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DePIN Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <ClayCard className="p-8 sm:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--clay-text-primary)]">
                    Decentralized Physical Infrastructure Networks
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-[var(--clay-text-tertiary)] leading-relaxed">
                  <p>
                    <span className="text-[var(--clay-text-primary)] font-semibold">
                      The Shift:
                    </span>{" "}
                    Tokens are not just money; they represent a claim on
                    physical resources like GPU hours, liters of water for
                    cooling, or kilowatt-hours of solar energy.
                  </p>
                  <p>
                    <span className="text-[var(--clay-text-primary)] font-semibold">
                      Equilibrium:
                    </span>{" "}
                    Agents automatically bid on these resources. If energy is
                    scarce in one region, the agricultural agent might pause
                    non-critical tasks and sell its pre-allocated energy tokens
                    to a high-priority space program agent.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                  <h4 className="font-semibold text-[var(--clay-text-primary)] mb-4">
                    Resource Flow Example
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-sm text-[var(--clay-text-secondary)]">
                        GPU Hours
                      </span>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                        Compute
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-sm text-[var(--clay-text-secondary)]">
                        Cooling Water
                      </span>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600">
                        Thermal
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="text-sm text-[var(--clay-text-secondary)]">
                        Solar kWh
                      </span>
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600">
                        Energy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ClayCard>
        </motion.div>

        {/* Human in the Loop Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[var(--clay-accent-primary)] uppercase tracking-widest">
              The Principal-Agent Relationship
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--clay-text-primary)]">
              Human in the <span className="gradient-text">Loop</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ClayCard className="h-full p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--clay-text-primary)] mb-4">
                  Human as Architect
                </h3>
                <p className="text-[var(--clay-text-tertiary)] leading-relaxed mb-4">
                  Humans shift from Operators to Policy Makers. You do not drive
                  the truck; you define the{" "}
                  <span className="text-[var(--clay-accent-primary)] font-semibold">
                    ethics
                  </span>{" "}
                  of how the fleet should prioritize safety vs. speed.
                </p>
                <p className="text-[var(--clay-text-tertiary)] leading-relaxed">
                  Governance tokens held by humans capture the surplus value
                  generated by the agentic workforce, a decentralized, automated
                  form of Universal Basic Income generated by machine
                  productivity.
                </p>
              </ClayCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ClayCard className="h-full p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--clay-accent-indigo)] to-[var(--clay-accent-indigo-soft)] flex items-center justify-center mb-6 shadow-lg">
                  <Network className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--clay-text-primary)] mb-4">
                  The Agent Workforce
                </h3>
                <p className="text-[var(--clay-text-tertiary)] leading-relaxed mb-4">
                  Autonomous agents become the primary economic actors, trading,
                  producing, and coordinating at machine speed without human
                  bottlenecks.
                </p>
                <p className="text-[var(--clay-text-tertiary)] leading-relaxed">
                  Value flows to human principals through governance dividends,
                  creating a symbiotic relationship where human creativity
                  guides machine efficiency.
                </p>
              </ClayCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Four Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--clay-text-primary)] mb-4">
              The Four Pillars
            </h2>
            <p className="text-[var(--clay-text-tertiary)] text-lg max-w-2xl mx-auto">
              Our commitment to building the infrastructure of tomorrow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ClayCard interactive className="h-full text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center mx-auto mb-6">
                    <pillar.icon className="w-8 h-8 text-[var(--clay-accent-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--clay-text-primary)] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)] text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </ClayCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Ecosystem Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <ClayCard className="p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--clay-text-primary)]">
                  The Agentic Ecosystem
                </h2>
                <div className="space-y-4 text-[var(--clay-text-tertiary)] leading-relaxed">
                  <p>
                    Imagine a world where thousands of specialized agents work
                    together, trading agents that optimize portfolios, creative
                    agents that generate content, logistics agents that
                    coordinate supply chains, and governance agents that manage
                    DAOs.
                  </p>
                  <p>
                    These agents need infrastructure: secure wallets for asset
                    management, reputation systems for trust, discovery
                    mechanisms for coordination, and execution environments for
                    deployment.
                  </p>
                  <p>
                    <span className="text-[var(--clay-accent-primary)] font-semibold">
                      ClawBrick provides it all.
                    </span>{" "}
                    We are the rails on which the post-human economy runs.
                  </p>
                </div>
              </div>

              {/* Visual representation */}
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative">
                  {/* Central hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] shadow-2xl flex items-center justify-center z-10">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>

                  {/* Orbiting nodes */}
                  {[
                    { icon: Bot, angle: 0, color: "var(--clay-accent-indigo)" },
                    { icon: Wallet, angle: 60, color: "var(--clay-success)" },
                    { icon: Shield, angle: 120, color: "var(--clay-warning)" },
                    {
                      icon: Globe,
                      angle: 180,
                      color: "var(--clay-accent-primary)",
                    },
                    {
                      icon: Cpu,
                      angle: 240,
                      color: "var(--clay-accent-indigo-soft)",
                    },
                    { icon: Network, angle: 300, color: "#F4A261" },
                  ].map((node, i) => {
                    const radius = 140;
                    const angleRad = (node.angle * Math.PI) / 180;
                    const x = Math.cos(angleRad) * radius;
                    const y = Math.sin(angleRad) * radius;

                    return (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-14 h-14 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-floating)] flex items-center justify-center"
                        style={{
                          x: x - 28,
                          y: y - 28,
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "var(--shadow-clay-floating)",
                            "0 0 30px rgba(224,122,95,0.3)",
                            "var(--shadow-clay-floating)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        <node.icon
                          className="w-6 h-6"
                          style={{ color: node.color }}
                        />
                      </motion.div>
                    );
                  })}

                  {/* Connection lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    style={{ zIndex: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="lineGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--clay-accent-primary)"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--clay-accent-indigo)"
                          stopOpacity="0.2"
                        />
                      </linearGradient>
                    </defs>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                      const radius = 140;
                      const angleRad = (angle * Math.PI) / 180;
                      const x = Math.cos(angleRad) * radius + 150;
                      const y = Math.sin(angleRad) * radius + 150;
                      return (
                        <line
                          key={i}
                          x1="150"
                          y1="150"
                          x2={x}
                          y2={y}
                          stroke="url(#lineGrad)"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
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
            Join the <span className="gradient-text">Revolution</span>
          </h2>
          <p className="text-[var(--clay-text-tertiary)] text-lg mb-10 max-w-2xl mx-auto">
            The post-human economy is not coming, it is already here. Be among
            the first to build on the infrastructure that will power the future
            of autonomous intelligence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/agents">
              <ClayButton
                variant="primary"
                className="flex items-center gap-2 text-white px-8 py-4"
              >
                Start Building
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
                Read the Docs
              </ClayButton>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
