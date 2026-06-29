"use client";

import { motion } from "framer-motion";
import {
  Car,
  CheckCircle2,
  Truck,
  Headset,
  CalendarClock,
  Clock,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import {
  vehicleFleet,
  transportSolutions,
  transportHighlights,
  transportTankers,
} from "@/lib/data";

const highlightIcons = [Car, Headset, CalendarClock, Clock];

export function Transport() {
  return (
    <section id="transport" className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Car Rental & Transport"
          title="Reliable vehicles and transport solutions across Saudi Arabia"
          description="From economy sedans and SUVs to 50-seater buses, pickups, water tankers and diesel tankers — we provide safe, efficient and timely transport services for your personnel, logistics and operational needs."
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Vehicle Fleet */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Our Vehicle Fleet
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {vehicleFleet.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.06, ease: "easeOut" }}
                >
                  <Card className="h-full border-border/70 hover:shadow-md hover:border-accent/40 transition-all">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground text-base">{v.title}</h4>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Transport solutions */}
            <div className="mt-4 rounded-xl border border-border/70 bg-secondary/50 p-5 sm:p-6">
              <h4 className="text-sm font-semibold text-foreground">Transport Solutions</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Safe, efficient, and timely transport services for personnel and logistics:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {transportSolutions.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-foreground/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-accent" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Highlights + Tankers */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Why Choose Us
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {transportHighlights.map((h, i) => {
                const Icon = highlightIcons[i] ?? Car;
                return (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    className="rounded-lg border border-border/70 bg-card p-4 hover:border-accent/40 hover:shadow-sm transition-all"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <h4 className="mt-2 text-sm font-semibold text-foreground">{h.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-snug">
                      {h.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Tankers & special vehicles */}
            <div className="rounded-xl bg-primary text-primary-foreground p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-5 w-5 text-accent" />
                <h4 className="text-sm font-bold uppercase tracking-widest text-accent">
                  Transport & Tankers
                </h4>
              </div>
              <ul className="space-y-2">
                {transportTankers.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-primary-foreground/85">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
