import type { Metadata } from "next";
import { siteOgImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Manpower Supply — Skilled, Semi-Skilled & Unskilled Workforce in Saudi Arabia",
  description:
    "Certified manpower supply for construction, oil & gas, petrochemical and industrial projects in Saudi Arabia. Aramco-approved safety officers, TUV-certified riggers & scaffolders, 6G/3G welders, pipe fabricators, civil/mechanical/electrical trades. 5,000+ professionals deployed.",
  alternates: { canonical: "https://www.landmarkgulf.com/services/manpower" },
  openGraph: {
    title: "Manpower Supply — Landmark Inter Gulf LLC",
    description:
      "Skilled, semi-skilled and unskilled workforce for all industrial and commercial sectors. Aramco-approved, TUV-certified, 5,000+ deployed.",
    url: "https://www.landmarkgulf.com/services/manpower",
    images: [siteOgImage],
  },
};

export default function ManpowerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
