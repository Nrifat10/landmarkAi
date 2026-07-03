"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { visionMission, values, coreStrengths } from "@/lib/data";

const valueIcons = [
  ShieldCheck, // Integrity
  Award, // Commitment
  Heart, // Safety
  Target, // Excellence
  Users, // Teamwork
  GraduationCap, // Learning
];

const strengthIcons = [
  Users, // Experienced Professionals
  Award, // Modern Equipment
  BadgeCheck, // Quality Fleet
  Clock, // Timely Assurance
  Heart, // Customer Delivery
  TrendingUp, // Sustainable Focused
];

export function VisionMissionValues() {
  return (
    <section
      id="vision"
      className="relative py-20 md:py-28 bg-background overflow-hidden"
    >
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Vision · Mission · Values"
          title="Driven by a strong purpose and core values"
          description="We are committed to delivering excellence and creating sustainable impact for our clients, our people and the communities we serve."
        />

        {/* Vision + Mission two big cards */}
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="h-full bg-primary text-primary-foreground border-0 shadow-lg">
              <CardContent className="p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-5">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-accent">
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
            <Card className="h-full bg-secondary border-border/70 shadow-lg">
              <CardContent className="p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-5">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-accent">
                  {visionMission.mission.title}
                </h3>
                <p className="mt-3 text-base sm:text-lg leading-relaxed text-foreground/80 text-pretty">
                  {visionMission.mission.body}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values grid */}
        <div className="mt-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Our Core Values
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <Card className="h-full hover:shadow-md transition-shadow border-border/70 group">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-base">
                            {v.title}
                          </h4>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                            {v.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Strengths */}
        <div className="mt-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Our Core Strengths
          </h3>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {coreStrengths.map((s, i) => {
              const Icon = strengthIcons[i] ?? Award;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: "easeOut" }}
                  className="rounded-lg border border-border/70 bg-card p-4 text-center hover:border-accent/40 hover:shadow-sm transition-all"
                >
                  <Icon className="h-5 w-5 mx-auto text-accent" />
                  <h4 className="mt-2 text-sm font-semibold text-foreground">{s.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">
                    {s.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
