import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/site/theme-provider";
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

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Justene Selgas — AI Automation Specialist",
    template: "%s · Justene Selgas",
  },
  description:
    "Claude Code AI Specialist and Automation Expert based in Davao City, Philippines. Building intelligent workflows with n8n, GoHighLevel, and Make — and modern web experiences with React & Next.js.",
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
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
