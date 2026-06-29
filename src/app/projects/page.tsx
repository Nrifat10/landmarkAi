"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Calendar, MapPin, ArrowRight, Users, Building2, Award, Layers, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { projects } from "@/lib/data";
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
  const useWorkers = index % 3 === 2;
  return getImageRotating(useWorkers ? "workers" : category, index);
}

export default function ProjectsPage() {
  const totalDeployed = projects.reduce(
    (sum, p) => sum + p.roles.reduce((s, r) => s + r.qty, 0),
    0
  );

  const summaryStats = [
    { value: projects.length, suffix: "+", label: "Major Projects", icon: Briefcase, color: "text-accent" },
    { value: totalDeployed, suffix: "+", label: "Personnel Deployed", icon: Users, color: "text-accent" },
    { value: 8, suffix: "+", label: "Global EPC Clients", icon: Building2, color: "text-accent" },
    { value: 2017, suffix: "", label: "Operating Since", icon: Award, color: "text-accent" },
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

      {/* Summary stats — creative icon cards */}
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
                  className="group relative rounded-2xl border-2 border-border/70 bg-card p-6 text-center hover:border-accent/40 hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Decorative gradient blob */}
                  <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" aria-hidden="true" />
                  <div className="relative">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent transition-colors">
                      <Icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <div className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                      {s.value.toLocaleString("en-US")}{s.suffix}
                    </div>
                    <div className="mt-1.5 text-xs sm:text-sm font-semibold text-muted-foreground leading-snug">
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects — creative alternating layout */}
      <section className="relative py-16 md:py-20 bg-secondary/40 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Real projects. Real deployments. Real results."
            description="A selection of major projects where our manpower, equipment and expertise have driven successful delivery for leading EPC contractors."
          />

          {/* Alternating project cards */}
          <div className="mt-16 space-y-12">
            {projects.map((p, i) => {
              const total = p.roles.reduce((sum, r) => sum + r.qty, 0);
              const img = getProjectImage(p.type, i);
              const isReversed = i % 2 === 1; // Alternate image left/right

              return (
                <motion.div
                  key={`${p.client}-${p.project}-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group"
                >
                  <Card className="overflow-hidden border-border/70 hover:border-accent/40 hover:shadow-2xl transition-all duration-500">
                    <div className={`grid md:grid-cols-2 ${isReversed ? "md:[direction:rtl]" : ""}`}>
                      {/* Image side */}
                      <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-primary [direction:ltr]">
                        { }
                        <img
                          src={img}
                          alt={p.client}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-primary/30" />

                        {/* Project type badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold shadow-lg">
                            <Layers className="h-3 w-3" />
                            {p.type}
                          </span>
                        </div>

                        {/* Floating deployed count badge */}
                        <div className="absolute bottom-4 left-4 rounded-xl bg-primary-foreground/95 backdrop-blur-sm px-4 py-2.5 shadow-xl">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-accent" />
                            <div>
                              <div className="text-2xl font-extrabold text-primary leading-none">{total}</div>
                              <div className="text-[10px] uppercase tracking-wider text-primary/70 font-semibold">Deployed</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="p-6 sm:p-8 flex flex-col justify-center [direction:ltr]">
                        <div className="flex items-start gap-2 mb-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-accent">
                            Project {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs text-muted-foreground">— {p.duration}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors">
                          {p.client}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-accent" />
                            {p.project}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-accent" />
                            {p.duration}
                          </span>
                        </div>

                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                          {p.description}
                        </p>

                        {/* Role tags */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.roles.slice(0, 5).map((r, idx) => (
                            <span
                              key={`${r.role}-${idx}`}
                              className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-card px-2.5 py-1 text-xs font-medium text-foreground/80"
                            >
                              {r.role}
                              <span className="font-bold text-accent">{r.qty}</span>
                            </span>
                          ))}
                          {p.roles.length > 5 && (
                            <span className="inline-flex items-center rounded-md border border-accent/30 bg-accent/5 px-2.5 py-1 text-xs font-bold text-accent">
                              +{p.roles.length - 5} more roles
                            </span>
                          )}
                        </div>

                        {/* Stats footer */}
                        <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                          <div className="flex gap-6">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <TrendingUp className="h-4 w-4 text-accent" />
                                <span className="text-xl font-extrabold text-foreground">{total}</span>
                              </div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Total Personnel</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Layers className="h-4 w-4 text-accent" />
                                <span className="text-xl font-extrabold text-foreground">{p.roles.length}</span>
                              </div>
                              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Role Types</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-16 text-center"
          >
            <div className="inline-block rounded-2xl bg-primary text-primary-foreground px-8 py-8 sm:px-12 sm:py-10 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
                Have a project in mind?
              </h3>
              <p className="mt-2 text-sm text-primary-foreground/80 max-w-md mx-auto">
                Let&apos;s discuss how our manpower, equipment and expertise can drive your project to success.
              </p>
              <Button asChild size="lg" className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                <Link href="/contact">
                  Discuss Your Project
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
