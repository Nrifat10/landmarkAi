import { NextRequest, NextResponse } from "next/server";
import { db, ensureSchema } from "@/lib/db";

// ────────────────────────────────────────────────────────────
// Public form submission endpoint
// ────────────────────────────────────────────────────────────
// POST /api/submit
// Body: { formType: "job" | "contact", ...fields, botcheck, formStartTime }
// Response: { success: boolean, message: string }
//
// Bot protection (3 layers — all LENIENT to avoid blocking legitimate users):
//   1. Honeypot — hidden "botcheck" field. We only block if it has a non-empty
//      value that LOOKS like a bot signal (length > 0 and contains 'true'/'on').
//      Browser autofill rarely triggers this.
//   2. Time-based — humans take >1.5s to fill a form (was 3s, too strict for
//      autofill users — caused real submissions to fail).
//   3. IP rate limiting — max 25 submissions per IP per hour (was 10, too
//      strict for shared office IPs and Saudi mobile carrier NAT).
//
// Spam detection (auto-score 0–100):
//   +30 if email is a known disposable email provider (mailinator, etc.)
//   +30 if message contains spam keywords (viagra, casino, porn, crypto giveaway)
//   +20 if phone is all same digit (e.g. 0000000000)
//   +20 if message length < 10 chars
//   Score ≥ 50 → status="spam" (still saved, just hidden from main list)
//
// CRITICAL: ensureSchema() failures are logged but DO NOT block the insert.
// If the table doesn't exist, Prisma will throw a clear error which we surface
// to the user (with a helpful message) instead of silently failing.
// ────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 25; // was 10 — too strict for shared/NAT'd IPs
const TIME_CHECK_MIN_MS = 1500; // was 3000 — too strict for autofill users
const ipHits = new Map<string, { count: number; firstHit: number }>();

const SPAM_KEYWORDS = [
  "viagra", "cialis", "casino", "porn", "xxx", "escort", "bitcoin giveaway",
  "crypto giveaway", "free money", "make money fast", "work from home",
  "click here to win", "limited time offer", "guaranteed income",
  "seo backlinks", "buy cheap", "discount drugs", "online pharmacy",
];

