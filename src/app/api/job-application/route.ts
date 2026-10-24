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

    // 7. Get the Web3Forms key — from env var, fallback to hardcoded
    const accessKey = process.env.WEB3FORMS_JOBS_KEY || process.env.WEB3FORMS_CONTACT_KEY || FALLBACK_WEB3FORMS_KEY;

    if (!accessKey || accessKey === "undefined") {
      console.error("Web3Forms key not configured for jobs");
      return NextResponse.json(
        { success: false, message: "Application system not configured. Please contact us at info@landmarkgulf.com" },
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

    const result = await web3formsResponse.json();

    if (web3formsResponse.ok && result.success) {
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully.",
      });
    }

    console.error("Web3Forms error:", result);
    return NextResponse.json(
      { success: false, message: result.message || "Submission failed. Please try again." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Job application API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later or email us at info@landmarkgulf.com" },
      { status: 500 }
    );
  }
}
