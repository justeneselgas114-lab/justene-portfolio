"use client";

import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecorCircles } from "@/components/ui/decor-circles";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen lg:h-screen flex flex-col pt-24 pb-12 lg:pb-0 overflow-hidden bg-grid-dots"
    >
      <DecorCircles />

      {/* Inner content fills remaining space, vertically centered */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1.7fr)_1.2fr] gap-8 lg:gap-12 items-center">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <p className="font-mono text-xs text-fg-subtle mb-4 flex items-center gap-2">
              <span className="text-accent">~/portfolio</span>
              <span>$</span>
              <span className="inline-block w-1.5 h-3.5 bg-accent animate-pulse" aria-hidden="true" />
            </p>
            <p className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-fg font-light leading-tight">
              Hi,
            </p>
            <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mt-2 lg:whitespace-nowrap">
              <span className="text-fg">I&apos;m </span>
              <span className="text-accent">Justene</span>
            </h1>
            <p className="font-sans text-lg lg:text-xl text-fg-muted mt-6">
              AI Automation Engineer · n8n + Claude Code
            </p>
            <div className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-fg-subtle">
              <span className="relative inline-flex">
                <span className="w-2 h-2 rounded-full bg-emerald-500 status-dot text-emerald-500" />
              </span>
              <span>available · 2 slots open this quarter</span>
            </div>
            <Button asChild size="lg" className="mt-8 group">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book a free audit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* CENTER - mobile inline photo (hidden on desktop; desktop photo is absolute below) */}
          <div className="order-1 lg:order-2 flex justify-center lg:hidden">
            <div className="relative aspect-[3/4] w-full max-w-[18rem] sm:max-w-xs">
              <Image
                src="/profile-v2.png"
                alt="Justene Selgas"
                fill
                priority
                sizes="80vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-3 lg:order-3 lg:col-start-3 lg:pl-12 max-w-sm lg:max-w-none">
            <p className="font-mono text-xs text-accent mb-3">
              &gt; what_i_build
            </p>
            <p className="font-serif text-2xl lg:text-3xl text-fg leading-snug">
              I build AI systems that capture, qualify, and close leads — 24/7, on autopilot.
            </p>
            <p className="font-sans text-base text-fg-muted leading-relaxed mt-5">
              Trusted by Philippine agencies, restaurants, and education institutes. n8n workflows to production websites — shipped end-to-end, no handoffs.
            </p>
            <a
              href="/cv-justene-selgas.pdf"
              download
              className="inline-flex items-center gap-2 mt-6 font-sans text-sm text-accent hover:text-accent-hover underline underline-offset-4"
            >
              Download my CV
              <Download size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop photo — absolute, anchored to section bottom (cut hides in About transition) */}
      <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 h-[88vh] aspect-[2/3] z-10 pointer-events-none">
        <Image
          src="/profile-v2.png"
          alt="Justene Selgas"
          fill
          priority
          sizes="(min-width: 1024px) 38vw, 90vw"
          className="object-contain object-bottom"
        />
      </div>

    </section>
  );
}
