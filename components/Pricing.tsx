
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Banknote, 
  ArrowRight, 
  HelpCircle, 
  Star, 
  X, 
  Sparkles,
  CreditCard,
  Globe2,
  Tag,
  Zap,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { PRICING_PACKAGES, PRICING_SCRIPT_URL } from '../constants';
import { PricingPackage } from '../types';

type Currency = 'PHP' | 'USD';

// Virtual package for Custom Quotes
const CUSTOM_PKG: PricingPackage = {
  name: "Custom System",
  bestFor: "Complex enterprises & unique logic",
  includes: [
    "Discovery & technical specification",
    "Bespoke system architecture",
    "Third-party API orchestrations",
    "Scalable cloud infrastructure",
    "Post-deployment support"
  ],
  timeline: "Variable",
  pricePHP: "Custom Pricing",
  priceUSD: "Custom Pricing",
  color: "slate"
};

const PackageInquiryModal: React.FC<{ 
  pkg: PricingPackage; 
  onClose: () => void;
  currency: Currency;
}> = ({ pkg, onClose, currency }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isCustom = pkg.name === "Custom System";
  const highEndEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name.trim());
      params.append('email', formData.email.trim());
      params.append('package', pkg.name);
      params.append('message', formData.message.trim());

      await fetch(PRICING_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        body: params,
      });

      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Submission Error:", err);
      setError("Communication failed. Please check your internet or try again.");
      setIsSubmitting(false);
    }
  };

  const displayPrice = currency === 'PHP' ? pkg.pricePHP : pkg.priceUSD;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: highEndEase }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.7, ease: highEndEase }}
        className="relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 hover:bg-slate-100 rounded-full transition-colors duration-300"
        >
          <X size={24} className="text-slate-500" />
        </button>

        {!isSuccess ? (
          <div className="p-6 sm:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                pkg.color === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                pkg.color === 'amber' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                pkg.color === 'red' ? 'bg-red-50 border-red-100 text-red-700' :
                'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {pkg.name} Tier
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock size={12} />
                {pkg.timeline} Est.
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 leading-tight">
              {isCustom ? "Request a Custom Quote" : "Start a project discussion"}
            </h3>
            <p className="text-slate-500 mb-8 font-medium text-sm sm:text-base">
              {isCustom 
                ? "Briefly describe the custom architecture or business logic you need to build."
                : `Please provide a few details about your business requirements for the ${pkg.name} package.`}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Business Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  {isCustom ? "System Requirements & Vision" : "Project Vision & Goals"}
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder={isCustom 
                    ? "What specific problems are you looking to solve with a custom system?" 
                    : `What are your main goals for this ${pkg.name.toLowerCase()} tier implementation?`}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-900 resize-none"
                ></textarea>
              </div>

              <div className="p-6 bg-slate-900 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px]"></div>
                <div className="relative z-10 text-center sm:text-left">
                  <p className="text-white font-black text-lg">
                    {isCustom ? "TBD" : displayPrice}
                  </p>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    {isCustom ? "Investment Strategy" : `Initial Estimate (${currency})`}
                  </p>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto relative z-10 px-8 py-4 bg-white text-slate-900 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isCustom ? 'Request Quote' : 'Start Discussion'}
                      <ArrowRight size={18} className="text-blue-600" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 text-center"
          >
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-8">
              <Sparkles size={40} className="animate-pulse" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase">Brief Logged</h3>
            <p className="text-slate-500 text-lg mb-8 max-w-sm mx-auto font-medium">
              Your vision for the {pkg.name} has been received. I'll review your brief and contact you within 24 hours.
            </p>
            <button 
              onClick={onClose}
              className="px-10 py-4 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all duration-300"
            >
              Back to Portfolio
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);
  const [currency, setCurrency] = useState<Currency>('PHP');
  const highEndEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section id="pricing" className="py-24 px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
      {/* Currency Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-[#0f172a] p-1.5 rounded-full flex items-center gap-1 shadow-2xl relative overflow-hidden">
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-blue-600 rounded-full z-0 ${currency === 'PHP' ? 'left-1.5' : 'left-[calc(50%+1.5px)]'}`}
          />
          <button 
            onClick={() => setCurrency('PHP')}
            className={`relative z-10 px-8 sm:px-10 py-3 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${currency === 'PHP' ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Local (PHP)
          </button>
          <button 
            onClick={() => setCurrency('USD')}
            className={`relative z-10 px-8 sm:px-10 py-3 text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${currency === 'USD' ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}
          >
            <Globe2 size={12} />
            Global (USD)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid - Widened for better spacing */}
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch mb-20 max-w-[1280px] mx-auto">
        {PRICING_PACKAGES.map((pkg, idx) => {
          const isPro = pkg.name === 'Professional';
          const displayPrice = currency === 'PHP' ? pkg.pricePHP : pkg.priceUSD;
          const originalPrice = currency === 'PHP' ? pkg.originalPricePHP : pkg.originalPriceUSD;
          const savings = currency === 'PHP' ? pkg.savingsPHP : pkg.savingsUSD;
          
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: highEndEase, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col transition-all duration-500 ${isPro ? 'z-20 lg:scale-[1.03] xl:scale-105' : 'z-10'}`}
            >
              <div className={`flex flex-col h-full bg-white border rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
                isPro 
                  ? 'border-blue-600 ring-2 sm:ring-4 ring-blue-50 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)]' 
                  : 'border-slate-200 shadow-sm'
              }`}>
                {/* Emerald Savings Banner */}
                {savings && (
                  <div className="bg-[#10b981] py-3 text-center relative z-20">
                    <div className="text-[9px] font-black text-white uppercase tracking-[0.2em] flex items-center justify-center gap-2 px-4">
                      <Zap size={12} fill="white" className="flex-shrink-0" />
                      Limited Offer: Save {savings} Instantly
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-10 flex flex-col h-full">
                  {/* Badge Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
                    {isPro && (
                      <div className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded flex items-center gap-1 shadow-sm">
                        <Star size={10} fill="currentColor" />
                        Most Popular
                      </div>
                    )}
                    <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded flex items-center gap-1">
                      <Tag size={10} />
                      Sale Live
                    </div>
                  </div>

                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-3xl sm:text-[2.5rem] font-black text-slate-900 tracking-tighter mb-4 leading-none">{pkg.name}</h3>
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-[280px]">
                      {pkg.bestFor}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-10 flex-grow">
                    {pkg.includes.map((feature) => (
                      <div key={feature} className="flex items-start gap-4">
                        <CheckCircle2 size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-slate-600 font-bold text-[13px] sm:text-[14px] tracking-tight leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Stats - Redesigned to fix Overlap */}
                  <div className="pt-8 border-t border-slate-50 space-y-8">
                    {/* Build Time Vertical Column */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-slate-400 font-black text-[9px] uppercase tracking-widest whitespace-nowrap">
                        <Clock size={16} className="text-blue-500" />
                        Build Time
                      </div>
                      <span className="text-slate-900 font-black text-[15px] pl-[26px]">{pkg.timeline}</span>
                    </div>

                    {/* Investment Vertical Column - Guaranteed No Overlap */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 text-slate-400 font-black text-[9px] uppercase tracking-widest">
                        <Banknote size={16} className="text-blue-500" />
                        Investment
                      </div>
                      
                      <div className="pl-[26px]">
                        {originalPrice && (
                          <div className="flex items-center gap-2 mb-2">
                             <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Was</span>
                             <span className="text-[14px] font-bold text-slate-300 line-through decoration-red-500/20">
                               {originalPrice}
                             </span>
                             <span className="text-[8px] font-black text-[#10b981] uppercase tracking-[0.2em] bg-emerald-50 px-2 py-0.5 rounded-sm">Special</span>
                          </div>
                        )}
                        
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className={`text-4xl sm:text-[2.6rem] font-black tracking-tighter leading-none ${
                            pkg.name === 'Starter' ? 'text-blue-600' :
                            pkg.name === 'Professional' ? 'text-[#f59e0b]' : 'text-slate-900'
                          }`}>
                            {displayPrice}
                          </span>
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{currency}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedPkg(pkg)}
                      className={`w-full py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] ${
                        isPro 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20' 
                          : 'bg-[#0f172a] text-white hover:bg-slate-800'
                      }`}
                    >
                      Select Package
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom Quote Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1100px] mx-auto mb-16"
      >
        <div className="bg-[#0f172a] p-8 sm:p-12 lg:p-14 rounded-[2rem] sm:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
          
          <div className="text-center md:text-left relative z-10 flex-1">
            <h4 className="text-3xl sm:text-[2.5rem] font-black text-white mb-4 tracking-tight leading-tight uppercase">Need a Custom System?</h4>
            <p className="text-slate-400 text-base font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
              Bespoke architecture for unique business logic and heavy automation.
            </p>
          </div>
          <button 
            onClick={() => setSelectedPkg(CUSTOM_PKG)}
            className="w-full md:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-white text-slate-900 rounded-xl font-black uppercase tracking-[0.25em] text-[12px] hover:bg-slate-100 transition-all flex items-center justify-center gap-4 relative z-10 shadow-xl active:scale-95 whitespace-nowrap"
          >
            Custom Quote <ArrowRight size={22} className="text-blue-600" />
          </button>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 sm:mt-14 flex flex-wrap justify-center gap-x-12 sm:gap-x-16 gap-y-6">
          <div className="flex items-center gap-3 text-slate-400 text-[9px] font-black uppercase tracking-[0.35em]">
            <HelpCircle size={18} className="text-blue-500 flex-shrink-0" />
            Timelines confirmed after discovery.
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[9px] font-black uppercase tracking-[0.35em]">
            <CreditCard size={18} className="text-[#10b981] flex-shrink-0" />
            Hosting/Domain billed to client.
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <PackageInquiryModal 
            pkg={selectedPkg} 
            onClose={() => setSelectedPkg(null)} 
            currency={currency}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Pricing;
