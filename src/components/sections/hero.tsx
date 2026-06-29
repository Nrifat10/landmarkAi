"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { ArrowRight, ShieldCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroStats, company } from "@/lib/data";

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

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-primary text-primary-foreground pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/80 to-primary"
        aria-hidden="true"
      />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-xs sm:text-sm font-medium text-accent"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Saudi Arabia · Est. {company.established.split(" ")[0]}</span>
              <span className="hidden sm:inline mx-1 opacity-50">·</span>
              <span className="hidden sm:inline">Contributing to Vision 2030</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance"
            >
              Reliable Workforce.
              <br />
              <span className="text-accent">Stronger Businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
              className="mt-5 max-w-xl text-base sm:text-lg text-primary-foreground/80 leading-relaxed text-pretty"
            >
              {company.name} is a Saudi-based integrated services company providing
              Manpower Supply, Equipment Rental, Industrial Trading, Petro Services and
              Hospitality Services — delivering world-class quality, safety and reliability
              to projects across the Kingdom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="#services">
                  Explore Our Services
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={company.phoneHref}>
                  <Phone className="h-4 w-4 mr-2" />
                  Talk to an Expert
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right: stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                By the Numbers
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/70">
                A track record built on people, equipment and trust.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                {heroStats.map((s) => (
                  <div key={s.label} className="space-y-1.5">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-primary-foreground/80 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-primary-foreground/10">
                <p className="text-xs text-primary-foreground/60 italic leading-relaxed">
                  &ldquo;People. Performance. Partnership. That&apos;s our promise.&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-primary-foreground/80">
                  — {company.ceo}, {company.ceoTitle}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
