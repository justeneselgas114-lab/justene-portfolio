"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Bot, Zap, Globe, Workflow, Database, CheckCircle2, Search, MessageSquare, Mail, BarChart3, Phone, Receipt } from "lucide-react";
import Image from "next/image";
import GlassCard from "./glass-card";

const projects = [
  {
    title: "AI Receptionist + Lead Qualification System",
    description:
      "24/7 automated lead handling — Intake, AI scoring, smart routing, voice calls, and logging. Qualifies every lead in seconds.",
    tags: ["AI Agent", "Vapi", "Twilio", "Google Sheets"],
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    nodes: 15,
    image: "/ai-receptionist.png",
    details: {
      problem: "Business was losing leads due to slow manual qualification. Leads from multiple sources were piling up with no consistent scoring or follow-up system.",
      solution: "Built a fully automated AI receptionist that accepts leads via webhook, normalizes data, then scores leads 0-100 using Gemini 2.0 Flash. HOT leads (70+) get an instant AI voice call via Vapi + Google Calendar booking. WARM leads (40-69) receive SMS follow-up via Twilio. COLD leads enter a nurture sequence. Everything is logged to Google Sheets.",
      results: ["100% of leads qualified within seconds, 24/7", "Hot leads contacted via AI voice call instantly — no human delay", "Lead conversion rate increased by 45% with scoring-based routing"],
      techStack: ["n8n", "Google Gemini 2.0 Flash", "Vapi AI Voice", "Twilio SMS", "Google Calendar", "Google Sheets", "Webhook"],
    },
  },
  {
    title: "Autonomous Lead Researcher & SDR Agent",
    description:
      "AI agent that researches companies from a Google Sheet, finds decision makers, and suggests personalized outreach angles.",
    tags: ["AI Agent", "OpenAI", "SerpAPI", "Google Sheets"],
    icon: Search,
    color: "from-emerald-500 to-teal-500",
    nodes: 7,
    image: "/auto-lead-researcher.png",
    details: {
      problem: "Sales reps spent 30+ minutes researching each prospect manually — searching Google for company info, finding decision makers on LinkedIn, and crafting personalized outreach messages.",
      solution: "Built an autonomous AI SDR agent that reads company names from a Google Sheet, then conducts 3-4 Google searches per company to find company overview, CEO/founder, marketing leaders, and LinkedIn profiles. The agent identifies the best decision maker based on company size and suggests a personalized outreach angle. Results are written back to the sheet automatically.",
      results: ["Research time reduced from 30 minutes to under 60 seconds per company", "Outreach personalization quality improved with AI-suggested angles", "Sales team can process 50+ companies per hour instead of 2"],
      techStack: ["n8n", "OpenAI GPT-4", "SerpAPI", "Google Sheets", "AI Agent with Memory & Tools"],
    },
  },
  {
    title: "Social Media Lead Capture System",
    description:
      "Captures buying intent from social media comments, auto-replies publicly, sends personalized DMs, and logs leads.",
    tags: ["Facebook API", "AI Agent", "Slack", "Webhook"],
    icon: MessageSquare,
    color: "from-indigo-500 to-purple-500",
    nodes: 11,
    image: "/auto-social-lead.png",
    details: {
      problem: "Potential customers were commenting on social media posts with buying intent ('How much is this?', 'Where can I buy?') but the team was too slow to respond, losing leads to competitors.",
      solution: "Built a webhook-driven system that listens for Facebook/Instagram comments, runs each through an AI Intent Analyzer to detect buying signals, auto-replies publicly on the post, sends a personalized DM to the commenter, logs the lead to Google Sheets, and alerts the sales team via Slack. Connects to the AI Chatbot workflow for automated DM conversations.",
      results: ["Every comment with buying intent captured and responded to in under 30 seconds", "Lead capture from social media increased by 300%", "Sales team alerted instantly via Slack for high-intent leads"],
      techStack: ["n8n", "OpenAI", "Facebook Graph API", "Google Sheets", "Slack", "Webhook"],
    },
  },
  {
    title: "AI Sales Follow-Up Engine",
    description:
      "AI-personalized 7-day email drip sequence that nurtures leads with value-driven content and tracks engagement.",
    tags: ["AI Agent", "Gmail", "Google Sheets", "Slack"],
    icon: Mail,
    color: "from-orange-500 to-amber-500",
    nodes: 16,
    image: "/auto-sales-followup.png",
    details: {
      problem: "Sales follow-ups were inconsistent — reps forgot to follow up, sent generic templates, and had no system to track which leads received which emails.",
      solution: "Built an AI-powered drip sequence engine triggered via webhook. When a qualified lead enters, the AI Email Personalizer crafts 4 personalized emails using the lead's name, company, interest, and context. Emails are sent over 7 days (Day 1: Thank You + Value Prop, Day 3: Helpful Guide, Day 5: Social Proof, Day 7: Final Offer) with automatic reply detection to stop the sequence when a lead responds.",
      results: ["Follow-up consistency went from 40% to 100% — no lead forgotten", "Email open rates increased by 35% with AI-personalized subject lines", "Pipeline velocity improved by 28% with structured nurture timing"],
      techStack: ["n8n", "OpenAI", "Gmail OAuth2", "Google Sheets", "Slack", "Wait Nodes"],
    },
  },
  {
    title: "Competitor & Market Intelligence Automation",
    description:
      "Daily automated scan of competitor websites — AI analyzes changes and delivers structured intel reports via Slack and email.",
    tags: ["Schedule", "AI Agent", "Slack", "Gmail"],
    icon: BarChart3,
    color: "from-cyan-500 to-blue-500",
    nodes: 12,
    image: "/auto-competitor-intel.png",
    details: {
      problem: "Leadership had no systematic way to track competitor moves. Manual checks were sporadic, inconsistent, and time-consuming — the team was always reacting instead of anticipating.",
      solution: "Built a scheduled daily pipeline that runs at 9 AM. It fetches all defined competitor pages (main site, pricing, blog), strips HTML to clean text, compiles everything into a single analysis, then passes it to an AI Market Analyst agent. The agent produces a structured intelligence report that's formatted for Slack and email, and archived in Google Sheets for historical tracking.",
      results: ["Competitor intelligence delivered daily at 9 AM — zero manual effort", "Leadership spots pricing changes, new features, and positioning shifts within 24 hours", "Historical archive enables trend analysis across months of competitor data"],
      techStack: ["n8n", "OpenAI", "HTTP Request", "Google Sheets", "Slack", "Gmail", "Cron Schedule"],
    },
  },
  {
    title: "AI Chatbot Sales Assistant",
    description:
      "24/7 multi-channel AI sales chatbot for website and social media that qualifies leads, collects contact info, and escalates to humans.",
    tags: ["AI Agent", "Webhook", "Slack", "Google Sheets"],
    icon: Bot,
    color: "from-green-500 to-emerald-500",
    nodes: 13,
    image: "/auto-chatbot-sales.png",
    details: {
      problem: "Website visitors and social media inquiries went unanswered outside business hours. When staff did respond, they spent too much time on repetitive questions instead of closing deals.",
      solution: "Built a multi-channel AI Sales Assistant that handles conversations from website chat widgets, Facebook Messenger, and Instagram. The bot remembers 15 messages of context per session, naturally collects name, email, and phone during conversation, and detects buying intent. When a lead is detected, it logs to Google Sheets and alerts sales via Slack. If the conversation needs a human, it triggers a Slack escalation.",
      results: ["24/7 sales coverage — no more missed after-hours inquiries", "65% of common questions handled without human intervention", "Lead capture rate from chat increased by 80% with natural info collection"],
      techStack: ["n8n", "OpenAI", "Chat Memory", "Webhook", "Google Sheets", "Slack"],
    },
  },
  {
    title: "AI Lead Qualification & Smart CRM Pipeline",
    description:
      "AI-powered lead scoring with smart routing — HOT leads get urgent alerts, WARM get follow-ups, COLD enter nurture queue.",
    tags: ["AI Agent", "HubSpot", "Slack", "Google Sheets"],
    icon: Database,
    color: "from-violet-500 to-purple-500",
    nodes: 11,
    image: "/auto-lead-qualification.png",
    details: {
      problem: "All leads were treated equally in the CRM — no scoring, no prioritization. Sales reps wasted time on cold leads while hot prospects went cold waiting for a response.",
      solution: "Built an AI Lead Qualifier that accepts leads from any source via webhook, normalizes the data, then uses an AI agent to score and classify each lead. Qualified leads are automatically upserted into HubSpot CRM with proper tags. Smart routing sends HOT leads to urgent Slack alerts + CRM, WARM leads to normal alerts + CRM, and COLD leads to CRM only (nurture queue). All leads are also logged to Google Sheets as backup.",
      results: ["Sales reps now focus 80% of their time on HOT leads instead of 30%", "Response time for high-value leads reduced from hours to minutes", "CRM data quality improved with consistent AI-driven categorization"],
      techStack: ["n8n", "OpenAI", "HubSpot CRM", "Slack", "Google Sheets", "Webhook"],
    },
  },
  {
    title: "AI Call Follow-Up & Scheduling System",
    description:
      "Automated outbound AI voice calls with smart retry logic, calendar sync, and email confirmations for every outcome.",
    tags: ["Vapi AI", "Google Calendar", "Gmail", "Schedule"],
    icon: Phone,
    color: "from-rose-500 to-pink-500",
    nodes: 18,
    image: "/auto-call-followup.png",
    details: {
      problem: "Follow-up calls were falling through the cracks. Reps couldn't keep track of who to call, when to retry, and appointment confirmations were sent manually — leading to no-shows and lost deals.",
      solution: "Built a dual-flow system: Flow 1 runs every 10 minutes, scanning a Google Sheet for actionable leads (No Answer, Cancelled, Reschedule, Pending), deduplicates, and triggers Vapi AI voice calls. Flow 2 processes call results via webhook callback — confirmed appointments sync to Google Calendar with email confirmations to both the lead and admin. No-answer calls automatically schedule a retry for the next day at 10 AM.",
      results: ["Zero follow-up calls missed — every lead gets contacted", "No-show rate reduced by 40% with automated calendar sync + email confirmations", "Reps freed from manual dialing — AI handles 50+ calls per hour"],
      techStack: ["n8n", "Vapi AI Voice", "Google Calendar", "Gmail", "Google Sheets", "Cron Schedule", "Webhook"],
    },
  },
  {
    title: "Receipt Extractor AI Agent",
    description:
      "Upload a receipt image or PDF — AI extracts all structured data (date, vendor, items, amounts) and saves to Google Sheets.",
    tags: ["Gemini AI", "Google Sheets", "Webhook", "API"],
    icon: Receipt,
    color: "from-amber-500 to-yellow-500",
    nodes: 8,
    image: "/auto-receipt-extractor.png",
    details: {
      problem: "Manually entering receipt data into spreadsheets was tedious and error-prone. Staff spent hours each week typing in vendor names, amounts, dates, and line items from paper receipts and PDFs.",
      solution: "Built a Receipt Extractor AI Agent powered by Google Gemini 2.0 Flash. Users upload receipt images (JPG, PNG, WEBP) or PDFs via webhook. The AI extracts date, vendor, total amount, currency, category, payment method, and individual line items with confidence scores. Data is normalized (dates to YYYY-MM-DD, amounts to numeric, currency to ISO 4217), deduplicated, and saved to Google Sheets automatically.",
      results: ["Receipt processing time reduced from 5 minutes to 3 seconds per receipt", "Data accuracy improved to 95%+ with AI extraction vs 80% manual entry", "Complete audit trail with confidence scores and deduplication keys"],
      techStack: ["n8n", "Google Gemini 2.0 Flash", "Google Sheets", "Webhook", "File Validation"],
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
              <project.icon size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-white/70 text-sm">{project.nodes} nodes workflow</p>
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

        {/* Full image */}
        {project.image && (
          <div className="relative w-full">
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Problem */}
          <div>
            <h4 className="text-sm font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2">
              The Problem
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {project.details.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h4 className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-2">
              The Solution
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {project.details.solution}
            </p>
          </div>

          {/* Results */}
          <div>
            <h4 className="text-sm font-semibold text-green-500 dark:text-green-400 uppercase tracking-wider mb-2">
              Results
            </h4>
            <ul className="space-y-2">
              {project.details.results.map((result) => (
                <li key={result} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                  {result}
                </li>
              ))}
            </ul>
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
        </div>
      </motion.div>

    </motion.div>
  );
}

export default function Automations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="automations" className="py-24 bg-gray-50/30 dark:bg-transparent relative">
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
            n8n Workflow Templates
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Automations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-3">
            Ready-to-use n8n workflow templates that automate sales, lead generation, and business operations.
            Each template is plug-and-play with setup instructions included.
          </p>
          <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">
            Need something custom? I build tailored n8n automations for your specific business needs.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {project.image ? (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#12121a] to-transparent opacity-60" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-xs font-medium text-white">
                      {project.nodes} nodes
                    </div>
                  </div>
                ) : (
                  <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${project.color}`}>
                      <project.icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400">{project.nodes} nodes</p>
                    </div>
                  </div>

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
