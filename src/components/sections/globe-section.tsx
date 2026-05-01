"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
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

export function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-muted py-16 sm:py-20"
    >
      <Reveal className="text-center mb-8">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
          Global Reach
        </p>
        <h2 className="font-serif text-3xl lg:text-4xl text-fg font-medium">
          Working Worldwide
        </h2>
      </Reveal>

      <div className="relative mx-auto w-[min(600px,90vw)] md:w-[700px] lg:w-[800px] aspect-square">
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
    </section>
  );
}
