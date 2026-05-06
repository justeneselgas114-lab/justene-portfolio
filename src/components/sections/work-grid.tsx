"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Chip } from "@/components/ui/chip";
import { getFeaturedWork, type WorkDetail } from "@/lib/data/work";

export function WorkGrid() {
  const projects = getFeaturedWork();

  return (
    <section id="work" className="py-24 bg-bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="font-mono text-xs text-accent mb-3">
            // 04 — featured.work
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            Featured Work
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Solo-built flagship projects — designed, built, deployed, and maintained myself.
          </p>
        </Reveal>

        <ProjectsView items={projects} />
      </div>
    </section>
  );
}

function ProjectsView({ items }: { items: WorkDetail[] }) {
  return (
    <>
      <div className="space-y-24 lg:space-y-32">
        {items.map((work, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <Reveal key={work.slug} delay={0.05}>
              <article
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  href={`/work/${work.slug}`}
                  prefetch
                  className="group relative block rounded-2xl overflow-hidden bg-bg border border-border shadow-md"
                >
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    width={work.thumbnailWidth ?? 1600}
                    height={work.thumbnailHeight ?? 1000}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-bg bg-fg/80 backdrop-blur px-2 py-1 rounded">
                    0{idx + 1} / Flagship
                  </div>
                  <div className="absolute top-4 right-4">
                    <Chip variant="accent" className="bg-bg/90 backdrop-blur">
                      {work.type === "automation" ? "Automation" : "Web"}
                      {work.nodes && ` · ${work.nodes} nodes`}
                    </Chip>
                  </div>
                  <div className="absolute inset-0 bg-fg/0 group-hover:bg-fg/10 transition-colors flex items-end p-6">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-bg text-fg px-4 py-2 rounded-lg font-sans text-sm font-medium inline-flex items-center gap-2">
                      Read case study
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>

                <div>
                  <p className="font-mono text-xs text-fg-subtle mb-2">
                    {work.year} · Solo developer
                    {work.role && ` · ${work.role}`}
                  </p>
                  <h3 className="font-serif text-3xl lg:text-4xl text-fg font-medium leading-tight mb-4">
                    {work.title}
                  </h3>
                  <p className="font-sans text-base text-fg-muted leading-relaxed mb-6">
                    {work.shortDescription}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      Outcomes
                    </p>
                    <ul className="space-y-2">
                      {work.results.slice(0, 2).map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 font-sans text-sm text-fg-muted"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-accent mt-0.5 shrink-0"
                          />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {work.techStack.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center px-2 py-1 rounded font-mono text-[11px] text-fg-muted bg-bg border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/work/${work.slug}`}
                      className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
                    >
                      Read full case study
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </Link>
                    {work.liveUrl && (
                      <a
                        href={work.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-sans text-sm font-medium text-fg-muted hover:text-fg transition-colors"
                      >
                        Visit live →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="text-center mt-20">
        <p className="font-sans text-sm text-fg-muted mb-3">
          Plus 9 more workflows in production —
        </p>
        <p className="font-mono text-xs text-fg-subtle">
          ai-sales-followup · social-media-lead-capture · receipt-extractor · competitor-intel · ai-chatbot-sales · lead-qualification-crm · lead-researcher-sdr · allys-buffet · napmi
        </p>
      </Reveal>
    </>
  );
}
