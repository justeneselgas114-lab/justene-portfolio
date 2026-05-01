"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All", value: undefined },
  { label: "Automation", value: "automation" },
  { label: "Web", value: "web" },
];

export function WorkFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const current = params.get("type") ?? undefined;

  function setFilter(value: string | undefined) {
    const next = new URLSearchParams(params);
    if (value) next.set("type", value);
    else next.delete("type");
    startTransition(() => {
      router.replace(`/?${next.toString()}#work`, { scroll: false });
    });
  }

  return (
    <div className="flex justify-center gap-2 mb-12" role="tablist">
      {filters.map((f) => {
        const active = current === f.value;
        return (
          <button
            key={f.label}
            role="tab"
            aria-selected={active}
            onClick={() => setFilter(f.value)}
            disabled={isPending}
            className={cn(
              "px-5 py-2 rounded-full font-sans text-sm font-medium transition-all",
              active
                ? "bg-accent text-bg"
                : "bg-bg-elevated text-fg-muted hover:bg-accent-soft/30 hover:text-fg"
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
