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
    <section id="about" className="py-24 bg-bg-muted">
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
