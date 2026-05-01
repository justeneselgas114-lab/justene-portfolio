"use client";

import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DecorCircles } from "@/components/ui/decor-circles";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] flex flex-col pt-24 overflow-hidden"
    >
      <DecorCircles />

      {/* Inner content fills remaining space, vertically centered */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1.2fr)_1fr] gap-8 lg:gap-12 items-center">
          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <p className="font-serif italic text-4xl lg:text-5xl text-fg font-light leading-tight">
              Hi,
            </p>
            <h1 className="font-serif italic text-5xl lg:text-7xl font-light leading-tight mt-2">
              <span className="text-fg">I&apos;m </span>
              <span className="text-accent">Justene</span>
            </h1>
            <p className="font-sans text-lg lg:text-xl text-fg-muted mt-6">
              AI Specialist &amp; Automation Expert
            </p>
            <Button asChild size="lg" className="mt-8 group">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Hire Me
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* CENTER - mobile inline photo (hidden on desktop; desktop photo is absolute below) */}
          <div className="order-1 lg:order-2 flex justify-center lg:hidden">
            <div className="relative aspect-[2/3] w-full max-w-md">
              <Image
                src="/profile.png"
                alt="Justene Selgas"
                fill
                priority
                sizes="90vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-3 lg:order-3 lg:col-start-3">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium">
              Expert on
            </p>
            <p className="font-serif text-2xl lg:text-3xl text-fg leading-snug mt-3">
              Based in Davao City, I build AI workflows and modern web experiences.
            </p>
            <p className="font-sans text-base text-fg-muted leading-relaxed mt-5 max-w-sm">
              Looking for someone to automate your business and grow faster? Let&apos;s build something together.
            </p>
            <a
              href="/cv-justene-selgas.pdf"
              download
              className="inline-flex items-center gap-2 mt-6 font-sans text-sm text-accent hover:text-accent-hover underline underline-offset-4"
            >
              Download CV
              <Download size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop photo — absolute, anchored to section bottom-center */}
      <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[42vw] max-w-2xl aspect-[2/3] z-10 pointer-events-none">
        <Image
          src="/profile.png"
          alt="Justene Selgas"
          fill
          priority
          sizes="42vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Bottom strip — sits at section bottom in flow, on top of photo */}
      <div className="hidden lg:block relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <a
            href="mailto:theconceptlogin@gmail.com"
            className="flex items-center gap-2 text-sm text-fg-muted hover:text-accent transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            theconceptlogin@gmail.com
          </a>
          <a
            href="https://wa.me/639638296973"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-fg-muted hover:text-accent transition-colors"
          >
            Let&apos;s Chat
            <FaWhatsapp size={16} className="text-green-600" />
          </a>
        </div>
      </div>
    </section>
  );
}
