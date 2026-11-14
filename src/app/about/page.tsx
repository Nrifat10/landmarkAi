"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Eye,
  Target,
  Heart,
  ShieldCheck,
  Users,
  GraduationCap,
  Award,
  BadgeCheck,
  Clock,
  TrendingUp,
  Scale,
  Handshake,
  Gavel,
  HeartHandshake,
  Quote,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  about,
  visionMission,
  values,
  coreStrengths,
  businessEthics,
  company,
  aramcoVendor,
} from "@/lib/data";
import { siteImages } from "@/lib/images";

const valueIcons = [ShieldCheck, Award, Heart, Target, Users, GraduationCap];
const strengthIcons = [Users, Award, BadgeCheck, Clock, Heart, TrendingUp];
const ethicsIcons = [Scale, Handshake, Gavel, HeartHandshake, Users, GraduationCap];

const pillarIconList = [ShieldCheck, BadgeCheck, Users, TrendingUp];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Landmark Inter Gulf"
        title="Building Saudi Arabia's industrial future, one project at a time"
        description="Since 2017, we have been a trusted integrated services partner — delivering manpower, equipment, industrial trading, petro services and hospitality across the Kingdom."
        breadcrumbs={[{ label: "About" }]}
        image={siteImages.saudi[4]}
      />

      {/* Who We Are */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                  { }
                  <img
                    src={siteImages.engineers[3]}
                    alt="Construction site manager with safety helmet reviewing drawings"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                    { }
                    <img
                      src={siteImages.workers[4]}
                      alt="Construction crew pouring concrete at building site"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg ring-2 ring-accent/20">
                    { }
                    <img
                      src={siteImages.refinery[5]}
                      alt="Petrochemical plant flare stack"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance">
                An integrated partner for the Kingdom&apos;s industrial growth
              </h2>

              <div className="mt-6 space-y-4">
                {about.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-6 rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
                <div className="flex items-start gap-4">
                  <img
                    src="/saudi-vision-2030.svg"
                    alt="Saudi Vision 2030"
                    className="h-14 w-auto object-contain shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-bold text-foreground">
                      Committed to Vision 2030
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      We support the Kingdom&apos;s growth and contribute to the realization of
                      Vision 2030 by delivering sustainable value, building local capability and
                      enabling the industrial transformation of {company.region}.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {about.pillars.map((p, i) => {
                  const Icon = pillarIconList[i] ?? ShieldCheck;
                  return (
                    <div
                      key={p.title}
                      className="rounded-lg border border-border/70 bg-card p-4 hover:border-accent/40 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-accent" />
                        <h3 className="font-bold text-foreground text-sm">{p.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-20 md:py-28 bg-secondary/40 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Vision · Mission"
            title="Driven by a strong purpose and core values"
            description="We are committed to delivering excellence and creating sustainable impact for our clients, our people and the communities we serve."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="h-full bg-primary text-primary-foreground border-0 shadow-xl">
                <CardContent className="p-7 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-5">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extrabold uppercase tracking-wide text-accent">
                    {visionMission.vision.title}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg leading-relaxed text-primary-foreground/85 text-pretty">
                    {visionMission.vision.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            >
              <Card className="h-full bg-card border-2 border-accent/30 shadow-xl">
                <CardContent className="p-7 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-5">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extrabold uppercase tracking-wide text-accent">
                    {visionMission.mission.title}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg leading-relaxed text-foreground/80 text-pretty">
                    {visionMission.mission.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 md:py-28 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Core Values"
            title="The principles that guide every decision"
            description="Six values shape our culture, our hiring, and the way we deliver work on every project."
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = valueIcons[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08, ease: "easeOut" }}
                >
                  <Card className="h-full border-border/70 hover:shadow-lg hover:border-accent/40 transition-all group">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-foreground text-lg">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="relative py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Core Strengths"
            title="Why clients choose Landmark Inter Gulf"
            description="Six capabilities that translate into reliable delivery on every project."
          />

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreStrengths.map((s, i) => {
              const Icon = strengthIcons[i] ?? Award;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: "easeOut" }}
                  className="rounded-xl border-2 border-border/70 bg-card p-5 text-center hover:border-accent/40 hover:shadow-md transition-all"
                >
                  <Icon className="h-7 w-7 mx-auto text-accent" />
                  <h3 className="mt-3 text-sm font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">
                    {s.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Ethics */}
      <section className="relative py-20 md:py-28 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Business Ethics"
            title="Prosperity through engineering, technology and management"
            description="We bring prosperity and well-being to our stakeholders and society at large by adding value — and by conducting our business with honesty, fairness and respect."
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessEthics.map((item, i) => {
              const Icon = ethicsIcons[i] ?? Scale;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                  className="group relative rounded-xl border-2 border-border/70 bg-card p-6 hover:shadow-lg hover:border-accent/40 transition-all overflow-hidden"
                >
                  <div
                    className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Registration & Aramco Vendor Status */}
      <section className="relative py-20 md:py-28 bg-secondary/40 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Registration & Legal"
            title="A fully registered, fully compliant Saudi company"
            description="Landmark Inter Gulf holds active registrations with all relevant Saudi authorities — and is a registered vendor in the Saudi Aramco Supplier Management System."
          />

          {/* Aramco vendor highlight */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-12 relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-primary text-primary-foreground p-8 sm:p-10 max-w-4xl mx-auto"
          >
            <div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/20 border border-accent/40 text-accent">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Saudi Aramco Supplier Management System
                </p>
                <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold tracking-tight">
                  Registered Vendor · No. 10121905
                </h3>
                <p className="mt-1.5 text-sm text-primary-foreground/80">
                  Supplier type: {aramcoVendor.supplierType} · Registration
                  approved {aramcoVendor.registrationApproved}
                </p>
              </div>
              <Link
                href="/aramco-vendor"
                className="inline-flex items-center gap-2 rounded-md border border-accent/40 px-5 py-2.5 text-sm font-bold text-accent hover:bg-accent/10 transition-colors shrink-0"
              >
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Registration facts grid */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                label: "Legal Name",
                value: aramcoVendor.legal.legalName,
                sub: aramcoVendor.legal.legalForm,
              },
              {
                label: "Commercial Registration",
                value: aramcoVendor.legal.commercialRegistration,
                sub: `Issued ${aramcoVendor.legal.crIssued} · ${aramcoVendor.legal.crStatus}`,
              },
              {
                label: "Unified National Number",
                value: aramcoVendor.legal.unifiedNationalNumber,
                sub: "Kingdom of Saudi Arabia",
              },
              {
                label: "VAT Registration Number",
                value: aramcoVendor.legal.vatNumber,
                sub: "Active",
              },
              {
                label: "MISA Investment Registration",
                value: aramcoVendor.legal.misaRegistration,
                sub: `${aramcoVendor.legal.misaStatus} · Capital ${aramcoVendor.legal.capital}`,
              },
              {
                label: "Social Insurance (GOSI)",
                value: aramcoVendor.legal.gosi,
                sub: `Chamber of Commerce — ${aramcoVendor.legal.chamberOfCommerce}`,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                className="rounded-xl border border-border/70 bg-card p-5"
              >
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </p>
                </div>
                <p className="mt-2 text-base font-extrabold text-foreground tracking-tight break-words">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-sm">
                <div
                  className="absolute -inset-3 rounded-2xl bg-accent/30 -rotate-2"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl bg-primary-foreground/10 backdrop-blur-md border-2 border-accent/30 p-7 sm:p-8 shadow-xl">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-accent-foreground text-3xl font-extrabold mx-auto">
                    {company.ceo
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-5 text-center text-2xl font-extrabold">{company.ceo}</h3>
                  <p className="mt-1 text-center text-sm text-accent font-bold">
                    {company.ceoTitle}
                  </p>
                  <p className="mt-1 text-center text-xs text-primary-foreground/60">
                    {company.name}
                  </p>
                  <div className="mt-5 pt-5 border-t border-primary-foreground/15">
                    <Quote className="h-5 w-5 text-accent mx-auto mb-2" />
                    <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
                      People. Performance. Partnership.
                    </p>
                    <p className="mt-1 text-center text-base font-bold text-accent">
                      That&apos;s our promise.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <Quote className="h-5 w-5 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  CEO Message
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">
                Together, we build today for a stronger tomorrow.
              </h2>

              <div className="mt-5 space-y-4 text-base sm:text-lg text-primary-foreground/85 leading-relaxed text-pretty">
                <p>
                  At {company.name}, our mission is simple yet powerful — to deliver
                  world-class manpower, equipment, and transport solutions that build stronger
                  projects and lasting partnerships.
                </p>
                <p>
                  We are driven by a commitment to safety, quality, and integrity in everything
                  we do. Our people are our greatest strength, and their dedication enables us
                  to exceed expectations and create value for our clients and communities.
                </p>
              </div>

              <div className="mt-6 rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
                <p className="text-sm font-bold text-accent">Our Commitment</p>
                <p className="mt-1 text-sm text-primary-foreground/85 leading-relaxed">
                  We are committed to safety, professionalism, innovation, and delivering
                  excellence in every project we undertake.
                </p>
              </div>

              <div className="mt-7">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                  <Link href="/contact">
                    Let&apos;s Build Together
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
