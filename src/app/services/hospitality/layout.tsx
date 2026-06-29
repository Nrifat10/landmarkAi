import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospitality Services — Hotel Staffing & Catering Support in Saudi Arabia",
  description:
    "Professional hospitality workforce for hotels, resorts, catering companies and corporate facilities in Saudi Arabia. Hotel staffing, housekeeping, cleaners, waiters & stewards, reception & front desk, kitchen helpers, catering support. Trained to luxury hotel standards.",
  alternates: { canonical: "https://www.landmarkgulf.com/services/hospitality" },
  openGraph: {
    title: "Hospitality Services — Landmark Inter Gulf LLC",
    description:
      "Professional hospitality staffing and support services for the hotel and catering industry across Saudi Arabia.",
    url: "https://www.landmarkgulf.com/services/hospitality",
  },
};

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
