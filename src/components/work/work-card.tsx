import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { WorkDetail } from "@/lib/data/work";

export function WorkCard({ work }: { work: WorkDetail }) {
  return (
    <Link
      href={`/work/${work.slug}`}
      prefetch
      className="group block"
    >
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-elevated mb-4">
        <Image
          src={work.thumbnail}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Chip variant="accent">
          {work.type === "automation" ? "Automation" : "Web"}
        </Chip>
        {work.nodes && (
          <span className="text-xs text-fg-subtle font-sans">{work.nodes} nodes</span>
        )}
        {work.type === "web" && work.tags[0] && (
          <span className="text-xs text-fg-subtle font-sans">{work.tags[0]}</span>
        )}
      </div>
      <h3 className="font-serif text-xl text-fg font-medium leading-snug">
        {work.title}
      </h3>
      <p className="font-sans text-sm text-fg-muted mt-2 line-clamp-2">
        {work.shortDescription}
      </p>
      <span className="inline-flex items-center gap-1 mt-3 font-sans text-sm text-accent group-hover:text-accent-hover">
        Read case study
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
