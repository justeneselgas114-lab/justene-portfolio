"use client";

import { useState } from "react";
import Image from "next/image";
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
  const current = groups[active];

  return (
    <div>
      <h2 className="font-serif text-2xl lg:text-3xl text-fg font-medium mb-4">
        Gallery
      </h2>

      <div
        role="tablist"
        className="inline-flex p-1 rounded-full bg-bg-elevated border border-border mb-3"
      >
        {groups.map((g, i) => (
          <button
            key={g.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm font-medium transition-all",
              active === i
                ? "bg-accent text-bg shadow-sm"
                : "text-fg-muted hover:text-fg"
            )}
          >
            <span>{g.label}</span>
            <span
              className={cn(
                "font-mono text-[10px] px-1.5 py-0.5 rounded",
                active === i ? "bg-bg/20 text-bg" : "bg-bg text-fg-subtle"
              )}
            >
              {g.images.length}
            </span>
          </button>
        ))}
      </div>

      {current.description && (
        <p className="font-sans text-sm text-fg-muted leading-relaxed mb-5 max-w-2xl">
          {current.description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {current.images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[16/10] rounded-lg overflow-hidden bg-bg-elevated border border-border"
          >
            <Image
              src={src}
              alt={`${workTitle} — ${current.label} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
