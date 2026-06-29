/**
 * Image registry — maps section keys to real, locally-hosted image paths.
 * All images are real photographs fetched via the ZAI image search service
 * and stored in /public/images/ for production-grade performance.
 *
 * Categories are organized by construction trade/service with multiple
 * authentic work-in-progress photos per category:
 * - workers: construction workers at active sites (team, steel, concrete, meetings)
 * - equipment: heavy machinery in action (excavators, cranes, bulldozers, forklifts)
 * - refinery: oil & gas industrial complexes (plants, flare stacks, night operations)
 * - hospitality: luxury hotel lobby interiors
 * - fuel: modern fuel stations and pump close-ups
 * - welding: pipe fabrication and welding work
 * - transport: corporate vehicles, buses, pickups, tankers
 * - saudi: Saudi Arabia landmarks, skylines, and construction sites
 * - industrial: warehouses, factories, and industrial work
 * - hero: dramatic construction site hero shots (cranes at sunset)
 * - engineers: construction management and supervision
 */

type ImageMap = Record<string, string[]>;

const PREFIXES: ImageMap = {
  workers: [
    "/images/workers-1.jpg",
    "/images/workers-2.jpg",
    "/images/workers-3.jpg",
    "/images/workers-4.jpg",
    "/images/workers-5.jpg",
    "/images/workers-6.jpg",
  ],
  equipment: [
    "/images/equipment-1.jpg",
    "/images/equipment-2.jpg",
    "/images/equipment-3.jpg",
    "/images/equipment-4.jpg",
    "/images/equipment-5.jpg",
    "/images/equipment-6.jpg",
    "/images/equipment-7.jpg",
  ],
  refinery: [
    "/images/refinery-1.jpg",
    "/images/refinery-2.jpg",
    "/images/refinery-3.jpg",
    "/images/refinery-4.jpg",
    "/images/refinery-5.jpg",
    "/images/refinery-6.jpg",
    "/images/refinery-7.jpg",
  ],
  hospitality: [
    "/images/hospitality-1.jpg",
    "/images/hospitality-2.jpg",
    "/images/hospitality-3.jpg",
  ],
  fuel: [
    "/images/fuel-1.jpg",
    "/images/fuel-2.jpg",
    "/images/fuel-3.jpg",
  ],
  welding: [
    "/images/welding-1.jpg",
    "/images/welding-2.jpg",
    "/images/welding-3.jpg",
    "/images/welding-4.jpg",
    "/images/welding-5.jpg",
    "/images/welding-6.jpg",
  ],
  transport: [
    "/images/transport-1.jpg",
    "/images/transport-2.jpg",
    "/images/transport-3.jpg",
    "/images/transport-4.jpg",
    "/images/transport-5.jpg",
    "/images/transport-6.jpg",
  ],
  saudi: [
    "/images/saudi-1.jpg",
    "/images/saudi-2.jpg",
    "/images/saudi-3.jpg",
    "/images/saudi-4.jpg",
    "/images/saudi-5.jpg",
    "/images/saudi-6.jpg",
  ],
  industrial: [
    "/images/industrial-1.jpg",
    "/images/industrial-2.jpg",
    "/images/industrial-3.jpg",
    "/images/industrial-4.jpg",
    "/images/industrial-5.jpg",
    "/images/industrial-6.jpg",
  ],
  hero: [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
    "/images/hero-5.jpg",
    "/images/hero-6.jpg",
  ],
  engineers: [
    "/images/engineers-1.jpg",
    "/images/engineers-2.jpg",
    "/images/engineers-3.jpg",
    "/images/engineers-4.jpg",
    "/images/engineers-5.jpg",
    "/images/engineers-6.jpg",
  ],
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
export const heroImage = "/images/hero-4.jpg";

/** Get the first image of a category (or fallback) */
export function getImage(category: string, index = 0): string {
  const list = PREFIXES[category] ?? PREFIXES.workers;
  return list[index] ?? list[0] ?? PREFIXES.workers[0];
}

/**
 * Get a rotating image from a category — useful for project cards
 * where each card should get a different image.
 */
export function getImageRotating(category: string, offset: number): string {
  const list = PREFIXES[category] ?? PREFIXES.workers;
  return list[offset % list.length] ?? list[0];
}
