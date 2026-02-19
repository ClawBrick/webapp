"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Lock,
  Wallet,
  ArrowRight,
  Sparkles,
  Shield,
  Signature,
} from "lucide-react";
import { ClayCard, ClayButton } from "./ui/ClayCard";
import { SignMessageModal } from "./SignMessageModal";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage
    const checkAuth = () => {
      const connected = localStorage.getItem("wallet_connected") === "true";
      const authenticated =
        localStorage.getItem("wallet_authenticated") === "true";
      const savedAddress = localStorage.getItem("wallet_address");

      setIsConnected(connected);
      setIsAuthenticated(authenticated);
      setAddress(savedAddress);
      setIsLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    // Open AppKit modal
    try {
      const { useAppKit } = await import("@reown/appkit/react");
      const { open } = useAppKit();
      await open();
    } catch {
      // Fallback for static generation
      setShowConnectModal(true);
    }
  };

  const handleSignMessage = async () => {
    if (!address) throw new Error("No wallet address");

    try {
      const { useAppKitProvider } = await import("@reown/appkit/react");
      const { walletProvider } = useAppKitProvider("solana");

      if (!walletProvider) {
        throw new Error("Wallet provider not available");
      }

      const message = `Welcome to ClawBrick!\n\nSign this message to authenticate your wallet and access the platform.\n\nTimestamp: ${Date.now()}\nAddress: ${address}`;
      const messageBytes = new TextEncoder().encode(message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const signature = await (walletProvider as any).signMessage(messageBytes);

      localStorage.setItem("wallet_authenticated", "true");
      localStorage.setItem(
        "wallet_auth_signature",
        Buffer.from(signature).toString("base64"),
      );
      localStorage.setItem("wallet_auth_timestamp", Date.now().toString());

      setIsAuthenticated(true);
      setShowSignModal(false);
    } catch (error) {
      console.error("Sign message error:", error);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    // Note: AppKit disconnect is handled at the Navbar level
    // This function just clears our local auth state

    localStorage.removeItem("wallet_connected");
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("wallet_authenticated");
    localStorage.removeItem("wallet_auth_signature");
    localStorage.removeItem("wallet_auth_timestamp");
    localStorage.removeItem("wallet_balance");

    setIsAuthenticated(false);
    setShowSignModal(false);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--clay-bg-primary)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[var(--clay-accent-primary)] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isConnected || !isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--clay-bg-primary)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-floating)] flex items-center justify-center"
            >
              <Lock className="w-10 h-10 text-[var(--clay-accent-primary)]" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--clay-text-primary)]">
              Authentication Required
            </h1>
            <p className="text-xl text-[var(--clay-text-tertiary)] max-w-xl mx-auto">
              Connect your wallet and verify your identity to access the Agents
              dashboard
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Step 1: Connect */}
            <ClayCard className={`p-8 ${isConnected ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isConnected
                      ? "bg-[var(--clay-success-bg)] text-[var(--clay-success)]"
                      : "bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] text-[var(--clay-accent-primary)]"
                  }`}
                >
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-[var(--clay-text-muted)]">
                    Step 1
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clay-text-primary)]">
                    {isConnected ? "Wallet Connected" : "Connect Wallet"}
                  </h3>
                </div>
              </div>
              <p className="text-[var(--clay-text-tertiary)] mb-6">
                {isConnected
                  ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Connect your Solana wallet to get started with ClawBrick."}
              </p>
              {!isConnected && (
                <ClayButton
                  variant="primary"
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Connect Wallet
                  <ArrowRight className="w-4 h-4" />
                </ClayButton>
              )}
            </ClayCard>

            {/* Step 2: Verify */}
            <ClayCard className={`p-8 ${!isConnected ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isConnected
                      ? "bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] text-[var(--clay-accent-indigo)]"
                      : "bg-[var(--clay-bg-tertiary)] text-[var(--clay-text-muted)]"
                  }`}
                >
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-[var(--clay-text-muted)]">
                    Step 2
                  </div>
                  <h3 className="text-xl font-bold text-[var(--clay-text-primary)]">
                    Verify Identity
                  </h3>
                </div>
              </div>
              <p className="text-[var(--clay-text-tertiary)] mb-6">
                Sign a message to verify wallet ownership. This is gas-free and
                only takes a moment.
              </p>
              {isConnected && !isAuthenticated && (
                <ClayButton
                  variant="primary"
                  onClick={() => setShowSignModal(true)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Signature className="w-4 h-4" />
                  Sign Message to Verify
                </ClayButton>
              )}
            </ClayCard>
          </div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-center text-lg font-semibold text-[var(--clay-text-primary)] mb-8">
              What you&apos;ll get access to
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Sparkles,
                  title: "Deploy Agents",
                  desc: "Create and manage AI agents",
                },
                {
                  icon: Shield,
                  title: "Secure Dashboard",
                  desc: "Your private control center",
                },
                {
                  icon: Wallet,
                  title: "On-chain Actions",
                  desc: "Execute blockchain operations",
                },
              ].map((feature, i) => (
                <ClayCard key={i} className="p-6 text-center">
                  <feature.icon className="w-8 h-8 mx-auto mb-3 text-[var(--clay-accent-primary)]" />
                  <h4 className="font-semibold text-[var(--clay-text-primary)] mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[var(--clay-text-tertiary)]">
                    {feature.desc}
                  </p>
                </ClayCard>
              ))}
            </div>
          </motion.div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/")}
              className="text-[var(--clay-text-tertiary)] hover:text-[var(--clay-accent-primary)] transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {address && isConnected && !isAuthenticated && (
        <SignMessageModal
          isOpen={showSignModal}
          onClose={() => setShowSignModal(false)}
          onSign={handleSignMessage}
          onDisconnect={disconnectWallet}
          address={address}
        />
      )}
    </>
  );
}
