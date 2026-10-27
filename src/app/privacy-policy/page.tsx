import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { company } from "@/lib/data";
import { Mail, MapPin, Globe, ShieldCheck, FileText, Database, Lock, UserCheck, Clock, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Landmark Inter Gulf LLC",
  description:
    "Privacy Policy for Landmark Inter Gulf LLC. Learn how we collect, use, share, and protect your personal information when you apply for jobs or contact us.",
  alternates: { canonical: "https://www.landmarkgulf.com/privacy-policy" },
  robots: { index: true, follow: true },
};

const tocItems = [
  { id: "collect", label: "1. Information We Collect" },
  { id: "use", label: "2. How We Use Your Information" },
  { id: "storage", label: "3. Data Storage & Security" },
  { id: "third-party", label: "4. Third-Party Services" },
  { id: "cookies", label: "5. Cookies & Tracking" },
  { id: "rights", label: "6. Your Privacy Rights" },
  { id: "retention", label: "7. Data Retention" },
  { id: "transfer", label: "8. International Data Transfer" },
  { id: "children", label: "9. Children's Privacy" },
  { id: "changes", label: "10. Changes to This Policy" },
  { id: "contact", label: "11. Contact Us" },
];

const infoTypes = [
  {
    icon: FileText,
    title: "Job Application Data",
    desc: "When you apply for a position through our online form, we collect your name, email address, phone number, nationality, current location, years of experience, certifications, languages spoken, Iqama/visa status, notice period and any message you provide.",
  },
  {
    icon: Mail,
    title: "Contact Form Data",
    desc: "When you submit an enquiry through our contact form, we collect your name, email, phone number, company name, the service you are interested in, and the message you send us.",
  },
  {
    icon: Database,
    title: "Automatic Technical Data",
    desc: "Like most websites, we automatically collect basic technical information when you visit — IP address, browser type and version, device type, referring page URLs, and timestamps. This is used solely for security, abuse prevention, and analytics.",
  },
];

const rightsItems = [
  { title: "Access", desc: "Request a copy of the personal data we hold about you." },
  { title: "Correct", desc: "Ask us to fix inaccurate or incomplete information." },
  { title: "Delete", desc: "Request that we erase your personal data (subject to legal retention duties)." },
  { title: "Restrict", desc: "Ask us to limit how we use your data in specific circumstances." },
  { title: "Portability", desc: "Receive your data in a structured, machine-readable format." },
  { title: "Withdraw Consent", desc: "Opt out of communications at any time — unsubscribe via email link or reply STOP." },
];

