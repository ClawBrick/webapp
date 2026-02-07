
---

# 🧱 Implementation Plan: The "Soft Clay" Overhaul

## Phase 1: The Design System (Global Styles)
We need to strip out the "Space/Particle" effects and replace them with a "Matte Studio" atmosphere. The key to "Clay" is **lighting**—soft highlights on top, deep soft shadows on the bottom.

### 1.1 Update `app/globals.css`
Tailwind 4 uses native CSS variables. We will define the "Clay" variables here to ensure consistency.

```css
@import "tailwindcss";

:root {
  /* BACKGROUNDS */
  --bg-deep: #161616;    /* The surface the bricks sit on */
  --bg-clay: #222222;    /* The actual brick color */
  --bg-clay-hover: #262626;
  
  /* ACCENTS (Pastel/Matte) */
  --accent-primary: #818cf8; /* Soft Indigo */
  --accent-success: #34d399; /* Soft Mint */
  --accent-alert: #fb7185;   /* Soft Coral */

  /* SHADOWS - The Secret Sauce */
  /* Two shadows: one dark (bottom-right), one light (top-left) */
  --shadow-clay-floating: 
    12px 12px 24px #0f0f0f, 
    -12px -12px 24px #2e2e2e;
    
  --shadow-clay-pressed: 
    inset 6px 6px 12px #151515, 
    inset -6px -6px 12px #2f2f2f;
}

body {
  background-color: var(--bg-deep);
  color: #f5f5f5;
  font-family: var(--font-geist-sans);
}

/* REMOVE: Particle canvas styles */
```

### 1.2 Create Reusable "Brick" Components
Don't write shadow classes every time. Create a reusable wrapper in `components/ui/ClayCard.tsx`.

```tsx
// components/ui/ClayCard.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean; // If true, behaves like a button
}

export const ClayCard = ({ children, className, onClick, interactive }: ClayCardProps) => {
  return (
    <motion.div
      whileHover={interactive ? { scale: 1.02, y: -4 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={cn(
        // Base Clay Style
        "bg-[#222222] rounded-3xl p-6 relative overflow-hidden",
        // The Soft Lighting Effect
        "shadow-[10px_10px_20px_#101010,-10px_-10px_20px_#343434]",
        // Subtle top highlight border for realism
        "border-t border-l border-white/5",
        interactive && "cursor-pointer transition-colors hover:bg-[#262626]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
```

---

## Phase 2: The Hero Section & "Genevieve" Device
The user asked for the Raspberry Pi device. In this aesthetic, we shouldn't just paste a photo. We should frame the device inside a "Clay Housing" on the screen.

**Concept:** The Hero is a split layout. Text on the left, the "Genevieve" hardware on the right, resting on a digital pedestal.

### 2.1 The "Genevieve" Hardware Component
Create `components/GenevieveShowcase.tsx`. This simulates your Raspberry Pi wrapped in the ClawBrick aesthetic.

```tsx
"use client";
import { motion } from "framer-motion";

export const GenevieveShowcase = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* The Pedestal (Clay Base) */}
      <div className="absolute w-80 h-80 rounded-full bg-[#222222] shadow-[20px_20px_40px_#101010,-20px_-20px_40px_#343434] flex items-center justify-center">
        
        {/* The Device (Your Raspberry Pi Representation) */}
        {/* We make it look like a sleek matte box with ports */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative w-48 h-64 bg-[#1a1a1a] rounded-[2rem] border-2 border-[#333] shadow-2xl flex flex-col items-center justify-between py-8"
        >
          {/* Top Status Light */}
          <div className="w-full flex justify-center">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]" 
            />
          </div>

          {/* Branding */}
          <div className="text-center">
            <h3 className="text-white/80 font-mono text-xs tracking-widest uppercase">ClawBrick</h3>
            <p className="text-white/30 text-[10px]">Gen.1 Core</p>
          </div>

          {/* The "Ports" (Visual details implying RasPi) */}
          <div className="flex gap-3 mb-4">
            {/* Fake Ethernet Port */}
            <div className="w-8 h-6 bg-black/50 rounded-md inner-shadow border border-white/5" />
            {/* Fake USB Ports */}
            <div className="w-8 h-6 bg-black/50 rounded-md inner-shadow border border-white/5" />
          </div>

          {/* Device Reflection/Gloss Overlay */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </motion.div>

        {/* Orbiting Elements (Optional - represents AI processing) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute w-96 h-96 rounded-full border border-dashed border-white/5"
        />
      </div>
    </div>
  );
};
```

---

## Phase 3: The Bento Grid Layout (Home & Skills)
The "Bento" look relies on a rigid grid with varied cell sizes.

### 3.1 Update `app/page.tsx` (Home)
Replace the current hero with the Bento Grid.

