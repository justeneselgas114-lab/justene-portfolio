"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 2500;
const STORAGE_KEY = "js_loaded";

export function LoadingScreen() {
  // Default true so SSR renders loader on first paint — no content flash.
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShow(false);
      document.body.style.overflow = "";
    }, DURATION_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 align-middle animate-pulse" />
              initializing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl text-fg font-medium tracking-tight"
            >
              justene
              <span className="text-accent">.dev</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="font-mono text-[11px] sm:text-xs text-fg-muted tracking-wide"
            >
              junior full-stack developer · n8n integrations specialist
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-mono text-xs sm:text-sm text-accent font-medium tracking-[0.15em] uppercase"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 align-middle animate-pulse" />
              claude ai specialist
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              className="mt-4 w-44 sm:w-56 h-[2px] bg-bg-elevated overflow-hidden rounded-full"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: (DURATION_MS - 950) / 1000, ease: "easeInOut", delay: 0.85 }}
                className="h-full bg-accent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
