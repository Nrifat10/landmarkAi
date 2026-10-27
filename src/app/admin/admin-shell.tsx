"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Mail,
  ShieldAlert,
  Download,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { href: "/admin/applications", label: "Job Applications", icon: Briefcase, badge: "new" },
  { href: "/admin/enquiries", label: "Contact Enquiries", icon: Mail, badge: "new" },
  { href: "/admin/spam", label: "Spam Folder", icon: ShieldAlert, badge: null },
  { href: "/admin/export", label: "Export CSV", icon: Download, badge: null },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/admin/api/auth", { method: "DELETE" });
      toast({ title: "Logged out" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast({ title: "Logout failed", variant: "destructive" });
    }
  };

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — refined dark navy with subtle gradient */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 flex flex-col transition-transform lg:translate-x-0",
          "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100",
          "border-r border-slate-800/60",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo / Brand — refined with subtitle */}
        <div className="h-20 flex items-center justify-between border-b border-slate-800/60 px-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 font-extrabold text-sm shrink-0">
              LM
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight">Landmark</p>
              <p className="text-[10px] uppercase tracking-widest text-amber-400/80 font-semibold">HR Console</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-100"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav — refined spacing and active state */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Main</p>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all relative",
                  isActive
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 border border-amber-500/30 shadow-sm"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 border border-transparent"
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-amber-400" />
                )}
                <Icon className={cn("h-4 w-4 shrink-0 transition-transform", isActive && "text-amber-400")} />
                <span className="truncate">{item.label}</span>
                {/* Badge slot — populated later via client query */}
                {idx === 1 && item.badge && (
                  <span className="ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    ●
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer — refined */}
        <div className="p-4 border-t border-slate-800/60 space-y-1">
          <a
            href="https://www.landmarkgulf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View public website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar — solid background (was transparent white/80, which blended
            with the dark dashboard hero header below and made the bar invisible
            on mobile). Now uses solid white / slate-900 for guaranteed contrast. */}
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
          {/* Mobile menu button + brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            {/* On mobile show brand on top bar; on desktop show date + title */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 font-extrabold text-[10px]">
                LM
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-50">HR Console</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs text-slate-500 dark:text-slate-400">{today}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 -mt-0.5">HR Dashboard</p>
            </div>
          </div>

          {/* Right side — search + notifications + user */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="hidden sm:flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="relative flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500" />
            </button>
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-slate-100 text-xs font-bold">
                HR
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">HR Admin</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Landmark Inter Gulf</p>
              </div>
              <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
