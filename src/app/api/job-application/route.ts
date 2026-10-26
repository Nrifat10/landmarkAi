import { NextRequest, NextResponse } from "next/server";

// Rate limiting — simple in-memory counter (per server instance)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window
const RATE_LIMIT_MAX = 10; // 10 applications per IP per hour
const ipHits = new Map<string, { count: number; firstHit: number }>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

// Fallback Web3Forms key — kept private because this file lives only on the server
// and is never sent to the browser. Used if env var is not set.
const FALLBACK_WEB3FORMS_KEY = "d522346a-fd18-4658-888a-82adafcf7bdd";

// Resolve the Web3Forms access key from any of the env vars the user may have set
// in Vercel. The user's screenshot shows they added NEXT_PUBLIC_WEB3FORMS_KEY —
// so we check that too. Server route handlers can read NEXT_PUBLIC_ vars fine.
function resolveAccessKey(): string {
  return (
    process.env.WEB3FORMS_JOBS_KEY ||
    process.env.WEB3FORMS_CONTACT_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY ||
    FALLBACK_WEB3FORMS_KEY
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting — allows real users to apply, blocks spam
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
          message: "Too many applications submitted. Please try again in an hour.",
        },
        { status: 429 }
      );
    }

    // Lazy cleanup of old entries
    if (ipHits.size > 1000) {
      for (const [ip, e] of ipHits.entries()) {
        if (now - e.firstHit > RATE_LIMIT_WINDOW_MS) {
          ipHits.delete(ip);
        }
      }
    }

    // 2. Parse body
    const body = await req.json();
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
      botcheck,
      formStartTime,
    } = body;

    // 3. Honeypot check — bots fill hidden fields
    if (botcheck) {
      return NextResponse.json(
        { success: false, message: "Submission rejected." },
        { status: 400 }
      );
    }

    // 4. Time-based check — humans take >3s to fill a form
    if (formStartTime && typeof formStartTime === "number" && formStartTime > 0) {
      const elapsed = now - formStartTime;
      if (elapsed > 0 && elapsed < 3000) {
        return NextResponse.json(
          { success: false, message: "Form submitted too quickly. Please try again." },
          { status: 400 }
        );
      }
    }

    // 5. Required field validation
    if (!name || !email || !phone || !nationality || !currentLocation || !experience || !languages || !iqamaStatus || !jobTitle) {
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
      console.error("[job-application] Web3Forms key not configured");
      return NextResponse.json(
        { success: false, message: "Application system not configured. Please contact us at info@landmarkgulf.com" },
        { status: 500 }
      );
    }

    // Debug log — only the key suffix is logged so the secret is not exposed
    console.log("[job-application] Submitting to Web3Forms", {
      keySuffix: accessKey.slice(-8),
      jobTitle,
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
        subject: `New Job Application: ${jobTitle} — Landmark Inter Gulf LLC`,
        from_name: "Landmark Inter Gulf — Jobs Page",
        name,
        email,
        phone,
        nationality,
        current_location: currentLocation,
        experience,
        certifications: certifications || "Not provided",
        languages,
        iqama_visa_status: iqamaStatus,
        notice_period: noticePeriod || "Not provided",
        message: message || "—",
        job_title: jobTitle,
        company: "Landmark Inter Gulf LLC",
        replyto: email,
      }),
    });

    // Web3Forms should return JSON; if we get HTML (network error page),
    // catch the JSON.parse failure so the user sees a meaningful message
    let result: { success?: boolean; message?: string } = {};
    const responseText = await web3formsResponse.text();
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("[job-application] Web3Forms returned non-JSON response", {
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

    // Detailed server-side logging so failures are debuggable in Vercel logs
    if (!web3formsResponse.ok || !result.success) {
      console.error("[job-application] Web3Forms submission failed:", {
        status: web3formsResponse.status,
        statusText: web3formsResponse.statusText,
        success: result.success,
        message: result.message,
        keySuffix: accessKey ? accessKey.slice(-8) : "(none)",
      });
    } else {
      console.log("[job-application] Submission SUCCESS", {
        jobTitle,
        keySuffix: accessKey.slice(-8),
      });
    }

    if (web3formsResponse.ok && result.success) {
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully.",
      });
    }

    return NextResponse.json(
      { success: false, message: result.message || "Submission failed. Please try again." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[job-application] API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later or email us at info@landmarkgulf.com" },
      { status: 500 }
    );
  }
}
