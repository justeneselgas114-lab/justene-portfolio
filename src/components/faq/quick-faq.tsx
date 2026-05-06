"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HelpCircle, X, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faq, getQuestionBySlug, type FaqCategory, type FaqQuestion } from "@/lib/data/faq";
import { cn } from "@/lib/utils";

type View =
  | { kind: "categories" }
  | { kind: "questions"; categorySlug: string }
  | { kind: "answer"; questionSlug: string; categorySlug: string };

export function QuickFAQ() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>({ kind: "categories" });
  const [hintVisible, setHintVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open || dismissed) {
      setHintVisible(false);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setHintVisible(true);
      t = setTimeout(() => setHintVisible(false), 3000);
    }, 6000);
    const first = setTimeout(() => {
      setHintVisible(true);
      t = setTimeout(() => setHintVisible(false), 3000);
    }, 1500);
    return () => {
      clearInterval(interval);
      clearTimeout(t);
      clearTimeout(first);
    };
  }, [open, dismissed]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [view]);

  function handleCtaClick(href: string) {
    if (href.startsWith("#")) {
      setOpen(false);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (!el) {
          window.location.hash = href;
          return;
        }
        const offset = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }, 280);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close FAQ" : "Open Quick FAQ"}
        className={cn(
          "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex items-center bg-accent text-bg shadow-lg shadow-accent/30 transition-all hover:scale-[1.03] hover:bg-accent-hover",
          open
            ? "h-14 w-14 rounded-full justify-center"
            : "h-14 w-14 sm:w-auto sm:pl-4 sm:pr-5 rounded-full justify-center sm:gap-2.5 group"
        )}
      >
        {open ? (
          <X size={22} />
        ) : (
          <>
            <span className="relative flex">
              <HelpCircle size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-accent" />
            </span>
            <span className="hidden sm:inline font-sans text-sm font-medium whitespace-nowrap">
              Quick FAQ
            </span>
          </>
        )}
      </button>

      <AnimatePresence>
        {hintVisible && !open && !dismissed && (
          <motion.div
            key="faq-hint"
            initial={{ opacity: 0, x: 24, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-7 right-24 sm:right-[10.5rem] z-[59] flex items-center gap-2"
          >
            <div className="relative bg-bg-elevated border border-border rounded-xl shadow-lg px-3.5 py-2.5 max-w-[200px]">
              <p className="font-sans text-xs text-fg leading-snug">
                Got a question? Quick answers here.
              </p>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss hint"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-fg text-bg flex items-center justify-center text-[10px] hover:bg-accent transition-colors"
              >
                <X size={10} />
              </button>
              <span className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-bg-elevated" />
            </div>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent text-lg"
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="faq-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            role="dialog"
            aria-label="Quick FAQ"
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] sm:w-[26rem] h-[34rem] max-h-[calc(100vh-8rem)] rounded-2xl border border-border bg-bg-elevated shadow-2xl flex flex-col overflow-hidden"
          >
            <FaqHeader view={view} onBack={(next) => setView(next)} />
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
              {view.kind === "categories" && (
                <CategoriesView onPick={(slug) => setView({ kind: "questions", categorySlug: slug })} />
              )}
              {view.kind === "questions" && (
                <QuestionsView
                  category={faq.find((c) => c.slug === view.categorySlug)!}
                  onPick={(qSlug) =>
                    setView({ kind: "answer", questionSlug: qSlug, categorySlug: view.categorySlug })
                  }
                />
              )}
              {view.kind === "answer" && (
                <AnswerView
                  question={getQuestionBySlug(view.questionSlug)!}
                  categorySlug={view.categorySlug}
                  onJump={(qSlug, catSlug) =>
                    setView({ kind: "answer", questionSlug: qSlug, categorySlug: catSlug })
                  }
                  onCta={handleCtaClick}
                />
              )}
            </div>
            <FaqFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FaqHeader({
  view,
  onBack,
}: {
  view: View;
  onBack: (next: View) => void;
}) {
  return (
    <div className="px-4 py-3 border-b border-border bg-bg flex items-center gap-3">
      {view.kind !== "categories" && (
        <button
          onClick={() => {
            if (view.kind === "answer") {
              onBack({ kind: "questions", categorySlug: view.categorySlug });
            } else if (view.kind === "questions") {
              onBack({ kind: "categories" });
            }
          }}
          aria-label="Back"
          className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-fg-muted hover:bg-bg-elevated hover:text-fg transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
      )}
      <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center">
        <HelpCircle size={18} className="text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-serif text-sm text-fg font-medium leading-tight">Quick FAQ</p>
        <p className="font-mono text-[10px] text-fg-subtle leading-tight mt-0.5 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          static answers · no AI cost
        </p>
      </div>
    </div>
  );
}

function FaqFooter() {
  return (
    <div className="border-t border-border px-4 py-2.5 bg-bg flex items-center justify-between">
      <p className="font-mono text-[10px] text-fg-subtle">
        Can&apos;t find your answer?
      </p>
      <Link
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          const el = document.querySelector("#contact");
          if (el) {
            const offset = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        }}
        className="font-sans text-xs font-medium text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
      >
        Message me
        <ArrowRight size={11} />
      </Link>
    </div>
  );
}

function CategoriesView({ onPick }: { onPick: (slug: string) => void }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] text-fg-subtle px-1 mb-2 uppercase tracking-wider">
        Pick a topic
      </p>
      {faq.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onPick(cat.slug)}
          className="w-full text-left p-3 rounded-xl border border-border hover:border-accent/40 hover:bg-bg transition-colors group"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none mt-0.5" aria-hidden="true">
              {cat.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-sans text-sm font-medium text-fg">
                  {cat.title}
                </p>
                <span className="font-mono text-[10px] text-fg-subtle bg-bg-elevated px-1.5 py-0.5 rounded">
                  {cat.questions.length}
                </span>
              </div>
              <p className="font-sans text-[11px] text-fg-muted mt-0.5 leading-snug">
                {cat.blurb}
              </p>
            </div>
            <ChevronRight
              size={14}
              className="text-fg-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all mt-1"
            />
          </div>
        </button>
      ))}
    </div>
  );
}

