"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  HardHat,
  Users,
  Truck,
  ConciergeBell,
  Car,
  Briefcase,
  Clock,
  Award,
  CheckCircle2,
  X,
  Send,
  Loader2,
  ArrowRight,
  Search,
  Sparkles,
  PartyPopper,
  Phone,
  MailCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { jobCategories } from "@/lib/data";
import { jobs } from "@/lib/jobs-data";
import { siteImages } from "@/lib/images";
import { cn } from "@/lib/utils";

const iconMap: Record<string, typeof HardHat> = {
  HardHat, Users, Truck, ConciergeBell, Car, Briefcase,
};

function JobsPageInner() {
  const searchParams = useSearchParams();
  const initialApplyJob = searchParams.get("apply") || null;

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Track if user manually closed — prevents reopen from URL param
  const [manuallyClosed, setManuallyClosed] = useState(false);
  // Initialize with URL param directly (no effect needed)
  const [applyingJob, setApplyingJob] = useState<string | null>(initialApplyJob);

  const handleClose = () => {
    setManuallyClosed(true);
    setApplyingJob(null);
  };

  const filteredCategories = activeCategory === "all"
    ? jobCategories
    : jobCategories.filter((c) => c.id === activeCategory);

  const totalJobs = jobs.length;

  const searchedJobs = searchQuery.trim()
    ? jobs.filter((j) =>
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <>
      <PageHero
        eyebrow="Jobs & Careers"
        title="Join the Landmark Inter Gulf team"
        description="We're hiring skilled professionals across Saudi Arabia. Browse open positions by category and apply online — we respond to every application."
        breadcrumbs={[{ label: "Jobs" }]}
        image={siteImages.workers[0]}
      />

      <section className="relative py-12 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: `${totalJobs}+`, label: "Open Positions", icon: Briefcase },
              { value: "6", label: "Job Categories", icon: Award },
              { value: "5,000+", label: "Professionals Deployed", icon: Users },
              { value: "2017", label: "Established", icon: CheckCircle2 },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-xl border-2 border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-5 text-center"
                >
                  <Icon className="h-7 w-7 mx-auto text-accent" />
                  <div className="mt-2 text-2xl sm:text-3xl font-extrabold">{s.value}</div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-primary-foreground/80">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search jobs by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          {searchedJobs ? (
            <div>
              <h3 className="text-center text-lg font-bold text-foreground mb-6">
                {searchedJobs.length} job{searchedJobs.length !== 1 ? "s" : ""} found
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchedJobs.map((job, i) => (
                  <motion.div
                    key={job.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link href={`/jobs/${job.slug}`}>
                      <Card className="h-full border-border/70 hover:shadow-lg hover:border-accent/40 transition-all group">
                        <CardContent className="p-5 flex flex-col h-full">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4 className="font-bold text-foreground text-base group-hover:text-accent transition-colors leading-snug">
                              {job.title}
                            </h4>
                            <span className="inline-flex items-center justify-center h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0" title="Open position" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{job.categoryName}</p>
                          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground flex-1">
                            <p className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                              {job.type} · {job.experience}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <svg className="h-3.5 w-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinejoin="round" strokeLinecap="round" /></svg>
                              <span className="font-semibold text-foreground/80">SAR {job.minSalary.toLocaleString()}-{job.maxSalary.toLocaleString()}/mo</span>
                            </p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                            <span className="text-xs font-bold text-accent group-hover:underline">View details →</span>
                            <span className="text-[10px] text-muted-foreground font-mono">LM-{job.slug.toUpperCase().slice(0, 8)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {searchedJobs.length === 0 && (
                <p className="text-center text-muted-foreground py-10">No jobs found. Try a different search.</p>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all",
                    activeCategory === "all"
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-card border border-border/60 text-foreground/70 hover:border-accent/40"
                  )}
                >
                  All Categories ({totalJobs}+)
                </button>
                {jobCategories.map((cat) => {
                  const Icon = iconMap[cat.icon] ?? Briefcase;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                        activeCategory === cat.id
                          ? "bg-accent text-accent-foreground shadow-md"
                          : "bg-card border border-border/60 text-foreground/70 hover:border-accent/40"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-12">
                {filteredCategories.map((cat, catIdx) => {
                  const Icon = iconMap[cat.icon] ?? Briefcase;
                  const catJobs = jobs.filter((j) => j.categoryId === cat.id);
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{cat.name}</h3>
                          <p className="text-sm text-muted-foreground">{cat.description} · {catJobs.length} open role{catJobs.length !== 1 ? "s" : ""}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {catJobs.map((job, jIdx) => (
                          <motion.div
                            key={job.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.3, delay: jIdx * 0.04 }}
                          >
                            <Link href={`/jobs/${job.slug}`}>
                              <Card className="h-full border-border/70 hover:shadow-lg hover:border-accent/40 transition-all group flex flex-col">
                                <CardContent className="p-5 flex flex-col h-full">
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <h4 className="font-bold text-foreground text-base group-hover:text-accent transition-colors leading-snug">
                                      {job.title}
                                    </h4>
                                    <span className="inline-flex items-center justify-center h-2 w-2 rounded-full bg-green-500 mt-1.5 shrink-0" title="Open position" />
                                  </div>
                                  <div className="mt-2 space-y-1.5 text-xs text-muted-foreground flex-1">
                                    <p className="flex items-center gap-1.5">
                                      <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                                      {job.type} · {job.experience}
                                    </p>
                                    {job.cert && job.cert !== "—" && (
                                      <p className="flex items-center gap-1.5">
                                        <Award className="h-3.5 w-3.5 text-accent shrink-0" />
                                        {job.cert}
                                      </p>
                                    )}
                                    <p className="flex items-center gap-1.5">
                                      <svg className="h-3.5 w-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinejoin="round" strokeLinecap="round" /></svg>
                                      <span className="font-semibold text-foreground/80">SAR {job.minSalary.toLocaleString()}-{job.maxSalary.toLocaleString()}/mo</span>
                                    </p>
                                  </div>
                                  <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                                    <span className="text-xs font-bold text-accent group-hover:underline">
                                      View details →
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-mono">LM-{job.slug.toUpperCase().slice(0, 8)}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Join Us"
            title="Build your career with Landmark Inter Gulf"
            description="We invest in our people — competitive pay, safe working conditions, and opportunities to work on the Kingdom's biggest projects."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award, title: "Competitive Pay", desc: "Industry-leading salaries and benefits" },
              { icon: CheckCircle2, title: "Safe Workplace", desc: "100% safety commitment on every site" },
              { icon: Users, title: "Major Projects", desc: "Work with SINOPEC, Hyundai E&C, L&T and more" },
              { icon: ArrowRight, title: "Career Growth", desc: "Training and advancement opportunities" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-xl border-2 border-border/70 bg-card p-5 text-center hover:shadow-md hover:border-accent/40 transition-all"
                >
                  <Icon className="h-8 w-8 mx-auto text-accent" />
                  <h3 className="mt-3 font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Vision 2030 banner */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-6 text-center sm:text-left">
            <img
              src="/saudi-vision-2030.svg"
              alt="Saudi Vision 2030"
              className="h-14 w-auto object-contain"
              loading="lazy"
            />
            <div className="max-w-2xl">
              <h3 className="text-sm font-bold text-foreground">Proudly supporting Saudi Vision 2030</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                By joining Landmark Inter Gulf, you become part of the Kingdom&apos;s transformation — contributing to
                major infrastructure, energy and industrial projects that are shaping Saudi Arabia&apos;s future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {applyingJob && (
          <JobApplicationForm
            jobTitle={applyingJob}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={null}>
      <JobsPageInner />
    </Suspense>
  );
}

function JobApplicationForm({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formStartTime] = useState(() => Date.now());

  // Web3Forms access key — required to be in client bundle for direct browser→Web3Forms call
  // (Web3Forms blocks server-side fetch on free plan)
  const WEB3FORMS_ACCESS_KEY = "a4cca705-45da-4728-b9b2-5cb0c214c544";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const botcheck = formData.get("botcheck");

    // Client-side bot protection #1 — honeypot field must be empty
    if (botcheck) {
      setSubmitting(false);
      return;
    }

    // Client-side bot protection #2 — humans take >3s to fill the form
    const elapsed = Date.now() - formStartTime;
    if (elapsed < 3000) {
      setSubmitting(false);
      toast({
        title: "Please take a moment",
        description: "Please review the form and try submitting again.",
      });
      return;
    }

    // Client-side rate limit — one application per browser (localStorage)
    const applicationKey = `landmark_application`;
    const existingApplication = localStorage.getItem(applicationKey);
    if (existingApplication) {
      try {
        const app = JSON.parse(existingApplication);
        if (app.email === email || app.phone === phone) {
          setSubmitting(false);
          setSubmitted(true);
          toast({
            title: "Already Applied!",
            description: `You have already submitted an application for "${app.jobTitle}". Our team will contact you soon.`,
          });
          setTimeout(onClose, 5000);
          return;
        }
      } catch {
        // ignore
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitting(false);
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Submit directly to Web3Forms from the browser (server-side blocked on free plan)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Job Application: ${jobTitle} — Landmark Inter Gulf LLC`,
          from_name: "Landmark Inter Gulf — Jobs Page",
          name: formData.get("fullName"),
          email,
          phone,
          nationality: formData.get("nationality"),
          current_location: formData.get("currentLocation"),
          experience: formData.get("experience"),
          certifications: formData.get("certifications") || "Not provided",
          languages: formData.get("languages"),
          iqama_visa_status: formData.get("iqamaStatus"),
          notice_period: formData.get("noticePeriod") || "Not provided",
          message: formData.get("message") || "—",
          job_title: jobTitle,
          company: "Landmark Inter Gulf LLC",
          replyto: email,
          botcheck: botcheck ? "true" : "",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem(applicationKey, JSON.stringify({ email, phone, jobTitle, date: new Date().toISOString() }));
        setSubmitted(true);
        setSubmitting(false);
        toast({
          title: "Application Submitted!",
          description: `We'll review your application for "${jobTitle}" and contact you soon.`,
        });
        (e.target as HTMLFormElement).reset();
        setTimeout(onClose, 3000);
      } else {
        setSubmitting(false);
        toast({
          title: "Submission failed",
          description: result.message || "Please try again later or email us at info@landmarkgulf.com",
          variant: "destructive",
        });
      }
    } catch {
      setSubmitting(false);
      toast({
        title: "Network error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-background border-2 border-accent/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="relative p-8 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[...Array(14)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: -20, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, 280],
                    x: [(i - 7) * 18, (i - 7) * 30],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 1.8, delay: i * 0.08, ease: "easeOut" }}
                  className="absolute top-2 left-1/2 h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"][i % 5],
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-4 ring-green-500/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
              >
                <CheckCircle2 className="h-11 w-11 text-green-500" strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartyPopper className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-extrabold text-foreground">Application Submitted!</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Thank you for applying for <strong className="text-foreground">{jobTitle}</strong>. Our HR team will review your application and contact you within <strong>2–5 working days</strong>.
              </p>

              <div className="mt-5 rounded-xl border-2 border-accent/20 bg-accent/5 p-4 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> What happens next?
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">1</span>
                    <span>Our HR team reviews your application and qualifications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">2</span>
                    <span>If shortlisted, we&apos;ll contact you for an interview via phone or email.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">3</span>
                    <span>Selected candidates will receive an offer letter and onboarding details.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MailCheck className="h-3.5 w-3.5 text-accent" /> info&#64;landmarkgulf.com
                </span>
                <span className="hidden sm:inline text-muted-foreground/40">•</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-accent" /> HR team, Al Jubail
                </span>
              </div>

              <Button onClick={onClose} className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-11">
                Done
              </Button>
            </motion.div>
          </div>
        ) : submitting ? (
          <div className="p-12 text-center">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 ring-4 ring-accent/20"
            >
              <Send className="h-9 w-9 text-accent" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-foreground"
            >
              Sending your application...
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-muted-foreground"
            >
              Please wait while we securely submit your details.
            </motion.p>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 rounded-full bg-accent"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-5 text-xs text-muted-foreground/70"
            >
              <Sparkles className="inline h-3 w-3 text-accent mr-1" />
              Tip: Keep your phone &amp; email accessible for our HR team.
            </motion.div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-foreground">Apply for: {jobTitle}</h3>
                <p className="text-xs text-muted-foreground">Landmark Inter Gulf LLC</p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Personal Information</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" required placeholder="Your full name" className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@email.com" className="h-10" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+966 5X XXX XXXX" className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input id="nationality" name="nationality" required placeholder="e.g. Indian, Filipino, Egyptian" className="h-10" />
                  </div>
                </div>
                <div className="space-y-1.5 mt-3">
                  <Label htmlFor="currentLocation">Current Location *</Label>
                  <Input id="currentLocation" name="currentLocation" required placeholder="e.g. Riyadh, KSA or Mumbai, India" className="h-10" />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Professional Details</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input id="experience" name="experience" required placeholder="e.g. 5 years" className="h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="languages">Languages Spoken *</Label>
                    <Input id="languages" name="languages" required placeholder="e.g. English, Hindi, Arabic" className="h-10" />
                  </div>
                </div>
                <div className="space-y-1.5 mt-3">
                  <Label htmlFor="certifications">Certifications</Label>
                  <Input id="certifications" name="certifications" placeholder="e.g. TUV, Aramco, 6G Welding" className="h-10" />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Visa & Availability</p>
                <div className="space-y-1.5">
                  <Label htmlFor="iqamaStatus">Iqama / Visa Status *</Label>
                  <select id="iqamaStatus" name="iqamaStatus" required className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="">Select your visa status</option>
                    <option value="Transferable Iqama">Transferable Iqama</option>
                    <option value="Non-transferable Iqama">Non-transferable Iqama</option>
                    <option value="Visit Visa">Visit Visa</option>
                    <option value="Exit & Re-entry">Exit & Re-entry</option>
                    <option value="Outside KSA">Outside KSA (need visa)</option>
                    <option value="Saudi National">Saudi National</option>
                  </select>
                </div>
                <div className="space-y-1.5 mt-3">
                  <Label htmlFor="noticePeriod">Notice Period / Availability</Label>
                  <Input id="noticePeriod" name="noticePeriod" placeholder="e.g. Immediate, 30 days" className="h-10" />
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Additional Information</p>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Tell us about your experience</Label>
                  <Textarea id="message" name="message" rows={3} placeholder="Describe your experience, skills, visa details, availability..." />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="consent" name="consent" required className="h-4 w-4 rounded mt-1 shrink-0" />
                <Label htmlFor="consent" className="text-xs text-muted-foreground cursor-pointer">
                  I consent to Landmark Inter Gulf LLC processing my application data and contacting me regarding job opportunities.
                </Label>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-11"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="h-4 w-4 mr-2" /> Submit Application</>
                )}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
