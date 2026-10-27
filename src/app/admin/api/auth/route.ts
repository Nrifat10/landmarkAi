import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setSessionCookie, clearSessionCookie } from "@/lib/admin-auth";

// POST /admin/api/auth/login
// Body: { password: string }
// Sets HTTP-only cookie on success
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!checkPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    await setSessionCookie();
    return NextResponse.json(
      { success: true, message: "Logged in." },
      { status: 200, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  } catch (error) {
    console.error("[auth/login] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  }
}

// DELETE /admin/api/auth — logout
export async function DELETE() {
  try {
    await clearSessionCookie();
    return NextResponse.json(
      { success: true, message: "Logged out." },
      { status: 200, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  } catch (error) {
    console.error("[auth/logout] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405, headers: { "X-Robots-Tag": "noindex, nofollow" } }
  );
}
