# Portfolio Rebuild — Design Spec

**Date:** 2026-05-01
**Project:** justene-portfolio
**Owner:** Justene Selgas
**Type:** Major rebuild (full redesign — layout + theme + architecture)

---

## 1. Goal

Replace current blue/indigo dark-default portfolio with a warm brown + beige editorial design inspired by the Tazrin reference. Outcome: aesthetic, simple, informative. Each project becomes a deep-linkable case study. Site loads faster, supports both light and dark modes, and replaces the always-loaded Calendly iframe with a click-to-open modal alongside a real contact form.

## 2. Non-goals

- No CMS migration (data stays in TypeScript files).
- No blog, `/uses`, or `/now` pages — out of scope for this rebuild.
- No analytics integration (separate task if needed).
- No language i18n.
- No backend rewrite — Server Actions only, no separate API service.

## 3. Decisions log

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Light default + brown-adapted dark variant (theme toggle stays) | Reference is light; user wanted both. |
| 2 | Keep all 8 current section topics (Hero, About, Skills, Work, Globe, Contact, Footer + Header) | User selected option 1 in Q2. |
| 3 | 3-column hero matching reference layout (text \| big center photo \| tagline + CV) | User selected option 1 in Q3. |
| 4 | Typography: Fraunces (serif, variable, SOFT axis) + Inter (sans body) | Warm serif fits earthy palette; Inter readable + already loaded. |
| 5 | Drop heavy decorative motion. Keep entrance fades + static accent circles | User selected option 3 in Q5; matches reference simplicity. |
| 6 | Borderless image-forward project cards (gallery feel) | User selected option 3 in Q6. |
| 7 | Dedicated `/work/[slug]` routes per project (no modal popups) | User selected option 2 in Q7; SEO + shareable URLs. |
| 8 | Contact form (Resend) + Calendly modal (click-to-load) | User selected option 4 in Q8. |
| 9 | TypeScript data files in `lib/data/work.ts` | User selected option 1 in Q9; type-safe, no MDX overhead. |
| 10 | Keep cobe globe, retheme brown, lazy-load on scroll into view | User selected option 1 in Q10. |
| 11 | Big-bang rebuild approach (single PR, single coherent diff) | User selected approach A. |

## 4. Theme tokens

Defined as CSS custom properties in `globals.css`, exposed to Tailwind 4 via `@theme inline`.

### 4.1 Light mode (default)

```css
:root {
  --bg:            #F5EFE6;  /* warm beige page bg */
  --bg-elevated:   #FAF6EE;  /* cards, slight lift */
  --bg-muted:      #EDE4D3;  /* alt section bands */
  --fg:            #2A1F14;  /* near-black brown body text */
  --fg-muted:      #6B5A47;  /* secondary copy */
  --fg-subtle:     #A89784;  /* labels, captions */
  --accent:        #8B5A2B;  /* primary brown — CTAs, links */
  --accent-hover:  #6F4520;
  --accent-soft:   #C9A87C;  /* tan — chips, badges */
  --border:        #E0D3BD;  /* warm hairline */
  --ring:          #8B5A2B33;
}
```

### 4.2 Dark mode

```css
.dark {
  --bg:            #1A1410;
  --bg-elevated:   #241B14;
  --bg-muted:      #2E2419;
  --fg:            #F2E8D8;  /* warm cream text */
  --fg-muted:      #B8A48C;
  --fg-subtle:     #7A6A55;
  --accent:        #D4A574;  /* tan accent on dark */
  --accent-hover:  #E5BC8E;
  --accent-soft:   #8B5A2B;
  --border:        #3D2F22;
  --ring:          #D4A57433;
}
```

### 4.3 Tailwind theme bridge

```css
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
  --font-serif: var(--font-fraunces);
  --font-sans: var(--font-inter);
}
```

## 5. Typography system

| Role | Font | Size | Weight | Style |
|------|------|------|--------|-------|
| Display (hero name) | Fraunces | `text-7xl` | 300 (light), SOFT 100 | normal |
| Greeting italic | Fraunces | `text-5xl` | 300 | italic |
| Section heading | Fraunces | `text-4xl` | 500 | normal |
| Card title | Fraunces | `text-xl` | 500 | normal |
| Stat numeral | Fraunces | `text-6xl` | 400 | normal, accent color |
| Eyebrow | Inter | `text-xs` | 500 | uppercase, `tracking-[0.2em]`, accent |
| Body | Inter | `text-base` | 400 | `leading-relaxed`, fg-muted |
| Small label | Inter | `text-sm` | 400 | fg-subtle |
| Button | Inter | `text-sm` | 500 | normal |

