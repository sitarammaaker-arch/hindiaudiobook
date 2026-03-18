// ── Database Layer ─────────────────────────────────────────────────────────
// Strategy:
//   Production (Vercel) → Vercel KV (Redis) — permanent, survives redeploys
//   Development (local) → /data/*.json files — no KV needed locally
//
// KV Keys:
//   audiobooks      → Audiobook[]  (uploaded via admin)
//   books           → ChapterBook[] (chapter books)
//   plays           → Record<slug, number>

import fs from "fs";
import path from "path";

// ── KV Detection ─────────────────────────────────────────────────────────────
function hasKV(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// ── Vercel KV client (lazy import) ────────────────────────────────────────────
async function kvGet<T>(key: string): Promise<T | null> {
  const { kv } = await import("@vercel/kv");
  return kv.get<T>(key);
}

async function kvSet<T>(key: string, value: T): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(key, value);
}

// ── Local file fallback ────────────────────────────────────────────────────
const LOCAL_DIR = path.join(process.cwd(), "data");

function ensureLocalDir() {
  if (!fs.existsSync(LOCAL_DIR)) fs.mkdirSync(LOCAL_DIR, { recursive: true });
}

function readLocalJSON<T>(filename: string): T[] {
  ensureLocalDir();
  const file = path.join(LOCAL_DIR, filename);
  if (!fs.existsSync(file)) return [];
  try { return JSON.parse(fs.readFileSync(file, "utf-8")); }
  catch { return []; }
}

function writeLocalJSON<T>(filename: string, data: T[]): void {
  ensureLocalDir();
  fs.writeFileSync(path.join(LOCAL_DIR, filename), JSON.stringify(data, null, 2));
}

// ── Public API ─────────────────────────────────────────────────────────────
// KV key name from filename: "audiobooks.json" → "audiobooks"
function kvKey(filename: string): string {
  return filename.replace(".json", "");
}

export async function readJSONAsync<T>(filename: string): Promise<T[]> {
  if (hasKV()) {
    try {
      const data = await kvGet<T[]>(kvKey(filename));
      return data ?? [];
    } catch (e) {
      console.error("KV read error:", e);
      return [];
    }
  }
  return readLocalJSON<T>(filename);
}

export async function writeJSONAsync<T>(filename: string, data: T[]): Promise<void> {
  if (hasKV()) {
    try {
      await kvSet(kvKey(filename), data);
      return;
    } catch (e) {
      console.error("KV write error:", e);
      throw new Error("KV write failed: " + e);
    }
  }
  writeLocalJSON(filename, data);
}

// Sync versions (for backwards compat — use only where async not possible)
export function readJSON<T>(filename: string): T[] {
  return readLocalJSON<T>(filename);
}
export function writeJSON<T>(filename: string, data: T[]): void {
  writeLocalJSON(filename, data);
}

// ── Plays (KV only — in-memory map as fallback) ───────────────────────────
type PlaysMap = Record<string, number>;

// In-memory fallback when no KV
const memoryPlays: PlaysMap = {};

export async function getPlays(): Promise<PlaysMap> {
  if (hasKV()) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<PlaysMap>("plays");
      return data ?? {};
    } catch { return {}; }
  }
  // Local: try plays.json
  return readLocalJSON<PlaysMap>("plays.json")[0] ?? {};
}

export async function incrementPlay(slug: string): Promise<number> {
  if (hasKV()) {
    try {
      const { kv } = await import("@vercel/kv");
      // HINCRBY on a hash — atomic increment
      const count = await kv.hincrby("plays_map", slug, 1);
      return count;
    } catch { return 0; }
  }
  // Local fallback
  memoryPlays[slug] = (memoryPlays[slug] ?? 0) + 1;
  return memoryPlays[slug];
}

export async function getAllPlays(): Promise<PlaysMap> {
  if (hasKV()) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.hgetall("plays_map");
      if (!data) return {};
      // Convert values to numbers
      const result: PlaysMap = {};
      for (const [k, v] of Object.entries(data)) {
        result[k] = Number(v);
      }
      return result;
    } catch { return {}; }
  }
  return memoryPlays;
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
