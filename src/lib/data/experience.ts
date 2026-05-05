export interface ExperienceRole {
  slug: string;
  company: string;
  title: string;
  location: string;
  remote: boolean;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: ExperienceRole[] = [
  {
    slug: "zappify",
    company: "Zappify.io",
    title: "GoHighLevel Automation Specialist & Strategic Operations Partner",
    location: "Davao City, Philippines",
    remote: true,
    start: "May 2024",
    end: "Feb 2026",
    summary:
      "Strategic partner to the CEO of a digital networking platform. Owned the GoHighLevel + n8n automation layer that powered lead intake, customer success, and executive ops — optimizing workflows by 95% and freeing leadership to focus on growth.",
    highlights: [
      "Designed automated lead intake + customer success pipelines in GoHighLevel — sub-account snapshots, pipelines, triggers, and webhook bridges into n8n",
      "Cut manual admin load by ~95% by replacing repetitive ops with always-on workflows",
      "Co-developed go-to-market strategies; led cross-functional teams to quarterly KPIs",
      "Acted as primary liaison with investors and key partners — kept project alignment tight across 3+ stakeholder groups",
    ],
    stack: [
      "GoHighLevel (GHL)",
      "n8n",
      "Webhooks",
      "REST APIs",
      "Google Workspace",
      "Slack",
    ],
  },
  {
    slug: "propulseva",
    company: "PropulseVA.com",
    title: "CRM Automation Specialist (GoHighLevel)",
    location: "Davao City, Philippines",
    remote: true,
    start: "Feb 2024",
    end: "Jan 2026",
    summary:
      "Designed and shipped CRM automation systems for coaches and agencies — full GoHighLevel buildouts (pipelines, websites, funnels) wired into reporting dashboards and SOPs the client teams could actually run themselves.",
    highlights: [
      "Built end-to-end GoHighLevel systems for a diverse roster of coaches and agencies — pipelines, opportunity stages, calendar booking, and funnel sites",
      "Increased client sales by 10% through tighter lead-to-close automation",
      "Authored SOPs + reporting dashboards so clients adopted the systems without ongoing hand-holding",
      "Bridged GHL with external tools (Sheets, email, SMS) via webhooks and custom workflow logic",
    ],
    stack: [
      "GoHighLevel (GHL)",
      "Funnel Builder",
      "Pipelines",
      "Webhooks",
      "Google Sheets",
      "SMS / Email automation",
    ],
  },
];

export const education = {
  school: "Davao Del Norte State College",
  degree: "Bachelor of Science in Information Technology",
  location: "Davao City, Philippines",
  graduation: "June 2025",
};