Font loading via `next/font/google` in `layout.tsx`. Both wired as CSS variables. Fraunces with axes `opsz`, `SOFT`, `wght`.

## 6. Decorative system

Replace `animated-background.tsx` with static `<DecorCircles />` component:

- Top-right of hero: 60px outline ring (terracotta `#A0522D`) + 12px filled tan dot overlap.
- Mid-right of hero: 16px solid muted-tan dot.
- Top-left + bottom-left of hero: large soft cream circles (radius 80px, `opacity: 0.5`, blur 20px).
- All `position: absolute`, `pointer-events: none`, no animation.
- Section-specific accents may add 1-2 small circles to break empty space.

Delete `cursor-effect.tsx` entirely.

## 7. Architecture

### 7.1 File tree (post-rebuild)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                          # server
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── actions/
│   │   └── contact.ts                    # "use server" — Resend submit
│   └── work/
│       └── [slug]/
│           ├── page.tsx                  # server, generateStaticParams
│           ├── opengraph-image.tsx
│           └── not-found.tsx
├── components/
│   ├── site/
│   │   ├── header.tsx                    # client (mobile menu)
│   │   ├── footer.tsx                    # server
│   │   ├── theme-toggle.tsx              # client leaf
│   │   └── theme-provider.tsx            # client (next-themes wrapper)
│   ├── sections/
│   │   ├── hero.tsx                      # server shell + client leaves
│   │   ├── about.tsx                     # server shell + Reveal leaves
│   │   ├── skills.tsx
│   │   ├── work-grid.tsx                 # server shell + client filter
│   │   ├── work-filter.tsx               # client leaf — URL state
│   │   ├── globe-section.tsx             # client (cobe)
│   │   └── contact.tsx                   # client wrapper
│   ├── work/
│   │   ├── work-card.tsx                 # server
│   │   └── work-detail.tsx               # server
│   ├── contact/
│   │   ├── contact-form.tsx              # client (useActionState)
│   │   └── book-call-button.tsx          # client (Calendly popup)
│   └── ui/
│       ├── button.tsx                    # CVA — primary/ghost/link
│       ├── chip.tsx
│       ├── decor-circles.tsx
│       ├── reveal.tsx                    # framer-motion entrance leaf
│       └── stat-counter.tsx              # client leaf
├── lib/
│   ├── data/
│   │   └── work.ts
│   ├── env.ts                            # zod-validated env
│   └── utils.ts
└── content/                              # (unused, no MDX per Q9)
```

### 7.2 Server / client boundary

- Default = server component.
- Client leaves only where required: `Reveal` (framer-motion), `Header` (state), `ThemeToggle`, `ThemeProvider`, `GlobeSection` (canvas), `ContactForm` (useActionState), `BookCallButton` (Calendly), `StatCounter` (IntersectionObserver count-up), `WorkFilter` (URL search params).
- All sections are server components that render server children + client leaves where needed. No top-level `"use client"` on `page.tsx` or section files.

### 7.3 Routes

| Route | Purpose | Render |
|-------|---------|--------|
| `/` | Home | Server, static |
| `/work/[slug]` | Project detail | Server, static via `generateStaticParams` |
| `/sitemap.xml` | SEO discovery | Generated from `work.ts` + static routes |
| `/robots.txt` | Crawler hints | Static, references sitemap |

### 7.4 Metadata

- `app/layout.tsx`: site-level metadata (title template, description, Open Graph defaults, Twitter card type, theme color brown).
- `app/page.tsx`: home metadata override.
- `app/work/[slug]/page.tsx`: `generateMetadata({ params })` returns per-project title + description + OG image referencing thumbnail.
- `app/opengraph-image.tsx`: ImageResponse with Fraunces, brown bg, name + role.
- `app/work/[slug]/opengraph-image.tsx`: per-project ImageResponse with project thumbnail composited.

## 8. Section specs

### 8.1 Header (`components/site/header.tsx`)

- Sticky top, transparent on initial paint, on `scrollY > 50` add `bg-bg/80 backdrop-blur-xl border-b border-border`.
- Left: brand "Justene." in Fraunces accent + small icon dot.
- Center-left: email `theconceptlogin@gmail.com` (clickable mailto, hidden below md).
- Right: nav links (md+), theme toggle, hamburger (below md).
- Mobile menu: built on Radix Dialog (a11y: focus trap, Esc handler, body scroll lock for free) — full-screen overlay with stacked nav items, Fraunces section heads, fade-in backdrop.

### 8.2 Hero (`components/sections/hero.tsx`)

- Container `max-w-7xl mx-auto px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex items-center`.
- Grid: `grid-cols-1 lg:grid-cols-[1fr_minmax(0,1.2fr)_1fr] gap-8 lg:gap-12 items-center`.
- **Left column:**
  - "Hi," — Fraunces italic, `text-4xl lg:text-5xl`, fg.
  - "I'm " (italic, fg) + "Justene" (italic, accent) — Fraunces italic, `text-5xl lg:text-7xl`.
  - Role label "AI Specialist & Automation Expert" — Inter, `text-xl text-fg-muted` mt-4.
  - "Hire Me →" button — Inter, `bg-accent text-bg`, rounded-xl, h-12 px-6, hover `bg-accent-hover`. Arrow translates +4px on hover.
- **Center column:**
  - `<div class="relative aspect-[4/5] w-full max-w-md mx-auto">` containing `<Image src="/profile.png" fill priority object-cover object-top>`.
  - Radial mask gradient blending edges into bg: `mask-image: radial-gradient(ellipse at center, black 60%, transparent 95%)`.
  - No border, no circle, no decorative ring around image.
- **Right column:**
  - Eyebrow "Expert on" — accent, uppercase, tracked.
  - Tagline "Based in Davao City, I build AI workflows and modern web experiences." — Fraunces, `text-2xl lg:text-3xl`, fg, `leading-snug`.
  - Body paragraph (~30 words) — Inter, `text-fg-muted`, max-w-sm.
  - "Download CV ↓" — Inter, accent, underlined, `href="/cv-justene-selgas.pdf" download`.
- **Decorative circles** absolutely positioned at corners (see §6).
- **Bottom strip** (within hero, `mt-auto`):
  - Left: small accent dot + email link.
  - Right: "Let's Chat" + WhatsApp icon → opens `wa.me/639638296973`.
- **Mobile stack order:** text → photo → tagline+CV → bottom strip.

### 8.3 About (`components/sections/about.tsx`)

- Two-col grid `lg:grid-cols-2 gap-12`.
- Eyebrow "Who I Am" + heading "About Me" centered above grid.
- **Left:** info tiles 2x2 (Name, Location, Email, Freelance) — `bg-bg-elevated border border-border` no shadow + bio paragraph below.
- **Right:** stats 2x2. Each tile = Fraunces numeral `text-6xl text-accent` + Inter label. Numbers use `<StatCounter>` client leaf with IntersectionObserver-triggered count-up.
- Below stats: "What I Do Best" panel — `bg-bg-muted` + accent left-border + Fraunces heading + sans bullets with brown markers.
- **Stat numbers must be verified by user** before shipping. If unverified, use honest counts.

### 8.4 Skills (`components/sections/skills.tsx`)

- Eyebrow + heading.
- **Tool strip:** flex-wrap row of icon+name pairs, no border, hover accent. 12 items.
- **Category cards:** 6 cards in `grid lg:grid-cols-3 md:grid-cols-2`. Each:
  - `bg-bg-elevated rounded-xl p-6` no border, no shadow, hover translate-y -2px.
  - Single brown stroke icon (no gradient pill).
  - Fraunces title.
  - Skill chips below — flat `bg-bg-muted text-fg rounded-md px-2 py-1 text-xs`.

### 8.5 Work grid (`components/sections/work-grid.tsx`)

- Eyebrow "Selected Work" + heading.
- `<WorkFilter>` client leaf — three pills (`All`, `Automation`, `Web`), URL state via `?type=`. Server reads searchParams to filter list.
- Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12`.
- **`<WorkCard>`** — borderless, image-forward:
  - `<Link href="/work/${slug}" prefetch>`
  - Image: `aspect-[4/3] rounded-lg overflow-hidden`, `object-cover object-top`, hover `scale-[1.02]`.
  - Below image (transparent, no card bg):
    - Meta row: type badge (`bg-bg-muted` chip) + nodes/tag.
    - Title — Fraunces `text-xl`.
    - 2-line description — Inter muted.
    - "Read case study →" — accent link.

