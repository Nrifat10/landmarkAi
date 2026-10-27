import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAuthenticated } from "@/lib/admin-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const enquiry = await db.contactEnquiry.findUnique({ where: { id } });

  if (!enquiry) {
    return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  }

  if (enquiry.status === "new") {
    await db.contactEnquiry.update({ where: { id }, data: { status: "read" } });
    enquiry.status = "read";
  }

  return NextResponse.json({ success: true, enquiry });
}

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

  if (!["new", "read", "spam", "archived"].includes(status)) {
    return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await db.contactEnquiry.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error("[admin/enquiries/PATCH]", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await db.contactEnquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/enquiries/DELETE]", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 404 });
  }
}
