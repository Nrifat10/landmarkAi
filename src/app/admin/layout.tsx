import type { Metadata } from "next";
import { redirect } from "next/navigation";
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
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
