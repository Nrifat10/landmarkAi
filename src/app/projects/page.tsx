"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Calendar, MapPin, ArrowRight, Users, Building2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { projects, heroStats } from "@/lib/data";
import { siteImages, getImageRotating } from "@/lib/images";

// Map project type → image category for better visual matching
const projectTypeImageCategory: Record<string, string> = {
  "Oil & Gas": "refinery",
  "Infrastructure": "equipment",
  "Industrial": "industrial",
  "Manufacturing": "industrial",
};

function getProjectImage(projectType: string, index: number): string {
  const category = projectTypeImageCategory[projectType] ?? "refinery";
  // Use a mix of the matched category + workers for variety
  const useWorkers = index % 3 === 2;
  return getImageRotating(useWorkers ? "workers" : category, index);
}

export default function ProjectsPage() {
  const totalDeployed = projects.reduce(
    (sum, p) => sum + p.roles.reduce((s, r) => s + r.qty, 0),
    0
  );

  const summaryStats = [
    { value: projects.length, suffix: "+", label: "Major Projects", icon: Briefcase },
    { value: totalDeployed, suffix: "+", label: "Personnel Deployed", icon: Users },
    { value: 8, suffix: "+", label: "Global EPC Clients", icon: Building2 },
    { value: 2017, suffix: "", label: "Operating Since", icon: Award },
  ];

  return (
    <>
      <PageHero
        eyebrow="Project Experience & Deployment Record"
        title="Trusted by leading contractors across the Kingdom"
        description="Since 2017, we have deployed thousands of skilled professionals to flagship oil & gas, infrastructure and industrial projects — partnering with global EPC contractors and local leaders alike."
        breadcrumbs={[{ label: "Projects" }]}
        image={siteImages.refinery[6]}
      />

      {/* Summary stats */}
      <section className="relative py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {summaryStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="rounded-xl border-2 border-border/70 bg-card p-6 text-center hover:border-accent/40 hover:shadow-md transition-all"
                >
                  <Icon className="h-8 w-8 mx-auto text-accent" />
                  <div className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    {s.value.toLocaleString("en-US")}{s.suffix}
                  </div>
                  <div className="mt-1.5 text-xs sm:text-sm font-semibold text-muted-foreground leading-snug">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="relative py-16 md:py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Real projects. Real deployments. Real results."
            description="A selection of major projects where our manpower, equipment and expertise have driven successful delivery for leading EPC contractors."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => {
              const total = p.roles.reduce((sum, r) => sum + r.qty, 0);
              const img = getProjectImage(p.type, i);
              return (
                <motion.div
                  key={`${p.client}-${p.project}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: "easeOut" }}
                >
                  <Card className="h-full border-border/70 hover:shadow-xl hover:border-accent/40 transition-all overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden bg-primary">
                      { }
                      <img
                        src={img}
                        alt={p.client}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-0.5 text-xs font-bold">
                          {p.type}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg sm:text-xl font-extrabold text-primary-foreground leading-tight">
                          {p.client}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-primary-foreground/80">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {p.project}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {p.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {p.description}
                      </p>

                      <div className="mt-4 rounded-lg bg-secondary/60 p-3 max-h-56 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-border/60 text-muted-foreground">
                              <th className="py-1.5 pr-3 text-left font-semibold uppercase tracking-wider">Role / Position</th>
                              <th className="py-1.5 pl-3 text-right font-semibold uppercase tracking-wider">Qty</th>
                            </tr>
                          </thead>
                          <tbody>
                            {p.roles.map((r, idx) => (
                              <tr
                                key={`${r.role}-${idx}`}
                                className="border-b border-border/40 last:border-0"
                              >
                                <td className="py-1.5 pr-3 text-foreground/80">{r.role}</td>
                                <td className="py-1.5 pl-3 text-right font-bold text-foreground whitespace-nowrap">
                                  {r.qty}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-extrabold text-accent leading-none">
                            {total}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                            Personnel Deployed
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">{p.roles.length}</div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                            Role Types
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <Link href="/contact">
                Discuss Your Project
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
