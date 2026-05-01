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
