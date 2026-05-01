import { cn } from "@/lib/utils";

/**
 * Technical decorative motifs. Renders as `position: absolute; inset: 0`,
 * so the **parent must be `position: relative`** (or other positioned
 * context) for the elements to anchor correctly.
 *
 * Mix of crosshair markers, code brackets, and accent dots — gives the hero
 * a developer/IDE feel without overloading the canvas.
 */
export function DecorCircles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Top-right: crosshair marker */}
      <div className="absolute top-28 right-12 lg:right-24">
        <svg width="56" height="56" viewBox="0 0 56 56" className="text-accent/60">
          <circle cx="28" cy="28" r="3" fill="currentColor" />
          <line x1="28" y1="0" x2="28" y2="18" stroke="currentColor" strokeWidth="1" />
          <line x1="28" y1="38" x2="28" y2="56" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="28" x2="18" y2="28" stroke="currentColor" strokeWidth="1" />
          <line x1="38" y1="28" x2="56" y2="28" stroke="currentColor" strokeWidth="1" />
          <circle cx="28" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        </svg>
      </div>

      {/* Top-right corner brackets */}
      <div className="absolute top-28 right-32 lg:right-44 font-mono text-xs text-fg-subtle/50 select-none">
        <span>[01]</span>
      </div>

      {/* Mid-right: angle bracket */}
      <div className="absolute top-1/2 right-8 font-mono text-2xl text-fg-subtle/30 select-none -translate-y-1/2">
        &lt;/&gt;
      </div>

      {/* Bottom-right: small accent dot */}
      <div className="absolute bottom-24 right-32 w-1.5 h-1.5 rounded-full bg-accent" />

      {/* Top-left: small mono index */}
      <div className="absolute top-28 left-8 lg:left-16 font-mono text-xs text-fg-subtle/60 select-none">
        <span className="text-accent">~</span> ./hero
      </div>

      {/* Bottom-left: code-bracket motif */}
      <div className="absolute bottom-28 left-8 lg:left-16 font-mono text-xs text-fg-subtle/40 select-none flex flex-col gap-1">
        <span className="text-accent">{"{"}</span>
        <span className="ml-3 opacity-60">stack: [...]</span>
        <span className="ml-3 opacity-60">deployed: true</span>
        <span className="text-accent">{"}"}</span>
      </div>

      {/* Decorative scan line */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
