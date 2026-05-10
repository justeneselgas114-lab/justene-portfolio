import { Reveal } from "@/components/ui/reveal";
import { BrandIcon } from "@/components/ui/brand-icon";

interface Category {
  title: string;
  iconBrand: string;
  skills: string[];
  highlight?: boolean;
}

const categories: Category[] = [
  {
    title: "AI & Claude Code",
    iconBrand: "claude",
    highlight: true,
    skills: [
      "Claude Code Expert",
      "MCP Servers",
      "Claude Plugins",
      "Claude Skills",
      "Prompt Engineering",
      "Reverse Engineering",
      "LLM Integration",
      "AI Agent Architecture",
      "Anthropic API",
      "OpenAI GPT-4",
      "Google Gemini",
    ],
  },
  {
    title: "Workflow Automation",
    iconBrand: "n8n",
    skills: [
      "n8n (Advanced)",
      "GoHighLevel",
      "Make (Integromat)",
      "Zapier",
      "Webhooks",
      "REST APIs",
      "Cron Schedules",
      "Vapi Voice AI",
      "Twilio SMS",
    ],
  },
  {
    title: "Frontend",
    iconBrand: "react",
    skills: [
      "React 19",
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Radix UI",
      "Framer Motion",
      "HTML5 / CSS3",
      "JavaScript (ES2024)",
    ],
  },
  {
    title: "Backend & Data",
    iconBrand: "postgresql",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Server Actions",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Prisma ORM",
      "Zod (validation)",
    ],
  },
  {
    title: "Integrations & Tools",
    iconBrand: "slack",
    skills: [
      "Google Workspace",
      "Google Sheets API",
      "Gmail / Calendar",
      "Slack",
      "HubSpot CRM",
      "Stripe",
      "Resend (email)",
      "Crisp Chat",
      "SerpAPI",
    ],
  },
  {
    title: "DevOps & Libraries",
    iconBrand: "github",
    skills: [
      "Git / GitHub",
      "Vercel",
      "Docker",
      "VS Code",
      "npm / pnpm",
      "Turbopack",
      "Postman",
      "ESLint",
      "Figma",
    ],
  },
];

// SVG-only marquee strip — auto-scrolls infinitely sideways
const marqueeIcons = [
  "claude",
  "anthropic",
  "openai",
  "gemini",
  "model-context-protocol",
  "n8n",
  "zapier",
  "make",
  "react",
  "nextdotjs",
  "typescript",
  "javascript",
  "tailwind-css",
  "postgresql",
  "mongodb",
  "supabase",
  "redis",
  "prisma",
  "vercel",
  "github",
  "git",
  "docker",
  "visual-studio-code",
  "python",
  "go",
  "rust",
  "html5",
  "sass",
  "webpack",
  "vite",
  "bun",
  "jest",
  "vitest",
  "aws",
  "google-cloud",
  "cloudflare",
  "linux",
  "postman",
  "npm",
  "pnpm",
  "stripe",
  "twilio",
  "hubspot",
  "slack",
  "figma",
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-xs text-accent mb-3">
            // 03 — stack.json
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            Skills &amp; Tech Stack
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Claude Code is my power tool — I extend it with custom MCP servers, plugins, and skills to ship faster than most teams.
          </p>
        </Reveal>
      </div>

      {/* Infinite marquee — full bleed, no container */}
      <Reveal delay={0.1} className="mb-16 relative">
        <div
          className="overflow-hidden relative py-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          <div className="flex gap-12 w-max animate-marquee">
            {[...marqueeIcons, ...marqueeIcons].map((slug, i) => (
              <div
                key={`${slug}-${i}`}
                className="shrink-0 h-10 w-10 flex items-center justify-center text-fg-muted hover:text-accent transition-colors"
                aria-hidden={i >= marqueeIcons.length}
              >
                <BrandIcon name={slug} size={32} alt={slug} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={0.1 + i * 0.05}>
              <div
                className={`relative p-6 rounded-xl border transition-all duration-300 group ${
                  cat.highlight
                    ? "bg-accent-soft/[0.15] border-accent/40 shadow-md shadow-accent/10 hover:border-accent/60 hover:-translate-y-1"
                    : "bg-bg-elevated border-border hover:border-accent/30 hover:-translate-y-1"
                }`}
              >
                {cat.highlight && (
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-accent text-bg font-mono text-[10px] uppercase tracking-wider">
                    primary
                  </span>
                )}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-bg flex items-center justify-center border border-border">
                      <BrandIcon name={cat.iconBrand} size={22} alt={cat.title} />
                    </div>
                    <h3 className="font-serif text-xl text-fg font-medium">{cat.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-fg-subtle group-hover:text-accent transition-colors">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center px-2 py-1 rounded font-mono text-xs ${
                        cat.highlight
                          ? "text-fg bg-bg border border-accent/30"
                          : "text-fg-muted bg-bg border border-border"
                      }`}
                    >
                      {skill}
                    </span>
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
