/**
 * Image registry — maps section keys to real, locally-hosted image paths.
 * All images are real photographs fetched via the ZAI image search service
 * and stored in /public/images/ for production-grade performance.
 *
 * Images are curated for clean, professional, thematically-matched visuals:
 * - workers: construction workers in hi-vis gear at active sites
 * - equipment: heavy machinery in action (not product/catalog shots)
 * - refinery: oil & gas industrial complexes
 * - hospitality: luxury hotel lobby interiors
 * - fuel: modern fuel stations and pump close-ups
 * - welding: industrial welders and pipeline fabrication
 * - transport: corporate sedans, coach buses, pickup truck fleets
 * - saudi: iconic Saudi Arabia / Riyadh landmarks and skylines
 * - industrial: warehouses and factory interiors
 * - hero: construction cranes at sunset (dramatic hero shots)
 * - engineers: engineers in hard hats reviewing blueprints
 */

type ImageMap = Record<string, string[]>;

const PREFIXES: ImageMap = {
  workers: ["/images/workers-1.jpg", "/images/workers-2.jpg", "/images/workers-3.jpg"],
  equipment: ["/images/equipment-1.jpg", "/images/equipment-2.jpg", "/images/equipment-3.jpg", "/images/equipment-4.jpg"],
  refinery: ["/images/refinery-1.jpg", "/images/refinery-2.jpg", "/images/refinery-3.jpg", "/images/refinery-4.jpg"],
  hospitality: ["/images/hospitality-1.jpg", "/images/hospitality-2.jpg", "/images/hospitality-3.jpg"],
  fuel: ["/images/fuel-1.jpg", "/images/fuel-2.jpg", "/images/fuel-3.jpg"],
  welding: ["/images/welding-1.jpg", "/images/welding-2.jpg", "/images/welding-3.jpg"],
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
