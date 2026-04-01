"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showCalendly, setShowCalendly] = useState(false);

  // Wait for hydration to complete, then load Calendly
  useEffect(() => {
    // Small delay ensures React hydration is fully done before Calendly modifies the DOM
    const timer = setTimeout(() => {
      setShowCalendly(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showCalendly) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [showCalendly]);

  return (
    <section id="contact" className="py-24 bg-gray-50/30 dark:bg-transparent relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-12"
        >
          <p className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Book a meeting and let&apos;s discuss how I can help
            automate your workflows or build your next website.
          </p>
        </motion.div>

        {/* Calendly embed */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={1}
        >
          <div className="rounded-2xl border border-gray-200 dark:border-white/5 bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-white/5 flex items-center gap-2">
              <Calendar size={18} className="text-blue-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                Book a Meeting
              </h3>
            </div>
            {showCalendly ? (
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/justeneselgas2004/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                style={{ minWidth: "320px", height: "700px" }}
              />
            ) : (
              <div className="flex items-center justify-center" style={{ minWidth: "320px", height: "700px" }}>
                <div className="text-center">
                  <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-500/10 mb-4 mx-auto w-fit">
                    <Calendar size={32} className="text-blue-500 animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-400">Loading calendar...</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
