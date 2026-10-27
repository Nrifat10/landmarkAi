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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-4 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl p-8">
          {/* Logo + brand */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 font-extrabold text-lg shadow-lg mb-3">
              LM
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50">
              HR Console
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Landmark Inter Gulf LLC
            </p>
          </div>

          {/* Subtle accent line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sign in to continue</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
          </div>

          <AdminLoginForm />

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Authorized HR personnel only. All access attempts are logged.
              <br />
              Need access? Email{" "}
              <a href="mailto:info@landmarkgulf.com" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                info@landmarkgulf.com
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-4">
          © {new Date().getFullYear()} Landmark Inter Gulf LLC · Al Jubail, KSA
        </p>
      </div>
    </div>
  );
}
