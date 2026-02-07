"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  pressed?: boolean;
}

export const ClayCard = ({
  children,
  className,
  onClick,
  interactive = false,
  pressed = false,
}: ClayCardProps) => {
  return (
    <motion.div
      whileHover={interactive && !pressed ? { scale: 1.01, y: -4 } : {}}
      whileTap={interactive ? { scale: 0.99 } : {}}
      onClick={onClick}
      className={cn(
        // Base Soft Clay Style - Uses CSS variables for theming
        "bg-[var(--clay-surface)] rounded-[28px] p-6 relative overflow-hidden",
        // Soft, diffused ambient occlusion shadows using CSS variables
        pressed
          ? "shadow-[var(--shadow-clay-pressed)]"
          : "shadow-[var(--shadow-clay-floating)]",
        // Interactive states
        interactive &&
        !pressed &&
        "cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-clay-hover)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

// Soft Clay Button - Sunset Orange primary variant
export const ClayButton = ({
  children,
  className,
  onClick,
  variant = "default",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "ghost";
  disabled?: boolean;
}) => {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-3 rounded-[20px] font-semibold transition-all duration-200",
        // Default: Soft white clay surface
        variant === "default" && [
          "bg-[var(--clay-surface)] text-[var(--clay-text-primary)]",
          "shadow-[var(--shadow-clay-small)]",
          "hover:shadow-[var(--shadow-clay-hover)]",
        ],
        // Primary: Sunset Orange accent
        variant === "primary" && [
          "bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] text-white",
          "shadow-[6px_6px_20px_rgba(224,122,95,0.35),-6px_-6px_20px_rgba(255,255,255,0.1)]",
          "hover:shadow-[8px_8px_28px_rgba(224,122,95,0.45),-8px_-8px_28px_rgba(255,255,255,0.15)]",
        ],
        // Ghost: Transparent
        variant === "ghost" && [
          "bg-transparent shadow-none hover:bg-[var(--clay-surface-hover)]",
          "text-[var(--clay-text-secondary)]",
        ],
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </motion.button>
  );
};

// Clay input field - Soft inset
export const ClayInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "w-full px-5 py-4 rounded-[16px] bg-[var(--clay-surface)]",
        "shadow-[var(--shadow-clay-inset)]",
        "text-[var(--clay-text-primary)] placeholder:text-[var(--clay-text-muted)]",
        "border-none outline-none",
        "focus:shadow-[inset_4px_4px_12px_var(--shadow-color-inset-dark),inset_-4px_-4px_12px_var(--shadow-color-inset-light),0_0_0_3px_rgba(224,122,95,0.15)]",
        "transition-all duration-200",
        className,
      )}
      {...props}
    />
  );
};

// Clay textarea
export const ClayTextarea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        "w-full px-5 py-4 rounded-[16px] bg-[var(--clay-surface)]",
        "shadow-[var(--shadow-clay-inset)]",
        "text-[var(--clay-text-primary)] placeholder:text-[var(--clay-text-muted)]",
        "border-none outline-none resize-none",
        "focus:shadow-[inset_4px_4px_12px_var(--shadow-color-inset-dark),inset_-4px_-4px_12px_var(--shadow-color-inset-light),0_0_0_3px_rgba(224,122,95,0.15)]",
        "transition-all duration-200",
        className,
      )}
      {...props}
    />
  );
};

// Clay select
export const ClaySelect = ({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className={cn(
        "w-full px-5 py-4 rounded-[16px] bg-[var(--clay-surface)]",
        "shadow-[var(--shadow-clay-inset)]",
        "text-[var(--clay-text-primary)] border-none outline-none appearance-none cursor-pointer",
        "focus:shadow-[inset_4px_4px_12px_var(--shadow-color-inset-dark),inset_-4px_-4px_12px_var(--shadow-color-inset-light),0_0_0_3px_rgba(224,122,95,0.15)]",
        "transition-all duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
};

// Status badge - Soft clay style
export const ClayBadge = ({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "accent";
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
        variant === "default" && [
          "bg-[var(--clay-surface)] text-[var(--clay-text-secondary)]",
          "shadow-[var(--shadow-clay-pressed)]",
        ],
        variant === "success" && [
          "bg-[var(--clay-success-bg)] text-[var(--clay-success-text)]",
          "shadow-[var(--shadow-clay-pressed)]",
        ],
        variant === "warning" && [
          "bg-[var(--clay-warning-bg)] text-[var(--clay-warning-text)]",
          "shadow-[var(--shadow-clay-pressed)]",
        ],
        variant === "error" && [
          "bg-[var(--clay-error-bg)] text-[var(--clay-error-text)]",
          "shadow-[var(--shadow-clay-pressed)]",
        ],
        variant === "accent" && [
          "bg-gradient-to-r from-[var(--clay-accent-primary)]/10 to-[#F4A261]/10",
          "text-[var(--clay-accent-primary)]",
          "shadow-[var(--shadow-clay-pressed)]",
        ],
        className,
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          variant === "success" &&
          "bg-[var(--clay-success)] shadow-[0_0_8px_var(--clay-success)]",
          variant === "warning" &&
          "bg-[var(--clay-warning)] shadow-[0_0_8px_var(--clay-warning)]",
          variant === "error" &&
          "bg-[var(--clay-error)] shadow-[0_0_8px_var(--clay-error)]",
          variant === "accent" &&
          "bg-[var(--clay-accent-primary)] shadow-[0_0_8px_var(--clay-accent-primary)]",
          variant === "default" && "bg-[var(--clay-text-muted)]",
        )}
      />
      {children}
    </span>
  );
};

// Clay Toggle Switch
export const ClayToggle = ({
  checked,
  onChange,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-14 h-8 rounded-full transition-all duration-300",
        "shadow-[var(--shadow-clay-inset)]",
        checked
          ? "bg-[var(--clay-accent-primary)]/20"
          : "bg-[var(--clay-surface)]",
        className,
      )}
    >
      <motion.div
        initial={false}
        animate={{ x: checked ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full",
          "shadow-[var(--shadow-clay-small)]",
          checked
            ? "bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261]"
            : "bg-[var(--clay-surface)]",
        )}
      />
    </button>
  );
};

// Clay Icon Button - Circular
export const ClayIconButton = ({
  children,
  onClick,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary" | "ghost";
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200",
        variant === "default" && [
          "bg-[var(--clay-surface)] text-[var(--clay-text-secondary)]",
          "shadow-[var(--shadow-clay-small)]",
          "hover:shadow-[var(--shadow-clay-hover)]",
        ],
        variant === "primary" && [
          "bg-gradient-to-br from-[var(--clay-accent-primary)] to-[#F4A261] text-white",
          "shadow-[4px_4px_16px_rgba(224,122,95,0.35)]",
        ],
        variant === "ghost" && [
          "bg-transparent shadow-none hover:bg-[var(--clay-surface-hover)]",
          "text-[var(--clay-text-secondary)]",
        ],
        className,
      )}
    >
      {children}
    </motion.button>
  );
};
