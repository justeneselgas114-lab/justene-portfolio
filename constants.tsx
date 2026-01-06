import React from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Zap, 
  ShieldCheck, 
  LineChart,
  Workflow,
  Server
} from 'lucide-react';
import { Project, TechCategory, ProcessStep, ProofStatement, PricingPackage } from './types';

/**
 * GOOGLE SHEETS AUTOMATION ENDPOINTS
 * Separate storage endpoints for different lead types.
 */

// 1. Qualified Leads (Pricing Packages)
export const PRICING_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHX3Qj_LlWlcvoho2ExgoBhdEQ5P0KRGo9MOrbCT0qHTytZiqZWxka7ycRkBEqlnOa/exec';

// 2. General Inquiries (CTA / Contact Page)
// Paste your SECOND Apps Script URL here to keep inquiries separate
export const CONTACT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8feKtMg88hOa-0O4WynDpuBZ-6I-IiwvPky6IXiBPWFdkw1k9_OnFl6vttl2MP5wH/exec';

export const PROJECTS: Project[] = [
  {
    id: 'napmi-portal',
    title: "NAPMI Enterprise Solutions",
    category: "Lead Generation & SEO",
    description: "A high-conversion corporate platform engineered for NAPMI, featuring a streamlined inquiry engine and integrated lead-capture systems optimized for maximum search visibility. Professionally hosted on Hostinger.",
    outcome: "Achieved top-tier SEO rankings via Google Search Console integration and implemented a direct-to-WhatsApp messaging bridge for instant lead engagement.",
    tech: ["Next.js", "WhatsApp API", "Google Search Console", "Tailwind CSS", "TypeScript"],
    architecture: ["Hostinger Infrastructure", "Direct WhatsApp Integration", "SEO-First Server Components", "Automated Lead Routing", "Metadata Optimization"],
    imageUrl: "https://i.postimg.cc/tRNYM25x/Screenshot_2025_12_31_100545.png",
    liveUrl: "https://northamericanpilates.com/",
    githubUrl: "#"
  },
  {
    id: 'iron-forge-gym',
    title: "Iron Forge Digital Hub",
    category: "Business Branding & UX",
    description: "A modern, high-energy digital presence for Iron Forge Gym designed to convert visitors into members through an intuitive, performance-focused user interface.",
    outcome: "Modernized the brand's digital identity with fluid transitions and a robust inquiry system that simplified the membership onboarding process.",
    tech: ["React", "Framer Motion", "TypeScript", "Lucide Icons", "Tailwind CSS"],
    architecture: ["Vercel Deployment", "Dynamic UI Transitions", "Responsive Grid Layouts", "Client-Side Inquiry Validation", "Optimized Asset Loading"],
    imageUrl: "https://i.postimg.cc/wv80c3y9/Screenshot_2025_12_30_000417.png",
    liveUrl: "https://iron-forge-gym-wzry.vercel.app/",
    githubUrl: "#"
  },
  {
    id: 'bigboss-buffet',
    title: "BigBoss Booking Engine",
    category: "Full-Stack Automation",
    description: "A comprehensive booking and reservation system for BigBoss Buffet that utilizes a serverless architecture to manage high-volume customer inquiries.",
    outcome: "Reduced backend costs to $0 by leveraging Google Sheets as a real-time database via API integration, providing the client with a familiar interface for management.",
    tech: ["Next.js", "Google Sheets API", "Apps Script", "Node.js", "Serverless Functions"],
    architecture: ["Google Sheets Database Integration", "Real-time Reservation Sync", "Automated Email Confirmations", "Vercel Edge Functions"],
    imageUrl: "https://i.postimg.cc/mg6GZLm8/Screenshot_2025_12_28_233918.png",
    liveUrl: "https://bigboss-buffet.vercel.app/#/",
    githubUrl: "#"
  }
];

