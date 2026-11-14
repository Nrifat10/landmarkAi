import type { Metadata } from "next";
import { siteOgImage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Saudi Aramco Registered Vendor No. 10121905 — Landmark Inter Gulf LLC",
  description:
    "Landmark Inter Gulf LLC is a registered vendor (No. 10121905) in the Saudi Aramco Supplier Management System as a Service Provider. View our vendor registration, commercial registration, VAT, MISA and company legal information.",
  alternates: { canonical: "https://www.landmarkgulf.com/aramco-vendor" },
  openGraph: {
    title: "Saudi Aramco Registered Vendor — Landmark Inter Gulf LLC",
    description:
      "Registered vendor No. 10121905 in the Saudi Aramco Supplier Management System. Pre-qualified service provider for manpower, equipment and industrial support across the Kingdom.",
    url: "https://www.landmarkgulf.com/aramco-vendor",
    images: [siteOgImage],
  },
};

export default function AramcoVendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
