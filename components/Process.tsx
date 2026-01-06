
import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS } from '../constants';

const Process: React.FC = () => {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1320px] mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">How I Deliver Results</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Engineering complex systems requires a rigorous, transparent process. Here's how we go from initial idea to live production.
        </p>
      </motion.div>

      <div className="relative">
        {/* Progress Line - Desktop */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute top-[4.5rem] left-0 right-0 h-0.5 bg-slate-100 hidden lg:block origin-left"
        ></motion.div>
        
        <div className="grid lg:grid-cols-5 gap-12 relative z-10">
          {PROCESS.map((step, idx) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: '#2563eb', color: '#2563eb' }}
                className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-2xl font-black text-slate-900 mb-8 shadow-sm lg:mx-0 mx-auto transition-colors"
              >
                0{idx + 1}
              </motion.div>
              <div className="lg:text-left text-center">
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
