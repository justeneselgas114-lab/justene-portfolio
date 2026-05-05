import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { WorkGrid } from "@/components/sections/work-grid";
import { GlobeSection } from "@/components/sections/globe-section";
import { Contact } from "@/components/sections/contact";
import { FeaturedArticles } from "@/components/sections/featured-articles";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <div className="relative z-10 bg-bg shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.08)]">
          <About />
          <Experience />
          <Skills />
          <WorkGrid />
          <GlobeSection />
          <Contact />
          <FeaturedArticles />
        </div>
      </main>
      <Footer />
    </>
  );
}
