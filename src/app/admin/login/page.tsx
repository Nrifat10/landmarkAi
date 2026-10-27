import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { AdminLoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login — Landmark Inter Gulf",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // If already logged in, send to dashboard
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl bg-card border-2 border-accent/30 shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/landmark-logo-light.png"
              alt="Landmark Inter Gulf LLC"
              className="h-12 w-auto"
            />
          </div>

          <h1 className="text-2xl font-extrabold text-foreground text-center mb-1">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enter your password to access the dashboard
          </p>

          <AdminLoginForm />

          <div className="mt-6 pt-6 border-t border-border/60 text-center">
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
              Authorized HR personnel only. All access attempts are logged.
              <br />
              Need access? Email{" "}
              <a href="mailto:info@landmarkgulf.com" className="text-accent font-semibold hover:underline">
                info@landmarkgulf.com
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-primary-foreground/40 mt-4">
          © {new Date().getFullYear()} Landmark Inter Gulf LLC · Al Jubail, KSA
        </p>
      </div>
    </div>
  );
}
