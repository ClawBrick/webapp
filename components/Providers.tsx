"use client";

import { ReactNode, useEffect, useState } from "react";
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { solana } from "@reown/appkit/networks";

// Initialize AppKit at module level (only on client side)
let appKitInitialized = false;

if (typeof window !== "undefined" && !appKitInitialized) {
  const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "";

  const metadata = {
    name: "ClawBrick",
    description: "The Future of Intelligence",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://clawbrick.xyz",
    icons: ["https://clawbrick.xyz/icon.png"],
  };

  const solanaAdapter = new SolanaAdapter({
    wallets: [],
  });

  createAppKit({
    adapters: [solanaAdapter],
    networks: [solana],
    projectId,
    defaultNetwork: solana,
    features: {
      email: false,
      socials: [],
    },
    themeMode: "dark",
    metadata,
  });

  appKitInitialized = true;
}

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration issues by only rendering children when mounted
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
