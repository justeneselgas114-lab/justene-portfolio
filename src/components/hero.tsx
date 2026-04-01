"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowDown, Calendar } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useRef } from "react";
import Image from "next/image";
import TypingText from "./typing-text";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <motion.div style={{ y: yParallax, opacity: opacityFade }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sm mb-4"
            >
              Hello I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Justene
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-lg"
            >
              <TypingText />
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-500">
                n8n &bull; GoHighLevel &bull; Make
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg shadow-blue-500/25"
              >
                <Calendar size={16} />
                Book a Meeting
              </a>
              <a
                href="#automations"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#automations")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                View Projects
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://www.linkedin.com/in/justene-selgas-152052377/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://www.facebook.com/Just10AiAutomation/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-3 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="mailto:justeneselgas2004@gmail.com"
                aria-label="Email"
                className="p-3 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://wa.me/639638296973"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-3 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-green-500 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all"
              >
                <FaWhatsapp size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right - Profile Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-2xl" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20" />

              {/* Large initial letter behind */}
              <div className="absolute -top-8 -right-8 text-[180px] font-bold text-blue-500/5 dark:text-blue-500/10 select-none leading-none">
                J
              </div>

              {/* Profile photo */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-blue-500/20">
                <Image
                  src="/profile.png"
                  alt="Justene"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-4 top-1/4 px-3 py-2 bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Claude Code
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -right-4 top-1/2 px-3 py-2 bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                n8n Expert
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute -bottom-2 left-1/4 px-3 py-2 bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Web Developer
              </motion.div>
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Scroll indicator - outside parallax container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-gray-400 dark:text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
