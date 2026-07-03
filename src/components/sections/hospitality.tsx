"use client";

import { motion } from "framer-motion";
import { ConciergeBell, Award, Sparkles, Heart } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { hospitalityServices, hospitalityHighlights } from "@/lib/data";

const highlightIcons = [Award, Sparkles, Heart];

export function Hospitality() {
  return (
    <section id="hospitality" className="relative py-20 md:py-28 bg-secondary/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hospitality Services"
          title="Service beyond expectations"
          description="Providing professional and dedicated hospitality workforce to deliver exceptional guest experiences — for hotels, resorts, catering companies and corporate facilities across the Kingdom."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
          {/* Services list */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {hospitalityServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.06, ease: "easeOut" }}
              >
                <Card className="h-full border-border/70 hover:shadow-md hover:border-accent/40 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                        <ConciergeBell className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-base">{s.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Highlights + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-4 space-y-5"
          >
            <div className="rounded-xl bg-primary text-primary-foreground p-6 sm:p-7 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-4">
                <ConciergeBell className="h-6 w-6" />
              </div>
              <p className="text-lg font-semibold leading-snug text-pretty">
                &ldquo;Professional People. Exceptional Service.&rdquo;
              </p>
              <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">
                Our hospitality teams are trained to deliver memorable guest experiences —
                matching luxury hotel standards at every touchpoint.
              </p>
            </div>

            <div className="space-y-3">
              {hospitalityHighlights.map((h, i) => {
                const Icon = highlightIcons[i] ?? Award;
                return (
                  <div
                    key={h.title}
                    className="rounded-lg border border-border/70 bg-card p-4 flex items-start gap-3"
                  >
                    <Icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{h.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
