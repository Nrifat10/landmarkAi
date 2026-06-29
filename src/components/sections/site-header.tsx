"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, company } from "@/lib/data";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label={`${company.name} home`}
          >
            <span className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold shadow-sm">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm md:text-base font-bold tracking-tight text-foreground">
                LANDMARK
              </span>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Inter Gulf LLC
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href={company.phoneHref}>
                <Phone className="h-4 w-4 mr-1.5" />
                Get a Quote
              </a>
            </Button>
            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent/10 transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <nav
              className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-1"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-md transition-colors",
                    active === link.href
                      ? "bg-accent/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-3 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={company.phoneHref} onClick={() => setOpen(false)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call {company.phone}
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
