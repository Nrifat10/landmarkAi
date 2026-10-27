import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/admin-auth";

// GET /admin/api/export?type=applications|enquiries
// Returns CSV download with X-Robots-Tag: noindex header.
export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "applications";

  const noindexHeaders = {
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };

  function escapeCsv(value: string | null | undefined): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  function buildCsv(headers: string[], rows: (string | null)[][]): string {
    const lines = [headers.map(escapeCsv).join(",")];
    for (const row of rows) {
      lines.push(row.map(escapeCsv).join(","));
    }
    return lines.join("\r\n");
  }

  if (type === "applications") {
    const items = await db.jobApplication.findMany({
      where: { status: { in: ["new", "read", "archived"] } },
      orderBy: { createdAt: "desc" },
    });

    const csv = buildCsv(
      [
        "ID", "Date", "Name", "Email", "Phone", "Nationality",
        "Current Location", "Position", "Experience", "Iqama Status",
        "Languages", "Certifications", "Notice Period",
        "Message", "Status", "Spam Score", "IP Address",
      ],
      items.map((a) => [
        a.id,
        a.createdAt.toISOString(),
        a.name, a.email, a.phone, a.nationality,
        a.currentLocation, a.jobTitle, a.experience, a.iqamaStatus,
        a.languages, a.certifications, a.noticePeriod,
        a.message, a.status, String(a.spamScore), a.ip,
      ])
    );

    return new NextResponse(csv, {
      status: 200,
      headers: {
        ...noindexHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="job-applications-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  if (type === "enquiries") {
    const items = await db.contactEnquiry.findMany({
      where: { status: { in: ["new", "read", "archived"] } },
      orderBy: { createdAt: "desc" },
    });

    const csv = buildCsv(
      [
        "ID", "Date", "Name", "Email", "Phone", "Company",
        "Service", "Message", "Status", "Spam Score", "IP Address",
      ],
      items.map((e) => [
        e.id,
        e.createdAt.toISOString(),
        e.name, e.email, e.phone, e.company,
        e.service, e.message, e.status, String(e.spamScore), e.ip,
      ])
    );

    return new NextResponse(csv, {
      status: 200,
      headers: {
        ...noindexHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="contact-enquiries-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400, headers: noindexHeaders });
}
