import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { work } from "@/lib/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/articles`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...work.map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
