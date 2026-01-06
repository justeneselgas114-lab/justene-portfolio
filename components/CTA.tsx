
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Github, 
  ArrowRight, 
  Facebook, 
  Linkedin, 
  Send, 
  MessageSquare,
  Sparkles,
  Cpu,
  AlertCircle,
  Loader2,
  Phone
} from 'lucide-react';
import { PROOF, CONTACT_SCRIPT_URL } from '../constants';
import * as Icons from 'lucide-react';

const CTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name.trim());
      params.append('email', formData.email.trim());
      params.append('whatsapp', formData.whatsapp.trim());
      params.append('package', 'General Inquiry');
      params.append('message', formData.message.trim());

      await fetch(CONTACT_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        body: params,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
      }, 6000);

    } catch (err: any) {
      console.error("Contact Submission Error:", err);
      setError("Network error. Please ensure you are online and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-12 lg:px-20 max-w-[1320px] mx-auto overflow-hidden">
      {/* Proof Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-16 sm:mb-24">
        {PROOF.map((p, idx) => {
          const IconComponent = (Icons as any)[p.icon];
          return (
            <div key={p.title} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center group hover:border-blue-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <IconComponent size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{p.description}</p>
            </div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative rounded-[2rem] sm:rounded-[3rem] bg-slate-900 overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,rgba(0,0,0,0)_70%)]"></div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 p-4 sm:p-12 lg:p-20">
          <div className="flex flex-col justify-center text-center lg:text-left pt-6 lg:pt-0 px-2 sm:px-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 sm:mb-10 mx-auto lg:mx-0 shadow-xl">
              <Cpu size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 sm:mb-8 tracking-tight leading-[1.1] uppercase">
              Let's engineer <br className="hidden lg:block" /> your vision.
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              Ready to transition from manual workflows to automated, high-performance architecture? Start a project discussion today.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
              <a href="mailto:justeneselgas2004@gmail.com" className="flex items-center justify-center lg:justify-start gap-4 text-slate-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                  <Mail size={18} />
                </div>
                <span className="font-bold tracking-tight text-sm sm:text-base break-all">justeneselgas2004@gmail.com</span>
              </a>
              
              <div className="pt-8 sm:pt-10 mt-6 sm:mt-10 border-t border-white/5 flex justify-center lg:justify-start">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[
                    { icon: <Facebook size={18} />, href: "https://facebook.com", title: "Facebook" },
                    { icon: <Linkedin size={18} />, href: "https://linkedin.com", title: "LinkedIn" },
                    { icon: <Github size={18} />, href: "https://github.com", title: "GitHub" }
                  ].map((social, idx) => (
                    <motion.a 
                      key={idx}
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all shadow-xl"
                      title={social.title}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="inquiry" className="relative pb-6 lg:pb-0">
            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white p-4 xs:p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl"
                >
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 flex items-center gap-3 uppercase tracking-tight">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <MessageSquare size={20} />
                    </div>
                    Project Brief
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium mb-6 sm:mb-8">Provide your technical requirements below.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={14} />
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-4 sm:px-6 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm sm:text-base"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john@company.com"
                          className="w-full px-4 py-4 sm:px-6 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm sm:text-base"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
                        <Phone size={10} className="text-emerald-500" /> WhatsApp Number
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+63 9XX XXX XXXX"
                        className="w-full px-4 py-4 sm:px-6 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm sm:text-base"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">System Goals</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="What specific problems are we solving?"
                        className="w-full px-4 py-4 sm:px-6 sm:py-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-y min-h-[120px] leading-relaxed text-sm sm:text-base"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full py-5 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl text-center flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 sm:mb-8">
                    <Sparkles size={40} className="animate-pulse" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Brief Logged</h3>
                  <p className="text-slate-500 text-base sm:text-lg font-medium max-w-sm mx-auto mb-8 sm:mb-10 px-4">
                    Your inquiry has been synced to my Google Sheets. I'll review the requirements and contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="px-8 py-4 border-2 border-slate-100 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all"
                  >
                    Send Another Brief
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
