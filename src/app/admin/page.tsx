import Link from "next/link";
import { db, ensureSchema } from "@/lib/db";
import { Briefcase, Mail, ShieldAlert, Clock, TrendingUp, ArrowRight } from "lucide-react";

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

export default async function AdminDashboard() {
  // Ensure tables exist before querying (auto-creates on cold start)
  await ensureSchema();

  // Aggregate counts in parallel
  const [
    newAppsCount,
    readAppsCount,
    spamAppsCount,
    newEnqCount,
    spamEnqCount,
    recentApps,
    recentEnqs,
  ] = await Promise.all([
    db.jobApplication.count({ where: { status: "new" } }),
    db.jobApplication.count({ where: { status: "read" } }),
    db.jobApplication.count({ where: { status: "spam" } }),
    db.contactEnquiry.count({ where: { status: "new" } }),
    db.contactEnquiry.count({ where: { status: "spam" } }),
    db.jobApplication.findMany({
      where: { status: { in: ["new", "read"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    db.contactEnquiry.findMany({
      where: { status: { in: ["new", "read"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const totalApps = newAppsCount + readAppsCount;
  const totalEnqs = await db.contactEnquiry.count({ where: { status: { in: ["new", "read"] } } });

  const stats = [
    {
      label: "New Applications",
      value: newAppsCount,
      sub: `${readAppsCount} read · ${totalApps} total`,
      icon: Briefcase,
      href: "/admin/applications?status=new",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "New Enquiries",
      value: newEnqCount,
      sub: `${totalEnqs} total`,
      icon: Mail,
      href: "/admin/enquiries?status=new",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Spam Caught",
      value: spamAppsCount + spamEnqCount,
      sub: "Auto-filtered",
      icon: ShieldAlert,
      href: "/admin/spam",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Today",
      value: recentApps.length + recentEnqs.length,
      sub: "Recent submissions",
      icon: Clock,
      href: "/admin/applications",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here&apos;s what&apos;s happened with your forms.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-xl border-2 border-border/70 bg-card p-5 hover:border-accent/40 hover:shadow-md transition-all"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg} ${s.color} mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="text-3xl font-extrabold text-foreground mt-1">{s.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent activity — 2 columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="rounded-xl border-2 border-border/70 bg-card">
          <div className="flex items-center justify-between p-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-bold text-foreground">Recent Applications</h2>
            </div>
            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border/60">
            {recentApps.length === 0 ? (
              <li className="p-4 text-sm text-muted-foreground text-center">No applications yet.</li>
            ) : (
              recentApps.map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/admin/applications/${app.id}`}
                    className="flex items-center justify-between p-3 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{app.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {app.jobTitle} · {app.nationality}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-[10px] text-muted-foreground">{formatDate(app.createdAt)}</p>
                      {app.status === "new" && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-500">
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
        <div className="rounded-xl border-2 border-border/70 bg-card">
          <div className="flex items-center justify-between p-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-bold text-foreground">Recent Enquiries</h2>
            </div>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border/60">
            {recentEnqs.length === 0 ? (
              <li className="p-4 text-sm text-muted-foreground text-center">No enquiries yet.</li>
            ) : (
              recentEnqs.map((enq) => (
                <li key={enq.id}>
                  <Link
                    href={`/admin/enquiries/${enq.id}`}
                    className="flex items-center justify-between p-3 hover:bg-secondary/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{enq.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {enq.service || "General"} · {enq.company || "—"}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-[10px] text-muted-foreground">{formatDate(enq.createdAt)}</p>
                      {enq.status === "new" && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-500">
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

      {/* Tip */}
      <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-4 flex items-start gap-3">
        <TrendingUp className="h-5 w-5 text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-foreground">Pro tip</p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
            Submissions with spam score ≥ 50 are auto-flagged and sent to the{" "}
            <Link href="/admin/spam" className="text-accent font-semibold hover:underline">
              spam folder
            </Link>
            . Check it occasionally — legitimate submissions may be misflagged.
          </p>
        </div>
      </div>
    </div>
  );
}
