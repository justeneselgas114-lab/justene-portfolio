# Octopulse — Portfolio Screenshots

Captured 2026-05-03 via Playwright MCP at 1440×900 viewport, fullPage. Use for Octopulse project page in this portfolio (`src/lib/data/work.ts` → new `WorkDetail` entry).

## Project summary

**Octopulse** — Multi-tenant AI ops platform for Filipino service businesses (clinics, salons, repair shops). Auto-replies to FB Messenger DMs + comment-to-DM funnel, qualifies leads, books appointments, processes PayMongo payments, and routes escalations to humans. Includes a separate operator console for cross-tenant management (kill switches, webhook log, eval harness, audit log).

Stack: Next.js 16 + Turbopack, React 19, Drizzle ORM, PostgreSQL 16 + pgvector (HNSW), BullMQ + Redis, Better Auth, Anthropic SDK (Claude Sonnet/Haiku), Google Gemini (embeddings + Pro/Flash), Meta Graph API v19, PayMongo, Resend.

## Source folders (absolute paths)

```
TENANT_DIR   = C:\Users\My Pc\Documents\My projects\Image\Octopulse\Tenants
OPERATOR_DIR = C:\Users\My Pc\Documents\My projects\Image\Octopulse\Operator Dashboard
```

To wire into the portfolio, copy PNGs into `public/octopulse/` (or reference them as `file://` during local dev), then add image paths to a new `WorkDetail` entry.

---

## 1) Tenant Workspace (19 screenshots)