```tsx
import { ClayCard } from "@/components/ui/ClayCard";
import { GenevieveShowcase } from "@/components/GenevieveShowcase";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-7xl mx-auto space-y-8">
      
      {/* HERO SECTION: Split View */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-[#222] shadow-[inset_2px_2px_4px_#151515] text-indigo-400 text-sm font-medium">
            v1.0 Now Live on Solana
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white/90">
            Build with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Digital Clay.
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-md leading-relaxed">
            Deploy intelligent agents on dedicated hardware. 
            Modular, tactile, and powered by Genevieve.
          </p>
          
          <div className="flex gap-4 pt-4">
            {/* Primary Action Button (Pressed feel) */}
            <button className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-[6px_6px_12px_#101010,-6px_-6px_12px_#343434] active:shadow-[inset_4px_4px_8px_#3730a3] transition-all transform active:scale-95">
              Start Building
            </button>
            <button className="px-8 py-4 rounded-2xl bg-[#222] text-white/80 font-semibold shadow-[6px_6px_12px_#101010,-6px_-6px_12px_#343434] hover:text-indigo-400 transition-all">
              Pre-order Genevieve
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: The Hardware Showcase */}
        <GenevieveShowcase />
      </section>

      {/* FEATURE BENTO GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        
        {/* Large Card: Agent Status */}
        <ClayCard className="md:col-span-2 flex flex-col justify-between" interactive>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-medium">Active Agents</h3>
            <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
          </div>
          {/* Visual representation of 'Blocks' for agents */}
          <div className="flex gap-4 mt-auto">
            <div className="h-16 w-32 rounded-xl bg-[#1a1a1a] shadow-[inset_2px_2px_5px_black] flex items-center justify-center text-xs text-white/40">
              Agent 01
            </div>
            <div className="h-16 w-32 rounded-xl bg-[#1a1a1a] shadow-[inset_2px_2px_5px_black] flex items-center justify-center text-xs text-white/40">
              Agent 02
            </div>
          </div>
        </ClayCard>

        {/* Small Card: Wallet */}
        <ClayCard className="bg-gradient-to-br from-[#222] to-[#1a1a1a]" interactive>
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] shadow-[inset_2px_2px_5px_black] flex items-center justify-center">
              {/* Solana Logo SVG here */}
              <div className="w-6 h-6 bg-purple-500 rounded-full" />
            </div>
            <p className="text-sm font-medium">Connect Wallet</p>
          </div>
        </ClayCard>

        {/* Medium Card: Marketplace */}
        <ClayCard className="md:col-span-3 flex items-center justify-between px-12" interactive>
          <div>
            <h3 className="text-xl font-medium text-white">Skills Marketplace</h3>
            <p className="text-white/40 text-sm">Drag and drop capabilities to your agents.</p>
          </div>
          <div className="flex -space-x-4">
            {[1,2,3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-[#333] border-4 border-[#222] shadow-lg" />
            ))}
          </div>
        </ClayCard>

      </section>
    </main>
  );
}
```

---

## Phase 4: UI Micro-Interactions (The "Playful" Part)
To make it feel like "Soft Clay," animations shouldn't be "swooshy." They should be **springy**.

### 4.1 Update Framer Motion configs
In your `lib/utils.ts` or a new animation config file, define a standard "Clay Spring":

```ts
export const claySpring = {
  type: "spring",
  stiffness: 300,
  damping: 20, // Low damping makes it bounce slightly
  mass: 1
};
```

### 4.2 The "Pressed" Button Effect
When you click a button or card, it shouldn't just change color. It should physically depress into the background.

Use CSS styling for the `active:` state on your buttons:
```css
/* In global.css or generic class */
.btn-clay {
  @apply bg-[#222] shadow-[6px_6px_12px_#101010,-6px_-6px_12px_#343434] transition-all duration-200;
}
.btn-clay:active {
  @apply shadow-[inset_4px_4px_8px_#101010,inset_-4px_-4px_8px_#343434] scale-[0.98];
}
```

---

## Developer Checklist for Implementation

1.  **Clean House:** Delete `ParticleBackground.tsx`. It clashes with the clay aesthetic.
2.  **Color Reset:** Go into `tailwind.config.ts` (if customized) or `globals.css` and set the background to `#161616`.
3.  **Typography:** Ensure `Geist Sans` is applied. Increase `tracking-tight` on headings to make them feel solid.
4.  **Hardware:** Build the `GenevieveShowcase` component using the code above. This replaces the product image.
5.  **Grid:** Refactor the dashboard into the Bento Grid layout.
6.  **Wallet:** Customize the Reown button. If Reown allows custom triggers, wrap their hook in a `<button className="btn-clay">` to match your theme.

This plan moves you from "Generic SaaS" to "Boutique AI Hardware" branding.
