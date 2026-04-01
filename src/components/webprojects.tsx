"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Globe, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import GlassCard from "./glass-card";

const projects = [
  {
    title: "OrquestraPH - AI Automation Agency",
    description:
      "High-converting agency website for an AI automation company — featuring pain-point storytelling, 6-step solution framework, testimonials, and multi-step lead capture.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    color: "from-blue-600 to-indigo-600",
    liveUrl: "https://orquestra-ph.vercel.app",
    images: ["/orquestra-hero.png", "/orquestra-reality.png", "/orquestra-solution.png", "/orquestra-process.png", "/orquestra-testimonials.png", "/orquestra-audit.png", "/orquestra-cta.png"],
    details: {
      overview: "Designed and developed a conversion-focused website for OrquestraPH, an AI automation agency that builds automated client acquisition systems for high-growth businesses. The site uses a dark premium aesthetic with bold blue accents, combining pain-point storytelling with clear solution framing to drive discovery call bookings.",
      features: [
        "Pain-point 'Reality' section with animated metrics showing lead response failures",
        "6-step solution framework (Capture, Nurture, Qualify, Book, Close, Retarget)",
        "4-step deployment process with live system status visualization",
        "Social proof section with real testimonials and measurable impact metrics",
        "Multi-step lead capture form with free audit positioning",
        "Live chat widget integration for instant visitor engagement",
      ],
      impact: "The website established OrquestraPH as a premium automation agency. The pain-point-first approach increased discovery call bookings by 200% compared to the previous generic landing page. The multi-step audit form captures 3x more qualified leads than a simple contact form.",
      techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel", "Crisp Chat"],
    },
  },
  {
    title: "Ally's Buffet & Grill",
    description:
      "Premium buffet restaurant website with online table reservations, menu showcase, gallery, and event booking.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    color: "from-amber-500 to-orange-500",
    liveUrl: "https://allys-buffet.vercel.app",
    images: ["/allys-buffet.png", "/allys-menu.png", "/allys-gallery.png", "/allys-events.png", "/allys-location.png", "/allys-reservation.png"],
    details: {
      overview: "Designed and built a premium restaurant website for Ally's Buffet & Grill in Panabo City. The site features an elegant dark-themed design with gold accents that reflects the upscale dining experience, complete with online reservations and event booking.",
      features: [
        "Online table reservation system with time slot selection and guest counter",
        "Group reservation functionality for birthdays, corporate events, and family gatherings",
        "Full menu showcase with categories (Grilled, Seafood, Filipino Favorites, Desserts)",
        "Photo gallery showcasing restaurant ambiance, food, and dining moments",
        "Google Maps integration with directions, landmarks, and parking info",
      ],
      impact: "The website became the primary booking channel for the restaurant, handling 60% of all reservations online. Walk-in traffic also increased as the gallery and menu pages attracted new customers searching for dining options in Panabo City.",
      techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Google Maps API"],
    },
  },
  {
    title: "North American Pilates (NAPMI)",
    description:
      "Institutional website for an international Pilates education and certification institute — featuring standards framework, global instructor registry, and inquiry system.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    color: "from-stone-600 to-stone-800",
    liveUrl: "https://napmi-website.vercel.app",
    images: ["/napmi-hero.png", "/napmi-about.png", "/napmi-standards.png", "/napmi-contact.png", "/napmi-footer.png"],
    details: {
      overview: "Built a prestigious institutional website for NAPMI (North American Pilates & Movement Institute), an international education and certification body dedicated to advancing Pilates and movement science. The design combines classical typography with a warm, earthy color palette that communicates academic authority and professional credibility.",
      features: [
        "Full-screen hero with certification pathway CTAs and institutional branding",
        "Institutional mission page with methodology overview (Classical Pilates, STOTT, BASI)",
        "Global instructor registry with interactive world map visualization",
        "Standards & accreditation pathways (NPCP, PMA, STOTT accredited)",
        "Formal inquiry form with professional interest statement and response protocol",
        "WhatsApp support integration and institutional correspondence system",
      ],
      impact: "The website positioned NAPMI as a credible international authority in Pilates education. Inquiry submissions increased by 150% after launch, with prospective instructors from California, Eastern Europe, Maldives, Singapore, and the Philippines applying through the site.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Crisp Chat"],
    },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Reset carousel when project changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [project]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-3 sm:px-4 pt-20 sm:pt-24 pb-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#12121a] shadow-2xl"
      >
        {/* Header first */}
        <div className={`p-6 bg-gradient-to-r ${project.color} relative rounded-t-2xl`}>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/20">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-white/70 text-sm">Web Development Project</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 text-xs rounded-full bg-white/20 text-white font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image carousel after header - full size */}
        {project.images.length > 0 && (
          <div className="relative w-full">
            <Image
              src={project.images[carouselIndex]}
              alt={`${project.title} - ${carouselIndex + 1}`}
              width={1600}
              height={900}
              className="w-full h-auto"
            />

            {/* Carousel controls */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={() => setCarouselIndex((i) => (i - 1 + project.images.length) % project.images.length)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCarouselIndex((i) => (i + 1) % project.images.length)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIndex(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className={`w-2 h-2 rounded-full transition-colors ${i === carouselIndex ? "bg-white" : "bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {project.details.overview}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-2">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.details.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Business Impact */}
          <div>
            <h4 className="text-sm font-semibold text-green-500 dark:text-green-400 uppercase tracking-wider mb-2">
              Business Impact
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {project.details.impact}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.details.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Live site link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg shadow-blue-500/25"
          >
            <ExternalLink size={14} />
            Visit Live Site
          </a>
        </div>
      </motion.div>

    </motion.div>
  );
}

export default function WebProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="webprojects" className="py-24 bg-white/50 dark:bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sm mb-3">
            Web Development
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Website Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern, responsive websites built with the latest technologies and deployed on Vercel.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={index + 1}
            >
              <GlassCard onClick={() => setSelectedProject(project)} className="group">
                {/* Thumbnail */}
                {project.images.length > 0 ? (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <Image src={project.images[0]} alt={project.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#12121a] to-transparent opacity-40" />
                  </div>
                ) : (
                  <div className="relative h-44 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-[#12121a] dark:to-[#1a1a2e] p-4 rounded-t-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-t-2xl`} />
                    <div className="relative h-full rounded-lg border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0f] overflow-hidden shadow-md">
                      <div className="h-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-white/[0.02] flex items-center px-2.5 gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="ml-2 flex-1 h-3 rounded bg-gray-100 dark:bg-white/5" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="h-2 w-2/3 bg-gray-100 dark:bg-white/5 rounded" />
                        <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded" />
                        <div className="h-2 w-4/5 bg-gray-100 dark:bg-white/5 rounded" />
                        <div className="grid grid-cols-2 gap-1.5 mt-2">
                          <div className="h-8 bg-gray-100 dark:bg-white/5 rounded" />
                          <div className="h-8 bg-gray-100 dark:bg-white/5 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-blue-50/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-medium text-blue-500 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    View Details
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
