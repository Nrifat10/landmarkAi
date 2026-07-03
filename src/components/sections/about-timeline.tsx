"use client";

import { motion } from "framer-motion";
import { Rocket, TrendingUp, Award, Globe, Target } from "lucide-react";
import { SectionHeading } from "./section-heading";

const milestones = [
  {
    year: "2017",
    title: "Company Founded",
    description: "Landmark Inter Gulf LLC was established in Saudi Arabia with a commitment to quality, safety and reliability. Started with our first major project at Yanbu for Hyundai Livart.",
    icon: Rocket,
    highlight: "The Beginning",
  },
  {
    year: "2018",
    title: "Marjan Expansion",
    description: "Expanded into the Marjan oil field development, partnering with Hyundai E&C. Began deploying pipe fabricators, fitters, civil trades and electricians to major oil & gas projects.",
    icon: TrendingUp,
    highlight: "Oil & Gas Growth",
  },
  {
    year: "2019-2020",
    title: "Workforce Scaling",
    description: "Scaled our workforce deployment significantly — over 480 personnel on the Marjan project alone. Expanded our Aramco-approved safety officer and WPR capabilities.",
    icon: Users,
    highlight: "Rapid Growth",
  },
  {
    year: "2021-2022",
    title: "Major EPC Partnerships",
    description: "Secured partnerships with SEPCO Arabia, Gusan Arabia, Sinohydro and SINOPEC Engineering. Deployed 880+ personnel to SEPCO's Marjan scope — our largest single mobilization.",
    icon: Award,
    highlight: "Industry Recognition",
  },
  {
    year: "2022-2024",
    title: "Jafurah & Beyond",
    description: "Entered the Jafurah gas development with SINOPEC, Midong E&C and L&T Arabia. Expanded into Amiral and Jubail projects. Deployed 220+ electricians to a single Midong scope.",
    icon: Globe,
    highlight: "Kingdom-wide Reach",
  },
  {
    year: "Today",
    title: "Vision 2030 Partner",
    description: "With 5,000+ professionals deployed, 16+ major projects, and 35+ active clients, we continue to support the Kingdom's industrial transformation and Vision 2030 — building today for a stronger tomorrow.",
    icon: Target,
    highlight: "Building the Future",
  },
];

import { Users } from "lucide-react";

export function AboutTimeline() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Journey"
          title="From 2017 to today — a story of growth"
          description="Key milestones in our journey to becoming a leading integrated services provider across Saudi Arabia."
        />

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Vertical line — centered on desktop, left on mobile */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isLeft = i % 2 === 0; // Alternate sides on desktop

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg ring-4 ring-background">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="group rounded-2xl border-2 border-border/70 bg-card p-6 hover:border-accent/40 hover:shadow-xl transition-all overflow-hidden relative">
                      {/* Decorative blob */}
                      <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" aria-hidden="true" />

                      <div className="relative">
                        {/* Year badge */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center rounded-full bg-accent/15 text-accent px-3 py-1 text-sm font-extrabold">
                            {m.year}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            {m.highlight}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-foreground group-hover:text-accent transition-colors">
                          {m.title}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
