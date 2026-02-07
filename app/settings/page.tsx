"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Moon,
    Sun,
    Bell,
    Shield,
    LogOut,
    ChevronRight,
    Monitor,
    Palette,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";
import { AuthGuard } from "@/components/AuthGuard";

export default function SettingsPage() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDisconnect = () => {
        localStorage.removeItem("wallet_connected");
        localStorage.removeItem("wallet_address");
        localStorage.removeItem("wallet_authenticated");
        localStorage.removeItem("wallet_auth_signature");
        localStorage.removeItem("wallet_auth_timestamp");
        localStorage.removeItem("wallet_balance");
        window.location.href = "/";
    };

    if (!mounted) return null;

    const themeOptions: Array<{ value: "light" | "dark"; label: string; icon: typeof Sun }> = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
    ];

    return (
        <AuthGuard>
            <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--clay-bg-primary)]">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-2 text-sm text-[var(--clay-text-tertiary)] mb-6">
                            <Link href="/" className="hover:text-[var(--clay-accent-primary)] transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-[var(--clay-text-primary)]">Settings</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--clay-text-primary)]">
                            <span className="gradient-text">Settings</span>
                        </h1>
                        <p className="text-[var(--clay-text-tertiary)] text-lg">
                            Customize your ClawBrick experience
                        </p>
                    </motion.div>

                    {/* Settings Sections */}
                    <div className="space-y-6">
                        {/* Appearance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ClayCard className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                                        <Palette className="w-5 h-5 text-[var(--clay-accent-primary)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--clay-text-primary)]">Appearance</h3>
                                        <p className="text-sm text-[var(--clay-text-muted)]">Customize how ClawBrick looks</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-[var(--clay-text-secondary)] mb-3 block">
                                            Theme
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {themeOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => setTheme(option.value)}
                                                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${theme === option.value
                                                        ? "bg-[var(--clay-accent-primary)] text-white shadow-[var(--shadow-clay-hover)]"
                                                        : "bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] text-[var(--clay-text-secondary)] hover:text-[var(--clay-text-primary)]"
                                                        }`}
                                                >
                                                    <option.icon className="w-5 h-5" />
                                                    <span className="text-sm font-medium">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ClayCard>
                        </motion.div>

                        {/* Notifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ClayCard className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-[var(--clay-accent-indigo)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--clay-text-primary)]">Notifications</h3>
                                        <p className="text-sm text-[var(--clay-text-muted)]">Manage your notification preferences</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { key: "email", label: "Email notifications", desc: "Receive updates via email" },
                                        { key: "push", label: "Push notifications", desc: "Browser push notifications" },
                                        { key: "updates", label: "Product updates", desc: "News about new features" },
                                    ].map((item) => (
                                        <div
                                            key={item.key}
                                            className="flex items-center justify-between p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]"
                                        >
                                            <div>
                                                <div className="font-medium text-[var(--clay-text-primary)]">{item.label}</div>
                                                <div className="text-sm text-[var(--clay-text-muted)]">{item.desc}</div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setNotifications({
                                                        ...notifications,
                                                        [item.key]: !notifications[item.key as keyof typeof notifications],
                                                    })
                                                }
                                                className={`w-12 h-7 rounded-full relative transition-colors ${notifications[item.key as keyof typeof notifications]
                                                    ? "bg-[var(--clay-accent-primary)]"
                                                    : "bg-[var(--clay-bg-tertiary)]"
                                                    }`}
                                            >
                                                <div
                                                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[item.key as keyof typeof notifications]
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </ClayCard>
                        </motion.div>

                        {/* Security */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <ClayCard className="p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-[var(--clay-success)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--clay-text-primary)]">Security</h3>
                                        <p className="text-sm text-[var(--clay-text-muted)]">Manage your account security</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-[var(--clay-text-primary)]">Wallet Authentication</div>
                                                <div className="text-sm text-[var(--clay-text-muted)]">
                                                    Sign messages to verify ownership
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--clay-success)]/10 text-[var(--clay-success)]">
                                                Active
                                            </span>
                                        </div>
                                    </div>

                                    <Link href="/profile">
                                        <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:shadow-[var(--shadow-clay-hover)] transition-all cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-[var(--clay-text-primary)]">View Profile</div>
                                                    <div className="text-sm text-[var(--clay-text-muted)]">
                                                        See your wallet details and activity
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-[var(--clay-text-muted)]" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </ClayCard>
                        </motion.div>

                        {/* Danger Zone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <ClayCard className="p-6 border-2 border-[var(--clay-error)]/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--clay-error)]/10 flex items-center justify-center">
                                        <LogOut className="w-5 h-5 text-[var(--clay-error)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--clay-text-primary)]">Danger Zone</h3>
                                        <p className="text-sm text-[var(--clay-text-muted)]">Irreversible actions</p>
                                    </div>
                                </div>

                                <ClayButton
                                    variant="default"
                                    onClick={handleDisconnect}
                                    className="text-[var(--clay-error)] hover:bg-[var(--clay-error)]/10"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Disconnect Wallet
                                </ClayButton>
                            </ClayCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
