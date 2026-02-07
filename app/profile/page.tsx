"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User,
    Wallet,
    Copy,
    ExternalLink,
    ChevronRight,
    RefreshCw,
    CheckCircle,
    Shield,
    Key,
    Activity,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";
import { AuthGuard } from "@/components/AuthGuard";
import { getBalance, getRecentTransactions, getSolscanUrl, formatAddress } from "@/lib/solana";

export default function ProfilePage() {
    const [mounted, setMounted] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string>("-- SOL");
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);
    const [transactions, setTransactions] = useState<Array<{ signature: string; blockTime: number }>>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedAddress = localStorage.getItem("wallet_address");
        const savedBalance = localStorage.getItem("wallet_balance");

        if (savedAddress) {
            setAddress(savedAddress);
            if (savedBalance) setBalance(savedBalance);
        }
    }, []);

    useEffect(() => {
        if (address) {
            fetchBalance();
            fetchTransactions();
        }
    }, [address]);

    const fetchBalance = async () => {
        if (!address) return;
        setIsLoadingBalance(true);
        try {
            const realBalance = await getBalance(address);
            setBalance(realBalance);
            localStorage.setItem("wallet_balance", realBalance);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        } finally {
            setIsLoadingBalance(false);
        }
    };

    const fetchTransactions = async () => {
        if (!address) return;
        try {
            const txs = await getRecentTransactions(address, 5);
            setTransactions(txs);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    };

    const copyAddress = async () => {
        if (!address) return;
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
        }
    };

    if (!mounted) return null;

    return (
        <AuthGuard>
            <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--clay-bg-primary)]">
                <div className="max-w-4xl mx-auto">
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
                            <span className="text-[var(--clay-text-primary)]">Profile</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--clay-text-primary)]">
                            Your <span className="gradient-text">Profile</span>
                        </h1>
                        <p className="text-[var(--clay-text-tertiary)] text-lg">
                            Manage your wallet and view account details
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-2"
                        >
                            <ClayCard className="p-6 sm:p-8">
                                {/* Avatar and Address */}
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center shadow-lg">
                                        <Sparkles className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-[var(--clay-text-muted)] mb-1">Connected Wallet</div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <code className="text-lg font-mono text-[var(--clay-text-primary)] break-all">
                                                {address ? formatAddress(address, 8) : "Not connected"}
                                            </code>
                                            {address && (
                                                <>
                                                    <button
                                                        onClick={copyAddress}
                                                        className="p-2 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)] transition-colors"
                                                        title="Copy address"
                                                    >
                                                        {copied ? (
                                                            <CheckCircle className="w-4 h-4 text-[var(--clay-success)]" />
                                                        ) : (
                                                            <Copy className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                    <a
                                                        href={getSolscanUrl(address)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)] transition-colors"
                                                        title="View on Solscan"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                        {copied && (
                                            <span className="text-sm text-[var(--clay-success)] mt-1 block">
                                                Address copied!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Balance Card */}
                                <div className="p-4 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center">
                                                <Wallet className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-[var(--clay-text-muted)]">SOL Balance</div>
                                                <div className="text-2xl font-bold text-[var(--clay-text-primary)]">
                                                    {isLoadingBalance ? (
                                                        <span className="text-[var(--clay-text-muted)]">Loading...</span>
                                                    ) : (
                                                        balance
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={fetchBalance}
                                            disabled={isLoadingBalance}
                                            className="p-3 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)] hover:shadow-[var(--shadow-clay-hover)] transition-all disabled:opacity-50"
                                            title="Refresh balance"
                                        >
                                            <RefreshCw className={`w-5 h-5 text-[var(--clay-text-tertiary)] ${isLoadingBalance ? "animate-spin" : ""}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                                        <div className="flex items-center gap-2 text-[var(--clay-text-muted)] mb-2">
                                            <Shield className="w-4 h-4" />
                                            <span className="text-sm">Status</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[var(--clay-success)]" />
                                            <span className="font-medium text-[var(--clay-text-primary)]">Authenticated</span>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                                        <div className="flex items-center gap-2 text-[var(--clay-text-muted)] mb-2">
                                            <Key className="w-4 h-4" />
                                            <span className="text-sm">Network</span>
                                        </div>
                                        <span className="font-medium text-[var(--clay-text-primary)]">Solana Mainnet</span>
                                    </div>
                                </div>
                            </ClayCard>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ClayCard className="p-6">
                                <h3 className="font-semibold text-[var(--clay-text-primary)] mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link href="/agents">
                                        <ClayButton variant="default" className="w-full justify-start gap-3">
                                            <User className="w-4 h-4" />
                                            View Agents
                                        </ClayButton>
                                    </Link>
                                    <Link href="/settings">
                                        <ClayButton variant="default" className="w-full justify-start gap-3 mt-3">
                                            <Activity className="w-4 h-4" />
                                            Settings
                                        </ClayButton>
                                    </Link>
                                    <a
                                        href={address ? getSolscanUrl(address) : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ClayButton variant="default" className="w-full justify-start gap-3 mt-3">
                                            <ExternalLink className="w-4 h-4" />
                                            View on Solscan
                                        </ClayButton>
                                    </a>
                                </div>
                            </ClayCard>
                        </motion.div>
                    </div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6"
                    >
                        <ClayCard className="p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-[var(--clay-text-primary)]">Recent Activity</h3>
                                <button
                                    onClick={fetchTransactions}
                                    className="p-2 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)] transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>

                            {transactions.length > 0 ? (
                                <div className="space-y-3">
                                    {transactions.map((tx, i) => (
                                        <a
                                            key={i}
                                            href={getSolscanUrl(tx.signature, "tx")}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:shadow-[var(--shadow-clay-hover)] transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[var(--clay-accent-primary)]/10 flex items-center justify-center">
                                                    <Activity className="w-5 h-5 text-[var(--clay-accent-primary)]" />
                                                </div>
                                                <div>
                                                    <div className="font-mono text-sm text-[var(--clay-text-primary)]">
                                                        {formatAddress(tx.signature, 8)}
                                                    </div>
                                                    <div className="text-xs text-[var(--clay-text-muted)]">
                                                        {new Date(tx.blockTime * 1000).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-[var(--clay-text-muted)] group-hover:text-[var(--clay-accent-primary)] transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-[var(--clay-text-muted)]">
                                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No recent transactions found</p>
                                </div>
                            )}
                        </ClayCard>
                    </motion.div>
                </div>
            </div>
        </AuthGuard>
    );
}
