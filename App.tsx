
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Process from './components/Process';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { ChevronUp, X, MessageCircle } from 'lucide-react';

const FloatingActionButtons: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 800);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const phoneNumber = "639914894086"; 
  const message = "Hi Justene! I'm interested in discussing a potential project. I saw your portfolio and would like to learn more about your systems.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex flex-col gap-3 sm:gap-4 items-end">
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 10 }}
            whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 text-slate-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 mb-1"
            title="Scroll to Top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <div className="relative flex flex-col items-end group">
        {/* Chat Popup Card */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-20 right-0 w-[290px] sm:w-[350px] bg-white rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden z-20"
            >
              {/* Card Header */}
              <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500 overflow-hidden bg-slate-800">
                      <img src="https://i.postimg.cc/ydq5L5Ns/Black-and-White-Minimalist-Corporate-Personal-Profile-Instagram-Post.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                  </div>
                  <div>
                    <h4 className="text-base font-black tracking-tight leading-none mb-1">Justene Selgas</h4>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Typically replies fast</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
              
              {/* Card Body */}
              <div className="p-6 sm:p-8 bg-slate-50">
                <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm mb-6 relative">
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
                    Hello! Thanks for visiting my portfolio. Would you like to discuss a project or see more of my automation systems?
                  </p>
                  <div className="absolute -top-[1px] -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-white border-b-[8px] border-b-transparent"></div>
                </div>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 sm:py-5 bg-emerald-600 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 hover:bg-emerald-700 transition-all shadow-[0_12px_30px_-5px_rgba(16,185,129,0.4)] active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  Start Conversation
                </a>
              </div>
              
              <div className="px-6 py-4 border-t border-slate-100 text-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">End-to-end encrypted • WhatsApp</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Indicator Status - Highly Visible */}
        {!isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className="mb-3 px-4 py-3 sm:px-6 sm:py-4 bg-white border-2 border-emerald-500/20 rounded-2xl shadow-[0_25px_60px_rgba(16,185,129,0.15)] flex items-center gap-4 whitespace-nowrap cursor-pointer hover:border-emerald-500/40 hover:bg-emerald-50/50 transition-all group/badge"
            onClick={() => setIsChatOpen(true)}
          >
            <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-widest text-slate-900 leading-none mb-1 group-hover/badge:text-emerald-700 transition-colors">I am Online</span>
              <span className="text-[8px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-[0.15em] leading-none">Response: Instant</span>
            </div>
          </motion.div>
        )}

        {/* Pulse Effect AURA */}
        <div className="absolute bottom-0 w-14 h-14 sm:w-16 sm:h-16 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-emerald-500 rounded-full"
          />
        </div>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden border-2 border-white/40 group/btn ${
            isChatOpen ? 'bg-white text-slate-900 border-slate-200' : 'bg-slate-900 text-white'
          }`}
          title="Chat on WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex flex-col items-center justify-center gap-0.5"
              >
                <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none">J</span>
                <span className="text-[7px] font-black uppercase tracking-[0.1em] opacity-60">CHAT</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
          {!isChatOpen && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-sm" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

const AnimatedHamburger: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 bg-slate-100 rounded-xl transition-all active:scale-95"
    >
      <motion.span 
        animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-slate-900 rounded-full block origin-center transition-all duration-500"
      />
      <motion.span 
        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        className="w-6 h-0.5 bg-slate-900 rounded-full block transition-all duration-500"
      />
      <motion.span 
        animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-slate-900 rounded-full block origin-center transition-all duration-500"
      />
    </button>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'stack', 'projects', 'pricing', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Stack', href: '#stack', id: 'stack' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Pricing', href: '#pricing', id: 'pricing' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (mobileMenuOpen) setMobileMenuOpen(false);
    
    const performScroll = () => {
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    };

    if (mobileMenuOpen) setTimeout(performScroll, 300);
    else performScroll();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-700 ease-[0.22,1,0.36,1] ${
      isScrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-20 flex justify-between items-center">
        <a href="#" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl transition-all duration-500 group-hover:bg-blue-600"
          >
            J
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Selgas<span className="text-blue-600">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map(link => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-500 tracking-wide group ${
                activeSection === link.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {activeSection === link.id && (
                <motion.span 
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-slate-100 rounded-xl -z-0"
                  transition={{ type: "spring", bounce: 0, stiffness: 100, damping: 20 }}
                />
              )}
            </motion.a>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-4" />
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#pricing" 
            onClick={(e) => handleNavClick(e, '#pricing')}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all duration-500 shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)]"
          >
            Start Project
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <AnimatedHamburger isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 top-[64px] bg-slate-900/40 backdrop-blur-md z-[-1]"
            />
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-2xl overflow-hidden"
            >
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                }}
                className="px-6 py-8 flex flex-col gap-2"
              >
                {navLinks.map(link => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className={`relative text-lg font-bold p-4 rounded-xl flex justify-between items-center group transition-all duration-500 active:scale-[0.98] ${
                      activeSection === link.id ? 'text-blue-600' : 'text-slate-900'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {activeSection === link.id && (
                      <motion.span 
                        layoutId="mobileNavIndicator"
                        className="absolute inset-0 bg-blue-50/80 border border-blue-100 rounded-xl z-0"
                        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                      />
                    )}
                    <motion.div 
                      animate={activeSection === link.id ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] relative z-10"
                    />
                  </motion.a>
                ))}
                
                <motion.div 
                   variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                   }}
                   className="pt-4 mt-4 border-t border-slate-100"
                >
                  <motion.a 
                    whileTap={{ scale: 0.95 }}
                    href="#pricing" 
                    onClick={(e) => handleNavClick(e, '#pricing')}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:bg-blue-700"
                  >
                    Start Project
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[120]"
      style={{ scaleX }}
    />
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Process />
        <Pricing />
        <CTA />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default App;
