"use client";

import { Mail, Heart } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-gray-200 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>&copy; {new Date().getFullYear()} Justene. Built with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>& Claude Code</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/justene-selgas-152052377/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://www.facebook.com/Just10AiAutomation/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="mailto:justeneselgas2004@gmail.com"
              aria-label="Email"
              className="p-2 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://wa.me/639638296973"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
