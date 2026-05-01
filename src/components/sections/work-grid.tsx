import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/work/work-card";
import { WorkFilter } from "./work-filter";
import { getWorkByType, type WorkType } from "@/lib/data/work";

interface WorkGridProps {
  type?: WorkType;
}

export function WorkGrid({ type }: WorkGridProps) {
  const items = getWorkByType(type);

  return (
    <section id="work" className="py-24 bg-bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-xs text-accent mb-3">
            // 03 — projects/
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
            Featured Projects
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Automation systems and web applications I&apos;ve designed, built, and shipped.
          </p>
        </Reveal>

        <WorkFilter />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={i * 0.05}>
              <WorkCard work={w} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
