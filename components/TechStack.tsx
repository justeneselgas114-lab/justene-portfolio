
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { TECH_STACK } from '../constants';
import * as Icons from 'lucide-react';

const TechStack: React.FC = () => {
  const highEndEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: highEndEase }
    }
  };

  return (
    <section id="stack" className="py-32 px-6 sm:px-12 lg:px-20 max-w-[1320px] mx-auto bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: highEndEase }}
        viewport={{ once: true }}
        className="relative z-10 mb-20"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1, delay: 0.5, ease: highEndEase }}
            className="h-1.5 bg-blue-600 rounded-full"
          />
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Engineering <span className="text-blue-600">Arsenal</span>
          </h2>
        </div>
        <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
          A curated selection of enterprise technologies optimized for high-performance business architecture and zero-maintenance automation.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
      >
        {TECH_STACK.map((category, idx) => {
          const IconComponent = (Icons as any)[category.icon] || Icons.Code2;
          
          return (
            <motion.div 
              key={category.name}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-blue-200 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                <IconComponent size={28} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              
              <ul className="space-y-4">
                {category.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-4 text-slate-500 font-bold text-sm tracking-tight group/item">
                    <div className="w-2 h-2 rounded-full bg-slate-200 group-hover/item:bg-blue-500 group-hover/item:scale-125 transition-all duration-300" />
                    <span className="group-hover/item:text-slate-900 transition-colors">{tool}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative Corner Element */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                <IconComponent size={64} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subtle Bottom Accent */}
      <div className="mt-20 flex justify-center">
        <div className="px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Continuously Evolving Stack • 2025 Edition
        </div>
      </div>
    </section>
  );
};

export default TechStack;
