import { NextRequest, NextResponse } from "next/server";
import { db, ensureSchema } from "@/lib/db";
import { isAuthenticated } from "@/lib/admin-auth";

// ────────────────────────────────────────────────────────────
// /admin/api/notifications
// ────────────────────────────────────────────────────────────
// Unified notifications feed for the admin header bell.
// Merges "new" (unread) job applications + contact enquiries,
// sorted by createdAt desc, with a per-item type + href so the
// dropdown can deep-link into the right detail page.
//
//   GET   /admin/api/notifications?limit=8
//         → { success, items: NotifItem[], unreadCount, counts }
//
//   PATCH /admin/api/notifications
//         → marks every "new" record as "read" in both tables
//         → { success, markedRead }
// ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();

  const url = new URL(req.url);
  const limit = Math.min(20, Math.max(1, parseInt(url.searchParams.get("limit") || "8", 10)));

  const [apps, enqs, appUnread, enqUnread] = await Promise.all([
    db.jobApplication.findMany({
      where: { status: "new" },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, name: true, jobTitle: true, createdAt: true },
    }),
    db.contactEnquiry.findMany({
      where: { status: "new" },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, name: true, service: true, company: true, createdAt: true },
    }),
    db.jobApplication.count({ where: { status: "new" } }),
    db.contactEnquiry.count({ where: { status: "new" } }),
  ]);

  type NotifItem = {
    id: string;
    type: "application" | "enquiry";
    recordId: string;
    name: string;
    summary: string;
    href: string;
    createdAt: string;
  };

  const items: NotifItem[] = [
    ...apps.map((a) => ({
      id: `application:${a.id}`,
      type: "application" as const,
      recordId: a.id,
      name: a.name || "Applicant",
      summary: a.jobTitle || "Job application",
      href: `/admin/applications/${a.id}`,
      createdAt: a.createdAt.toISOString(),
    })),
    ...enqs.map((e) => ({
      id: `enquiry:${e.id}`,
      type: "enquiry" as const,
      recordId: e.id,
      name: e.name || "Sender",
      summary: e.service || e.company || "Contact enquiry",
      href: `/admin/enquiries/${e.id}`,
      createdAt: e.createdAt.toISOString(),
    })),
  ]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);

  return NextResponse.json({
    success: true,
    items,
    unreadCount: appUnread + enqUnread,
    counts: { applications: appUnread, enquiries: enqUnread },
  });
}

// Mark all "new" records as "read" in both tables at once.
export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();

  // Ignore body — we always mark ALL new items as read.
  const [apps, enqs] = await Promise.all([
    db.jobApplication.updateMany({ where: { status: "new" }, data: { status: "read" } }),
    db.contactEnquiry.updateMany({ where: { status: "new" }, data: { status: "read" } }),
  ]);

  const markedRead = (apps.count || 0) + (enqs.count || 0);

  return NextResponse.json({ success: true, markedRead });
}
