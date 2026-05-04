"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download, ArrowUpRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

function smoothScroll(href: string) {
  if (!href.startsWith("#")) return;
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(href);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: offset, behavior: "smooth" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-serif text-xl text-accent font-medium"
            >
              Justene<span className="text-fg">.</span>
            </Link>
            <a
              href="mailto:justene.dev@gmail.com"
              className="hidden md:inline text-sm text-fg-muted hover:text-accent transition-colors"
            >
              justene.dev@gmail.com
            </a>
          </div>

          {/* Desktop nav with animated underline */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => smoothScroll(link.href)}
                className="group relative px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-x-4 bottom-1 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex"
            >
              <a href="/Justene_Resume.pdf" download>
                <Download size={14} />
                Download CV
              </a>
            </Button>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="md:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg text-fg hover:bg-bg-elevated transition-colors relative"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={open ? "x" : "menu"}
                      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {open ? <X size={22} /> : <Menu size={22} />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </Dialog.Trigger>
              <AnimatePresence>
                {open && (
                  <Dialog.Portal forceMount>
                    {/* Backdrop with smooth fade */}
                    <Dialog.Overlay asChild>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed inset-0 z-50 bg-fg/30 backdrop-blur-sm"
                      />
                    </Dialog.Overlay>

                    {/* Slide-in panel with spring */}
                    <Dialog.Content asChild>
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 280 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-bg border-l border-border p-6 shadow-2xl flex flex-col"
                      >
                        <Dialog.Title className="sr-only">Navigation</Dialog.Title>

                        <div className="flex justify-end mb-8">
                          <Dialog.Close asChild>
                            <button
                              aria-label="Close menu"
                              className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-fg hover:bg-bg-elevated transition-colors"
                            >
                              <X size={22} />
                            </button>
                          </Dialog.Close>
                        </div>

                        {/* Staggered nav items */}
                        <nav className="flex flex-col gap-1">
                          {navLinks.map((link, i) => (
                            <motion.button
                              key={link.name}
                              initial={{ opacity: 0, x: 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.1 + i * 0.06,
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              onClick={() => {
                                setOpen(false);
                                setTimeout(() => smoothScroll(link.href), 280);
                              }}
                              className="group flex items-center justify-between text-left px-4 py-3.5 text-2xl font-serif text-fg hover:text-accent rounded-lg transition-colors"
                            >
                              <span>
                                <span className="font-mono text-xs text-fg-subtle mr-3">
                                  0{i + 1}
                                </span>
                                {link.name}
                              </span>
                              <ArrowUpRight
                                size={18}
                                className="text-fg-subtle group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                              />
                            </motion.button>
                          ))}
                        </nav>

                        {/* CTA + footer in mobile menu */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          className="mt-auto pt-8"
                        >
                          <a
                            href="/Justene_Resume.pdf"
                            download
                            className="flex items-center justify-center gap-2 h-12 px-6 bg-accent text-bg rounded-xl font-medium text-sm hover:bg-accent-hover transition-colors"
                          >
                            <Download size={16} />
                            Download CV
                          </a>
                          <p className="font-mono text-[10px] text-fg-subtle text-center mt-4">
                            justene.dev@gmail.com
                          </p>
                        </motion.div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </AnimatePresence>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
