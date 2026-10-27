import { NextResponse, type NextRequest } from "next/server";

// ────────────────────────────────────────────────────────────
// Middleware — admin auth gate (with optional subdomain support)
// ────────────────────────────────────────────────────────────
//
// Responsibilities:
//   1. If the request is on the optional support.landmarkgulf.com subdomain,
//      rewrite /* to /admin/* internally (so the subdomain shows the admin UI).
//
//   2. For every /admin/* path (whether reached directly or via subdomain
//      rewrite), check the auth cookie. If missing/invalid → redirect to
//      /admin/login. /admin/login and /admin/api/auth are public.
//
// This middleware does NOT do full HMAC verification (Edge runtime limitation).
// Full verification happens in the layout/page server component.
// If the cookie is structurally valid here but HMAC-invalid server-side,
// the layout's isAuthenticated() returns false and redirects to login.
//
// IMPORTANT: To prevent redirect loops, the layout also redirects to /admin/login
// when unauthenticated. We must ensure /admin/login itself never redirects.
// ────────────────────────────────────────────────────────────

const ADMIN_COOKIE = "lm_admin_session";
const ADMIN_SUBDOMAIN = "support";

// Paths under /admin that DON'T require auth
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/api/auth"];

function isPublicAdminPath(pathname: string): boolean {
  // Strip trailing slash for consistent matching
  const normalized = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return PUBLIC_ADMIN_PATHS.some((p) => normalized === p || normalized.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const pathname = req.nextUrl.pathname;

  // ── 1. Subdomain rewrite (optional): support.landmarkgulf.com/anything → /admin/anything
  const hostParts = host.split(".");
  const isSupportSubdomain =
    hostParts.length >= 3 && hostParts[0] === ADMIN_SUBDOMAIN;

  let url = req.nextUrl.clone();
  let rewrote = false;

  if (isSupportSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    rewrote = true;
  }

  // Effective pathname after subdomain rewrite
  const effectivePath = rewrote ? url.pathname : pathname;

  // Pass the effective pathname downstream via a custom header so the admin
  // layout (server component) can read it without re-parsing the URL.
  // This lets the layout know which page it's rendering, e.g. /admin/login,
  // so it can skip the auth check for the login page and avoid a redirect loop.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-admin-pathname", effectivePath);

  // Only auth-gate paths that start with /admin
  if (!effectivePath.startsWith("/admin")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // ── 2. Public admin paths (login + auth API) — pass through, no redirect
  if (isPublicAdminPath(effectivePath)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // ── 3. Check the auth cookie
  const sessionCookie = req.cookies.get(ADMIN_COOKIE)?.value;

  // Lightweight check: cookie exists and has the "base64.signature" format.
  // Full HMAC verification happens in lib/admin-auth.ts on each page load.
  // If the signature is invalid there, the layout redirects to /admin/login.
  // To avoid a redirect loop, /admin/login itself is whitelisted above.
  const cookieLooksValid =
    typeof sessionCookie === "string" &&
    sessionCookie.length > 20 &&
    sessionCookie.includes(".") &&
    !sessionCookie.startsWith(".") &&
    !sessionCookie.endsWith(".");

  if (!cookieLooksValid) {
    // Not authenticated — redirect to /admin/login
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on all paths except Next internals, public assets, and API endpoints
  // that aren't /admin/api or /api/submit.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|favicon-|robots.txt|sitemap.xml|manifest.webmanifest|icon.svg|logo.svg|landmark-logo|saudi-vision-2030|og-image|android-chrome|apple-touch-icon|site.webmanifest|images/).*)",
  ],
};
