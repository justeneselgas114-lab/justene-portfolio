
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Target, Layers } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1320px] mx-auto bg-white border-y border-slate-100">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-center gap-4">
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-blue-600 rounded-full"
            ></motion.span>
            Systems-First Developer
          </h2>
          <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-medium">
            <p>
              I don't just write code; I design <span className="text-slate-900 font-black">architecture</span>. My approach centers on building scalable digital infrastructure that solves real business problems. Whether it's a customer booking flow or an automated data pipeline, my goal is always efficiency and performance.
            </p>
            <p>
              With deep expertise in <span className="text-blue-600 font-bold">Google Workspace automation (Apps Script + Sheets API)</span>, I help businesses create enterprise-grade tools with minimal maintenance costs. I bridge the gap between complex frontend architecture and reliable, cost-effective backends.
            </p>
            <p className="text-lg">
              Based in Davao, Philippines, I work remotely with global clients who need more than just a website—they need a <span className="italic text-slate-700">high-performance engine</span> for their business operations.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 rounded-[2rem] p-10 border border-slate-200 shadow-sm sticky top-24 transition-all duration-500 hover:shadow-xl hover:border-blue-100"
          >
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">Quick Facts</h3>
            <ul className="space-y-8">
              {[
                { icon: <MapPin size={20} />, label: 'Location', value: 'Davao, Philippines (GMT+8)' },
                { icon: <Briefcase size={20} />, label: 'Availability', value: 'Freelance / Remote' },
                { icon: <Target size={20} />, label: 'Focus', value: 'Business Systems & Automation' },
                { icon: <Layers size={20} />, label: 'Core Stack', value: 'Next.js, TS, Node, SQL' }
              ].map((fact, idx) => (
                <motion.li 
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.1) }}
                  viewport={{ once: true }}
                  className="flex gap-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {fact.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{fact.label}</p>
                    <p className="text-slate-900 font-bold">{fact.value}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
