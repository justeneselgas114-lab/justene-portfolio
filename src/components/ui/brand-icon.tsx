import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandIconProps {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Brand SVG icons sourced from thesvg.org (public/icons/<name>.svg).
 * Uses `<img>` semantics so brand colors render natively.
 */
export function BrandIcon({ name, size = 18, className, alt }: BrandIconProps) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt={alt ?? name}
      width={size}
      height={size}
      className={cn("inline-block", className)}
      unoptimized
    />
  );
}
