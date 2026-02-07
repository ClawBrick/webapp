"use client";

import { motion } from "framer-motion";
import {
  Construction,
  Clock,
  Sparkles,
  ChevronRight,
  Mail,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--clay-bg-primary)]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--clay-text-tertiary)] mb-6">
            <Link href="/" className="hover:text-[var(--clay-accent-primary)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[var(--clay-text-primary)]">Skills</span>
          </div>

          {/* Alpha Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--clay-surface)] shadow-[inset_3px_3px_8px_rgba(139,131,124,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.9)] mb-8"
          >
            <Construction className="w-4 h-4 text-[var(--clay-warning)]" />
            <span className="text-sm font-semibold text-[var(--clay-text-primary)]">
              Alpha Preview
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[var(--clay-text-primary)]">
            Skills <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-xl text-[var(--clay-text-tertiary)] max-w-2xl mx-auto">
            A curated collection of capabilities to extend your agents.
            We&apos;re building something special.
          </p>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <ClayCard className="p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E07A5F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5E60CE]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-[var(--clay-surface)] shadow-[inset_4px_4px_12px_rgba(139,131,124,0.12),inset_-4px_-4px_12px_rgba(255,255,255,0.9)] flex items-center justify-center"
              >
                <Wrench className="w-12 h-12 text-[var(--clay-accent-primary)]" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--clay-text-primary)]">
                Under Construction
              </h2>
              <p className="text-[var(--clay-text-tertiary)] mb-8 max-w-lg mx-auto">
                The Skills Marketplace is currently in active development.
                We&apos;re working with early partners to curate the best agent
                capabilities.
              </p>

              {/* Timeline indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0FDF4] text-[#166534]">
                  <div className="w-2 h-2 rounded-full bg-[#68D391] animate-pulse" />
                  <span className="text-sm font-medium">Design Phase</span>
                </div>
                <div className="w-12 h-0.5 bg-[#D1CCC6]" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--clay-surface)] text-[var(--clay-text-tertiary)]">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Beta Q2 2025</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ClayButton
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Join Waitlist
                </ClayButton>
                <ClayButton
                  variant="default"
                  className="flex items-center gap-2 text-[var(--clay-text-tertiary)]"
                >
                  <Sparkles className="w-4 h-4" />
                  Suggest a Skill
                </ClayButton>
              </div>
            </div>
          </ClayCard>
        </motion.div>

        {/* Preview of what's coming */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-[var(--clay-text-primary)] text-center mb-6">
            Preview of Coming Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Social", icon: "🌐", count: "12 skills" },
              { name: "Communication", icon: "💬", count: "8 skills" },
              { name: "Data", icon: "📊", count: "15 skills" },
              { name: "Web3", icon: "⛓️", count: "6 skills" },
            ].map((category, i) => (
              <ClayCard
                key={i}
                className="p-4 text-center opacity-60 hover:opacity-80 transition-opacity"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-[var(--clay-text-primary)] text-sm">
                  {category.name}
                </div>
                <div className="text-xs text-[var(--clay-text-muted)]">{category.count}</div>
              </ClayCard>
            ))}
          </div>
        </motion.div>

        {/* Developer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <ClayCard className="p-8 inline-block">
            <p className="text-[var(--clay-text-tertiary)] mb-4">
              Are you a developer interested in building skills?
            </p>
            <Link
              href="#"
              className="text-[var(--clay-accent-primary)] font-semibold hover:underline inline-flex items-center gap-1"
            >
              Apply for Early Access
              <ChevronRight className="w-4 h-4" />
            </Link>
          </ClayCard>
        </motion.div>
      </div>
    </div>
  );
}
