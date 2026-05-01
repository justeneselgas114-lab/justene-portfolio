"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
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
              href="mailto:theconceptlogin@gmail.com"
              className="hidden md:inline text-sm text-fg-muted hover:text-accent transition-colors"
            >
              theconceptlogin@gmail.com
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => smoothScroll(link.href)}
                className="px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg hover:bg-bg-elevated rounded-lg transition-all"
              >
                {link.name}
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
              <a href="/cv-justene-selgas.pdf" download>
                <Download size={14} />
                Download CV
              </a>
            </Button>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg border-l border-border p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <div className="flex justify-end mb-6">
                    <Dialog.Close asChild>
                      <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X size={22} />
                      </Button>
                    </Dialog.Close>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => {
                          setOpen(false);
                          setTimeout(() => smoothScroll(link.href), 100);
                        }}
                        className="text-left px-4 py-3 text-base font-serif text-fg hover:bg-bg-elevated rounded-lg transition-all"
                      >
                        {link.name}
                      </button>
                    ))}
                    <a
                      href="/cv-justene-selgas.pdf"
                      download
                      className="mt-4 inline-flex items-center justify-center gap-2 h-11 px-6 bg-accent text-bg rounded-xl font-medium text-sm"
                    >
                      <Download size={16} />
                      Download CV
                    </a>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
