import type { Metadata } from "next";
import { siteOgImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Car Rental & Transport — Corporate Vehicles, Buses & Tankers in Saudi Arabia",
  description:
    "Reliable car rental and transport solutions across Saudi Arabia. Economy sedans, SUVs, pickup trucks, mini buses (15-30 seater), full buses (30-50 seater), water tankers, diesel tankers, low bed trailers. Corporate travel, staff transport, airport transfers, construction logistics.",
  alternates: { canonical: "https://www.landmarkgulf.com/services/transport" },
  openGraph: {
    title: "Car Rental & Transport — Landmark Inter Gulf LLC",
    description:
      "Reliable vehicles and transport solutions tailored to your business, projects, and operational needs across Saudi Arabia.",
    url: "https://www.landmarkgulf.com/services/transport",
    images: [siteOgImage],
  },
};

export default function TransportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
