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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageHero } from "@/components/sections/page-hero";
import { company, services } from "@/lib/data";
import { siteImages } from "@/lib/images";

export default function ContactPage() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    await new Promise((res) => setTimeout(res, 900));

    setSubmitting(false);
    setSubmitted(true);
    toast({
      title: "Thank you for reaching out!",
      description: `Our team will respond to ${payload.email || "your email"} within one business day.`,
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 5000);
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
      value: company.country,
      href: "#",
      description: "Serving clients across Saudi Arabia and the Gulf region.",
      encoded: false,
    },
  ];

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
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border-2 border-border/70 bg-card p-6 sm:p-8 shadow-xl space-y-5"
              >
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
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Project</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your company or project name"
                      autoComplete="organization"
                    />
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
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Enquiry
                      </>
                    )}
                  </Button>
                  {submitted && (
                    <span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Message sent — we&apos;ll be in touch shortly.
                    </span>
                  )}
                  <p className="text-xs text-muted-foreground sm:ml-auto">
                    By submitting, you agree to be contacted about your enquiry.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
