# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Justene's portfolio with brown/beige editorial theme, Fraunces+Inter type, server-rendered sections, dedicated `/work/[slug]` routes, Server Action contact form, and lazy-loaded globe.

**Architecture:** Next.js 16 App Router. Server components by default; client leaves only where state/canvas is needed. Theme via CSS variables exposed to Tailwind 4 `@theme inline`. Project data in TS files; static work routes via `generateStaticParams`. Email via Resend Server Action.

**Tech Stack:** Next 16.2, React 19.2, Tailwind 4, framer-motion (Reveal+StatCounter only), next-themes, cobe, @radix-ui/react-dialog, @radix-ui/react-slot, lucide-react, react-icons, resend, zod, Fraunces+Inter (next/font/google).

**Reference docs:** Read these before touching code — Next 16 has breaking changes vs older training:
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` — `params`/`searchParams` are now `Promise<...>`
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`
- `node_modules/next/dist/docs/01-app/02-guides/forms.md`

**Spec:** `docs/superpowers/specs/2026-05-01-portfolio-rebuild-design.md`

**Testing strategy:** Per spec §18, manual smoke test at end of each task via `npm run dev`. No test framework added in this rebuild.

**Working approach:** Single branch (`master` per current state) with frequent commits, one per task. User chose big-bang approach (A) but tasks remain bite-sized so each commit is reviewable.

---

## File map (post-rebuild)

```
src/
├── app/
│   ├── layout.tsx                     [REWRITE]
│   ├── page.tsx                       [REWRITE — server]
│   ├── globals.css                    [REWRITE — new tokens]
│   ├── sitemap.ts                     [NEW]
│   ├── robots.ts                      [NEW]
│   ├── opengraph-image.tsx            [NEW]
│   ├── loading.tsx                    [NEW]
│   ├── error.tsx                      [NEW]
│   ├── not-found.tsx                  [NEW]
│   ├── actions/
│   │   └── contact.ts                 [NEW — "use server"]
│   └── work/
│       └── [slug]/
│           ├── page.tsx               [NEW]
│           ├── opengraph-image.tsx    [NEW]
│           └── not-found.tsx          [NEW]
├── components/
│   ├── site/
│   │   ├── header.tsx                 [NEW — replaces navbar.tsx]
│   │   ├── footer.tsx                 [REWRITE]
│   │   ├── theme-provider.tsx         [MOVE from src/components/]
│   │   └── theme-toggle.tsx           [NEW]
│   ├── sections/
│   │   ├── hero.tsx                   [REWRITE]
│   │   ├── about.tsx                  [REWRITE]
│   │   ├── skills.tsx                 [REWRITE]
│   │   ├── work-grid.tsx              [NEW — replaces automations.tsx + webprojects.tsx]
│   │   ├── work-filter.tsx            [NEW — client leaf]
│   │   ├── globe-section.tsx          [REWRITE — lazy + brown]
│   │   └── contact.tsx                [REWRITE]
│   ├── work/
│   │   ├── work-card.tsx              [NEW]
│   │   └── work-detail.tsx            [NEW]
│   ├── contact/
│   │   ├── contact-form.tsx           [NEW]
│   │   └── book-call-button.tsx       [NEW]
│   └── ui/
│       ├── button.tsx                 [NEW]
│       ├── chip.tsx                   [NEW]
│       ├── decor-circles.tsx          [NEW]
│       ├── reveal.tsx                 [NEW]
│       └── stat-counter.tsx           [NEW]
├── lib/
│   ├── data/
│   │   └── work.ts                    [NEW]
│   ├── env.ts                         [NEW]
│   └── utils.ts                       [KEEP]
└── ...

DELETE:
- src/components/navbar.tsx
- src/components/hero.tsx
- src/components/about.tsx
- src/components/skills.tsx
- src/components/automations.tsx
- src/components/webprojects.tsx
- src/components/contact.tsx
- src/components/footer.tsx
- src/components/globe.tsx
- src/components/cursor-effect.tsx
- src/components/animated-background.tsx
- src/components/glass-card.tsx
- src/components/typing-text.tsx
- src/components/theme-provider.tsx (after move)
```

---

## Task 1: Install dependencies + env scaffolding

**Files:**
- Modify: `package.json`
- Create: `src/lib/env.ts`
- Create: `.env.local.example`
- Modify: `.gitignore`

- [ ] **Step 1: Install new deps + remove unused**

Run:
```bash
npm install resend zod
npm uninstall @radix-ui/react-switch
```

Expected: `package.json` updated, `node_modules` synced, lockfile updated.

- [ ] **Step 2: Create env validator**

Create `src/lib/env.ts`:
```ts
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM: z.string().email().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

const parsed = envSchema.safeParse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
```

- [ ] **Step 3: Create env example file**

Create `.env.local.example`:
```
# Resend — required for contact form
# Sign up: https://resend.com
RESEND_API_KEY=re_xxx
# Verified sender (defaults to onboarding@resend.dev for testing)
RESEND_FROM=hello@yourdomain.com

# Site URL — used in sitemap + OG metadata
NEXT_PUBLIC_SITE_URL=https://justene.dev
```

- [ ] **Step 4: Verify .env.local in .gitignore**

Read `.gitignore`. If `.env*` line not present, add:
```
# env
.env
.env.local
.env*.local
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/lib/env.ts .env.local.example .gitignore
git commit -m "chore: add resend + zod, env validator scaffolding"
```

---

## Task 2: Theme tokens + fonts + globals.css

**Files:**
- Rewrite: `src/app/globals.css`
- Rewrite: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite globals.css with brown/beige tokens**

Overwrite `src/app/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #F5EFE6;
  --bg-elevated: #FAF6EE;
  --bg-muted: #EDE4D3;
  --fg: #2A1F14;
  --fg-muted: #6B5A47;
  --fg-subtle: #A89784;
  --accent: #8B5A2B;
  --accent-hover: #6F4520;
  --accent-soft: #C9A87C;
  --border: #E0D3BD;
  --ring: rgba(139, 90, 43, 0.2);
}

.dark {
  --bg: #1A1410;
  --bg-elevated: #241B14;
  --bg-muted: #2E2419;
  --fg: #F2E8D8;
  --fg-muted: #B8A48C;
  --fg-subtle: #7A6A55;
  --accent: #D4A574;
  --accent-hover: #E5BC8E;
  --accent-soft: #8B5A2B;
  --border: #3D2F22;
  --ring: rgba(212, 165, 116, 0.2);
}

@theme inline {
  --color-bg: var(--bg);
  --color-bg-elevated: var(--bg-elevated);
  --color-bg-muted: var(--bg-muted);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-fg-subtle: var(--fg-subtle);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-soft: var(--accent-soft);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --font-sans: var(--font-inter);
  --font-serif: var(--font-fraunces);
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans), system-ui, sans-serif;
  font-feature-settings: "ss01", "cv11";
}

html {
  scroll-behavior: smooth;
}

::selection {
  background: var(--accent);
  color: var(--bg);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-soft);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Rewrite layout.tsx with Fraunces + Inter**

Overwrite `src/app/layout.tsx`:
```tsx
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
```

- [ ] **Step 3: Move theme-provider into site/ directory**

Move `src/components/theme-provider.tsx` → `src/components/site/theme-provider.tsx`. Contents stay identical:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

Note: `defaultTheme` changed from `"dark"` to `"light"` — reference is light, dark is opt-in.

Run: `mkdir -p src/components/site && git mv src/components/theme-provider.tsx src/components/site/theme-provider.tsx` (if git mv supported on Windows; otherwise move + git add new + git rm old).

- [ ] **Step 4: Smoke test — start dev server**

Run: `npm run dev`

Expected: Site loads at `http://localhost:3000`. Old layout still visible (sections not yet rebuilt) but page background should now be beige `#F5EFE6` and text dark brown. Toggling theme in current navbar should still work, dark = `#1A1410`.

If page is white not beige: check that `globals.css` `body` rule applied. If page shows hydration error: `next-themes` migration — verify `defaultTheme="light"` matches html class on server. The `suppressHydrationWarning` on html and body should handle this.

