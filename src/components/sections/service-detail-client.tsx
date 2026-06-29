"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { company, serviceNavLinks } from "@/lib/data";
import { getServiceImages } from "@/lib/images";
import { iconMap } from "@/lib/icons";

interface ServiceDetailClientProps {
  service: {
    id: string;
    slug: string;
    icon: string;
    title: string;
    short: string;
    description: string;
    longDescription: string;
    bullets: string[];
    highlights: { title: string; description: string }[];
  };
  children?: React.ReactNode;
}

export function ServiceDetailClient({ service, children }: ServiceDetailClientProps) {
  const images = getServiceImages(service.id);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={service.title}
        description={service.short}
        breadcrumbs={[{ label: "Services", href: "/#services" }, { label: service.title }]}
        image={images[0]}
      />

      {/* Overview + Highlights */}
      <section className="relative py-20 md:py-28 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15 text-accent">
                  {(() => {
                    const Ic = iconMap[service.icon] ?? iconMap.Users;
                    return <Ic className="h-5 w-5" />;
                  })()}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Service Overview
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance">
                {service.title} — built on certified expertise
              </h2>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
                {service.longDescription}
              </p>

              {/* Bullets */}
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {service.bullets.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-card p-3 hover:border-accent/40 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image + Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="rounded-xl overflow-hidden shadow-xl ring-2 ring-accent/20">
                { }
                <img
                  src={images[1] || images[0]}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>

              <div className="rounded-xl bg-primary text-primary-foreground p-5 shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                  Why Choose Us
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {service.highlights.map((h) => (
                    <div key={h.title} className="rounded-lg bg-primary-foreground/10 p-3">
                      <div className="text-lg font-extrabold text-accent leading-none">
                        {h.title}
                      </div>
                      <p className="mt-1 text-xs text-primary-foreground/75 leading-snug">
                        {h.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Custom children (for service-specific sections) */}
          {children}
        </div>
      </section>

      {/* Service gallery */}
      <section className="relative py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="In Action"
            title={`${service.title} — in action`}
            description="Real work, real projects, real results across the Kingdom."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.slice(0, 3).map((img, i) => (
              <motion.div
                key={img + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/15 group"
              >
                { }
                <img
                  src={img}
                  alt={`${service.title} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="relative py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Explore More
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Our other services
              </h2>
            </div>
            <Button asChild variant="outline" className="border-primary/30 font-semibold">
              <Link href="/#services">
                All Services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {serviceNavLinks
              .filter((s) => s.label !== service.title)
              .map((s) => {
                const SIcon = iconMap[s.icon] ?? iconMap.Users;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group rounded-xl border-2 border-border/70 bg-card p-4 hover:border-accent/40 hover:shadow-md transition-all"
                  >
                    <SIcon className="h-7 w-7 text-accent" />
                    <p className="mt-2 text-sm font-bold text-foreground">{s.label}</p>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
                Ready to discuss your {service.title.toLowerCase()} needs?
              </h2>
              <p className="mt-3 text-base text-primary-foreground/85 leading-relaxed">
                Our team will scope the right solution for your project — with a single point of
                contact and on-time delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent/40 text-primary-foreground hover:bg-accent/10 hover:text-accent hover:border-accent">
                <a href={company.phoneHref}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
