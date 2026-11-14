import Link from "next/link";
import { db, ensureSchema } from "@/lib/db";
import { Briefcase, Mail, ShieldAlert, Clock, TrendingUp, ArrowRight, Sparkles, Calendar } from "lucide-react";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export default async function AdminDashboard() {
  // Ensure tables exist before querying (auto-creates on cold start)
  await ensureSchema();

  // Start of "today" in Riyadh (UTC+3, no DST), expressed as a UTC Date —
  // the company operates in Saudi Arabia, so "Today" follows Riyadh time.
  const riyadhToday = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
  }).format(new Date()); // → "YYYY-MM-DD"
  const startOfToday = new Date(`${riyadhToday}T00:00:00+03:00`);

  // Aggregate counts in parallel
  const [
    newAppsCount,
    readAppsCount,
    spamAppsCount,
    newEnqCount,
    spamEnqCount,
    appsToday,
    enqsToday,
    recentApps,
    recentEnqs,
  ] = await Promise.all([
    db.jobApplication.count({ where: { status: "new" } }),
    db.jobApplication.count({ where: { status: "read" } }),
    db.jobApplication.count({ where: { status: "spam" } }),
    db.contactEnquiry.count({ where: { status: "new" } }),
    db.contactEnquiry.count({ where: { status: "spam" } }),
    db.jobApplication.count({ where: { createdAt: { gte: startOfToday } } }),
    db.contactEnquiry.count({ where: { createdAt: { gte: startOfToday } } }),
    db.jobApplication.findMany({
      where: { status: { in: ["new", "read"] } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    db.contactEnquiry.findMany({
      where: { status: { in: ["new", "read"] } },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const totalApps = newAppsCount + readAppsCount;
  const totalEnqs = await db.contactEnquiry.count({ where: { status: { in: ["new", "read"] } } });

  // Refined stat cards with gradient backgrounds and accent borders
  const stats = [
    {
      label: "New Applications",
      value: newAppsCount,
      sub: `${readAppsCount} read · ${totalApps} total`,
      icon: Briefcase,
      href: "/admin/applications?status=new",
      // Amber accent (matches brand)
      accent: "amber",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-amber-400 to-amber-600",
      iconColor: "text-white",
      ring: "ring-amber-500/20",
    },
    {
      label: "New Enquiries",
      value: newEnqCount,
      sub: `${totalEnqs} total`,
      icon: Mail,
      href: "/admin/enquiries?status=new",
      // Emerald accent
      accent: "emerald",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      iconColor: "text-white",
      ring: "ring-emerald-500/20",
    },
    {
      label: "Spam Caught",
      value: spamAppsCount + spamEnqCount,
      sub: "Auto-filtered",
      icon: ShieldAlert,
      href: "/admin/spam",
      // Rose accent (warning)
      accent: "rose",
      gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-rose-400 to-rose-600",
      iconColor: "text-white",
      ring: "ring-rose-500/20",
    },
    {
      label: "Today",
      value: appsToday + enqsToday,
      sub: `${appsToday} apps · ${enqsToday} enquiries`,
      icon: Clock,
      href: "/admin/applications",
      // Sky accent
      accent: "sky",
      gradient: "from-sky-500/10 via-sky-500/5 to-transparent",
      iconBg: "bg-gradient-to-br from-sky-400 to-sky-600",
      iconColor: "text-white",
      ring: "ring-sky-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 sm:p-8 text-white">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-500/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl" />
        </div>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              HR Dashboard
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, HR Team
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Track job applications and contact enquiries in real time.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
            <Calendar className="h-3.5 w-3.5 text-amber-400" />
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Stats grid — refined with gradients + rings */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all ring-1 ${s.ring}`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.iconBg} ${s.iconColor} mb-3 shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-1 tabular-nums">{s.value}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{s.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity — 2 columns with refined styling */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Recent Applications</h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Latest job applicants</p>
              </div>
            </div>
            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:gap-1.5 transition-all"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentApps.length === 0 ? (
              <li className="p-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                  <Briefcase className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No applications yet</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">New applications will appear here once submitted.</p>
              </li>
            ) : (
              recentApps.map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white text-xs font-bold shrink-0">
                        {app.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">{app.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {app.jobTitle} · {app.nationality}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{timeAgo(app.createdAt)}</p>
                      {app.status === "new" && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400">
                          New
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recent enquiries */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Recent Enquiries</h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Latest contact form submissions</p>
              </div>
            </div>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:gap-1.5 transition-all"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentEnqs.length === 0 ? (
              <li className="p-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No enquiries yet</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">New enquiries will appear here once submitted.</p>
              </li>
            ) : (
              recentEnqs.map((enq) => (
                <li key={enq.id}>
                  <Link
                    href={`/admin/enquiries/${enq.id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-white text-xs font-bold shrink-0">
                        {enq.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate">{enq.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {enq.service || "General"} · {enq.company || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{timeAgo(enq.createdAt)}</p>
                      {enq.status === "new" && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          New
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Tip — refined gradient card */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-5">
        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" aria-hidden="true" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Pro tip</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
              Submissions with spam score ≥ 50 are auto-flagged and sent to the{" "}
              <Link href="/admin/spam" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                spam folder
              </Link>
              . Check it occasionally — legitimate submissions may be misflagged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
