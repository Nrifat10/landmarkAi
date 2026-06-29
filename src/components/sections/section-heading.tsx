"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-accent" />
        </div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance",
          light ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed text-pretty",
            light ? "text-primary-foreground/75" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
