import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { isAuthenticated } from "@/lib/admin-auth";
import { AdminShell } from "./admin-shell";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard — Landmark Inter Gulf",
    template: "%s — Admin Dashboard",
  },
  description: "Internal admin dashboard for Landmark Inter Gulf HR team.",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Read the effective pathname set by middleware (avoids auth-checking the
  // login page itself, which would cause a redirect loop).
  const headersList = await headers();
  const pathname = headersList.get("x-admin-pathname") || "";

  // /admin/login and /admin/api/auth are public — render without auth + without sidebar
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/") ||
      pathname === "/admin/api/auth" || pathname.startsWith("/admin/api/auth/")) {
    return <>{children}</>;
  }

  // All other /admin/* paths require auth
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
