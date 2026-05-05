export type CertificateStatus = "in_progress" | "planned" | "completed";

export interface Certificate {
  slug: string;
  title: string;
  issuer: string;
  year: number;
  status: CertificateStatus;
  /** Approximate finish target — only shown for in_progress / planned */
  target?: string;
  /** Why this course matters for the work I do */
  why?: string;
  image?: string; // path under /public, e.g. "/certs/claude-code.png"
  verifyUrl?: string; // optional verification / credential link (completed only)
  description?: string;
  /** Official course / source URL — opens in new tab */
  courseUrl?: string;
}

/**
 * Honest, ongoing study log. Most entries are in-progress or planned —
 * I'm actively deepening my Claude Code, agentic AI, and GoHighLevel
 * stack. Replace with verified credentials and image proofs as each
 * course completes.
 */
export const certificates: Certificate[] = [
  {
    slug: "anthropic-claude-api",
    title: "Claude with the Anthropic API",
    issuer: "Anthropic Academy",
    year: 2026,
    status: "in_progress",
    target: "Targeting Q2 2026",
    description:
      "Official Anthropic course on building production-ready apps with Claude — prompt design, tool use, batching, multi-turn agents, and prompt caching.",
    why: "Direct foundation for every AI feature I ship — from Octopulse agents to portfolio chat.",
    courseUrl: "https://anthropic.skilljar.com/",
  },
  {
    slug: "anthropic-claude-code-in-action",
    title: "Claude Code in Action",
    issuer: "Anthropic Academy",
    year: 2026,
    status: "in_progress",
    target: "Targeting Q2 2026",
    description:
      "Anthropic's deep-dive on Claude Code as a development environment — MCP servers, custom skills, plugins, sub-agents, and shipping software faster with the model in the loop.",
    why: "Going from heavy user to verified specialist — proof I extend Claude Code, not just consume it.",
    courseUrl: "https://anthropic.skilljar.com/",
  },
  {
    slug: "n8n-level-1",
    title: "n8n Course — Level 1 (Beginner to Advanced)",
    issuer: "n8n Academy",
    year: 2026,
    status: "in_progress",
    target: "Targeting Q2 2026",
    description:
      "Official n8n curriculum covering nodes, expressions, flow control, error handling, and the patterns behind production-grade workflows.",
    why: "Validates the n8n engineering I already do across 9 live workflows.",
    courseUrl: "https://docs.n8n.io/courses/",
  },
  {
    slug: "deeplearning-agentic-workflows",
    title: "Building Agentic Workflows with Claude",
    issuer: "DeepLearning.AI × Anthropic",
    year: 2026,
    status: "planned",
    target: "Planned Q3 2026",
    description:
      "Andrew Ng's short-course series on agentic patterns — planner-executor loops, tool design, evaluation harnesses, and human-in-the-loop boundaries.",
    why: "Sharpens the Octopulse multi-agent architecture and the patterns I'd bring to GrowBeyond's pipeline.",
    courseUrl: "https://learn.deeplearning.ai/",
  },
  {
    slug: "n8n-level-2",
    title: "n8n Course — Level 2 (Advanced)",
    issuer: "n8n Academy",
    year: 2026,
    status: "planned",
    target: "Planned Q3 2026",
    description:
      "Advanced n8n track — sub-workflows, custom nodes, queue mode, performance tuning, and multi-tenant deployment.",
    why: "Levels up n8n from \"ship it\" to \"scale it\" — needed as workflow count grows past a dozen.",
    courseUrl: "https://docs.n8n.io/courses/",
  },
  {
    slug: "ghl-certified-admin",
    title: "GoHighLevel Certified Admin",
    issuer: "GoHighLevel",
    year: 2026,
    status: "planned",
    target: "Planned Q3 2026",
    description:
      "Official GHL certification covering sub-accounts, snapshots, pipelines, workflow automations, calendar setup, and the GHL API.",
    why: "Caps off two years of GHL work at Zappify and PropulseVA with a verifiable credential.",
    courseUrl: "https://www.gohighlevel.com/",
  },
  {
    slug: "google-ai-essentials",
    title: "Google AI Essentials",
    issuer: "Google",
    year: 2026,
    status: "planned",
    target: "Planned Q3 2026",
    description:
      "Google's foundation course on prompt engineering, responsible AI, and integrating Gemini into everyday business workflows.",
    why: "Broadens the LLM toolkit beyond Claude — useful for clients standardized on the Google stack.",
    courseUrl: "https://grow.google/intl/en/ai-essentials/",
  },
];

export const certificatesByStatus = (
  status: CertificateStatus
): Certificate[] => certificates.filter((c) => c.status === status);