export const TECH_STACK: TechCategory[] = [
  {
    name: "Frontend Development",
    icon: "Globe",
    tools: ["HTML / CSS", "JavaScript", "React", "Next.js", "TypeScript"]
  },
  {
    name: "Backend & Systems",
    icon: "Server",
    tools: ["PHP", "Laravel", "Node.js", "Apps Script", "REST APIs"]
  },
  {
    name: "CMS & CRM Ecosystems",
    icon: "Workflow",
    tools: ["GoHighLevel", "WordPress", "Shopify", "Zapier", "Meta API"]
  },
  {
    name: "Infrastructure & Data",
    icon: "Database",
    tools: ["PostgreSQL", "Supabase", "Prisma", "Redis", "Vercel"]
  }
];

export const PROCESS: ProcessStep[] = [
  {
    title: "Discovery & Requirements",
    description: "Understanding business goals, bottleneck processes, and user needs to define the technical scope."
  },
  {
    title: "System Design & Architecture",
    description: "Mapping out the tech stack, data schemas, and automation flows for long-term scalability."
  },
  {
    title: "Development & Automation",
    description: "Building the solution with clean, type-safe code and robust third-party integrations."
  },
  {
    title: "Testing & Optimization",
    description: "Performance auditing, cross-device testing, and ensuring 99.9% reliability of automated tasks."
  },
  {
    title: "Launch & Support",
    description: "Seamless deployment with CI/CD pipelines and post-launch maintenance strategies."
  }
];

export const PROOF: ProofStatement[] = [
  {
    title: "Reliable Deployments",
    description: "All projects deployed on Vercel or Hostinger with automated CI/CD pipelines.",
    icon: "ShieldCheck"
  },
  {
    title: "Cost Efficiency",
    description: "Zero-cost automation using Google Sheets + Apps Script backends.",
    icon: "Zap"
  },
  {
    title: "Audited Performance",
    description: "Consistency across 90+ Lighthouse scores for SEO and Accessibility.",
    icon: "LineChart"
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    name: "Starter",
    bestFor: "Personal brands, small businesses, and simple launches",
    includes: [
      "Modern UI (Desktop & Mobile)",
      "Up to 5 custom pages (Home, About, etc.)",
      "Direct-to-email inquiry form",
      "Basic SEO & Google Search indexing",
      "Hosting setup & technical launch",
      "Fast, secure production setup"
    ],
    timeline: "1–2 weeks",
    pricePHP: "₱17,000",
    priceUSD: "$299",
    originalPricePHP: "₱23,000",
    originalPriceUSD: "$399",
    savingsPHP: "₱6,000",
    savingsUSD: "$100",
    color: "blue"
  },
  {
    name: "Professional",
    bestFor: "Service businesses needing bookings & automation",
    includes: [
      "Everything in Starter, plus:",
      "Goal-driven custom UI design",
      "Online booking & inquiry system",
      "Automatic data storage (no lost leads)",
      "Admin-ready management dashboard",
      "Advanced SEO & speed optimization",
      "Scalable structure for future growth"
    ],
    timeline: "2–4 weeks",
    pricePHP: "₱27,000",
    priceUSD: "$479",
    originalPricePHP: "₱35,000",
    originalPriceUSD: "$629",
    savingsPHP: "₱8,000",
    savingsUSD: "$150",
    color: "amber"
  },
  {
    name: "Advanced",
    bestFor: "Web apps, startups, and complex platforms",
    includes: [
      "Everything in Professional, plus:",
      "Custom web application architecture",
      "Secure user accounts & login system",
      "Admin panels & custom workflows",
      "Database-powered backend",
      "High-level security & optimization",
      "Built for enterprise-level scaling"
    ],
    timeline: "4–8+ weeks",
    pricePHP: "₱47,000+",
    priceUSD: "$849+",
    originalPricePHP: "₱55,000+",
    originalPriceUSD: "$999+",
    savingsPHP: "₱8,000",
    savingsUSD: "$150",
    color: "red"
  }
];