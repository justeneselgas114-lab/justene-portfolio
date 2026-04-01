"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  const outerX = useSpring(cursorX, { damping: 15, stiffness: 120 });
  const outerY = useSpring(cursorY, { damping: 15, stiffness: 120 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      setTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() },
        ];
        return newTrail.slice(-8);
      });

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(isClickable);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    const handleLeave = () => setIsVisible(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [handleMouseMove]);

  // Clean up old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        const now = Date.now();
        return prev.filter((p) => now - p.id < 400);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" style={{ display: isTouchDevice ? "none" : undefined }}>
      {/* Trail particles */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.6, scale: 0.5 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute rounded-full bg-blue-500/30"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            width: 6,
            height: 6,
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border-2 transition-colors duration-200"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          borderColor: isPointer
            ? "rgba(99, 102, 241, 0.6)"
            : "rgba(59, 130, 246, 0.3)",
        }}
        animate={{
          width: isPointer ? 48 : isClicking ? 28 : 36,
          height: isPointer ? 48 : isClicking ? 28 : 36,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full transition-colors duration-200"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          backgroundColor: isPointer
            ? "rgba(99, 102, 241, 0.9)"
            : "rgba(59, 130, 246, 0.8)",
        }}
        animate={{
          width: isPointer ? 8 : isClicking ? 12 : 6,
          height: isPointer ? 8 : isClicking ? 12 : 6,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Glow effect on pointer */}
      {isPointer && (
        <motion.div
          className="absolute rounded-full bg-blue-500/10 blur-xl"
          style={{
            x: outerX,
            y: outerY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: 80, height: 80, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

    </div>
  );
}
