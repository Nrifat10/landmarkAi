import Link from "next/link";
import { db, ensureSchema } from "@/lib/db";
import { Download, Briefcase, Mail } from "lucide-react";

export const metadata = { title: "Export CSV", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ExportPage() {
  await ensureSchema();
  const [appsCount, enqsCount] = await Promise.all([
    db.jobApplication.count({ where: { status: { in: ["new", "read", "archived"] } } }),
    db.contactEnquiry.count({ where: { status: { in: ["new", "read", "archived"] } } }),
  ]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
          <Download className="h-7 w-7 text-accent" />
          Export to CSV
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Download submissions as CSV — opens directly in Excel or Google Sheets.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/api/export?type=applications"
          className="group rounded-xl border-2 border-border/70 bg-card p-6 hover:border-accent/40 hover:shadow-md transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3">
            <Briefcase className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Job Applications</p>
          <p className="text-2xl font-extrabold text-foreground mt-1">{appsCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Download as CSV →</p>
          <p className="mt-3 text-[10px] text-muted-foreground/70">
            Columns: ID, Date, Name, Email, Phone, Nationality, Position, Experience, Iqama, Languages, Certifications, Notice Period, Message, Status, Spam Score, IP
          </p>
        </Link>

        <Link
          href="/admin/api/export?type=enquiries"
          className="group rounded-xl border-2 border-border/70 bg-card p-6 hover:border-accent/40 hover:shadow-md transition-all"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-3">
            <Mail className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact Enquiries</p>
          <p className="text-2xl font-extrabold text-foreground mt-1">{enqsCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Download as CSV →</p>
          <p className="mt-3 text-[10px] text-muted-foreground/70">
            Columns: ID, Date, Name, Email, Phone, Company, Service, Message, Status, Spam Score, IP
          </p>
        </Link>
      </div>

      <div className="rounded-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-4">
        <p className="text-sm font-bold text-foreground">Notes</p>
        <ul className="mt-2 text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
          <li>Spam-flagged submissions are excluded from export by default.</li>
          <li>CSV file uses comma-separated values with quoted text fields.</li>
          <li>Excel will open it directly — File → Open, or double-click the downloaded file.</li>
          <li>Date is in ISO 8601 format (sortable in Excel).</li>
        </ul>
      </div>
    </div>
  );
}
