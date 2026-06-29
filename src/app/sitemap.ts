import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.landmarkgulf.com";
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/#about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/#services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/#manpower`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#equipment`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#transport`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#hospitality`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#petro`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/#projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/#contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
