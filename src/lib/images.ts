/**
 * Image registry — maps section keys to AI-generated, watermark-free construction images.
 * All images are custom-generated using AI image generation and stored in
 * /public/images/generated/ as PNG files.
 *
 * Categories organized by construction trade/service:
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
    "/images/generated/workers-1.png",
    "/images/generated/workers-2.png",
    "/images/generated/workers-3.png",
    "/images/generated/workers-4.png",
    "/images/generated/workers-5.png",
    "/images/generated/workers-6.png",
  ],
  equipment: [
    "/images/generated/equipment-1.png",
    "/images/generated/equipment-2.png",
    "/images/generated/equipment-3.png",
    "/images/generated/equipment-4.png",
    "/images/generated/equipment-5.png",
    "/images/generated/equipment-6.png",
    "/images/generated/equipment-7.png",
  ],
  refinery: [
    "/images/generated/refinery-1.png",
    "/images/generated/refinery-2.png",
    "/images/generated/refinery-3.png",
    "/images/generated/refinery-4.png",
    "/images/generated/refinery-5.png",
    "/images/generated/refinery-6.png",
    "/images/generated/refinery-7.png",
  ],
  hospitality: [
    "/images/generated/hospitality-1.png",
    "/images/generated/hospitality-2.png",
    "/images/generated/hospitality-3.png",
  ],
  fuel: [
    "/images/generated/fuel-1.png",
    "/images/generated/fuel-2.png",
    "/images/generated/fuel-3.png",
  ],
  welding: [
    "/images/generated/welding-1.png",
    "/images/generated/welding-2.png",
    "/images/generated/welding-3.png",
    "/images/generated/welding-4.png",
    "/images/generated/welding-5.png",
    "/images/generated/welding-6.png",
  ],
  transport: [
    "/images/generated/transport-1.png",
    "/images/generated/transport-2.png",
    "/images/generated/transport-3.png",
    "/images/generated/transport-4.png",
    "/images/generated/transport-5.png",
    "/images/generated/transport-6.png",
  ],
  saudi: [
    "/images/generated/saudi-1.png",
    "/images/generated/saudi-2.png",
    "/images/generated/saudi-3.png",
    "/images/generated/saudi-4.png",
    "/images/generated/saudi-5.png",
    "/images/generated/saudi-6.png",
  ],
  industrial: [
    "/images/generated/industrial-1.png",
    "/images/generated/industrial-2.png",
    "/images/generated/industrial-3.png",
    "/images/generated/industrial-4.png",
    "/images/generated/industrial-5.png",
    "/images/generated/industrial-6.png",
  ],
  hero: [
    "/images/generated/hero-1.png",
    "/images/generated/hero-2.png",
    "/images/generated/hero-3.png",
    "/images/generated/hero-4.png",
    "/images/generated/hero-5.png",
    "/images/generated/hero-6.png",
  ],
  engineers: [
    "/images/generated/engineers-1.png",
    "/images/generated/engineers-2.png",
    "/images/generated/engineers-3.png",
    "/images/generated/engineers-4.png",
    "/images/generated/engineers-5.png",
    "/images/generated/engineers-6.png",
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
export const heroImage = "/images/generated/hero-1.png";

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
