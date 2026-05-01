import { cn } from "@/lib/utils";

export function DecorCircles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Top-right: terracotta outline ring + tan dot overlap */}
      <div className="absolute top-12 right-12 lg:right-24">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-[#A0522D]/60" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-soft" />
        </div>
      </div>

      {/* Mid-right: solid muted-tan dot */}
      <div className="absolute top-1/2 right-6 lg:right-16 w-4 h-4 rounded-full bg-accent-soft/70" />

      {/* Top-left: large soft cream circle */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-bg-elevated/60 blur-2xl" />

      {/* Bottom-left: small cream circle */}
      <div className="absolute bottom-12 left-8 w-12 h-12 rounded-full bg-bg-elevated/50 blur-md" />

      {/* Bottom-right: small accent dot */}
      <div className="absolute bottom-24 right-32 w-2 h-2 rounded-full bg-accent" />
    </div>
  );
}
