"use client";

import { motion } from "framer-motion";

// Deterministic pseudo-random generator (same output on server & client)
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const floatingOrbs = [
  { size: 700, x: "5%", y: "0%", color: "bg-blue-500/[0.08] dark:bg-blue-500/[0.15]", duration: 20, delay: 0 },
  { size: 600, x: "65%", y: "10%", color: "bg-indigo-500/[0.07] dark:bg-indigo-500/[0.12]", duration: 25, delay: 1 },
  { size: 550, x: "35%", y: "50%", color: "bg-cyan-500/[0.06] dark:bg-cyan-500/[0.10]", duration: 18, delay: 3 },
  { size: 500, x: "80%", y: "60%", color: "bg-purple-500/[0.06] dark:bg-purple-500/[0.10]", duration: 22, delay: 2 },
  { size: 450, x: "15%", y: "75%", color: "bg-blue-400/[0.06] dark:bg-blue-400/[0.10]", duration: 20, delay: 5 },
  { size: 400, x: "50%", y: "30%", color: "bg-violet-500/[0.05] dark:bg-violet-500/[0.08]", duration: 28, delay: 4 },
  { size: 350, x: "90%", y: "85%", color: "bg-sky-500/[0.05] dark:bg-sky-500/[0.08]", duration: 24, delay: 6 },
];

function generateParticles() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: `${seededRandom(i * 7 + 1) * 100}%`,
    y: `${seededRandom(i * 7 + 2) * 100}%`,
    size: seededRandom(i * 7 + 3) * 4 + 1.5,
    duration: seededRandom(i * 7 + 4) * 12 + 8,
    delay: seededRandom(i * 7 + 5) * 8,
    opacity: seededRandom(i * 7 + 6) * 0.5 + 0.15,
    xDrift: (seededRandom(i * 7 + 7) - 0.5) * 80,
    yTravel: -(seededRandom(i * 7 + 8) * 200 + 150),
  }));
}

function generateGridLines() {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    isVertical: i >= 8,
    position: `${((i % 8) + 1) * (100 / 9)}%`,
    duration: seededRandom(i * 3 + 100) * 3 + 3,
    delay: seededRandom(i * 3 + 101) * 4,
  }));
}

function generateShootingStars() {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    startX: `${seededRandom(i * 5 + 200) * 80 + 10}%`,
    startY: `${seededRandom(i * 5 + 201) * 40}%`,
    angle: seededRandom(i * 5 + 202) * 30 + 15,
    duration: seededRandom(i * 5 + 203) * 2 + 1.5,
    delay: seededRandom(i * 5 + 204) * 15 + 5,
    length: seededRandom(i * 5 + 205) * 100 + 80,
  }));
}

const particles = generateParticles().map((p) => ({
  ...p,
  glow: p.size > 3 ? "0 0 6px 2px rgba(59,130,246,0.3)" : "none",
}));
const gridLines = generateGridLines();
const shootingStars = generateShootingStars();

// Pre-compute grid intersection dots
const hLines = gridLines.filter((l) => !l.isVertical);
const vLines = gridLines.filter((l) => l.isVertical);
const intersectionDots = hLines.flatMap((hLine) =>
  vLines.map((vLine) => ({
    key: `dot-${hLine.id}-${vLine.id}`,
    left: vLine.position,
    top: hLine.position,
    duration: (hLine.duration + vLine.duration) / 2,
    delay: (hLine.delay + vLine.delay) / 2,
  }))
);

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated grid pattern — more visible */}
      <div className="absolute inset-0">
        {gridLines.map((line) => (
          <motion.div
            key={`grid-${line.id}`}
            className={`absolute ${
              line.isVertical
                ? "w-px h-full bg-gradient-to-b from-transparent via-blue-500/[0.06] dark:via-blue-500/[0.12] to-transparent"
                : "h-px w-full bg-gradient-to-r from-transparent via-blue-500/[0.06] dark:via-blue-500/[0.12] to-transparent"
            }`}
            style={line.isVertical ? { left: line.position } : { top: line.position }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid intersection glow dots */}
        {intersectionDots.map((dot) => (
          <motion.div
            key={dot.key}
            className="absolute w-1 h-1 rounded-full bg-blue-400/20 dark:bg-blue-400/40"
            style={{ left: dot.left, top: dot.top, transform: "translate(-50%, -50%)" }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Large floating gradient orbs — more vivid */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full ${orb.color} blur-[100px]`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 100, -80, 60, 0],
            y: [0, -80, 60, -100, 0],
            scale: [1, 1.2, 0.85, 1.15, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating micro-particles — more, bigger, brighter */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-blue-400/80 dark:bg-blue-400/90"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: 0,
            boxShadow: p.glow,
          }}
          animate={{
            y: [0, p.yTravel / 2, p.yTravel],
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

      {/* Shooting stars / streaks (dark mode only) */}
      {shootingStars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute hidden dark:block"
          style={{
            left: star.startX,
            top: star.startY,
            width: star.length,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.6), transparent)",
            transformOrigin: "left center",
            transform: `rotate(${star.angle}deg)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: star.delay + 10,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Ambient pulse rings */}
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-blue-500/[0.04] dark:border-blue-500/[0.08]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-indigo-500/[0.04] dark:border-indigo-500/[0.08]"
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[70%] top-[65%] w-[500px] h-[500px] rounded-full border border-cyan-500/[0.03] dark:border-cyan-500/[0.06]"
        animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 12, delay: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
    </div>
  );
}
