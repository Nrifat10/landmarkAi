/**
 * Image registry — maps section keys to real, locally-hosted image paths.
 * All images are real photographs fetched via the ZAI image search service
 * and stored in /public/images/ for production-grade performance.
 */

type ImageMap = Record<string, string[]>;

const PREFIXES: Record<string, string[]> = {
  workers: ["/images/workers-1.jpg", "/images/workers-2.jpg", "/images/workers-3.jpg"],
  equipment: ["/images/equipment-1.jpg", "/images/equipment-2.jpg", "/images/equipment-3.jpg", "/images/equipment-4.jpg"],
  refinery: ["/images/refinery-1.jpg", "/images/refinery-2.jpg", "/images/refinery-3.jpg", "/images/refinery-4.jpg"],
  hospitality: ["/images/hospitality-1.jpg", "/images/hospitality-2.jpg", "/images/hospitality-3.jpg"],
  fuel: ["/images/fuel-1.jpg", "/images/fuel-2.jpg", "/images/fuel-3.jpg"],
  welding: ["/images/welding-1.jpg", "/images/welding-2.png", "/images/welding-3.png"],
  transport: ["/images/transport-1.jpg", "/images/transport-2.jpg", "/images/transport-3.jpg"],
  saudi: ["/images/saudi-1.jpg", "/images/saudi-2.jpg", "/images/saudi-3.jpg"],
  industrial: ["/images/industrial-1.jpg", "/images/industrial-2.jpg", "/images/industrial-3.jpg"],
  hero: ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"],
  engineers: ["/images/engineers-1.jpg", "/images/engineers-2.jpg", "/images/engineers-3.jpg"],
};

export const siteImages: ImageMap = PREFIXES;

// Service ID → image prefix mapping
export const serviceImagePrefix: Record<string, string> = {
  manpower: "workers",
  equipment: "equipment",
  industrial: "industrial",
  petro: "refinery",
  hospitality: "hospitality",
  transport: "transport",
};

/** Get images for a service by its id */
export function getServiceImages(serviceId: string): string[] {
  const prefix = serviceImagePrefix[serviceId] ?? "workers";
  return PREFIXES[prefix] ?? PREFIXES.workers;
}

/** Hero background image */
export const heroImage = "/images/hero-1.jpg";

/** Get the first image of a category (or fallback) */
export function getImage(category: string, index = 0): string {
  const list = PREFIXES[category] ?? PREFIXES.workers;
  return list[index] ?? list[0] ?? PREFIXES.workers[0];
}
