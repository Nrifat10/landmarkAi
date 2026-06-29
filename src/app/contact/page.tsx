"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Globe,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Download,
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

  const contactItems = [
    { icon: Globe, label: "Website", value: company.website, href: company.websiteUrl },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: "Location", value: company.country, href: "#" },
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

      <section className="relative py-20 md:py-28 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="rounded-xl bg-primary text-primary-foreground p-6 sm:p-7 shadow-lg">
                <h2 className="text-lg font-bold text-accent">Get in touch</h2>
                <p className="mt-1.5 text-sm text-primary-foreground/75 leading-relaxed">
                  Reach out for manpower, equipment rental, industrial trading, petro services or
                  hospitality staffing — we respond to every enquiry personally.
                </p>

                <div className="mt-6 space-y-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 group"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-primary-foreground/60">
                            {item.label}
                          </p>
                          <p className="text-sm font-bold text-primary-foreground">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-primary-foreground/15">
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Saturday – Thursday · 8:00 AM – 6:00 PM</span>
                  </div>
                  <a
                    href="/landmark-company-profile.pdf"
                    download="Landmark-Inter-Gulf-Company-Profile.pdf"
                    className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2 text-sm font-bold transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Company Profile
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border-2 border-border/70 shadow-md">
                <div className="aspect-[16/10] relative bg-secondary">
                  { }
                  <img
                    src={siteImages.saudi[5]}
                    alt="Saudi Arabia - our service area"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-3 py-1.5 text-xs font-bold">
                      <MapPin className="h-3.5 w-3.5" />
                      Serving all of {company.country}
                    </div>
                    <p className="mt-2 text-sm font-bold text-primary-foreground">
                      Kingdom-wide operations
                    </p>
                    <p className="text-xs text-primary-foreground/75">
                      From Jafurah to Marjan, Jubail to Yanbu, Riyadh to Dammam
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={onSubmit}
                className="rounded-xl border-2 border-border/70 bg-card p-6 sm:p-8 shadow-md space-y-5"
              >
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">Send us an enquiry</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill out the form below and our team will get back to you within one business day.
                  </p>
                </div>

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
