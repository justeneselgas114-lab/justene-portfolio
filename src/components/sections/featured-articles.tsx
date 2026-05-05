import Link from "next/link";
import { ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { featuredArticles } from "@/lib/data/articles";

const sourceAccent: Record<string, string> = {
  HBR: "from-rose-500/20 to-rose-500/5",
  McKinsey: "from-blue-500/20 to-blue-500/5",
  BCG: "from-emerald-500/20 to-emerald-500/5",
  "MIT Sloan": "from-amber-500/20 to-amber-500/5",
  Anthropic: "from-accent/25 to-accent/5",
};

export function FeaturedArticles() {
  const items = featuredArticles();

  return (
    <section
      id="reading"
      className="py-24 bg-bg border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-mono text-xs text-accent mb-3">
            // 07 — must_read
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-3">
            What every business owner should read about AI
          </h2>
          <p className="font-sans text-base text-fg-muted leading-relaxed">
            Four articles I send every client first — verified pieces from{" "}
            <span className="text-fg font-medium">HBR</span>,{" "}
            <span className="text-fg font-medium">McKinsey</span>,{" "}
            <span className="text-fg font-medium">BCG</span>, and{" "}
            <span className="text-fg font-medium">Anthropic</span> on how to
            actually grow with AI instead of just spending on it.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {items.map((a, i) => {
            const accentBg =
              sourceAccent[a.sourceShort] ?? "from-fg/10 to-fg/0";
            return (
              <Reveal key={a.slug} delay={0.05 + i * 0.05}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`relative bg-gradient-to-br ${accentBg} px-6 pt-5 pb-4 border-b border-border`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg font-semibold">
                          {a.source}
                        </p>
                        <p className="font-mono text-[10px] text-fg-subtle mt-1">
                          {a.date} · {a.category}
                        </p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-fg-subtle group-hover:text-accent transition-colors shrink-0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-serif text-xl text-fg font-medium leading-tight mb-3 group-hover:text-accent transition-colors">
                      {a.title}
                    </h3>
                    <p className="font-sans text-sm text-fg-muted leading-relaxed mb-4">
                      {a.summary}
                    </p>
                    <div className="mt-auto pt-3 border-t border-border">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">
                        // takeaway
                      </p>
                      <p className="font-sans text-sm text-fg italic leading-relaxed">
                        &ldquo;{a.takeaway}&rdquo;
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-bg-elevated border border-border text-fg hover:border-accent hover:text-accent font-sans text-sm font-medium transition-all group"
          >
            <BookOpen size={14} />
            Read the full reading list
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