Path: `C:\Users\My Pc\Documents\My projects\Image\Octopulse\Tenants\`

### Auth (pre-login)
| File | Page | Purpose |
|---|---|---|
| `01-login.png` | `/login` | Tenant sign-in (Pulse Orange CTA, "Tenant Workspace" pill) |
| `02-register.png` | `/register` | New tenant signup |
| `03-forgot-password.png` | `/forgot-password` | Request reset link |
| `04-reset-password.png` | `/reset-password?token=…` | New password form |

### Dashboard (logged in as `admin@gmail.com`, tenant: NeuroDesk.Digital)
| File | Page | Purpose |
|---|---|---|
| `05-dashboard.png` | `/dashboard` | Today view — appts, occupancy, revenue, alerts |
| `06-overview.png` | `/overview` | 30d KPIs + Health Score (composite signal) + appt trend |
| `07-agents.png` | `/agents` | AI agent roster (Inquiry/Sales/Closer/Reservation) |
| `08-catalog.png` | `/catalog` | Items + Knowledge tabs (KB for AI agents) |
| `09-appointments.png` | `/appointments` | Calendar booking view |
| `10-contacts.png` | `/contacts` | Lead/customer table with source + score |
| `11-conversations.png` | `/conversations` | Messenger threads |
| `12-leads.png` | `/leads` | Pipeline kanban (New → Qualifying → Hot → Booked → Lost) |
| `13-ads.png` | `/ads` | FB Ads performance — comment-to-DM funnel + book rate |
| `14-analytics.png` | `/analytics` | Trends — appts, confirmation, revenue, lead funnel |
| `15-insights.png` | `/insights` | AI diagnostics (critical issues + observations) |
| `16-profile.png` | `/profile` | User account |
| `17-settings.png` | `/settings` | Workspace + integrations entry |
| `18-settings-billing.png` | `/settings/billing` | Plan tiers (Starter ₱990, Clinic ₱1490, Pro ₱2990) |
| `19-settings-integrations-facebook.png` | `/settings/integrations/facebook` | FB Page connect + tracked-post selector |

---

## 2) Operator Console (8 screenshots) — "Developer Dashboard"

Path: `C:\Users\My Pc\Documents\My projects\Image\Octopulse\Operator Dashboard\`

URL-only access at `/operation`, gated by `PLATFORM_ADMIN_EMAILS` env allowlist. Logged in as `justeneselgas@gmail.com`.

| File | Page | Purpose |
|---|---|---|
| `01-operation-login.png` | `/operation-login` | Restricted operator sign-in (shows denial state when non-operator tries) |
| `02-operation-overview.png` | `/operation` | Pulse — orgs, tenants, FB connected, agents, msgs/runs/errors 24h, AI cost |
| `03-operation-tenants.png` | `/operation/tenants` | Cross-tenant table sorted by 7d AI spend |
| `04-operation-tenant-detail.png` | `/operation/tenants/[id]` | Drill-in: 30d KPIs, channels, agents, users — writes audit_event on view |
| `05-operation-webhooks.png` | `/operation/webhooks` | Inbound Meta + PayMongo webhooks, sha256 hashed (no body stored) |
| `06-operation-evals.png` | `/operation/evals` | Golden-DM corpus — re-run on prompt edits to catch regressions |
| `07-operation-flags.png` | `/operation/flags` | 3 kill switches: agent_run_paused, webhook_ingest_paused, ai_global_budget_hit |
| `08-operation-audit.png` | `/operation/audit` | Last 200 operator actions (view_tenant, flag_set, before→after) |

---

## Suggested portfolio entry shape

```ts
// src/lib/data/work.ts — append to `work` array
{
  slug: "octopulse",
  title: "Octopulse — Multi-tenant AI Ops Platform",
  type: "web",
  shortDescription:
    "Multi-tenant SaaS that auto-replies to FB Messenger, runs comment-to-DM funnels, qualifies leads, books appointments, and processes payments. Includes a separate operator console with kill switches, eval harness, and audit log.",
  thumbnail: "/octopulse/05-dashboard.png",
  images: [
    "/octopulse/05-dashboard.png",
    "/octopulse/06-overview.png",
    "/octopulse/12-leads.png",
    "/octopulse/13-ads.png",
    "/octopulse/15-insights.png",
    "/octopulse/02-operation-overview.png",
    "/octopulse/03-operation-tenants.png",
    "/octopulse/05-operation-webhooks.png",
    "/octopulse/06-operation-evals.png",
    "/octopulse/07-operation-flags.png",
  ],
  tags: ["Next.js 16", "AI Agents", "Multi-tenant", "pgvector", "Meta API"],
  year: 2026,
  problem:
    "Filipino service businesses (clinics, salons, repair shops) lose leads because FB DMs and ad comments go unanswered after hours, and staff can't keep up with intake + booking + reminders manually.",
  solution:
    "Built a multi-tenant Next.js 16 app where each business connects their FB Page. AI agents (Inquiry, Sales, Closer, Reservation) handle DMs and comment-to-DM funnels in EN/TL, qualify leads, push bookings to Google Calendar, and accept payments via PayMongo. A pgvector-backed knowledge base (HNSW + hybrid semantic/keyword retrieval) grounds answers in the owner's uploaded docs. A separate /operation console gives the platform admin cross-tenant kill switches, webhook delivery log, golden-DM eval harness, and a tamper-evident audit log.",
  results: [
    "Sub-second auto-reply to Messenger DMs across all connected pages",
    "Comment-to-DM funnel parity with FB native + Instagram channel groundwork",
    "Operator console kills runaway AI spend or paused webhooks platform-wide in one toggle",
    "Eval harness catches prompt regressions before they ship to live tenants",
  ],
  techStack: [
    "Next.js 16 + Turbopack", "React 19", "TypeScript",
    "PostgreSQL 16 + pgvector (HNSW)", "Drizzle ORM",
    "BullMQ + Redis", "Better Auth",
    "Anthropic Claude (Sonnet/Haiku)", "Google Gemini (embeddings + Pro/Flash)",
    "Meta Graph API v19", "PayMongo", "Resend",
  ],
  featured: true,
}
```

## Copy command (one-liner, PowerShell)

```powershell
$src1="C:\Users\My Pc\Documents\My projects\Image\Octopulse\Tenants"
$src2="C:\Users\My Pc\Documents\My projects\Image\Octopulse\Operator Dashboard"
$dst="C:\Users\My Pc\justene-portfolio\public\octopulse"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Copy-Item "$src1\*.png" $dst -Force
Copy-Item "$src2\*.png" $dst -Force
```

After copying, every PNG above is reachable at `/octopulse/<filename>` from the Next.js app.
