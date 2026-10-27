import { db, ensureSchema } from "@/lib/db";
import { EnquiriesTable } from "./enquiries-table";

export const metadata = { title: "Contact Enquiries", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  await ensureSchema();
  const sp = await searchParams;
  const status = sp.status || "all";
  const search = sp.search || "";
  const page = Math.max(1, parseInt(sp.page || "1", 10));
  const pageSize = 20;

  const where: Record<string, unknown> = {};
  if (status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { service: { contains: search, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    db.contactEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.contactEnquiry.count({ where }),
  ]);

  const [newCount, spamCount, allCount] = await Promise.all([
    db.contactEnquiry.count({ where: { status: "new" } }),
    db.contactEnquiry.count({ where: { status: "spam" } }),
    db.contactEnquiry.count(),
  ]);

  return (
    <EnquiriesTable
      items={items.map((e) => ({ ...e, createdAt: e.createdAt.toISOString() }))}
      pagination={{
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      }}
      filters={{ status, search, newCount, spamCount, allCount }}
    />
  );
}
