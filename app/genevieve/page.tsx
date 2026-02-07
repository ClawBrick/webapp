"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Shield,
  Zap,
  Lock,
  Wifi,
  CheckCircle,
  ChevronRight,
  Cpu,
  HardDrive,
  Battery,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { GenevieveShowcase } from "@/components/GenevieveShowcase";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function GenevievePage() {
  const [selectedTier, setSelectedTier] = useState<"edge" | "pro">("pro");

  const tiers = {
    edge: {
      name: "Edge",
      price: "$499",
      description: "Perfect for personal projects and development",
      specs: {
        cpu: "8-core ARM",
        ram: "16 GB",
        storage: "512 GB SSD",
        tpu: "4 TOPS",
      },
      features: [
        "Local inference only",
        "Single user",
        "Community support",
        "1-year warranty",
      ],
    },
    pro: {
      name: "Pro",
      price: "$1,299",
      description: "For professionals and small teams",
      specs: {
        cpu: "16-core ARM",
        ram: "32 GB",
        storage: "1 TB SSD",
        tpu: "16 TOPS",
      },
      features: [
        "Multi-model support",
        "Up to 5 users",
        "Priority support",
        "2-year warranty",
        "API access",
      ],
    },
  };

  const features = [
    {
      icon: Lock,
      title: "Complete Privacy",
      description:
        "All inference happens locally. Your data never leaves the device.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Dedicated AI accelerators deliver sub-50ms response times.",
    },
    {
      icon: Wifi,
      title: "Works Offline",
      description: "No internet required. Run your agents anywhere, anytime.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Hardware-level encryption and secure boot.",
    },
  ];

  const currentTier = tiers[selectedTier];

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
            <span className="w-2 h-2 rounded-full bg-[var(--clay-warning)] shadow-[0_0_10px_var(--clay-warning)] animate-pulse" />
            <span className="text-sm text-[var(--clay-text-tertiary)]">
              Pre-order now — Shipping Q3 2025
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-[var(--clay-text-primary)]">
            Meet <span className="gradient-text">Genevieve</span>
          </h1>
          <p className="text-xl text-[var(--clay-text-tertiary)] max-w-2xl mx-auto">
            The first AI appliance designed for the edge. Private, powerful, and
            always ready.
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
                  Hardware that <span className="gradient-text">thinks</span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Cpu, label: "Neural Engine", value: "64 TOPS" },
                    { icon: HardDrive, label: "Storage", value: "2TB NVMe" },
                    { icon: Wifi, label: "Connectivity", value: "WiFi 6E" },
                    { icon: Battery, label: "Power", value: "35W TDP" },
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
            Why <span className="gradient-text">Genevieve</span>?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[var(--clay-text-primary)]">
            Choose your <span className="gradient-text">power</span>
          </h2>

          {/* Tier Selector */}
          <div className="flex justify-center gap-2 mb-12">
            {(Object.keys(tiers) as Array<keyof typeof tiers>).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-6 py-3 rounded-2xl font-semibold capitalize transition-all ${
                  selectedTier === tier
                    ? "bg-gradient-to-r from-[var(--clay-accent-primary)] to-[#F4A261] text-white shadow-[4px_4px_16px_rgba(224,122,95,0.35)]"
                    : "bg-[var(--clay-surface)] text-[var(--clay-text-tertiary)] shadow-[var(--shadow-clay-small)] hover:text-[var(--clay-text-primary)]"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Selected Tier Card */}
          <motion.div
            key={selectedTier}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ClayCard className="max-w-3xl mx-auto p-8 sm:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-[var(--clay-text-muted)] mb-2">
                    {currentTier.name} Edition
                  </div>
                  <div className="text-5xl font-bold mb-4 text-[var(--clay-text-primary)]">
                    {currentTier.price}
                  </div>
                  <p className="text-[var(--clay-text-tertiary)] mb-6">
                    {currentTier.description}
                  </p>
                  <ClayButton variant="primary" className="w-full">
                    Pre-order Now
                  </ClayButton>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-[var(--clay-text-muted)] mb-3">
                      Specifications
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(currentTier.specs).map(([key, value]) => (
                        <ClayCard key={key} className="p-3" pressed>
                          <div className="text-xs text-[var(--clay-text-muted)] uppercase">
                            {key}
                          </div>
                          <div className="font-medium text-[var(--clay-text-primary)]">
                            {value}
                          </div>
                        </ClayCard>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-[var(--clay-text-muted)] mb-3">
                      Includes
                    </div>
                    <ul className="space-y-2">
                      {currentTier.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-[var(--clay-text-tertiary)]"
                        >
                          <CheckCircle className="w-4 h-4 text-[var(--clay-success)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ClayCard>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--clay-text-primary)]">
            Ready to go <span className="gradient-text">local</span>?
          </h2>
          <p className="text-[var(--clay-text-tertiary)] mb-8 max-w-xl mx-auto">
            Join thousands of developers and organizations who trust Genevieve
            for their AI infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ClayButton variant="primary" className="px-8">
              Pre-order Genevieve
            </ClayButton>
            <ClayButton
              variant="default"
              className="text-[var(--clay-text-tertiary)]"
            >
              Contact Sales
            </ClayButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
