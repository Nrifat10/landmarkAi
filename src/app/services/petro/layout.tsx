import type { Metadata } from "next";
import { siteOgImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Petro Services — Oil & Gas Manpower & Fuel Station Staffing in KSA",
  description:
    "Specialized petro services for oil & gas projects in Saudi Arabia. Aramco-approved safety officers and WPRs, pipe fabrication specialists, mechanical/electrical/instrumentation technicians. Fuel station staffing with trained, customer-focused manpower. 16+ projects, 4,500+ deployed since 2017.",
  alternates: { canonical: "https://www.landmarkgulf.com/services/petro" },
  openGraph: {
    title: "Petro Services — Landmark Inter Gulf LLC",
    description:
      "Specialized support for oil & gas projects with skilled manpower and technical solutions across Saudi Arabia.",
    url: "https://www.landmarkgulf.com/services/petro",
    images: [siteOgImage],
  },
};

export default function PetroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
