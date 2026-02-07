"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "small";
}

export function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "small") {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={cn(
          "relative w-10 h-10 rounded-xl flex items-center justify-center",
          "bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)]",
          "transition-colors duration-200",
          className
        )}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun className="w-5 h-5 text-[var(--clay-accent-primary)]" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon className="w-5 h-5 text-[var(--clay-accent-indigo)]" />
        </motion.div>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center gap-3 px-4 py-2.5 rounded-2xl",
        "bg-[var(--clay-surface)] shadow-[var(--shadow-clay-small)]",
        "transition-all duration-200",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 90 : 0,
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-[var(--clay-accent-primary)]" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-[var(--clay-accent-indigo)]" />
        </motion.div>
      </div>
      <span className="text-sm font-medium text-[var(--clay-text-secondary)]">
        {isDark ? "Dark" : "Light"}
      </span>
    </motion.button>
  );
}
