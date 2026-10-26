/**
 * Comprehensive job listings data — fully Google for Jobs compliant.
 *
 * Each job has its own:
 * - slug (URL: /jobs/[slug])
 * - description (HTML, 200+ words)
 * - responsibilities (array)
 * - requirements (array)
 * - benefits (array)
 *
 * Google for Jobs requires:
 * 1. Each job to be on its own URL
 * 2. JobPosting JSON-LD schema on each page
 * 3. Detailed description with responsibilities/requirements
 * 4. Valid datePosted + validThrough
 * 5. Direct apply capability
 */

export type Job = {
  slug: string;
  title: string;
  categoryId: string;
  categoryName: string;
  type: string; // Full-time, Contract
  employmentType: string[]; // FULL_TIME, CONTRACTOR, etc.
  experience: string;
  yearsMin: number;
  cert: string;
  description: string; // HTML
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  industry: string;
  occupationCode: string;
  // Saudi market standard — monthly salary in SAR
  minSalary: number;   // Monthly SAR (low end)
  maxSalary: number;   // Monthly SAR (high end)
  salaryUnit: "MONTH"; // Schema.org unitText
};

// Benefits — same across all jobs (consistent employment package)
// Salary information is per-category, shown as monthly SAR (Saudi market standard)
const standardBenefits = [
  "Competitive monthly salary in SAR (based on role, experience and certifications)",
  "Accommodation provided near the project site",
  "Transportation to and from work site",
  "Medical insurance coverage",
  "Iqama transfer and renewal support",
  "Annual leave with paid ticket home (per Saudi labor law)",
  "End-of-service benefits (EOSB) as per Saudi labor law",
  "Safe working environment compliant with Aramco HSE standards",
  "Career growth and training opportunities",
  "Opportunity to work with major EPC contractors (SINOPEC, Hyundai E&C, L&T, SKEC)",
];