### 8.6 Globe section (`components/sections/globe-section.tsx`)

- `bg-bg-muted` band.
- Eyebrow "Global Reach" + heading "Working Worldwide".
- Cobe canvas with `IntersectionObserver` gating mount + RAF.
- Theme: `baseColor [0.96, 0.94, 0.90]`, `markerColor [0.55, 0.35, 0.17]`, `glowColor [0.85, 0.80, 0.70]`.
- 12 city markers preserved.
- Drag interaction preserved.

### 8.7 Contact (`components/sections/contact.tsx`)

Two-col `lg:grid-cols-2 gap-12`:

- **Left (form):**
  - Eyebrow + heading + intro paragraph.
  - `<ContactForm>` — name, email, message + hidden honeypot, Submit button.
- **Right (alt channels):**
  - "Prefer to talk live?" heading.
  - `<BookCallButton>` opens Calendly popup.
  - Divider "or".
  - Direct contact list — email, WhatsApp, LinkedIn with icons.

### 8.8 Footer (`components/site/footer.tsx`)

- Single row desktop, stacked mobile.
- Left: copyright + "Built with Claude Code".
- Right: social icon row (LinkedIn, Facebook, Email, WhatsApp) — accent on hover.

## 9. Data model

### 9.1 Types (`src/lib/data/work.ts`)

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

