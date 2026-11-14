import type { Metadata } from "next";
import { siteOgImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industrial Trading — Materials, Tools & Equipment Supply in Saudi Arabia",
  description:
    "Quality industrial materials, tools and products from trusted global suppliers. Industrial tools and consumables, construction materials, petrochemical and oilfield supplies, safety equipment and PPE, spare parts. Competitive pricing, on-time delivery, full traceability across Saudi Arabia.",
  alternates: { canonical: "https://www.landmarkgulf.com/services/industrial" },
  openGraph: {
    title: "Industrial Trading — Landmark Inter Gulf LLC",
    description:
      "Quality industrial materials, tools and products from trusted global suppliers across Saudi Arabia.",
    url: "https://www.landmarkgulf.com/services/industrial",
    images: [siteOgImage],
  },
};

export default function IndustrialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
