"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  LogOut,
} from "lucide-react";
import { ClayCard, ClayButton } from "./ui/ClayCard";

interface SignMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: () => Promise<void>;
  onDisconnect?: () => void;
  address: string;
}

export function SignMessageModal({
  isOpen,
  onClose,
  onSign,
  onDisconnect,
  address,
}: SignMessageModalProps) {
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSign = async () => {
    setIsSigning(true);
    setError(null);

    try {
      await onSign();
      setSuccess(true);
      // Close modal after showing success briefly
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign message");
    } finally {
      setIsSigning(false);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--clay-text-primary)]/30 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSigning) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md"
          >
            <ClayCard className="relative overflow-hidden">
              {/* Close button - only show if not requiring auth */}
              {onDisconnect && !isSigning && !success && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] text-[var(--clay-text-muted)] hover:text-[var(--clay-text-primary)] transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* Success State */}
              {success ? (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--clay-success-bg)] flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-[var(--clay-success)]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-2">
                    Authentication Successful!
                  </h3>
                  <p className="text-[var(--clay-text-tertiary)]">
                    You&apos;re all set to use ClawBrick.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                      <Shield className="w-7 h-7 text-[var(--clay-accent-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-1">
                      Verify Your Wallet
                    </h3>
                    <p className="text-sm text-[var(--clay-text-tertiary)]">
                      Sign a message to authenticate your connection
                    </p>
                  </div>

                  {/* Wallet Info */}
                  <div className="mb-6 p-4 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]">
                    <div className="text-xs text-[var(--clay-text-muted)] mb-1">
                      Connected Address
                    </div>
                    <code className="text-sm text-[var(--clay-text-primary)] font-mono">
                      {truncateAddress(address)}
                    </code>
                  </div>

                  {/* Message Preview */}
                  <div className="mb-6">
                    <div className="text-xs text-[var(--clay-text-muted)] mb-2">
                      Message to Sign
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--clay-bg-secondary)] border border-[var(--clay-bg-tertiary)]">
                      <p className="text-sm text-[var(--clay-text-secondary)] font-mono break-all">
                        Welcome to ClawBrick! Sign this message to authenticate
                        your wallet and access the platform. Timestamp:{" "}
                        {Date.now()}
                      </p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl bg-[var(--clay-error-bg)] flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-[var(--clay-error)] flex-shrink-0" />
                      <p className="text-sm text-[var(--clay-error-text)]">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  {/* Security Note */}
                  <div className="mb-6 flex items-start gap-2 text-xs text-[var(--clay-text-muted)]">
                    <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                      This signature request is for authentication purposes
                      only. It won&apos;t trigger any blockchain transactions or
                      incur gas fees.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {onDisconnect ? (
                      <ClayButton
                        variant="default"
                        onClick={onDisconnect}
                        disabled={isSigning}
                        className="flex-1 flex items-center justify-center gap-2 text-[var(--clay-error)]"
                      >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                      </ClayButton>
                    ) : (
                      <ClayButton
                        variant="default"
                        onClick={onClose}
                        disabled={isSigning}
                        className="flex-1 text-[var(--clay-text-secondary)]"
                      >
                        Cancel
                      </ClayButton>
                    )}
                    <ClayButton
                      variant="primary"
                      onClick={handleSign}
                      disabled={isSigning}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      {isSigning ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Signing...
                        </>
                      ) : (
                        "Sign Message"
                      )}
                    </ClayButton>
                  </div>
                </>
              )}
            </ClayCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
