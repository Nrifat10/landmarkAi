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
        unitText: job.salaryUnit || "MONTH",
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

  // Project sites where this role deploys
  const projectSites = ["Jafurah", "Marjan", "Jubail", "Yanbu", "Riyadh", "Dammam"];

  return (
    <article>
      {jsonLdScripts}

      {/* ===== HERO ===== */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-primary-foreground/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/jobs" className="hover:text-accent transition-colors">Jobs</Link>
            <span aria-hidden="true">›</span>
            <span className="text-accent font-semibold">{job.title}</span>
          </nav>

          {/* Job reference number */}
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center rounded-md bg-accent/15 border border-accent/30 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-accent">
              REF: LM-{job.slug.toUpperCase().slice(0, 12)}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              Position Open
            </span>
          </div>

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
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold" title="Employment type">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 7h-3V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a1 1 0 0 0-1-1z" strokeLinejoin="round" strokeLinecap="round" /></svg>
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold" title="Experience required">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinejoin="round" strokeLinecap="round" /></svg>
              {job.experience}
            </span>
            {job.cert && job.cert !== "—" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold" title="Certification needed">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" strokeLinejoin="round" strokeLinecap="round" /></svg>
                {job.cert}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 border border-green-400/40 px-3 py-1.5 text-xs font-bold text-green-300" title="Monthly salary range">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinejoin="round" strokeLinecap="round" /></svg>
              SAR {job.minSalary.toLocaleString()} – {job.maxSalary.toLocaleString()}/mo
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-xs font-bold" title="Job location">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" /></svg>
              Saudi Arabia
            </span>
          </div>

          {/* CTA on hero for desktop */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/jobs?apply=${encodeURIComponent(job.title)}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors px-6 py-3 text-sm font-bold shadow-lg"
            >
              Apply Now
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" /><polyline points="12 5 19 12 12 19" strokeLinejoin="round" strokeLinecap="round" /></svg>
            </Link>
            <a
              href={`mailto:${company.emailUser}@${company.emailDomain}?subject=Enquiry about ${encodeURIComponent(job.title)} position (Ref: LM-${job.slug.toUpperCase().slice(0, 12)})`}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors px-5 py-3 text-sm font-semibold"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><polyline points="22,6 12,13 2,6" strokeLinejoin="round" strokeLinecap="round" /></svg>
              Enquire
            </a>
            <button
              type="button"
              data-share-btn
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors px-5 py-3 text-sm font-semibold"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
              Share
            </button>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Main job details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Salary highlight card */}
              <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Monthly Salary</p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
                      SAR {job.minSalary.toLocaleString()} – {job.maxSalary.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      + accommodation, transport, medical &amp; Aramco benefits
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Posted</p>
                    <p className="text-sm font-bold text-foreground">
                      {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Closes in 90 days</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Job Overview
                </h2>
                <div
                  className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:leading-relaxed prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-accent"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Key Responsibilities
                </h2>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent mt-0.5">
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
                      <svg className="h-5 w-5 shrink-0 text-accent mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" strokeLinejoin="round" strokeLinecap="round" /></svg>
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
                      className="rounded-lg border border-border/60 bg-card p-3.5 text-xs text-foreground/90 hover:border-accent/40 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-2">
                        <svg className="h-4 w-4 shrink-0 text-accent mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 5.5L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></svg>
                        <span className="leading-relaxed">{b}</span>
                      </div>
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground border border-border/60"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project sites */}
              <div className="rounded-2xl border-2 border-border/70 bg-secondary/30 p-5">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22" strokeLinejoin="round"/></svg>
                  Project Sites You May Work On
                </h3>
                <div className="flex flex-wrap gap-2">
                  {projectSites.map((site) => (
                    <span key={site} className="inline-flex items-center gap-1 rounded-md bg-background border border-border/70 px-2.5 py-1 text-xs font-semibold text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                      {site}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Major EPC clients include SINOPEC, Hyundai E&amp;C, L&amp;T Arabia, SEPCO Arabia, SKEC and Midong E&amp;C.
                </p>
              </div>
            </div>

            {/* Sidebar — Apply CTA */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Apply card */}
                <div className="rounded-2xl border-2 border-accent/30 bg-card p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-green-600">Actively Hiring</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mb-1">Apply for this role</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Quick online application. HR responds within 2-5 working days.
                  </p>
                  <Link
                    href={`/jobs?apply=${encodeURIComponent(job.title)}`}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors px-5 py-3 text-sm font-bold shadow-lg"
                  >
                    Apply Now
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" /><polyline points="12 5 19 12 12 19" strokeLinejoin="round" strokeLinecap="round" /></svg>
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
                      <span className="font-semibold text-foreground">SAR {job.minSalary.toLocaleString()}-{job.maxSalary.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-semibold text-foreground">Saudi Arabia</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-semibold text-foreground text-right">{job.categoryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference</span>
                      <span className="font-mono font-semibold text-foreground text-right">LM-{job.slug.toUpperCase().slice(0, 12)}</span>
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

                {/* Similar jobs card */}
                <Link
                  href="/jobs"
                  className="block rounded-xl border-2 border-border/70 bg-card p-4 hover:border-accent/40 hover:shadow-md transition-all"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Browse more</p>
                  <p className="text-sm font-bold text-foreground">View all {jobs.length} open positions →</p>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related jobs */}
      {relatedJobs.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/40">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Keep exploring</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Related Open Positions
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Similar roles in {job.categoryName.toLowerCase()}
                </p>
              </div>
              <Link href="/jobs" className="text-sm font-bold text-accent hover:underline">
                All jobs →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedJobs.map((r) => (
                <Link
                  key={r.slug}
                  href={`/jobs/${r.slug}`}
                  className="group block rounded-xl border-2 border-border/70 bg-card p-4 hover:shadow-lg hover:border-accent/40 transition-all h-full"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">{r.categoryName}</p>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {r.title}
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinejoin="round" strokeLinecap="round" /></svg>
                      {r.experience}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinejoin="round" strokeLinecap="round" /></svg>
                      SAR {r.minSalary.toLocaleString()}-{r.maxSalary.toLocaleString()}/mo
                    </p>
                  </div>
                  <p className="mt-3 pt-3 border-t border-border/40 text-xs font-bold text-accent group-hover:underline">
                    View details →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile apply bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl">
        <div className="flex items-center gap-3 p-3 max-w-5xl mx-auto">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent truncate">{job.categoryName}</p>
            <p className="text-sm font-bold text-foreground truncate">{job.title}</p>
          </div>
          <Link
            href={`/jobs?apply=${encodeURIComponent(job.title)}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2.5 text-sm font-bold shadow-md whitespace-nowrap"
          >
            Apply Now
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" /><polyline points="12 5 19 12 12 19" strokeLinejoin="round" strokeLinecap="round" /></svg>
          </Link>
        </div>
      </div>

      {/* Bottom padding on mobile so sticky bar doesn't cover content */}
      <div className="lg:hidden h-16" aria-hidden="true" />

      {/* Inline client-side script for the Share button */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              var btn = e.target.closest('[data-share-btn]');
              if (!btn) return;
              var url = window.location.href;
              var title = document.title;
              if (navigator.share) {
                navigator.share({ title: title, url: url }).catch(function() {});
              } else if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(function() {
                  btn.innerHTML = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12" stroke-linejoin="round" stroke-linecap="round"/></svg> Link copied!';
                  setTimeout(function() {
                    btn.innerHTML = '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share';
                  }, 2000);
                });
              }
            });
          `,
        }}
      />
    </article>
  );
}