export default function PrivacyPolicy() {
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains exactly what personal data Landmark Inter Gulf LLC collects, why we collect it, how long we keep it, and the rights you have over your information."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      {/* Trust banner */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              GDPR-aligned
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-accent" />
              Encrypted in transit (HTTPS)
            </span>
            <span className="inline-flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-accent" />
              No tracking cookies
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
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
                  <p className="text-xs text-muted-foreground mb-2">Have questions?</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Contact our team →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Intro */}
              <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-5 sm:p-6">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Landmark Inter Gulf LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website
                  <strong> www.landmarkgulf.com</strong> and provides manpower supply, equipment rental, industrial
                  trading, petro services and hospitality services across the Kingdom of Saudi Arabia. This Privacy
                  Policy explains how we collect, use, share, and protect your personal information when you visit
                  our website, apply for a job, or submit an enquiry. By using our website, you agree to the practices
                  described below.
                </p>
              </div>

              {/* 1. Information we collect */}
              <section id="collect" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">1</span>
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  {infoTypes.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.title} className="rounded-xl border-2 border-border/70 bg-card p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-sm mb-1">{info.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{info.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 2. How we use */}
              <section id="use" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">2</span>
                  How We Use Your Information
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect for the following specific purposes:
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Process and respond to your job application, including contacting you for interviews and follow-up questions.",
                    "Respond to enquiries submitted via our contact form and provide the information you requested.",
                    "Verify your identity and qualifications during the recruitment process.",
                    "Prevent fraud, spam, and abuse of our forms — including honeypot detection and rate-limiting by IP.",
                    "Improve our website content, services, and user experience based on aggregated, anonymous analytics.",
                    "Comply with our legal, regulatory, and contractual obligations under Saudi labour law.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <svg className="h-4 w-4 text-accent mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" strokeLinejoin="round" strokeLinecap="round" /></svg>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  We do <strong className="text-foreground">not</strong> use your personal data for targeted advertising,
                  behavioural profiling, or sale to third parties. We never sell your data — to anyone, ever.
                </p>
              </section>

              {/* 3. Storage & Security */}
              <section id="storage" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">3</span>
                  Data Storage &amp; Security
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Your data is processed through the following secure channels:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs font-bold text-foreground mb-1">In transit</p>
                    <p className="text-xs text-muted-foreground">All form submissions travel over HTTPS (TLS 1.2+) encrypted connections. Your browser enforces this — no plaintext channel is ever used.</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs font-bold text-foreground mb-1">At rest (form delivery)</p>
                    <p className="text-xs text-muted-foreground">Submissions are delivered to our HR team email inbox hosted by our email provider. Access is restricted to authorised HR personnel only.</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs font-bold text-foreground mb-1">Bot &amp; abuse protection</p>
                    <p className="text-xs text-muted-foreground">Server-side honeypot field, time-based submission check (3s minimum), and rate limiting (10 applications / 5 enquiries per IP per hour) protect against automated abuse.</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                    <p className="text-xs font-bold text-foreground mb-1">Internal access</p>
                    <p className="text-xs text-muted-foreground">Internal access to your data is restricted to authorised HR staff with a legitimate business need. All staff are bound by confidentiality obligations.</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  While we implement reasonable technical and organisational measures to protect your data, no method
                  of transmission or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              {/* 4. Third-party services */}
              <section id="third-party" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">4</span>
                  Third-Party Services
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We use the following third-party services to operate our website. Each one has its own privacy policy
                  which we encourage you to review:
                </p>
                <div className="space-y-2.5">
                  {[
                    { name: "SplitForms", purpose: "Form processing & email delivery — receives your form submissions and forwards them to our HR inbox. Reply-to address is your email so we can respond directly.", data: "All form fields you submit" },
                    { name: "Vercel", purpose: "Website hosting & content delivery — serves the pages you visit. May log IP, browser, and timestamp for security and operational purposes.", data: "IP, browser, request metadata" },
                    { name: "Google (Search & Maps)", purpose: "Search engine indexing, Google Business Profile integration (map embed, opening hours, review links). No Google Analytics tracking is enabled.", data: "What you visit publicly" },
                  ].map((svc) => (
                    <div key={svc.name} className="rounded-lg border border-border/60 bg-card p-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-sm font-bold text-foreground">{svc.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Data: {svc.data}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{svc.purpose}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Cookies */}
              <section id="cookies" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">5</span>
                  Cookies &amp; Tracking
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our website uses only <strong className="text-foreground">essential functional cookies</strong> required
                  for the site to operate (such as remembering whether you have already applied for a job — stored
                  locally in your browser via localStorage, never sent to our server). We do <strong className="text-foreground">not</strong> use:
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Google Analytics, Adobe Analytics, or any behavioural analytics tracking",
                    "Facebook Pixel, Google Ads conversion tracking, or any advertising pixels",
                    "Third-party remarketing or audience-building tags",
                    "Browser fingerprinting or device identification scripts",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5 font-bold">✕</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 6. Rights */}
              <section id="rights" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">6</span>
                  Your Privacy Rights
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Depending on your jurisdiction (including under GDPR, Saudi Personal Data Protection Law (PDPL), or
                  other applicable regulations), you may have the following rights regarding your personal data. To
                  exercise any of these rights, email us at{" "}
                  <a href={`mailto:${company.emailUser}@${company.emailDomain}`} className="text-accent font-semibold hover:underline">
                    <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
                  </a>.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {rightsItems.map((right) => (
                    <div key={right.title} className="rounded-lg border border-border/60 bg-card p-3.5">
                      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{right.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{right.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Retention */}
              <section id="retention" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">7</span>
                  Data Retention
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We retain your personal data only as long as needed for the purpose it was collected:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent mt-0.5">A</span>
                      <span><strong className="text-foreground">Job applications:</strong> Retained for up to <strong className="text-foreground">24 months</strong> from submission so we can consider you for future openings, unless you ask us to delete sooner.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent mt-0.5">B</span>
                      <span><strong className="text-foreground">Contact enquiries:</strong> Retained for up to <strong className="text-foreground">12 months</strong> for follow-up, then securely deleted.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent mt-0.5">C</span>
                      <span><strong className="text-foreground">Successful hires:</strong> If you are hired, your data is moved to our HR system and retained for the duration of employment plus the legally required period thereafter.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent mt-0.5">D</span>
                      <span><strong className="text-foreground">Server logs (IP, browser):</strong> Automatic logs are rotated and deleted within <strong className="text-foreground">30 days</strong>.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 8. International transfer */}
              <section id="transfer" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">8</span>
                  International Data Transfer
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your data may be processed by our third-party service providers (SplitForms, Vercel) whose servers
                  may be located outside the Kingdom of Saudi Arabia. By submitting your information through our
                  website, you consent to this international transfer. We select service providers that offer
                  adequate data protection safeguards consistent with the Saudi PDPL and applicable international
                  standards.
                </p>
              </section>

              {/* 9. Children */}
              <section id="children" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">9</span>
                  Children&apos;s Privacy
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our website and services are directed at adults aged 18 and older. We do not knowingly collect
                  personal information from children under 18. If you believe a child has provided us with personal
                  data, please contact us immediately and we will promptly delete it.
                </p>
              </section>

              {/* 10. Changes */}
              <section id="changes" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">10</span>
                  Changes to This Policy
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>
                    We may update this Privacy Policy from time to time to reflect changes in our practices, services,
                    or applicable law. Material changes will be posted on this page with an updated revision date at
                    the top. We encourage you to review this page periodically.
                  </span>
                </p>
              </section>

              {/* 11. Contact */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl font-extrabold text-foreground mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent text-sm font-bold">11</span>
                  Contact Us
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, want to exercise your data rights, or would like
                  to report a privacy concern, please reach out:
                </p>
                <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-5">
                  <div className="space-y-2.5 text-sm">
                    <p className="flex items-center gap-3 text-foreground">
                      <Mail className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-semibold">Email:</span>
                      <a href={`mailto:${company.emailUser}@${company.emailDomain}`} className="text-accent hover:underline">
                        <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-foreground">
                      <Globe className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-semibold">Website:</span>
                      <a href={company.websiteUrl} className="text-accent hover:underline">{company.websiteUrl}</a>
                    </p>
                    <p className="flex items-center gap-3 text-foreground">
                      <MapPin className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-semibold">Location:</span>
                      <span>King Fahd Industrial Port, Al Jubail, Eastern Province, Kingdom of Saudi Arabia</span>
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  For a faster response, please include &ldquo;Privacy Request&rdquo; in your email subject line.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
