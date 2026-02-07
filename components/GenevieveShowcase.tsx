"use client";

import { motion } from "framer-motion";
import { Server, Zap, Wifi, Cpu } from "lucide-react";

export const GenevieveShowcase = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* The Pedestal - Soft Clay Base */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute w-72 h-72 rounded-full bg-[var(--clay-surface)] shadow-[var(--shadow-clay-floating)] flex items-center justify-center"
      >
        {/* Inner ring */}
        <div className="absolute w-56 h-56 rounded-full bg-[var(--clay-surface-hover)] shadow-[var(--shadow-clay-pressed)]" />

        {/* The Device - Genevieve Hardware */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.4,
          }}
          className="relative w-40 h-56 bg-gradient-to-b from-[var(--clay-surface)] to-[var(--clay-surface-pressed)] rounded-[2rem] flex flex-col items-center justify-between py-5 z-10"
          style={{
            boxShadow: `var(--shadow-clay-floating)`,
          }}
        >
          {/* Top Section - Status Lights */}
          <div className="w-full px-5 flex justify-between items-center">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-[var(--clay-accent-primary)] shadow-[0_0_12px_var(--clay-accent-primary)]"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="w-2.5 h-2.5 rounded-full bg-[var(--clay-accent-indigo)] shadow-[0_0_12px_var(--clay-accent-indigo)]"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="w-2.5 h-2.5 rounded-full bg-[var(--clay-success)] shadow-[0_0_12px_var(--clay-success)]"
            />
          </div>

          {/* Center - Branding */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--clay-surface)] shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
              <Server className="w-8 h-8 text-[var(--clay-accent-primary)]" />
            </div>
            <div>
              <h3 className="text-[var(--clay-text-primary)] font-mono text-xs tracking-[0.2em] uppercase font-semibold">
                ClawBrick
              </h3>
              <p className="text-[var(--clay-text-muted)] text-[10px] tracking-wider">
                Gen.1 Core
              </p>
            </div>
          </div>

          {/* Bottom - Ports (Visual details) */}
          <div className="w-full px-5 space-y-3">
            {/* Ethernet Port */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-[var(--clay-bg-tertiary)] rounded-lg shadow-[var(--shadow-clay-pressed)] flex items-center justify-center">
                <div className="w-6 h-1 bg-[var(--clay-text-muted)] rounded-full" />
              </div>
              <span className="text-[8px] text-[var(--clay-text-muted)] uppercase tracking-wider">
                LAN
              </span>
            </div>
            {/* USB Ports */}
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-6 h-4 bg-[var(--clay-bg-tertiary)] rounded-md shadow-[var(--shadow-clay-pressed)]" />
                <div className="w-6 h-4 bg-[var(--clay-bg-tertiary)] rounded-md shadow-[var(--shadow-clay-pressed)]" />
              </div>
              <span className="text-[8px] text-[var(--clay-text-muted)] uppercase tracking-wider">
                USB
              </span>
            </div>
          </div>

          {/* Device Reflection/Gloss Overlay */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
        </motion.div>

        {/* Orbiting Elements - Represents AI processing */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute w-80 h-80 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--clay-accent-primary)]/50 shadow-[0_0_20px_var(--clay-accent-primary)]" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute w-72 h-72 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--clay-accent-indigo)]/50 shadow-[0_0_20px_var(--clay-accent-indigo)]" />
        </motion.div>

        {/* Floating spec badges - Soft Clay Style */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -right-4 top-1/4 bg-[var(--clay-surface)] rounded-2xl p-3 shadow-[var(--shadow-clay-small)]"
        >
          <Cpu className="w-5 h-5 text-[var(--clay-accent-primary)]" />
          <p className="text-[10px] text-[var(--clay-text-tertiary)] mt-1">
            8-Core
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -left-4 bottom-1/4 bg-[var(--clay-surface)] rounded-2xl p-3 shadow-[var(--shadow-clay-small)]"
        >
          <Zap className="w-5 h-5 text-[var(--clay-warning)]" />
          <p className="text-[10px] text-[var(--clay-text-tertiary)] mt-1">
            16 TOPS
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[var(--clay-surface)] rounded-2xl p-3 shadow-[var(--shadow-clay-small)]"
        >
          <Wifi className="w-5 h-5 text-[var(--clay-success)]" />
          <p className="text-[10px] text-[var(--clay-text-tertiary)] mt-1">
            WiFi 6
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
