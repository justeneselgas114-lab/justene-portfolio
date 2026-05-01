import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { WorkGrid } from "@/components/sections/work-grid";
import { GlobeSection } from "@/components/sections/globe-section";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <WorkGrid />
        <GlobeSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
