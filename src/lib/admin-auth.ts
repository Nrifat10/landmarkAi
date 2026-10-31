import { cookies } from "next/headers";
import { createHmac } from "crypto";

// ────────────────────────────────────────────────────────────
// Admin authentication helpers
// ────────────────────────────────────────────────────────────
// Simple JWT-like signed-token auth. Token = base64(payload) + "." + HMAC.
// Stored in HTTP-only, SameSite=strict cookie named "lm_admin_session".
//
// The password is read from env var ADMIN_PASSWORD — set in Vercel:
//   Vercel → Project → Settings → Environment Variables → ADMIN_PASSWORD
//
// Token expiry: 24 hours. Client-side idle auto-logout (30 min) also applies.
// ────────────────────────────────────────────────────────────

const COOKIE_NAME = "lm_admin_session";
// Token TTL reduced from 7 days to 24 hours for better security.
// Combined with client-side idle auto-logout (30 min inactivity) in
// admin-shell.tsx, this keeps abandoned sessions short-lived.
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSigningSecret(): string {
  // Use ADMIN_PASSWORD itself as the HMAC key — no separate secret needed
  return process.env.ADMIN_PASSWORD || "fallback-dev-only-secret-change-me";
}

function sign(payload: string): string {
  const hmac = createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
  return hmac;
}

function base64Encode(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64url");
}

function base64Decode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf-8");
}

export function createSessionToken(): string {
  const payload = JSON.stringify({
    role: "admin",
    issuedAt: Date.now(),
    expiresAt: Date.now() + TOKEN_TTL_MS,
  });
  const encoded = base64Encode(payload);
  const sig = sign(encoded);
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encoded, sig] = parts;

  // Verify signature (timing-safe-ish)
  const expectedSig = sign(encoded);
  if (sig.length !== expectedSig.length) return false;
  // Constant-time compare
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  if (diff !== 0) return false;

  // Decode payload and check expiry
  try {
    const payload = JSON.parse(base64Decode(encoded));
    if (payload.role !== "admin") return false;
    if (typeof payload.expiresAt !== "number") return false;
    if (Date.now() > payload.expiresAt) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function setSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const token = createSessionToken();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TOKEN_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("[auth] ADMIN_PASSWORD env var is not set");
    return false;
  }
  // Constant-time compare to avoid timing attacks
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) {
    diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export { COOKIE_NAME };
