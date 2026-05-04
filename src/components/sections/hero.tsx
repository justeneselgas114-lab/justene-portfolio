"use client";

import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecorCircles } from "@/components/ui/decor-circles";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen lg:sticky lg:top-0 lg:h-screen lg:z-0 flex flex-col pt-24 pb-12 lg:pb-0 overflow-hidden bg-grid-dots"
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
            <p className="font-sans text-base lg:text-lg text-fg-muted mt-6 leading-relaxed">
              Junior Full-Stack Developer · n8n Integrations Specialist
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft/30 border border-accent/30">
              <Image
                src="/icons/claude.svg"
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="w-4 h-4"
                unoptimized
              />
              <span className="font-mono text-xs sm:text-sm text-accent font-medium tracking-wide">
                Claude AI Specialist
              </span>
            </div>
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

          {/* CENTER - mobile inline photo (sticky on mobile so image stays put while text scrolls) */}
          <div className="order-1 lg:order-2 flex justify-center lg:hidden sticky top-[88px] self-start" style={{ zIndex: 30 }}>
            <div
              className="relative aspect-[2/3] w-[70vw] max-w-xs"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
              }}
            >
              <Image
                src="/profile-v2.png"
                alt="Justene Selgas"
                fill
                priority
                sizes="70vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-3 lg:order-3 lg:col-start-3 lg:pl-12 w-full max-w-sm mx-auto lg:max-w-none lg:mx-0 p-5 sm:p-6 rounded-2xl bg-bg-elevated/70 backdrop-blur-sm border border-border lg:p-0 lg:rounded-none lg:bg-transparent lg:border-0 lg:backdrop-blur-none">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px flex-1 bg-border lg:hidden" />
              <p className="font-mono text-[11px] text-accent tracking-wide">
                &gt; what_i_build
              </p>
              <span className="h-px flex-1 bg-border lg:hidden" />
            </div>
            <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-fg leading-snug text-center lg:text-left">
              I build systems that cut hours off your team&apos;s day — and scale revenue without adding headcount.
            </p>
            <p className="font-sans text-sm sm:text-base text-fg-muted leading-relaxed mt-4 lg:mt-5 text-center lg:text-left">
              Manual handoffs, repetitive tasks, scattered tools — I turn them into one quiet pipeline. Your team focuses on what only humans can do.
            </p>
            <div className="mt-5 lg:mt-6 flex justify-center lg:justify-start">
              <a
                href="/Justene_Resume.pdf"
                download
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent hover:text-accent-hover px-4 py-2 rounded-full bg-bg border border-border lg:px-0 lg:py-0 lg:rounded-none lg:bg-transparent lg:border-0 lg:underline lg:underline-offset-4"
              >
                Download my CV
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Claude logo backdrop — large, faint, behind photo */}
      <Image
        src="/icons/claude.svg"
        alt=""
        aria-hidden="true"
        width={400}
        height={400}
        unoptimized
        className="hidden lg:block absolute bottom-[35vh] left-1/2 -translate-x-1/2 w-[28vw] max-w-md h-auto opacity-[0.06] z-[5] pointer-events-none"
      />

      {/* Desktop photo — absolute, anchored to section bottom + gradient mask to fade cut */}
      <div
        className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 h-[88vh] aspect-[2/3] z-10 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
        }}
      >
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
