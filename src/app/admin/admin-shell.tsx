"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  ChevronDown,
  Timer,
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

// ────────────────────────────────────────────────────────────
// Auto-logout configuration
// ────────────────────────────────────────────────────────────
// Logs the admin out after IDLE_TIMEOUT_MS of inactivity.
// "Activity" = any click, keypress, scroll, touch, or mouse move
// (throttled — mousemove only counts once per 30s).
// A warning toast shows 2 minutes before logout.
const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const WARNING_BEFORE_MS = 2 * 60 * 1000; // show warning 2 min before
const ACTIVITY_EVENTS = [
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "wheel",
];

// ────────────────────────────────────────────────────────────
// Notifications (admin header bell)
// ────────────────────────────────────────────────────────────
type NotifItem = {
  id: string;
  type: "application" | "enquiry";
  recordId: string;
  name: string;
  summary: string;
  href: string;
  createdAt: string;
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Auto-logout state ────────────────────────────────────
  const lastActivityRef = useRef<number>(Date.now());
  const logoutTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const warningShownRef = useRef<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // ── Notifications state ────────────────────────────────────
  const [notifications, setNotifications] = useState<NotifItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);

  const forceLogout = useCallback(
    async (reason: string) => {
      try {
        await fetch("/admin/api/auth", { method: "DELETE" });
        toast({
          title: "Signed out",
          description: reason,
        });
        router.push("/admin/login");
        router.refresh();
      } catch {
        // Even if the DELETE fails, clear locally and redirect
        router.push("/admin/login");
        router.refresh();
      }
    },
    [router, toast]
  );

  // Track user activity — reset the idle timer
  useEffect(() => {
    const resetActivity = () => {
      lastActivityRef.current = Date.now();
      if (warningShownRef.current) {
        warningShownRef.current = false;
        setTimeLeft(null);
      }
    };

    ACTIVITY_EVENTS.forEach((evt) => {
      window.addEventListener(evt, resetActivity, { passive: true });
    });

    return () => {
      ACTIVITY_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, resetActivity);
      });
    };
  }, []);

  // Idle-check interval — runs every 10 seconds
  useEffect(() => {
    logoutTimerRef.current = setInterval(() => {
      const idleFor = Date.now() - lastActivityRef.current;

      // Show warning when close to timeout
      if (idleFor >= IDLE_TIMEOUT_MS - WARNING_BEFORE_MS && !warningShownRef.current) {
        warningShownRef.current = true;
        toast({
          title: "Session expiring soon",
          description: "You'll be signed out in 2 minutes due to inactivity. Click anywhere to stay signed in.",
          duration: 10000,
        });
      }

      // Update countdown display while in warning window
      if (warningShownRef.current) {
        const remaining = Math.max(0, IDLE_TIMEOUT_MS - idleFor);
        setTimeLeft(remaining);
      }

      // Force logout
      if (idleFor >= IDLE_TIMEOUT_MS) {
        if (logoutTimerRef.current) clearInterval(logoutTimerRef.current);
        forceLogout("You've been signed out after 30 minutes of inactivity.");
      }
    }, 10000); // check every 10s

    return () => {
      if (logoutTimerRef.current) clearInterval(logoutTimerRef.current);
    };
  }, [forceLogout, toast]);

  // Also logout when the browser tab is closed/hidden for > 30 min
  useEffect(() => {
    let hiddenAt: number | null = null;

    const onVisibilityChange = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
      } else {
        hiddenAt = null;
        lastActivityRef.current = Date.now();
        warningShownRef.current = false;
        setTimeLeft(null);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // ── Notifications feed ────────────────────────────────────
  // Fetch unread applications + enquiries for the bell badge.
  // Poll every 60s and refetch on route change (after viewing an
  // item it's marked read server-side, so the badge should drop).
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/admin/api/notifications?limit=8", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.success) {
        setNotifications(data.items || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {
      // non-critical — fail silently
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const id = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(id);
  }, [fetchNotifications, pathname]);

  const markAllRead = useCallback(async () => {
    setNotifLoading(true);
    try {
      const res = await fetch("/admin/api/notifications", { method: "PATCH" });
      const data = await res.json().catch(() => ({}));
      setNotifications([]);
      setUnreadCount(0);
      toast({
        title: "All caught up",
        description: data?.markedRead
          ? `Marked ${data.markedRead} notification${data.markedRead === 1 ? "" : "s"} as read.`
          : "Marked all notifications as read.",
      });
    } catch {
      toast({ title: "Could not update notifications", variant: "destructive" });
    } finally {
      setNotifLoading(false);
    }
  }, [toast]);

  const handleLogout = async () => {
    if (logoutTimerRef.current) clearInterval(logoutTimerRef.current);
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
        {/* Logo / Brand — actual Landmark logo */}
        <div className="h-20 flex items-center justify-between border-b border-slate-800/60 px-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <img
              src="/landmark-logo-light.png"
              alt="Landmark Inter Gulf LLC"
              className="h-9 w-auto object-contain"
            />
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
          {navItems.map((item) => {
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
              </Link>
            );
          })}
        </nav>

        {/* Session timer indicator (mobile only, bottom of sidebar) */}
        {timeLeft !== null && timeLeft > 0 && (
          <div className="mx-4 mb-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-2 flex items-center gap-2">
            <Timer className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <p className="text-[10px] font-semibold text-amber-300">
              Auto-logout in {Math.ceil(timeLeft / 60000)} min
            </p>
          </div>
        )}

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
        {/* Top bar — prominent on mobile with actual Landmark logo */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-950 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 shadow-md">
          {/* Left: hamburger (mobile) + Landmark logo (mobile) / date+title (desktop) */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-slate-700 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700 transition-colors shrink-0"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Mobile: actual Landmark logo — full-width, clearly visible */}
            <Link href="/admin" className="lg:hidden flex items-center shrink-0">
              <img
                src="/landmark-logo-light.png"
                alt="Landmark Inter Gulf LLC"
                className="h-8 w-auto object-contain"
              />
            </Link>

            {/* Desktop: date + title */}
            <div className="hidden lg:block">
              <p className="text-xs text-slate-500 dark:text-slate-400">{today}</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 -mt-0.5">HR Dashboard</p>
            </div>
          </div>

          {/* Right: session countdown + user */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Auto-logout countdown chip (visible when warning active) */}
            {timeLeft !== null && timeLeft > 0 && (
              <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 px-2.5 py-1.5">
                <Timer className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                  {Math.ceil(timeLeft / 60000)}m
                </span>
              </div>
            )}

            {/* Notifications dropdown — bell with unread badge + panel */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative flex items-center justify-center h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
                aria-label="Notifications"
                aria-expanded={notifOpen}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center tabular-nums leading-none">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  {/* Click-outside backdrop */}
                  <button
                    type="button"
                    className="fixed inset-0 z-40 cursor-default"
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => setNotifOpen(false)}
                  />
                  {/* Dropdown panel */}
                  <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Notifications</p>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                          {unreadCount} new
                        </span>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                          <Bell className="h-7 w-7 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            You&rsquo;re all caught up.
                          </p>
                        </div>
                      ) : (
                        notifications.map((n) => {
                          const Icon = n.type === "application" ? Briefcase : Mail;
                          return (
                            <Link
                              key={n.id}
                              href={n.href}
                              onClick={() => setNotifOpen(false)}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                            >
                              <span
                                className={cn(
                                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                  n.type === "application"
                                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                )}
                              >
                                <Icon className="h-4 w-4" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                                  {n.name}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {n.type === "application" ? "Applied: " : "Enquired: "}
                                  {n.summary}
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                                  {relativeTime(n.createdAt)}
                                </p>
                              </div>
                            </Link>
                          );
                        })
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="flex items-center justify-between gap-2 px-3 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                        <button
                          type="button"
                          onClick={markAllRead}
                          disabled={notifLoading}
                          className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-50 px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          {notifLoading ? "Marking…" : "Mark all read"}
                        </button>
                        <Link
                          href="/admin/applications"
                          onClick={() => setNotifOpen(false)}
                          className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline px-2 py-1.5"
                        >
                          View all
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
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
