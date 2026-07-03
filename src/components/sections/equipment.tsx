"use client";

import { motion } from "framer-motion";
import { Clock, Wrench, CalendarDays, Headset } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { equipmentCategories, equipmentHighlights, projectsSupported } from "@/lib/data";
import { getIcon } from "@/lib/icons";

const highlightIcons = [Wrench, Clock, CalendarDays, Headset];

export function Equipment() {
  return (
    <section id="equipment" className="relative py-20 md:py-28 bg-secondary/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Equipment Rental"
          title="Modern, well-maintained equipment for projects of any size"
          description="Our rental fleet covers earthmoving, lifting, access, material handling, power support and heavy transport — with flexible rental plans, 24/7 technical support and safety-compliant machinery."
        />

        {/* Why choose us highlights */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipmentHighlights.map((h, i) => {
            const Icon = highlightIcons[i] ?? Wrench;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                className="rounded-lg border border-border/70 bg-card p-5 hover:shadow-md hover:border-accent/40 transition-all"
              >
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-semibold text-foreground text-base">{h.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {h.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Equipment range grid */}
        <div className="mt-14">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent text-center">
            Our Equipment Range
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipmentCategories.map((cat, i) => {
              const Icon = getIcon(cat.icon);
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                >
                  <Card className="h-full group border-border/70 hover:shadow-lg hover:border-accent/40 transition-all overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-foreground">{cat.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Projects supported */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-14 rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8"
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
            Saudi Arabia Projects We Support
          </h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {projectsSupported.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-foreground">Safety First</p>
              <p className="mt-1 text-muted-foreground">
                All equipment is regularly inspected and maintained to ensure maximum safety and
                performance.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">24/7 Support</p>
              <p className="mt-1 text-muted-foreground">
                Our technical team is available round the clock for assistance and on-site
                support.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Flexible Rental Plans</p>
              <p className="mt-1 text-muted-foreground">
                Daily, weekly, monthly and long-term rental options available to suit every
                project need.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
