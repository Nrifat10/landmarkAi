import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ────────────────────────────────────────────────────────────
// Public form submission endpoint
// ────────────────────────────────────────────────────────────
// POST /api/submit
// Body: { formType: "job" | "contact", ...fields, botcheck, formStartTime }
// Response: { success: boolean, message: string }
//
// Bot protection (3 layers):
//   1. Honeypot — hidden "botcheck" field that humans never fill
//   2. Time-based — humans take >3s to fill a form
//   3. IP rate limiting — max 10 submissions per IP per hour
//
// Spam detection (auto-score 0–100):
//   +30 if email looks fake (test@, example@, bot@)
//   +30 if message contains spam keywords (viagra, casino, porn, crypto giveaway)
//   +20 if phone is all same digit (e.g. 0000000000)
//   +20 if message length < 10 chars
//   Score ≥ 50 → status="spam" (hidden from main list)
// ────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;
const ipHits = new Map<string, { count: number; firstHit: number }>();

const SPAM_KEYWORDS = [
  "viagra", "cialis", "casino", "porn", "xxx", "escort", "bitcoin giveaway",
  "crypto giveaway", "free money", "make money fast", "work from home",
  "click here to win", "limited time offer", "guaranteed income",
  "seo backlinks", "buy cheap", "discount drugs", "online pharmacy",
];

const FAKE_EMAIL_PATTERNS = [
  /^test.*@/i, /^example.*@/i, /^bot.*@/i, /^spam.*@/i, /^temp.*@/i,
  /@example\.(com|org|net)$/i, /@test\.(com|org)$/i, /@mailinator\.com$/i,
  /@10minutemail\./i, /@guerrillamail\./i, /@throwawaymail\./i,
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

    // Honeypot — must be empty
    if (botcheck) {
      return NextResponse.json(
        { success: false, message: "Submission rejected." },
        { status: 400, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    // Time-based check — humans take >3s
    if (formStartTime && typeof formStartTime === "number" && formStartTime > 0) {
      const elapsed = now - formStartTime;
      if (elapsed > 0 && elapsed < 3000) {
        return NextResponse.json(
          { success: false, message: "Form submitted too quickly. Please try again." },
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
          status: spamScore >= 50 ? "spam" : "new",
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
          status: spamScore >= 50 ? "spam" : "new",
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
