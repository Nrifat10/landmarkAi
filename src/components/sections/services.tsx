"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { services } from "@/lib/data";
import { getIcon } from "@/lib/icons";

export function Services() {
  return (
    <section
      id="services"
      className="relative py-20 md:py-28 bg-secondary/40"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-end solutions tailored to your industry"
          description="We provide integrated services across five core business lines — supporting oil & gas, construction, infrastructure, industrial, mining and utilities projects throughout Saudi Arabia."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const isFeatured = i === 0; // Manpower as featured (larger card)
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                className={isFeatured ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-border/70 hover:border-accent/40 flex flex-col">
                  <CardContent className="p-6 sm:p-7 flex flex-col h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="mt-5 space-y-2 flex-1">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/link"
                    >
                      Request this service
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* CTA card filling last grid cell on lg */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="h-full rounded-xl border border-accent/30 bg-primary text-primary-foreground p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Not sure which service you need?
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">
                  Our team will help you scope the right manpower, equipment and support for
                  your project — with a single point of contact across all five service lines.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