Stop dev server (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/components/site/theme-provider.tsx src/components/theme-provider.tsx
git commit -m "feat(theme): brown/beige tokens, Fraunces+Inter fonts, light default"
```

---

## Task 3: UI primitives — Button, Chip, DecorCircles, Reveal, StatCounter

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/chip.tsx`
- Create: `src/components/ui/decor-circles.tsx`
- Create: `src/components/ui/reveal.tsx`
- Create: `src/components/ui/stat-counter.tsx`

- [ ] **Step 1: Button primitive (CVA + Slot)**

Create `src/components/ui/button.tsx`:
```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-sans font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-bg hover:bg-accent-hover shadow-sm",
        ghost: "text-fg hover:bg-bg-elevated",
        outline: "border border-border text-fg hover:bg-bg-elevated",
        link: "text-accent underline underline-offset-4 hover:text-accent-hover",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-7",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
```

- [ ] **Step 2: Chip primitive**

Create `src/components/ui/chip.tsx`:
```tsx
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "muted" | "accent";
}

export function Chip({ className, variant = "default", ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium",
        variant === "default" && "bg-bg-muted text-fg-muted",
        variant === "muted" && "bg-bg-elevated text-fg-subtle",
        variant === "accent" && "bg-accent-soft/30 text-accent",
        className
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 3: DecorCircles**

Create `src/components/ui/decor-circles.tsx`:
```tsx
import { cn } from "@/lib/utils";

export function DecorCircles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Top-right: terracotta outline ring + tan dot overlap */}
      <div className="absolute top-12 right-12 lg:right-24">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-[#A0522D]/60" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-soft" />
        </div>
      </div>

      {/* Mid-right: solid muted-tan dot */}
      <div className="absolute top-1/2 right-6 lg:right-16 w-4 h-4 rounded-full bg-accent-soft/70" />

      {/* Top-left: large soft cream circle */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-bg-elevated/60 blur-2xl" />

      {/* Bottom-left: small cream circle */}
      <div className="absolute bottom-12 left-8 w-12 h-12 rounded-full bg-bg-elevated/50 blur-md" />

      {/* Bottom-right: small accent dot */}
      <div className="absolute bottom-24 right-32 w-2 h-2 rounded-full bg-accent" />
    </div>
  );
}
```

- [ ] **Step 4: Reveal (entrance fade leaf)**

Create `src/components/ui/reveal.tsx`:
```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 5: StatCounter (count-up on inView)**

Create `src/components/ui/stat-counter.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export function StatCounter({ target, label, suffix = "+" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl lg:text-6xl text-accent font-light">
        {count}
        {suffix}
      </div>
      <p className="text-sm text-fg-subtle mt-1 font-sans">{label}</p>
    </div>
  );
}
```

- [ ] **Step 6: Smoke test**

Run: `npm run dev`. The site still uses old components — no visual change yet, but build should not error. If TypeScript complains about CVA types, verify `class-variance-authority` is installed (already in package.json).

Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): add Button, Chip, DecorCircles, Reveal, StatCounter primitives"
```

---

## Task 4: Migrate work data → lib/data/work.ts

**Files:**
- Create: `src/lib/data/work.ts`

- [ ] **Step 1: Read source data**

Read `src/components/automations.tsx` lines 9-154 — 9 project entries.
Read `src/components/webprojects.tsx` lines 9-75 — 3 project entries.

Map each to the new shape (drop `icon`, `color`; add `slug`, `year`).

- [ ] **Step 2: Create work.ts**

Create `src/lib/data/work.ts`:
```ts
export type WorkType = "automation" | "web";

export interface WorkDetail {
  slug: string;
  title: string;
  type: WorkType;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  year: number;
  liveUrl?: string;
  nodes?: number;
  problem: string;
  solution: string;
  results: string[];
  techStack: string[];
  role?: string;
  featured?: boolean;
}

