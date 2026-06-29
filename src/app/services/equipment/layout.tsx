import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Rental — Excavators, Cranes, Forklifts & Heavy Machinery in KSA",
  description:
    "Modern equipment rental fleet for construction and industrial projects in Saudi Arabia. Earthmoving (excavators, loaders, bulldozers), lifting (mobile/crawler cranes, forklifts), access (scissor/boom lifts), power (generators, compressors), heavy transport. Flexible rental plans, 24/7 support.",
  alternates: { canonical: "https://www.landmarkgulf.com/services/equipment" },
  openGraph: {
    title: "Equipment Rental — Landmark Inter Gulf LLC",
    description:
      "Wide range of modern, well-maintained equipment and machinery for projects of all sizes across Saudi Arabia.",
    url: "https://www.landmarkgulf.com/services/equipment",
  },
};

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
