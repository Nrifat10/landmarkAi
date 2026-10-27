#!/usr/bin/env node
/**
 * SEO Audit Script — uses Playwright + Lighthouse to get mobile and desktop
 * SEO scores for landmarkgulf.com and key subpages.
 *
 * Lighthouse runs inside Chrome and audits:
 *  - SEO (meta tags, headings, links, mobile-friendly, etc.)
 *  - Best Practices
 *  - Accessibility
 *  - Performance
 *
 * Run: node /home/z/my-project/scripts/seo-audit.js
 */

const { chromium } = require("playwright");
const { execSync, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const TARGET_URLS = [
  { label: "Homepage", url: "https://landmarkgulf.com/" },
  { label: "Jobs listing", url: "https://landmarkgulf.com/jobs" },
  { label: "Job detail (sample)", url: "https://landmarkgulf.com/jobs/pipe-fabricator" },
  { label: "Contact", url: "https://landmarkgulf.com/contact" },
  { label: "About", url: "https://landmarkgulf.com/about" },
];

const STRATEGIES = ["mobile", "desktop"];

async function runLighthouse(url, strategy) {
  // Playwright's bundled Chromium path (already installed)
  const chromePath = "/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome";

  if (!fs.existsSync(chromePath)) {
    return { error: `Chrome not found at: ${chromePath}` };
  }

  const outputPath = `/tmp/lh-${strategy}-${Date.now()}.json`;

  console.log(`▶ Running Lighthouse ${strategy} on ${url}`);

  const args = [
    url,
    `--output=json`,
    `--output-path=${outputPath}`,
    `--only-categories=seo,best-practices,accessibility`,
    `--form-factor=${strategy}`,
    `--quiet`,
    `--chrome-flags=--no-sandbox --disable-dev-shm-usage --disable-gpu --headless=new`,
  ];

  if (strategy === "mobile") {
    args.push("--screenEmulation.mobile=true");
  } else {
    args.push("--screenEmulation.mobile=false");
    args.push("--screenEmulation.width=1350");
    args.push("--screenEmulation.height=950");
  }

  // Set CHROME_PATH env var so Lighthouse finds it
  const result = spawnSync("npx", ["lighthouse", ...args], {
    encoding: "utf-8",
    timeout: 120000,
    cwd: "/home/z/my-project",
    env: {
      ...process.env,
      CHROME_PATH: chromePath,
      HOME: "/tmp/lighthouse-tmp",
      PUPPETEER_EXECUTABLE_PATH: chromePath,
    },
  });

  if (result.status !== 0) {
    return {
      error: (result.stderr || result.stdout || "Unknown Lighthouse error").slice(0, 500),
    };
  }

  if (!fs.existsSync(outputPath)) {
    return { error: "Output file not created" };
  }

  const report = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
  fs.unlinkSync(outputPath);

  return {
    seo: report.categories?.seo?.score !== null && report.categories?.seo?.score !== undefined
      ? Math.round(report.categories.seo.score * 100)
      : null,
    bestPractices: report.categories?.["best-practices"]?.score !== null && report.categories?.["best-practices"]?.score !== undefined
      ? Math.round(report.categories["best-practices"].score * 100)
      : null,
    accessibility: report.categories?.accessibility?.score !== null && report.categories?.accessibility?.score !== undefined
      ? Math.round(report.categories.accessibility.score * 100)
      : null,
    failedAudits: report.categories?.seo?.auditRefs
      ? report.categories.seo.auditRefs
          .map((ref) => {
            const audit = report.audits[ref.id];
            if (!audit) return null;
            const score = audit.score;
            // Only include audits that scored < 1 (failed) or are manual reviews
            if (score === null || score === undefined || score >= 1) return null;
            return { id: ref.id, title: audit.title, description: audit.description, weight: ref.weight };
          })
          .filter(Boolean)
      : [],
  };
}

async function main() {
  const results = {};

  for (const target of TARGET_URLS) {
    results[target.label] = {};
    for (const strategy of STRATEGIES) {
      console.log(`\n=== ${target.label} (${strategy}) ===`);
      const result = await runLighthouse(target.url, strategy);
      results[target.label][strategy] = result;

      if (result.error) {
        console.log(`  ❌ Error: ${result.error.slice(0, 200)}`);
      } else {
        console.log(`  SEO Score:           ${result.seo}/100 ${result.seo >= 90 ? "✅" : result.seo >= 50 ? "⚠️" : "❌"}`);
        console.log(`  Best Practices:      ${result.bestPractices}/100`);
        console.log(`  Accessibility:       ${result.accessibility}/100`);
        if (result.failedAudits && result.failedAudits.length > 0) {
          console.log(`  Failed SEO audits (${result.failedAudits.length}):`);
          result.failedAudits.slice(0, 5).forEach((a) => {
            console.log(`    • ${a.id} (weight: ${a.weight})`);
          });
        }
      }

      // Be polite — small delay between requests
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  // Save full results
  fs.writeFileSync("/home/z/my-project/scripts/seo-audit-results.json", JSON.stringify(results, null, 2));
  console.log(`\n✓ Full results saved to scripts/seo-audit-results.json`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
