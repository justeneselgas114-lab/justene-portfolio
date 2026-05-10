"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Check, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkImageGroup } from "@/lib/data/work";

export function GalleryTabs({
  groups,
  workTitle,
}: {
  groups: WorkImageGroup[];
  workTitle: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = groups[active];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isSingle = current.images.length === 1;

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent-soft/40 border border-accent/20">
            <Images size={16} className="text-accent" />
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium">
            Gallery
          </h2>
        </div>

        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className={cn(
              "group inline-flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-xl",
              "bg-gradient-to-b from-bg-elevated to-bg border border-border",
              "shadow-sm hover:border-accent/50 hover:shadow-md transition-all",
              "min-w-[260px] sm:min-w-[340px]",
              open && "border-accent/60 shadow-md"
            )}
          >
            <span className="flex-1 text-left min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                Section {active + 1} of {groups.length}
              </span>
              <span className="block font-sans text-sm font-medium text-fg truncate">
                {current.label}
              </span>
            </span>
            <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-accent-soft/40 text-accent border border-accent/30 shrink-0">
              {current.images.length} {current.images.length === 1 ? "img" : "imgs"}
            </span>
            <ChevronDown
              size={16}
              className={cn(
                "text-fg-muted transition-transform shrink-0",
                open && "rotate-180 text-accent"
              )}
            />
          </button>

          {open && (
            <div
              role="listbox"
              className={cn(
                "absolute right-0 top-full mt-2 z-20 w-[320px] sm:w-[400px]",
                "origin-top-right rounded-xl border border-border bg-bg",
                "shadow-2xl shadow-black/20 overflow-hidden",
                "transition-all duration-150"
              )}
            >
              <div className="px-4 py-2.5 border-b border-border bg-bg-elevated/60">
                <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                  Pick a section
                </p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {groups.map((g, i) => {
                  const selected = active === i;
                  return (
                    <button
                      key={g.label}
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setActive(i);
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 flex items-start gap-3 transition-colors",
                        "border-b border-border last:border-b-0",
                        selected
                          ? "bg-accent-soft/25"
                          : "hover:bg-bg-elevated"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-colors",
                          selected
                            ? "bg-accent text-bg"
                            : "bg-bg-elevated border border-border"
                        )}
                      >
                        {selected && <Check size={10} strokeWidth={3} />}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "block font-sans text-sm font-medium",
                            selected ? "text-accent" : "text-fg"
                          )}
                        >
                          {g.label}
                        </span>
                        {g.description && (
                          <span className="block font-sans text-xs text-fg-muted mt-1 line-clamp-2 leading-snug">
                            {g.description}
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[10px] text-fg-subtle shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-bg-elevated">
                        {g.images.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {current.description && (
        <div className="mb-6 max-w-3xl">
          <p className="font-sans text-sm text-fg-muted leading-relaxed">
            {current.description}
          </p>
        </div>
      )}

      <div
        className={cn(
          "grid gap-4 sm:gap-5",
          isSingle ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}
      >
        {current.images.map((src, i) => (
          <figure
            key={src}
            className={cn(
              "group relative rounded-xl overflow-hidden bg-bg-elevated",
              "border border-border hover:border-accent/40",
              "shadow-sm hover:shadow-lg transition-all duration-300"
            )}
          >
            <Image
              src={src}
              alt={`${workTitle} — ${current.label} screenshot ${i + 1}`}
              width={1920}
              height={1200}
              sizes={
                isSingle
                  ? "(max-width: 1280px) 100vw, 1024px"
                  : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              }
              className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.015]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <figcaption className="pointer-events-none absolute bottom-3 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center font-mono text-[10px] uppercase tracking-wider text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                {current.label} · {i + 1}/{current.images.length}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
