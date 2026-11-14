"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  FileCheck,
  Landmark,
  FileText,
  Building2,
  Download,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Award,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { aramcoVendor, company } from "@/lib/data";
import { siteImages } from "@/lib/images";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

export default function AramcoVendorPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Saudi Aramco Supplier Management System"
        title="Registered Vendor."
        description={`Landmark Inter Gulf LLC is officially registered in the Saudi Aramco Supplier Management System as a Service Provider — a pre-qualified partner for projects across the Kingdom.`}
        breadcrumbs={[{ label: "Aramco Vendor" }]}
        image={siteImages.refinery[0]}
      />

      {/* ─── Vendor credential spotlight ──────────────────────── */}
      <section className="relative py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <div className="relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl">
              {/* decorative glow */}
              <div
                className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-grid-dark opacity-20" aria-hidden="true" />

              <div className="relative grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs font-bold text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Registration</span>
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance">
                    Saudi Aramco Registered Vendor
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-primary-foreground/80 leading-relaxed max-w-xl">
                    Our registration in the {aramcoVendor.system} confirms that
                    Landmark Inter Gulf has passed Aramco&apos;s supplier
                    qualification, documentation and compliance review — ready to
                    support Aramco and its contractors.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    <div className="rounded-xl border border-accent/30 bg-primary-foreground/5 backdrop-blur-sm px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                        Vendor No.
                      </p>
                      <p className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-foreground">
                        {aramcoVendor.vendorNumber}
                      </p>
                    </div>
                    <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                        Supplier Type
                      </p>
                      <p className="mt-1 text-base font-bold text-primary-foreground">
                        {aramcoVendor.supplierType}
                      </p>
                    </div>
                    <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                        Registration Approved
                      </p>
                      <p className="mt-1 text-base font-bold text-primary-foreground">
                        {aramcoVendor.registrationApproved}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── What it means for clients ────────────────────────── */}
      <section className="relative py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why It Matters"
            title="What Aramco vendor registration means for you"
            description="Registration in Aramco's Supplier Management System is a mark of pre-qualification — it streamlines procurement and gives clients confidence in our compliance."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ClipboardCheck,
                title: "Pre-Qualified Supplier",
                text: "We have completed Aramco's supplier onboarding — legal, financial and technical documentation verified — so contracting with us is faster and simpler.",
              },
              {
                icon: Fingerprint,
                title: "Verified Identity & Compliance",
                text: "Commercial registration, VAT, GOSI, MISA and Chamber of Commerce records are validated and active — full transparency for vendor audits.",
              },
              {
                icon: Award,
                title: "Aramco-Grade Standards",
                text: "Our workforce already includes Aramco-approved safety officers, work permit receivers and certified operators deployed on Marjan, Jafurah and Jubail projects.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              >
                <Card className="h-full border-border/60 hover:border-accent/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {f.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Company registration & legal info ────────────────── */}
      <section className="relative py-16 md:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compliance Record"
            title="Company registration & legal information"
            description="Complete, up-to-date registration records held with Saudi authorities — available for vendor onboarding and audit packages."
          />
          <div className="mt-12 grid lg:grid-cols-12 gap-8">
            {/* Left: registration cards */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Building2,
                    label: "Legal Name",
                    value: aramcoVendor.legal.legalName,
                    sub: aramcoVendor.legal.legalForm,
                  },
                  {
                    icon: FileCheck,
                    label: "Commercial Registration",
                    value: aramcoVendor.legal.commercialRegistration,
                    sub: `Issued ${aramcoVendor.legal.crIssued} · ${aramcoVendor.legal.crStatus}`,
                  },
                  {
                    icon: FileText,
                    label: "VAT Registration",
                    value: aramcoVendor.legal.vatNumber,
                    sub: "Active — Kingdom of Saudi Arabia",
                  },
                  {
                    icon: Landmark,
                    label: "MISA Investment Registration",
                    value: aramcoVendor.legal.misaRegistration,
                    sub: aramcoVendor.legal.misaStatus,
                  },
                  {
                    icon: ShieldCheck,
                    label: "Unified National Number",
                    value: aramcoVendor.legal.unifiedNationalNumber,
                    sub: "National Unified Number (Saudi Arabia)",
                  },
                  {
                    icon: BadgeCheck,
                    label: "Capital",
                    value: aramcoVendor.legal.capital,
                    sub: "Paid-up share capital",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                    className="rounded-xl border border-border/70 bg-card p-5 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="h-4 w-4 text-accent" />
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                    <p className="mt-2.5 text-lg font-extrabold text-foreground tracking-tight break-words">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* GOSI + Chamber strip */}
              <motion.div
                {...fadeUp}
                className="mt-5 grid grid-cols-2 gap-5"
              >
                <div className="rounded-xl border border-accent/25 bg-accent/5 p-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                      Social Insurance (GOSI)
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {aramcoVendor.legal.gosi}
                  </p>
                </div>
                <div className="rounded-xl border border-accent/25 bg-accent/5 p-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                      Chamber of Commerce
                    </p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {aramcoVendor.legal.chamberOfCommerce}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: head office + summary card */}
            <div className="lg:col-span-5">
              <motion.div
                {...fadeUp}
                className="rounded-2xl bg-primary text-primary-foreground p-7 sm:p-8 shadow-xl relative overflow-hidden"
              >
                <div
                  className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">
                    Head Office
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
                    {aramcoVendor.legal.headOffice}
                  </p>
                  <div className="mt-5 pt-5 border-t border-primary-foreground/15 space-y-2 text-sm">
                    <p className="text-primary-foreground/80">
                      Telephone:{" "}
                      <span className="font-semibold text-primary-foreground">
                        +966 13 358 6853
                      </span>
                    </p>
                    <p className="text-primary-foreground/80">
                      Mobile:{" "}
                      <span className="font-semibold text-primary-foreground">
                        +966 55 528 5235
                      </span>
                    </p>
                    <p className="text-primary-foreground/80">
                      Email:{" "}
                      <span className="font-semibold text-primary-foreground">
                        info@landmarkgulf.com
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Documents available on request ───────────────────── */}
      <section className="relative py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Documentation"
            title="Documents available on request"
            description="Full compliance and policy documentation is maintained and can be provided for vendor onboarding, audits and tender packages."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {aramcoVendor.documentsOnRequest.map((doc, i) => (
              <motion.div
                key={doc}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-card px-4 py-3.5"
              >
                <FileText className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm font-medium text-foreground">{doc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs font-bold text-accent">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Vendor No. {aramcoVendor.vendorNumber}</span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
                Let&apos;s build success together.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
                Download our company profile for the complete registration record,
                workforce categories and project experience — or contact our team
                to start vendor onboarding today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-lg"
                >
                  <Link href="/contact">
                    Contact Our Team
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <a
                  href="/landmark-company-profile.pdf"
                  download="Landmark-Inter-Gulf-Company-Profile.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-transparent px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-accent/10 hover:text-accent hover:border-accent transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Company Profile
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
