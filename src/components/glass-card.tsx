"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className, onClick }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rY = ((x - centerX) / centerX) * 8;
    const rX = ((centerY - y) / centerY) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
  }

  function handleMouseLeave() {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
    setIsHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-gray-200/60 dark:border-white/[0.08]",
        "bg-white/60 dark:bg-white/[0.03]",
        "backdrop-blur-xl",
        "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.3)]",
        "hover:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.2)]",
        "hover:border-blue-500/20 dark:hover:border-blue-400/20",
        "transition-shadow duration-300",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Specular highlight / glare */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Edge light effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(${135 + rotateY * 5}deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)`,
        }}
      />

      {/* Rainbow refraction on edges */}
      <div
        className="pointer-events-none absolute inset-[-1px] z-10 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `conic-gradient(from ${glareX * 3.6}deg at ${glareX}% ${glareY}%, rgba(59,130,246,0.3), rgba(99,102,241,0.2), rgba(168,85,247,0.2), rgba(59,130,246,0.1), transparent 40%)`,
          mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content with subtle depth */}
      <div style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
    </motion.div>
  );
}