function QuestionsView({
  category,
  onPick,
}: {
  category: FaqCategory;
  onPick: (slug: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="px-1 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">
            {category.icon}
          </span>
          <p className="font-serif text-base text-fg font-medium">
            {category.title}
          </p>
        </div>
        <p className="font-sans text-[11px] text-fg-muted mt-1">
          {category.blurb}
        </p>
      </div>
      {category.questions.map((q) => (
        <button
          key={q.slug}
          onClick={() => onPick(q.slug)}
          className="w-full text-left px-3 py-2.5 rounded-lg border border-border hover:border-accent/40 hover:bg-bg transition-colors flex items-start gap-2 group"
        >
          <span className="text-accent mt-0.5 shrink-0 text-xs">▸</span>
          <span className="flex-1 font-sans text-sm text-fg leading-snug">
            {q.question}
          </span>
          <ChevronRight
            size={12}
            className="text-fg-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
          />
        </button>
      ))}
    </div>
  );
}

function AnswerView({
  question,
  categorySlug,
  onJump,
  onCta,
}: {
  question: FaqQuestion;
  categorySlug: string;
  onJump: (qSlug: string, catSlug: string) => void;
  onCta: (href: string) => void;
}) {
  const paragraphs = question.answer.split("\n\n");
  const relatedQuestions =
    question.related
      ?.map((slug) => {
        const cat = faq.find((c) => c.questions.some((q) => q.slug === slug));
        const q = getQuestionBySlug(slug);
        if (!cat || !q) return null;
        return { question: q, categorySlug: cat.slug };
      })
      .filter((x): x is { question: FaqQuestion; categorySlug: string } => x !== null) ?? [];

  return (
    <div>
      <p className="font-serif text-base text-fg font-medium leading-snug mb-3">
        {question.question}
      </p>
      <div className="space-y-2.5">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-sans text-sm text-fg-muted leading-relaxed whitespace-pre-line"
          >
            {p}
          </p>
        ))}
      </div>

      {question.cta &&
        (question.cta.href.startsWith("http") ? (
          <a
            href={question.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-bg font-sans text-xs font-medium hover:bg-accent-hover transition-colors"
          >
            {question.cta.label}
            <ArrowRight size={12} />
          </a>
        ) : (
          <button
            onClick={() => onCta(question.cta!.href)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-bg font-sans text-xs font-medium hover:bg-accent-hover transition-colors"
          >
            {question.cta.label}
            <ArrowRight size={12} />
          </button>
        ))}

      {relatedQuestions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mb-2">
            Related questions
          </p>
          <div className="space-y-1.5">
            {relatedQuestions.map(({ question: rq, categorySlug: cs }) => (
              <button
                key={rq.slug}
                onClick={() => onJump(rq.slug, cs)}
                className="w-full text-left px-3 py-2 rounded-lg border border-border hover:border-accent/40 hover:bg-bg transition-colors flex items-start gap-2 text-xs text-fg"
              >
                <span className="text-accent mt-0.5 shrink-0">▸</span>
                <span className="flex-1 font-sans leading-snug">
                  {rq.question}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <p className="font-mono text-[10px] text-fg-subtle">
          Browsing category:{" "}
          <span className="text-fg-muted">
            {faq.find((c) => c.slug === categorySlug)?.title}
          </span>
        </p>
      </div>
    </div>
  );
}
