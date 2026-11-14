import { notFound } from "next/navigation";
import Link from "next/link";
import { db, ensureSchema } from "@/lib/db";
import { EnquiryDetailClient } from "./detail-client";

export const metadata = { title: "Enquiry Detail", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await ensureSchema();
  const { id } = await params;
  const enquiry = await db.contactEnquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  // Opening a "new" enquiry automatically marks it as read —
  // mirrors the GET /admin/api/enquiries/[id] behaviour. The HR
  // team can always set it back via "Mark as Unread" in the detail view.
  if (enquiry.status === "new") {
    await db.contactEnquiry.update({ where: { id }, data: { status: "read" } });
    enquiry.status = "read";
  }

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
        >
          ← Back to enquiries
        </Link>
      </div>

      <EnquiryDetailClient enquiry={JSON.parse(JSON.stringify(enquiry))} />
    </div>
  );
}