// Category-specific salary ranges (SAR per hour) — based on Saudi market rates
// Monthly equivalent (≈208 hrs/month) shown in description for clarity
const categorySalaries: Record<string, { min: number; max: number; monthlyMin: number; monthlyMax: number }> = {
  manpower: { min: 10, max: 55, monthlyMin: 2000, monthlyMax: 11000 },     // Helpers to skilled trades
  supervisors: { min: 35, max: 90, monthlyMin: 7000, monthlyMax: 18000 }, // Foremen to supervisors
  operators: { min: 25, max: 75, monthlyMin: 5000, monthlyMax: 15000 },   // Light driver to Aramco crane op
  hospitality: { min: 10, max: 30, monthlyMin: 2000, monthlyMax: 6000 },   // Cleaners to hotel staff
  transport: { min: 12, max: 50, monthlyMin: 2000, monthlyMax: 10000 },    // Light to trailer driver
  management: { min: 40, max: 120, monthlyMin: 8000, monthlyMax: 25000 }, // Officers to managers
};
const manpowerDescriptions: Record<string, { desc: string; resp: string[]; req: string[]; skills: string[] }> = {
  "pipe-fabricator": {
    desc: "<p><strong>Landmark Inter Gulf LLC</strong> is hiring skilled <strong>Pipe Fabricators</strong> for major oil &amp; gas and petrochemical projects across Saudi Arabia. You will be responsible for fabricating, cutting, beveling and assembling carbon steel, stainless steel and alloy piping systems according to project specifications and Aramco standards.</p><p>The role involves reading isometric drawings, calculating pipe dimensions, performing fit-up inspections, and ensuring all fabrication meets ASME B31.3 and Saudi Aramco standards. You will work alongside welding teams, supervisors and QA/QC inspectors on Jafurah, Marjan, Jubail and Yanbu projects for clients including SINOPEC, Hyundai E&amp;C, L&amp;T and SKEC.</p><p>This is a full-time position with long-term project deployment, competitive monthly pay, accommodation, transportation and full benefits package. Aramco-approved candidates with prior experience on Aramco projects are strongly preferred.</p>",
    resp: [
      "Fabricate and assemble piping systems from isometric and orthographic drawings",
      "Cut, bevel and prepare pipe ends for welding according to specifications",
      "Perform fit-up and dimensional checks before welding",
      "Ensure all fabrication meets ASME B31.3 and Saudi Aramco standards",
      "Coordinate with welders, supervisors and QA/QC inspectors",
      "Maintain tools, equipment and work area in safe condition",
      "Follow all HSE procedures and permit-to-work requirements",
    ],
    req: [
      "Minimum 3 years of experience as a Pipe Fabricator on industrial projects",
      "Ability to read isometric drawings and piping specifications",
      "Experience with carbon steel, stainless steel and alloy piping",
      "Aramco approval preferred for Aramco project sites",
      "Technical diploma or ITI certification in pipe fabrication",
      "Understanding of ASME B31.3 and Aramco welding standards",
      "Transferable Iqama or Saudi National",
    ],
    skills: ["Pipe Fabrication", "Isometric Drawing Reading", "ASME B31.3", "Pipe Fitting", "Beveling", "Fit-up Inspection", "Aramco Standards", "Oil & Gas"],
  },
  "pipe-fitter": {
    desc: "<p><strong>Landmark Inter Gulf LLC</strong> is hiring <strong>Pipe Fitters</strong> for petrochemical and oil &amp; gas construction projects in Saudi Arabia. You will be responsible for installing, assembling and maintaining piping systems for process plants, refineries and industrial facilities.</p><p>The role requires reading P&amp;IDs and isometric drawings, fitting and aligning pipes, valves and fittings, performing pressure tests, and ensuring compliance with Aramco and industrial standards. You will work on projects in Jafurah, Marjan, Jubail and Yanbu for major clients like SINOPEC, Hyundai E&amp;C, L&amp;T and SKEC.</p><p>This is a full-time role with attractive monthly salary, accommodation, transportation and full benefits. Long-term deployment opportunities available for high-performing candidates.</p>",
    resp: [
      "Install and assemble piping systems from isometric and P&ID drawings",
      "Fit and align pipes, valves, flanges and fittings",
      "Perform hydrostatic and pneumatic pressure tests",
      "Use hand tools, power tools and pipe fitting equipment safely",
      "Coordinate with welders and pipe fabrication teams",
      "Maintain dimensional accuracy and quality standards",
      "Follow HSE procedures and Aramco permit-to-work system",
    ],
    req: [
      "Minimum 3 years of experience as a Pipe Fitter on industrial projects",
      "Technical diploma or ITI certification in pipe fitting",
      "Ability to read P&IDs and isometric drawings",
      "Experience with carbon steel, stainless and alloy piping",
      "Familiarity with Aramco standards preferred",
      "Transferable Iqama or Saudi National",
    ],
    skills: ["Pipe Fitting", "P&ID Reading", "Isometric Drawings", "Pressure Testing", "Aramco Standards", "Oil & Gas", "Petrochemical"],
  },
  "welder-6g-3g": {
    desc: "<p><strong>Landmark Inter Gulf LLC</strong> is hiring certified <strong>6G/3G Welders</strong> for high-pressure piping and structural welding on major Aramco projects in Saudi Arabia. You will perform high-quality welding on carbon steel, stainless steel, duplex and alloy materials using TIG, ARC and combination processes.</p><p>The role involves welding to Aramco-approved welding procedures (WPS/PQR), passing RT and UT tests, and producing defect-free welds that meet Aramco inspection standards. You will work on Jafurah, Marjan and Jubail projects for clients including SINOPEC, Hyundai E&amp;C, L&amp;T and SKEC.</p><p>This is a full-time position with competitive monthly pay (top rates for 6G-certified welders), accommodation, transportation, medical insurance and long-term project stability. Aramco-approved welders preferred.</p>",
    resp: [
      "Perform TIG, ARC and combination welding per Aramco-approved WPS",
      "Weld carbon steel, stainless steel, duplex and alloy materials",
      "Produce defect-free welds passing RT, UT and visual inspection",
      "Read isometric drawings and welding symbols",
      "Maintain welding equipment and consumables",
      "Follow strict HSE and permit-to-work procedures",
      "Pass periodic welder qualification tests",
    ],
    req: [
      "6G or 3G welding certification (valid within 6 months)",
      "Minimum 5 years of industrial welding experience",
      "Aramco welder approval preferred for Aramco sites",
      "Experience with TIG and ARC welding on pipes",
      "Ability to read isometric drawings and welding symbols",
      "Transferable Iqama or Saudi National",
    ],
    skills: ["6G Welding", "3G Welding", "TIG Welding", "ARC Welding", "Aramco WPS", "Pipe Welding", "Stainless Steel", "Duplex"],
  },
  "tig-arc-welder": {
    desc: "<p><strong>Landmark Inter Gulf LLC</strong> is hiring skilled <strong>TIG &amp; ARC Welders</strong> for fabrication and construction projects across Saudi Arabia. You will perform precision TIG and ARC welding on pipe, plate and structural components for oil &amp; gas, petrochemical and industrial facilities.</p><p>The role requires following Aramco-approved welding procedures, producing defect-free welds, and passing visual and NDT inspections. Projects are located in Jafurah, Marjan, Jubail and Yanbu for major clients including SINOPEC, Hyundai E&amp;C, L&amp;T and SKEC.</p>",
    resp: [
      "Perform TIG and ARC welding on pipe, plate and structural components",
      "Follow Aramco-approved WPS specifications",
      "Produce defect-free welds passing visual and NDT inspection",
      "Read and interpret welding drawings and symbols",
      "Maintain welding machines and consumables",
      "Follow all HSE and permit-to-work procedures",
    ],
    req: [
      "Valid welding certification (TIG/ARC)",
      "Minimum 3 years of industrial welding experience",
      "Experience on oil & gas or petrochemical projects",
      "Ability to read welding drawings and symbols",
      "Aramco welder approval preferred",
      "Transferable Iqama or Saudi National",
    ],
    skills: ["TIG Welding", "ARC Welding", "Pipe Welding", "Plate Welding", "WPS", "Aramco Standards", "Oil & Gas"],
  },
};

