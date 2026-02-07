import type { Metadata } from "next";
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
  title: "ClawBrick — The Future of Intelligence",
  description:
    "We're building the next generation of AI infrastructure. Secure, private, and incredibly powerful. Part of NetSepio.",
  keywords: ["AI", "infrastructure", "intelligence", "privacy", "future", "NetSepio", "ClawBrick"],
  authors: [{ name: "ClawBrick" }, { name: "NetSepio" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "ClawBrick — The Future of Intelligence",
    description: "AI infrastructure for the next generation. Secure, private, and incredibly powerful.",
    siteName: "ClawBrick",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawBrick — The Future of Intelligence",
    description: "AI infrastructure for the next generation. Secure, private, and incredibly powerful.",
    creator: "@clawbrick",
  },
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

