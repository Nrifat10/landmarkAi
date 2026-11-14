import type { Metadata } from "next";
import { siteOgImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — Saudi Arabia's Integrated Industrial Services Partner",
  description:
    "Learn about Landmark Inter Gulf LLC — a Saudi-based company providing manpower, equipment rental, industrial trading, petro services and hospitality since 2017. Committed to Vision 2030.",
  alternates: { canonical: "https://www.landmarkgulf.com/about" },
  openGraph: {
    title: "About Landmark Inter Gulf LLC",
    description:
      "A Saudi-based integrated services partner delivering manpower, equipment, industrial trading, petro services and hospitality across the Kingdom since 2017.",
    url: "https://www.landmarkgulf.com/about",
    images: [siteOgImage],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
