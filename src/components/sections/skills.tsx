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
          <p className="font-mono text-xs text-accent mb-3">
            // 02 — stack.json
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium">
            Skills &amp; Tech Stack
          </h2>
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
              <div className="p-6 rounded-xl bg-bg-elevated border border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <cat.icon size={22} className="text-accent" strokeWidth={1.5} />
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
                      className="inline-flex items-center px-2 py-1 rounded font-mono text-xs text-fg-muted bg-bg border border-border"
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
