
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, ChevronRight, X, LayoutGrid, Info, ArrowUpRight, MousePointer2, ChevronDown } from 'lucide-react';
import { Project } from '../types';

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleScroll = () => {
    if (contentRef.current) {
      if (contentRef.current.scrollTop > 50) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    }
  };

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Check if content actually overflows after a small delay for rendering
      const checkOverflow = () => {
        if (el.scrollHeight <= el.clientHeight) {
          setShowScrollHint(false);
        }
      };
      const timeoutId = setTimeout(checkOverflow, 150);
      return () => {
        el.removeEventListener('scroll', handleScroll);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[60] p-3 bg-white/90 backdrop-blur rounded-full hover:bg-white transition-all border border-slate-200 shadow-xl active:scale-90"
        >
          <X size={20} />
        </button>

        {/* Scroll Hint Indicator - Repositioned to Bottom Right */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div 
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              className="absolute bottom-10 right-10 z-[60] pointer-events-none flex flex-col items-end gap-3"
            >
              <div className="px-5 py-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 whitespace-nowrap">
                <MousePointer2 size={14} className="text-blue-400" />
                Scroll for Live Demo
              </div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mr-6"
              >
                <ChevronDown size={28} className="text-blue-600 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Modal Main Scroll Container */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto scroll-smooth flex flex-col min-h-0 overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Top Section: Full Width Screenshot */}
          <div className="w-full bg-slate-50 border-b border-slate-100 overflow-hidden relative flex-shrink-0">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto object-cover object-top"
            />
            {/* Subtle Gradient Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
          </div>
          
          {/* Bottom Section: Detailed Content */}
          <div className="w-full p-8 sm:p-12 lg:p-20 bg-white relative -mt-10 rounded-t-[3rem] z-10 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4">
                <LayoutGrid size={14} />
                {project.category}
              </div>
              
              <h3 className="text-4xl lg:text-6xl font-black text-slate-900 mb-10 leading-tight tracking-tight">
                {project.title}
              </h3>
              
              <p className="text-slate-500 mb-16 text-xl lg:text-2xl leading-relaxed font-medium">
                {project.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-20">
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info size={14} className="text-blue-500" />
                    Strategic Impact
                  </h4>
                  <div className="p-10 rounded-[2.5rem] bg-blue-50/50 border border-blue-100/50">
                    <p className="text-slate-800 font-bold leading-relaxed text-lg lg:text-xl">
                      {project.outcome}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Technical Architecture</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.architecture.map((arch) => (
                      <span key={arch} className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-2xl shadow-lg shadow-slate-200">
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action Section */}
              <div id="modal-cta" className="pt-16 border-t border-slate-100">
                <div className="bg-slate-50 p-10 lg:p-16 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center gap-8">
                  <div className="space-y-2">
                    <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Ready to explore?</p>
                    <h4 className="text-3xl font-black text-slate-900 uppercase">Live Production System</h4>
                  </div>
                  
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full max-w-md px-10 py-7 bg-blue-600 text-white rounded-[2rem] font-black flex items-center justify-center gap-4 hover:bg-blue-700 transition-all duration-500 shadow-2xl shadow-blue-200 uppercase tracking-widest text-sm hover:-translate-y-1 active:scale-[0.98]"
                  >
                    Launch Experience <ExternalLink size={24} />
                  </a>
                  
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">External window will open in a new tab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const highEndEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section id="projects" className="py-32 px-6 sm:px-12 lg:px-20 max-w-[1320px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: highEndEase }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">Latest Production</h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            Case studies of business systems focused on high availability, low latency, and zero-cost backend infrastructure.
          </p>
        </motion.div>
        <div className="hidden lg:block text-slate-300 font-mono text-[10px] uppercase tracking-[0.4em] rotate-90 origin-right font-bold">
          Selection 2024 / 2025
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PROJECTS.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: highEndEase, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-[16/11] rounded-[2rem] overflow-hidden bg-white mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] cursor-pointer group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-700 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 scale-0 group-hover:scale-100 transition-all duration-700 rotate-45 group-hover:rotate-0">
                  <ArrowUpRight size={32} />
                </div>
              </div>
            </div>
            
            <div className="px-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-blue-600"></span>
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">{project.category}</p>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-500 leading-tight">
                {project.title}
              </h3>
              <p className="text-slate-500 mb-6 line-clamp-2 text-sm font-medium leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest cursor-pointer hover:gap-5 transition-all duration-500">
                Project Specs <ChevronRight size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
