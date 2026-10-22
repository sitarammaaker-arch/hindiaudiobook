// ── Hindi summaries: static (repo) + scheduled (Redis) ─────────────────────
// Scheduled summaries live in Redis key ha:summaries with a publishAt time.
// Nothing reads them until that moment, so they go live on their own — no
// cron job. Redis reads are cached in lib/db and invalidated on every write.

import { readJSONAsync, writeJSONAsync } from "./db";
import {
  staticSummaries, SUMMARY_REQUIRED_FIELDS, SUMMARIES_UPDATED, type BookSummary,
} from "@/data/summaries";

const FILE = "summaries.json";

async function getScheduledSummaries(): Promise<BookSummary[]> {
  try { return await readJSONAsync<BookSummary>(FILE); } catch { return []; }
}

function isPublished(s: BookSummary, now: number): boolean {
  return !s.publishAt || Date.parse(s.publishAt) <= now;
}

export function publishedDate(s: BookSummary): string {
  return s.publishAt ? s.publishAt.slice(0, 10) : SUMMARIES_UPDATED;
}

// Newest first, so the latest daily summary tops the list
export async function getPublishedSummaries(now = Date.now()): Promise<BookSummary[]> {
  const scheduled = await getScheduledSummaries();
  const staticSlugs = new Set(staticSummaries.map((s) => s.slug));
  return [...staticSummaries, ...scheduled.filter((s) => !staticSlugs.has(s.slug))]
    .filter((s) => isPublished(s, now))
    .sort((a, b) => publishedDate(b).localeCompare(publishedDate(a)));
}

export async function getPublishedSummaryBySlug(slug: string): Promise<BookSummary | undefined> {
  return (await getPublishedSummaries()).find((s) => s.slug === slug);
}

export async function getPublishedSummaryForAudiobook(audiobookSlug: string): Promise<BookSummary | undefined> {
  return (await getPublishedSummaries()).find((s) => s.audiobookSlug === audiobookSlug);
}

// ── Admin helpers (used by /api/summaries) ──────────────────────────────────
export async function listScheduledSummaries(): Promise<BookSummary[]> {
  return getScheduledSummaries();
}

export function validateSummary(s: any): string | null {
  if (!s || typeof s !== "object") return "not an object";
  for (const k of SUMMARY_REQUIRED_FIELDS) {
    if (s[k] === undefined || s[k] === "") return `missing ${k}`;
  }
  if (!/^[a-z0-9-]+$/.test(s.slug)) return `bad slug ${s.slug}`;
  if (!Array.isArray(s.lessons) || s.lessons.some((l: any) => !l.heading || !Array.isArray(l.body) || !l.takeaway)) {
    return `bad lessons in ${s.slug}`;
  }
  if (s.publishAt !== undefined && Number.isNaN(Date.parse(s.publishAt))) return `bad publishAt in ${s.slug}`;
  if (staticSummaries.some((x) => x.slug === s.slug)) return `${s.slug} already exists as a static summary`;
  return null;
}

// Insert or replace by slug
export async function upsertScheduledSummaries(items: BookSummary[]): Promise<number> {
  const existing = await getScheduledSummaries();
  const bySlug = new Map(existing.map((s) => [s.slug, s]));
  for (const s of items) bySlug.set(s.slug, s);
  const all = Array.from(bySlug.values());
  await writeJSONAsync(FILE, all);
  return all.length;
}

export async function deleteScheduledSummary(slug: string): Promise<number> {
  const remaining = (await getScheduledSummaries()).filter((s) => s.slug !== slug);
  await writeJSONAsync(FILE, remaining);
  return remaining.length;
}
