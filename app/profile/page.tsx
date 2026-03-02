"use client";

import { useState, useEffect, useCallback } from "react";
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
  AtSign,
} from "lucide-react";
import Link from "next/link";
import { ClayCard, ClayButton } from "@/components/ui/ClayCard";
import { AuthGuard } from "@/components/AuthGuard";
import {
  getBalance,
  getRecentTransactions,
  getSolscanUrl,
  formatAddress,
  getSNSDomain,
} from "@/lib/solana";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [snsName, setSnsName] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("-- SOL");
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isLoadingSns, setIsLoadingSns] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<
    Array<{ signature: string; blockTime: number }>
  >([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedAddress = localStorage.getItem("wallet_address");
    const savedBalance = localStorage.getItem("wallet_balance");
    const savedSns = localStorage.getItem("wallet_sns");

    if (savedAddress) {
      setAddress(savedAddress);
      if (savedBalance) setBalance(savedBalance);
      if (savedSns) setSnsName(savedSns);
    }
  }, []);

  const fetchBalance = useCallback(async () => {
    if (!address) return;
    setIsLoadingBalance(true);
    setBalanceError(null);
    try {
      const realBalance = await getBalance(address);
      setBalance(realBalance);
      localStorage.setItem("wallet_balance", realBalance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalanceError("Failed to fetch balance");
    } finally {
      setIsLoadingBalance(false);
    }
  }, [address]);

  const fetchTransactions = useCallback(async () => {
    if (!address) return;
    try {
      const txs = await getRecentTransactions(address, 5);
      setTransactions(txs);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      fetchBalance();
      fetchTransactions();
      // Fresh SNS lookup (skip if already cached from navbar session)
      const cached = localStorage.getItem("wallet_sns");
      if (!cached) {
        setIsLoadingSns(true);
        getSNSDomain(address)
          .then((name) => {
            setSnsName(name);
            if (name) localStorage.setItem("wallet_sns", name);
          })
          .catch(() => { })
          .finally(() => setIsLoadingSns(false));
      }
    }
  }, [address, fetchBalance, fetchTransactions]);

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
              <Link
                href="/"
                className="hover:text-[var(--clay-accent-primary)] transition-colors"
              >
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
                {/* Avatar and Identity */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center shadow-lg flex-shrink-0">
                    {snsName ? (
                      <AtSign className="w-10 h-10 text-white" />
                    ) : (
                      <Sparkles className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* SNS name — shown prominently when available */}
                    {snsName ? (
                      <div className="mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--clay-accent-primary)]/20 to-[var(--clay-accent-indigo)]/20 border border-[var(--clay-accent-primary)]/30">
                            <AtSign className="w-4 h-4 text-[var(--clay-accent-primary)]" />
                            <span className="text-lg font-bold text-[var(--clay-accent-primary)]">
                              {snsName}
                            </span>
                          </div>
                          <a
                            href={`https://sns.id/domain?domain=${snsName.replace(".sol", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)] transition-colors"
                            title="View on SNS"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ) : isLoadingSns ? (
                      <div className="mb-2 text-sm text-[var(--clay-text-muted)] animate-pulse">
                        Checking for .sol domain...
                      </div>
                    ) : null}

                    {/* Wallet address */}
                    <div className="text-xs text-[var(--clay-text-muted)] mb-1">
                      {snsName ? "Linked wallet" : "Connected Wallet"}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-sm font-mono text-[var(--clay-text-secondary)] break-all">
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
                        <div className="text-sm text-[var(--clay-text-muted)]">
                          SOL Balance
                        </div>
                        <div className="text-2xl font-bold text-[var(--clay-text-primary)]">
                          {isLoadingBalance ? (
                            <span className="text-[var(--clay-text-muted)]">
                              Loading...
                            </span>
                          ) : balanceError ? (
                            <span className="text-[var(--clay-error)] text-base">
                              {balance}
                            </span>
                          ) : (
                            balance
                          )}
                        </div>
                        {balanceError && (
                          <span className="text-xs text-[var(--clay-error)]">
                            {balanceError}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={fetchBalance}
                      disabled={isLoadingBalance}
                      className="p-3 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)] hover:shadow-[var(--shadow-clay-hover)] transition-all disabled:opacity-50"
                      title="Refresh balance"
                    >
                      <RefreshCw
                        className={`w-5 h-5 text-[var(--clay-text-tertiary)] ${isLoadingBalance ? "animate-spin" : ""}`}
                      />
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
                      <span className="font-medium text-[var(--clay-text-primary)]">
                        Authenticated
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                    <div className="flex items-center gap-2 text-[var(--clay-text-muted)] mb-2">
                      <Key className="w-4 h-4" />
                      <span className="text-sm">Network</span>
                    </div>
                    <span className="font-medium text-[var(--clay-text-primary)]">
                      Solana Mainnet
                    </span>
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
                <h3 className="font-semibold text-[var(--clay-text-primary)] mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link href="/agents">
                    <ClayButton
                      variant="default"
                      className="w-full justify-start gap-3"
                    >
                      <User className="w-4 h-4" />
                      View Agents
                    </ClayButton>
                  </Link>
                  <Link href="/settings">
                    <ClayButton
                      variant="default"
                      className="w-full justify-start gap-3 mt-3"
                    >
                      <Activity className="w-4 h-4" />
                      Settings
                    </ClayButton>
                  </Link>
                  <a
                    href={address ? getSolscanUrl(address) : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ClayButton
                      variant="default"
                      className="w-full justify-start gap-3 mt-3"
                    >
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
                <h3 className="text-xl font-semibold text-[var(--clay-text-primary)]">
                  Recent Activity
                </h3>
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
