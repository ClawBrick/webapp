import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ClawBrick — Agentic as a Service",
    template: "%s | ClawBrick",
  },
  description:
    "Deploy your own AI agent in minutes. ClawBrick is the easiest and most secure way to run autonomous AI agents on dedicated cloud infrastructure — no technical skills required.",
  keywords: [
    "AI agent",
    "autonomous agent",
    "agentic AI",
    "AI infrastructure",
    "deploy AI",
    "OpenClaw",
    "ClawBrick",
    "Solana",
    "NetSepio",
  ],
  authors: [{ name: "ClawBrick", url: "https://clawbrick.com" }],
  creator: "ClawBrick",
  publisher: "ClawBrick",
  metadataBase: new URL("https://clawbrick.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    title: "ClawBrick — Agentic as a Service",
    description:
      "Deploy your own AI agent in minutes. Autonomous AI agents on dedicated cloud infrastructure.",
    siteName: "ClawBrick",
    url: "https://clawbrick.com",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 400,
        height: 400,
        alt: "ClawBrick Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ClawBrick — Agentic as a Service",
    description:
      "Deploy your own AI agent in minutes. Autonomous AI agents on dedicated cloud infrastructure.",
    creator: "@clawbrickhq",
    site: "@clawbrickhq",
    images: ["/logo.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Providers>
            <Navbar />
            <main className="relative z-10 flex-1">{children}</main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
