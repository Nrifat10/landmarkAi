"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  HardHat,
  Truck,
  Fuel,
  ConciergeBell,
  Factory,
  Users,
  CheckCircle2,
  Star,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { heroStats, company, services, projects } from "@/lib/data";
import { iconMap } from "@/lib/icons";
import { siteImages, heroImage, getServiceImages } from "@/lib/images";

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [isInView, value, duration, motionValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function HomeHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-primary text-primary-foreground pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        { }
        <img
          src={heroImage}
          alt="Construction site at golden hour with cranes and industrial equipment"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-primary/95" />
      </div>

      <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs sm:text-sm font-bold text-accent"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Saudi Arabia · Est. 2017</span>
              <span className="hidden sm:inline mx-1 opacity-50">·</span>
              <span className="hidden sm:inline">Vision 2030 Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="mt-5 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-balance text-shadow-strong"
            >
              Reliable Workforce.
              <br />
              <span className="text-accent">Stronger Businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
              className="mt-5 max-w-xl text-base sm:text-lg text-primary-foreground/85 leading-relaxed text-pretty"
            >
              {company.name} is a Saudi-based integrated services company providing
              Manpower Supply, Equipment Rental, Industrial Trading, Petro Services and
              Hospitality Services — delivering world-class quality, safety and reliability
              to projects across the Kingdom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg"
              >
                <Link href="/#services">
                  Explore Our Services
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-accent/40 bg-transparent text-primary-foreground hover:bg-accent/10 hover:text-accent hover:border-accent"
              >
                <Link href="/contact">
                  Talk to an Expert
                </Link>
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-primary-foreground/70"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Aramco Approved
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                TUV Certified Workforce
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                5,000+ Professionals Deployed
              </span>
            </motion.div>
          </div>

          {/* Right: stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border-2 border-accent/30 bg-primary-foreground/10 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-accent">
                By the Numbers
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/75">
                A track record built on people, equipment and trust.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                {heroStats.map((s) => (
                  <div key={s.label} className="space-y-1.5">
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-foreground">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-primary-foreground/85 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-primary-foreground/15">
                <Quote className="h-5 w-5 text-accent mb-1" />
                <p className="text-xs text-primary-foreground/70 italic leading-relaxed">
                  &ldquo;People. Performance. Partnership. That&apos;s our promise.&rdquo;
                </p>
                <p className="mt-2 text-xs font-bold text-accent">
                  — {company.ceo}, {company.ceoTitle}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom hazard stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-hazard-thin" aria-hidden="true" />
    </section>
  );
}

export function HomeAbout() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                  { }
                  <img
                    src={siteImages.workers[3]}
                    alt="Construction workers building steel structure at height"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                  { }
                  <img
                    src={siteImages.welding[4]}
                    alt="Industrial welder working on pipeline construction"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                  { }
                  <img
                    src={siteImages.equipment[5]}
                    alt="Tower crane lifting steel beams at construction"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                  { }
                  <img
                    src={siteImages.refinery[4]}
                    alt="Oil refinery plant at night with lights"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 rounded-xl bg-accent text-accent-foreground shadow-xl px-5 py-3 flex items-center gap-3">
              <HardHat className="h-8 w-8" />
              <div>
                <div className="text-2xl font-extrabold leading-none">10+</div>
                <div className="text-xs font-semibold">Years of Combined Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Who We Are
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance">
              An integrated partner for Saudi Arabia&apos;s industrial growth
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              Landmark Inter Gulf LLC delivers world-class services with a customer-focused
              approach — combining skilled professionals, modern equipment and in-depth
              industry experience. Established with a commitment to quality, safety and
              reliability, we deliver every project on time, within budget and beyond
              expectations.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { title: "Safety First", desc: "Zero compromise on safety of our people and communities." },
                { title: "Quality Assured", desc: "Strict quality control and international standards." },
                { title: "Customer Focused", desc: "Client satisfaction is our top priority." },
                { title: "Sustainable Growth", desc: "Long-term partnerships and stakeholder value." },
              ].map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">{p.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <Link href="/about">
                  More About Us
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function HomeServices() {
  return (
    <section id="services" className="relative py-20 md:py-28 bg-secondary/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Our Services
            </span>
            <span className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance">
            End-to-end solutions tailored to your industry
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Six integrated service lines supporting oil &amp; gas, construction, infrastructure,
            industrial, mining and utilities projects throughout Saudi Arabia.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? iconMap.Users;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/70 hover:border-accent/40 flex flex-col">
                    {/* Service image banner */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-primary">
                      { }
                      <img
                        src={(getServiceImages(service.id) || [])[0] || siteImages.workers[0]}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                        {service.short}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent group-hover:gap-2.5 transition-all">
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeStats() {
  const stats = [
    { value: 16, suffix: "+", label: "Major Projects Delivered", icon: Factory },
    { value: 4500, suffix: "+", label: "Manpower Deployed", icon: Users },
    { value: 35, suffix: "+", label: "Active Clients", icon: Star },
    { value: 10, suffix: "+", label: "Years of Experience", icon: ShieldCheck },
  ];

  return (
    <section className="relative py-20 md:py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Our Track Record
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
            Numbers that build trust
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-6 text-center"
              >
                <Icon className="h-8 w-8 mx-auto text-accent" />
                <div className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold text-primary-foreground/80 leading-snug">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeFeaturedProjects() {
  const featured = projects.slice(0, 3);
  const projectImages = [siteImages.refinery[5], siteImages.equipment[6], siteImages.workers[4]];

  return (
    <section className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Project Experience
            </span>
            <span className="h-px w-8 bg-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance">
            Trusted by leading contractors across the Kingdom
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Since 2017, we have deployed thousands of skilled professionals to flagship
            oil &amp; gas, infrastructure and industrial projects.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {featured.map((p, i) => {
            const total = p.roles.reduce((sum, r) => sum + r.qty, 0);
            return (
              <motion.div
                key={`${p.client}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <Card className="h-full overflow-hidden border-border/70 hover:shadow-xl hover:border-accent/40 transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary">
                    { }
                    <img
                      src={projectImages[i % projectImages.length]}
                      alt={p.client}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-0.5 text-xs font-bold">
                        {p.type}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-extrabold text-primary-foreground leading-tight">
                        {p.client}
                      </h3>
                      <p className="text-xs text-primary-foreground/70 mt-0.5">
                        {p.project} · {p.duration}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-extrabold text-accent leading-none">
                          {total}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                          Personnel Deployed
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-foreground">{p.roles.length}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                          Role Types
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="border-primary/30 font-bold">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomeCTA() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        { }
        <img
          src={siteImages.saudi[3] || siteImages.hero[3]}
          alt="Saudi Arabia construction development"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-primary-foreground"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Let&apos;s Build Success Together
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance text-shadow-medium">
              Ready to start your next project?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 leading-relaxed text-pretty">
              Our team is ready to scope the right manpower, equipment and support for your
              project — with a single point of contact across all six service lines. Tell us
              what you need, and we&apos;ll respond within one business day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg">
                <Link href="/contact">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { icon: HardHat, title: "5,000+", desc: "Skilled manpower deployed" },
              { icon: Truck, title: "100+", desc: "Modern equipment fleet" },
              { icon: Fuel, title: "16+", desc: "Active petro projects" },
              { icon: ConciergeBell, title: "35+", desc: "Active clients" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border-2 border-accent/30 bg-primary-foreground/10 backdrop-blur-md p-5"
                >
                  <Icon className="h-8 w-8 text-accent" />
                  <div className="mt-2 text-3xl font-extrabold text-primary-foreground">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-primary-foreground/75">{item.desc}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
