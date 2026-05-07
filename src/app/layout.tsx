import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/site/theme-provider";
import { LoadingScreen } from "@/components/site/loading-screen";
import { QuickFAQ } from "@/components/faq/quick-faq";
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: "Justene Selgas",
    title: "Justene Selgas — Junior Full-Stack Developer & Claude AI Specialist",
    description:
      "Junior Full-Stack Developer, n8n Integrations Specialist, and Claude AI Specialist based in Davao City, Philippines.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justene Selgas — Full-Stack Dev & Claude AI Specialist",
    description:
      "Building Claude-powered AI agents, n8n automations, and Next.js apps from Davao City.",
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
          <QuickFAQ />
        </ThemeProvider>
      </body>
    </html>
  );
}
