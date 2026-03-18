import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readJSON<T>(filename: string): T[] {
  ensureDir();
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return [];
  try {
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export function writeJSON<T>(filename: string, data: T[]): void {
  ensureDir();
  const file = path.join(DATA_DIR, filename);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
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
