import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs in Saudi Arabia — Welder, Rigger, Crane Operator, Safety Officer & More | Landmark Inter Gulf",
  description:
    "Apply for 57+ open jobs in Saudi Arabia. Hiring welders (6G), riggers (TUV), crane operators (Aramco), safety officers, scaffolders, drivers, hotel staff, supervisors and more. Transferable Iqama welcome. Apply online.",
  keywords: [
    "jobs in Saudi Arabia",
    "welder jobs Saudi Arabia",
    "6G welder jobs KSA",
    "rigger jobs Saudi Arabia",
    "crane operator jobs Aramco",
    "safety officer jobs Saudi Arabia",
    "scaffolder jobs KSA",
    "TUV rigger jobs",
    "Aramco approved jobs",
    "manpower jobs Saudi Arabia",
    "construction jobs Saudi Arabia",
    "oil and gas jobs Saudi Arabia",
    "petrochemical jobs KSA",
    "Jubail jobs",
    "Yanbu jobs",
    "Riyadh jobs",
    "Jafurah jobs",
    "Marjan jobs",
    "hospitality jobs Saudi Arabia",
    "driver jobs Saudi Arabia",
    "Landmark Inter Gulf jobs",
    "company driver jobs Riyadh",
    "heavy driver jobs Saudi Arabia",
    "pipe fabricator jobs",
    "pipe fitter jobs Saudi Arabia",
    "QA QC inspector jobs KSA",
    "foreman jobs Saudi Arabia",
    "site supervisor jobs Saudi Arabia",
  ],
  alternates: { canonical: "https://www.landmarkgulf.com/jobs" },
  openGraph: {
    title: "57+ Open Jobs in Saudi Arabia — Landmark Inter Gulf LLC",
    description:
      "Hiring welders, riggers, crane operators, safety officers, drivers, supervisors and more. Aramco-approved positions. Apply online today.",
    url: "https://www.landmarkgulf.com/jobs",
    type: "website",
    images: [
      {
        url: "https://www.landmarkgulf.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Landmark Inter Gulf LLC — Jobs & Careers in Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "57+ Open Jobs in Saudi Arabia — Apply Now",
    description: "Welders, riggers, crane operators, safety officers and more. Aramco-approved positions.",
    images: ["https://www.landmarkgulf.com/og-image.png"],
  },
  other: {
    "og:locale": "en_US",
    "og:site_name": "Landmark Inter Gulf LLC",
  },
};

// Breadcrumb for jobs index page
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.landmarkgulf.com" },
    { "@type": "ListItem", position: 2, name: "Jobs", item: "https://www.landmarkgulf.com/jobs" },
  ],
};

// ItemList — index of all open jobs (helps Google see them as a collection)
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Open Positions at Landmark Inter Gulf LLC",
  description: "57+ open positions across Saudi Arabia in manpower, equipment operations, supervision, hospitality, transport and management categories.",
  url: "https://www.landmarkgulf.com/jobs",
  numberOfItems: 57,
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  );
}
