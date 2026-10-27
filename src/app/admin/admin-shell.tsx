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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Job Applications", icon: Briefcase },
  { href: "/admin/enquiries", label: "Contact Enquiries", icon: Mail },
  { href: "/admin/spam", label: "Spam Folder", icon: ShieldAlert },
  { href: "/admin/export", label: "Export CSV", icon: Download },
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

  return (
    <div className="min-h-screen bg-secondary/40">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground flex flex-col transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo / Brand */}
        <div className="h-16 flex items-center justify-between border-b border-primary-foreground/10 px-5">
          <Link href="/admin" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <img src="/landmark-logo-light.png" alt="" className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-primary-foreground/60 hover:text-primary-foreground"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/75 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-primary-foreground/10 space-y-1">
          <a
            href="https://www.landmarkgulf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-primary-foreground/60 hover:bg-primary-foreground/5 hover:text-primary-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View public website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-primary-foreground/75 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 border-b border-primary-foreground/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-primary-foreground/80 hover:text-primary-foreground"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src="/landmark-logo-light.png" alt="" className="h-7 w-auto" />
          <div className="w-5" />
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
