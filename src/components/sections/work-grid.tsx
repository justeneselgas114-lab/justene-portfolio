"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Briefcase, Terminal } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Chip } from "@/components/ui/chip";
import { BrandIcon } from "@/components/ui/brand-icon";
import { getFeaturedWork, type WorkDetail } from "@/lib/data/work";
import { ccProof, type CCProofItem } from "@/lib/data/cc-proof";
import { cn } from "@/lib/utils";

type Tab = "projects" | "toolkit";

export function WorkGrid() {
  const [tab, setTab] = useState<Tab>("projects");
  const projects = getFeaturedWork();

  return (
    <section id="work" className="py-24 bg-bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="font-mono text-xs text-accent mb-3">
            // 04 — work.tabs
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            {tab === "projects" ? "Featured Work" : "Claude Development Toolkit"}
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            {tab === "projects"
              ? "Solo-built flagship projects — designed, built, deployed, and maintained myself."
              : "Real screenshots from my Claude Code CLI — agents, MCPs, plugins, session stats. Auditable proof, not a curated demo."}
          </p>
        </Reveal>

        <div className="flex justify-center mb-12">
          <div
            role="tablist"
            className="inline-flex p-1 rounded-full bg-bg border border-border"
          >
            <TabButton
              active={tab === "projects"}
              onClick={() => setTab("projects")}
              icon={<Briefcase size={14} />}
              label="Projects"
              count={projects.length}
            />
            <TabButton
              active={tab === "toolkit"}
              onClick={() => setTab("toolkit")}
              icon={<BrandIcon name="github" size={14} alt="GitHub" />}
              label="Claude Development Toolkit"
              count={ccProof.length}
            />
          </div>
        </div>

        {tab === "projects" && <ProjectsView items={projects} />}
        {tab === "toolkit" && <GithubToolkitView items={ccProof} />}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all",
        active
          ? "bg-accent text-bg shadow-sm"
          : "text-fg-muted hover:text-fg"
      )}
    >
      {icon}
      <span>{label}</span>
      <span
        className={cn(
          "font-mono text-[10px] px-1.5 py-0.5 rounded",
          active ? "bg-bg/20 text-bg" : "bg-bg-elevated text-fg-subtle"
        )}
      >
        {count}
      </span>
    </button>
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

function GithubToolkitView({ items }: { items: CCProofItem[] }) {
  return (
    <>
      <Reveal className="text-center mb-12 max-w-2xl mx-auto">
        <a
          href="https://github.com/justeneselgas114-lab/claude-code-toolkit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-accent-hover transition-colors group mb-3"
        >
          <BrandIcon name="github" size={16} alt="GitHub" />
          github.com/justeneselgas114-lab/claude-code-toolkit
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
        <p className="font-sans text-sm text-fg-muted leading-relaxed">
          Hiring managers asking &ldquo;do you really use Claude Code?&rdquo; — the
          screenshots below are unedited terminal output from my own machine. The
          companion repo above publishes the full skills, agents, MCPs, and hooks
          inventory so anyone can audit the setup.
        </p>
      </Reveal>

      <div className="space-y-16 lg:space-y-20">
        {items.map((item, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <Reveal key={item.slug} delay={0.05}>
              <article
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-2xl overflow-hidden bg-[#1e1e1e] border border-border shadow-md"
                  >
                    <Image
                      src={item.image}
                      alt={`Claude Code ${item.command} terminal output`}
                      width={item.imageWidth}
                      height={item.imageHeight}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-bg bg-accent/90 backdrop-blur px-2 py-1 rounded inline-flex items-center gap-1.5">
                      <Terminal size={10} />
                      {item.command}
                    </div>
                  </a>
                  <a
                    href={item.link?.url ?? "https://github.com/justeneselgas114-lab/claude-code-toolkit"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
                  >
                    <BrandIcon name="github" size={14} alt="GitHub" />
                    View GitHub toolkit
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>

                <div>
                  <p className="font-mono text-xs text-accent mb-2">
                    0{idx + 1} / live terminal
                  </p>
                  <h3 className="font-serif text-2xl lg:text-3xl text-fg font-medium leading-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base text-fg-muted leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 font-mono text-[12px] text-fg-muted"
                      >
                        <span className="text-accent mt-0.5 shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
                    >
                      {item.link.label}
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="text-center mt-16 max-w-2xl mx-auto">
        <p className="font-sans text-sm text-fg-muted leading-relaxed mb-4">
          Want the underlying config? The toolkit repo publishes the full skills,
          agents, hooks, and MCP inventory plus install instructions.
        </p>
        <a
          href="https://github.com/justeneselgas114-lab/claude-code-toolkit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-bg font-sans text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          <BrandIcon name="github" size={16} alt="GitHub" className="invert" />
          Browse the toolkit
          <ArrowUpRight size={14} />
        </a>
      </Reveal>
    </>
  );
}
