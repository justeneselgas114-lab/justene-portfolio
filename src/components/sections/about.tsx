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
              I help businesses stop losing leads, automate manual work, and ship modern web tools — without hiring a 5-person team.
            </p>
            <p className="font-sans text-base text-fg-muted leading-relaxed">
              I&apos;ve shipped 9 production AI workflows (lead scoring, voice AI, receipt OCR) and 3 conversion-focused websites. From discovery to deployment — one developer, one invoice.
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
                  Capture every lead 24/7 — instant AI voice + SMS routing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Replace 10+ hrs/week of manual sales follow-up
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Ship high-converting websites in 2 weeks
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  Design → build → deploy. No agency handoff fees.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
