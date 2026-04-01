"use client";

import { motion } from "framer-motion";

// Deterministic pseudo-random generator (same output on server & client)
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const floatingOrbs = [
  { size: 600, x: "10%", y: "5%", color: "bg-blue-500/[0.04] dark:bg-blue-500/[0.07]", duration: 25, delay: 0 },
  { size: 500, x: "70%", y: "15%", color: "bg-indigo-500/[0.04] dark:bg-indigo-500/[0.06]", duration: 30, delay: 2 },
  { size: 400, x: "40%", y: "60%", color: "bg-cyan-500/[0.03] dark:bg-cyan-500/[0.05]", duration: 20, delay: 5 },
  { size: 450, x: "80%", y: "70%", color: "bg-purple-500/[0.03] dark:bg-purple-500/[0.05]", duration: 28, delay: 3 },
  { size: 350, x: "20%", y: "80%", color: "bg-blue-400/[0.03] dark:bg-blue-400/[0.05]", duration: 22, delay: 7 },
];

function generateParticles() {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: `${seededRandom(i * 7 + 1) * 100}%`,
    y: `${seededRandom(i * 7 + 2) * 100}%`,
    size: seededRandom(i * 7 + 3) * 3 + 1,
    duration: seededRandom(i * 7 + 4) * 15 + 10,
    delay: seededRandom(i * 7 + 5) * 10,
    opacity: seededRandom(i * 7 + 6) * 0.3 + 0.1,
    xDrift: seededRandom(i * 7 + 7) > 0.5 ? 30 : -30,
  }));
}

function generateGridLines() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    isVertical: i >= 6,
    position: `${((i % 6) + 1) * (100 / 7)}%`,
    duration: seededRandom(i * 3 + 100) * 3 + 4,
    delay: seededRandom(i * 3 + 101) * 5,
  }));
}

const particles = generateParticles();
const gridLines = generateGridLines();

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated grid pattern */}
      <div className="absolute inset-0">
        {gridLines.map((line) => (
          <motion.div
            key={`grid-${line.id}`}
            className={`absolute ${
              line.isVertical
                ? "w-px h-full bg-gradient-to-b from-transparent via-blue-500/[0.03] dark:via-blue-500/[0.06] to-transparent"
                : "h-px w-full bg-gradient-to-r from-transparent via-blue-500/[0.03] dark:via-blue-500/[0.06] to-transparent"
            }`}
            style={line.isVertical ? { left: line.position } : { top: line.position }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Large floating gradient orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full ${orb.color} blur-[120px]`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -60, 40, -80, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating micro-particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-blue-400 dark:bg-blue-400"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: 0,
          }}
          animate={{
            y: [0, -120, -240],
            x: [0, p.xDrift, 0],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
    </div>
  );
}
