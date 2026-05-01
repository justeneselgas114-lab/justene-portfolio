import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { WorkGrid } from "@/components/sections/work-grid";
import { GlobeSection } from "@/components/sections/globe-section";
import { Contact } from "@/components/sections/contact";
import type { WorkType } from "@/lib/data/work";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const validType: WorkType | undefined =
    type === "automation" || type === "web" ? type : undefined;

  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <WorkGrid type={validType} />
        <GlobeSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
