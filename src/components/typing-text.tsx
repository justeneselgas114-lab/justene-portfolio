"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = [
  "Claude Code AI Specialist",
  "n8n Automation Expert",
  "Web Developer",
  "GoHighLevel CRM Pro",
  "Make Integrations Builder",
];

export default function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setRoleIndex((r) => (r + 1) % roles.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center">
      <span className="text-blue-500 dark:text-blue-400">
        {roles[roleIndex].slice(0, charIndex)}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-6 bg-blue-500 dark:bg-blue-400 ml-0.5"
      />
    </span>
  );
}
