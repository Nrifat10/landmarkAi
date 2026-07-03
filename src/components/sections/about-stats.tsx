"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Building2, Calendar } from "lucide-react";

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value.toLocaleString("en-US"));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    setDisplay("0");
    const start = Date.now();
    const milliseconds = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / milliseconds, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);
      setDisplay(current.toLocaleString("en-US"));

      if (progress >= 1) {
        clearInterval(interval);
        setDisplay(value.toLocaleString("en-US"));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "Skilled Manpower Deployed", icon: Users },
  { value: 16, suffix: "+", label: "Major Projects Completed", icon: Briefcase },
  { value: 35, suffix: "+", label: "Active Clients", icon: Building2 },
  { value: 2017, suffix: "", label: "Established", icon: Calendar },
];

export function AboutStats() {
  return (
    <section className="relative py-16 md:py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[50rem] rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-2xl border-2 border-primary-foreground/15 bg-primary-foreground/5 backdrop-blur-sm p-5 sm:p-6 text-center hover:border-accent/40 transition-colors"
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
      </div>
    </section>
  );
}
