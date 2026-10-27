import { jobCategories } from "@/lib/data";
import { company } from "@/lib/data";

/**
 * Generate JobPosting JSON-LD for every open position.
 * Google for Jobs requires one JobPosting schema per job listing.
 * We use @graph to include all positions in a single structured data block.
 */
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0]; // 90 days from now

// Saudi Riyah, Jafurah, Marjan, Jubail, Yanbu — common project sites
const projectSites = [
  "Riyadh",
  "Jubail",
  "Yanbu",
  "Jafurah",
  "Marjan",
  "Dammam",
  "Khobar",
  "Saudi Arabia",
];

// Skills map per category — helps Google match candidates with relevant experience
const categorySkills: Record<string, string[]> = {
  manpower: [
    "Pipe Fabrication",
    "Pipe Fitting",
    "Welding (6G/3G/TIG/ARC)",
    "Rigging",
    "Scaffolding",
    "Industrial Construction",
    "Oil & Gas",
    "Petrochemical",
  ],
  supervisors: [
    "Site Supervision",
    "Foreman",
    "Safety Management",
    "QA/QC",
    "Planning",
    "Permit to Work",
    "Aramco Approved",
    "Engineering",
  ],
  operators: [
    "Crane Operation",
    "Forklift Operation",
    "Heavy Equipment",
    "Aramco Certified",
    "Excavator",
    "Boom Truck",
    "Manlift",
    "Bobcat",
  ],
  hospitality: [
    "Hotel Operations",
    "Housekeeping",
    "Catering",
    "Customer Service",
    "Hospitality Management",
    "Cleaning",
    "Kitchen Operations",
  ],
  transport: [
    "Driving",
    "Logistics",
    "Transport",
    "Heavy Vehicle License",
    "Corporate Driving",
    "Trailer Operations",
    "Bus Driving",
  ],
  management: [
    "Project Management",
    "HR Management",
    "Accounting",
    "AutoCAD",
    "Site Management",
    "Safety Management",
    "Administration",
  ],
};

const categoryEmploymentType: Record<string, string[]> = {
  manpower: ["FULL_TIME"],
  supervisors: ["FULL_TIME"],
  operators: ["FULL_TIME"],
  hospitality: ["FULL_TIME", "CONTRACTOR"],
  transport: ["FULL_TIME"],
  management: ["FULL_TIME"],
};

export function generateJobPostingsSchema() {
  const jobPostings = jobCategories.flatMap((category) =>
    category.jobs.map((job) => {
      const skills = categorySkills[category.id] || [];
      const employmentTypes = categoryEmploymentType[category.id] || ["FULL_TIME"];

      return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: `${job.title} — Landmark Inter Gulf LLC`,
        description: `<p><strong>${job.title}</strong> position at Landmark Inter Gulf LLC, a leading manpower supply and industrial services company in Saudi Arabia.</p><p>We are hiring ${job.title.toLowerCase()} professionals for projects across ${projectSites.join(", ")}. The role requires ${job.experience} of experience${job.cert && job.cert !== "—" ? ` and ${job.cert.toLowerCase()} certification` : ""}.</p><p>Landmark Inter Gulf LLC is Aramco-approved and works with major EPC contractors including SINOPEC, Hyundai E&C, L&T, and SKEC on the Kingdom's largest oil & gas, petrochemical and construction projects.</p><p><strong>Category:</strong> ${category.name}</p><p><strong>Job Type:</strong> ${job.type}</p><p><strong>Experience:</strong> ${job.experience}</p>${job.cert && job.cert !== "—" ? `<p><strong>Certification:</strong> ${job.cert}</p>` : ""}<p>Apply online at landmarkgulf.com/jobs</p>`,
        datePosted: today,
        validThrough,
        employmentType: employmentTypes,
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
            addressRegion: "Eastern Province",
            addressLocality: "Al Jubail",
            postalCode: "35712",
            streetAddress: "King Faisal W, King Fahd Industrial Port, Al Jubail",
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "SAR",
          value: {
            "@type": "QuantitativeValue",
            minValue: 15,
            maxValue: 80,
            unitText: "HOUR",
          },
        },
        qualifications: job.cert && job.cert !== "—"
          ? `${job.cert} required. Aramco-approved and TUV-certified candidates preferred.`
          : "Relevant experience and certifications. Aramco-approved and TUV-certified candidates preferred for specific roles.",
        experienceRequirements: {
          "@type": "OccupationalExperienceRequirements",
          monthsOfExperience: parseInt(job.experience) * 12 || 12,
        },
        skills: skills.join(", "),
        industry: "Construction & Industrial Services",
        occupationalCategory: "15-1199.00",
        jobBenefits: [
          "Competitive hourly pay (SAR 15-80/hour based on role)",
          "Accommodation provided for site workers",
          "Transportation provided",
          "Medical insurance",
          "Iqama transfer support",
          "Annual leave",
          "End-of-service benefits",
          "Career growth opportunities",
          "Safe working environment",
        ],
        applicationContact: {
          "@type": "ContactPoint",
          contactType: "recruitment",
          url: "https://www.landmarkgulf.com/jobs",
        },
        directApply: true,
      };
    })
  );

  return {
    "@context": "https://schema.org",
    "@graph": jobPostings,
  };
}

// ItemList schema — for browseable list of all jobs (helps Google display them as a collection)
export function generateJobsItemListSchema() {
  const allJobs = jobCategories.flatMap((c) =>
    c.jobs.map((job) => ({
      "@type": "ListItem",
      position: 0, // Will be filled in below
      name: job.title,
      url: `https://www.landmarkgulf.com/jobs`,
    }))
  );

  allJobs.forEach((item, idx) => {
    item.position = idx + 1;
  });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Open Positions at Landmark Inter Gulf LLC",
    description: `${allJobs.length} open positions across Saudi Arabia in manpower, equipment operations, supervision, hospitality, transport and management categories.`,
    itemListElement: allJobs,
  };
}
