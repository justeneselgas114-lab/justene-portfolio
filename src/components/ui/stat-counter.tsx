"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export function StatCounter({ target, label, suffix = "+" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl lg:text-6xl text-accent font-light">
        {count}
        {suffix}
      </div>
      <p className="text-sm text-fg-subtle mt-1 font-sans">{label}</p>
    </div>
  );
}
