import Link from "next/link";
import { db } from "@/lib/db";
import { ShieldAlert, Briefcase, Mail, Eye, ShieldOff } from "lucide-react";

export const metadata = { title: "Spam Folder", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function SpamPage() {
  const [spamApps, spamEnqs] = await Promise.all([
    db.jobApplication.findMany({
      where: { status: "spam" },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    db.contactEnquiry.findMany({
      where: { status: "spam" },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const total = spamApps.length + spamEnqs.length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
          <ShieldAlert className="h-7 w-7 text-amber-500" />
          Spam Folder
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {total} submission{total !== 1 ? "s" : ""} auto-flagged as spam. Check occasionally for false positives.
        </p>
      </div>

      {total === 0 ? (
        <div className="rounded-xl border-2 border-border/70 bg-card p-12 text-center">
          <ShieldAlert className="h-10 w-10 mx-auto text-muted-foreground/40" />
          <p className="mt-3 text-sm font-bold text-foreground">No spam</p>
          <p className="text-xs text-muted-foreground mt-1">Spam-flagged submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {spamApps.length > 0 && (
            <div className="rounded-xl border-2 border-border/70 bg-card overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-border/60">
                <Briefcase className="h-4 w-4 text-amber-500" />
                <h2 className="text-sm font-bold text-foreground">Job Applications ({spamApps.length})</h2>
              </div>
              <ul className="divide-y divide-border/60">
                {spamApps.map((app) => (
                  <li key={app.id}>
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="flex items-center justify-between p-3 hover:bg-amber-500/5 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{app.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {app.jobTitle} · {app.email}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-[10px] font-bold text-amber-500">Score: {app.spamScore}/100</p>
                        <p className="text-[10px] text-muted-foreground">{formatDate(app.createdAt)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {spamEnqs.length > 0 && (
            <div className="rounded-xl border-2 border-border/70 bg-card overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-border/60">
                <Mail className="h-4 w-4 text-amber-500" />
                <h2 className="text-sm font-bold text-foreground">Contact Enquiries ({spamEnqs.length})</h2>
              </div>
              <ul className="divide-y divide-border/60">
                {spamEnqs.map((enq) => (
                  <li key={enq.id}>
                    <Link
                      href={`/admin/enquiries/${enq.id}`}
                      className="flex items-center justify-between p-3 hover:bg-amber-500/5 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{enq.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {enq.company || enq.service || "General"} · {enq.email}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-[10px] font-bold text-amber-500">Score: {enq.spamScore}/100</p>
                        <p className="text-[10px] text-muted-foreground">{formatDate(enq.createdAt)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-4 flex items-start gap-3">
            <ShieldOff className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground">To restore a false positive</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Open the submission detail page and click &ldquo;Mark as read&rdquo; — it will move out of spam and back to your main list.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
