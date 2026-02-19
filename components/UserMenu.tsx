"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Copy,
  ExternalLink,
  Wallet,
  Sparkles,
  Zap,
  CheckCircle,
  Bot,
} from "lucide-react";
import { ClayCard } from "./ui/ClayCard";

interface UserMenuProps {
  address: string;
  balance?: string;
  onDisconnect: () => void;
}

export function UserMenu({
  address,
  balance = "0.00 SOL",
  onDisconnect,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "wallet">("menu");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveTab("menu");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const menuItems = [
    {
      icon: Bot,
      label: "Agents",
      href: "/agents",
      badge: null,
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
      badge: null,
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      badge: null,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Button - Cool compact design */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)] hover:shadow-[var(--shadow-clay-hover)] transition-all border border-transparent hover:border-[var(--clay-accent-primary)]/20"
      >
        {/* Animated Avatar */}
        <div className="relative">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(224, 122, 95, 0)",
                "0 0 0 4px rgba(224, 122, 95, 0.1)",
                "0 0 0 0 rgba(224, 122, 95, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center"
          >
            <Wallet className="w-4 h-4 text-white" />
          </motion.div>
          {/* Online indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[var(--clay-success)] border-2 border-[var(--clay-surface)] rounded-full" />
        </div>

        {/* Address - Hidden on very small screens */}
        <span className="hidden sm:block text-sm font-semibold text-[var(--clay-text-primary)]">
          {truncateAddress(address)}
        </span>

        {/* Dropdown arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--clay-text-muted)]" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu - Cool animated panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 w-80 z-50"
          >
            <ClayCard className="p-0 overflow-hidden">
              {/* Header with gradient */}
              <div className="relative p-5 bg-gradient-to-br from-[var(--clay-accent-primary)]/10 to-[var(--clay-accent-indigo)]/10">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-[var(--clay-accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[var(--clay-text-muted)] mb-0.5">
                      Connected Wallet
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-[var(--clay-text-primary)] truncate">
                        {address}
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyAddress();
                        }}
                        className="p-1.5 rounded-lg bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] hover:text-[var(--clay-accent-primary)] transition-colors flex-shrink-0"
                        title="Copy address"
                      >
                        {copied ? (
                          <CheckCircle className="w-3.5 h-3.5 text-[var(--clay-success)]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-[var(--clay-success)]"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Balance Display */}
                <div className="mt-4 p-3 rounded-xl bg-[var(--clay-surface)]/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--clay-accent-primary)]/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[var(--clay-accent-primary)]" />
                      </div>
                      <span className="text-sm text-[var(--clay-text-secondary)]">
                        Balance
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[var(--clay-text-primary)]">
                      {balance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-[var(--clay-bg-tertiary)]">
                <button
                  onClick={() => setActiveTab("menu")}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === "menu"
                      ? "text-[var(--clay-accent-primary)] border-b-2 border-[var(--clay-accent-primary)]"
                      : "text-[var(--clay-text-muted)] hover:text-[var(--clay-text-secondary)]"
                  }`}
                >
                  Menu
                </button>
                <button
                  onClick={() => setActiveTab("wallet")}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === "wallet"
                      ? "text-[var(--clay-accent-primary)] border-b-2 border-[var(--clay-accent-primary)]"
                      : "text-[var(--clay-text-muted)] hover:text-[var(--clay-text-secondary)]"
                  }`}
                >
                  Wallet
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-2">
                {activeTab === "menu" ? (
                  <div className="space-y-1">
                    {menuItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--clay-text-secondary)] hover:text-[var(--clay-text-primary)] hover:bg-[var(--clay-surface-hover)] transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-[var(--clay-accent-primary)] text-white">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <a
                      href={`https://solscan.io/account/${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--clay-text-secondary)] hover:text-[var(--clay-text-primary)] hover:bg-[var(--clay-surface-hover)] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        View on Explorer
                      </span>
                    </a>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--clay-text-secondary)] hover:text-[var(--clay-text-primary)] hover:bg-[var(--clay-surface-hover)] transition-colors text-left">
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">Copy Address</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Disconnect Section */}
              <div className="p-2 border-t border-[var(--clay-bg-tertiary)]">
                <button
                  onClick={() => {
                    onDisconnect();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--clay-error)] hover:bg-[var(--clay-error-bg)] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Disconnect Wallet</span>
                </button>
              </div>
            </ClayCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