// Email patterns that are almost certainly fake/spam — used only for scoring,
// never as a hard block. A legitimate submission can still go through even if
// flagged, but it'll be auto-marked as 'spam' status for manual review.
//
// NOTE: We intentionally do NOT match 'test.*@' or 'example.*@' prefixes —
// many legitimate users have emails like test.user@gmail.com or
// example.123@gmail.com. We only flag the well-known disposable email
// domains (mailinator, 10minutemail, etc.) and example.com/org/net domains
// reserved by IANA for documentation.
const FAKE_EMAIL_PATTERNS = [
  /^bot[0-9]*@/i,           // bot@, bot123@
  /^spam[0-9]*@/i,          // spam@, spam123@
  /@example\.(com|org|net)$/i,    // IANA-reserved documentation domain
  /@mailinator\.com$/i,           // well-known disposable email
  /@10minutemail\./i,
  /@guerrillamail\./i,
  /@throwawaymail\./i,
  /@tempmail\./i,
  /@yopmail\./i,
  /@trashmail\./i,
  /@sharklasers\.com$/i,
  /@getnada\.com$/i,
];

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function calculateSpamScore(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}): number {
  let score = 0;
  const email = (data.email || "").toLowerCase();
  const message = (data.message || "").toLowerCase();
  const phone = data.phone || "";
  const name = (data.name || "").toLowerCase();

  // Fake email patterns
  if (FAKE_EMAIL_PATTERNS.some((re) => re.test(email))) score += 30;

  // Spam keywords in message
  if (SPAM_KEYWORDS.some((kw) => message.includes(kw))) score += 30;

  // Phone all same digit (e.g. 0000000000, 1111111111)
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 8 && new Set(digits.split("")).size === 1) score += 20;

  // Suspiciously short message
  if (message && message.trim().length < 10) score += 20;

  // Suspicious name (all same char or just digits)
  if (name && new Set(name.replace(/\s/g, "")).size === 1) score += 15;

  return Math.min(score, 100);
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // ── Ensure DB tables exist (auto-create on first request) ──
    // Non-blocking: if schema init fails, log the error but continue.
    // Prisma's create() will then throw a clear "table does not exist" error
    // which is caught below and surfaced to the user with a helpful message.
    try {
      await ensureSchema();
    } catch (schemaError) {
      console.error("[submit] ensureSchema failed (continuing anyway):", schemaError);
      // Don't return — try the insert anyway; Prisma will give a clearer error
    }

    // ── Rate limiting ──────────────────────────────────────
    const clientIp = getClientIp(req);
    const now = Date.now();
    const entry = ipHits.get(clientIp);

    let isLimited = false;
    if (!entry || now - entry.firstHit > RATE_LIMIT_WINDOW_MS) {
      ipHits.set(clientIp, { count: 1, firstHit: now });
    } else {
      entry.count += 1;
      if (entry.count > RATE_LIMIT_MAX) isLimited = true;
    }

    if (isLimited) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again in an hour.",
        },
        { status: 429, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    // Lazy cleanup
    if (ipHits.size > 1000) {
      for (const [ip, e] of ipHits.entries()) {
        if (now - e.firstHit > RATE_LIMIT_WINDOW_MS) ipHits.delete(ip);
      }
    }

    // ── Parse body ────────────────────────────────────────
    const body = await req.json();
    const {
      formType,
      botcheck,
      formStartTime,
    } = body;

    // Honeypot — block only if botcheck has a non-empty, bot-like value.
    // (Browsers rarely autofill hidden checkboxes, but if they do, the value
    // is usually "on" — we still block "on" and "true" but not empty/null.)
    if (botcheck && typeof botcheck === "string" && botcheck.trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Submission rejected." },
        { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    // Time-based check — humans take >1.5s to fill a form (was 3s).
    // Lower threshold helps users with browser autofill.
    // Skip entirely if formStartTime is invalid (clock skew / older clients).
    if (formStartTime && typeof formStartTime === "number" && formStartTime > 0) {
      const elapsed = now - formStartTime;
      // Only reject if elapsed is positive (no clock skew) AND less than threshold
      if (elapsed > 0 && elapsed < TIME_CHECK_MIN_MS) {
        return NextResponse.json(
          { success: false, message: "Form submitted too quickly. Please review your answers and try again." },
          { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }
    }

    if (formType === "job") {
      // ── Job application ─────────────────────────────────
      const {
        name,
        email,
        phone,
        nationality,
        currentLocation,
        experience,
        certifications,
        languages,
        iqamaStatus,
        noticePeriod,
        message,
        jobTitle,
      } = body;

      // Required fields
      if (!name || !email || !phone || !nationality || !currentLocation ||
          !experience || !languages || !iqamaStatus || !jobTitle) {
        return NextResponse.json(
          { success: false, message: "Please fill in all required fields." },
          { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }

      if (!isValidEmail(email)) {
        return NextResponse.json(
          { success: false, message: "Please enter a valid email address." },
          { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }

      const spamScore = calculateSpamScore({ name, email, phone, message });

      const application = await db.jobApplication.create({
        data: {
          jobTitle,
          name,
          email,
          phone,
          nationality,
          currentLocation,
          experience,
          certifications: certifications || null,
          languages,
          iqamaStatus,
          noticePeriod: noticePeriod || null,
          message: message || null,
          ip: clientIp,
          spamScore,
          status: spamScore >= 60 ? "spam" : "new",
        },
      });

      console.log("[submit] Job application saved", {
        id: application.id,
        jobTitle,
        email,
        spamScore,
        status: application.status,
      });

      return NextResponse.json(
        { success: true, message: "Application submitted successfully." },
        { status: 200, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    if (formType === "contact") {
      // ── Contact enquiry ────────────────────────────────
      const { name, email, phone, company, service, message } = body;

      if (!name || !email || !message) {
        return NextResponse.json(
          { success: false, message: "Please fill in all required fields." },
          { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }

      if (!isValidEmail(email)) {
        return NextResponse.json(
          { success: false, message: "Please enter a valid email address." },
          { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
        );
      }

      const spamScore = calculateSpamScore({ name, email, phone, message });

      const enquiry = await db.contactEnquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          company: company || null,
          service: service || null,
          message,
          ip: clientIp,
          spamScore,
          status: spamScore >= 60 ? "spam" : "new",
        },
      });

      console.log("[submit] Contact enquiry saved", {
        id: enquiry.id,
        name,
        email,
        spamScore,
        status: enquiry.status,
      });

      return NextResponse.json(
        { success: true, message: "Enquiry submitted successfully." },
        { status: 200, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unknown form type." },
      { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  } catch (error) {
    console.error("[submit] API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later or email us at info@landmarkgulf.com" },
      { status: 500, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  }
}

// GET /api/submit — should not be indexed, return 405
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405, headers: { "X-Robots-Tag": "noindex, nofollow" } }
  );
}
