import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { jobs, getJobBySlug, getRelatedJobs } from "@/lib/jobs-data";
import { company } from "@/lib/data";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all jobs (pre-rendered at build time)
export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

// Generate dynamic metadata per job (SEO-friendly titles)
export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) {
    return {
      title: "Job Not Found — Landmark Inter Gulf LLC",
    };
  }
  return {
    title: `${job.title} Job in Saudi Arabia — Apply Online | Landmark Inter Gulf`,
    description: `Apply for ${job.title} position at Landmark Inter Gulf LLC. ${job.experience} experience required${job.cert && job.cert !== "—" ? `, ${job.cert} certification` : ""}. Aramco-approved projects across Saudi Arabia. Apply online today.`,
    keywords: [
      `${job.title} jobs Saudi Arabia`,
      `${job.title} jobs KSA`,
      `${job.title} Aramco jobs`,
      `${job.title} Jubail jobs`,
      `${job.title} Yanbu jobs`,
      `${job.title} Jafurah jobs`,
      `${job.title} Marjan jobs`,
      "Landmark Inter Gulf jobs",
      `${job.title} salary Saudi Arabia`,
      `${job.categoryName} jobs Saudi Arabia`,
    ],
    alternates: {
      canonical: `https://www.landmarkgulf.com/jobs/${job.slug}`,
    },
    openGraph: {
      title: `${job.title} — Hiring in Saudi Arabia`,
      description: `Join Landmark Inter Gulf as a ${job.title}. ${job.experience} experience. Apply online at landmarkgulf.com/jobs/${job.slug}`,
      url: `https://www.landmarkgulf.com/jobs/${job.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} — Hiring in Saudi Arabia`,
      description: `Apply now for ${job.title} position at Landmark Inter Gulf LLC`,
    },
  };
}

// Generate the per-job JobPosting JSON-LD schema
function generateJobPostingJsonLd(job: typeof jobs[0]) {
  const today = new Date().toISOString().split("T")[0];
  const validThrough = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${job.title} — Landmark Inter Gulf LLC`,
    description: job.description,
    datePosted: today,
    validThrough,
    employmentType: job.employmentType,
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
        minValue: job.minSalary,
        maxValue: job.maxSalary,
        unitText: "HOUR",
      },
    },
    qualifications: job.requirements.join(" "),
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.yearsMin * 12,
    },
    skills: job.skills.join(", "),
    industry: job.industry,
    occupationalCategory: job.occupationCode,
    jobBenefits: job.benefits,
    responsibilities: job.responsibilities.join(" "),
    applicationContact: {
      "@type": "ContactPoint",
      contactType: "recruitment",
      url: `https://www.landmarkgulf.com/jobs/${job.slug}`,
    },
    directApply: true,
    identifier: {
      "@type": "PropertyValue",
      name: "Landmark Inter Gulf LLC",
      value: `LM-${job.slug}`,
    },
  };
}

// Breadcrumb schema
function generateBreadcrumbJsonLd(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.landmarkgulf.com" },
      { "@type": "ListItem", position: 2, name: "Jobs", item: "https://www.landmarkgulf.com/jobs" },
      { "@type": "ListItem", position: 3, name: title, item: `https://www.landmarkgulf.com/jobs/${slug}` },
    ],
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedJobs(slug, job.categoryId, 4);
  const jobPostingJsonLd = generateJobPostingJsonLd(job);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(slug, job.title);

  // Breadcrumb UI
  const jsonLdScripts = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );

  return (
    <article>
      {jsonLdScripts}
      {/* Hero section with job title */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/70 mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <Link href="/jobs" className="hover:text-accent transition-colors">Jobs</Link>
            <span>›</span>
            <span className="text-accent">{job.title}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
            {job.categoryName}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            {job.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-primary-foreground/80 max-w-3xl">
            Hiring across Saudi Arabia — Aramco-approved projects in Jafurah, Marjan, Jubail, Yanbu, Riyadh and Dammam
          </p>

          {/* Key info pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold">
              💼 {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold">
              📅 {job.experience}
            </span>
            {job.cert && job.cert !== "—" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold">
                🏅 {job.cert}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold">
              💰 SAR {job.minSalary}-{job.maxSalary}/hour
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold">
              📍 Saudi Arabia
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Main job details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Key Responsibilities
                </h2>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Requirements &amp; Qualifications
                </h2>
                <ul className="space-y-2.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="text-accent mt-0.5 text-xs">✓</span>
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Benefits &amp; What We Offer
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {job.benefits.map((b, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border/60 bg-card p-3 text-xs text-foreground/90"
                    >
                      <span className="text-accent mr-1.5">★</span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Skills Required
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — Apply CTA */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Apply card */}
                <div className="rounded-2xl border-2 border-accent/30 bg-card p-6 shadow-xl">
                  <h3 className="text-lg font-extrabold text-foreground mb-1">Apply for this role</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Quick online application. HR responds within 2-5 working days.
                  </p>
                  <Link
                    href={`/jobs?apply=${encodeURIComponent(job.title)}`}
                    className="block w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors px-5 py-3 text-sm font-bold text-center"
                  >
                    Apply Now →
                  </Link>

                  {/* Quick stats */}
                  <div className="mt-5 pt-5 border-t border-border/60 space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Job Type</span>
                      <span className="font-semibold text-foreground">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-semibold text-foreground">{job.experience}</span>
                    </div>
                    {job.cert && job.cert !== "—" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Certification</span>
                        <span className="font-semibold text-foreground text-right">{job.cert}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary</span>
                      <span className="font-semibold text-foreground">SAR {job.minSalary}-{job.maxSalary}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-semibold text-foreground">Saudi Arabia</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-semibold text-foreground text-right">{job.categoryName}</span>
                    </div>
                  </div>
                </div>

                {/* Help card */}
                <div className="rounded-xl border-2 border-border/70 bg-secondary/40 p-5">
                  <h4 className="text-sm font-bold text-foreground mb-2">Have questions?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    Email our HR team for queries about this role, qualifications, or visa requirements.
                  </p>
                  <a
                    href={`mailto:${company.emailUser}@${company.emailDomain}?subject=Enquiry about ${encodeURIComponent(job.title)} position`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related jobs */}
      {relatedJobs.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/40">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-6 text-center">
              Related Open Positions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedJobs.map((r) => (
                <Link
                  key={r.slug}
                  href={`/jobs/${r.slug}`}
                  className="block rounded-xl border-2 border-border/70 bg-card p-4 hover:shadow-lg hover:border-accent/40 transition-all"
                >
                  <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {r.experience} · {r.type}
                  </p>
                  <p className="mt-3 text-xs font-bold text-accent">
                    View details →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
