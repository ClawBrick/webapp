"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, Wallet, ShieldAlert } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { SignMessageModal } from "./SignMessageModal";
import {
  useAppKitAccount,
  useAppKit,
  useDisconnect,
  useAppKitProvider,
} from "@reown/appkit/react";
import type { Provider } from "@reown/appkit-adapter-solana";
import { getBalance } from "@/lib/solana";

export default function Navbar() {
  // Use the official AppKit hooks for reactive state updates
  const { address: appKitAddress, isConnected: appKitConnected } =
    useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState<string>("0.00 SOL");
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const pathname = usePathname();

  // Track if we've already auto-prompted the sign modal for this connection
  const hasAutoPromptedSign = useRef(false);

  // Client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Derived state - use AppKit values when mounted
  const isConnected = mounted && appKitConnected;
  const address = mounted ? appKitAddress || null : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sync localStorage when connection state changes
  useEffect(() => {
    if (!mounted) return;

    if (isConnected && address) {
      // Check authentication status from localStorage
      const authStatus =
        localStorage.getItem("wallet_authenticated") === "true";
      const savedAddress = localStorage.getItem("wallet_address");

      if (authStatus && savedAddress === address) {
        setIsAuthenticated(true);
        const savedBalance =
          localStorage.getItem("wallet_balance") || "0.00 SOL";
        setBalance(savedBalance);
      } else {
        localStorage.setItem("wallet_address", address);
        localStorage.setItem("wallet_connected", "true");
        setIsAuthenticated(false);
      }
    } else {
      // Don't clear localStorage on disconnect - let the disconnect handler do that
    }
  }, [mounted, isConnected, address]);

  // Auto-open sign modal when wallet connects but isn't authenticated
  useEffect(() => {
    if (
      isConnected &&
      address &&
      !isAuthenticated &&
      !hasAutoPromptedSign.current
    ) {
      hasAutoPromptedSign.current = true;
      setShowSignModal(true);
    }
    // Reset the flag when wallet disconnects
    if (!isConnected) {
      hasAutoPromptedSign.current = false;
    }
  }, [isConnected, address, isAuthenticated]);

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const handleSignMessage = async () => {
    if (!address) throw new Error("No wallet address");

    if (!walletProvider) {
      throw new Error("Wallet provider not available");
    }

    try {
      const message = `Welcome to ClawBrick!\n\nSign this message to authenticate your wallet and access the platform.\n\nTimestamp: ${Date.now()}\nAddress: ${address}`;
      const messageBytes = new TextEncoder().encode(message);
      const signature = await walletProvider.signMessage(messageBytes);

      localStorage.setItem("wallet_authenticated", "true");
      localStorage.setItem(
        "wallet_auth_signature",
        Buffer.from(signature).toString("base64"),
      );
      localStorage.setItem("wallet_auth_timestamp", Date.now().toString());

      setIsAuthenticated(true);
      setShowSignModal(false);

      // Fetch real balance from Helius RPC
      setIsLoadingBalance(true);
      try {
        const realBalance = await getBalance(address);
        setBalance(realBalance);
        localStorage.setItem("wallet_balance", realBalance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setBalance("-- SOL");
      } finally {
        setIsLoadingBalance(false);
      }
    } catch (error) {
      console.error("Sign message error:", error);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
    } catch {
      // Fallback
    }

    localStorage.removeItem("wallet_connected");
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("wallet_authenticated");
    localStorage.removeItem("wallet_auth_signature");
    localStorage.removeItem("wallet_auth_timestamp");
    localStorage.removeItem("wallet_balance");

    setIsAuthenticated(false);
    setBalance("0.00 SOL");
    setShowSignModal(false);

    window.location.reload();
  };

  const navLinks = [
    { href: "/manifesto", label: "Manifesto" },
    { href: "/genevieve", label: "Genevieve" },
    { href: "/pricing", label: "Pricing" },
  ];

  // Loading state
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--clay-surface)] rounded-2xl px-6 py-4 flex items-center justify-between shadow-[var(--shadow-clay-floating)]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[var(--clay-text-primary)]">
                ClawBrick
              </span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const showUserMenu = isConnected && address && isAuthenticated;
  const showConnectButton = !isConnected;
  const showSignButton = isConnected && address && !isAuthenticated;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "bg-[var(--clay-surface)] shadow-[var(--shadow-clay-floating)]"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-bold text-xl tracking-tight hidden sm:block text-[var(--clay-text-primary)]">
                ClawBrick
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-xl ${
                    pathname === link.href
                      ? "text-[var(--clay-text-primary)]"
                      : "text-[var(--clay-text-tertiary)] hover:text-[var(--clay-text-primary)]"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[var(--clay-surface)] rounded-xl shadow-[var(--shadow-clay-pressed)]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Section: Theme Toggle + Wallet */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle variant="small" />

              {/* Wallet Section */}
              <AnimatePresence mode="wait">
                {showUserMenu ? (
                  <motion.div
                    key="usermenu"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserMenu
                      address={address}
                      balance={balance}
                      onDisconnect={disconnectWallet}
                    />
                  </motion.div>
                ) : showSignButton ? (
                  <motion.button
                    key="sign"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSignModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all bg-[var(--clay-warning-bg)] text-[var(--clay-warning)] border border-[var(--clay-warning)]/30 shadow-[var(--shadow-clay-small)] animate-pulse"
                    title="Click to verify your wallet"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                    <span className="sm:hidden">Verify</span>
                  </motion.button>
                ) : (
                  <motion.button
                    key="connect"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConnect}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all bg-gradient-to-r from-[var(--clay-accent-primary)] to-[#F4A261] text-white shadow-[var(--shadow-clay-small)]"
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[var(--clay-text-tertiary)] hover:text-[var(--clay-text-primary)] transition-colors rounded-xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)]"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-[var(--clay-surface)] rounded-2xl p-4 space-y-2 shadow-[var(--shadow-clay-floating)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[var(--clay-surface)] text-[var(--clay-text-primary)] shadow-[var(--shadow-clay-pressed)]"
                      : "text-[var(--clay-text-muted)] hover:text-[var(--clay-text-primary)] hover:bg-[var(--clay-surface-hover)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {showUserMenu && address && (
                <div className="pt-2 border-t border-[var(--clay-bg-tertiary)]">
                  <div className="px-4 py-2 text-xs text-[var(--clay-text-muted)]">
                    Connected: {address.slice(0, 6)}...{address.slice(-4)}
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[var(--clay-error)] hover:bg-[var(--clay-error-bg)] transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign Message Modal */}
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
