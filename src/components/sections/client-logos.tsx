"use client";

import { motion } from "framer-motion";
import { clientLogos } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function ClientLogos() {
  // Duplicate the logos array to create a seamless infinite scroll
  const doubledLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="relative py-20 md:py-24 bg-secondary/40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Clients & Partners"
          title="Trusted by industry leaders across the Kingdom"
          description="We are proud to serve and partner with leading organizations in oil & gas, construction, infrastructure, and industrial sectors throughout Saudi Arabia."
        />
      </div>

      {/* Marquee slider — two copies of the logos scrolling infinitely */}
      <div className="relative mt-14 overflow-hidden">
        {/* Gradient fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-secondary/90 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-secondary/90 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <motion.div
          className="flex gap-8 sm:gap-12 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {doubledLogos.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex items-center justify-center shrink-0"
            >
              <div className="relative w-32 h-20 sm:w-40 sm:h-24 lg:w-48 lg:h-28 flex items-center justify-center rounded-lg bg-card border border-border/60 shadow-sm hover:shadow-md hover:border-accent/40 transition-all p-3 group">
                { }
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Static grid view for mobile (non-animated fallback) */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {clientLogos.slice(0, 12).map((logo, i) => (
            <motion.div
              key={`static-${logo.src}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: (i % 6) * 0.05, ease: "easeOut" }}
              className="relative aspect-[4/3] flex items-center justify-center rounded-lg bg-card border border-border/60 shadow-sm hover:shadow-md hover:border-accent/40 transition-all p-3 group"
            >
              { }
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
