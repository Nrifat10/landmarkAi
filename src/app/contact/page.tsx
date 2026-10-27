"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Globe,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Download,
  ArrowRight,
  MessageSquare,
  Building2,
  Users,
  Briefcase,
  Sparkles,
  PartyPopper,
  Phone,
  Loader2,
  Star,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/sections/page-hero";
import { OpenNowStatus } from "@/components/sections/open-now-status";
import { company, services } from "@/lib/data";
import { siteImages } from "@/lib/images";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formStartTime] = useState(() => Date.now());

  // No external access key needed — form posts to our own /api/submit endpoint,
  // which writes to Vercel Postgres and is visible in the admin dashboard at
  // support.landmarkgulf.com

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const botcheck = formData.get("botcheck");
    const email = formData.get("email") as string;

    // Client-side bot protection #1: Honeypot — bots fill hidden fields, humans don't
    if (botcheck) {
      setSubmitting(false);
      return;
    }

    // Client-side bot protection #2: Time-based check — humans take >3s to fill a form
    const elapsed = Date.now() - formStartTime;
    if (elapsed < 3000) {
      setSubmitting(false);
      toast({
        title: "Please take a moment",
        description: "Please review the form and try submitting again.",
      });
      return;
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

    try {
      // Submit to our own API — Vercel Postgres-backed dashboard at support.landmarkgulf.com
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          name: formData.get("name"),
          email,
          phone: formData.get("phone") || "Not provided",
          company: formData.get("company") || "Not provided",
          service: formData.get("service") || "Not specified",
          message: formData.get("message"),
          replyto: email,
          botcheck: botcheck ? "true" : "",
          formStartTime,
        }),
      });

      const result = await response.json();

      setSubmitting(false);

      if (response.ok && result.success) {
        setSubmitted(true);
        toast({
          title: "Thank you for reaching out!",
          description: `Our team will respond within one business day.`,
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Submission failed",
          description: result.message || "Please try again later or email us at info@landmarkgulf.com",
          variant: "destructive",
        });
      }
    } catch {
      // Network / server error
      setSubmitting(false);
      toast({
        title: "Network error",
        description: "Please check your internet and try again.",
        variant: "destructive",
      });
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email Us",
      value: company.emailEncoded,
      href: `mailto:${company.emailUser}@${company.emailDomain}`,
      description: "We respond within one business day.",
      encoded: true,
    },
    {
      icon: Globe,
      label: "Website",
      value: company.website,
      href: company.websiteUrl,
      description: "Visit our website for full service details and project portfolios.",
      encoded: false,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Al Jubail, Eastern Province",
      href: company.googleBusiness.url,
      description: "King Faisal W, King Fahd Industrial Port, Al Jubail 35712",
      encoded: false,
    },
  ];

  // Opening hours — synced with Google Business Profile
  // 24-hour times used for accurate open/closed detection; hoursLabel shown to users.
  // JS Date.getDay convention: 0=Sun, 1=Mon, ..., 6=Sat
  const openingHours = [
    { day: "Sunday",    dayIndex: 0, openTime: "07:00", closeTime: "17:00", hoursLabel: "7:00 AM – 5:00 PM" },
    { day: "Monday",    dayIndex: 1, openTime: "07:00", closeTime: "17:00", hoursLabel: "7:00 AM – 5:00 PM" },
    { day: "Tuesday",   dayIndex: 2, openTime: "07:00", closeTime: "17:00", hoursLabel: "7:00 AM – 5:00 PM" },
    { day: "Wednesday", dayIndex: 3, openTime: "07:00", closeTime: "17:00", hoursLabel: "7:00 AM – 5:00 PM" },
    { day: "Thursday",  dayIndex: 4, openTime: "07:00", closeTime: "17:00", hoursLabel: "7:00 AM – 5:00 PM" },
    { day: "Friday",    dayIndex: 5, openTime: null,    closeTime: null,    hoursLabel: "Closed (weekend)" },
    { day: "Saturday",  dayIndex: 6, openTime: "07:00", closeTime: "17:00", hoursLabel: "7:00 AM – 5:00 PM" },
  ];

  // Today's weekday name (for highlighting the right row in the list below)
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Riyadh" });

  const whyChooseUs = [
    { icon: Users, title: "5,000+ Professionals", desc: "Skilled workforce ready for deployment" },
    { icon: Briefcase, title: "16+ Major Projects", desc: "Proven track record across KSA" },
    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance" },
    { icon: Building2, title: "Aramco Approved", desc: "Certified safety officers & WPRs" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Let's Build Success Together"
        title="Contact Landmark Inter Gulf LLC"
        description="We value the trust of our clients and partners and remain dedicated to delivering superior services with passion and integrity. Tell us about your project — our team will respond within one business day."
        breadcrumbs={[{ label: "Contact" }]}
        image={siteImages.engineers[4]}
      />

      {/* Contact method cards — creative 3-column layout */}
      <section className="relative py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.label}
                  href={card.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="group relative rounded-2xl border-2 border-border/70 bg-card p-6 hover:border-accent/40 hover:shadow-xl transition-all overflow-hidden block"
                >
                  {/* Decorative blob */}
                  <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" aria-hidden="true" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent transition-colors mb-4">
                      <Icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      {card.label}
                    </h3>
                    <p className="text-lg font-extrabold text-foreground group-hover:text-accent transition-colors break-words">
                      {card.encoded ? (
                        <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
                      ) : (
                        card.value
                      )}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Info split section */}
      <section className="relative py-16 md:py-20 bg-secondary/40 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Why choose us + image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    Why Choose Us
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground text-balance">
                  Partner with a team that delivers
                </h2>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                  From Aramco-approved safety officers to TUV-certified riggers and modern
                  equipment fleets — we bring the people and resources your project needs.
                </p>
              </div>

              {/* Why choose us grid */}
              <div className="grid grid-cols-2 gap-4">
                {whyChooseUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                      className="rounded-xl border-2 border-border/70 bg-card p-4 hover:border-accent/40 transition-all"
                    >
                      <Icon className="h-6 w-6 text-accent mb-2" />
                      <p className="text-sm font-bold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Service area image */}
              <div className="rounded-2xl overflow-hidden border-2 border-border/70 shadow-lg relative">
                <div className="aspect-[16/10] relative">
                  { }
                  <img
                    src={siteImages.saudi[5]}
                    alt="Saudi Arabia - our service area"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-3 py-1.5 text-xs font-bold mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      Kingdom-wide Operations
                    </div>
                    <p className="text-base font-bold text-primary-foreground">
                      Serving all of {company.country}
                    </p>
                    <p className="text-xs text-primary-foreground/75 mt-0.5">
                      From Jafurah to Marjan, Jubail to Yanbu, Riyadh to Dammam
                    </p>
                  </div>
                </div>
              </div>

              {/* Download profile */}
              <a
                href="/landmark-company-profile.pdf"
                download="Landmark-Inter-Gulf-Company-Profile.pdf"
                className="flex items-center justify-between rounded-xl bg-primary text-primary-foreground p-5 hover:bg-primary/90 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Download Company Profile</p>
                    <p className="text-xs text-primary-foreground/70">PDF · Complete service details</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl border-2 border-border/70 bg-card p-6 sm:p-8 shadow-xl overflow-hidden relative">
                {submitted ? (
                  <div className="relative py-6 text-center">
                    {/* Confetti dots */}
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                      {[...Array(14)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: -20, x: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: [0, 320],
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

                    {/* Animated checkmark */}
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
                        <h3 className="text-xl font-extrabold text-foreground">Enquiry Sent Successfully!</h3>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                        Thank you for reaching out. Our team will review your enquiry and respond within <strong>one business day</strong>.
                      </p>

                      {/* What's next box */}
                      <div className="mt-5 rounded-xl border-2 border-accent/20 bg-accent/5 p-4 text-left max-w-md mx-auto">
                        <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" /> What happens next?
                        </p>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">1</span>
                            <span>Our team reviews your enquiry and the service you selected.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">2</span>
                            <span>A specialist will reach out via email or phone within one business day.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">3</span>
                            <span>We&apos;ll prepare a tailored proposal based on your project needs.</span>
                          </li>
                        </ul>
                      </div>

                      <Button
                        onClick={() => setSubmitted(false)}
                        className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-11"
                      >
                        Send Another Enquiry
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    {/* Honeypot field — bots fill this, humans don't see it */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      <h2 className="text-xl font-extrabold text-foreground">Send us an enquiry</h2>
                    </div>
                    <p className="text-sm text-muted-foreground -mt-2">
                      Fill out the form below and our team will get back to you within one business day.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your full name"
                          autoComplete="name"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+966 5X XXX XXXX"
                          autoComplete="tel"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company / Project</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company or project name"
                          autoComplete="organization"
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">Service of Interest</Label>
                      <select
                        id="service"
                        name="service"
                        defaultValue=""
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Other">Other / General Enquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us about your project — scope, location, timeline, number of personnel or equipment needed, and any specific certifications required..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-11"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Enquiry
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground sm:ml-auto flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-accent" />
                        Protected against spam & bots
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps + Opening Hours + Review CTA */}
      <section className="relative py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Visit Our Office
              </span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground text-balance">
              Find us in Al Jubail, Saudi Arabia
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Located at King Fahd Industrial Port in Al Jubail — the heart of Saudi Arabia&apos;s industrial corridor. We&apos;re open 6 days a week.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: Google Map embed */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl border-2 border-border/70 bg-card p-2 shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=Landmark+Inter+Gulf+Co+L.L.C,+Al+Jubail+35712&output=embed"
                  width="100%"
                  height="420"
                  style={{ border: 0, borderRadius: "0.75rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Landmark Inter Gulf LLC location on Google Maps"
                />
              </div>
              {/* Action buttons below map */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={company.googleBusiness.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-colors px-5 py-3 font-bold text-sm shadow-md"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href={company.googleBusiness.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent/30 bg-background hover:bg-accent/5 text-foreground hover:border-accent/50 transition-all px-5 py-3 font-bold text-sm"
                >
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  Write a Review on Google
                </a>
              </div>
            </motion.div>

            {/* Right: Opening hours + address details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 space-y-5"
            >
              {/* Open/Closed status — client-side, real Saudi time */}
              <OpenNowStatus schedule={openingHours} />

              {/* Opening hours list — grouped for readability */}
              <div className="rounded-2xl border-2 border-border/70 bg-card p-5 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                      Opening Hours
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    KSA Time
                  </span>
                </div>

                {/* Grouped: weekdays vs Friday */}
                <ul className="space-y-2">
                  {/* Group 1: Sun–Thu (same hours) */}
                  <li
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].includes(todayName)
                        ? "bg-accent/10 border border-accent/30"
                        : "border border-transparent hover:bg-secondary/40"
                    }`}
                  >
                    <span className="font-semibold text-foreground text-sm">
                      Sun – Thu
                      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].includes(todayName) && (
                        <span className="ml-2 text-[10px] uppercase font-bold text-accent badge-today">Today</span>
                      )}
                    </span>
                    <span className="text-sm font-medium text-foreground">7:00 AM – 5:00 PM</span>
                  </li>

                  {/* Group 2: Saturday */}
                  <li
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      todayName === "Saturday"
                        ? "bg-accent/10 border border-accent/30"
                        : "border border-transparent hover:bg-secondary/40"
                    }`}
                  >
                    <span className="font-semibold text-foreground text-sm">
                      Saturday
                      {todayName === "Saturday" && (
                        <span className="ml-2 text-[10px] uppercase font-bold text-accent badge-today">Today</span>
                      )}
                    </span>
                    <span className="text-sm font-medium text-foreground">7:00 AM – 5:00 PM</span>
                  </li>

                  {/* Group 3: Friday — closed */}
                  <li
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      todayName === "Friday"
                        ? "bg-red-500/10 border border-red-500/30"
                        : "border border-transparent hover:bg-secondary/40"
                    }`}
                  >
                    <span className="font-semibold text-foreground text-sm">
                      Friday
                      {todayName === "Friday" && (
                        <span className="ml-2 text-[10px] uppercase font-bold text-red-500 badge-today">Today</span>
                      )}
                    </span>
                    <span className="text-sm font-bold text-red-500">Closed</span>
                  </li>
                </ul>

                {/* Quick summary line */}
                <p className="mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-between">
                  <span>
                    <Sparkles className="inline h-3 w-3 text-accent mr-1" />
                    Synced with Google Business Profile
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/70">Asia/Riyadh (UTC+3)</span>
                </p>
              </div>

              {/* Address card */}
              <div className="rounded-2xl border-2 border-border/70 bg-card p-5 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                    Office Address
                  </h3>
                </div>
                <p className="text-sm font-semibold text-foreground leading-relaxed">
                  Landmark Inter Gulf Co. L.L.C
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  King Faisal W, King Fahd Industrial Port<br />
                  Al Jubail 35712<br />
                  Eastern Province, Saudi Arabia
                </p>
                <p className="mt-3 text-xs text-muted-foreground/80 font-mono">
                  Plus Code: 2JCR+VW3 Al Jubail
                </p>
                <a
                  href={company.googleBusiness.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                >
                  View on Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