export const work: WorkDetail[] = [
  {
    slug: "ai-receptionist",
    title: "AI Receptionist + Lead Qualification System",
    type: "automation",
    shortDescription:
      "24/7 automated lead handling — intake, AI scoring, smart routing, voice calls, and logging. Qualifies every lead in seconds.",
    thumbnail: "/ai-receptionist.png",
    images: ["/ai-receptionist.png"],
    tags: ["AI Agent", "Vapi", "Twilio", "Google Sheets"],
    year: 2025,
    nodes: 15,
    problem:
      "Business was losing leads due to slow manual qualification. Leads from multiple sources were piling up with no consistent scoring or follow-up system.",
    solution:
      "Built a fully automated AI receptionist that accepts leads via webhook, normalizes data, then scores leads 0-100 using Gemini 2.0 Flash. HOT leads (70+) get an instant AI voice call via Vapi + Google Calendar booking. WARM leads (40-69) receive SMS follow-up via Twilio. COLD leads enter a nurture sequence. Everything is logged to Google Sheets.",
    results: [
      "100% of leads qualified within seconds, 24/7",
      "Hot leads contacted via AI voice call instantly — no human delay",
      "Lead conversion rate increased by 45% with scoring-based routing",
    ],
    techStack: ["n8n", "Google Gemini 2.0 Flash", "Vapi AI Voice", "Twilio SMS", "Google Calendar", "Google Sheets", "Webhook"],
    featured: true,
  },
  {
    slug: "lead-researcher-sdr",
    title: "Autonomous Lead Researcher & SDR Agent",
    type: "automation",
    shortDescription:
      "AI agent that researches companies from a Google Sheet, finds decision makers, and suggests personalized outreach angles.",
    thumbnail: "/auto-lead-researcher.png",
    images: ["/auto-lead-researcher.png"],
    tags: ["AI Agent", "OpenAI", "SerpAPI", "Google Sheets"],
    year: 2025,
    nodes: 7,
    problem:
      "Sales reps spent 30+ minutes researching each prospect manually — searching Google for company info, finding decision makers on LinkedIn, and crafting personalized outreach messages.",
    solution:
      "Built an autonomous AI SDR agent that reads company names from a Google Sheet, then conducts 3-4 Google searches per company to find company overview, CEO/founder, marketing leaders, and LinkedIn profiles. The agent identifies the best decision maker based on company size and suggests a personalized outreach angle. Results are written back to the sheet automatically.",
    results: [
      "Research time reduced from 30 minutes to under 60 seconds per company",
      "Outreach personalization quality improved with AI-suggested angles",
      "Sales team can process 50+ companies per hour instead of 2",
    ],
    techStack: ["n8n", "OpenAI GPT-4", "SerpAPI", "Google Sheets", "AI Agent with Memory & Tools"],
  },
  {
    slug: "social-media-lead-capture",
    title: "Social Media Lead Capture System",
    type: "automation",
    shortDescription:
      "Captures buying intent from social media comments, auto-replies publicly, sends personalized DMs, and logs leads.",
    thumbnail: "/auto-social-lead.png",
    images: ["/auto-social-lead.png"],
    tags: ["Facebook API", "AI Agent", "Slack", "Webhook"],
    year: 2025,
    nodes: 11,
    problem:
      "Potential customers were commenting on social media posts with buying intent ('How much is this?', 'Where can I buy?') but the team was too slow to respond, losing leads to competitors.",
    solution:
      "Built a webhook-driven system that listens for Facebook/Instagram comments, runs each through an AI Intent Analyzer to detect buying signals, auto-replies publicly on the post, sends a personalized DM to the commenter, logs the lead to Google Sheets, and alerts the sales team via Slack. Connects to the AI Chatbot workflow for automated DM conversations.",
    results: [
      "Every comment with buying intent captured and responded to in under 30 seconds",
      "Lead capture from social media increased by 300%",
      "Sales team alerted instantly via Slack for high-intent leads",
    ],
    techStack: ["n8n", "OpenAI", "Facebook Graph API", "Google Sheets", "Slack", "Webhook"],
  },
  {
    slug: "ai-sales-followup",
    title: "AI Sales Follow-Up Engine",
    type: "automation",
    shortDescription:
      "AI-personalized 7-day email drip sequence that nurtures leads with value-driven content and tracks engagement.",
    thumbnail: "/auto-sales-followup.png",
    images: ["/auto-sales-followup.png"],
    tags: ["AI Agent", "Gmail", "Google Sheets", "Slack"],
    year: 2025,
    nodes: 16,
    problem:
      "Sales follow-ups were inconsistent — reps forgot to follow up, sent generic templates, and had no system to track which leads received which emails.",
    solution:
      "Built an AI-powered drip sequence engine triggered via webhook. When a qualified lead enters, the AI Email Personalizer crafts 4 personalized emails using the lead's name, company, interest, and context. Emails are sent over 7 days (Day 1: Thank You + Value Prop, Day 3: Helpful Guide, Day 5: Social Proof, Day 7: Final Offer) with automatic reply detection to stop the sequence when a lead responds.",
    results: [
      "Follow-up consistency went from 40% to 100% — no lead forgotten",
      "Email open rates increased by 35% with AI-personalized subject lines",
      "Pipeline velocity improved by 28% with structured nurture timing",
    ],
    techStack: ["n8n", "OpenAI", "Gmail OAuth2", "Google Sheets", "Slack", "Wait Nodes"],
  },
  {
    slug: "competitor-intel",
    title: "Competitor & Market Intelligence Automation",
    type: "automation",
    shortDescription:
      "Daily automated scan of competitor websites — AI analyzes changes and delivers structured intel reports via Slack and email.",
    thumbnail: "/auto-competitor-intel.png",
    images: ["/auto-competitor-intel.png"],
    tags: ["Schedule", "AI Agent", "Slack", "Gmail"],
    year: 2025,
    nodes: 12,
    problem:
      "Leadership had no systematic way to track competitor moves. Manual checks were sporadic, inconsistent, and time-consuming — the team was always reacting instead of anticipating.",
    solution:
      "Built a scheduled daily pipeline that runs at 9 AM. It fetches all defined competitor pages (main site, pricing, blog), strips HTML to clean text, compiles everything into a single analysis, then passes it to an AI Market Analyst agent. The agent produces a structured intelligence report that's formatted for Slack and email, and archived in Google Sheets for historical tracking.",
    results: [
      "Competitor intelligence delivered daily at 9 AM — zero manual effort",
      "Leadership spots pricing changes, new features, and positioning shifts within 24 hours",
      "Historical archive enables trend analysis across months of competitor data",
    ],
    techStack: ["n8n", "OpenAI", "HTTP Request", "Google Sheets", "Slack", "Gmail", "Cron Schedule"],
  },
  {
    slug: "ai-chatbot-sales",
    title: "AI Chatbot Sales Assistant",
    type: "automation",
    shortDescription:
      "24/7 multi-channel AI sales chatbot for website and social media that qualifies leads, collects contact info, and escalates to humans.",
    thumbnail: "/auto-chatbot-sales.png",
    images: ["/auto-chatbot-sales.png"],
    tags: ["AI Agent", "Webhook", "Slack", "Google Sheets"],
    year: 2025,
    nodes: 13,
    problem:
      "Website visitors and social media inquiries went unanswered outside business hours. When staff did respond, they spent too much time on repetitive questions instead of closing deals.",
    solution:
      "Built a multi-channel AI Sales Assistant that handles conversations from website chat widgets, Facebook Messenger, and Instagram. The bot remembers 15 messages of context per session, naturally collects name, email, and phone during conversation, and detects buying intent. When a lead is detected, it logs to Google Sheets and alerts sales via Slack. If the conversation needs a human, it triggers a Slack escalation.",
    results: [
      "24/7 sales coverage — no more missed after-hours inquiries",
      "65% of common questions handled without human intervention",
      "Lead capture rate from chat increased by 80% with natural info collection",
    ],
    techStack: ["n8n", "OpenAI", "Chat Memory", "Webhook", "Google Sheets", "Slack"],
  },
  {
    slug: "lead-qualification-crm",
    title: "AI Lead Qualification & Smart CRM Pipeline",
    type: "automation",
    shortDescription:
      "AI-powered lead scoring with smart routing — HOT leads get urgent alerts, WARM get follow-ups, COLD enter nurture queue.",
    thumbnail: "/auto-lead-qualification.png",
    images: ["/auto-lead-qualification.png"],
    tags: ["AI Agent", "HubSpot", "Slack", "Google Sheets"],
    year: 2025,
    nodes: 11,
    problem:
      "All leads were treated equally in the CRM — no scoring, no prioritization. Sales reps wasted time on cold leads while hot prospects went cold waiting for a response.",
    solution:
      "Built an AI Lead Qualifier that accepts leads from any source via webhook, normalizes the data, then uses an AI agent to score and classify each lead. Qualified leads are automatically upserted into HubSpot CRM with proper tags. Smart routing sends HOT leads to urgent Slack alerts + CRM, WARM leads to normal alerts + CRM, and COLD leads to CRM only (nurture queue). All leads are also logged to Google Sheets as backup.",
    results: [
      "Sales reps now focus 80% of their time on HOT leads instead of 30%",
      "Response time for high-value leads reduced from hours to minutes",
      "CRM data quality improved with consistent AI-driven categorization",
    ],
    techStack: ["n8n", "OpenAI", "HubSpot CRM", "Slack", "Google Sheets", "Webhook"],
  },
  {
    slug: "ai-call-followup",
    title: "AI Call Follow-Up & Scheduling System",
    type: "automation",
    shortDescription:
      "Automated outbound AI voice calls with smart retry logic, calendar sync, and email confirmations for every outcome.",
    thumbnail: "/auto-call-followup.png",
    images: ["/auto-call-followup.png"],
    tags: ["Vapi AI", "Google Calendar", "Gmail", "Schedule"],
    year: 2025,
    nodes: 18,
    problem:
      "Follow-up calls were falling through the cracks. Reps couldn't keep track of who to call, when to retry, and appointment confirmations were sent manually — leading to no-shows and lost deals.",
    solution:
      "Built a dual-flow system: Flow 1 runs every 10 minutes, scanning a Google Sheet for actionable leads (No Answer, Cancelled, Reschedule, Pending), deduplicates, and triggers Vapi AI voice calls. Flow 2 processes call results via webhook callback — confirmed appointments sync to Google Calendar with email confirmations to both the lead and admin. No-answer calls automatically schedule a retry for the next day at 10 AM.",
    results: [
      "Zero follow-up calls missed — every lead gets contacted",
      "No-show rate reduced by 40% with automated calendar sync + email confirmations",
      "Reps freed from manual dialing — AI handles 50+ calls per hour",
    ],
    techStack: ["n8n", "Vapi AI Voice", "Google Calendar", "Gmail", "Google Sheets", "Cron Schedule", "Webhook"],
  },
  {
    slug: "receipt-extractor",
    title: "Receipt Extractor AI Agent",
    type: "automation",
    shortDescription:
      "Upload a receipt image or PDF — AI extracts all structured data (date, vendor, items, amounts) and saves to Google Sheets.",
    thumbnail: "/auto-receipt-extractor.png",
    images: ["/auto-receipt-extractor.png"],
    tags: ["Gemini AI", "Google Sheets", "Webhook", "API"],
    year: 2025,
    nodes: 8,
    problem:
      "Manually entering receipt data into spreadsheets was tedious and error-prone. Staff spent hours each week typing in vendor names, amounts, dates, and line items from paper receipts and PDFs.",
    solution:
      "Built a Receipt Extractor AI Agent powered by Google Gemini 2.0 Flash. Users upload receipt images (JPG, PNG, WEBP) or PDFs via webhook. The AI extracts date, vendor, total amount, currency, category, payment method, and individual line items with confidence scores. Data is normalized (dates to YYYY-MM-DD, amounts to numeric, currency to ISO 4217), deduplicated, and saved to Google Sheets automatically.",
    results: [
      "Receipt processing time reduced from 5 minutes to 3 seconds per receipt",
      "Data accuracy improved to 95%+ with AI extraction vs 80% manual entry",
      "Complete audit trail with confidence scores and deduplication keys",
    ],
    techStack: ["n8n", "Google Gemini 2.0 Flash", "Google Sheets", "Webhook", "File Validation"],
  },
  {
    slug: "orquestra-ph",
    title: "OrquestraPH — AI Automation Agency",
    type: "web",
    shortDescription:
      "High-converting agency website for an AI automation company — pain-point storytelling, 6-step solution framework, and multi-step lead capture.",
    thumbnail: "/orquestra-hero.png",
    images: [
      "/orquestra-hero.png",
      "/orquestra-reality.png",
      "/orquestra-solution.png",
      "/orquestra-process.png",
      "/orquestra-testimonials.png",
      "/orquestra-audit.png",
      "/orquestra-cta.png",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    year: 2025,
    liveUrl: "https://orquestra-ph.vercel.app",
    role: "Designer + Developer",
    problem:
      "OrquestraPH needed a high-conversion landing page that established premium positioning and drove discovery call bookings — generic agency templates were not converting.",
    solution:
      "Designed and developed a conversion-focused website using a dark premium aesthetic with bold blue accents. Combined pain-point storytelling with clear solution framing: animated metrics showing lead response failures, a 6-step solution framework (Capture, Nurture, Qualify, Book, Close, Retarget), 4-step deployment process visualization, real testimonials, and a multi-step audit form for qualified lead capture.",
    results: [
      "Discovery call bookings increased by 200% vs the previous landing page",
      "Multi-step audit form captures 3x more qualified leads than a simple contact form",
      "Established OrquestraPH as a premium automation agency",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel", "Crisp Chat"],
    featured: true,
  },
  {
    slug: "allys-buffet",
    title: "Ally's Buffet & Grill",
    type: "web",
    shortDescription:
      "Premium buffet restaurant website with online table reservations, menu showcase, gallery, and event booking.",
    thumbnail: "/allys-buffet.png",
    images: [
      "/allys-buffet.png",
      "/allys-menu.png",
      "/allys-gallery.png",
      "/allys-events.png",
      "/allys-location.png",
      "/allys-reservation.png",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    year: 2025,
    liveUrl: "https://allys-buffet.vercel.app",
    role: "Designer + Developer",
    problem:
      "Ally's Buffet & Grill in Panabo City needed a premium online presence with an integrated reservation system to handle bookings and showcase the upscale dining experience.",
    solution:
      "Designed and built a premium restaurant website with an elegant dark theme and gold accents. Features online table reservation with time slot selection and guest counter, group reservation flow for events, full menu showcase across categories, a photo gallery, and Google Maps integration with parking and landmark info.",
    results: [
      "Site became the primary booking channel — 60% of all reservations now arrive online",
      "Walk-in traffic increased as gallery and menu pages attract new diners searching Panabo City",
      "Group event inquiries grew with the dedicated event booking flow",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Google Maps API"],
  },
  {
    slug: "napmi",
    title: "North American Pilates (NAPMI)",
    type: "web",
    shortDescription:
      "Institutional website for an international Pilates education and certification institute — standards framework, global instructor registry, and inquiry system.",
    thumbnail: "/napmi-hero.png",
    images: [
      "/napmi-hero.png",
      "/napmi-about.png",
      "/napmi-standards.png",
      "/napmi-contact.png",
      "/napmi-footer.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    year: 2025,
    liveUrl: "https://napmi-website.vercel.app",
    role: "Designer + Developer",
    problem:
      "NAPMI needed a credible institutional website that communicated academic authority and professional credibility for an international Pilates education and certification body.",
    solution:
      "Built a prestigious institutional website combining classical typography with a warm, earthy color palette. Includes a full-screen hero with certification pathway CTAs, institutional mission and methodology overview (Classical Pilates, STOTT, BASI), global instructor registry with interactive world map, standards & accreditation pathways (NPCP, PMA, STOTT), formal inquiry form, and WhatsApp support integration.",
    results: [
      "Inquiry submissions increased by 150% after launch",
      "Prospective instructors applied from California, Eastern Europe, Maldives, Singapore, and the Philippines",
      "Positioned NAPMI as a credible international authority in Pilates education",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Crisp Chat"],
  },
];

export const getWorkBySlug = (slug: string): WorkDetail | undefined =>
  work.find((w) => w.slug === slug);

export const getAllSlugs = (): string[] => work.map((w) => w.slug);

export const getWorkByType = (type?: WorkType): WorkDetail[] =>
  type ? work.filter((w) => w.type === type) : work;
```

- [ ] **Step 2: Smoke test — typecheck**

Run: `npx tsc --noEmit`

Expected: no errors. The new file is self-contained and only re-exports types.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data/work.ts
git commit -m "feat(data): migrate 12 projects to lib/data/work.ts with WorkDetail type"
```

---

## Task 5: Header (site nav) + ThemeToggle + Footer

**Files:**
- Create: `src/components/site/header.tsx`
- Create: `src/components/site/theme-toggle.tsx`
- Create: `src/components/site/footer.tsx`

- [ ] **Step 1: ThemeToggle leaf**

Create `src/components/site/theme-toggle.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      suppressHydrationWarning
    >
      {mounted ? (
        theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </Button>
  );
}
```

- [ ] **Step 2: Header (with mobile menu via Radix Dialog)**

Create `src/components/site/header.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

function smoothScroll(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: offset, behavior: "smooth" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-serif text-xl text-accent font-medium"
            >
              Justene<span className="text-fg">.</span>
            </Link>
            <a
              href="mailto:theconceptlogin@gmail.com"
              className="hidden md:inline text-sm text-fg-muted hover:text-accent transition-colors"
            >
              theconceptlogin@gmail.com
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => smoothScroll(link.href)}
                className="px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-lg transition-all"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex"
            >
              <a href="/cv-justene-selgas.pdf" download>
                <Download size={14} />
                Download CV
              </a>
            </Button>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg border-l border-border p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <div className="flex justify-end mb-6">
                    <Dialog.Close asChild>
                      <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X size={22} />
                      </Button>
                    </Dialog.Close>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => smoothScroll(link.href), 100);
                        }}
                        className="text-left px-4 py-3 text-base font-serif text-fg hover:bg-bg-elevated rounded-lg transition-all"
                      >
                        {link.name}
                      </button>
                    ))}
                    <a
                      href="/cv-justene-selgas.pdf"
                      download
                      className="mt-4 inline-flex items-center justify-center gap-2 h-11 px-6 bg-accent text-bg rounded-xl font-medium text-sm"
                    >
                      <Download size={16} />
                      Download CV
                    </a>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Footer**

Create `src/components/site/footer.tsx`:
```tsx
import { Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fg-muted font-sans">
            © {new Date().getFullYear()} Justene. Built with Claude Code.
          </p>
          <div className="flex items-center gap-2">
            <FooterLink href="https://www.linkedin.com/in/justene-selgas-152052377/" label="LinkedIn">
              <FaLinkedinIn size={16} />
            </FooterLink>
            <FooterLink href="https://www.facebook.com/Just10AiAutomation/" label="Facebook">
              <FaFacebookF size={16} />
            </FooterLink>
            <FooterLink href="mailto:theconceptlogin@gmail.com" label="Email">
              <Mail size={16} />
            </FooterLink>
            <FooterLink href="https://wa.me/639638296973" label="WhatsApp">
              <FaWhatsapp size={16} />
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      className="p-2 rounded-lg text-fg-subtle hover:text-accent hover:bg-bg-elevated transition-all"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Smoke test**

Run: `npm run dev`. Old layout still in use. New header/footer not yet wired. Verify build succeeds (no TS errors).

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/site/
git commit -m "feat(site): add Header (Radix Dialog mobile menu) + Footer + ThemeToggle"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Hero component**

Create `src/components/sections/hero.tsx`:
```tsx
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DecorCircles } from "@/components/ui/decor-circles";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] flex items-center pt-24 pb-12 overflow-hidden"
    >
      <DecorCircles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1.2fr)_1fr] gap-8 lg:gap-12 items-center">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <p className="font-serif italic text-4xl lg:text-5xl text-fg font-light leading-tight">
              Hi,
            </p>
            <h1 className="font-serif italic text-5xl lg:text-7xl font-light leading-tight mt-2">
              <span className="text-fg">I&apos;m </span>
              <span className="text-accent">Justene</span>
            </h1>
            <p className="font-sans text-lg lg:text-xl text-fg-muted mt-6">
              AI Specialist &amp; Automation Expert
            </p>
            <Button asChild size="lg" className="mt-8 group">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Hire Me
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* CENTER PHOTO */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              className="relative aspect-[4/5] w-full max-w-md"
              style={{
                maskImage:
                  "radial-gradient(ellipse at center, black 60%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 60%, transparent 95%)",
              }}
            >
              <Image
                src="/profile.png"
                alt="Justene Selgas"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-3 lg:order-3">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium">
              Expert on
            </p>
            <p className="font-serif text-2xl lg:text-3xl text-fg leading-snug mt-3">
              Based in Davao City, I build AI workflows and modern web experiences.
            </p>
            <p className="font-sans text-base text-fg-muted leading-relaxed mt-5 max-w-sm">
              Looking for someone to automate your business and grow faster? Let&apos;s build something together.
            </p>
            <a
              href="/cv-justene-selgas.pdf"
              download
              className="inline-flex items-center gap-2 mt-6 font-sans text-sm text-accent hover:text-accent-hover underline underline-offset-4"
            >
              Download CV
              <Download size={14} />
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="hidden lg:flex items-center justify-between mt-16 pt-6 border-t border-border">
          <a
            href="mailto:theconceptlogin@gmail.com"
            className="flex items-center gap-2 text-sm text-fg-muted hover:text-accent transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            theconceptlogin@gmail.com
          </a>
          <a
            href="https://wa.me/639638296973"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-fg-muted hover:text-accent transition-colors"
          >
            Let&apos;s Chat
            <FaWhatsapp size={16} className="text-green-600" />
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Smoke test**

To preview, temporarily wire it: edit `src/app/page.tsx` and add `import { Hero } from "@/components/sections/hero"` plus place `<Hero />` inside the existing markup, OR wait until Task 14 wires the full new page. For this task, just verify build:

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat(sections): hero with 3-col reference layout, full-bleed center photo"
```

---

## Task 7: About section + StatCounter wiring

**Files:**
- Create: `src/components/sections/about.tsx`

- [ ] **Step 1: About component**

Create `src/components/sections/about.tsx`:
```tsx
import { MapPin, Mail, Briefcase, User } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";

const infoItems = [
  { icon: User, label: "Name", value: "Justene Selgas" },
  { icon: MapPin, label: "Location", value: "Davao City, Philippines" },
  { icon: Mail, label: "Email", value: "theconceptlogin@gmail.com" },
  { icon: Briefcase, label: "Freelance", value: "Available" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
            Who I Am
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium">About Me</h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {infoItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-bg-elevated border border-border"
                >
                  <div className="p-2 rounded-lg bg-accent-soft/30">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-fg-subtle font-sans">{item.label}</p>
                    <p className="text-sm font-medium text-fg font-sans">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-sans text-base text-fg-muted leading-relaxed mb-4">
              I&apos;m Justene, a Claude Code AI Specialist and Automation Expert based in Davao City,
              Philippines. I build intelligent workflows with n8n, GoHighLevel, and Make — and craft
              modern web experiences powered by AI-first development using Claude Code.
            </p>
            <p className="font-sans text-base text-fg-muted leading-relaxed">
              From designing MCP server architectures to shipping production websites, I bridge the gap
              between automation and software engineering. I help businesses streamline their operations
              through smart automations while building pixel-perfect, high-performance web applications.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              <StatCounter target={15} label="Projects Completed" />
              <StatCounter target={30} label="Workflows Built" />
              <StatCounter target={20} label="Technologies" />
              <StatCounter target={10} label="Clients Served" />
            </div>

            <div className="mt-10 p-6 rounded-xl bg-bg-elevated border-l-4 border-accent">
              <h4 className="font-serif text-xl text-fg mb-3">What I Do Best</h4>
              <ul className="space-y-2 font-sans text-sm text-fg-muted">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  AI-powered development with Claude Code &amp; MCP Servers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Business automation with n8n, GHL &amp; Make
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Modern web development with React &amp; Next.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  End-to-end project delivery from design to deployment
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

Note: stat numbers (15/30/20/10) are placeholders from current site. Per spec §19 open item, user must verify. Leave as-is for now.

- [ ] **Step 2: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/about.tsx
git commit -m "feat(sections): about with stat counters + bio + 'what I do best' panel"
```

---

## Task 8: Skills section

**Files:**
- Create: `src/components/sections/skills.tsx`

- [ ] **Step 1: Skills component**

Create `src/components/sections/skills.tsx`:
```tsx
import {
  Bot, Workflow, Globe, Server, GitBranch, Palette,
  Zap, Database, Code2, Terminal, Layout, Cloud,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Chip } from "@/components/ui/chip";

const categories = [
  {
    title: "AI & Claude Code",
    icon: Bot,
    skills: ["Claude Code", "MCP Servers", "Claude Plugins", "Claude Skills", "Prompt Engineering"],
  },
  {
    title: "Automation",
    icon: Workflow,
    skills: ["n8n", "GoHighLevel", "Make (Integromat)", "Webhooks & APIs", "Zapier"],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & Data",
    icon: Server,
    skills: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Express.js"],
  },
  {
    title: "DevOps & Tools",
    icon: GitBranch,
    skills: ["Git & GitHub", "Vercel", "Docker", "VS Code", "npm / pnpm"],
  },
  {
    title: "Design",
    icon: Palette,
    skills: ["Figma", "Responsive Design", "UI/UX Principles", "Framer Motion", "Design Systems"],
  },
];

const tools = [
  { name: "Claude Code", icon: Bot },
  { name: "n8n", icon: Workflow },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Terminal },
  { name: "Tailwind", icon: Palette },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Vercel", icon: Cloud },
  { name: "Git", icon: GitBranch },
  { name: "GHL", icon: Zap },
  { name: "Make", icon: Zap },
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
            What I Use
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium">
            Skills &amp; Tech Stack
          </h2>
        </Reveal>

        {/* Tool strip */}
        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-16">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2 text-sm text-fg-muted hover:text-accent transition-colors cursor-default"
            >
              <tool.icon size={16} />
              <span className="font-sans">{tool.name}</span>
            </div>
          ))}
        </Reveal>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={0.1 + i * 0.05}>
              <div className="p-6 rounded-xl bg-bg-elevated hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <cat.icon size={22} className="text-accent" strokeWidth={1.5} />
                  <h3 className="font-serif text-xl text-fg font-medium">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <Chip key={skill} variant="default">
                      {skill}
                    </Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/skills.tsx
git commit -m "feat(sections): skills with tool strip + flat category cards"
```

---

## Task 9: WorkCard + WorkFilter + WorkGrid

**Files:**
- Create: `src/components/work/work-card.tsx`
- Create: `src/components/sections/work-filter.tsx`
- Create: `src/components/sections/work-grid.tsx`

- [ ] **Step 1: WorkCard**

Create `src/components/work/work-card.tsx`:
```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { WorkDetail } from "@/lib/data/work";

export function WorkCard({ work }: { work: WorkDetail }) {
  return (
    <Link
      href={`/work/${work.slug}`}
      prefetch
      className="group block"
    >
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-elevated mb-4">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Chip variant="accent">
          {work.type === "automation" ? "Automation" : "Web"}
        </Chip>
        {work.nodes && (
          <span className="text-xs text-fg-subtle font-sans">{work.nodes} nodes</span>
        )}
        {work.type === "web" && work.tags[0] && (
          <span className="text-xs text-fg-subtle font-sans">{work.tags[0]}</span>
        )}
      </div>
      <h3 className="font-serif text-xl text-fg font-medium leading-snug">
        {work.title}
      </h3>
      <p className="font-sans text-sm text-fg-muted mt-2 line-clamp-2">
        {work.shortDescription}
      </p>
      <span className="inline-flex items-center gap-1 mt-3 font-sans text-sm text-accent group-hover:text-accent-hover">
        Read case study
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: WorkFilter (client leaf, URL state)**

Create `src/components/sections/work-filter.tsx`:
```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All", value: undefined },
  { label: "Automation", value: "automation" },
  { label: "Web", value: "web" },
];

export function WorkFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const current = params.get("type") ?? undefined;

  function setFilter(value: string | undefined) {
    const next = new URLSearchParams(params);
    if (value) next.set("type", value);
    else next.delete("type");
    startTransition(() => {
      router.replace(`/?${next.toString()}#work`, { scroll: false });
    });
  }

  return (
    <div className="flex justify-center gap-2 mb-12" role="tablist">
      {filters.map((f) => {
        const active = current === f.value;
        return (
          <button
            key={f.label}
            role="tab"
            aria-selected={active}
            onClick={() => setFilter(f.value)}
            disabled={isPending}
            className={cn(
              "px-5 py-2 rounded-full font-sans text-sm font-medium transition-all",
              active
                ? "bg-accent text-bg"
                : "bg-bg-elevated text-fg-muted hover:bg-accent-soft/30 hover:text-fg"
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: WorkGrid (server, reads searchParams)**

Create `src/components/sections/work-grid.tsx`:
```tsx
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/work/work-card";
import { WorkFilter } from "./work-filter";
import { getWorkByType, type WorkType } from "@/lib/data/work";

interface WorkGridProps {
  type?: WorkType;
}

export function WorkGrid({ type }: WorkGridProps) {
  const items = getWorkByType(type);

  return (
    <section id="work" className="py-24 bg-bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
            Selected Work
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
            Featured Projects
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Automation systems and web applications I&apos;ve designed, built, and shipped.
          </p>
        </Reveal>

        <WorkFilter />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.05}>
              <WorkCard work={w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/work-card.tsx src/components/sections/work-filter.tsx src/components/sections/work-grid.tsx
git commit -m "feat(work): WorkCard + WorkFilter + WorkGrid (URL state, image-forward)"
```

---

## Task 10: WorkDetail component + /work/[slug] route

**Files:**
- Create: `src/components/work/work-detail.tsx`
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/app/work/[slug]/not-found.tsx`

- [ ] **Step 1: WorkDetail**

Create `src/components/work/work-detail.tsx`:
```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import type { WorkDetail as WorkDetailType } from "@/lib/data/work";

export function WorkDetail({ work, next }: { work: WorkDetailType; next?: WorkDetailType }) {
  return (
    <article className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-sans text-sm text-fg-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          All Work
        </Link>
      </div>

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Chip variant="accent" className="mb-4">
          {work.type === "automation" ? "Automation" : "Web"}
        </Chip>
        <h1 className="font-serif text-4xl lg:text-6xl text-fg font-medium leading-tight">
          {work.title}
        </h1>
        <p className="font-sans text-lg text-fg-muted mt-4 max-w-2xl">
          {work.shortDescription}
        </p>
      </header>

      <div className="relative aspect-[16/9] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-bg-elevated">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_2fr] gap-12 mb-24">
        {/* Sticky meta */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="space-y-6">
            <Meta label="Year" value={String(work.year)} />
            <Meta label="Type" value={work.type === "automation" ? "Automation" : "Web Development"} />
            {work.role && <Meta label="Role" value={work.role} />}
            {work.nodes && <Meta label="Nodes" value={String(work.nodes)} />}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {work.techStack.map((t) => (
                  <Chip key={t} variant="default">{t}</Chip>
                ))}
              </div>
            </div>
            {work.liveUrl && (
              <Button asChild>
                <a href={work.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Live Site
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            )}
          </div>
        </aside>

        {/* Prose */}
        <div className="space-y-12">
          <Block title="The Problem" body={work.problem} />
          <Block title="The Solution" body={work.solution} />
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">Results</h2>
            <ul className="space-y-3">
              {work.results.map((r) => (
                <li key={r} className="flex items-start gap-3 font-sans text-base text-fg-muted">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-1" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {work.images.length > 1 && (
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {work.images.slice(1).map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-elevated">
                    <Image
                      src={src}
                      alt={`${work.title} screenshot ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {next && (
        <div className="border-t border-border">
          <Link
            href={`/work/${next.slug}`}
            className="block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 group"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-2">Next Project</p>
            <h3 className="font-serif text-3xl lg:text-4xl text-fg font-medium group-hover:text-accent transition-colors flex items-center gap-3">
              {next.title}
              <ArrowUpRight size={28} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </h3>
          </Link>
        </div>
      )}
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-1">{label}</p>
      <p className="font-sans text-base text-fg">{value}</p>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">{title}</h2>
      <p className="font-sans text-base text-fg-muted leading-relaxed">{body}</p>
    </div>
  );
}
```

- [ ] **Step 2: Dynamic route page**

Create `src/app/work/[slug]/page.tsx`:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WorkDetail } from "@/components/work/work-detail";
import { getAllSlugs, getWorkBySlug, work } from "@/lib/data/work";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.title,
    description: item.shortDescription,
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      images: [item.thumbnail],
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  const idx = work.findIndex((w) => w.slug === slug);
  const next = work[(idx + 1) % work.length];

  return (
    <>
      <Header />
      <main>
        <WorkDetail work={item} next={next} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Per-route 404**

Create `src/app/work/[slug]/not-found.tsx`:
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WorkNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
        404
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
        Project not found
      </h1>
      <p className="font-sans text-base text-fg-muted mb-8 max-w-md">
        The case study you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Button asChild>
        <Link href="/#work">View all work</Link>
      </Button>
    </main>
  );
}
```

- [ ] **Step 4: Smoke test**

Run: `npm run build` and watch for `generateStaticParams` errors.

Expected: build succeeds, output includes `/work/[slug]` listed under Static Routes with all 12 slugs prerendered.

If build fails on `params` typing — Next 16 changed `params` to a `Promise`; the page already uses `await params`. Verify the type annotation matches.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/work-detail.tsx src/app/work/
git commit -m "feat(work): /work/[slug] dynamic route + WorkDetail layout + 404"
```

---

## Task 11: Globe section — lazy-load + brown theme

**Files:**
- Create: `src/components/sections/globe-section.tsx`

- [ ] **Step 1: Globe section with IntersectionObserver gate**

Create `src/components/sections/globe-section.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [14.5995, 120.9842], size: 0.06 }, // Manila
  { location: [7.1907, 125.4553], size: 0.05 }, // Davao
  { location: [19.076, 72.8777], size: 0.05 },
  { location: [23.8103, 90.4125], size: 0.03 },
  { location: [30.0444, 31.2357], size: 0.04 },
  { location: [39.9042, 116.4074], size: 0.06 },
  { location: [-23.5505, -46.6333], size: 0.05 },
  { location: [19.4326, -99.1332], size: 0.04 },
  { location: [40.7128, -74.006], size: 0.07 },
  { location: [34.6937, 135.5022], size: 0.04 },
  { location: [41.0082, 28.9784], size: 0.04 },
  { location: [51.5074, -0.1278], size: 0.06 },
  { location: [48.8566, 2.3522], size: 0.05 },
];

export function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const phiRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const rafRef = useRef<number>(0);
  const dragOffset = useMotionValue(0);
  const springOffset = useSpring(dragOffset, { mass: 1, stiffness: 280, damping: 40 });

  // Gate mount on viewport entry
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  const handleDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handleMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      dragOffset.set((e.clientX - startX.current) / 200);
    },
    [dragOffset]
  );

  const handleUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    phiRef.current += springOffset.get();
    dragOffset.set(0);
  }, [dragOffset, springOffset]);

  // Mount cobe only when shouldMount = true
  useEffect(() => {
    if (!shouldMount) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;
    const onResize = () => {
      width = canvas.offsetWidth;
      canvas.width = width * 2;
      canvas.height = width * 2;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const fadeTimeout = setTimeout(() => {
      canvas.style.opacity = "1";
    }, 100);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.0,
      mapSamples: 16000,
      mapBrightness: 1.6,
      mapBaseBrightness: 0.05,
      baseColor: [0.96, 0.94, 0.9],
      markerColor: [0.55, 0.35, 0.17],
      glowColor: [0.85, 0.8, 0.7],
      markers: MARKERS,
    });

    const animate = () => {
      if (!isDragging.current) phiRef.current += 0.005;
      globe.update({
        phi: phiRef.current + springOffset.get(),
        width: width * 2,
        height: width * 2,
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      globe.destroy();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      clearTimeout(fadeTimeout);
    };
  }, [shouldMount, springOffset]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-muted py-16 sm:py-20"
    >
      <Reveal className="text-center mb-8">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
          Global Reach
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-fg font-medium">
          Working Worldwide
        </h2>
      </Reveal>

      <div className="relative mx-auto w-[min(600px,90vw)] md:w-[700px] lg:w-[800px] aspect-square">
        {shouldMount && (
          <canvas
            ref={canvasRef}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
            onPointerLeave={handleUp}
            className="w-full h-full transition-opacity duration-1000"
            style={{
              opacity: 0,
              aspectRatio: "1",
              contain: "layout paint size",
              cursor: "grab",
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, var(--bg-muted) 75%)",
          }}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/globe-section.tsx
git commit -m "feat(sections): brown-themed globe with IntersectionObserver lazy mount"
```

---

## Task 12: Contact form — Server Action + ContactForm + BookCallButton

**Files:**
- Create: `src/app/actions/contact.ts`
- Create: `src/components/contact/contact-form.tsx`
- Create: `src/components/contact/book-call-button.tsx`
- Create: `src/components/sections/contact.tsx`

- [ ] **Step 1: Server Action**

Create `src/app/actions/contact.ts`:
```ts
"use server";

import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(200),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000),
  website: z.string().max(0), // honeypot — must be empty
});

export type ContactState =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    if (flat.fieldErrors.website) {
      // Honeypot triggered — return success to fool bots
      return { ok: true };
    }
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: flat.fieldErrors as Record<string, string[]>,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — contact form is in dry-run mode");
    return { ok: false, error: "Contact form is not yet configured. Please email directly." };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: "theconceptlogin@gmail.com",
      replyTo: parsed.data.email,
      subject: `Portfolio inquiry from ${parsed.data.name}`,
      text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
    });
    return { ok: true };
  } catch (err) {
    console.error("contact submit failed", err);
    return { ok: false, error: "Could not send message. Please email directly." };
  }
}
```

- [ ] **Step 2: ContactForm**

Create `src/components/contact/contact-form.tsx`:
```tsx
"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initial: ContactState | null = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-border bg-bg-elevated p-8 text-center">
        <CheckCircle2 size={36} className="mx-auto text-accent mb-3" />
        <h3 className="font-serif text-2xl text-fg font-medium mb-2">Thank you!</h3>
        <p className="font-sans text-base text-fg-muted">
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const errors = state?.ok === false ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-4">
      <Field
        label="Name"
        name="name"
        type="text"
        required
        error={errors.name?.[0]}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email?.[0]}
      />
      <Field
        label="Message"
        name="message"
        as="textarea"
        rows={5}
        required
        error={errors.message?.[0]}
      />
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />
      {state?.ok === false && state.error && !state.fieldErrors && (
        <p className="text-sm text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-300 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send Message"}
        <ArrowRight size={16} />
      </Button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  as?: "input" | "textarea";
}

function Field({ label, name, type = "text", rows, required, error, as = "input" }: FieldProps) {
  const Input = as === "textarea" ? "textarea" : "input";
  return (
    <label className="block">
      <span className="block font-sans text-sm font-medium text-fg mb-1.5">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </span>
      <Input
        name={name}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        required={required}
        className={cn(
          "w-full bg-bg-elevated border rounded-lg px-3 py-2.5 font-sans text-base text-fg placeholder-fg-subtle",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-accent",
          error ? "border-red-500" : "border-border"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}
```

- [ ] **Step 3: BookCallButton**

Create `src/components/contact/book-call-button.tsx`:
```tsx
"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export function BookCallButton() {
  function open() {
    const url = "https://calendly.com/justeneselgas2004/30min";
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    // First click — load script then open
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      window.Calendly?.initPopupWidget({ url });
    };
    document.body.appendChild(script);
  }

  return (
    <Button onClick={open} size="lg" className="w-full">
      <Calendar size={16} />
      Book a Call
    </Button>
  );
}
```

- [ ] **Step 4: Contact section**

Create `src/components/sections/contact.tsx`:
```tsx
import { Mail } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { BookCallButton } from "@/components/contact/book-call-button";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Have a project in mind? Send me a message or book a call directly.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-fg font-medium mb-3">
                Prefer to talk live?
              </h3>
              <p className="font-sans text-base text-fg-muted mb-5">
                Book a 30-minute discovery call. No pressure, no pitch — just a chat about your project.
              </p>
              <BookCallButton />
            </div>

            <div className="flex items-center gap-2 text-fg-subtle">
              <span className="h-px flex-1 bg-border" />
              <span className="font-sans text-xs uppercase tracking-[0.2em]">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-3">
                Direct contact
              </p>
              <ul className="space-y-3">
                <ContactRow href="mailto:theconceptlogin@gmail.com" icon={<Mail size={16} />}>
                  theconceptlogin@gmail.com
                </ContactRow>
                <ContactRow href="https://wa.me/639638296973" icon={<FaWhatsapp size={16} />}>
                  +63 963 829 6973 (WhatsApp)
                </ContactRow>
                <ContactRow
                  href="https://www.linkedin.com/in/justene-selgas-152052377/"
                  icon={<FaLinkedinIn size={16} />}
                >
                  LinkedIn
                </ContactRow>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        className="inline-flex items-center gap-3 font-sans text-base text-fg hover:text-accent transition-colors"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="text-accent">{icon}</span>
        {children}
      </a>
    </li>
  );
}
```

- [ ] **Step 5: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/actions/contact.ts src/components/contact/ src/components/sections/contact.tsx
git commit -m "feat(contact): Server Action via Resend + form + Calendly popup button"
```

---

## Task 13: SEO files — sitemap, robots, root OG image

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/work/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Sitemap**

Create `src/app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { work } from "@/lib/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...work.map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
```

- [ ] **Step 2: Robots**

Create `src/app/robots.ts`:
```ts
import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Root OG image**

Create `src/app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Justene Selgas — AI Automation Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5EFE6",
          color: "#2A1F14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <p style={{ fontSize: 24, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: 4 }}>
          Portfolio
        </p>
        <h1 style={{ fontSize: 96, lineHeight: 1.05, margin: "16px 0", fontWeight: 500 }}>
          Justene Selgas
        </h1>
        <p style={{ fontSize: 36, color: "#6B5A47", maxWidth: 900 }}>
          AI Automation Specialist · Davao City
        </p>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 4: Per-project OG image**

Create `src/app/work/[slug]/opengraph-image.tsx`:
```tsx
import { ImageResponse } from "next/og";
import { getWorkBySlug } from "@/lib/data/work";

export const runtime = "edge";
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function og({ params }: { params: { slug: string } }) {
  const item = getWorkBySlug(params.slug);
  const title = item?.title ?? "Project";
  const subtitle = item?.shortDescription ?? "";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5EFE6",
          color: "#2A1F14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <p style={{ fontSize: 22, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: 4 }}>
          {item?.type === "automation" ? "Automation" : "Web"} · Justene Selgas
        </p>
        <h1 style={{ fontSize: 64, lineHeight: 1.1, margin: "20px 0", fontWeight: 500, maxWidth: 1000 }}>
          {title}
        </h1>
        <p style={{ fontSize: 28, color: "#6B5A47", maxWidth: 1000, lineHeight: 1.3 }}>
          {subtitle}
        </p>
      </div>
    ),
    size
  );
}
```

Note: Next 16 OG image route handlers do not receive `params` as a Promise — they remain a synchronous prop. Confirm via the file convention reference above before deploying.

- [ ] **Step 5: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

Run: `npm run build`. Build should complete; sitemap and robots generate at build time.

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/opengraph-image.tsx src/app/work/[slug]/opengraph-image.tsx
git commit -m "feat(seo): sitemap + robots + OG images (root + per-project)"
```

---

## Task 14: Loading + error + 404 pages + next.config

**Files:**
- Create: `src/app/loading.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/not-found.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Loading skeleton**

Create `src/app/loading.tsx`:
```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent-soft border-t-accent animate-spin" />
        <p className="font-sans text-sm text-fg-subtle">Loading...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Error boundary**

Create `src/app/error.tsx`:
```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
        Something went wrong
      </p>
      <h1 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
        An error occurred
      </h1>
      <p className="font-sans text-base text-fg-muted mb-8 max-w-md">
        {error.message || "Please try again or refresh the page."}
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
```

- [ ] **Step 3: Site-wide 404**

Create `src/app/not-found.tsx`:
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
        404
      </p>
      <h1 className="font-serif text-5xl lg:text-7xl text-fg font-medium mb-4">
        Page not found
      </h1>
      <p className="font-sans text-base text-fg-muted mb-8 max-w-md">
        That page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </main>
  );
}
```

- [ ] **Step 4: next.config image formats**

Overwrite `next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 5: Smoke test**

Run: `npx tsc --noEmit` → expect no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/loading.tsx src/app/error.tsx src/app/not-found.tsx next.config.ts
git commit -m "feat(routing): loading/error/404 pages + AVIF/WebP image formats"
```

---

## Task 15: Wire new homepage + delete legacy components

**Files:**
- Rewrite: `src/app/page.tsx`
- Delete: 12 legacy component files
- Modify: `src/components/theme-provider.tsx` (remove if move-style copy left it)

- [ ] **Step 1: Rewrite page.tsx as server component**

Overwrite `src/app/page.tsx`:
```tsx
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { WorkGrid } from "@/components/sections/work-grid";
import { GlobeSection } from "@/components/sections/globe-section";
import { Contact } from "@/components/sections/contact";
import type { WorkType } from "@/lib/data/work";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const validType: WorkType | undefined =
    type === "automation" || type === "web" ? type : undefined;

  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <WorkGrid type={validType} />
        <GlobeSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

Note: `searchParams` is a Promise in Next 16 — must be awaited.

- [ ] **Step 2: Delete legacy components**

Run:
```bash
rm src/components/navbar.tsx
rm src/components/hero.tsx
rm src/components/about.tsx
rm src/components/skills.tsx
rm src/components/automations.tsx
rm src/components/webprojects.tsx
rm src/components/contact.tsx
rm src/components/footer.tsx
rm src/components/globe.tsx
rm src/components/cursor-effect.tsx
rm src/components/animated-background.tsx
rm src/components/glass-card.tsx
rm src/components/typing-text.tsx
```

If `src/components/theme-provider.tsx` still exists at root after the Task 2 move, delete it too:
```bash
rm src/components/theme-provider.tsx
```

- [ ] **Step 3: Smoke test — full build**

Run: `npm run build`

Expected output: `Route (app)` listing including `/`, `/work/[slug]`, `/sitemap.xml`, `/robots.txt`, OG image endpoints. Build succeeds.

If build fails on missing imports — search for any stale references:
```bash
git grep -nE "from \"@/components/(navbar|hero|about|skills|automations|webprojects|contact|footer|globe|cursor-effect|animated-background|glass-card|typing-text|theme-provider)\""
```
Fix any matches.

- [ ] **Step 4: Smoke test — dev server**

Run: `npm run dev`. Navigate to:
- `/` — verify all sections render: hero (3-col with photo), about, skills, work grid (12 cards), globe, contact
- `/?type=automation` — work grid filters to 9 items
- `/?type=web` — work grid filters to 3 items
- `/work/orquestra-ph` — case study renders
- `/work/does-not-exist` — 404 page renders
- Theme toggle — light ⇄ dark, brown adapts
- Mobile (375px) — header hamburger opens menu, hero stacks vertical, sections readable

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git rm src/components/navbar.tsx src/components/hero.tsx src/components/about.tsx src/components/skills.tsx src/components/automations.tsx src/components/webprojects.tsx src/components/contact.tsx src/components/footer.tsx src/components/globe.tsx src/components/cursor-effect.tsx src/components/animated-background.tsx src/components/glass-card.tsx src/components/typing-text.tsx
# also rm theme-provider.tsx at root if still present
git commit -m "feat(home): wire new page.tsx as server component, delete 13 legacy components"
```

---

## Task 16: Final verification + Lighthouse + cleanup

**Files:** none (verification + minor cleanup only)

- [ ] **Step 1: Run lint + typecheck**

```bash
npm run lint
npx tsc --noEmit
```

Expected: zero errors. Fix any reported issues inline before continuing.

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: succeeds with all 12 `/work/[slug]` routes prerendered statically.

- [ ] **Step 3: Production server smoke**

```bash
npm run start
```

Open `http://localhost:3000`. Walk through every section. Test:
- Hero CTA "Hire Me" scrolls to contact
- All work cards click → navigate to `/work/[slug]` correctly
- Per-project page back link returns to home anchor `#work`
- Filter pills update URL `?type=` and grid reflects choice
- Theme toggle persists across navigation
- Mobile menu opens/closes, links scroll correctly
- Contact form: submit empty → shows validation; submit valid (without Resend key) → shows "Contact form is not yet configured" message
- Calendly button → loads + opens popup
- Globe canvas only mounts after scroll into view (verify via DevTools Performance tab)

Stop server.

- [ ] **Step 4: Lighthouse audit**

In Chrome DevTools, run Lighthouse on `http://localhost:3000` (or after `npm run start`) for Mobile + Performance + Accessibility + Best Practices + SEO.

Expected: all scores ≥ 90. Spec acceptance criterion §21.

If any score < 90, log specific items in a TODO comment in `docs/superpowers/specs/2026-05-01-portfolio-rebuild-design.md` Section 19 and address in a follow-up commit.

- [ ] **Step 5: Verify dependency cleanup**

Run:
```bash
npm ls @radix-ui/react-switch
```
Expected: empty (uninstalled in Task 1). If still present, `npm uninstall @radix-ui/react-switch` again.

Check for unused deps (manual):
```bash
git grep -l "from \"@radix-ui/react-slot\"" src/
git grep -l "from \"@radix-ui/react-dialog\"" src/
git grep -l "from \"cobe\"" src/
git grep -l "from \"framer-motion\"" src/
git grep -l "from \"next-themes\"" src/
```
Each should match at least one file. Otherwise consider removing the dep.

- [ ] **Step 6: Final commit (if any cleanup happened)**

If lint or cleanup produced changes:
```bash
git add -A
git commit -m "chore: post-rebuild cleanup + lint fixes"
```

- [ ] **Step 7: Push**

```bash
git push origin master
```

---

## Open items requiring user input (from spec §19)

These are **not blocking** the rebuild but should be addressed before final deploy:

1. **Stat numbers** — verify "15 / 30 / 20 / 10" or replace in `src/components/sections/about.tsx`.
2. **Resend setup** — sign up, add `RESEND_API_KEY` to Vercel env, verify sending domain. Without it, contact form returns "not yet configured" message but UI still works.
3. **Project years** — currently all set to `2025` in `src/lib/data/work.ts`. Confirm or adjust per project.
4. **OG image fonts** — currently uses default sans. To use Fraunces, add font loading in OG route per `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md`.
5. **Image conversion** — `/public/*.png` are still PNG. AVIF/WebP requested by `next.config.ts` will be generated on-the-fly by `next/image`, but original payload size unchanged. Optional: pre-convert with `sharp` in a build script.

---

## Self-review notes

**Spec coverage check:** All sections of the design spec are covered:
- §4 theme tokens → Task 2
- §5 typography → Task 2
- §6 decorative → Task 3 (DecorCircles) + Task 15 (deletion of cursor-effect, animated-background)
- §7 architecture → Tasks 5, 9, 10, 14, 15
- §8 section specs → Tasks 5–12
- §9 data model → Task 4
- §10 server action → Task 12
- §11 Calendly modal → Task 12
- §12 image strategy → Task 14 (next.config) + open item §19.5
- §13 loading/error/404 → Task 14
- §14 deletes → Task 15
- §15 rewrites → Tasks 2, 5, 7, 8, 11, 12, 15
- §16 adds → all of tasks 3–14
- §17 deps → Task 1
- §21 acceptance → Task 16

**Type consistency:** `WorkDetail`, `WorkType`, `getWorkBySlug`, `getAllSlugs`, `getWorkByType` defined in Task 4 and consistently referenced in Tasks 9, 10, 13, 15.

**Placeholder scan:** No "TBD", "implement later", or "similar to Task N" patterns. All code blocks complete.

---

## Execution

Plan complete and saved to `docs/superpowers/plans/2026-05-01-portfolio-rebuild.md`.
