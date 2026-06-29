"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  image,
  align = "center",
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-primary text-primary-foreground">
      {/* Background image with overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          { }
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />
        </div>
      )}

      {/* Decorative grid + glow */}
      <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium text-primary-foreground/60 mb-5",
              align === "center" && "justify-center"
            )}
          >
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {b.href ? (
                  <Link href={b.href} className="hover:text-accent transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-accent">{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={cn(
              "inline-flex items-center gap-2 mb-4",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-8 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-accent" />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance",
            align === "center" ? "text-center mx-auto max-w-4xl" : "text-left max-w-3xl"
          )}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className={cn(
              "mt-5 text-base sm:text-lg text-primary-foreground/80 leading-relaxed text-pretty",
              align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl"
            )}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Bottom hazard stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-hazard-thin" aria-hidden="true" />
    </section>
  );
}
