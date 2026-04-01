"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { useSpring, useMotionValue } from "framer-motion";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [14.5995, 120.9842], size: 0.03 },
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

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const rafRef = useRef<number>(0);

  const dragOffset = useMotionValue(0);
  const springOffset = useSpring(dragOffset, {
    mass: 1,
    stiffness: 280,
    damping: 40,
  });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - startX.current;
      dragOffset.set(delta / 200);
    },
    [dragOffset]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    phiRef.current += springOffset.get();
    dragOffset.set(0);
  }, [dragOffset, springOffset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.offsetWidth;

    const onResize = () => {
      if (!canvas) return;
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
      diffuse: 0.8,
      mapSamples: 16000,
      mapBrightness: 1.8,
      mapBaseBrightness: 0.01,
      baseColor: [0.95, 0.95, 0.97],
      markerColor: [0.145, 0.388, 0.922],
      glowColor: [0.82, 0.82, 0.86],
      markers: MARKERS,
    });

    globeRef.current = globe;

    // Animation loop
    const animate = () => {
      if (!isDragging.current) {
        phiRef.current += 0.005;
      }
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
  }, [springOffset]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0f] py-12 sm:py-16">
      {/* Section label */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sm mb-2">
          Global Reach
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Working Worldwide
        </h2>
      </div>

      {/* Globe wrapper */}
      <div className="relative w-[min(600px,90vw)] md:w-[700px] lg:w-[800px] aspect-square">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-full transition-opacity duration-1000"
          style={{
            opacity: 0,
            aspectRatio: "1",
            contain: "layout paint size",
            cursor: "grab",
          }}
        />

        {/* Light mode gradient fade */}
        <div
          className="absolute inset-0 pointer-events-none dark:hidden"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.6) 55%, #FFFFFF 75%)",
          }}
        />
        {/* Dark mode gradient fade */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(10,10,15,0.6) 55%, #0a0a0f 75%)",
          }}
        />
      </div>
    </section>
  );
}
