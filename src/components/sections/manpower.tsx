"use client";

import { motion } from "framer-motion";
import { HardHat, CheckCircle2, ClipboardCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { manpowerCategories } from "@/lib/data";

export function Manpower() {
  return (
    <section id="manpower" className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Manpower Supply"
          title="A certified workforce for every industrial trade"
          description="From Aramco-approved safety officers to TUV-certified riggers and 6G welders, our manpower pool covers the full spectrum of industrial trades. Every candidate goes through rigorous pre-deployment checks before reaching your project."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

                  <ul className="space-y-2 flex-1 custom-scrollbar">
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
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground hover:bg-accent/90 px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            Request manpower
          </a>
        </motion.div>
      </div>
    </section>
  );
}
