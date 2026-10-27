import { notFound } from "next/navigation";
import Link from "next/link";
import { db, ensureSchema } from "@/lib/db";
import { ApplicationDetailClient } from "./detail-client";

export const metadata = { title: "Application Detail", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await ensureSchema();
  const { id } = await params;
  const application = await db.jobApplication.findUnique({ where: { id } });

  if (!application) notFound();

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
        >
          ← Back to applications
        </Link>
      </div>

      <ApplicationDetailClient application={JSON.parse(JSON.stringify(application))} />
    </div>
  );
}
