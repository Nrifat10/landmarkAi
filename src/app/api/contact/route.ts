import { NextRequest, NextResponse } from "next/server";

// Rate limiting — simple in-memory counter (per server instance)
// Resets every 10 minutes. Note: serverless instances each have their own state,
// so this is best-effort protection (good enough for general bot defense).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; firstHit: number }>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

// Fallback key — used if env var is not set. This is still private because
// the file lives only on the server, never sent to the browser.
// Updated 2026-10-27 — same active Web3Forms access key used by the job application form.
const FALLBACK_WEB3FORMS_KEY = "a4cca705-45da-4728-b9b2-5cb0c214c544";

// Resolve the Web3Forms access key from any of the env vars the user may have set.
// The user added NEXT_PUBLIC_WEB3FORMS_KEY in Vercel — server route handlers can
// read NEXT_PUBLIC_ vars fine. Falls back to the hardcoded key if none are set.
function resolveAccessKey(): string {
  return (
    process.env.WEB3FORMS_CONTACT_KEY ||
    process.env.WEB3FORMS_JOBS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY ||
    FALLBACK_WEB3FORMS_KEY
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check
    const clientIp = getClientIp(req);
    const now = Date.now();
    const entry = ipHits.get(clientIp);

    let isLimited = false;
    if (!entry || now - entry.firstHit > RATE_LIMIT_WINDOW_MS) {
      ipHits.set(clientIp, { count: 1, firstHit: now });
    } else {
      entry.count += 1;
      if (entry.count > RATE_LIMIT_MAX) {
        isLimited = true;
      }
    }

    if (isLimited) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Cleanup old entries (lazy cleanup, no setInterval)
    if (ipHits.size > 1000) {
      for (const [ip, e] of ipHits.entries()) {
        if (now - e.firstHit > RATE_LIMIT_WINDOW_MS) {
          ipHits.delete(ip);
        }
      }
    }

    // 2. Parse body
    const body = await req.json();
    const { name, email, phone, company, service, message, botcheck, formStartTime } = body;

    // 3. Honeypot check — bots fill hidden fields
    if (botcheck) {
      return NextResponse.json(
        { success: false, message: "Submission rejected." },
        { status: 400 }
      );
    }

    // 4. Time-based check — humans take >3s to fill a form
    // Skip check if formStartTime is invalid (e.g., clock skew)
    if (formStartTime && typeof formStartTime === "number" && formStartTime > 0) {
      const elapsed = now - formStartTime;
      // Only reject if elapsed is positive AND less than 3s (catches instant bots, ignores clock skew)
      if (elapsed > 0 && elapsed < 3000) {
        return NextResponse.json(
          { success: false, message: "Form submitted too quickly. Please try again." },
          { status: 400 }
        );
      }
    }

    // 5. Required field validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // 6. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 7. Get the Web3Forms key — from env var (any name), fallback to hardcoded
    const accessKey = resolveAccessKey();

    if (!accessKey || accessKey === "undefined") {
      console.error("[contact] Web3Forms key not configured");
      return NextResponse.json(
        { success: false, message: "Form not configured. Please contact us directly at info@landmarkgulf.com" },
        { status: 500 }
      );
    }

    console.log("[contact] Submitting to Web3Forms", {
      keySuffix: accessKey.slice(-8),
      emailDomain: email.split("@")[1] || "unknown",
    });

    // 8. Forward to Web3Forms with PRIVATE key
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Enquiry — Landmark Inter Gulf LLC Website",
        from_name: "Landmark Inter Gulf — Contact Form",
        name,
        email,
        phone: phone || "Not provided",
        company: company || "Not provided",
        service: service || "Not specified",
        message,
        replyto: email,
      }),
    });

    let result: { success?: boolean; message?: string } = {};
    const responseText = await web3formsResponse.text();
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("[contact] Web3Forms returned non-JSON response", {
        status: web3formsResponse.status,
        contentType: web3formsResponse.headers.get("content-type"),
        bodyPreview: responseText.slice(0, 200),
      });
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't reach the email service. Please try again later or email us at info@landmarkgulf.com",
        },
        { status: 502 }
      );
    }

    if (!web3formsResponse.ok || !result.success) {
      console.error("[contact] Web3Forms submission failed:", {
        status: web3formsResponse.status,
        statusText: web3formsResponse.statusText,
        success: result.success,
        message: result.message,
        keySuffix: accessKey ? accessKey.slice(-8) : "(none)",
      });
    } else {
      console.log("[contact] Submission SUCCESS", { keySuffix: accessKey.slice(-8) });
    }

    if (web3formsResponse.ok && result.success) {
      return NextResponse.json({
        success: true,
        message: "Enquiry submitted successfully.",
      });
    }

    return NextResponse.json(
      { success: false, message: result.message || "Submission failed. Please try again." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[contact] API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later or email us at info@landmarkgulf.com" },
      { status: 500 }
    );
  }
}
