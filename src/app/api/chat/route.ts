/**
 * Secure AI Chat API Route — Powered by Groq AI (Llama 3.3 70B)
 * If Groq fails (403/region block), falls back to PDF-based responses.
 */

import { NextRequest } from "next/server";
import { retrieveRelevantContext } from "@/lib/pdf-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "iad1";
export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Landmark AI, the official AI assistant of Landmark Inter Gulf LLC.

Your role:
- Answer ONLY questions related to Landmark Inter Gulf LLC.
- Use ONLY the provided company profile context to answer questions.
- Never use website content, external websites, or the internet.
- Never invent or guess company information.
- Never hallucinate.

Topics you CAN answer about:
- Company information and history
- Services (Manpower Supply, Equipment Rental, Industrial Trading, Petro Services, Hospitality Services, Car Rental & Transport)
- Construction and industrial services, Maintenance services
- Certifications and approvals, Projects and clients
- Equipment and fleet, Office location, email, and website

Topics you MUST NOT answer:
- Programming, Politics, Religion, Medical advice, Financial advice, Any unrelated topics

Response guidelines:
- Always answer professionally and concisely.
- Use markdown formatting for readability.
- If the information is not in the provided context, reply exactly:
  "I couldn't find that information in the official Landmark Inter Gulf LLC Company Profile. Please contact our team for further assistance."
- If asked about "company profile" or "download profile", mention that the user can download the full company profile PDF from the website.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  let sanitized = input.slice(0, 2000);
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return sanitized.trim();
}

function isPromptInjection(message: string): boolean {
  const lower = message.toLowerCase();
  const patterns = [
    "ignore previous instructions", "ignore all previous", "disregard the above",
    "forget your instructions", "you are not", "act as if", "pretend you are",
    "system prompt", "reveal your prompt", "show me your instructions",
    "what are your rules", "override", "jailbreak",
  ];
  return patterns.some((p) => lower.includes(p));
}

function generatePdfResponse(query: string): string {
  const context = retrieveRelevantContext(query, 2000);
  if (!context || context.trim().length === 0) {
    return "I couldn't find that information in the official Landmark Inter Gulf LLC Company Profile. Please contact our team for further assistance.";
  }

  const cleaned = context.replace(/--- PAGE \d+ ---/g, "").replace(/\n{3,}/g, "\n\n").trim();
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("service") || lowerQuery.includes("what do you do")) {
    return `Based on our company profile, here are the services provided by **Landmark Inter Gulf LLC**:

**Our Services:**
1. **Manpower Supply** — Skilled, semi-skilled and unskilled workforce for all industrial and commercial sectors
2. **Equipment Rental** — Wide range of modern equipment and vehicles for projects of all sizes
3. **Industrial Trading** — Quality industrial materials, tools and products from trusted global suppliers
4. **Petro Services** — Specialized support for oil & gas projects with skilled manpower
5. **Hospitality Services** — Professional hospitality staffing and support services
6. **Car Rental & Transport** — Reliable vehicles and transport solutions across Saudi Arabia

For more details, please download our company profile.`;
  }

  if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("phone") || lowerQuery.includes("website")) {
    return `Here are the contact details for **Landmark Inter Gulf LLC**:

- **Email:** info@landmarkgulf.com
- **Website:** www.landmarkgulf.com
- **Location:** Kingdom of Saudi Arabia
- **Working Hours:** Saturday – Thursday, 8:00 AM – 6:00 PM

Please feel free to reach out for any inquiries.`;
  }

  if (lowerQuery.includes("about") || lowerQuery.includes("company") || lowerQuery.includes("who")) {
    return `**About Landmark Inter Gulf LLC**

Landmark Inter Gulf LLC is a Saudi based company providing integrated solutions in Manpower Supply, Equipment Rental, Industrial Trading, Petro Services and Hospitality Services.

Established with a commitment to quality, safety and reliability, we deliver world-class services with a customer-focused approach.

**Key Stats:**
- 5,000+ skilled manpower deployed
- 100+ modern equipment fleet
- 10+ years of combined experience
- 100% commitment to safety & quality

We support the Kingdom's growth and contribute to Vision 2030.`;
  }

  if (lowerQuery.includes("project") || lowerQuery.includes("client")) {
    return `**Our Project Experience**

We have deployed thousands of skilled professionals to flagship projects across Saudi Arabia since 2017.

**Key Clients:**
- SINOPEC Engineering, Hyundai E&C, SEPCO Arabia, GUSAN Arabia LLC, L&T Arabia LLC, Midong E&C, Sinohydro, Hyundai Livart

**Major Projects:**
- Jafurah Gas Development, Marjan Oil Field, Jubail Fabricator Shop, Ras Al Khayer, Amiral Project

For the full project list, please download our company profile.`;
  }

  return `Based on the Landmark Inter Gulf LLC Company Profile:

${cleaned.substring(0, 1500)}

For more detailed information, please download our full company profile.`;
}

function streamResponse(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const words = text.split(" ");
      let index = 0;
      function sendNext() {
        if (index >= words.length) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
          controller.close();
          return;
        }
        const chunk = words.slice(index, index + 3).join(" ") + " ";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`));
        index += 3;
        setTimeout(sendNext, 30);
      }
      sendNext();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages?: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return streamResponse("I couldn't understand your message. Please try again.");
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user" || !lastMessage.content) {
      return streamResponse("I couldn't understand your message. Please try again.");
    }

    const userQuery = sanitizeInput(lastMessage.content);
    if (!userQuery) {
      return streamResponse("Please type a question and I'll do my best to help.");
    }

    if (isPromptInjection(userQuery)) {
      return streamResponse("I can only answer questions related to Landmark Inter Gulf LLC.");
    }

    const relevantContext = retrieveRelevantContext(userQuery);
    if (!relevantContext || relevantContext.trim().length === 0) {
      return streamResponse("I couldn't find that information in the official Landmark Inter Gulf LLC Company Profile. Please contact our team for further assistance.");
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return streamResponse(generatePdfResponse(userQuery));
    }

    const history = messages.slice(-11, -1).map((m) => ({
      role: m.role,
      content: sanitizeInput(m.content),
    }));

    const systemMessage = `${SYSTEM_PROMPT}

COMPANY PROFILE CONTEXT (use ONLY this information):
${relevantContext}

Remember: Answer ONLY based on the context above.`;

    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemMessage },
            ...history,
            { role: "user", content: userQuery },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.3,
          max_tokens: 1000,
          top_p: 0.8,
          stream: true,
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (!groqResponse.ok) {
        return streamResponse(generatePdfResponse(userQuery));
      }

      if (!groqResponse.body) {
        return streamResponse(generatePdfResponse(userQuery));
      }

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      const reader = groqResponse.body.getReader();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            let buffer = "";
            let receivedAnyText = false;

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data: ")) continue;
                const jsonStr = trimmed.slice(6);
                if (jsonStr === "[DONE]") continue;
                try {
                  const data = JSON.parse(jsonStr);
                  const text = data.choices?.[0]?.delta?.content || "";
                  if (text) {
                    receivedAnyText = true;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                  }
                } catch { }
              }
            }

            if (!receivedAnyText) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: generatePdfResponse(userQuery), done: true })}\n\n`));
            } else {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
            }
            controller.close();
          } catch (error) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: generatePdfResponse(userQuery), done: true })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
      });
    } catch {
      return streamResponse(generatePdfResponse(userQuery));
    }
  } catch {
    return streamResponse("I apologize, but I encountered an error. Please try again.");
  }
}
