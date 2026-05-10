export type WorkType = "automation" | "web";

export interface WorkAgent {
  name: string;
  role: string;
  description: string;
}

export interface WorkTestimonial {
  quote: string;
  author: string;
  role: string;
  business: string;
}

export interface WorkImageGroup {
  label: string;
  description?: string;
  images: string[];
}

export interface ClaudeCodeStack {
  summary: string;
  agents?: string[];
  skills?: string[];
  mcps?: string[];
  hooks?: string[];
}

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
  status?: string;
  agents?: WorkAgent[];
  testimonials?: WorkTestimonial[];
  imageGroups?: WorkImageGroup[];
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  claudeCode?: ClaudeCodeStack;
}

export const work: WorkDetail[] = [
  {
    slug: "maxicare-aria",
    title: "Maxicare Aria — Health Insurance AI Agent",
    type: "automation",
    shortDescription:
      "Multi-workflow AI agent for a Maxicare + Manulife insurance brokerage — answers FB DMs, qualifies prospects, finds accredited doctors from a Postgres registry, files lead packets to agents, and runs a Stage-3 lab-result follow-up cron.",
    thumbnail: "/maxicare-aria/01-fb-lead-notify.png",
    thumbnailWidth: 1920,
    thumbnailHeight: 1080,
    images: [
      "/maxicare-aria/01-fb-lead-notify.png",
      "/maxicare-aria/02-submit-lead-notify.png",
      "/maxicare-aria/03-kb-ingestion.png",
      "/maxicare-aria/04-lab-followup-cron.png",
      "/maxicare-aria/05-find-doctor.png",
    ],
    tags: ["AI Agent", "Supabase Vector", "Meta Graph API", "Postgres", "Gmail"],
    year: 2026,
    nodes: 32,
    problem:
      "A Maxicare + Manulife insurance brokerage was losing inquiries on Facebook — DMs about HMO coverage, accredited doctors, and lab-result follow-ups went unanswered after hours. Agents typed the same plan explainers a hundred times a day, manually searched a 5,000-row accredited-physician spreadsheet, and forgot Stage-3 client lab follow-ups. Every missed reply was a lost commission.",
    solution:
      "Built Aria — a four-workflow AI agent system that handles the entire FB-to-policy funnel. Workflow 1 (Aria Core) verifies Meta webhooks, routes events, and runs the AI Agent grounded on a Supabase pgvector knowledge base of Maxicare + Manulife plans, with Postgres chat memory and two callable tools: find_doctor and submit_lead. Workflow 2 (KB Ingestion) lets the broker drag-and-drop policy PDFs into a form — files are chunked via RecursiveCharacterTextSplitter, embedded with OpenAI, and upserted into Supabase. Workflow 3 (Find Doctor) executes a typed Postgres query against the accredited-physician registry and formats results back to the agent. Workflow 4 (Submit Lead) sanitizes intake, inserts the lead, builds a structured email packet, and emails both the assigned agent and the patient — attaching the right application form PDF when applicable. A daily 10 AM Manila cron (Workflow 5) sweeps eligible Stage-3 leads, sends a follow-up DM via Meta Graph API, marks the row, and posts a daily summary to Ops via Gmail.",
    results: [
      "Every FB DM answered in under 1 second, 24/7 — bilingual EN/TL, grounded on real Maxicare + Manulife policy docs",
      "Accredited-doctor lookup dropped from 3-5 minutes (manual spreadsheet) to <200 ms (typed Postgres query via tool call)",
      "Zero forgotten Stage-3 lab-result follow-ups since the cron shipped — daily summary lands in Ops inbox at 10:05 AM MNL",
      "Lead packets now arrive in the agent's inbox structured (name, plan, contact, summary, attached PDF form) — agents close instead of triaging",
    ],
    techStack: [
      "n8n",
      "OpenAI (Chat + Embeddings)",
      "Supabase pgvector",
      "Postgres Chat Memory",
      "Meta Graph API (FB Messenger)",
      "Gmail OAuth2",
      "Cron Schedule (Asia/Manila)",
      "AI Agent with Tools",
    ],
    featured: true,
    claudeCode: {
      summary:
        "Aria's five-workflow architecture (core agent + KB ingestion + find-doctor tool + submit-lead tool + Stage-3 cron) was scaffolded inside Claude Code with the n8n-workflow-architect agent. Tool schemas + Meta webhook verification logic validated by n8n-validation-expert before deploy; pgvector retrieval tuned with postgres-patterns.",
      agents: ["n8n-workflow-architect"],
      skills: [
        "n8n-auto-build",
        "n8n-workflow-patterns",
        "n8n-node-configuration",
        "n8n-validation-expert",
        "n8n-expression-syntax",
        "postgres-patterns",
      ],
      mcps: ["n8n-mcp-tools"],
    },
    imageGroups: [
      {
        label: "Aria Core — FB Webhook → AI Agent → Reply",
        description:
          "Main agent workflow. Verifies Meta webhook, routes event type, extracts message, runs the AI Agent grounded on Supabase pgvector with Postgres chat memory and two tools (find_doctor, submit_lead), then sends the FB reply.",
        images: ["/maxicare-aria/01-fb-lead-notify.png"],
      },
      {
        label: "Submit Lead — Tool Workflow",
        description:
          "Called by Aria when a prospect commits. Sanitizes intake, inserts lead row, builds structured email content, sends to assigned agent, then conditionally fetches and emails the patient application-form PDF.",
        images: ["/maxicare-aria/02-submit-lead-notify.png"],
      },
      {
        label: "KB Ingestion — Drag-and-Drop Policy PDFs",
        description:
          "Broker uploads Maxicare + Manulife policy docs through a form. Recursive character splitter chunks the text, OpenAI embeddings vectorize it, Supabase Vector Store upserts — no devops needed.",
        images: ["/maxicare-aria/03-kb-ingestion.png"],
      },
      {
        label: "Stage-3 Lab-Result Follow-up — Daily 10 AM MNL Cron",
        description:
          "Scheduled sweep of eligible Stage-3 leads. Fetches from Postgres, builds the follow-up message, sends FB DM via Meta Graph, marks the row, aggregates a run summary, and emails Ops a daily digest.",
        images: ["/maxicare-aria/04-lab-followup-cron.png"],
      },
      {
        label: "Find Doctor — Accredited-Physician Tool",
        description:
          "Sub-workflow exposed to the AI Agent as a tool. Executes a typed Postgres query against the accredited-physician registry (Maxicare + Manulife panels) and formats results for the agent's reply.",
        images: ["/maxicare-aria/05-find-doctor.png"],
      },
    ],
  },
  {
    slug: "ai-receptionist",
    title: "AI Receptionist + Lead Qualification System",
    type: "automation",
    shortDescription:
      "24/7 automated lead handling — intake, AI scoring, smart routing, voice calls, and logging. Qualifies every lead in seconds.",
    thumbnail: "/ai-receptionist.png",
    thumbnailWidth: 1703,
    thumbnailHeight: 699,
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
    claudeCode: {
      summary:
        "Built end-to-end inside Claude Code — workflow scaffolded by the n8n-workflow-architect agent, scoring prompt iterated with Sonnet, and credentials wired through the n8n MCP without leaving the terminal.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-node-configuration", "n8n-validation-expert", "n8n-expression-syntax"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "lead-researcher-sdr",
    title: "Autonomous Lead Researcher & SDR Agent",
    type: "automation",
    shortDescription:
      "AI agent that researches companies from a Google Sheet, finds decision makers, and suggests personalized outreach angles.",
    thumbnail: "/auto-lead-researcher.png",
    thumbnailWidth: 1407,
    thumbnailHeight: 723,
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
    claudeCode: {
      summary:
        "Search-tool wiring + agent system prompt designed inside Claude Code with the n8n-workflow-architect agent. Tool schemas validated by n8n-validation-expert before deploy.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-validation-expert", "n8n-workflow-patterns"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "social-media-lead-capture",
    title: "Social Media Lead Capture System",
    type: "automation",
    shortDescription:
      "Captures buying intent from social media comments, auto-replies publicly, sends personalized DMs, and logs leads.",
    thumbnail: "/auto-social-lead.png",
    thumbnailWidth: 1431,
    thumbnailHeight: 601,
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
    claudeCode: {
      summary:
        "Intent-detection prompt + Meta Graph webhook flow scaffolded with Claude Code in the loop. n8n-workflow-architect agent generated the comment→DM funnel; expression syntax skills caught typing bugs before deploy.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-expression-syntax", "n8n-node-configuration"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "ai-sales-followup",
    title: "AI Sales Follow-Up Engine",
    type: "automation",
    shortDescription:
      "AI-personalized 7-day email drip sequence that nurtures leads with value-driven content and tracks engagement.",
    thumbnail: "/auto-sales-followup.png",
    thumbnailWidth: 1679,
    thumbnailHeight: 545,
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
    claudeCode: {
      summary:
        "4-step drip sequence designed pair-style with Claude Code. Email personalization prompts iterated against eval set; wait-node timing tuned with n8n-workflow-patterns.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-workflow-patterns", "n8n-expression-syntax"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "competitor-intel",
    title: "Competitor & Market Intelligence Automation",
    type: "automation",
    shortDescription:
      "Daily automated scan of competitor websites — AI analyzes changes and delivers structured intel reports via Slack and email.",
    thumbnail: "/auto-competitor-intel.png",
    thumbnailWidth: 1689,
    thumbnailHeight: 628,
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
    claudeCode: {
      summary:
        "Cron pipeline + HTML→clean-text transform built inside Claude Code. Market-analyst agent system prompt evolved through real competitor pages.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-workflow-patterns", "n8n-validation-expert"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "ai-chatbot-sales",
    title: "AI Chatbot Sales Assistant",
    type: "automation",
    shortDescription:
      "24/7 multi-channel AI sales chatbot for website and social media that qualifies leads, collects contact info, and escalates to humans.",
    thumbnail: "/auto-chatbot-sales.png",
    thumbnailWidth: 1396,
    thumbnailHeight: 643,
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
    claudeCode: {
      summary:
        "Multi-channel chat agent (web + Messenger + Instagram) built with Claude Code. Memory window + intent detection iterated with the n8n-workflow-architect agent.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-node-configuration", "n8n-workflow-patterns"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "lead-qualification-crm",
    title: "AI Lead Qualification & Smart CRM Pipeline",
    type: "automation",
    shortDescription:
      "AI-powered lead scoring with smart routing — HOT leads get urgent alerts, WARM get follow-ups, COLD enter nurture queue.",
    thumbnail: "/auto-lead-qualification.png",
    thumbnailWidth: 1683,
    thumbnailHeight: 736,
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
    claudeCode: {
      summary:
        "Lead-scoring rubric + HubSpot upsert flow shipped with Claude Code in the loop. Routing branches generated by the n8n-workflow-architect agent.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-validation-expert", "n8n-workflow-patterns"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "ai-call-followup",
    title: "AI Call Follow-Up & Scheduling System",
    type: "automation",
    shortDescription:
      "Automated outbound AI voice calls with smart retry logic, calendar sync, and email confirmations for every outcome.",
    thumbnail: "/auto-call-followup.png",
    thumbnailWidth: 1099,
    thumbnailHeight: 733,
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
    claudeCode: {
      summary:
        "Two-flow architecture (cron scanner + webhook callback handler) designed inside Claude Code. Vapi tool schema + retry logic generated by the n8n-workflow-architect agent.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-workflow-patterns", "n8n-validation-expert", "n8n-expression-syntax"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "receipt-extractor",
    title: "Receipt Extractor AI Agent",
    type: "automation",
    shortDescription:
      "Upload a receipt image or PDF — AI extracts all structured data (date, vendor, items, amounts) and saves to Google Sheets.",
    thumbnail: "/auto-receipt-extractor.png",
    thumbnailWidth: 1311,
    thumbnailHeight: 713,
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
    claudeCode: {
      summary:
        "Gemini multimodal extraction prompt + ISO normalization rules engineered with Claude Code. Confidence-score schema validated by n8n-validation-expert.",
      agents: ["n8n-workflow-architect"],
      skills: ["n8n-auto-build", "n8n-validation-expert", "n8n-expression-syntax"],
      mcps: ["n8n-mcp-tools"],
    },
  },
  {
    slug: "octopulse",
    title: "Octopulse — Multi-tenant AI Ops Platform",
    type: "web",
    shortDescription:
      "Multi-tenant SaaS powered by a fleet of specialized AI agents that turn Facebook ads into booked appointments — answering DMs, qualifying leads, closing sales, and filling the calendar 24/7. Currently in active development with 2 paying users.",
    thumbnail: "/octopulse/05-dashboard.png",
    thumbnailWidth: 1440,
    thumbnailHeight: 900,
    images: [
      "/octopulse/05-dashboard.png",
      "/octopulse/06-overview.png",
      "/octopulse/07-agents.png",
      "/octopulse/08-catalog.png",
      "/octopulse/09-appointments.png",
      "/octopulse/11-conversations.png",
      "/octopulse/12-leads.png",
      "/octopulse/13-ads.png",
      "/octopulse/14-analytics.png",
      "/octopulse/15-insights.png",
      "/octopulse/18-settings-billing.png",
      "/octopulse/19-settings-integrations-facebook.png",
      "/octopulse/02-operation-overview.png",
      "/octopulse/03-operation-tenants.png",
      "/octopulse/04-operation-tenant-detail.png",
      "/octopulse/05-operation-webhooks.png",
      "/octopulse/06-operation-evals.png",
      "/octopulse/07-operation-flags.png",
      "/octopulse/08-operation-audit.png",
    ],
    tags: ["Next.js 16", "AI Agents", "Multi-tenant", "pgvector", "Meta API"],
    year: 2026,
    status: "In Active Development · 2 paying users",
    role: "Solo Developer — Design, Architecture, Engineering",
    problem:
      "Filipino service businesses (clinics, salons, repair shops) burn money on Facebook ads but lose most of the leads — DMs and ad comments go unanswered after hours, qualifying happens manually, and bookings slip through the cracks. The result: high ad spend, low conversion, half-empty calendars.",
    solution:
      "Built a multi-tenant Next.js 16 platform where each business connects their FB Page and lets a coordinated team of AI agents run the entire funnel. The agents work together: one answers product questions on Messenger, one sells to high-intent leads, one closes the deal, and one books the appointment straight into Google Calendar with a PayMongo deposit. Every agent is grounded in a pgvector knowledge base (HNSW + hybrid retrieval) trained on the owner's own docs, menu, and pricing — so replies are accurate, on-brand, and bilingual (EN/TL). A separate /operation console gives the platform admin cross-tenant kill switches, webhook delivery log, golden-DM eval harness, and a tamper-evident audit log.",
    results: [
      "Facebook ad spend converts harder — every comment and DM gets an AI reply in under a second, no lead leaks after hours",
      "Calendars fill themselves — Reservation Agent books appointments end-to-end with deposit collection via PayMongo",
      "AI agents handle 90%+ of inquiries unassisted, escalating only edge cases to the owner",
      "2 live paying tenants in active production; platform iterating weekly toward broader rollout",
    ],
    agents: [
      {
        name: "Inquiry Agent",
        role: "Front-line responder",
        description:
          "Answers every comment and DM in under a second. Pulls from the tenant's grounded knowledge base to reply accurately about products, pricing, hours, and location — in English or Tagalog. Captures contact info naturally during the conversation.",
      },
      {
        name: "Sales Agent",
        role: "Lead qualifier + ad amplifier",
        description:
          "Detects buying intent on FB ad comments, fires the comment-to-DM funnel, and qualifies the lead. Scores intent, surfaces the best-matching service, and hands off only the warmest leads — turning ad spend into pipeline instead of vanity metrics.",
      },
      {
        name: "Closer Agent",
        role: "Deal-maker",
        description:
          "Takes qualified leads and runs the close — handles objections, presents the offer, sends proof, and asks for the booking. Calibrated per tenant on tone, urgency, and pricing flexibility.",
      },
      {
        name: "Reservation Agent",
        role: "Calendar filler",
        description:
          "Books appointments end-to-end inside the chat — checks Google Calendar availability, confirms the slot, collects a PayMongo deposit, and sends reminders. Keeps the calendar full without a single human handoff.",
      },
    ],
    testimonials: [
      {
        quote:
          "Before Octopulse, our Facebook ads were just collecting comments we never answered. Now every single one becomes a real conversation, and most end up booked. Our calendar has never been this full.",
        author: "Maria L.",
        role: "Owner",
        business: "Aesthetic Clinic, Davao City",
      },
      {
        quote:
          "I used to stay up until midnight replying to DMs. Octopulse handles all of it now — and honestly, the AI replies sound better than mine. Bookings doubled in the first month.",
        author: "Joshua R.",
        role: "Founder",
        business: "Salon & Spa, Panabo City",
      },
    ],
    techStack: [
      "Next.js 16 + Turbopack",
      "React 19",
      "TypeScript",
      "PostgreSQL 16 + pgvector (HNSW)",
      "Drizzle ORM",
      "BullMQ + Redis",
      "Better Auth",
      "Anthropic Claude (Sonnet/Haiku)",
      "Google Gemini (embeddings + Pro/Flash)",
      "Meta Graph API v19",
      "PayMongo",
      "Resend",
    ],
    claudeCode: {
      summary:
        "Octopulse is built daily inside Claude Code — Next.js 16 scaffolding via the nextjs-turbopack skill, schema migrations through database-migrations + postgres-patterns, UI iteration with frontend-design + ui-ux-pro-max, and pre-deploy gates via security-review and verification-loop. The four production AI agents (Inquiry / Sales / Closer / Reservation) are versioned as Claude Code agent files and tested with the verification-loop skill before each ship.",
      skills: [
        "nextjs-turbopack",
        "frontend-design",
        "ui-ux-pro-max",
        "database-migrations",
        "postgres-patterns",
        "api-design",
        "browser-qa",
        "tdd-workflow",
        "verification-loop",
        "security-review",
        "repo-scan",
      ],
    },
    imageGroups: [
      {
        label: "Tenant Workspace",
        description:
          "What business owners see — login flow first, then the workspace where AI agents run, leads come in, and bookings are made.",
        images: [
          "/octopulse/01-login.png",
          "/octopulse/02-register.png",
          "/octopulse/03-forgot-password.png",
          "/octopulse/04-reset-password.png",
          "/octopulse/05-dashboard.png",
          "/octopulse/06-overview.png",
          "/octopulse/07-agents.png",
          "/octopulse/08-catalog.png",
          "/octopulse/09-appointments.png",
          "/octopulse/10-contacts.png",
          "/octopulse/11-conversations.png",
          "/octopulse/12-leads.png",
          "/octopulse/13-ads.png",
          "/octopulse/14-analytics.png",
          "/octopulse/15-insights.png",
          "/octopulse/16-profile.png",
          "/octopulse/17-settings.png",
          "/octopulse/18-settings-billing.png",
          "/octopulse/19-settings-integrations-facebook.png",
        ],
      },
      {
        label: "Operator Console",
        description:
          "Restricted platform-admin view — operator login first, then cross-tenant pulse, kill switches, eval harness, webhook log, and audit trail.",
        images: [
          "/octopulse/01-operation-login.png",
          "/octopulse/02-operation-overview.png",
          "/octopulse/03-operation-tenants.png",
          "/octopulse/04-operation-tenant-detail.png",
          "/octopulse/05-operation-webhooks.png",
          "/octopulse/06-operation-evals.png",
          "/octopulse/07-operation-flags.png",
          "/octopulse/08-operation-audit.png",
        ],
      },
    ],
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
