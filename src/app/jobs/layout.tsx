import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs & Careers — Apply for Manpower, Equipment, Industrial & Hospitality Positions in Saudi Arabia",
  description:
    "Apply for jobs at Landmark Inter Gulf LLC. Open positions for pipe fabricators, welders, riggers, scaffolders, safety officers, crane operators, drivers, hospitality staff and more across Saudi Arabia. Browse by category and apply online.",
  alternates: { canonical: "https://www.landmarkgulf.com/jobs" },
  openGraph: {
    title: "Jobs & Careers — Landmark Inter Gulf LLC",
    description:
      "50+ open positions across Saudi Arabia. Apply for manpower, equipment operators, supervisors, hospitality and management roles.",
    url: "https://www.landmarkgulf.com/jobs",
    type: "article",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.landmarkgulf.com" },
    { "@type": "ListItem", position: 2, name: "Jobs", item: "https://www.landmarkgulf.com/jobs" },
  ],
};

// JobPosting structured data — all required fields included for Google for Jobs
const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Skilled Manpower, Equipment Operators & Supervisors — Landmark Inter Gulf LLC",
  description: "Landmark Inter Gulf LLC is hiring skilled manpower, equipment operators, supervisors, hospitality staff and management personnel across Saudi Arabia. Open positions include pipe fabricators, welders (6G/3G), riggers (TUV certified), scaffolders, safety officers (Aramco approved), crane operators, drivers, hotel staff and more. Apply online at landmarkgulf.com/jobs.",
  datePosted: "2024-01-15",
  validThrough: "2026-12-31",
  employmentType: "FULL_TIME",
  hiringOrganization: {
    "@type": "Organization",
    name: "Landmark Inter Gulf LLC",
    sameAs: "https://www.landmarkgulf.com",
    logo: "https://www.landmarkgulf.com/landmark-logo-light.png",
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "Saudi Arabia",
      addressLocality: "Riyadh",
      streetAddress: "Riyadh, Saudi Arabia",
    },
  },
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "SAR",
    value: {
      "@type": "QuantitativeValue",
      minValue: 2000,
      maxValue: 15000,
      unitText: "MONTH",
    },
  },
  qualifications: "Relevant certifications and experience required. Aramco-approved and TUV-certified candidates preferred for specific roles.",
  experienceRequirements: "Minimum 1-5 years depending on position.",
  skills: "Pipe fabrication, welding, rigging, scaffolding, crane operation, safety management, hospitality service, driving, construction trades.",
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />
      {children}
    </>
  );
}