export const work: WorkDetail[] = [ /* 12 entries */ ];

export const getWorkBySlug = (slug: string): WorkDetail | undefined =>
  work.find((w) => w.slug === slug);

export const getAllSlugs = (): string[] => work.map((w) => w.slug);

export const getWorkByType = (type?: WorkType): WorkDetail[] =>
  type ? work.filter((w) => w.type === type) : work;
```

### 9.2 Migration

- Source 1: 9 entries from `src/components/automations.tsx` `projects` array.
- Source 2: 3 entries from `src/components/webprojects.tsx` `projects` array.
- Slug rules: kebab-case from title, strip suffixes (e.g., "OrquestraPH - AI Automation Agency" → `orquestra-ph`).
- Drop fields: `icon` (replaced by category badge), `color` (single brown theme), `details` wrapper (flatten into top-level).
- Add fields: `slug`, `year` (estimated; user to confirm).
- `thumbnail` = first entry of current `images` (web) or `image` (automation).
- `liveUrl` only on web entries.
- `nodes` only on automation entries.

## 10. Server Action — contact submit

`src/app/actions/contact.ts`:

```ts
"use server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().trim().min(20).max(2000),
  website: z.string().max(0), // honeypot — must be empty
});

export type ContactState =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string>,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "portfolio@resend.dev",
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

### 10.1 Required env vars

- `RESEND_API_KEY` — required, secret.
- `RESEND_FROM` — optional, defaults to `portfolio@resend.dev` (fallback).

User must:
1. Sign up at resend.com (free tier 3000/mo, 100/day).
2. Verify a sending domain (or use default for testing).
3. Add `RESEND_API_KEY` to `.env.local` and Vercel project env.

### 10.2 Env validation

`src/lib/env.ts` — zod-parses `process.env` at import time, throws on missing required keys at startup, surfaces clear error in dev.

## 11. Calendly modal

`<BookCallButton>`:

- Lazy-loads Calendly widget script on first click.
- Calls `window.Calendly.initPopupWidget({ url })` to open overlay popup.
- Removes always-loaded 700px iframe → page weight reduced.

## 12. Image strategy

- Convert all `/public/*.png` to AVIF + WebP equivalents at build time (consider `sharp` script or manual conversion).
- `next.config.ts` enables `images.formats = ["image/avif", "image/webp"]`.
- All `<Image>` use `priority` only on hero; others lazy by default.
- Per-project OG images generated dynamically via `opengraph-image.tsx`.

## 13. Loading + error states

- `app/loading.tsx` — beige skeleton with subtle shimmer.
- `app/error.tsx` — friendly error + brown "Try again" button.
- `app/not-found.tsx` — 404 + "Back home" link.
- `app/work/[slug]/not-found.tsx` — invalid slug fallback with link to all work.

## 14. Files to delete

