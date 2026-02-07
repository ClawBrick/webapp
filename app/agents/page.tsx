"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Play,
  Square,
  Trash2,
  RefreshCw,
  Cpu,
  Settings,
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
  ExternalLink,
  Globe,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  ClayCard,
  ClayButton,
  ClayBadge,
} from "@/components/ui/ClayCard";
import { AuthGuard } from "@/components/AuthGuard";

interface Agent {
  id: string;
  name: string;
  description: string | null;
  status: "pending" | "provisioning" | "ready" | "running" | "stopped" | "error" | "destroyed";
  llm_provider: string | null;
  llm_model: string | null;
  main_ip: string | null;
  subdomain: string | null;
  deploy_region: string;
  gatewayUrl: string | null;
  created_at: string;
  updated_at: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch agents from API
  const fetchAgents = useCallback(async () => {
    try {
      const userId = localStorage.getItem("wallet_address");
      if (!userId) return;

      // For now, we'll use a simple query - in production use proper auth
      const response = await fetch(`/api/agents?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAgents(data.agents || []);
      }
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const refreshAgents = () => {
    setIsRefreshing(true);
    fetchAgents();
  };

  const handleAction = async (agentId: string, action: "start" | "stop" | "restart") => {
    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        fetchAgents();
      }
    } catch (err) {
      console.error(`Failed to ${action} agent:`, err);
    }
  };

  const handleDelete = async (agentId: string) => {
    if (!confirm("Are you sure you want to destroy this agent? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAgents();
        if (selectedAgent?.id === agentId) {
          setSelectedAgent(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete agent:", err);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getStatusBadge = (status: Agent["status"]) => {
    switch (status) {
      case "running":
      case "ready":
        return <ClayBadge variant="success">{status}</ClayBadge>;
      case "provisioning":
      case "pending":
        return <ClayBadge variant="warning">{status}</ClayBadge>;
      case "error":
        return <ClayBadge variant="error">{status}</ClayBadge>;
      default:
        return <ClayBadge variant="default">{status}</ClayBadge>;
    }
  };

  const activeAgents = agents.filter(a => ["running", "ready"].includes(a.status)).length;

  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--clay-bg-primary)]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 text-sm text-[var(--clay-text-tertiary)] mb-4">
              <Link
                href="/"
                className="hover:text-[var(--clay-accent-primary)] transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[var(--clay-text-primary)]">Agents</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-[var(--clay-text-primary)]">
                  Your <span className="gradient-text">Agents</span>
                </h1>
                <p className="text-[var(--clay-text-tertiary)]">
                  Deploy and manage your OpenClaw AI assistant instances
                </p>
              </div>

              <div className="flex gap-3">
                <ClayButton
                  variant="default"
                  onClick={refreshAgents}
                  disabled={isRefreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </ClayButton>
                <Link href="/agents/deploy">
                  <ClayButton
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Deploy Agent
                  </ClayButton>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: "Total Agents", value: agents.length.toString(), icon: Cpu },
              { label: "Active", value: activeAgents.toString(), icon: Activity },
              { label: "Provisioning", value: agents.filter(a => a.status === "provisioning").length.toString(), icon: Loader2 },
              { label: "Providers", value: [...new Set(agents.map(a => a.llm_provider).filter(Boolean))].length.toString(), icon: Sparkles },
            ].map((stat, i) => (
              <ClayCard key={i} className="p-5">
                <stat.icon className="w-5 h-5 text-[var(--clay-accent-primary)] mb-3" />
                <div className="text-2xl font-bold text-[var(--clay-text-primary)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--clay-text-muted)]">
                  {stat.label}
                </div>
              </ClayCard>
            ))}
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--clay-accent-primary)]" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && agents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ClayCard className="text-center py-16">
                <Cpu className="w-16 h-16 mx-auto mb-4 text-[var(--clay-text-muted)] opacity-30" />
                <h3 className="text-xl font-semibold text-[var(--clay-text-primary)] mb-2">
                  No agents deployed yet
                </h3>
                <p className="text-[var(--clay-text-tertiary)] mb-6">
                  Deploy your first OpenClaw AI assistant instance
                </p>
                <Link href="/agents/deploy">
                  <ClayButton variant="primary" className="inline-flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Deploy Your First Agent
                  </ClayButton>
                </Link>
              </ClayCard>
            </motion.div>
          )}

          {/* Agents Grid */}
          {!isLoading && agents.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Agent List */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {agents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <ClayCard
                        interactive
                        className={`cursor-pointer transition-all ${selectedAgent?.id === agent.id
                            ? "ring-2 ring-[#E07A5F]/30"
                            : ""
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-[var(--shadow-clay-pressed)] ${["running", "ready"].includes(agent.status)
                                  ? "bg-[var(--clay-success-bg)] text-[var(--clay-success-text)]"
                                  : agent.status === "provisioning"
                                    ? "bg-[var(--clay-warning)]/10 text-[var(--clay-warning)]"
                                    : "bg-[var(--clay-surface)] text-[var(--clay-text-tertiary)]"
                                }`}
                            >
                              {agent.status === "provisioning" ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                              ) : (
                                <Cpu className="w-6 h-6" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg text-[var(--clay-text-primary)]">
                                  {agent.name}
                                </h3>
                                {getStatusBadge(agent.status)}
                              </div>
                              <p className="text-[var(--clay-text-tertiary)] text-sm mt-1">
                                {agent.description || `${agent.llm_provider} - ${agent.llm_model}`}
                              </p>
                              <div className="flex items-center gap-4 mt-3 text-sm text-[var(--clay-text-muted)]">
                                {agent.llm_model && <span>{agent.llm_model}</span>}
                                {agent.deploy_region && (
                                  <>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <Globe className="w-3 h-3" />
                                      {agent.deploy_region}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {["running", "ready", "stopped"].includes(agent.status) && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction(agent.id, agent.status === "running" ? "stop" : "start");
                                }}
                                className={`p-2.5 rounded-xl transition-all shadow-[var(--shadow-clay-pressed)] ${agent.status === "running"
                                    ? "hover:text-[var(--clay-error)] text-[var(--clay-text-tertiary)] bg-[var(--clay-surface)]"
                                    : "hover:text-[var(--clay-success)] text-[var(--clay-text-tertiary)] bg-[var(--clay-surface)]"
                                  }`}
                              >
                                {agent.status === "running" ? (
                                  <Square className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </motion.button>
                            )}
                            {agent.status !== "destroyed" && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(agent.id);
                                }}
                                className="p-2.5 rounded-xl bg-[var(--clay-surface)] text-[var(--clay-text-tertiary)] hover:text-[var(--clay-error)] transition-colors shadow-[var(--shadow-clay-pressed)]"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </ClayCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Selected Agent Details */}
                <AnimatePresence mode="wait">
                  {selectedAgent ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <ClayCard>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-semibold text-[var(--clay-text-primary)]">
                            Agent Details
                          </h3>
                          {getStatusBadge(selectedAgent.status)}
                        </div>

                        <div className="space-y-4">
                          {/* Gateway URL */}
                          {selectedAgent.gatewayUrl && (
                            <div>
                              <div className="text-sm text-[var(--clay-text-muted)] mb-2">
                                Gateway URL
                              </div>
                              <div className="flex items-center gap-2">
                                <code className="flex-1 p-2 rounded-lg bg-[var(--clay-surface)] text-xs font-mono text-[var(--clay-text-primary)] truncate">
                                  {selectedAgent.gatewayUrl}
                                </code>
                                <button
                                  onClick={() => copyUrl(selectedAgent.gatewayUrl!)}
                                  className="p-2 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]"
                                >
                                  {copied ? (
                                    <CheckCircle className="w-4 h-4 text-[var(--clay-success)]" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                                <a
                                  href={selectedAgent.gatewayUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)]"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="text-sm text-[var(--clay-text-muted)] mb-2">
                              Model
                            </div>
                            <div className="text-[var(--clay-text-primary)]">
                              {selectedAgent.llm_provider} / {selectedAgent.llm_model}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-[var(--clay-text-muted)] mb-2">
                              Region
                            </div>
                            <div className="text-[var(--clay-text-primary)]">
                              {selectedAgent.deploy_region}
                            </div>
                          </div>

                          {selectedAgent.main_ip && (
                            <div>
                              <div className="text-sm text-[var(--clay-text-muted)] mb-2">
                                IP Address
                              </div>
                              <code className="text-[var(--clay-text-primary)] font-mono text-sm">
                                {selectedAgent.main_ip}
                              </code>
                            </div>
                          )}
                        </div>

                        {selectedAgent.gatewayUrl && (
                          <a
                            href={selectedAgent.gatewayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ClayButton
                              variant="primary"
                              className="w-full mt-6 flex items-center justify-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Open Gateway
                            </ClayButton>
                          </a>
                        )}
                      </ClayCard>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ClayCard className="text-center text-[var(--clay-text-muted)] py-12">
                        <Cpu className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Select an agent to view details</p>
                      </ClayCard>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Actions */}
                <ClayCard>
                  <h3 className="font-semibold text-[var(--clay-text-primary)] mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link href="/agents/deploy" className="block">
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:bg-[var(--clay-surface-hover)] transition-all text-left">
                        <Plus className="w-5 h-5 text-[var(--clay-accent-primary)]" />
                        <span className="text-[var(--clay-text-secondary)]">
                          Deploy New Agent
                        </span>
                      </button>
                    </Link>
                    <Link href="/settings" className="block">
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:bg-[var(--clay-surface-hover)] transition-all text-left">
                        <Settings className="w-5 h-5 text-[var(--clay-accent-primary)]" />
                        <span className="text-[var(--clay-text-secondary)]">
                          Settings
                        </span>
                      </button>
                    </Link>
                  </div>
                </ClayCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
