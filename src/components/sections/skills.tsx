import {
  Bot, Workflow, Globe, Server, GitBranch, Palette,
  Zap, Database, Code2, Terminal, Layout, Cloud,
  Plug, Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface Category {
  title: string;
  icon: typeof Bot;
  skills: string[];
  highlight?: boolean;
}

const categories: Category[] = [
  {
    title: "AI & Claude Code",
    icon: Sparkles,
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
    icon: Workflow,
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
    icon: Layout,
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
    icon: Server,
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
    icon: Plug,
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
    icon: GitBranch,
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

const tools = [
  { name: "Claude Code", icon: Sparkles },
  { name: "MCP", icon: Bot },
  { name: "n8n", icon: Workflow },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "TypeScript", icon: Terminal },
  { name: "Tailwind", icon: Palette },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Supabase", icon: Database },
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
          <p className="font-mono text-xs text-accent mb-3">
            // 02 — stack.json
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            Skills &amp; Tech Stack
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Claude Code is my power tool — I extend it with custom MCP servers, plugins, and skills to ship faster than most teams.
          </p>
        </Reveal>

        {/* Tool strip — code-import style */}
        <Reveal delay={0.1} className="flex flex-wrap justify-center items-center gap-x-3 gap-y-3 mb-16 font-mono text-xs">
          <span className="text-accent">import</span>
          <span className="text-fg-subtle">{"{"}</span>
          {tools.map((tool, i) => (
            <span key={tool.name} className="inline-flex items-center gap-1.5 text-fg-muted hover:text-accent transition-colors cursor-default">
              <tool.icon size={12} />
              <span>{tool.name}</span>
              {i < tools.length - 1 && <span className="text-fg-subtle">,</span>}
            </span>
          ))}
          <span className="text-fg-subtle">{"}"}</span>
        </Reveal>

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
                    <cat.icon
                      size={22}
                      className={cat.highlight ? "text-accent" : "text-accent"}
                      strokeWidth={1.5}
                    />
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
