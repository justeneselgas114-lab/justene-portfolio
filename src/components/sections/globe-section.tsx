"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [14.5995, 120.9842], size: 0.06 }, // Manila
  { location: [7.1907, 125.4553], size: 0.05 }, // Davao
  { location: [19.076, 72.8777], size: 0.05 },
  { location: [23.8103, 90.4125], size: 0.03 },
  { location: [30.0444, 31.2357], size: 0.04 },
  { location: [39.9042, 116.4074], size: 0.06 },
  { location: [-23.5505, -46.6333], size: 0.05 },
  { location: [19.4326, -99.1332], size: 0.04 },
  { location: [40.7128, -74.006], size: 0.07 },
  { location: [34.6937, 135.5022], size: 0.04 },
  { location: [41.0082, 28.9784], size: 0.04 },
  { location: [51.5074, -0.1278], size: 0.06 },
  { location: [48.8566, 2.3522], size: 0.05 },
];

// Placeholder testimonials — replace with real client quotes
const TESTIMONIALS = [
  {
    quote: "Justene cut our lead response time from 3 hours to 30 seconds. The AI receptionist just works.",
    author: "Marketing Lead",
    location: "Davao City, PH",
  },
  {
    quote: "Shipped our restaurant site in 10 days. Bookings up 60% in the first month.",
    author: "Restaurant Owner",
    location: "Panabo City, PH",
  },
  {
    quote: "Best automation engineer we've worked with. Discovery calls doubled after the rebuild.",
    author: "Agency Founder",
    location: "Manila, PH",
  },
  {
    quote: "Our institutional inquiries jumped 150% — Justene shipped a credible site that converts.",
    author: "Director",
    location: "Singapore",
  },
  {
    quote: "Hired him for one workflow. Came back for three more. Reliable, fast, no fluff.",
    author: "Operations Manager",
    location: "Sydney, AU",
  },
  {
    quote: "Replaced three SaaS tools with one n8n pipeline. Saving us $1.2k/month and zero downtime.",
    author: "CTO",
    location: "Berlin, DE",
  },
  {
    quote: "Our SDR team is 4x more productive — Justene's lead enrichment agent runs while we sleep.",
    author: "Head of Sales",
    location: "London, UK",
  },
  {
    quote: "Claude Code expert. Refactored our codebase in days, not weeks. Communicates in plain English.",
    author: "Engineering Manager",
    location: "Toronto, CA",
  },
  {
    quote: "We pitched the AI chatbot on Friday, it was live by Tuesday. Conversion rate up 38%.",
    author: "Growth Lead",
    location: "Dubai, AE",
  },
  {
    quote: "The receipt extractor saved our finance team 12 hours/week. Wish we'd hired him sooner.",
    author: "Finance Director",
    location: "Tokyo, JP",
  },
];

export function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const phiRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const rafRef = useRef<number>(0);
  const dragOffset = useMotionValue(0);
  const springOffset = useSpring(dragOffset, { mass: 1, stiffness: 280, damping: 40 });

  // Gate mount on viewport entry
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  // Cycle testimonial every 5s while section is mounted
  useEffect(() => {
    if (!shouldMount) return;
    const id = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [shouldMount]);

  const handleDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handleMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      dragOffset.set((e.clientX - startX.current) / 200);
    },
    [dragOffset]
  );

  const handleUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    phiRef.current += springOffset.get();
    dragOffset.set(0);
  }, [dragOffset, springOffset]);

  // Mount cobe only when shouldMount = true
  useEffect(() => {
    if (!shouldMount) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;
    const onResize = () => {
      width = canvas.offsetWidth;
      canvas.width = width * 2;
      canvas.height = width * 2;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const fadeTimeout = setTimeout(() => {
      canvas.style.opacity = "1";
    }, 100);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.0,
      mapSamples: 16000,
      mapBrightness: 1.6,
      mapBaseBrightness: 0.05,
      baseColor: [0.96, 0.94, 0.9],
      markerColor: [0.55, 0.35, 0.17],
      glowColor: [0.85, 0.8, 0.7],
      markers: MARKERS,
    });

    const animate = () => {
      if (!isDragging.current) phiRef.current += 0.005;
      globe.update({
        phi: phiRef.current + springOffset.get(),
        width: width * 2,
        height: width * 2,
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      globe.destroy();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      clearTimeout(fadeTimeout);
    };
  }, [shouldMount, springOffset]);

  const current = TESTIMONIALS[testimonialIdx];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-muted py-16 sm:py-20 overflow-hidden"
    >
      <Reveal className="text-center mb-8">
        <p className="font-mono text-xs text-accent mb-3">
          // 05 — geo.reach
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-fg font-medium">
          Working Worldwide
        </h2>
        <p className="font-sans text-sm text-fg-muted mt-3 max-w-md mx-auto">
          Real feedback from clients across the regions I&apos;ve shipped to.
        </p>
      </Reveal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_auto_1fr] items-center gap-8">
        {/* Left testimonial slot (desktop) */}
        <div className="hidden lg:flex justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.location + "-l"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xs"
            >
              <p className="font-mono text-xs text-accent mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {current.location}
              </p>
              <p className="font-serif text-lg lg:text-xl text-fg leading-snug italic">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="font-sans text-sm text-fg-muted mt-3">
                — {current.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Globe canvas */}
        <div className="relative mx-auto w-[min(560px,90vw)] md:w-[640px] lg:w-[680px] aspect-square">
          {shouldMount && (
            <canvas
              ref={canvasRef}
              onPointerDown={handleDown}
              onPointerMove={handleMove}
              onPointerUp={handleUp}
              onPointerLeave={handleUp}
              className="w-full h-full transition-opacity duration-1000"
              style={{
                opacity: 0,
                aspectRatio: "1",
                contain: "layout paint size",
                cursor: "grab",
              }}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, var(--bg-muted) 75%)",
            }}
          />
        </div>

        {/* Right testimonial slot — desktop placeholder, mobile = inline */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Mobile testimonial — full-width below globe */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.location + "-m"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto px-4 text-center"
            >
              <p className="font-mono text-xs text-accent mb-2 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {current.location}
              </p>
              <p className="font-serif text-base text-fg leading-snug italic">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="font-sans text-sm text-fg-muted mt-2">
                — {current.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setTestimonialIdx(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === testimonialIdx ? "w-6 bg-accent" : "w-1.5 bg-fg-subtle/40 hover:bg-fg-subtle/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
