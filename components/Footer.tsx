
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 sm:px-12 lg:px-20 max-w-[1320px] mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Justene Selgas</span>
          <p className="text-slate-500 text-sm mt-2 font-medium">Web Developer & Automation Specialist</p>
        </div>
        
        <nav className="flex items-center gap-8">
          <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">About</a>
          <a href="#stack" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Stack</a>
          <a href="#projects" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
        </nav>
        
        <div className="text-slate-400 text-sm font-medium">
          &copy; {currentYear} All rights reserved. Built with Next.js & TypeScript.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
