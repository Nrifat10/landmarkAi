"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { about, company } from "@/lib/data";

const pillarIcons = [ShieldCheck, BadgeCheck, Users, TrendingUp];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who We Are"
          title="An integrated partner for Saudi Arabia's industrial growth"
          description="Landmark Inter Gulf LLC delivers world-class services with a customer-focused approach — combining skilled professionals, modern equipment and in-depth industry experience."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5"
          >
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty"
              >
                {p}
              </p>
            ))}

            <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
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
          </motion.div>

          {/* Right: pillars */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {about.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow border-border/70">
                    <CardContent className="p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent mb-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-foreground text-base">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
