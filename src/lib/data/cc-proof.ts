export interface CCProofItem {
  slug: string;
  title: string;
  command: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  description: string;
  highlights: string[];
  link?: { label: string; url: string };
}

/**
 * Real screenshots from the Claude Code CLI on my own machine.
 * Capture date: 2026-05-06. Login: Claude Max · theconceptlogin@gmail.com.
 *
 * These aren't curated demos — they're whatever was on my screen when I
 * ran the slash command. The numbers (sessions, tokens, streaks) are
 * cumulative real usage.
 */
export const ccProof: CCProofItem[] = [
  {
    slug: "agents",
    title: "Custom subagent library",
    command: "/agents",
    image: "/cc-proof/agents.png",
    imageWidth: 1383,
    imageHeight: 800,
    description:
      "Eight project-scoped subagents I authored under ~/.claude/agents — each with its own system prompt, tool allow-list, and model preference. They run inside Claude Code on every project I touch.",
    highlights: [
      "automation-architect · opus — designs end-to-end automation systems",
      "code-architect · opus — repo-wide architectural review",
      "code-generator-builder · opus — scaffolds new modules from spec",
      "code-quality-gatekeeper · sonnet — pre-commit quality gate",
      "debug-problem-solver · opus — root-cause analysis loop",
      "n8n-workflow-architect · sonnet — turns briefs into validated n8n JSON",
      "release-engineer · opus — owns the ship pipeline",
      "test-generator-reliability · opus — generates failure-mode tests",
    ],
    link: {
      label: "See toolkit repo →",
      url: "https://github.com/justeneselgas114-lab/claude-code-toolkit",
    },
  },
  {
    slug: "session-stats",
    title: "Real usage stats — 68 sessions, 11.9M tokens",
    command: "/cost · Stats",
    image: "/cc-proof/cost-stats.png",
    imageWidth: 1383,
    imageHeight: 800,
    description:
      "Cumulative Claude Code session activity from my account. Heat-grid shows 28 active days out of 44, longest single session at 14 days 7 hours, current streak 3 days. This is daily-driver volume, not occasional use.",
    highlights: [
      "Sessions: 68",
      "Total tokens: 11.9M",
      "Active days: 28 / 44",
      "Longest session: 14d 7h 18m",
      "Longest streak: 6 days",
      "Most active day: Apr 20",
      "Favorite model: Opus 4.7",
    ],
  },
  {
    slug: "session-status",
    title: "Live session — Claude Max + Opus 4.7 (1M context)",
    command: "/cost · Status",
    image: "/cc-proof/cost-status.png",
    imageWidth: 1383,
    imageHeight: 800,
    description:
      "Active Claude Code session, version 2.1.128, default model Opus 4.7 with 1M-token context window. Logged in via Claude Max. Settings sourced from User + Shared project + Project local — full layered config.",
    highlights: [
      "Version: 2.1.128",
      "Model: Opus 4.7 with 1M context",
      "Login: Claude Max",
      "MCP servers: 3 connected, 4 awaiting auth",
      "Setting sources: User + Shared project + Project local",
    ],
  },
  {
    slug: "plugins-mcp",
    title: "Installed plugins + connected MCP servers",
    command: "/plugin · /plugins",
    image: "/cc-proof/plugins-mcp.png",
    imageWidth: 1383,
    imageHeight: 800,
    description:
      "Installed plugin (skill-creator) plus the MCP servers wired into my setup. n8n-mcp is locally connected and powers every n8n case study in this portfolio. The supabase / gmail / Google Calendar MCPs are registered and waiting for OAuth on first use.",
    highlights: [
      "skill-creator plugin — installed",
      "n8n-mcp — locally connected · feeds the n8n-workflow-architect agent",
      "supabase MCP — registered (Octopulse data layer)",
      "Gmail + Google Calendar MCPs — registered for client workflows",
    ],
    link: {
      label: "See full skills + MCP inventory →",
      url: "https://github.com/justeneselgas114-lab/claude-code-toolkit/blob/main/skills/README.md",
    },
  },
];
