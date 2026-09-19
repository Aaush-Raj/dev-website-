import { MongoClient, type Collection, type Db } from "mongodb";

/**
 * MONGODB CONNECTION
 * ---------------------------------------------------------------------------
 * One pooled client for the whole server process.
 *
 * WHY THE GLOBAL
 * Next's dev server hot-reloads modules on every edit. A plain module-level
 * client would be re-created each time and leak connections until Mongo
 * refuses new ones. Caching the promise on `globalThis` survives reload, which
 * is the documented pattern for the official driver under Next.
 *
 * In production the module is evaluated once, so the global is simply a
 * module-level singleton by another name.
 *
 * WHY A PROMISE, NOT A CLIENT
 * `connect()` is async. Caching the promise means concurrent requests during
 * cold start await the SAME connection attempt rather than each opening their
 * own.
 *
 * FAILS LOUDLY, NOT SILENTLY
 * A missing URI throws on first use with a message naming the variable. The
 * route catches it and returns a 503, so a misconfigured deploy is visible
 * rather than dropping leads into nowhere.
 */

/** Where leads are written. */
export const LEADS_COLLECTION = "leads";

declare global {
  var __lurnyMongo: Promise<MongoClient> | undefined;
}

function clientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and point it at a MongoDB instance.",
    );
  }

  if (!globalThis.__lurnyMongo) {
    globalThis.__lurnyMongo = new MongoClient(uri, {
      // Fail fast rather than hanging the request for the driver's 30s
      // default: a form submission that stalls is worse than one that errors.
      serverSelectionTimeoutMS: 5_000,
      connectTimeoutMS: 5_000,
      // The route is short-lived and low-volume; a large pool would be idle
      // connections Mongo has to keep alive for nothing.
      maxPoolSize: 10,
    }).connect();
  }

  return globalThis.__lurnyMongo;
}

/** The application database, named by `MONGODB_DB` or defaulting sensibly. */
export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(process.env.MONGODB_DB?.trim() || "elurny");
}

/** Shape stored for every submission. */
export interface LeadDocument {
  /** "demo" for the shared LeadForm, "contact" for the contact page. */
  kind: "demo" | "contact";
  /** Which page the form was submitted from, e.g. "/platform/kxp". */
  source: string;
  name: string;
  email: string;
  organisation?: string;
  /** The two or three select answers, keyed by their field name. */
  selections?: Record<string, string>;
  message?: string;
  consent?: boolean;
  createdAt: Date;
  /** Whether the team notification was sent. False means it needs chasing. */
  notified: boolean;
  meta?: {
    userAgent?: string;
    referer?: string;
  };
}

export async function leads(): Promise<Collection<LeadDocument>> {
  const db = await getDb();
  return db.collection<LeadDocument>(LEADS_COLLECTION);
}
