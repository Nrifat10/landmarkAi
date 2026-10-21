import { NextRequest, NextResponse } from "next/server";

// Rate limiting — in-memory store (per server instance)
// Allows max 5 submissions per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; firstHit: number }>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isRateLimited(ip: string): { limited: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now - entry.firstHit > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, firstHit: now });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  entry.count += 1;
  const remaining = Math.max(0, RATE_LIMIT_MAX - entry.count);
  const resetIn = RATE_LIMIT_WINDOW_MS - (now - entry.firstHit);

  return {
    limited: entry.count > RATE_LIMIT_MAX,
    remaining,
    resetIn: Math.max(0, resetIn),
  };
}

// Clean up old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipHits.entries()) {
    if (now - entry.firstHit > RATE_LIMIT_WINDOW_MS) {
      ipHits.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check
    const clientIp = getClientIp(req);
    const rateCheck = isRateLimited(clientIp);
    if (rateCheck.limited) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again later.",
          resetIn: Math.ceil(rateCheck.resetIn / 1000),
        },
        { status: 429 }
      );
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
    if (formStartTime && Date.now() - formStartTime < 3000) {
      return NextResponse.json(
        { success: false, message: "Form submitted too quickly. Please try again." },
        { status: 400 }
      );
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

    // 7. Forward to Web3Forms with PRIVATE key (never exposed to browser)
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_CONTACT_KEY,
        subject: "New Enquiry — Landmark Inter Gulf LLC Website",
        from_name: "Landmark Inter Gulf — Contact Form",
        name,
        email,
        phone: phone || "Not provided",
        company: company || "Not provided",
        service: service || "Not specified",
        message,
        // Reply-to so the HR team can directly reply to the enquirer
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
      { success: false, message: result.message || "Submission failed." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
