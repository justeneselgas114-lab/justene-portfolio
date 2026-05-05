import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ArticleCard } from "@/components/articles/article-card";
import { articles, featuredArticles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Articles — How Businesses Grow with AI",
  description:
    "Curated reading list of real, published articles from HBR, McKinsey, BCG, MIT Sloan, and Anthropic on how businesses are growing with AI agents, automation, and Claude.",
};

export default function ArticlesPage() {
  const featured = featuredArticles();
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const rest = articles.filter((a) => !featuredSlugs.has(a.slug));

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-fg-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>
        </div>

        {/* Hero */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <p className="font-mono text-xs text-accent mb-3">
            // articles.read()
          </p>
          <h1 className="font-serif text-4xl lg:text-6xl text-fg font-medium leading-tight max-w-4xl">
            How businesses actually grow with AI.
          </h1>
          <p className="font-sans text-lg text-fg-muted mt-5 max-w-2xl leading-relaxed">
            Curated, verified articles from{" "}
            <span className="text-fg font-medium">Harvard Business Review</span>,{" "}
            <span className="text-fg font-medium">McKinsey</span>,{" "}
            <span className="text-fg font-medium">BCG</span>,{" "}
            <span className="text-fg font-medium">MIT Sloan</span>, and{" "}
            <span className="text-fg font-medium">Anthropic</span> — on AI
            agents, automation ROI, and the operational changes that turn AI
            spend into actual revenue. Every link goes to the original
            publisher.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-fg-subtle px-3 py-1.5 rounded-full bg-bg-elevated border border-border">
              <BookOpen size={12} />
              {articles.length} articles
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-accent px-3 py-1.5 rounded-full bg-accent-soft/30 border border-accent/30">
              <Sparkles size={12} />
              Verified live · May 2026
            </span>
          </div>
        </header>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p className="font-mono text-xs text-accent mb-2">
                  // editors_pick
                </p>
                <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium">
                  Start here
                </h2>
              </div>
              <p className="hidden sm:block font-sans text-sm text-fg-muted">
                The four pieces I send to every client first
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {/* All others */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="font-mono text-xs text-accent mb-2">
              // deep_dives
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium">
              The rest of the reading list
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="rounded-3xl border border-border bg-bg-elevated p-8 lg:p-12 text-center">
            <p className="font-mono text-xs text-accent mb-3">
              // your_turn
            </p>
            <h3 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-3">
              Reading is step one. Building is step two.
            </h3>
            <p className="font-sans text-base text-fg-muted leading-relaxed max-w-2xl mx-auto mb-6">
              Every article above describes a pattern I&apos;ve already shipped
              somewhere — Octopulse, the AI Receptionist, the n8n workflow
              fleet. If you want the same systems in your business, let&apos;s
              talk.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg font-sans text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Book a free audit
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
