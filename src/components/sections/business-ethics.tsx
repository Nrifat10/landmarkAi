"use client";

import { motion } from "framer-motion";
import {
  Scale,
  Handshake,
  Gavel,
  HeartHandshake,
  Users,
  GraduationCap,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { businessEthics } from "@/lib/data";

const ethicsIcons = [
  Scale, // Integrity & Transparency
  Handshake, // Fairness & Respect
  Gavel, // Compliance
  HeartHandshake, // Social Responsibility
  Users, // Teamwork & Commitment
  GraduationCap, // Learning & Development
];

export function BusinessEthics() {
  return (
    <section className="relative py-20 md:py-28 bg-secondary/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Business Ethics"
          title="Prosperity through engineering, technology and management"
          description="We are committed to bringing prosperity and well-being to our stakeholders and society at large by adding value through everything we do — and by conducting our business with honesty, fairness and respect."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {businessEthics.map((item, i) => {
            const Icon = ethicsIcons[i] ?? Scale;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                className="group relative rounded-xl border border-border/70 bg-card p-6 hover:shadow-lg hover:border-accent/40 transition-all overflow-hidden"
              >
                <div
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors"
                  aria-hidden="true"
                />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
