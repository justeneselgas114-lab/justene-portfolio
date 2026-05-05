import { Briefcase, MapPin, GraduationCap, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Chip } from "@/components/ui/chip";
import { experience, education } from "@/lib/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="font-mono text-xs text-accent mb-3">
            // 02 — experience.history
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            Where I&apos;ve Worked
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Two years building GoHighLevel + n8n automation systems for SaaS, coaches, and agencies — before going solo on Octopulse and AI agent platforms.
          </p>
        </Reveal>

        {/* Timeline */}
        <ol className="relative max-w-4xl mx-auto">
          <span
            aria-hidden="true"
            className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-border"
          />

          {experience.map((role, i) => (
            <Reveal key={role.slug} delay={0.05 + i * 0.08}>
              <li className="relative pl-12 sm:pl-16 pb-12 last:pb-0">
                {/* Marker */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 sm:left-1 top-1 inline-flex items-center justify-center h-7 w-7 rounded-full bg-bg border border-accent/40 shadow-sm"
                >
                  <Briefcase size={14} className="text-accent" />
                </span>

                <article className="rounded-2xl border border-border bg-bg-elevated p-6 lg:p-7 hover:border-accent/40 transition-colors">
                  <header className="mb-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-mono text-[11px] text-accent uppercase tracking-wider">
                        {role.start} — {role.end}
                      </p>
                      {role.remote && (
                        <span className="font-mono text-[10px] text-fg-subtle px-2 py-0.5 rounded-full bg-bg border border-border uppercase tracking-wider">
                          Remote
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl lg:text-2xl text-fg font-medium leading-tight">
                      {role.title}
                    </h3>
                    <p className="font-sans text-sm text-fg-muted mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {role.website ? (
                        <a
                          href={role.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-fg font-medium hover:text-accent transition-colors group"
                        >
                          {role.company}
                          <ArrowUpRight
                            size={12}
                            className="text-fg-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      ) : (
                        <span className="text-fg font-medium">{role.company}</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-fg-subtle">
                        <MapPin size={12} />
                        {role.location}
                      </span>
                    </p>
                  </header>

                  <p className="font-sans text-base text-fg-muted leading-relaxed mb-4">
                    {role.summary}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {role.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 font-sans text-sm text-fg-muted leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                    {role.stack.map((s) => (
                      <Chip key={s} variant="default">
                        {s}
                      </Chip>
                    ))}
                  </div>
                </article>
              </li>
            </Reveal>
          ))}

          {/* Education entry */}
          <Reveal delay={0.05 + experience.length * 0.08}>
            <li className="relative pl-12 sm:pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 sm:left-1 top-1 inline-flex items-center justify-center h-7 w-7 rounded-full bg-bg border border-border shadow-sm"
              >
                <GraduationCap size={14} className="text-fg-muted" />
              </span>
              <article className="rounded-2xl border border-border bg-bg-elevated/60 p-6 lg:p-7">
                <p className="font-mono text-[11px] text-fg-subtle uppercase tracking-wider mb-2">
                  Education · Graduated {education.graduation}
                </p>
                <h3 className="font-serif text-xl text-fg font-medium leading-tight">
                  {education.degree}
                </h3>
                <p className="font-sans text-sm text-fg-muted mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-fg font-medium">{education.school}</span>
                  <span className="inline-flex items-center gap-1 text-fg-subtle">
                    <MapPin size={12} />
                    {education.location}
                  </span>
                </p>
              </article>
            </li>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
