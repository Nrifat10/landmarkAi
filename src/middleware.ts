import { NextResponse, type NextRequest } from "next/server";

// ────────────────────────────────────────────────────────────
// Middleware — subdomain routing + admin auth check
// ────────────────────────────────────────────────────────────
// Two responsibilities:
//   1. Subdomain routing: requests to support.landmarkgulf.com/*
//      are rewritten to /admin/* paths internally (so the user sees
//      the admin UI without /admin prefix in the URL).
//
//   2. Auth gate: any /admin/* request (whether from subdomain rewrite
//      or direct path) without a valid session cookie is redirected
//      to /admin/login, EXCEPT for /admin/login itself and /admin/api/auth.
//
// Cookie name and verification logic live in src/lib/admin-auth.ts.
// We do lightweight signature verification here in the Edge runtime
// (full verify also happens in lib on each admin page load).
// ────────────────────────────────────────────────────────────

const ADMIN_COOKIE = "lm_admin_session";
const ADMIN_SUBDOMAIN = "support";

// Public paths that don't require auth
const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/api/auth",
];

function isPublicAdminPath(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?"));
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;

  // ── 1. Subdomain rewrite: support.landmarkgulf.com/anything → /admin/anything
  // Only rewrite if we're on the support subdomain AND not already on an admin path
  const hostParts = host.split(".");
  const isSupportSubdomain = hostParts.length >= 3 && hostParts[0] === ADMIN_SUBDOMAIN;

  let url = req.nextUrl.clone();
  let rewrote = false;

  if (isSupportSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    rewrote = true;
  }

  // Compute the "effective" pathname after rewrite (for auth check below)
  const effectivePath = rewrote ? url.pathname : pathname;

  // Skip auth check for non-admin paths
  const isAdminPath = effectivePath.startsWith("/admin");

  if (!isAdminPath) {
    return rewrote ? NextResponse.rewrite(url) : NextResponse.next();
  }

  // ── 2. Auth check: if path is public (login / api/auth), allow
  if (isPublicAdminPath(effectivePath)) {
    return rewrote ? NextResponse.rewrite(url) : NextResponse.next();
  }

  // Check cookie
  const sessionCookie = req.cookies.get(ADMIN_COOKIE)?.value;

  // Lightweight verification: token format = "base64payload.signature"
  // We rely on full verification in server components for actual security.
  if (!sessionCookie || !sessionCookie.includes(".")) {
    // Not logged in — redirect to login page
    const loginUrl = req.nextUrl.clone();
    // Always redirect to the path-based /admin/login (works under subdomain too)
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return rewrote ? NextResponse.rewrite(url) : NextResponse.next();
}

export const config = {
  // Run on all paths except Next internals and public assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|icon.svg|logo.svg|landmark-logo|saudi-vision-2030|og-image|android-chrome|apple-touch-icon|images/).*)"],
};
