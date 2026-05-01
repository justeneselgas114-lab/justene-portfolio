import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "muted" | "accent";
}

export function Chip({ className, variant = "default", ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium",
        variant === "default" && "bg-bg-muted text-fg-muted",
        variant === "muted" && "bg-bg-elevated text-fg-subtle",
        variant === "accent" && "bg-accent-soft/30 text-accent",
        className
      )}
      {...props}
    />
  );
}
