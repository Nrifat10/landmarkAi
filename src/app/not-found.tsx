"use client";

import Link from "next/link";
import { Home, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Big 404 */}
          <div className="relative inline-block">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-extrabold tracking-tight text-primary leading-none">
              404
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-2 bg-hazard-thin rounded-full" aria-hidden="true" />
          </div>

          <h2 className="mt-8 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Page Not Found
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 font-bold">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <a
              href="/landmark-company-profile.pdf"
              download="Landmark-Inter-Gulf-Company-Profile.pdf"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download our Company Profile PDF
            </a>
          </div>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {[
              { label: "About", href: "/about" },
              { label: "Services", href: "/#services" },
              { label: "Projects", href: "/projects" },
              { label: "Manpower", href: "/services/manpower" },
              { label: "Equipment", href: "/services/equipment" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
