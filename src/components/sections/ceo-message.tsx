"use client";

import { motion } from "framer-motion";
import { Quote, ShieldCheck, BadgeCheck, Users, Zap, TrendingUp } from "lucide-react";
import { company } from "@/lib/data";

const values = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description: "Safety is our priority. Zero compromise.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Driven",
    description: "We deliver excellence through quality.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description: "Our clients' success is our success.",
  },
  {
    icon: Zap,
    title: "People Power",
    description: "We empower our people to achieve more.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "We deliver results that matter.",
  },
];

export function CeoMessage() {
  return (
    <section className="relative py-20 md:py-28 bg-secondary/40 overflow-hidden">
      <div
        className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: CEO portrait card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-2xl bg-accent/20 -rotate-2" aria-hidden="true" />
              <div className="relative rounded-2xl bg-primary text-primary-foreground p-7 sm:p-8 shadow-xl">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground text-2xl font-bold mx-auto">
                  {company.ceo
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-5 text-center text-xl font-bold">{company.ceo}</h3>
                <p className="mt-1 text-center text-sm text-accent font-medium">
                  {company.ceoTitle}
                </p>
                <p className="mt-1 text-center text-xs text-primary-foreground/60">
                  {company.name}
                </p>
                <div className="mt-5 pt-5 border-t border-primary-foreground/15">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
                    People. Performance. Partnership.
                  </p>
                  <p className="mt-1 text-center text-sm font-medium text-accent">
                    That&apos;s our promise.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Message + values */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Quote className="h-5 w-5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                CEO Message
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
              Together, we build today for a stronger tomorrow.
            </h2>

            <div className="mt-5 space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              <p>
                At {company.name}, our mission is simple yet powerful — to deliver world-class
                manpower, equipment, and transport solutions that build stronger projects and
                lasting partnerships.
              </p>
              <p>
                We are driven by a commitment to safety, quality, and integrity in everything we
                do. Our people are our greatest strength, and their dedication enables us to
                exceed expectations and create value for our clients and communities.
              </p>
            </div>

            <div className="mt-7 rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm font-semibold text-foreground">Our Commitment</p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                We are committed to safety, professionalism, innovation, and delivering
                excellence in every project we undertake.
              </p>
            </div>

            {/* Core values strip */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    className="rounded-lg border border-border/70 bg-card p-3 text-center hover:border-accent/40 transition-colors"
                  >
                    <Icon className="h-5 w-5 mx-auto text-accent" />
                    <p className="mt-1.5 text-xs font-semibold text-foreground">{v.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground leading-tight">
                      {v.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
