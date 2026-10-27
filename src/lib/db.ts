import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaSchemaInitialized?: boolean
}

// Singleton pattern — avoid creating a new Prisma client on every hot-reload
// in development, and on every serverless function invocation in production.
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// ────────────────────────────────────────────────────────────
// Auto-create tables on first request (idempotent)
// ────────────────────────────────────────────────────────────
// Vercel Postgres connects to an empty database — Prisma normally needs
// `prisma db push` to create the JobApplication & ContactEnquiry tables.
// We can't easily run that command in Vercel's serverless environment, so
// we run the CREATE TABLE IF NOT EXISTS SQL directly on the first DB
// query of each cold start. Safe to call multiple times.
//
// The columns match our Prisma schema exactly — if you change the schema,
// update the SQL below to match.
// ────────────────────────────────────────────────────────────

const SCHEMA_INIT_SQL = `
-- JobApplication table
CREATE TABLE IF NOT EXISTS "JobApplication" (
  "id"              TEXT NOT NULL,
  "jobTitle"        TEXT NOT NULL,
  "name"            TEXT NOT NULL,
  "email"           TEXT NOT NULL,
  "phone"           TEXT NOT NULL,
  "nationality"     TEXT NOT NULL,
  "currentLocation" TEXT NOT NULL,
  "experience"      TEXT NOT NULL,
  "certifications"  TEXT,
  "languages"       TEXT NOT NULL,
  "iqamaStatus"     TEXT NOT NULL,
  "noticePeriod"    TEXT,
  "message"         TEXT,
  "ip"              TEXT,
  "status"          TEXT NOT NULL DEFAULT 'new',
  "spamScore"       INTEGER NOT NULL DEFAULT 0,
  "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       TIMESTAMP(3) NOT NULL,
  CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "JobApplication_status_idx" ON "JobApplication"("status");
CREATE INDEX IF NOT EXISTS "JobApplication_createdAt_idx" ON "JobApplication"("createdAt");
CREATE INDEX IF NOT EXISTS "JobApplication_email_idx" ON "JobApplication"("email");
CREATE INDEX IF NOT EXISTS "JobApplication_jobTitle_idx" ON "JobApplication"("jobTitle");

-- ContactEnquiry table
CREATE TABLE IF NOT EXISTS "ContactEnquiry" (
  "id"         TEXT NOT NULL,
  "name"       TEXT NOT NULL,
  "email"      TEXT NOT NULL,
  "phone"      TEXT,
  "company"    TEXT,
  "service"    TEXT,
  "message"    TEXT NOT NULL,
  "ip"         TEXT,
  "status"     TEXT NOT NULL DEFAULT 'new',
  "spamScore"  INTEGER NOT NULL DEFAULT 0,
  "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"  TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContactEnquiry_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "ContactEnquiry_status_idx" ON "ContactEnquiry"("status");
CREATE INDEX IF NOT EXISTS "ContactEnquiry_createdAt_idx" ON "ContactEnquiry"("createdAt");
CREATE INDEX IF NOT EXISTS "ContactEnquiry_email_idx" ON "ContactEnquiry"("email");
`;

let schemaInitPromise: Promise<void> | null = null;

/**
 * Ensure database schema exists. Called automatically by every /api/submit
 * and /admin/* request. Idempotent — safe to call on every cold start.
 * Runs the SQL only once per serverless instance (cached in globalForPrisma).
 */
export async function ensureSchema(): Promise<void> {
  // Already initialized in this instance
  if (globalForPrisma.prismaSchemaInitialized) return;

  // If init is already running on this instance, await it
  if (schemaInitPromise) {
    await schemaInitPromise;
    return;
  }

  schemaInitPromise = (async () => {
    try {
      // Use $executeRaw to run the CREATE TABLE / CREATE INDEX SQL
      // Split by semicolons because $executeRawUnsafe runs one statement at a time
      const statements = SCHEMA_INIT_SQL
        .split(/;(?=\s*(?:--|CREATE|\(|$))/i)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const stmt of statements) {
        if (stmt.startsWith("--")) continue;
        await db.$executeRawUnsafe(stmt + ";");
      }
      globalForPrisma.prismaSchemaInitialized = true;
      console.log("[db] Schema initialized — JobApplication & ContactEnquiry tables verified");
    } catch (error) {
      // Don't cache failure — allow retry on next request
      schemaInitPromise = null;
      console.error("[db] Schema init failed:", error);
      throw error;
    }
  })();

  await schemaInitPromise;
}
