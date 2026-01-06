
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, MessageSquare, Database, Code2, Globe, ChevronDown } from 'lucide-react';

const FloatingBadge: React.FC<{ icon: React.ReactNode; label: string; delay?: number; className?: string }> = ({ icon, label, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ 
      opacity: 1, 
      scale: 1, 
      y: [0, -10, 0],
    }}
    transition={{ 
      delay: delay + 0.5,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 2
      }
    }}
    className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] ${className}`}
  >
    <div className="text-blue-600 scale-75 sm:scale-100">{icon}</div>
    <span className="text-[10px] sm:text-[11px] font-black text-slate-800 whitespace-nowrap tracking-tight">{label}</span>
  </motion.div>
);

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const highEndEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: highEndEase }
    }
  };

  const handleInquiryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('inquiry');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-12 lg:px-20 max-w-[1320px] mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
        {/* Left: Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[9px] sm:text-[10px] font-black tracking-widest mb-6 sm:mb-8 border border-blue-100/50 uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            WEBSITE DEVELOPMENT
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl xs:text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 mb-6 sm:mb-8 leading-[1.05]">
            I build <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 drop-shadow-sm uppercase">SYSTEMS</span><br />
            that scale <span className="relative inline-block">
              businesses.
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.5, duration: 1, ease: highEndEase }}
                className="absolute -bottom-2 left-0 h-1 bg-blue-600/10 rounded-full"
              />
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-500 mb-10 sm:mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            High-performance frontend architecture meets cost-effective Google Cloud automation. Delivering enterprise-grade results with <span className="text-slate-900 font-bold underline decoration-blue-500/30 underline-offset-4 decoration-2">zero</span> monthly maintenance costs.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-5 mb-16 sm:mb-20">
            <motion.a 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#projects" 
              onClick={handleProjectsClick}
              className="w-full sm:w-auto px-10 py-5 bg-[#111827] text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-slate-800 transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
            >
              View Projects
              <ArrowRight size={20} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#inquiry" 
              onClick={handleInquiryClick}
              className="w-full sm:w-auto px-10 py-5 border border-slate-200 bg-white text-slate-700 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-slate-50 transition-all duration-500 cursor-pointer"
            >
              <MessageSquare size={20} className="text-blue-600" />
              Send Inquiry
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 border-t border-slate-100 flex items-center justify-center lg:justify-start gap-6 sm:gap-10">
            {[
              { label: 'RELIABILITY', value: '100%' },
              { label: 'BACKEND COST', value: '$0' },
              { label: 'EXPERIENCE', value: '2+ Yrs' }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1 sm:mb-2">{stat.value}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Visual Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: highEndEase, delay: 0.2 }}
          className="relative h-[450px] sm:h-[600px] lg:h-[650px] flex items-center justify-center"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[480px]">
            <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border-[1px] border-white shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] bg-slate-900 aspect-[4/5] group">
              <img 
                src="https://i.postimg.cc/ydq5L5Ns/Black-and-White-Minimalist-Corporate-Personal-Profile-Instagram-Post.png" 
                alt="Justene Selgas" 
                className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-105"
              />
              
              {/* Bottom Glass Overlay - Hidden on mobile as per request */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.2, ease: highEndEase }}
                className="hidden sm:block absolute sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] z-10"
              >
                <p className="text-blue-300 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] mb-1 sm:mb-2 font-bold">ARCHITECTURE FOCUS</p>
                <p className="text-white text-lg sm:text-xl font-black tracking-tight">Performance & Automation</p>
              </motion.div>
            </div>

            {/* Badges - Adjusted positioning for ultra-small screens */}
            <FloatingBadge icon={<Code2 size={16} />} label="Next.js 14" delay={0.4} className="top-4 -left-4 xs:-left-6 sm:top-8 sm:-left-10" />
            <FloatingBadge icon={<Database size={16} />} label="Google Cloud" delay={0.6} className="top-1/2 -right-4 xs:-right-6 sm:-right-8" />
            <FloatingBadge icon={<Globe size={16} />} label="TypeScript" delay={0.8} className="-bottom-4 left-1/2 -translate-x-1/2 sm:-bottom-6" />
          </div>

          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"
          />
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-200 hidden lg:block"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
