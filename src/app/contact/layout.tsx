import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote for Manpower, Equipment & Industrial Services",
  description:
    "Contact Landmark Inter Gulf LLC for manpower supply, equipment rental, industrial trading, petro services and hospitality staffing across Saudi Arabia. Email: info@landmarkgulf.com — we respond within one business day.",
  alternates: { canonical: "https://www.landmarkgulf.com/contact" },
  openGraph: {
    title: "Contact Landmark Inter Gulf LLC",
    description:
      "Tell us about your project — our team will respond within one business day. Manpower, equipment, industrial, petro and hospitality services across Saudi Arabia.",
    url: "https://www.landmarkgulf.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
