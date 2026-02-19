"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";

export default function PricingPage() {
    const features = [
        "Bring Your Own Key (BYOK) - Use your LLM provider keys",
        "Configurable cloud computer",
        "All tools: bash, browser, files",
        "Multi-channel support (WhatsApp, Telegram, Slack, Discord, etc.)",
        "Local-first Gateway control plane",
        "Multi-agent routing",
        "Companion apps (macOS, iOS, Android)",
        "Support for OpenAI, Anthropic, Google, and more",
    ];

    return (
        <div className="min-h-screen bg-[var(--clay-bg-primary)]">
            {/* Header */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)] text-[var(--clay-accent-primary)] text-sm font-semibold mb-6">
                            <span>🔑</span>
                            <span className="text-[var(--clay-text-secondary)]">
                                BYOK Model — Use your own LLM provider keys
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[var(--clay-text-primary)]">
                            Pricing that{" "}
                            <span className="gradient-text-animated">scales with you</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-[var(--clay-text-tertiary)] max-w-2xl mx-auto">
                            Deploy OpenClaw agents with your own LLM keys. Full control,
                            transparent costs, no vendor lock-in.
                        </p>
                    </motion.div>

                    {/* Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-lg mx-auto"
                    >
                        <ClayCard className="relative overflow-hidden">
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--clay-accent-primary)] to-[var(--clay-accent-indigo)]" />

                            <div className="p-8">
                                {/* Plan Name */}
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-[var(--clay-text-primary)] mb-2">
                                        Starter
                                    </h2>
                                    <p className="text-[var(--clay-text-tertiary)]">
                                        Everything you need to build with AI. Bring your own keys.
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="text-center mb-8">
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-6xl font-bold text-[var(--clay-text-primary)]">
                                            $15
                                        </span>
                                        <span className="text-2xl text-[var(--clay-text-muted)]">
                                            /month
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Link href="/agents" className="block mb-8">
                                    <ClayButton
                                        variant="primary"
                                        className="w-full py-4 text-white text-lg font-semibold"
                                    >
                                        Get Started
                                    </ClayButton>
                                </Link>

                                {/* Features */}
                                <div className="space-y-4">
                                    {features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[var(--clay-accent-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-4 h-4 text-[var(--clay-accent-primary)]" />
                                            </div>
                                            <span className="text-[var(--clay-text-secondary)]">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </ClayCard>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mt-12 space-y-4 max-w-2xl mx-auto"
                    >
                        <p className="text-[var(--clay-text-tertiary)]">
                            Use your own API keys from OpenAI, Anthropic, Google, or any LLM provider.
                            You control costs and data.
                        </p>
                        <p className="text-[var(--clay-text-muted)] text-sm">
                            Pay your LLM provider directly. No markups, no hidden fees.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
