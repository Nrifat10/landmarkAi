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
const FALLBACK_WEB3FORMS_KEY = "d522346a-fd18-4658-888a-82adafcf7bdd";

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

    // 7. Get the Web3Forms key — from env var, fallback to hardcoded
    const accessKey = process.env.WEB3FORMS_CONTACT_KEY || FALLBACK_WEB3FORMS_KEY;

    if (!accessKey || accessKey === "undefined") {
      console.error("WEB3FORMS_CONTACT_KEY not configured");
      return NextResponse.json(
        { success: false, message: "Form not configured. Please contact us directly at info@landmarkgulf.com" },
        { status: 500 }
      );
    }

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

    const result = await web3formsResponse.json();

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
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later or email us at info@landmarkgulf.com" },
      { status: 500 }
    );
  }
}
