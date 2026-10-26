import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { company } from "@/lib/data";
import { Mail, MapPin, Globe, FileText, Briefcase, AlertTriangle, Scale, RefreshCw, ShieldAlert, Copyright } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Landmark Inter Gulf LLC",
  description:
    "Terms of Service for using the Landmark Inter Gulf LLC website and submitting job applications or enquiries. Read your rights and responsibilities.",
  alternates: { canonical: "https://www.landmarkgulf.com/terms-of-service" },
  robots: { index: true, follow: true },
};

const tocItems = [
  { id: "accept", label: "1. Acceptance of Terms" },
  { id: "company", label: "2. About Our Company" },
  { id: "use", label: "3. Acceptable Use" },
  { id: "applications", label: "4. Job Applications" },
  { id: "ip", label: "5. Intellectual Property" },
  { id: "services", label: "6. Service Information" },
  { id: "liability", label: "7. Limitation of Liability" },
  { id: "indemnity", label: "8. Indemnification" },
  { id: "links", label: "9. Third-Party Links" },
  { id: "law", label: "10. Governing Law" },
  { id: "changes", label: "11. Changes to Terms" },
  { id: "contact", label: "12. Contact" },
];

const acceptableUse = [
  "Submit only truthful, accurate, and current information in any form on this website.",
  "Respect the rights of other users and not harass, threaten, or defame anyone.",
  "Refrain from impersonating another person or providing false identification.",
  "Not attempt to gain unauthorised access to any part of the website, server, or database.",
  "Not use automated scripts, bots, scrapers, or rate-limit evasion tools to extract data.",
  "Not distribute spam, malware, or malicious content through our forms.",
  "Not reproduce, republish, or commercially exploit any content from this website without written permission.",
];

