import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/admin-auth";

// GET /admin/api/applications/[id] — fetch single application
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const application = await db.jobApplication.findUnique({ where: { id } });

  if (!application) {
    return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  }

  // Mark as read if it was new
  if (application.status === "new") {
    await db.jobApplication.update({ where: { id }, data: { status: "read" } });
    application.status = "read";
  }

  return NextResponse.json({ success: true, application });
}

// PATCH /admin/api/applications/[id] — update status
// Body: { status: "new" | "read" | "spam" | "archived" }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  const validStatuses = ["new", "read", "spam", "archived"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await db.jobApplication.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error("[admin/applications/PATCH]", error);
    return NextResponse.json({ success: false, message: "Not found or update failed" }, { status: 404 });
  }
}

// DELETE /admin/api/applications/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await db.jobApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/applications/DELETE]", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 404 });
  }
}
