"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Award, Briefcase, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Chip } from "@/components/ui/chip";
import { getFeaturedWork, type WorkDetail } from "@/lib/data/work";
import { certificates, type Certificate } from "@/lib/data/certificates";
import { cn } from "@/lib/utils";

type Tab = "projects" | "certificates";

export function WorkGrid() {
  const [tab, setTab] = useState<Tab>("projects");
  const projects = getFeaturedWork();

  return (
    <section id="work" className="py-24 bg-bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="font-mono text-xs text-accent mb-3">
            // 04 — portfolio.tabs
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            Work &amp; Credentials
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Solo-built flagship projects on one side, certifications on the other.
          </p>
        </Reveal>

        {/* Tab switcher */}
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
              active={tab === "certificates"}
              onClick={() => setTab("certificates")}
              icon={<Award size={14} />}
              label="Certificates"
              count={certificates.length}
            />
          </div>
        </div>

        {tab === "projects" && <ProjectsView items={projects} />}
        {tab === "certificates" && <CertificatesView items={certificates} />}
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
      <p className="font-sans text-sm text-fg-muted text-center max-w-xl mx-auto mb-16">
        The biggest projects I&apos;ve shipped end-to-end as a solo developer — designed, built, deployed, and maintained myself.
      </p>

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

function CertificatesView({ items }: { items: Certificate[] }) {
  const inProgress = items.filter((c) => c.status === "in_progress");
  const planned = items.filter((c) => c.status === "planned");
  const completed = items.filter((c) => c.status === "completed");

  return (
    <>
      <p className="font-sans text-sm text-fg-muted text-center max-w-2xl mx-auto mb-16 leading-relaxed">
        Continuous learning — actively studying the Claude Code, agentic AI,
        n8n, and GoHighLevel stacks I work in every day. Honest log of what
        I&apos;m taking now and what&apos;s next on the list. Credentials get
        their verify link the moment each course is done.
      </p>

      {completed.length > 0 && (
        <div className="mb-12">
          <CertGroupHeading
            label="Completed"
            sub="Verified credentials with proof"
            count={completed.length}
            tone="completed"
          />
          <CertGrid items={completed} />
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="mb-12">
          <CertGroupHeading
            label="In Progress"
            sub="Currently studying"
            count={inProgress.length}
            tone="in_progress"
          />
          <CertGrid items={inProgress} />
        </div>
      )}

      {planned.length > 0 && (
        <div className="mb-12">
          <CertGroupHeading
            label="On the Reading List"
            sub="Next on deck"
            count={planned.length}
            tone="planned"
          />
          <CertGrid items={planned} />
        </div>
      )}

      <Reveal delay={0.1} className="text-center mt-12 max-w-2xl mx-auto">
        <p className="font-sans text-sm text-fg-muted leading-relaxed">
          The fastest way to stay sharp is to keep studying the same field
          you&apos;re shipping in. The more I understand the strategy behind
          modern AI deployment, the better the systems I build for clients.
        </p>
      </Reveal>
    </>
  );
}

function CertGroupHeading({
  label,
  sub,
  count,
  tone,
}: {
  label: string;
  sub: string;
  count: number;
  tone: "in_progress" | "planned" | "completed";
}) {
  const dotClass =
    tone === "in_progress"
      ? "bg-accent status-dot"
      : tone === "completed"
        ? "bg-emerald-500"
        : "bg-fg-subtle/50";
  return (
    <div className="flex items-baseline justify-between mb-6">
      <div className="flex items-center gap-3">
        <span
          className={`relative inline-flex w-2 h-2 rounded-full ${dotClass}`}
          aria-hidden="true"
        />
        <h3 className="font-serif text-xl text-fg font-medium">{label}</h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle bg-bg-elevated px-2 py-0.5 rounded">
          {count}
        </span>
      </div>
      <p className="hidden sm:block font-mono text-[11px] text-fg-subtle uppercase tracking-wider">
        {sub}
      </p>
    </div>
  );
}

function CertGrid({ items }: { items: Certificate[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((cert, i) => (
        <Reveal key={cert.slug} delay={i * 0.05}>
          <CertCard cert={cert} />
        </Reveal>
      ))}
    </div>
  );
}

function CertCard({ cert }: { cert: Certificate }) {
  const isCompleted = cert.status === "completed";
  const isInProgress = cert.status === "in_progress";

  return (
    <article
      className={cn(
        "group h-full p-6 rounded-2xl border transition-all duration-300 flex flex-col bg-bg",
        isInProgress
          ? "border-accent/40 hover:border-accent/70 hover:-translate-y-1"
          : isCompleted
            ? "border-emerald-500/30 hover:border-emerald-500/60 hover:-translate-y-1"
            : "border-dashed border-border hover:border-fg-subtle/50"
      )}
    >
      {cert.image ? (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-muted mb-4 border border-border">
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "relative aspect-[4/3] rounded-lg overflow-hidden mb-4 border flex items-center justify-center",
            isInProgress
              ? "bg-gradient-to-br from-accent-soft/30 to-bg-muted border-accent/30"
              : isCompleted
                ? "bg-gradient-to-br from-emerald-500/15 to-bg-muted border-emerald-500/30"
                : "bg-gradient-to-br from-fg/5 to-bg-muted border-border"
          )}
        >
          <Award
            size={64}
            className={cn(
              isInProgress
                ? "text-accent/50"
                : isCompleted
                  ? "text-emerald-500/50"
                  : "text-fg-subtle/40"
            )}
            strokeWidth={1.2}
          />
          <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
            {cert.issuer}
          </span>
          <span
            className={cn(
              "absolute top-3 right-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full",
              isInProgress
                ? "bg-accent text-bg"
                : isCompleted
                  ? "bg-emerald-500 text-bg"
                  : "bg-bg-elevated text-fg-subtle border border-border"
            )}
          >
            {isInProgress && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-bg animate-pulse"
                aria-hidden="true"
              />
            )}
            {isInProgress
              ? "In progress"
              : isCompleted
                ? "Completed"
                : "Up next"}
          </span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">
          {cert.issuer}
          {cert.target && ` · ${cert.target}`}
        </p>
        <h3 className="font-serif text-xl text-fg font-medium leading-snug mb-2">
          {cert.title}
        </h3>
        {cert.description && (
          <p className="font-sans text-sm text-fg-muted leading-relaxed mb-3">
            {cert.description}
          </p>
        )}
        {cert.why && (
          <p className="font-sans text-xs text-fg-subtle italic leading-relaxed mb-4 pl-3 border-l-2 border-accent/30">
            {cert.why}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-3">
          {cert.verifyUrl ? (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
            >
              Verify credential
              <ExternalLink size={12} />
            </a>
          ) : cert.courseUrl ? (
            <a
              href={cert.courseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              View course
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="font-mono text-xs text-fg-subtle">
              {isCompleted ? "certificate · verified" : "self-study track"}
            </span>
          )}
          <span className="font-mono text-[10px] text-fg-subtle">{cert.year}</span>
        </div>
      </div>
    </article>
  );
}
