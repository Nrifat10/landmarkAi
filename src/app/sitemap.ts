import type { MetadataRoute } from "next";
import { services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.landmarkgulf.com";
  const lastModified = new Date();
  const monthly = { lastModified, changeFrequency: "monthly" as const };

  const routes: MetadataRoute.Sitemap = [
    { url: base, ...monthly, priority: 1.0 },
    { url: `${base}/about`, ...monthly, priority: 0.9 },
    { url: `${base}/projects`, ...monthly, priority: 0.9 },
    { url: `${base}/contact`, ...monthly, priority: 0.8 },
    { url: `${base}/jobs`, ...monthly, priority: 0.9 },
  ];

  // Add all service pages
  services.forEach((s) => {
    routes.push({
      url: `${base}/services/${s.slug}`,
      ...monthly,
      priority: 0.8,
    });
  });

  return routes;
}
