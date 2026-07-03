"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Fuel, ShieldCheck, Users, Briefcase, CalendarRange } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { fuelStationStats } from "@/lib/data";

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [isInView, value, duration, motionValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const statsIcons = [Briefcase, Users, ShieldCheck, CalendarRange];

export function PetroServices() {
  return (
    <section
      id="petro"
      className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Petro Services · Fuel Stations"
          title="Powering fuel stations with reliable workforce"
          description="We provide trained, reliable and customer-focused manpower for petrol stations across the Kingdom. Our staff ensure smooth operations, excellent customer service and strict adherence to safety and quality standards."
          light
        />

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {fuelStationStats.map((s, i) => {
            const Icon = statsIcons[i] ?? Fuel;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-5 sm:p-6 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-primary-foreground/75 leading-snug">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Service highlights */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 grid sm:grid-cols-3 gap-5"
        >
          {[
            {
              title: "Trained Workforce",
              desc: "Customer-focused, safety-conscious staff trained for fuel station operations.",
            },
            {
              title: "Strict Safety & Quality",
              desc: "Adherence to safety standards and quality procedures on every shift.",
            },
            {
              title: "Reliable Operations",
              desc: "Smooth station operations backed by 24/7 management and support.",
            },
          ].map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold text-accent">{h.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
