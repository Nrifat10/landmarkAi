"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Globe, MapPin, ArrowUp, Star } from "lucide-react";
import { company, services, navLinks } from "@/lib/data";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  // Hide the public site footer inside the admin dashboard — the admin
  // shell provides its own layout. Avoids footer overlap on /admin/*.
  if (pathname.startsWith("/admin")) return null;

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
            <div className="mt-4">
              <img
                src="/saudi-vision-2030-white.svg"
                alt="Saudi Vision 2030 — Kingdom of Saudi Arabia"
                title="Proudly supporting Saudi Vision 2030"
                className="h-16 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
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
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `mailto:${company.emailUser}@${company.emailDomain}`;
                  }}
                  className="flex items-start gap-2.5 text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: company.emailEncoded }} />
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
                  <span>
                    King Faisal W, King Fahd Industrial Port,
                    <br />
                    Al Jubail 35712, Saudi Arabia
                  </span>
                </span>
              </li>
              <li>
                <a
                  href={company.googleBusiness?.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold mt-1 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <span className="flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                    <Star className="h-3 w-3 fill-current" />
                  </span>
                  Find Us on Google
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-primary-foreground/60 text-center sm:text-left">
              © {year} {company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="text-xs text-primary-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <span className="text-primary-foreground/20">·</span>
              <Link href="/terms-of-service" className="text-xs text-primary-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
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
