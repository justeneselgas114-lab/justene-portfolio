import { MapPin, Mail, Briefcase, User } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const infoItems = [
  { icon: User, label: "Name", value: "Justene Selgas" },
  { icon: MapPin, label: "Location", value: "Davao City, Philippines" },
  { icon: Mail, label: "Email", value: "justene.dev@gmail.com" },
  { icon: Briefcase, label: "Freelance", value: "Available" },
];

const outcomes = [
  { metric: "200%", label: "more discovery calls", project: "OrquestraPH" },
  { metric: "60%", label: "reservations through site", project: "Ally's Buffet" },
  { metric: "150%", label: "more inquiries", project: "NAPMI" },
  { metric: "45%", label: "higher lead conversion", project: "AI Receptionist" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-xs text-accent mb-3">
            // 01 — who_i_am
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
              I help businesses cut time off every repetitive task — lead routing, follow-ups, invoicing, reporting, data entry — so your team scales output without scaling payroll.
            </p>
            <p className="font-sans text-base text-fg-muted leading-relaxed">
              9 production workflows live across sales, ops, and customer service. Built with n8n, Claude Code, OpenAI, and Gemini — wired into the tools you already run (Sheets, Slack, HubSpot, Gmail, Calendar, Vapi). Engineering quality, not duct tape.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Real client outcomes — replaces vanity stats */}
            <div className="grid grid-cols-2 gap-4">
              {outcomes.map((o) => (
                <div
                  key={o.project}
                  className="p-5 rounded-xl bg-bg-elevated border border-border hover:border-accent/40 transition-colors"
                >
                  <div className="font-serif text-4xl lg:text-5xl text-accent font-light leading-none">
                    {o.metric}
                  </div>
                  <p className="font-sans text-sm text-fg mt-2 leading-snug">
                    {o.label}
                  </p>
                  <p className="font-mono text-xs text-fg-subtle mt-2">
                    — {o.project}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-xl bg-bg-elevated border-l-4 border-accent">
              <h4 className="font-serif text-xl text-fg mb-3">What I Do Best</h4>
              <ul className="space-y-2 font-sans text-sm text-fg-muted">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Replace manual tasks with workflows that run 24/7 — no human in the loop
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Cut response times from hours to seconds across sales, ops, and support
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Connect existing tools (Sheets, Slack, CRMs, Gmail) into one pipeline
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Scale output 3–5× without scaling payroll
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
