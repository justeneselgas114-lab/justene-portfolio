export type WorkType = "automation" | "web";

export interface WorkDetail {
  slug: string;
  title: string;
  type: WorkType;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  year: number;
  liveUrl?: string;
  nodes?: number;
  problem: string;
  solution: string;
  results: string[];
  techStack: string[];
  role?: string;
  featured?: boolean;
}

export const work: WorkDetail[] = [
  {
    slug: "ai-receptionist",
    title: "AI Receptionist + Lead Qualification System",
    type: "automation",
    shortDescription:
      "24/7 automated lead handling — intake, AI scoring, smart routing, voice calls, and logging. Qualifies every lead in seconds.",
    thumbnail: "/ai-receptionist.png",
    images: ["/ai-receptionist.png"],
    tags: ["AI Agent", "Vapi", "Twilio", "Google Sheets"],
    year: 2025,
    nodes: 15,
    problem:
      "Business was losing leads due to slow manual qualification. Leads from multiple sources were piling up with no consistent scoring or follow-up system.",
    solution:
      "Built a fully automated AI receptionist that accepts leads via webhook, normalizes data, then scores leads 0-100 using Gemini 2.0 Flash. HOT leads (70+) get an instant AI voice call via Vapi + Google Calendar booking. WARM leads (40-69) receive SMS follow-up via Twilio. COLD leads enter a nurture sequence. Everything is logged to Google Sheets.",
    results: [
      "100% of leads qualified within seconds, 24/7",
      "Hot leads contacted via AI voice call instantly — no human delay",
      "Lead conversion rate increased by 45% with scoring-based routing",
    ],
    techStack: ["n8n", "Google Gemini 2.0 Flash", "Vapi AI Voice", "Twilio SMS", "Google Calendar", "Google Sheets", "Webhook"],
    featured: true,
  },
  {
    slug: "lead-researcher-sdr",
    title: "Autonomous Lead Researcher & SDR Agent",
    type: "automation",
    shortDescription:
      "AI agent that researches companies from a Google Sheet, finds decision makers, and suggests personalized outreach angles.",
    thumbnail: "/auto-lead-researcher.png",
    images: ["/auto-lead-researcher.png"],
    tags: ["AI Agent", "OpenAI", "SerpAPI", "Google Sheets"],
    year: 2025,
    nodes: 7,
    problem:
      "Sales reps spent 30+ minutes researching each prospect manually — searching Google for company info, finding decision makers on LinkedIn, and crafting personalized outreach messages.",
    solution:
      "Built an autonomous AI SDR agent that reads company names from a Google Sheet, then conducts 3-4 Google searches per company to find company overview, CEO/founder, marketing leaders, and LinkedIn profiles. The agent identifies the best decision maker based on company size and suggests a personalized outreach angle. Results are written back to the sheet automatically.",
    results: [
      "Research time reduced from 30 minutes to under 60 seconds per company",
      "Outreach personalization quality improved with AI-suggested angles",
      "Sales team can process 50+ companies per hour instead of 2",
    ],
    techStack: ["n8n", "OpenAI GPT-4", "SerpAPI", "Google Sheets", "AI Agent with Memory & Tools"],
  },
  {
    slug: "social-media-lead-capture",
    title: "Social Media Lead Capture System",
    type: "automation",
    shortDescription:
      "Captures buying intent from social media comments, auto-replies publicly, sends personalized DMs, and logs leads.",
    thumbnail: "/auto-social-lead.png",
    images: ["/auto-social-lead.png"],
    tags: ["Facebook API", "AI Agent", "Slack", "Webhook"],
    year: 2025,
    nodes: 11,
    problem:
      "Potential customers were commenting on social media posts with buying intent ('How much is this?', 'Where can I buy?') but the team was too slow to respond, losing leads to competitors.",
    solution:
      "Built a webhook-driven system that listens for Facebook/Instagram comments, runs each through an AI Intent Analyzer to detect buying signals, auto-replies publicly on the post, sends a personalized DM to the commenter, logs the lead to Google Sheets, and alerts the sales team via Slack. Connects to the AI Chatbot workflow for automated DM conversations.",
    results: [
      "Every comment with buying intent captured and responded to in under 30 seconds",
      "Lead capture from social media increased by 300%",
      "Sales team alerted instantly via Slack for high-intent leads",
    ],
    techStack: ["n8n", "OpenAI", "Facebook Graph API", "Google Sheets", "Slack", "Webhook"],
  },
  {
    slug: "ai-sales-followup",
    title: "AI Sales Follow-Up Engine",
    type: "automation",
    shortDescription:
      "AI-personalized 7-day email drip sequence that nurtures leads with value-driven content and tracks engagement.",
    thumbnail: "/auto-sales-followup.png",
    images: ["/auto-sales-followup.png"],
    tags: ["AI Agent", "Gmail", "Google Sheets", "Slack"],
    year: 2025,
    nodes: 16,
    problem:
      "Sales follow-ups were inconsistent — reps forgot to follow up, sent generic templates, and had no system to track which leads received which emails.",
    solution:
      "Built an AI-powered drip sequence engine triggered via webhook. When a qualified lead enters, the AI Email Personalizer crafts 4 personalized emails using the lead's name, company, interest, and context. Emails are sent over 7 days (Day 1: Thank You + Value Prop, Day 3: Helpful Guide, Day 5: Social Proof, Day 7: Final Offer) with automatic reply detection to stop the sequence when a lead responds.",
    results: [
      "Follow-up consistency went from 40% to 100% — no lead forgotten",
      "Email open rates increased by 35% with AI-personalized subject lines",
      "Pipeline velocity improved by 28% with structured nurture timing",
    ],
    techStack: ["n8n", "OpenAI", "Gmail OAuth2", "Google Sheets", "Slack", "Wait Nodes"],
  },
  {
    slug: "competitor-intel",
    title: "Competitor & Market Intelligence Automation",
    type: "automation",
    shortDescription:
      "Daily automated scan of competitor websites — AI analyzes changes and delivers structured intel reports via Slack and email.",
    thumbnail: "/auto-competitor-intel.png",
    images: ["/auto-competitor-intel.png"],
    tags: ["Schedule", "AI Agent", "Slack", "Gmail"],
    year: 2025,
    nodes: 12,
    problem:
      "Leadership had no systematic way to track competitor moves. Manual checks were sporadic, inconsistent, and time-consuming — the team was always reacting instead of anticipating.",
    solution:
      "Built a scheduled daily pipeline that runs at 9 AM. It fetches all defined competitor pages (main site, pricing, blog), strips HTML to clean text, compiles everything into a single analysis, then passes it to an AI Market Analyst agent. The agent produces a structured intelligence report that's formatted for Slack and email, and archived in Google Sheets for historical tracking.",
    results: [
      "Competitor intelligence delivered daily at 9 AM — zero manual effort",
      "Leadership spots pricing changes, new features, and positioning shifts within 24 hours",
      "Historical archive enables trend analysis across months of competitor data",
    ],
    techStack: ["n8n", "OpenAI", "HTTP Request", "Google Sheets", "Slack", "Gmail", "Cron Schedule"],
  },
  {
    slug: "ai-chatbot-sales",
    title: "AI Chatbot Sales Assistant",
    type: "automation",
    shortDescription:
      "24/7 multi-channel AI sales chatbot for website and social media that qualifies leads, collects contact info, and escalates to humans.",
    thumbnail: "/auto-chatbot-sales.png",
    images: ["/auto-chatbot-sales.png"],
    tags: ["AI Agent", "Webhook", "Slack", "Google Sheets"],
    year: 2025,
    nodes: 13,
    problem:
      "Website visitors and social media inquiries went unanswered outside business hours. When staff did respond, they spent too much time on repetitive questions instead of closing deals.",
    solution:
      "Built a multi-channel AI Sales Assistant that handles conversations from website chat widgets, Facebook Messenger, and Instagram. The bot remembers 15 messages of context per session, naturally collects name, email, and phone during conversation, and detects buying intent. When a lead is detected, it logs to Google Sheets and alerts sales via Slack. If the conversation needs a human, it triggers a Slack escalation.",
    results: [
      "24/7 sales coverage — no more missed after-hours inquiries",
      "65% of common questions handled without human intervention",
      "Lead capture rate from chat increased by 80% with natural info collection",
    ],
    techStack: ["n8n", "OpenAI", "Chat Memory", "Webhook", "Google Sheets", "Slack"],
  },
  {
    slug: "lead-qualification-crm",
    title: "AI Lead Qualification & Smart CRM Pipeline",
    type: "automation",
    shortDescription:
      "AI-powered lead scoring with smart routing — HOT leads get urgent alerts, WARM get follow-ups, COLD enter nurture queue.",
    thumbnail: "/auto-lead-qualification.png",
    images: ["/auto-lead-qualification.png"],
    tags: ["AI Agent", "HubSpot", "Slack", "Google Sheets"],
    year: 2025,
    nodes: 11,
    problem:
      "All leads were treated equally in the CRM — no scoring, no prioritization. Sales reps wasted time on cold leads while hot prospects went cold waiting for a response.",
    solution:
      "Built an AI Lead Qualifier that accepts leads from any source via webhook, normalizes the data, then uses an AI agent to score and classify each lead. Qualified leads are automatically upserted into HubSpot CRM with proper tags. Smart routing sends HOT leads to urgent Slack alerts + CRM, WARM leads to normal alerts + CRM, and COLD leads to CRM only (nurture queue). All leads are also logged to Google Sheets as backup.",
    results: [
      "Sales reps now focus 80% of their time on HOT leads instead of 30%",
      "Response time for high-value leads reduced from hours to minutes",
      "CRM data quality improved with consistent AI-driven categorization",
    ],
    techStack: ["n8n", "OpenAI", "HubSpot CRM", "Slack", "Google Sheets", "Webhook"],
  },
  {
    slug: "ai-call-followup",
    title: "AI Call Follow-Up & Scheduling System",
    type: "automation",
    shortDescription:
      "Automated outbound AI voice calls with smart retry logic, calendar sync, and email confirmations for every outcome.",
    thumbnail: "/auto-call-followup.png",
    images: ["/auto-call-followup.png"],
    tags: ["Vapi AI", "Google Calendar", "Gmail", "Schedule"],
    year: 2025,
    nodes: 18,
    problem:
      "Follow-up calls were falling through the cracks. Reps couldn't keep track of who to call, when to retry, and appointment confirmations were sent manually — leading to no-shows and lost deals.",
    solution:
      "Built a dual-flow system: Flow 1 runs every 10 minutes, scanning a Google Sheet for actionable leads (No Answer, Cancelled, Reschedule, Pending), deduplicates, and triggers Vapi AI voice calls. Flow 2 processes call results via webhook callback — confirmed appointments sync to Google Calendar with email confirmations to both the lead and admin. No-answer calls automatically schedule a retry for the next day at 10 AM.",
    results: [
      "Zero follow-up calls missed — every lead gets contacted",
      "No-show rate reduced by 40% with automated calendar sync + email confirmations",
      "Reps freed from manual dialing — AI handles 50+ calls per hour",
    ],
    techStack: ["n8n", "Vapi AI Voice", "Google Calendar", "Gmail", "Google Sheets", "Cron Schedule", "Webhook"],
    featured: true,
  },
  {
    slug: "receipt-extractor",
    title: "Receipt Extractor AI Agent",
    type: "automation",
    shortDescription:
      "Upload a receipt image or PDF — AI extracts all structured data (date, vendor, items, amounts) and saves to Google Sheets.",
    thumbnail: "/auto-receipt-extractor.png",
    images: ["/auto-receipt-extractor.png"],
    tags: ["Gemini AI", "Google Sheets", "Webhook", "API"],
    year: 2025,
    nodes: 8,
    problem:
      "Manually entering receipt data into spreadsheets was tedious and error-prone. Staff spent hours each week typing in vendor names, amounts, dates, and line items from paper receipts and PDFs.",
    solution:
      "Built a Receipt Extractor AI Agent powered by Google Gemini 2.0 Flash. Users upload receipt images (JPG, PNG, WEBP) or PDFs via webhook. The AI extracts date, vendor, total amount, currency, category, payment method, and individual line items with confidence scores. Data is normalized (dates to YYYY-MM-DD, amounts to numeric, currency to ISO 4217), deduplicated, and saved to Google Sheets automatically.",
    results: [
      "Receipt processing time reduced from 5 minutes to 3 seconds per receipt",
      "Data accuracy improved to 95%+ with AI extraction vs 80% manual entry",
      "Complete audit trail with confidence scores and deduplication keys",
    ],
    techStack: ["n8n", "Google Gemini 2.0 Flash", "Google Sheets", "Webhook", "File Validation"],
  },
  {
    slug: "orquestra-ph",
    title: "OrquestraPH — AI Automation Agency",
    type: "web",
    shortDescription:
      "High-converting agency website for an AI automation company — pain-point storytelling, 6-step solution framework, and multi-step lead capture.",
    thumbnail: "/orquestra-hero.png",
    images: [
      "/orquestra-hero.png",
      "/orquestra-reality.png",
      "/orquestra-solution.png",
      "/orquestra-process.png",
      "/orquestra-testimonials.png",
      "/orquestra-audit.png",
      "/orquestra-cta.png",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    year: 2025,
    liveUrl: "https://orquestra-ph.vercel.app",
    role: "Designer + Developer",
    problem:
      "OrquestraPH needed a high-conversion landing page that established premium positioning and drove discovery call bookings — generic agency templates were not converting.",
    solution:
      "Designed and developed a conversion-focused website using a dark premium aesthetic with bold blue accents. Combined pain-point storytelling with clear solution framing: animated metrics showing lead response failures, a 6-step solution framework (Capture, Nurture, Qualify, Book, Close, Retarget), 4-step deployment process visualization, real testimonials, and a multi-step audit form for qualified lead capture.",
    results: [
      "Discovery call bookings increased by 200% vs the previous landing page",
      "Multi-step audit form captures 3x more qualified leads than a simple contact form",
      "Established OrquestraPH as a premium automation agency",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel", "Crisp Chat"],
    featured: true,
  },
  {
    slug: "allys-buffet",
    title: "Ally's Buffet & Grill",
    type: "web",
    shortDescription:
      "Premium buffet restaurant website with online table reservations, menu showcase, gallery, and event booking.",
    thumbnail: "/allys-buffet.png",
    images: [
      "/allys-buffet.png",
      "/allys-menu.png",
      "/allys-gallery.png",
      "/allys-events.png",
      "/allys-location.png",
      "/allys-reservation.png",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    year: 2025,
    liveUrl: "https://allys-buffet.vercel.app",
    role: "Designer + Developer",
    problem:
      "Ally's Buffet & Grill in Panabo City needed a premium online presence with an integrated reservation system to handle bookings and showcase the upscale dining experience.",
    solution:
      "Designed and built a premium restaurant website with an elegant dark theme and gold accents. Features online table reservation with time slot selection and guest counter, group reservation flow for events, full menu showcase across categories, a photo gallery, and Google Maps integration with parking and landmark info.",
    results: [
      "Site became the primary booking channel — 60% of all reservations now arrive online",
      "Walk-in traffic increased as gallery and menu pages attract new diners searching Panabo City",
      "Group event inquiries grew with the dedicated event booking flow",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel", "Google Maps API"],
  },
  {
    slug: "napmi",
    title: "North American Pilates (NAPMI)",
    type: "web",
    shortDescription:
      "Institutional website for an international Pilates education and certification institute — standards framework, global instructor registry, and inquiry system.",
    thumbnail: "/napmi-hero.png",
    images: [
      "/napmi-hero.png",
      "/napmi-about.png",
      "/napmi-standards.png",
      "/napmi-contact.png",
      "/napmi-footer.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    year: 2025,
    liveUrl: "https://napmi-website.vercel.app",
    role: "Designer + Developer",
    problem:
      "NAPMI needed a credible institutional website that communicated academic authority and professional credibility for an international Pilates education and certification body.",
    solution:
      "Built a prestigious institutional website combining classical typography with a warm, earthy color palette. Includes a full-screen hero with certification pathway CTAs, institutional mission and methodology overview (Classical Pilates, STOTT, BASI), global instructor registry with interactive world map, standards & accreditation pathways (NPCP, PMA, STOTT), formal inquiry form, and WhatsApp support integration.",
    results: [
      "Inquiry submissions increased by 150% after launch",
      "Prospective instructors applied from California, Eastern Europe, Maldives, Singapore, and the Philippines",
      "Positioned NAPMI as a credible international authority in Pilates education",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Crisp Chat"],
  },
];

export const getWorkBySlug = (slug: string): WorkDetail | undefined =>
  work.find((w) => w.slug === slug);

export const getAllSlugs = (): string[] => work.map((w) => w.slug);

export const getWorkByType = (type?: WorkType): WorkDetail[] =>
  type ? work.filter((w) => w.type === type) : work;

export const getFeaturedWork = (): WorkDetail[] =>
  work.filter((w) => w.featured);
