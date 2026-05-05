export interface Article {
  slug: string;
  title: string;
  source: string;
  sourceShort: string;
  url: string;
  date: string;
  category: "Strategy" | "Agentic AI" | "Productivity" | "Customer Experience" | "Implementation";
  summary: string;
  takeaway: string;
  featured?: boolean;
}

/**
 * Curated reading list of real, published articles from reputable sources
 * (HBR, McKinsey, BCG, MIT Sloan, Anthropic) on how businesses grow with AI.
 * All URLs verified live as of May 2026.
 */
export const articles: Article[] = [
  {
    slug: "bcg-ai-leaders-revenue-growth",
    title: "AI Leaders Outpace Laggards with Double the Revenue Growth and 40% More Cost Savings",
    source: "Boston Consulting Group",
    sourceShort: "BCG",
    url: "https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings",
    date: "Sep 30, 2025",
    category: "Strategy",
    summary:
      "BCG's annual AI study finds that companies that scale AI deeply across the business grow revenue 2x faster and cut costs 40% more than companies still piloting. The 5% \"future-built\" leaders are the ones systematically integrating AI into core workflows.",
    takeaway:
      "Pilot projects don't move the needle. Revenue lift comes from embedding AI in the operations layer — exactly where n8n, Claude agents, and GoHighLevel sit.",
    featured: true,
  },
  {
    slug: "hbr-7-factors-ai-roi",
    title: "7 Factors That Drive Returns on AI Investments, According to a New Survey",
    source: "Harvard Business Review",
    sourceShort: "HBR",
    url: "https://hbr.org/2026/03/7-factors-that-drive-returns-on-ai-investments-according-to-a-new-survey",
    date: "Mar 2026",
    category: "Strategy",
    summary:
      "HBR analysis of corporate AI spend ($37B in 2025, doubling in 2026) breaks down the seven leading indicators of which companies actually capture ROI — including outcome clarity, workflow integration, and change management.",
    takeaway:
      "Spending on AI ≠ growing with AI. Returns belong to teams that redesign the workflow first, then bolt the model on.",
    featured: true,
  },
  {
    slug: "hbr-designing-agentic-ai",
    title: "Designing a Successful Agentic AI System",
    source: "Harvard Business Review",
    sourceShort: "HBR",
    url: "https://hbr.org/2025/10/designing-a-successful-agentic-ai-system",
    date: "Oct 2025",
    category: "Agentic AI",
    summary:
      "Practical framework for designing AI agents that actually finish work end-to-end — covering tool-use, memory, evaluation harnesses, and the human-in-the-loop boundaries that keep agents safe in production.",
    takeaway:
      "An agent isn't just a chatbot with extra steps. The Octopulse platform was built around exactly this design discipline.",
  },
  {
    slug: "mckinsey-state-of-ai-2025",
    title: "The State of AI in 2025: Agents, Innovation, and Transformation",
    source: "McKinsey & Company",
    sourceShort: "McKinsey",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    date: "2025",
    category: "Strategy",
    summary:
      "McKinsey's flagship annual AI report. 88% of companies have deployed AI somewhere — but only the small fraction with deep workflow integration are seeing meaningful bottom-line impact. Includes adoption benchmarks by function and industry.",
    takeaway:
      "Adoption is no longer the moat. Operationalization is.",
    featured: true,
  },
  {
    slug: "mckinsey-seizing-agentic-advantage",
    title: "Seizing the Agentic AI Advantage",
    source: "McKinsey & Company",
    sourceShort: "McKinsey",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage",
    date: "2025",
    category: "Agentic AI",
    summary:
      "Why 23% of organizations are already scaling agentic AI and another 39% are experimenting. Lays out the org-design and governance changes needed before agents can actually take on whole functions.",
    takeaway:
      "Agents work best when given a real job, not a feature flag.",
  },
  {
    slug: "mckinsey-agents-for-growth",
    title: "Agents for Growth: Turning AI Promise into Impact",
    source: "McKinsey & Company",
    sourceShort: "McKinsey",
    url: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/agents-for-growth-turning-ai-promise-into-impact",
    date: "2025",
    category: "Agentic AI",
    summary:
      "Agentic AI deployed in marketing and sales boosted outreach volume 25× and more than doubled click-through rates vs human-only processes — when given access to the right tools and grounded in customer data.",
    takeaway:
      "This is the exact pattern Octopulse uses for FB-ad inquiries: agents fed by grounded data outperform manual reps at scale.",
    featured: true,
  },
  {
    slug: "mckinsey-agentic-customer-experience",
    title: "Agentic AI and the Future of Customer Experience",
    source: "McKinsey & Company",
    sourceShort: "McKinsey",
    url: "https://www.mckinsey.com/capabilities/operations/our-insights/the-future-of-customer-experience-embracing-agentic-ai",
    date: "2025",
    category: "Customer Experience",
    summary:
      "Case study: enterprise reaches 80% of customer requests automated, redeploys 50% of agent capacity to higher-value work, lifts CSAT to 4.8/5. Roadmap for moving from chatbot to true autonomous CX.",
    takeaway:
      "The bar is no longer \"can the bot answer\" — it's \"can the bot finish the job.\"",
  },
  {
    slug: "mit-sloan-agentic-ai-explained",
    title: "Agentic AI, Explained",
    source: "MIT Sloan",
    sourceShort: "MIT Sloan",
    url: "https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained",
    date: "2025",
    category: "Agentic AI",
    summary:
      "Plain-English primer on what makes an AI \"agentic\" — planning, tool-use, observation, adjustment, repetition. Useful baseline article to share with non-technical stakeholders before pitching automation.",
    takeaway:
      "If your client says \"I want a chatbot,\" send them this first. Then pitch them an agent.",
  },
  {
    slug: "anthropic-building-effective-agents",
    title: "Building Effective AI Agents",
    source: "Anthropic",
    sourceShort: "Anthropic",
    url: "https://www.anthropic.com/research/building-effective-agents",
    date: "2024",
    category: "Implementation",
    summary:
      "Anthropic's official engineering guide to building agents — when to use simple prompt chains vs full agentic loops, how to design tools, when to keep humans in the loop. The reference document for shipping production agents on Claude.",
    takeaway:
      "Most \"agent\" projects should start as a prompt chain. This article is why I don't over-engineer.",
    featured: true,
  },
  {
    slug: "anthropic-productivity-gains",
    title: "Estimating AI Productivity Gains from Claude Conversations",
    source: "Anthropic",
    sourceShort: "Anthropic",
    url: "https://www.anthropic.com/research/estimating-productivity-gains",
    date: "2025",
    category: "Productivity",
    summary:
      "Anthropic's empirical study of real Claude conversations: tasks that take humans ~90 minutes get done ~80% faster with Claude. Projects 1.8% annual US labor productivity growth from current-gen models alone.",
    takeaway:
      "When a client asks \"how much faster, really?\" — point them here. The answer is measured, not marketing.",
  },
  {
    slug: "anthropic-transforming-work",
    title: "How AI Is Transforming Work at Anthropic",
    source: "Anthropic",
    sourceShort: "Anthropic",
    url: "https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic",
    date: "2025",
    category: "Productivity",
    summary:
      "Anthropic employees self-report using Claude in 60% of their work for a 50% productivity boost — 2-3× the prior year. Honest internal look at where AI helps most and where humans are still essential.",
    takeaway:
      "The team building Claude uses Claude this much. That's the proof point.",
  },
];

export const featuredArticles = (): Article[] =>
  articles.filter((a) => a.featured);

export const articlesByCategory = (): Record<string, Article[]> => {
  return articles.reduce<Record<string, Article[]>>((acc, a) => {
    (acc[a.category] ||= []).push(a);
    return acc;
  }, {});
};

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);
