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

const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Open Positions at Landmark Inter Gulf LLC",
  description: "We are hiring skilled manpower, equipment operators, supervisors, hospitality staff and more across Saudi Arabia.",
  hiringOrganization: {
    "@type": "Organization",
    name: "Landmark Inter Gulf LLC",
    sameAs: "https://www.landmarkgulf.com",
  },
  jobLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "SA", addressRegion: "Saudi Arabia" },
  },
  employmentType: "FULL_TIME",
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
