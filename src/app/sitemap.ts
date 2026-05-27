import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { branches } from "@/lib/contract-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const primary: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contract`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const secondary: MetadataRoute.Sitemap = [
    { url: `${base}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/forgot`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const branchRoutes: MetadataRoute.Sitemap = branches.map((b) => ({
    url: `${base}/locations/${b.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...primary, ...secondary, ...branchRoutes];
}
