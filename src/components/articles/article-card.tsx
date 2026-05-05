import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { Article } from "@/lib/data/articles";

const sourceAccent: Record<string, string> = {
  HBR: "from-rose-500/15 to-rose-500/5",
  McKinsey: "from-blue-500/15 to-blue-500/5",
  BCG: "from-emerald-500/15 to-emerald-500/5",
  "MIT Sloan": "from-amber-500/15 to-amber-500/5",
  Anthropic: "from-accent/20 to-accent/5",
};

export function ArticleCard({
  article,
  variant = "default",
}: {
  article: Article;
  variant?: "default" | "featured";
}) {
  const accentBg = sourceAccent[article.sourceShort] ?? "from-fg/10 to-fg/0";

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        variant === "featured" ? "lg:col-span-2" : ""
      }`}
    >
      {/* Source banner */}
      <div
        className={`relative bg-gradient-to-br ${accentBg} px-6 pt-5 pb-4 border-b border-border`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg font-semibold">
              {article.source}
            </p>
            <p className="font-mono text-[10px] text-fg-subtle mt-1">
              {article.date}
            </p>
          </div>
          <ExternalLink
            size={16}
            className="text-fg-subtle group-hover:text-accent transition-colors shrink-0"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          <Chip variant="accent">{article.category}</Chip>
          {article.featured && (
            <Chip variant="muted">Editor&apos;s pick</Chip>
          )}
        </div>

        <h3 className="font-serif text-xl lg:text-2xl text-fg font-medium leading-tight mb-3 group-hover:text-accent transition-colors">
          {article.title}
        </h3>

        <p className="font-sans text-sm text-fg-muted leading-relaxed mb-4">
          {article.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-border">
          <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1.5">
            // takeaway
          </p>
          <p className="font-sans text-sm text-fg leading-relaxed italic">
            &ldquo;{article.takeaway}&rdquo;
          </p>
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent">
          Read on {article.sourceShort}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </a>
  );
}
