"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { HardHat, CheckCircle2, ClipboardCheck, Wrench, Clock, CalendarDays, Headset, Car, Fuel, Zap, Award, Sparkles, Heart, Briefcase, Users, ShieldCheck, CalendarRange } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  manpowerCategories,
  equipmentCategories,
  equipmentHighlights,
  projectsSupported,
  vehicleFleet,
  transportSolutions,
  transportHighlights,
  transportTankers,
  hospitalityServices,
  hospitalityHighlights,
  fuelStationStats,
} from "@/lib/data";
import { iconMap } from "@/lib/icons";

const equipmentHighlightIcons = [Wrench, Clock, CalendarDays, Headset];
const transportHighlightIcons = [Car, Headset, CalendarDays, Clock];
const hospitalityHighlightIcons = [Award, Sparkles, Heart];

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
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

/* ============= MANPOWER ============= */
export function ManpowerExtra() {
  return (
    <>
      {/* Workforce categories */}
      <div className="mt-16 pt-12 border-t border-border">
        <SectionHeading
          eyebrow="Workforce Categories"
          title="A certified workforce for every industrial trade"
          description="From Aramco-approved safety officers to TUV-certified riggers and 6G welders, our manpower pool covers the full spectrum of industrial trades."
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {manpowerCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: "easeOut" }}
            >
              <Card className="h-full flex flex-col border-border/70 hover:shadow-md transition-shadow">
                <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <HardHat className="h-5 w-5 text-accent" />
                    <h3 className="text-sm font-bold uppercase tracking-wide text-foreground leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {cat.items.map((item, idx) => (
                      <li
                        key={`${item}-${idx}`}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent/70 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pre-deployment banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 rounded-xl bg-primary text-primary-foreground p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold">
              Reliable workforce starts with reliable pre-deployment checks
            </h3>
            <p className="mt-1.5 text-sm text-primary-foreground/75 leading-relaxed">
              Behaviour interviews, reference checking, legal status verification, training and
              certification, skills assessment and medical fitness — every candidate is screened
              before they reach your site. Reliable workforce. Stronger businesses.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ============= EQUIPMENT ============= */
export function EquipmentExtra() {
  return (
    <>
      <div className="mt-16 pt-12 border-t border-border">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Equipment you can rely on"
          description="Our equipment division delivers modern, well-maintained machinery backed by 24/7 technical support and flexible rental plans."
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipmentHighlights.map((h, i) => {
            const Icon = equipmentHighlightIcons[i] ?? Wrench;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                className="rounded-lg border-2 border-border/70 bg-card p-5 hover:shadow-md hover:border-accent/40 transition-all"
              >
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-bold text-foreground text-base">{h.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {h.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-accent text-center">
            Our Equipment Range
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipmentCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] ?? iconMap.Users;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                >
                  <Card className="h-full group border-border/70 hover:shadow-lg hover:border-accent/40 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-foreground">{cat.title}</h4>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 rounded-xl border-2 border-accent/30 bg-accent/5 p-6 sm:p-8"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-accent">
            Saudi Arabia Projects We Support
          </h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {projectsSupported.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-bold text-foreground">Safety First</p>
              <p className="mt-1 text-muted-foreground">
                All equipment is regularly inspected and maintained to ensure maximum safety and performance.
              </p>
            </div>
            <div>
              <p className="font-bold text-foreground">24/7 Support</p>
              <p className="mt-1 text-muted-foreground">
                Our technical team is available round the clock for assistance and on-site support.
              </p>
            </div>
            <div>
              <p className="font-bold text-foreground">Flexible Rental Plans</p>
              <p className="mt-1 text-muted-foreground">
                Daily, weekly, monthly and long-term rental options available to suit every project need.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ============= TRANSPORT ============= */
export function TransportExtra() {
  return (
    <>
      <div className="mt-16 pt-12 border-t border-border">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Vehicle Fleet */}
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
                      <h4 className="font-bold text-foreground text-base">{v.title}</h4>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-border/70 bg-secondary/50 p-5 sm:p-6">
              <h4 className="text-sm font-bold text-foreground">Transport Solutions</h4>
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

          {/* Highlights + Tankers */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Why Choose Us
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {transportHighlights.map((h, i) => {
                const Icon = transportHighlightIcons[i] ?? Car;
                return (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    className="rounded-lg border-2 border-border/70 bg-card p-4 hover:border-accent/40 hover:shadow-sm transition-all"
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <h4 className="mt-2 text-sm font-bold text-foreground">{h.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-snug">
                      {h.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-xl bg-primary text-primary-foreground p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="h-5 w-5 text-accent" />
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
    </>
  );
}

/* ============= PETRO ============= */
export function PetroExtra() {
  const statsIcons = [Briefcase, Users, ShieldCheck, CalendarRange];
  return (
    <>
      {/* Stats section */}
      <section className="relative py-16 md:py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              Petro Services Track Record
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Powering fuel stations with reliable workforce
            </h2>
            <p className="mt-3 text-base text-primary-foreground/85 leading-relaxed">
              We provide trained, reliable and customer-focused manpower for petrol stations
              across the Kingdom — ensuring smooth operations and strict safety standards.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {fuelStationStats.map((s, i) => {
              const Icon = statsIcons[i] ?? Fuel;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="rounded-xl border-2 border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-5 sm:p-6 text-center"
                >
                  <Icon className="h-8 w-8 mx-auto text-accent" />
                  <div className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-xs sm:text-sm font-semibold text-primary-foreground/80 leading-snug">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {[
              { title: "Trained Workforce", desc: "Customer-focused, safety-conscious staff trained for fuel station operations." },
              { title: "Strict Safety & Quality", desc: "Adherence to safety standards and quality procedures on every shift." },
              { title: "Reliable Operations", desc: "Smooth station operations backed by 24/7 management and support." },
            ].map((h) => (
              <div
                key={h.title}
                className="rounded-xl border-2 border-primary-foreground/15 bg-primary-foreground/5 p-5 sm:p-6"
              >
                <h3 className="text-base font-bold text-accent">{h.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============= HOSPITALITY ============= */
export function HospitalityExtra() {
  return (
    <>
      <div className="mt-16 pt-12 border-t border-border">
        <SectionHeading
          eyebrow="Our Hospitality Services"
          title="Service beyond expectations"
          description="Professional and dedicated hospitality workforce to deliver exceptional guest experiences — for hotels, resorts, catering companies and corporate facilities across the Kingdom."
        />

        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
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
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base">{s.title}</h3>
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-4 space-y-5"
          >
            <div className="rounded-xl bg-primary text-primary-foreground p-6 sm:p-7 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground mb-4">
                <Award className="h-6 w-6" />
              </div>
              <p className="text-lg font-bold leading-snug text-pretty">
                &ldquo;Professional People. Exceptional Service.&rdquo;
              </p>
              <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">
                Our hospitality teams are trained to deliver memorable guest experiences —
                matching luxury hotel standards at every touchpoint.
              </p>
            </div>

            <div className="space-y-3">
              {hospitalityHighlights.map((h, i) => {
                const Icon = hospitalityHighlightIcons[i] ?? Award;
                return (
                  <div
                    key={h.title}
                    className="rounded-lg border-2 border-border/70 bg-card p-4 flex items-start gap-3"
                  >
                    <Icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{h.title}</p>
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
    </>
  );
}
