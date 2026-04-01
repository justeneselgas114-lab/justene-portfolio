import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justene | Claude Code AI Specialist & Automation Expert",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
