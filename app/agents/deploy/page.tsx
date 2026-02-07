"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Bot,
    MessageSquare,
    Key,
    Globe,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Copy,
    ExternalLink,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ClayCard,
    ClayButton,
    ClayInput,
    ClaySelect,
} from "@/components/ui/ClayCard";
import { AuthGuard } from "@/components/AuthGuard";
import { LLM_PROVIDERS, VULTR_REGIONS } from "@/lib/supabase";

interface DeployResult {
    success: boolean;
    agent: {
        id: string;
        name: string;
        status: string;
        subdomain: string;
        deployRegion: string;
    };
    gatewayToken: string;
    message: string;
}

export default function DeployAgentPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployResult, setDeployResult] = useState<DeployResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [llmProvider, setLlmProvider] = useState<string>("anthropic");
    const [llmModel, setLlmModel] = useState<string>("claude-3-5-sonnet-20241022");
    const [telegramBotToken, setTelegramBotToken] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [deployRegion, setDeployRegion] = useState("bom");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get models for selected provider
    const selectedProvider = LLM_PROVIDERS.find(p => p.value === llmProvider);
    const availableModels = selectedProvider?.models || [];

    // Update model when provider changes
    useEffect(() => {
        if (availableModels.length > 0 && !availableModels.includes(llmModel as never)) {
            setLlmModel(availableModels[0] ?? "");
        }
    }, [llmProvider, availableModels, llmModel]);

    const handleDeploy = async () => {
        setError(null);
        setIsDeploying(true);

        try {
            // Get user ID from localStorage (wallet address)
            const userId = localStorage.getItem("wallet_address");
            if (!userId) {
                throw new Error("Please connect your wallet first");
            }

            const response = await fetch("/api/agents/launch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    name: name || `OpenClaw Agent`,
                    description,
                    llmProvider,
                    llmModel,
                    telegramBotToken,
                    apiKey,
                    deployRegion,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Deployment failed");
            }

            setDeployResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Deployment failed");
        } finally {
            setIsDeploying(false);
        }
    };

    const copyToken = async () => {
        if (!deployResult?.gatewayToken) return;
        try {
            await navigator.clipboard.writeText(deployResult.gatewayToken);
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
                            <Link href="/agents" className="hover:text-[var(--clay-accent-primary)] transition-colors">
                                Agents
                            </Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-[var(--clay-text-primary)]">Deploy</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--clay-text-primary)]">
                            Deploy <span className="gradient-text">Agent</span>
                        </h1>
                        <p className="text-[var(--clay-text-tertiary)] text-lg">
                            Launch your own private OpenClaw AI assistant instance
                        </p>
                    </motion.div>

                    {/* Success State */}
                    {deployResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <ClayCard className="p-8 mb-6">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--clay-success)]/10 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-[var(--clay-success)]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--clay-text-primary)] mb-2">
                                        Deployment Started!
                                    </h2>
                                    <p className="text-[var(--clay-text-tertiary)]">
                                        {deployResult.message}
                                    </p>
                                </div>

                                {/* Gateway Token - IMPORTANT */}
                                <div className="p-4 mb-6 rounded-xl bg-[var(--clay-warning)]/10 border border-[var(--clay-warning)]/20">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-[var(--clay-warning)] flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <div className="font-semibold text-[var(--clay-text-primary)] mb-1">
                                                Save Your Gateway Token
                                            </div>
                                            <p className="text-sm text-[var(--clay-text-tertiary)] mb-3">
                                                This token is shown only once. You'll need it to access your OpenClaw gateway.
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 p-3 rounded-lg bg-[var(--clay-surface)] text-sm font-mono text-[var(--clay-text-primary)] break-all">
                                                    {deployResult.gatewayToken}
                                                </code>
                                                <button
                                                    onClick={copyToken}
                                                    className="p-3 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)] transition-colors"
                                                >
                                                    {copied ? (
                                                        <CheckCircle className="w-5 h-5 text-[var(--clay-success)]" />
                                                    ) : (
                                                        <Copy className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Agent Details */}
                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                                        <div className="text-sm text-[var(--clay-text-muted)] mb-1">Agent Name</div>
                                        <div className="font-medium text-[var(--clay-text-primary)]">
                                            {deployResult.agent.name}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                                        <div className="text-sm text-[var(--clay-text-muted)] mb-1">Status</div>
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-[var(--clay-accent-primary)]" />
                                            <span className="font-medium text-[var(--clay-text-primary)]">
                                                Provisioning...
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <ClayButton
                                        variant="default"
                                        onClick={() => router.push("/agents")}
                                        className="flex-1"
                                    >
                                        View All Agents
                                    </ClayButton>
                                    <ClayButton
                                        variant="primary"
                                        onClick={() => router.push(`/agents/${deployResult.agent.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Track Deployment
                                    </ClayButton>
                                </div>
                            </ClayCard>
                        </motion.div>
                    )}

                    {/* Deploy Form */}
                    {!deployResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ClayCard className="p-6 sm:p-8">
                                {/* Error Display */}
                                {error && (
                                    <div className="mb-6 p-4 rounded-xl bg-[var(--clay-error)]/10 border border-[var(--clay-error)]/20">
                                        <div className="flex items-center gap-2 text-[var(--clay-error)]">
                                            <AlertCircle className="w-5 h-5" />
                                            <span>{error}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {/* Agent Name */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-[var(--clay-text-secondary)] mb-2">
                                            <Bot className="w-4 h-4" />
                                            Agent Name
                                        </label>
                                        <ClayInput
                                            placeholder="My AI Assistant"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="text-sm font-medium text-[var(--clay-text-secondary)] mb-2 block">
                                            Description (optional)
                                        </label>
                                        <ClayInput
                                            placeholder="What will this agent do?"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    {/* LLM Provider & Model */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-[var(--clay-text-secondary)] mb-2">
                                                <Rocket className="w-4 h-4" />
                                                LLM Provider
                                            </label>
                                            <ClaySelect
                                                value={llmProvider}
                                                onChange={(e) => setLlmProvider(e.target.value)}
                                            >
                                                {LLM_PROVIDERS.map((provider) => (
                                                    <option key={provider.value} value={provider.value}>
                                                        {provider.label}
                                                    </option>
                                                ))}
                                            </ClaySelect>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-[var(--clay-text-secondary)] mb-2 block">
                                                Model
                                            </label>
                                            <ClaySelect
                                                value={llmModel}
                                                onChange={(e) => setLlmModel(e.target.value)}
                                            >
                                                {availableModels.map((model) => (
                                                    <option key={model} value={model}>
                                                        {model}
                                                    </option>
                                                ))}
                                            </ClaySelect>
                                        </div>
                                    </div>

                                    {/* API Key */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-[var(--clay-text-secondary)] mb-2">
                                            <Key className="w-4 h-4" />
                                            {selectedProvider?.label} API Key
                                        </label>
                                        <ClayInput
                                            type="password"
                                            placeholder="sk-..."
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                        />
                                        <p className="text-xs text-[var(--clay-text-muted)] mt-1">
                                            Your API key is encrypted and stored securely
                                        </p>
                                    </div>

                                    {/* Telegram Bot Token */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-[var(--clay-text-secondary)] mb-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Telegram Bot Token
                                        </label>
                                        <ClayInput
                                            type="password"
                                            placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                                            value={telegramBotToken}
                                            onChange={(e) => setTelegramBotToken(e.target.value)}
                                        />
                                        <p className="text-xs text-[var(--clay-text-muted)] mt-1">
                                            Get this from @BotFather on Telegram
                                        </p>
                                    </div>

                                    {/* Deploy Region */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-[var(--clay-text-secondary)] mb-2">
                                            <Globe className="w-4 h-4" />
                                            Deploy Region
                                        </label>
                                        <ClaySelect
                                            value={deployRegion}
                                            onChange={(e) => setDeployRegion(e.target.value)}
                                        >
                                            {VULTR_REGIONS.map((region) => (
                                                <option key={region.value} value={region.value}>
                                                    {region.label}
                                                </option>
                                            ))}
                                        </ClaySelect>
                                    </div>
                                </div>

                                {/* Deploy Button */}
                                <div className="mt-8 flex gap-3">
                                    <ClayButton
                                        variant="default"
                                        onClick={() => router.push("/agents")}
                                        className="flex-1"
                                    >
                                        Cancel
                                    </ClayButton>
                                    <ClayButton
                                        variant="primary"
                                        onClick={handleDeploy}
                                        disabled={isDeploying || !telegramBotToken}
                                        className="flex-1 flex items-center justify-center gap-2"
                                    >
                                        {isDeploying ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Deploying...
                                            </>
                                        ) : (
                                            <>
                                                <Rocket className="w-5 h-5" />
                                                Deploy Agent
                                            </>
                                        )}
                                    </ClayButton>
                                </div>

                                {/* Cost Info */}
                                <p className="text-center text-sm text-[var(--clay-text-muted)] mt-4">
                                    Estimated cost: ~$5-10/month for the VM
                                </p>
                            </ClayCard>
                        </motion.div>
                    )}
                </div>
            </div>
        </AuthGuard>
    );
}
