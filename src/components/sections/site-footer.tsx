"use client";

import Link from "next/link";
import { Mail, Globe, MapPin, ArrowUp } from "lucide-react";
import { company, services, navLinks } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto relative">
      {/* Top hazard accent */}
      <div className="h-1.5 bg-hazard-thin" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={company.name}>
              { }
              <img
                src="/landmark-logo.png"
                alt={`${company.name} logo`}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
              {company.tagline} — a Saudi-based integrated services company delivering manpower,
              equipment rental, industrial trading, petro services and hospitality across the
              Kingdom since 2017.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Contributing to Vision 2030
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
              Our Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-2.5 text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <span>{company.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={company.websiteUrl}
                  className="flex items-start gap-2.5 text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  <Globe className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <span>{company.website}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-primary-foreground/75">
                  <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <span>{company.country}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60 text-center sm:text-left">
            © {year} {company.name}. All rights reserved. · {company.tagline}
          </p>
          <Link
            href="#top"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground/75 hover:text-accent transition-colors"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
