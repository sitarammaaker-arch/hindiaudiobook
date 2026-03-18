// ── Database Layer ────────────────────────────────────────────────────────────
// Vercel par filesystem read-only hai — isliye /tmp directory use karte hain.
// /tmp Vercel par writable hota hai, lekin:
//   ⚠️  Deploy/restart par data reset ho jaata hai
//   ✅  Single session mein data persist karta hai
//   ✅  Multiple requests ke beech data share hota hai (same instance)
//
// Production ke liye upgrade: Vercel KV, PlanetScale, ya Supabase

import fs from "fs";
import path from "path";

// /tmp is always writable on Vercel (and locally)
const TMP_DIR = "/tmp/hindiaudiobook-data";
// Fallback: local data dir for development
const LOCAL_DIR = path.join(process.cwd(), "data");

function getDataDir(): string {
  // On Vercel, process.env.VERCEL is set
  if (process.env.VERCEL) {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    return TMP_DIR;
  }
  // Local development — use /data folder
  if (!fs.existsSync(LOCAL_DIR)) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
  }
  return LOCAL_DIR;
}

// Seed /tmp with initial data from /data if /tmp file doesn't exist yet
function seedIfNeeded(filename: string): void {
  const tmpFile = path.join(TMP_DIR, filename);
  const localFile = path.join(LOCAL_DIR, filename);
  
  if (!fs.existsSync(tmpFile) && fs.existsSync(localFile)) {
    try {
      fs.copyFileSync(localFile, tmpFile);
    } catch {
      // If copy fails, start with empty array
    }
  }
}

export function readJSON<T>(filename: string): T[] {
  const dir = getDataDir();
  
  // On Vercel, try to seed from local data first
  if (process.env.VERCEL) {
    seedIfNeeded(filename);
  }
  
  const file = path.join(dir, filename);
  if (!fs.existsSync(file)) return [];
  try {
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export function writeJSON<T>(filename: string, data: T[]): void {
  const dir = getDataDir();
  const file = path.join(dir, filename);
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`writeJSON failed for ${filename}:`, err);
    throw new Error(`Data save nahi ho saka: ${filename}`);
  }
}

export function nextId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}

export function makeSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractVideoId(input: string): string {
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || input;
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
  } catch {}
  return input.trim();
}
