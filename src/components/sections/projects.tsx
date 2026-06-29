"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Project Experience & Deployment Record"
          title="Trusted by leading contractors across the Kingdom"
          description="Since 2017, we have deployed thousands of skilled professionals to flagship oil & gas, infrastructure and industrial projects — partnering with global EPC contractors and local leaders alike."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const totalDeployed = p.roles.reduce((sum, r) => sum + r.qty, 0);
            return (
              <motion.div
                key={`${p.client}-${p.project}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: "easeOut" }}
              >
                <Card className="h-full border-border/70 hover:shadow-lg hover:border-accent/40 transition-all overflow-hidden">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent mb-2">
                          <Briefcase className="h-3 w-3" />
                          {p.type}
                        </div>
                        <h3 className="text-base font-bold text-foreground leading-tight">
                          {p.client}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-bold text-accent leading-none">
                          {totalDeployed}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                          Deployed
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {p.project}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {p.duration}
                      </span>
                    </div>

                    <div className="rounded-lg bg-secondary/60 p-3 max-h-44 overflow-y-auto custom-scrollbar">
                      <table className="w-full text-xs">
                        <tbody>
                          {p.roles.map((r, idx) => (
                            <tr
                              key={`${r.role}-${idx}`}
                              className="border-b border-border/40 last:border-0"
                            >
                              <td className="py-1.5 pr-3 text-foreground/80">{r.role}</td>
                              <td className="py-1.5 pl-3 text-right font-semibold text-foreground whitespace-nowrap">
                                {r.qty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 text-sm font-semibold transition-colors"
          >
            Discuss your project requirements
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
