import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import type { WorkDetail as WorkDetailType } from "@/lib/data/work";

export function WorkDetail({ work, next }: { work: WorkDetailType; next?: WorkDetailType }) {
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
        <Chip variant="accent" className="mb-4">
          {work.type === "automation" ? "Automation" : "Web"}
        </Chip>
        <h1 className="font-serif text-4xl lg:text-6xl text-fg font-medium leading-tight">
          {work.title}
        </h1>
        <p className="font-sans text-lg text-fg-muted mt-4 max-w-2xl">
          {work.shortDescription}
        </p>
      </header>

      <div className="relative aspect-[16/9] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-bg-elevated">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_2fr] gap-12 mb-24">
        {/* Sticky meta */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="space-y-6">
            <Meta label="Year" value={String(work.year)} />
            <Meta label="Type" value={work.type === "automation" ? "Automation" : "Web Development"} />
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

          {work.images.length > 1 && (
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {work.images.slice(1).map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-elevated">
                    <Image
                      src={src}
                      alt={`${work.title} screenshot ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {next && (
        <div className="border-t border-border">
          <Link
            href={`/work/${next.slug}`}
            className="block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 group"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-2">Next Project</p>
            <h3 className="font-serif text-3xl lg:text-4xl text-fg font-medium group-hover:text-accent transition-colors flex items-center gap-3">
              {next.title}
              <ArrowUpRight size={28} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </h3>
          </Link>
        </div>
      )}
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
