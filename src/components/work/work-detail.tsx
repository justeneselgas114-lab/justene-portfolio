import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Bot, Quote, Sparkles } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { GalleryTabs } from "@/components/work/gallery-tabs";
import type { WorkDetail as WorkDetailType } from "@/lib/data/work";

export function WorkDetail({ work }: { work: WorkDetailType }) {
  return (
    <article className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-sans text-sm text-fg-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          All Work
        </Link>
      </div>

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Chip variant="accent">
            {work.type === "automation" ? "Automation" : "Web"}
          </Chip>
          {work.status && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent bg-accent-soft/30 border border-accent/30 px-2.5 py-1 rounded-full">
              <span className="relative inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-accent status-dot" />
              </span>
              {work.status}
            </span>
          )}
        </div>
        <h1 className="font-serif text-4xl lg:text-6xl text-fg font-medium leading-tight">
          {work.title}
        </h1>
        <p className="font-sans text-lg text-fg-muted mt-4 max-w-2xl">
          {work.shortDescription}
        </p>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="w-full overflow-hidden rounded-2xl bg-bg-elevated border border-border">
          <Image
            src={work.thumbnail}
            alt={work.title}
            width={work.thumbnailWidth ?? 1600}
            height={work.thumbnailHeight ?? 1000}
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            className="block w-full h-auto"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_2fr] gap-12 mb-24">
        {/* Sticky meta */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="space-y-6">
            <Meta label="Year" value={String(work.year)} />
            <Meta label="Type" value={work.type === "automation" ? "Automation" : "Web Development"} />
            {work.status && <Meta label="Status" value={work.status} />}
            {work.role && <Meta label="Role" value={work.role} />}
            {work.nodes && <Meta label="Nodes" value={String(work.nodes)} />}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {work.techStack.map((t) => (
                  <Chip key={t} variant="default">{t}</Chip>
                ))}
              </div>
            </div>
            {work.liveUrl && (
              <Button asChild>
                <a href={work.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Live Site
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            )}
          </div>
        </aside>

        {/* Prose */}
        <div className="space-y-12">
          <Block title="The Problem" body={work.problem} />
          <Block title="The Solution" body={work.solution} />

          {work.agents && work.agents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-accent" />
                <p className="font-mono text-xs text-accent uppercase tracking-wider">
                  Featured capability
                </p>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-3">
                A Team of AI Agents — Working Together
              </h2>
              <p className="font-sans text-base text-fg-muted leading-relaxed mb-6">
                Octopulse runs a coordinated fleet of specialized AI agents that turn Facebook ads into booked appointments. Each agent owns a stage of the funnel and hands off seamlessly — so ad spend stops leaking and the calendar stays full.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {work.agents.map((agent) => (
                  <div
                    key={agent.name}
                    className="p-5 rounded-xl bg-bg-elevated border border-border hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bot size={16} className="text-accent" />
                      <h3 className="font-serif text-lg text-fg font-medium">{agent.name}</h3>
                    </div>
                    <p className="font-mono text-[11px] text-fg-subtle uppercase tracking-wider mb-2">
                      {agent.role}
                    </p>
                    <p className="font-sans text-sm text-fg-muted leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">Results</h2>
            <ul className="space-y-3">
              {work.results.map((r) => (
                <li key={r} className="flex items-start gap-3 font-sans text-base text-fg-muted">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-1" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {work.imageGroups && work.imageGroups.length > 0 ? (
            <GalleryTabs groups={work.imageGroups} workTitle={work.title} />
          ) : (
            work.images.length > 1 && (
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {work.images.slice(1).map((src, i) => (
                    <div key={src} className="relative aspect-[16/10] rounded-lg overflow-hidden bg-bg-elevated border border-border">
                      <Image
                        src={src}
                        alt={`${work.title} screenshot ${i + 2}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {work.testimonials && work.testimonials.length > 0 && (
        <div className="border-t border-border bg-bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
              <p className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                // What users say
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-fg font-medium">
                Loved by the businesses using it
              </h2>
              <p className="font-sans text-base text-fg-muted mt-3 max-w-xl mx-auto">
                Live feedback from paying tenants running Octopulse in production today.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {work.testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="relative p-7 rounded-2xl bg-bg border border-border shadow-sm"
                >
                  <Quote
                    size={28}
                    className="absolute top-5 right-5 text-accent/20"
                    aria-hidden="true"
                  />
                  <blockquote className="font-serif text-lg text-fg leading-relaxed mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="border-t border-border pt-4">
                    <p className="font-sans text-sm text-fg font-medium">{t.author}</p>
                    <p className="font-mono text-[11px] text-fg-subtle mt-0.5">
                      {t.role} · {t.business}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to all work
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-1">{label}</p>
      <p className="font-sans text-base text-fg">{value}</p>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">{title}</h2>
      <p className="font-sans text-base text-fg-muted leading-relaxed">{body}</p>
    </div>
  );
}
