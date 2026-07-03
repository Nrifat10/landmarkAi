import fs from "fs";
import path from "path";

let cachedContent: string | null = null;

export function loadCompanyProfile(): string {
  if (cachedContent !== null) return cachedContent;
  const filePath = path.join(process.cwd(), "data", "company-profile.txt");
  try {
    if (fs.existsSync(filePath)) {
      cachedContent = fs.readFileSync(filePath, "utf-8");
      return cachedContent;
    }
  } catch (error) {
    console.error("Error loading company profile:", error);
  }
  cachedContent = "";
  return cachedContent;
}

export function retrieveRelevantContext(query: string, maxChars = 3000): string {
  const fullText = loadCompanyProfile();
  if (!fullText) return "";

  const queryLower = query.toLowerCase();
  const paragraphs = fullText.split(/\n\n+/).filter((p) => p.trim().length > 20);

  const scored = paragraphs.map((para) => {
    const paraLower = para.toLowerCase();
    let score = 0;
    const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2 && !["the", "and", "for", "are", "our", "with", "you", "can", "what", "how", "from", "have", "this", "that"].includes(w));
    for (const word of queryWords) {
      const matches = paraLower.split(word).length - 1;
      score += matches * 2;
    }
    if (queryLower.length > 5 && paraLower.includes(queryLower)) {
      score += 10;
    }
    if (para.startsWith("--- PAGE")) {
      score += 1;
    }
    return { para, score };
  });

  const relevant = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 5).map((s) => s.para);

  if (relevant.length === 0) {
    return fullText.substring(0, maxChars);
  }

  const result = relevant.join("\n\n");
  return result.length > maxChars ? result.substring(0, maxChars) : result;
}
