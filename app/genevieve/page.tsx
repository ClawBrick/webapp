"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Zap,
  Wifi,
  CheckCircle,
  ChevronRight,
  Cpu,
  HardDrive,
  Shield,
  Sparkles,
  Mail,
  Router,
  Box,
} from "lucide-react";
import Link from "next/link";
import { GenevieveShowcase } from "@/components/GenevieveShowcase";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function GenevievePage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // TODO: Connect to your notification API
    }
  };

  const alphaSpecs = {
    cpu: "Raspberry Pi 5",
    ram: "8 GB LPDDR4X",
    storage: "128 GB SD Card",
    tpu: "AI Accelerator",
  };

  const features = [
    {
      icon: Box,
      title: "Zero-Hassle Setup",
      description:
        "Preloaded with OpenClaw on an optimized OS. Just plug in and deploy your first agent within minutes.",
    },
    {
      icon: Shield,
      title: "Erebrus VPN Built-in",
      description:
        "Enterprise-grade VPN pre-configured for secure, private communication between your agents and the network.",
    },
    {
      icon: Router,
      title: "IoT Gateway Ready",
      description:
        "Acts as a secure gateway for all your IoT devices, orchestrating them through intelligent agents.",
    },
    {
      icon: Zap,
      title: "Local-First AI",
      description:
        "All inference happens on-device. No cloud dependencies, no data leaks, complete privacy.",
    },
    {
      icon: Wifi,
      title: "Works Offline",
      description:
        "Run your agents anywhere, anytime. No internet required for local operations.",
    },
    {
      icon: Lock,
      title: "Private by Design",
      description:
        "Your data never leaves your home. Hardware-level encryption and secure boot included.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--clay-bg-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--clay-text-tertiary)] mb-6">
            <Link
              href="/"
              className="hover:text-[var(--clay-accent-primary)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--clay-text-primary)]">Genevieve</span>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--clay-success)] shadow-[0_0_10px_var(--clay-success)] animate-pulse" />
            <span className="text-sm text-[var(--clay-text-tertiary)]">
              Pre-orders starting soon
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-[var(--clay-text-primary)]">
            Meet <span className="gradient-text">Genevieve</span>
          </h1>
          <p className="text-xl text-[var(--clay-text-tertiary)] max-w-2xl mx-auto">
            Your personal AI appliance. A Raspberry Pi 5 powered edge device
            that brings the power of agents to your home.
          </p>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-32"
        >
          <ClayCard className="p-8 sm:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--clay-accent-primary)]/5 blur-[100px]" />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--clay-accent-indigo)]/5 blur-[80px]" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Visual */}
              <GenevieveShowcase />

              {/* Specs */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--clay-text-primary)]">
                  Genevieve <span className="gradient-text">Alpha</span>
                </h2>
                <p className="text-[var(--clay-text-tertiary)] mb-6">
                  Powered by Raspberry Pi 5, preloaded with everything you need
                  to run OpenClaw agents locally. Just plug in the SD card and
                  go.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Cpu, label: "Processor", value: "Pi 5 8GB" },
                    { icon: HardDrive, label: "Storage", value: "128GB SD" },
                    { icon: Shield, label: "VPN", value: "Erebrus" },
                    { icon: Box, label: "Software", value: "OpenClaw" },
                  ].map((spec, i) => (
                    <ClayCard key={i} className="p-4" pressed>
                      <spec.icon className="w-5 h-5 text-[var(--clay-accent-primary)] mb-2" />
                      <div className="text-sm text-[var(--clay-text-muted)]">
                        {spec.label}
                      </div>
                      <div className="font-semibold text-[var(--clay-text-primary)]">
                        {spec.value}
                      </div>
                    </ClayCard>
                  ))}
                </div>
              </div>
            </div>
          </ClayCard>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[var(--clay-text-primary)]">
            Everything you need to{" "}
            <span className="gradient-text">get started</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ClayCard key={i} interactive className="group">
                <div className="w-12 h-12 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-[var(--clay-accent-primary)]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[var(--clay-text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--clay-text-tertiary)] text-sm">
                  {feature.description}
                </p>
              </ClayCard>
            ))}
          </div>
        </motion.div>

        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <ClayCard className="max-w-4xl mx-auto p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--clay-accent-primary)] to-[var(--clay-accent-indigo)] opacity-10 blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--clay-accent-primary)]/10 text-[var(--clay-accent-primary)] text-xs font-semibold mb-4">
                  <Sparkles className="w-3 h-3" />
                  Alpha Edition
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--clay-text-primary)]">
                  Genevieve Alpha
                </h2>
                <p className="text-[var(--clay-text-tertiary)] mb-6">
                  The simplest way to start your agentic journey. A complete
                  plug-and-play solution for local AI deployment.
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[var(--clay-text-primary)]">
                    $299
                  </span>
                  <span className="text-[var(--clay-text-muted)] ml-2">
                    one-time
                  </span>
                </div>

                {/* Notify Form */}
                {!isSubscribed ? (
                  <form onSubmit={handleNotify} className="space-y-3">
                    <p className="text-sm text-[var(--clay-text-muted)]">
                      Pre-orders starting soon. Get notified when available.
                    </p>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--clay-text-muted)]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-inset)] border-none text-[var(--clay-text-primary)] placeholder:text-[var(--clay-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-accent-primary)]/20"
                          required
                        />
                      </div>
                      <ClayButton
                        type="submit"
                        variant="primary"
                        className="px-6"
                      >
                        Notify Me
                      </ClayButton>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-[var(--clay-success-bg)] text-[var(--clay-success-text)] flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Thanks! We&apos;ll notify you when pre-orders open.
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-[var(--clay-text-muted)] mb-3">
                    What&apos;s included
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Raspberry Pi 5 (8GB RAM)",
                      "128GB SD card with optimized OS",
                      "OpenClaw pre-installed & configured",
                      "Erebrus VPN ready-to-use",
                      "IoT gateway capabilities",
                      "Power adapter & case",
                      "Getting started guide",
                      "Community access",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-[var(--clay-text-tertiary)]"
                      >
                        <CheckCircle className="w-4 h-4 text-[var(--clay-success)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm text-[var(--clay-text-muted)] mb-3">
                    Specifications
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(alphaSpecs).map(([key, value]) => (
                      <ClayCard key={key} className="p-3" pressed>
                        <div className="text-xs text-[var(--clay-text-muted)] uppercase">
                          {key}
                        </div>
                        <div className="font-medium text-[var(--clay-text-primary)] text-sm">
                          {value}
                        </div>
                      </ClayCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ClayCard>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--clay-text-primary)]">
            Ready to bring agents <span className="gradient-text">home</span>?
          </h2>
          <p className="text-[var(--clay-text-tertiary)] mb-8 max-w-xl mx-auto">
            Join the waitlist to be among the first to experience the future of
            local AI. No cloud required, no subscriptions, just pure agent
            power.
          </p>
          <Link href="/manifesto">
            <ClayButton
              variant="default"
              className="text-[var(--clay-text-tertiary)]"
            >
              Read the Manifesto
            </ClayButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
