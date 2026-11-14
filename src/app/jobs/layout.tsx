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
        url: "https://www.landmarkgulf.com/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "Landmark Inter Gulf LLC — Jobs & Careers in Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "57+ Open Jobs in Saudi Arabia — Apply Now",
    description: "Welders, riggers, crane operators, safety officers and more. Aramco-approved positions.",
    images: ["https://www.landmarkgulf.com/og-image.jpg"],
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

// FAQ schema — helps Google display our answers in "People Also Ask" snippets
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What jobs are available in Saudi Arabia for foreigners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landmark Inter Gulf LLC is hiring foreigners with transferable Iqama for 57+ positions across Saudi Arabia including welders (6G/3G), riggers (TUV certified), scaffolders, pipe fabricators, crane operators (Aramco certified), safety officers, drivers, hospitality staff, supervisors and engineers. Projects are located in Jubail, Yanbu, Jafurah, Marjan and Dammam.",
      },
    },
    {
      "@type": "Question",
      name: "How much do welders earn in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skilled workers at Landmark Inter Gulf LLC earn SAR 3,500-11,000 per month depending on the role, certifications and experience. 6G welders with Aramco certification typically earn at the higher end. We also provide accommodation, transportation, medical insurance and end-of-service benefits.",
      },
    },
    {
      "@type": "Question",
      name: "What is the salary of a rigger in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TUV-certified riggers at Landmark Inter Gulf LLC earn competitive monthly salaries between SAR 5,000-11,000 depending on experience and Aramco approval status. The role includes accommodation, transportation, medical insurance and other benefits.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need transferable Iqama to work in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, a transferable Iqama is preferred for most positions. However, we also accept candidates on visit visa, exit & re-entry, and Saudi nationals. If you are outside KSA, we can provide visa sponsorship for qualified candidates.",
      },
    },
    {
      "@type": "Question",
      name: "What certifications are required for Aramco projects in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Saudi Aramco projects, key certifications include Aramco-approved safety officer, Aramco WPR (Work Permit Receiver), Aramco-certified crane operator, TUV certification for riggers and scaffolders, 6G welding certification for welders, and NEBOSH for safety managers. We hire candidates with these certifications.",
      },
    },
    {
      "@type": "Question",
      name: "How can I apply for jobs at Landmark Inter Gulf LLC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can apply online at landmarkgulf.com/jobs. Browse open positions by category (Manpower, Supervisors, Equipment Operators, Hospitality, Transport, Management), view the full job description on each job page, and fill out the application form with your personal details, experience, certifications and visa status.",
      },
    },
    {
      "@type": "Question",
      name: "Are accommodation and transportation provided for workers in Saudi Arabia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Landmark Inter Gulf LLC provides accommodation, transportation, medical insurance and other benefits to all deployed workers as part of the employment package. Site workers also receive annual leave and end-of-service benefits as per Saudi labor law.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Landmark Inter Gulf LLC located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landmark Inter Gulf LLC is headquartered at King Faisal W, King Fahd Industrial Port, Al Jubail 35712, Eastern Province, Saudi Arabia. We deploy manpower and equipment to projects across the Kingdom including Jafurah, Marjan, Jubail, Yanbu, Riyadh and Dammam.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
