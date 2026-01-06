
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  architecture: string[];
  imageUrl: string;
}

export interface TechCategory {
  name: string;
  tools: string[];
  icon: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProofStatement {
  title: string;
  description: string;
  icon: string;
}

export interface PricingPackage {
  name: string;
  bestFor: string;
  includes: string[];
  timeline: string;
  pricePHP: string;
  priceUSD: string;
  originalPricePHP?: string;
  originalPriceUSD?: string;
  savingsPHP?: string;
  savingsUSD?: string;
  color: string;
}
