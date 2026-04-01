"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Briefcase, User } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GlassCard from "./glass-card";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref}>
    <GlassCard><div className="text-center p-6">
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
        {count}+
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div></GlassCard>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const infoItems = [
  { icon: User, label: "Name", value: "Justene Selgas" },
  { icon: MapPin, label: "Location", value: "Davao City, Philippines" },
  { icon: Mail, label: "Email", value: "justeneselgas2004@gmail.com" },
  { icon: Briefcase, label: "Freelance", value: "Available" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-gray-50/30 dark:bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sm mb-3">
            Who I Am
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {infoItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/[0.02]"
                >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                    <item.icon size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              I&apos;m Justene, a Claude Code AI Specialist and Automation Expert based in Davao City, Philippines.
              I build intelligent workflows with n8n, GoHighLevel, and Make — and craft modern web experiences
              powered by AI-first development using Claude Code.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              From designing MCP server architectures to shipping production websites, I bridge the gap between
              automation and software engineering. I help businesses streamline their operations through smart
              automations while building pixel-perfect, high-performance web applications.
            </p>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
          >
            <div className="grid grid-cols-2 gap-4">
              <AnimatedCounter target={15} label="Projects Completed" />
              <AnimatedCounter target={30} label="Workflows Built" />
              <AnimatedCounter target={20} label="Technologies" />
              <AnimatedCounter target={10} label="Clients Served" />
            </div>

            {/* Experience highlight */}
            <div className="mt-6 p-6 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What I Do Best</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  AI-powered development with Claude Code & MCP Servers
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Business automation with n8n, GHL & Make
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Modern web development with React & Next.js
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  End-to-end project delivery from design to deployment
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
