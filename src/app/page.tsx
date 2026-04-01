"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Automations from "@/components/automations";
import WebProjects from "@/components/webprojects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Globe from "@/components/globe";
import CursorEffect from "@/components/cursor-effect";
import AnimatedBackground from "@/components/animated-background";

export default function Home() {
  return (
    <div className="relative bg-white dark:bg-[#0a0a0f]">
      <AnimatedBackground />
      <CursorEffect />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Automations />
        <WebProjects />
        <Contact />
      </main>
      <Globe />
      <Footer />
    </div>
  );
}
