import { db } from "@/lib/db";
import { ApplicationsTable } from "./applications-table";

export const metadata = { title: "Job Applications", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const status = sp.status || "all";
  const search = sp.search || "";
  const page = Math.max(1, parseInt(sp.page || "1", 10));
  const pageSize = 20;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { jobTitle: { contains: search, mode: "insensitive" } },
      { nationality: { contains: search, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    db.jobApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.jobApplication.count({ where }),
  ]);

  // Count for sidebar badges
  const [newCount, spamCount, allCount] = await Promise.all([
    db.jobApplication.count({ where: { status: "new" } }),
    db.jobApplication.count({ where: { status: "spam" } }),
    db.jobApplication.count(),
  ]);

  return (
    <ApplicationsTable
      items={items.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() }))}
      pagination={{
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      }}
      filters={{
        status,
        search,
        newCount,
        spamCount,
        allCount,
      }}
    />
  );
}
