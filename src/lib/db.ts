// ── Database Layer ─────────────────────────────────────────────────────────
// Production → Upstash Redis | Development → local /data/*.json

import fs from "fs";
import path from "path";

// ── Redis detection ────────────────────────────────────────────────────────
function hasRedis(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

// ── Upstash Redis client ───────────────────────────────────────────────────
async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// ── Local JSON fallback ────────────────────────────────────────────────────
const LOCAL_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  try {
    if (!fs.existsSync(LOCAL_DIR)) fs.mkdirSync(LOCAL_DIR, { recursive: true });
  } catch {}
}

function readLocalJSON<T>(filename: string): T[] {
  try {
    ensureDir();
    const file = path.join(LOCAL_DIR, filename);
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch { return []; }
}

function writeLocalJSON<T>(filename: string, data: T[]): void {
  try {
    ensureDir();
    fs.writeFileSync(path.join(LOCAL_DIR, filename), JSON.stringify(data, null, 2));
  } catch {}
}

const kvKey = (filename: string) => "ha:" + filename.replace(".json", "");

// ── Public async API ───────────────────────────────────────────────────────
export async function readJSONAsync<T>(filename: string): Promise<T[]> {
  if (hasRedis()) {
    try {
      const redis = await getRedis();
      const data = await redis.get<T[]>(kvKey(filename));
      return data ?? [];
    } catch { return []; }
  }
  return readLocalJSON<T>(filename);
}

export async function writeJSONAsync<T>(filename: string, data: T[]): Promise<void> {
  if (hasRedis()) {
    try {
      const redis = await getRedis();
      await redis.set(kvKey(filename), data);
      return;
    } catch (e) {
      throw new Error("Database save failed: " + e);
    }
  }
  writeLocalJSON(filename, data);
}

// ── Play counts ────────────────────────────────────────────────────────────
const memPlays: Record<string, number> = {};

export async function incrementPlay(slug: string): Promise<number> {
  if (hasRedis()) {
    try {
      const redis = await getRedis();
      return await redis.hincrby("ha:plays", slug, 1);
    } catch { return 0; }
  }
  memPlays[slug] = (memPlays[slug] ?? 0) + 1;
  return memPlays[slug];
}

export async function getAllPlays(): Promise<Record<string, number>> {
  if (hasRedis()) {
    try {
      const redis = await getRedis();
      const data = await redis.hgetall("ha:plays");
      if (!data) return {};
      const result: Record<string, number> = {};
      for (const [k, v] of Object.entries(data)) result[k] = Number(v);
      return result;
    } catch { return {}; }
  }
  return memPlays;
}

// ── Authors KV ────────────────────────────────────────────────────────────
export async function getAllAuthorsFromKV(): Promise<any[] | null> {
  if (hasRedis()) {
    try {
      const redis = await getRedis();
      const data = await redis.get<any[]>("ha:authors");
      return data ?? null;
    } catch { return null; }
  }
  return null;
}

export async function saveAllAuthors(authors: any[]): Promise<void> {
  if (hasRedis()) {
    try {
      const redis = await getRedis();
      await redis.set("ha:authors", authors);
    } catch {}
  }
}

export async function deleteAuthor(slug: string): Promise<void> {
  const authors = await getAllAuthorsFromKV();
  if (!authors) return;
  await saveAllAuthors(authors.filter((a: any) => a.slug !== slug));
}

// ── Sync fallback ─────────────────────────────────────────────────────────
export function readJSON<T>(filename: string): T[] {
  return readLocalJSON<T>(filename);
}
export function writeJSON<T>(filename: string, data: T[]): void {
  writeLocalJSON(filename, data);
}

// ── Helpers ────────────────────────────────────────────────────────────────
export function nextId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}

export function makeSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export function extractVideoId(input: string): string {
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || input;
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
  } catch {}
  return input.trim();
}
