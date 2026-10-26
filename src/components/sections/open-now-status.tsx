"use client";

import { useEffect, useState } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface OpenNowStatusProps {
  /** Opening hours per day, 0 = Sunday ... 6 = Saturday (JS Date.getDay convention). Each entry has open time and close time as "HH:MM" 24h strings, or null if closed that day. */
  schedule: {
    day: string;
    dayIndex: number; // 0=Sun, 1=Mon, ..., 6=Sat (matches Date.getDay)
    openTime: string | null; // "07:00" — null means closed
    closeTime: string | null; // "17:00" — null means closed
    hoursLabel: string; // "7:00 AM – 5:00 PM" or "Closed"
  }[];
}

/**
 * Open/Closed status badge that uses the user's current real time (in Saudi Arabia
 * timezone, so it's correct for both local and overseas visitors).
 *
 * Server-rendered pages would have a stale status because they're cached at build
 * time, so this is a client component that runs after hydration.
 */
export function OpenNowStatus({ schedule }: OpenNowStatusProps) {
  // Start with a "neutral" state to avoid hydration mismatch — server renders nothing
  // meaningful, client computes the real status after mount.
  const [status, setStatus] = useState<{
    state: "open" | "closed" | "loading";
    todayLabel?: string;
    nextLabel?: string;
  }>({ state: "loading" });

  useEffect(() => {
    const compute = () => {
      // Get current time in Saudi Arabia (Asia/Riyadh, UTC+3 — no DST)
      const now = new Date();
      const saFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Riyadh",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const parts = saFormatter.formatToParts(now);
      const weekdayPart = parts.find((p) => p.type === "weekday")?.value || "";
      const hourPart = parts.find((p) => p.type === "hour")?.value || "0";
      const minutePart = parts.find((p) => p.type === "minute")?.value || "0";

      // Handle hour "24" returned by some browsers at midnight
      const hour = parseInt(hourPart, 10) === 24 ? 0 : parseInt(hourPart, 10);
      const minute = parseInt(minutePart, 10);
      const currentMinutes = hour * 60 + minute;

      const todayEntry = schedule.find((d) => d.day === weekdayPart);
      if (!todayEntry) {
        setStatus({ state: "closed", todayLabel: "Hours unavailable" });
        return;
      }

      // Parse today's open/close time (e.g. "07:00" → 420 minutes)
      const parseTime = (t: string | null) => {
        if (!t) return null;
        const [h, m] = t.split(":").map((x) => parseInt(x, 10));
        return h * 60 + m;
      };

      const openMins = parseTime(todayEntry.openTime);
      const closeMins = parseTime(todayEntry.closeTime);

      if (openMins !== null && closeMins !== null && currentMinutes >= openMins && currentMinutes < closeMins) {
        // Currently open — show "Open until 5:00 PM"
        const closeLabel = formatTime(closeMins);
        setStatus({
          state: "open",
          todayLabel: `Today: ${todayEntry.hoursLabel}`,
          nextLabel: `Open until ${closeLabel}`,
        });
      } else {
        // Closed — find next opening day/time
        let nextDay = todayEntry.dayIndex;
        let attempts = 0;
        let nextEntry: OpenNowStatusProps["schedule"][number] | null = null;
        let nextDayName = "";

        while (attempts < 7) {
          nextDay = (nextDay + 1) % 7;
          attempts++;
          const candidate = schedule.find((d) => d.dayIndex === nextDay);
          if (candidate && candidate.openTime) {
            nextEntry = candidate;
            nextDayName = candidate.day;
            break;
          }
        }

        // Reason for being closed
        let reason = "";
        if (openMins === null) {
          reason = "Closed today (Friday holiday)";
        } else if (currentMinutes < openMins) {
          reason = `Opens today at ${formatTime(openMins)}`;
        } else {
          reason = `Closed for the day${nextEntry ? ` — opens ${nextDayName} at ${formatTime(parseTime(nextEntry.openTime)!)}` : ""}`;
        }

        setStatus({
          state: "closed",
          todayLabel: `Today: ${todayEntry.hoursLabel}`,
          nextLabel: reason,
        });
      }
    };

    compute();
    // Re-check every minute so the status updates as time passes
    const interval = setInterval(compute, 60 * 1000);
    return () => clearInterval(interval);
  }, [schedule]);

  // Format minutes-since-midnight → "7:00 AM" / "5:00 PM"
  function formatTime(mins: number): string {
    const h24 = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
  }

  // Loading state — render a neutral placeholder to avoid layout shift
  if (status.state === "loading") {
    return (
      <div className="rounded-2xl border-2 border-border/70 bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 bg-muted-foreground/40" />
          <div>
            <p className="text-sm font-bold text-foreground">Checking hours…</p>
            <p className="text-xs text-muted-foreground">Loading current status</p>
          </div>
        </div>
      </div>
    );
  }

  const isOpen = status.state === "open";

  return (
    <div
      className={`rounded-2xl border-2 p-5 transition-colors ${
        isOpen ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`relative flex h-3 w-3 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}>
            {isOpen && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            )}
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">
              {isOpen ? "Open Now" : "Closed Now"}
            </p>
            <p className="text-xs text-muted-foreground">{status.todayLabel}</p>
          </div>
        </div>
        {isOpen ? (
          <Clock className="h-4 w-4 text-green-600 shrink-0" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
        )}
      </div>
      {status.nextLabel && (
        <p
          className={`mt-3 pt-3 border-t ${
            isOpen ? "border-green-500/20" : "border-red-500/20"
          } text-xs font-semibold ${isOpen ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {status.nextLabel}
        </p>
      )}
    </div>
  );
}