- `src/components/cursor-effect.tsx`
- `src/components/glass-card.tsx`
- `src/components/automations.tsx`
- `src/components/webprojects.tsx`
- `src/components/typing-text.tsx`

## 15. Files to rewrite

- `src/components/animated-background.tsx` → renamed `decor-circles.tsx`, static only.
- `src/components/navbar.tsx` → moved to `components/site/header.tsx`, restructured.
- `src/components/footer.tsx` → moved to `components/site/footer.tsx`, simplified.
- `src/components/hero.tsx` → moved to `components/sections/hero.tsx`, full redesign.
- `src/components/about.tsx` → moved to `components/sections/about.tsx`, restyled.
- `src/components/skills.tsx` → moved to `components/sections/skills.tsx`, restyled.
- `src/components/contact.tsx` → moved to `components/sections/contact.tsx`, replaces inline Calendly with form + button.
- `src/components/globe.tsx` → moved to `components/sections/globe-section.tsx`, lazy-loaded + brown-themed.
- `src/components/theme-provider.tsx` → moved to `components/site/theme-provider.tsx`.
- `src/app/page.tsx` → server component, composes new sections.
- `src/app/layout.tsx` → Fraunces + Inter font setup, updated metadata.
- `src/app/globals.css` → new theme tokens.
- `next.config.ts` → image format config.

## 16. Files to add

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/opengraph-image.tsx`
- `src/app/loading.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/app/actions/contact.ts`
- `src/app/work/[slug]/page.tsx`
- `src/app/work/[slug]/opengraph-image.tsx`
- `src/app/work/[slug]/not-found.tsx`
- `src/components/sections/work-grid.tsx`
- `src/components/sections/work-filter.tsx`
- `src/components/work/work-card.tsx`
- `src/components/work/work-detail.tsx`
- `src/components/contact/contact-form.tsx`
- `src/components/contact/book-call-button.tsx`
- `src/components/site/theme-toggle.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/chip.tsx`
- `src/components/ui/decor-circles.tsx`
- `src/components/ui/reveal.tsx`
- `src/components/ui/stat-counter.tsx`
- `src/lib/data/work.ts`
- `src/lib/env.ts`
- `.env.local` (user-managed, not committed)

## 17. Dependencies

**Add:** `resend`, `zod`.
**Keep:** `next`, `react`, `react-dom`, `framer-motion` (Reveal + StatCounter only), `next-themes`, `lucide-react`, `react-icons`, `cobe`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-dialog` (mobile menu), `@radix-ui/react-slot` (Button asChild pattern).
**Remove:** `@radix-ui/react-switch` (verified not imported anywhere via grep).

## 18. Testing strategy

- Manual smoke test on each section after build (golden path).
- Lighthouse run pre/post — target 90+ mobile.
- Verify both light + dark modes render correctly.
- Form: submit valid + invalid + honeypot scenarios.
- All `/work/[slug]` routes accessible + render.
- Sitemap + robots.txt generate correctly.
- OG images render (manually fetch endpoint).
- Mobile breakpoints: 375px, 768px, 1024px.

## 19. Open items requiring user input

1. **Stat numbers** — verify "15 projects, 30 workflows, 20 technologies, 10 clients" or replace with honest counts.
2. **Project years** — confirm year per project for `WorkDetail.year` field.
3. **Resend account + domain verification** — required before contact form ships. Without it, fallback is hide form, show only Calendly + email link.
4. **OG image copy** — short tagline for site OG image (default proposed: "AI Automation Specialist · Davao City").

## 20. Out of scope (track for future)

- Blog / articles section.
- `/uses`, `/now`, `/about-detailed` pages.
- CMS migration.
- Internationalization.
- Analytics integration.
- Live chat widget.
- E-commerce or paid services pages.

## 21. Acceptance criteria

- All 8 current section topics present and working in new design.
- 12 projects migrated to `lib/data/work.ts`, each with valid slug.
- `/work/[slug]` route renders for every project at build time.
- Light + dark modes both functional via theme toggle.
- Contact form submits and emails arrive (when Resend configured).
- Calendly opens via popup on click, no inline iframe in initial HTML.
- Globe canvas only mounts after section enters viewport.
- Lighthouse mobile score ≥ 90 for performance, accessibility, best practices, SEO.
- No `"use client"` on top-level page or section files.
- Tailwind 4 + Next 16 conventions followed (verify against `node_modules/next/dist/docs/`).
