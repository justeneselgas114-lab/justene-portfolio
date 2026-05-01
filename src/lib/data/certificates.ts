export interface Certificate {
  slug: string;
  title: string;
  issuer: string;
  year: number;
  image?: string; // path under /public, e.g. "/certs/claude-code.png"
  verifyUrl?: string; // optional verification / credential link
  description?: string;
}

/**
 * Placeholder certificates — replace with real ones.
 * Drop the cert image into `public/certs/<filename>` and reference here.
 */
export const certificates: Certificate[] = [
  {
    slug: "claude-code-foundations",
    title: "Claude Code Foundations",
    issuer: "Anthropic",
    year: 2025,
    description: "Mastery of Claude Code CLI, MCP servers, plugins, and skills.",
  },
  {
    slug: "n8n-automation-pro",
    title: "n8n Workflow Automation",
    issuer: "n8n Academy",
    year: 2025,
    description: "Advanced workflow automation, custom nodes, and AI agent orchestration.",
  },
  {
    slug: "anthropic-api-developer",
    title: "Anthropic API Developer",
    issuer: "Anthropic",
    year: 2025,
    description: "Production-ready integration of the Claude API for AI applications.",
  },
  {
    slug: "nextjs-full-stack",
    title: "Next.js Full-Stack Developer",
    issuer: "Vercel",
    year: 2024,
    description: "Server components, server actions, edge runtime, and production deployments.",
  },
];