export default function TermsOfService() {
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="These Terms govern your use of landmarkgulf.com and any submission you make through our forms — including job applications and contact enquiries. Please read them carefully."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      {/* Quick info banner */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Scale className="h-4 w-4 text-accent" />
              Saudi law applies
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-accent" />
              No-registration use
            </span>
            <span className="inline-flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-accent" />
              Last updated: {today}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Sidebar TOC */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 rounded-xl border-2 border-border/70 bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">On this page</p>
                <nav className="space-y-1.5">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-muted-foreground hover:text-accent hover:translate-x-0.5 transition-all leading-snug py-0.5"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-5 pt-5 border-t border-border/60">
                  <p className="text-xs text-muted-foreground mb-2">Related document:</p>
                  <Link
                    href="/privacy-policy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Privacy Policy →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Intro */}
              <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-5 sm:p-6">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of the website
                  operated by <strong>Landmark Inter Gulf LLC</strong> (&ldquo;Landmark&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;, &ldquo;our&rdquo;) at <strong>www.landmarkgulf.com</strong> (the &ldquo;Site&rdquo;).
                  By accessing, browsing, or submitting any information through this Site, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms. If you do not agree, please do not
                  use this Site.
                </p>
              </div>

              {/* 1. Acceptance */}
              <section id="accept" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By using this Site, you represent and warrant that: (a) you are at least 18 years of age or accessing
                  the Site under parental supervision; (b) you have the legal capacity to enter into these Terms;
                  and (c) your use of the Site complies with all applicable laws of the Kingdom of Saudi Arabia and
                  any other jurisdiction where you reside or access the Site. If you are using the Site on behalf of
                  an employer or organisation, you represent that you have authority to bind that entity to these Terms.
                </p>
              </section>

              {/* 2. Company */}
              <section id="company" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">2</span>
                  About Our Company
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Landmark Inter Gulf LLC is a Saudi-based limited liability company established in 2017 and
                  registered in the Kingdom of Saudi Arabia. We provide integrated solutions in Manpower Supply,
                  Equipment Rental, Industrial Trading, Petro Services, and Hospitality Services to clients across
                  the Kingdom&apos;s industrial, energy, and infrastructure sectors. Our registered office is at King
                  Faisal W, King Fahd Industrial Port, Al Jubail, Eastern Province.
                </p>
              </section>

              {/* 3. Acceptable Use */}
              <section id="use" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">3</span>
                  Acceptable Use
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  You agree to use this Site for lawful purposes only. You will:
                </p>
                <ul className="space-y-2.5">
                  {acceptableUse.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <svg className="h-4 w-4 text-accent mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" strokeLinejoin="round" strokeLinecap="round" /></svg>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-lg border-l-4 border-amber-500/60 bg-amber-50 dark:bg-amber-950/20 p-3 flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Violation may result in:</strong> immediate blocking of your
                    IP address, permanent ban from our forms, and — for serious violations involving fraud, hacking
                    attempts, or unlawful activity — referral to Saudi authorities under the Anti-Cyber Crime Law.
                  </p>
                </div>
              </section>

              {/* 4. Job Applications */}
              <section id="applications" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">4</span>
                  Job Applications
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  When you submit a job application through our website, you agree to the following terms specific
                  to recruitment:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: "Truthful Information",
                      desc: "You will provide accurate information about your identity, qualifications, work experience, certifications, and visa/Iqama status. Providing false information (e.g., fake certifications or invalid visa claims) is grounds for immediate disqualification and may invalidate any employment offer.",
                    },
                    {
                      title: "Consent to Process",
                      desc: "You consent to our HR team reviewing your application data, contacting your references if shortlisted, and storing your application for up to 24 months for consideration for future openings.",
                    },
                    {
                      title: "No Guarantee of Employment",
                      desc: "Submission of an application does not constitute a job offer or guarantee of employment. Selection is at Landmark Inter Gulf's sole discretion based on project requirements, client approvals, and qualification verification.",
                    },
                    {
                      title: "Communication Consent",
                      desc: "You authorise Landmark Inter Gulf to contact you via email, phone, or WhatsApp at the contact details you provided regarding your application and any future suitable openings. You may withdraw this consent at any time by emailing us.",
                    },
                    {
                      title: "Right to Verify",
                      desc: "We reserve the right to verify all submitted documents (certifications, Iqama copy, experience letters) with the issuing authorities and previous employers as part of due diligence before any offer is made.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-lg border border-border/60 bg-card p-4 flex items-start gap-3">
                      <Briefcase className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-foreground mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Intellectual Property */}
              <section id="ip" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">5</span>
                  Intellectual Property
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  All content on this Site — including but not limited to text, graphics, logos, images, the
                  &ldquo;Landmark Inter Gulf&rdquo; brand name and logo, the Saudi Vision 2030 mark, page layouts,
                  service descriptions, project case studies, and software code — is the property of Landmark Inter
                  Gulf LLC, its licensors, or its content contributors, and is protected under Saudi and
                  international intellectual property laws.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs font-bold text-foreground mb-1 flex items-center gap-2">
                      <Copyright className="h-3.5 w-3.5 text-accent" />
                      You MAY
                    </p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• View and print pages for personal, non-commercial reference</li>
                      <li>• Share links to specific job postings or pages</li>
                      <li>• Quote brief excerpts with attribution to landmarkgulf.com</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs font-bold text-foreground mb-1 flex items-center gap-2">
                      <ShieldAlert className="h-3.5 w-3.5 text-accent" />
                      You MAY NOT
                    </p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Reproduce, republish, or commercially exploit content without written permission</li>
                      <li>• Use our logos or brand name on another website or marketing material</li>
                      <li>• Scrape, harvest, or bulk-download our job listings or content</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. Service Information */}
              <section id="services" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">6</span>
                  Service Information
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We strive to provide accurate, up-to-date information about our services, projects, and job
                  openings on this Site. However, we do not warrant that all information is complete, current, or
                  free of errors. Service descriptions, project references, salary ranges, certifications required,
                  and availability of positions may change without notice. For the most current and binding
                  information about any service or position, contact us directly at{" "}
                  <a href={`mailto:${company.emailUser}@${company.emailDomain}`} className="text-accent font-semibold hover:underline">
                    <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
                  </a>.
                </p>
              </section>

              {/* 7. Limitation of Liability */}
              <section id="liability" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">7</span>
                  Limitation of Liability
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  To the maximum extent permitted by applicable law, Landmark Inter Gulf LLC, its directors, officers,
                  employees, agents, affiliates, and suppliers shall not be liable for any:
                </p>
                <ul className="space-y-2">
                  {[
                    "Indirect, incidental, special, consequential, or punitive damages",
                    "Loss of profits, business opportunities, or anticipated savings",
                    "Loss of data, corruption, or service interruption",
                    "Any failure or delay in submitting an application through our forms",
                    "Any employment decision, hiring outcome, or lack of response from our HR team",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5 font-bold">✕</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  This Site and all content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                  basis without warranties of any kind, whether express or implied, including but not limited to
                  warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </section>

              {/* 8. Indemnification */}
              <section id="indemnity" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">8</span>
                  Indemnification
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Landmark Inter Gulf LLC, its directors, officers,
                  employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities,
                  costs, and expenses (including reasonable attorneys&apos; fees) arising out of or relating to:
                  (a) your use of the Site; (b) your violation of these Terms; (c) your violation of any third-party
                  right, including intellectual property rights; or (d) any false, misleading, or fraudulent
                  information you submit through our forms.
                </p>
              </section>

              {/* 9. Third-party links */}
              <section id="links" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">9</span>
                  Third-Party Links &amp; Embeds
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This Site may contain links to third-party websites (such as our Google Business Profile, client
                  websites, certification bodies, and government portals) and embeds (such as Google Maps). We do not
                  control and are not responsible for the content, privacy practices, or accuracy of these
                  third-party sites. Your use of any linked or embedded third-party site is at your own risk and
                  subject to that site&apos;s own terms and privacy policy.
                </p>
              </section>

              {/* 10. Governing law */}
              <section id="law" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">10</span>
                  Governing Law &amp; Disputes
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi
                  Arabia, including the Saudi Labour Law, the Saudi Personal Data Protection Law (PDPL), and the
                  Anti-Cyber Crime Law. Any dispute arising out of or relating to these Terms or your use of this
                  Site shall first be attempted to be resolved through good-faith negotiation. If unresolved within
                  60 days, the dispute shall be submitted to the competent courts of Al Jubail, Eastern Province,
                  Kingdom of Saudi Arabia.
                </p>
              </section>

              {/* 11. Changes */}
              <section id="changes" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">11</span>
                  Changes to These Terms
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>
                    We reserve the right to update or modify these Terms at any time at our sole discretion. Material
                    changes will be posted on this page with an updated revision date at the top. Your continued use
                    of the Site after any change constitutes acceptance of the new Terms. We encourage you to review
                    this page periodically.
                  </span>
                </p>
              </section>

              {/* 12. Contact */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">12</span>
                  Contact
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  If you have any questions, concerns, or notices regarding these Terms of Service, please contact us:
                </p>
                <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-5">
                  <div className="space-y-2.5 text-sm">
                    <p className="flex items-center gap-3 text-foreground">
                      <FileText className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-semibold">Legal enquiries:</span>
                      <a href={`mailto:${company.emailUser}@${company.emailDomain}?subject=Terms of Service enquiry`} className="text-accent hover:underline">
                        <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-foreground">
                      <Globe className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-semibold">Website:</span>
                      <a href={company.websiteUrl} className="text-accent hover:underline">{company.websiteUrl}</a>
                    </p>
                    <p className="flex items-start gap-3 text-foreground">
                      <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="font-semibold">Registered office:</span>
                      <span>King Faisal W, King Fahd Industrial Port, Al Jubail 35712, Eastern Province, Kingdom of Saudi Arabia</span>
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  Notices sent by email are deemed received on the next business day after sending. For formal legal
                  notices, please also send a copy by registered post to the registered office address above.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
