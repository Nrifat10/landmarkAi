import type { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { jobs } from "@/lib/jobs-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.landmarkgulf.com";
  const lastModified = new Date();
  const monthly = { lastModified, changeFrequency: "monthly" as const };
  const weekly = { lastModified, changeFrequency: "weekly" as const };
  const daily = { lastModified, changeFrequency: "daily" as const };

  const routes: MetadataRoute.Sitemap = [
    { url: base, ...daily, priority: 1.0 },
    { url: `${base}/about`, ...monthly, priority: 0.9 },
    { url: `${base}/projects`, ...monthly, priority: 0.9 },
    { url: `${base}/jobs`, ...weekly, priority: 1.0 }, // Jobs index — top priority
    { url: `${base}/contact`, ...monthly, priority: 0.8 },
    { url: `${base}/privacy-policy`, ...monthly, priority: 0.3 },
    { url: `${base}/terms-of-service`, ...monthly, priority: 0.3 },
  ];

  // Add all service pages
  services.forEach((s) => {
    routes.push({
      url: `${base}/services/${s.slug}`,
      ...monthly,
      priority: 0.8,
    });
  });

  // Add all individual job detail pages — high priority for Google for Jobs
  jobs.forEach((job) => {
    routes.push({
      url: `${base}/jobs/${job.slug}`,
      ...weekly,
      priority: 0.9, // High priority for individual jobs
    });
  });

  return routes;
}