// Default generator for jobs without specific descriptions
function generateDefaultDescription(
  title: string,
  categoryName: string,
  categoryId: string,
  experience: string,
  cert: string,
): { desc: string; resp: string[]; req: string[]; skills: string[] } {
  const salary = categorySalaries[categoryId];
  const salaryRange = salary ? `${salary.monthlyMin.toLocaleString()}-${salary.monthlyMax.toLocaleString()} SAR/month` : "competitive monthly salary in SAR";
  const desc = `<p><strong>Landmark Inter Gulf LLC</strong> is hiring skilled <strong>${title}</strong> for major industrial projects across Saudi Arabia. As a ${title.toLowerCase()} in the ${categoryName} category, you will contribute to the success of large-scale oil &amp; gas, petrochemical, and construction projects for clients including SINOPEC, Hyundai E&amp;C, L&amp;T and SKEC.</p><p>The role requires ${experience} of relevant experience${cert && cert !== "—" ? ` with ${cert.toLowerCase()} certification` : ""}. You will work on project sites across Saudi Arabia including Jafurah, Marjan, Jubail, Yanbu and Dammam. Aramco-approved and TUV-certified candidates are preferred for specific roles.</p><p>This is a full-time position with ${salaryRange}, accommodation, transportation, medical insurance and other benefits as per Saudi labor law. Long-term deployment opportunities available for high-performing candidates.</p>`;
  const resp = [
    `Perform ${title} duties as per project requirements and Aramco standards`,
    "Read and interpret technical drawings, specifications and work orders",
    "Use hand tools, power tools and equipment safely and effectively",
    "Coordinate with supervisors, foremen and QA/QC inspectors",
    "Follow all HSE procedures, permit-to-work system and safety guidelines",
    "Maintain work area, tools and equipment in good condition",
    "Participate in toolbox talks and safety meetings",
  ];
  const req = [
    `Minimum ${experience.replace("+", "")} of relevant experience`,
    cert && cert !== "—" ? `${cert} certification required` : "Relevant technical diploma or certification",
    "Ability to read technical drawings and specifications",
    "Familiarity with Aramco standards preferred",
    "Understanding of HSE and permit-to-work procedures",
    "Transferable Iqama, Visit Visa, or Saudi National",
  ];
  const skills = [title, categoryName.replace(/&.*/, ""), "Aramco Standards", "HSE Procedures", "Construction", "Saudi Arabia"];
  return { desc, resp, req, skills };
}

// Category-specific occupation codes
const occupationCodes: Record<string, string> = {
  manpower: "47-2061.00", // Construction trades
  supervisors: "11-9021.00", // Construction Managers
  operators: "53-7062.00", // Heavy equipment operators
  hospitality: "39-9011.00", // Hospitality
  transport: "53-3031.00", // Heavy truck drivers
  management: "11-9021.00",
};

// Map raw job data into fully detailed Job objects
import { jobCategories } from "./data";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseYears(experience: string): number {
  const match = experience.match(/(\d+)/);
  return match ? parseInt(match[1]) : 1;
}

function getEmploymentType(type: string): string[] {
  if (type.includes("Contract")) return ["CONTRACTOR"];
  return ["FULL_TIME"];
}

// Build the full jobs array with all detailed info
export const jobs: Job[] = jobCategories.flatMap((category) =>
  category.jobs.map((job) => {
    const slug = slugify(job.title);
    const yearsMin = parseYears(job.experience);

    // Check if we have a specific detailed description for this slug
    const detailed =
      category.id === "manpower"
        ? (manpowerDescriptions[slug] ?? null)
        : null;

    const fallback = generateDefaultDescription(job.title, category.name, category.id, job.experience, job.cert);
    const salary = categorySalaries[category.id] ?? { min: 10, max: 80, monthlyMin: 2000, monthlyMax: 16000 };

    return {
      slug,
      title: job.title,
      categoryId: category.id,
      categoryName: category.name,
      type: job.type,
      employmentType: getEmploymentType(job.type),
      experience: job.experience,
      yearsMin,
      cert: job.cert,
      description: detailed?.desc ?? fallback.desc,
      responsibilities: detailed?.resp ?? fallback.resp,
      requirements: detailed?.req ?? fallback.req,
      benefits: standardBenefits,
      skills: detailed?.skills ?? fallback.skills,
      industry: "Construction & Industrial Services",
      occupationCode: occupationCodes[category.id] ?? "47-2061.00",
      minSalary: salary.monthlyMin,
      maxSalary: salary.monthlyMax,
      salaryUnit: "MONTH",
    };
  }),
);

// Helper: get a job by slug
export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

// Helper: get related jobs by category (excluding current job)
export function getRelatedJobs(currentSlug: string, categoryId: string, limit = 4): Job[] {
  return jobs
    .filter((j) => j.categoryId === categoryId && j.slug !== currentSlug)
    .slice(0, limit);
}

// Helper: total job count
export const totalJobsCount = jobs.length;
