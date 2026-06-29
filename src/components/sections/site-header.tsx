"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, serviceNavLinks, company } from "@/lib/data";
import { iconMap } from "@/lib/icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (deferred to avoid cascading renders)
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      // Defer the state updates to a microtask to avoid cascading renders
      const id = requestAnimationFrame(() => {
        setOpen(false);
        setServicesOpen(false);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return isHome;
    if (href === "/#services") return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      {/* Top hazard stripe accent */}
      <div className="h-1 bg-hazard-thin" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label={`${company.name} home`}
          >
            <span className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold shadow-md ring-2 ring-accent/40">
              <Building2 className="h-5 w-5 md:h-6 md:w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className={cn(
                "text-sm md:text-base font-extrabold tracking-tight",
                scrolled || !isHome ? "text-foreground" : "text-foreground"
              )}>
                LANDMARK
              </span>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-accent">
                Inter Gulf LLC
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => {
              if (link.label === "Services") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                        "text-foreground hover:text-accent"
                      )}
                    >
                      Services
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        servicesOpen && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 rounded-lg border border-border bg-card shadow-xl overflow-hidden"
                        >
                          <div className="p-2 grid gap-0.5">
                            {serviceNavLinks.map((s) => {
                              const Icon = iconMap[s.icon] ?? iconMap.Users;
                              return (
                                <Link
                                  key={s.href}
                                  href={s.href}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent/10 hover:text-accent transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/15 text-accent">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="text-sm font-medium">{s.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-semibold rounded-md transition-colors",
                    isActive(link.href)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-sm"
            >
              <Link href="/contact">
                <Phone className="h-4 w-4 mr-1.5" />
                Get a Quote
              </Link>
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
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden max-h-[80vh] overflow-y-auto"
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
                    "px-4 py-3 text-base font-semibold rounded-md transition-colors",
                    isActive(link.href)
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services sub-list in mobile */}
              <div className="pl-4 mt-1 mb-2 border-l-2 border-accent/30 space-y-1">
                <p className="px-2 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Our Services
                </p>
                {serviceNavLinks.map((s) => {
                  const Icon = iconMap[s.icon] ?? iconMap.Users;
                  return (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-md"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {s.label}
                    </Link>
                  );
                })}
              </div>

              <Button
                asChild
                className="mt-3 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={company.phoneHref} onClick={() => setOpen(false)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call {company.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="mt-2 border-primary/30"
              >
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
