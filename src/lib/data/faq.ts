export interface FaqQuestion {
  slug: string;
  question: string;
  /** Use \n\n for paragraph breaks. Plain text only. */
  answer: string;
  /** Optional jump-to button after answer (e.g. scroll to /#contact). */
  cta?: { label: string; href: string };
  /** Slugs of related questions to surface as follow-up buttons. */
  related?: string[];
}

export interface FaqCategory {
  slug: string;
  icon: string;
  title: string;
  blurb: string;
  questions: FaqQuestion[];
}

const SCROLL_CONTACT = { label: "Go to contact form", href: "#contact" };
const SCROLL_WORK = { label: "See work", href: "#work" };
const SCROLL_EXP = { label: "See experience", href: "#experience" };

export const faq: FaqCategory[] = [
  {
    slug: "services",
    icon: "🛠️",
    title: "Services & what I do",
    blurb: "What I build and who I build it for.",
    questions: [
      {
        slug: "services-overview",
        question: "What services do you offer?",
        answer:
          "Three main lines:\n\n1) AI-powered automations (n8n, GoHighLevel, custom Claude agents) — workflows that run 24/7 and replace manual handoffs.\n\n2) Full-stack web apps (Next.js + React + TypeScript + Tailwind) — landing pages, dashboards, multi-tenant SaaS like Octopulse.\n\n3) Claude Code engineering — custom skills, MCP servers, subagents, and AI integrations that make existing teams ship faster.",
        related: ["services-website", "services-automation", "services-ai-agents"],
      },
      {
        slug: "services-website",
        question: "Can you build a website for me?",
        answer:
          "Yes. I build with Next.js 16 + React 19 + Tailwind 4 + TypeScript. From single-page landings to multi-section institutional sites (NAPMI, Ally's Buffet) to multi-tenant SaaS dashboards (Octopulse). Includes design, build, deploy on Vercel, SEO, and ongoing tweaks.",
        related: ["work-allys", "work-napmi", "process-overview"],
      },
      {
        slug: "services-automation",
        question: "Can you build automations or integrations?",
        answer:
          "Yes — this is my biggest specialty. I've shipped 10+ production n8n workflows plus 2 years of GoHighLevel automation work for Zappify and PropulseVA. I wire your existing tools (Google Sheets, Slack, HubSpot, Gmail, Calendar, Vapi, Twilio, WhatsApp) into one quiet pipeline.",
        related: ["n8n-what-is", "n8n-tools-supported", "work-receptionist"],
      },
      {
        slug: "services-ai-agents",
        question: "Do you build AI agents or chatbots?",
        answer:
          "Yes. I build production AI agents — the four-agent fleet on Octopulse (Inquiry / Sales / Closer / Reservation) is a live example. Powered by Claude (Sonnet/Haiku) or Gemini, grounded in your knowledge base via pgvector, integrated with FB Messenger, web chat, or voice via Vapi.",
        related: ["work-octopulse", "claude-vs-gpt", "claude-mcp"],
      },
      {
        slug: "services-design-or-dev",
        question: "Do you do design + development or just one?",
        answer:
          "Both. I design and develop solo — from Figma mockup to deployed Vercel build. For complex brand systems I'll partner with a designer, but for most client work I own design + code + deploy in one engagement.",
      },
      {
        slug: "services-clients",
        question: "What kind of clients do you work with?",
        answer:
          "Service businesses (clinics, salons, restaurants, repair shops), AI agencies, GoHighLevel power users, and startup founders. Common thread: they want to scale revenue without hiring more people.",
      },
    ],
  },
  {
    slug: "work",
    icon: "💼",
    title: "Past work & projects",
    blurb: "Real shipped projects with real outcomes.",
    questions: [
      {
        slug: "work-flagship",
        question: "What's your biggest flagship project?",
        answer:
          "Octopulse — a multi-tenant SaaS that turns Facebook ads into booked appointments using a coordinated team of four AI agents. Built solo on Next.js 16 + PostgreSQL + pgvector. Currently in active development with 2 paying tenants.",
        cta: SCROLL_WORK,
        related: ["work-octopulse"],
      },
      {
        slug: "work-octopulse",
        question: "Tell me about Octopulse",
        answer:
          "Multi-tenant AI ops platform. Each business connects their FB Page; four AI agents run the funnel (Inquiry replies in <1s, Sales qualifies, Closer handles objections, Reservation books appointments via Google Calendar + PayMongo deposit). Bilingual EN/TL. 2 live paying tenants in aesthetic clinic + salon verticals.",
        cta: SCROLL_WORK,
        related: ["work-flagship", "claude-mcp"],
      },
      {
        slug: "work-receptionist",
        question: "What's the AI Receptionist?",
        answer:
          "24/7 automated lead handling system. Webhook intake → Gemini 2.0 Flash scoring (0-100) → smart routing: HOT leads (70+) get instant Vapi voice call + Google Calendar booking; WARM (40-69) get SMS via Twilio; COLD enter nurture sequence. Result: lead conversion up 45%.",
        cta: SCROLL_WORK,
        related: ["services-automation", "n8n-what-is"],
      },
      {
        slug: "work-websites",
        question: "Show me websites you've built",
        answer:
          "Three production sites: Ally's Buffet & Grill (premium restaurant with online reservations — 60% of bookings now arrive online), NAPMI (international Pilates institute — inquiries up 150% post-launch), and this portfolio site itself.",
        cta: SCROLL_WORK,
        related: ["work-allys", "work-napmi"],
      },
      {
        slug: "work-allys",
        question: "Tell me about Ally's Buffet",
        answer:
          "Premium restaurant site with elegant dark theme + gold accents. Online table reservation with time slot selection, group event flow, full menu, gallery, Google Maps. 60% of all reservations now arrive through the site. Live at allys-buffet.vercel.app.",
        cta: SCROLL_WORK,
      },
      {
        slug: "work-napmi",
        question: "Tell me about NAPMI",
        answer:
          "Institutional website for an international Pilates education and certification body. Standards framework, global instructor registry with interactive map, certification pathway flows, formal inquiry system. Inquiries up 150% after launch — applicants from California, Eastern Europe, Maldives, Singapore, Philippines.",
        cta: SCROLL_WORK,
      },
      {
        slug: "work-automations",
        question: "Show me automations you've shipped",
        answer:
          "10+ production n8n workflows: AI Receptionist, Lead Researcher SDR, Social Media Lead Capture, AI Sales Follow-Up, Competitor Intelligence, AI Chatbot Sales, Lead Qualification CRM, AI Call Follow-Up, Receipt Extractor — plus 9 more in active production.",
        cta: SCROLL_WORK,
        related: ["work-receptionist", "n8n-what-is"],
      },
      {
        slug: "work-testimonials",
        question: "Do you have testimonials?",
        answer:
          "Yes — live tenants on Octopulse have published quotes (Aesthetic Clinic in Davao City, Salon & Spa in Panabo City). Both report bookings doubled in the first month after switching to Octopulse. See the Octopulse case study on the Work page.",
        cta: SCROLL_WORK,
      },
    ],
  },
  {
    slug: "claude",
    icon: "🤖",
    title: "Claude Code & AI skills",
    blurb: "How I use Claude Code as a daily driver.",
    questions: [
      {
        slug: "claude-what-is",
        question: "What is Claude Code?",
        answer:
          "Claude Code is Anthropic's official CLI for Claude — it's the environment I ship from every day. Skills, subagents, MCP servers, hooks, and slash commands all live there. Compared to AI autocomplete, it operates on whole repos, runs verification loops, and chains tools.",
        related: ["claude-how-use", "claude-mcp"],
      },
      {
        slug: "claude-how-use",
        question: "How do you actually use Claude Code?",
        answer:
          "Daily driver. 68 sessions, 11.9M tokens, 28 active days out of 44, longest session 14d 7h 18m. I run 8 user-authored subagents (automation-architect, code-architect, code-generator-builder, code-quality-gatekeeper, debug-problem-solver, n8n-workflow-architect, release-engineer, test-generator-reliability) plus the n8n-mcp server. Real screenshots are on the GitHub Toolkit tab.",
        cta: { label: "See screenshots", href: "#work" },
        related: ["claude-toolkit-repo", "claude-mcp"],
      },
      {
        slug: "claude-why-matters",
        question: "Why does that matter for my project?",
        answer:
          "Speed + quality. Claude Code lets me ship in days what would take a typical dev team weeks. For a client this means: lower cost, faster delivery, and AI-native architecture from day one (not bolted on later).",
      },
      {
        slug: "claude-toolkit-repo",
        question: "Where can I see your Claude Code setup?",
        answer:
          "Public GitHub: github.com/justeneselgas114-lab/claude-code-toolkit — full inventory of skills, agents, hooks, and MCPs I run. Companion to the SHIPLOG.md in my portfolio repo (37+ days of git history mapped to ship cadence).",
        cta: {
          label: "Open toolkit repo",
          href: "https://github.com/justeneselgas114-lab/claude-code-toolkit",
        },
      },
      {
        slug: "claude-mcp",
        question: "Can you build MCP servers + custom skills?",
        answer:
          "Yes. The n8n-mcp server is connected on my machine and powers every n8n workflow I ship. I extend Claude Code with custom skills, subagents, and slash commands as needed per client — published examples coming soon to the toolkit repo.",
        related: ["claude-toolkit-repo"],
      },
      {
        slug: "claude-vs-gpt",
        question: "How is Claude different from ChatGPT for my business?",
        answer:
          "For my workflow Claude wins on: longer context (1M tokens), better tool use / agent reliability, stronger code, and the Claude Code CLI ecosystem. For client agents I pick per use-case — Claude for accuracy + tools, Gemini for cost/speed on extraction, OpenAI when client is already standardized on it.",
      },
    ],
  },
  {
    slug: "n8n",
    icon: "⚙️",
    title: "n8n & automation",
    blurb: "Workflow engineering across your stack.",
    questions: [
      {
        slug: "n8n-what-is",
        question: "What is n8n?",
        answer:
          "Open-source workflow automation. Visual node-based editor that connects your tools (Google Sheets, Slack, HubSpot, Gmail, OpenAI, Vapi, etc.) into multi-step pipelines. I've shipped 10+ production n8n workflows.",
        related: ["n8n-vs-zapier", "n8n-tools-supported"],
      },
      {
        slug: "n8n-tools-supported",
        question: "Can you connect [my tool] to a workflow?",
        answer:
          "Almost certainly. n8n has 400+ native nodes plus generic HTTP/webhook for anything else. Tools I've wired in production: Google Sheets, Gmail, Calendar, Slack, HubSpot, Stripe, Vapi voice AI, Twilio SMS, Facebook Graph, Instagram, OpenAI, Claude, Gemini, SerpAPI. Tell me which tool — I'll confirm.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "n8n-247",
        question: "Will the workflow run 24/7?",
        answer:
          "Yes. n8n runs on a hosted instance (cloud or self-hosted) — workflows fire on schedule, webhook, or trigger 24/7 without my computer being on.",
      },
      {
        slug: "n8n-breaks",
        question: "What if a workflow breaks?",
        answer:
          "Production workflows have error branches + Slack/email alerts on failure. I include monitoring + retry logic by default. Optional ongoing maintenance retainer covers updates when third-party APIs change.",
        related: ["pricing-support"],
      },
      {
        slug: "n8n-vs-zapier",
        question: "n8n vs Make vs Zapier — which should I use?",
        answer:
          "Short version: Zapier for simple single-trigger flows; Make for visual mid-complexity; n8n for serious multi-step automations + AI agents (cheaper, self-hostable, more powerful). I use all three depending on the client. Default recommendation: n8n unless there's a reason not to.",
      },
      {
        slug: "n8n-existing-workflow",
        question: "I already have a workflow — can you fix or improve it?",
        answer:
          "Yes. Workflow audits + rebuilds are common engagement type. Send me the export JSON or screenshots and I'll quote a fix.",
        cta: SCROLL_CONTACT,
      },
    ],
  },
  {
    slug: "pricing",
    icon: "💰",
    title: "Pricing & engagement",
    blurb: "How I price + engage with clients.",
    questions: [
      {
        slug: "pricing-cost",
        question: "How much does a project cost?",
        answer:
          "Depends on scope. Rough ranges: simple landing site from $300-800; multi-page institutional site $800-2500; n8n workflow $200-800 per workflow; multi-agent system or full SaaS — quoted per scope. Best path: book a free 30-min audit and I'll send a fixed quote within 24h.",
        cta: SCROLL_CONTACT,
        related: ["pricing-audit", "pricing-deposit"],
      },
      {
        slug: "pricing-model",
        question: "Hourly or project-based?",
        answer:
          "Project-based with fixed scope + fixed price. Hourly only for ongoing maintenance retainers. Fixed price means you know what you'll pay before we start.",
      },
      {
        slug: "pricing-audit",
        question: "Do you do free audits?",
        answer:
          "Yes — 30-minute free discovery call. I'll review your current setup, map automation opportunities, and follow up with a written quote. No obligation.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "pricing-support",
        question: "Do you offer ongoing support?",
        answer:
          "Yes. Monthly maintenance retainer covers: workflow monitoring, third-party API updates, bug fixes, small new features. Pricing scales with surface area — quoted per engagement.",
      },
      {
        slug: "pricing-minimum",
        question: "What's your minimum engagement?",
        answer:
          "No hard minimum. Smallest engagements are single n8n workflows ($200+) or one-page landing sites ($300+). Below that, better as a paid 1-hour consultation.",
      },
      {
        slug: "pricing-deposit",
        question: "Do you require deposits?",
        answer:
          "50% deposit on project start, 50% on delivery for fixed-scope work. Retainers are billed monthly upfront. Payment via PayPal, Wise, or bank transfer.",
      },
    ],
  },
  {
    slug: "availability",
    icon: "📅",
    title: "Availability",
    blurb: "When I can start and how long things take.",
    questions: [
      {
        slug: "availability-now",
        question: "Are you available now?",
        answer:
          "Yes — 2 slots open this quarter. First-come, first-served. Fastest path to lock a slot is the contact form below.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "availability-timeline",
        question: "How long does a project take?",
        answer:
          "Single n8n workflow: 3-7 days. Landing page: 5-10 days. Multi-page institutional site: 2-3 weeks. Multi-tenant SaaS: 6-12 weeks for MVP, then ongoing iteration. All timelines start after deposit + assets received.",
      },
      {
        slug: "availability-rush",
        question: "Do you take rush projects?",
        answer:
          "Sometimes — depends on current load and scope. Rush projects carry a 25-50% expedite fee. Send the brief and I'll respond within 24h.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "availability-start",
        question: "How fast can you start?",
        answer:
          "Usually within 3-5 business days of deposit clearing. Sometimes same-day if your project fits a current open slot.",
      },
    ],
  },
  {
    slug: "process",
    icon: "🎯",
    title: "Process — how we'll work together",
    blurb: "What an engagement actually looks like.",
    questions: [
      {
        slug: "process-overview",
        question: "What's your process?",
        answer:
          "Five stages:\n\n1) Free 30-min discovery call — I learn your goals, current stack, pain points.\n\n2) Quote + scope doc within 24h.\n\n3) Deposit + kickoff — we share access to tools, you give me brand assets.\n\n4) Build + weekly check-ins (Slack or WhatsApp).\n\n5) Delivery + 14-day support window. Optional retainer after.",
        related: ["process-comm", "process-progress"],
      },
      {
        slug: "process-comm",
        question: "How do we communicate during a project?",
        answer:
          "Default: WhatsApp for quick questions + a shared Notion or Google Doc for spec + weekly written status update. Loom videos for walkthroughs. Slack if you prefer it. I match your team's stack.",
      },
      {
        slug: "process-after-message",
        question: "What happens after I send my first message?",
        answer:
          "Within 24 hours I reply with: clarifying questions, a recommended next step (usually book a free call), and a rough fit assessment. If it's a good fit, the discovery call lands within 3-5 days.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "process-access",
        question: "Do I need to provide tools or accounts?",
        answer:
          "Usually yes — you give me limited access to the systems we're connecting (Google Workspace user, n8n cloud, GHL sub-account, etc.). I never ask for passwords; OAuth or invite-as-collaborator only.",
      },
      {
        slug: "process-progress",
        question: "Can I see progress while you build?",
        answer:
          "Yes. Staging URL or n8n shared workspace from day one. Weekly written status update + Loom walkthrough. You can request changes mid-build.",
      },
    ],
  },
  {
    slug: "about",
    icon: "👤",
    title: "About me",
    blurb: "Background, education, working style.",
    questions: [
      {
        slug: "about-who",
        question: "Who is Justene?",
        answer:
          "Junior Full-Stack Developer + n8n Integrations Specialist + Claude AI Specialist. Based in Davao City, Philippines. Background: 2 years as a GoHighLevel automation specialist at Zappify and PropulseVA. BS Information Technology from Davao Del Norte State College.",
        cta: SCROLL_EXP,
      },
      {
        slug: "about-experience",
        question: "What's your background?",
        answer:
          "Currently shipping Octopulse SaaS + 10+ n8n workflows. Previously: GHL Automation Specialist at Zappify (May 2024 – Feb 2026) and PropulseVA (Feb 2024 – Jan 2026) — building marketing automations, snapshots, sub-accounts, and pipelines for service-business clients.",
        cta: SCROLL_EXP,
      },
      {
        slug: "about-education",
        question: "What's your education?",
        answer:
          "Bachelor of Science in Information Technology, Davao Del Norte State College (graduated June 2025). Plus continuous self-study — Anthropic Academy (Claude API + Claude Code in Action), n8n Academy, DeepLearning.AI agentic workflows.",
      },
      {
        slug: "about-solo",
        question: "Are you solo or part of a team?",
        answer:
          "Solo developer — design, architecture, engineering, deploy. Octopulse and every n8n workflow on this site was shipped solo. I bring in specialists (designer, copywriter, ops) only when scope demands it.",
      },
      {
        slug: "about-why",
        question: "Why this kind of work?",
        answer:
          "Service businesses lose hours to repetitive tasks. AI + automation gives them back those hours without forcing them to grow headcount. The combination of Claude Code + n8n is the fastest leverage I've found to deliver that.",
      },
    ],
  },
  {
    slug: "logistics",
    icon: "🌍",
    title: "Location, timezone & language",
    blurb: "Practical stuff for international clients.",
    questions: [
      {
        slug: "logistics-location",
        question: "Where are you based?",
        answer:
          "Davao City, Philippines. Asia/Manila timezone (UTC+8). Remote-first — I work with clients globally.",
      },
      {
        slug: "logistics-timezone",
        question: "Will the timezone work for my team?",
        answer:
          "Yes for most setups. Manila (UTC+8) overlaps mornings with Australia, evenings with Europe, late evenings with US East Coast. I do async-first by default — written updates + Loom videos — so timezone gap rarely blocks progress.",
      },
      {
        slug: "logistics-language",
        question: "What languages do you work in?",
        answer:
          "English (primary work language). Tagalog/Cebuano for local Philippine clients. Octopulse delivers bilingual EN/TL agent responses for clients serving local + international customers.",
      },
      {
        slug: "logistics-international",
        question: "Do you take international clients?",
        answer:
          "Yes — most clients are outside the Philippines. Payment in USD via PayPal, Wise, or international bank transfer. Contracts in English. I match your communication channel.",
      },
    ],
  },
  {
    slug: "contact",
    icon: "📬",
    title: "Contact & booking",
    blurb: "Fastest ways to reach me.",
    questions: [
      {
        slug: "contact-how",
        question: "How do I reach you?",
        answer:
          "Three options: 1) Contact form below — replies within 24h. 2) WhatsApp +63 963 829 6973 — fastest. 3) Email justene.dev@gmail.com. All three reach me directly, no gatekeepers.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "contact-book-call",
        question: "How do I book a discovery call?",
        answer:
          "Scroll to the contact section and hit the Book a 30-minute discovery call button — opens my Calendly. No pressure, no pitch, just a conversation about your project.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "contact-first-message",
        question: "What should I include in my first message?",
        answer:
          "Three things: 1) What you're trying to fix or build (one sentence). 2) Your current tools/stack if relevant. 3) Rough timeline + budget if you have one. I'll reply with clarifying questions + suggested next step within 24h.",
        cta: SCROLL_CONTACT,
      },
      {
        slug: "contact-socials",
        question: "Where else can I find you?",
        answer:
          "GitHub: github.com/justeneselgas114-lab\nLinkedIn: linkedin.com/in/justene-selgas-152052377\nFacebook: facebook.com/Just10AiAutomation\nWhatsApp: wa.me/639638296973",
      },
    ],
  },
];

export const allQuestions: FaqQuestion[] = faq.flatMap((c) => c.questions);

export const getQuestionBySlug = (slug: string): FaqQuestion | undefined =>
  allQuestions.find((q) => q.slug === slug);
