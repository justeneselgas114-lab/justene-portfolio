import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/site/theme-provider";
import { LoadingScreen } from "@/components/site/loading-screen";
import { AgentButton } from "@/components/ai-agent/agent-button";
import { env } from "@/lib/env";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Justene Selgas — Junior Full-Stack Developer & Claude AI Specialist",
    template: "%s · Justene Selgas",
  },
  description:
    "Junior Full-Stack Developer, n8n Integrations Specialist, and Claude AI Specialist based in Davao City, Philippines. Building Claude-powered AI agents, n8n automations, and modern full-stack apps with Next.js + React.",
  keywords: [
    "Claude Code",
    "AI Specialist",
    "n8n",
    "Automation",
    "GoHighLevel",
    "Make",
    "Web Developer",
    "React",
    "Next.js",
    "Davao City",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: "Justene Selgas",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg" suppressHydrationWarning>
        <ThemeProvider>
          <LoadingScreen />
          {children}
          <AgentButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
