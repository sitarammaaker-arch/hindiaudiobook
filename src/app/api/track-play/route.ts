// ── Play Count Tracker API ────────────────────────────────────────────────────
// POST /api/track-play  { slug: "book-slug", type: "audiobook" | "chapter" }
// → increments play count in /tmp + updates static count (in-memory for session)
//
// Strategy:
//   1. Static books (audiobooks.ts) → play counts stored in /tmp/plays.json
//   2. Dynamic books (uploaded via admin) → play counts stored in /tmp/audiobooks.json
//   3. Counts merged when reading

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const TMP_DIR  = process.env.VERCEL ? "/tmp/hindiaudiobook-data" : path.join(process.cwd(), "data");
const PLAYS_FILE = path.join(
  process.env.VERCEL ? "/tmp/hindiaudiobook-data" : path.join(process.cwd(), "data"),
  "plays.json"
);

type PlaysMap = Record<string, number>; // { "slug": playCount }

function ensureDir() {
  const dir = process.env.VERCEL ? "/tmp/hindiaudiobook-data" : path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readPlays(): PlaysMap {
  ensureDir();
  try {
    if (!fs.existsSync(PLAYS_FILE)) return {};
    return JSON.parse(fs.readFileSync(PLAYS_FILE, "utf-8"));
  } catch { return {}; }
}

function writePlays(data: PlaysMap) {
  ensureDir();
  fs.writeFileSync(PLAYS_FILE, JSON.stringify(data, null, 2));
}

// ── Rate limiting — prevent spam ─────────────────────────────────────────────
// Simple in-memory store: IP → last play time per slug
const recentPlays = new Map<string, number>(); // "IP:slug" → timestamp
const COOLDOWN_MS = 30 * 1000; // 30 seconds cooldown per IP per book

function isRateLimited(ip: string, slug: string): boolean {
  const key = `${ip}:${slug}`;
  const lastPlay = recentPlays.get(key);
  if (lastPlay && Date.now() - lastPlay < COOLDOWN_MS) return true;
  recentPlays.set(key, Date.now());
  // Cleanup old entries every 1000 requests
  if (recentPlays.size > 1000) {
    const cutoff = Date.now() - COOLDOWN_MS;
    recentPlays.forEach((time, k) => { if (time < cutoff) recentPlays.delete(k); });
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ success: false, error: "Slug required" }, { status: 400 });
    }

    // Rate limit check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown";

    if (isRateLimited(ip, slug)) {
      return NextResponse.json({ success: true, skipped: true, message: "Rate limited" });
    }

    // Increment play count
    const plays = readPlays();
    plays[slug] = (plays[slug] || 0) + 1;
    writePlays(plays);

    return NextResponse.json({
      success: true,
      slug,
      plays: plays[slug],
    });
  } catch (err) {
    console.error("track-play error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// GET — fetch play count for a slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ success: false }, { status: 400 });

  const plays = readPlays();
  return NextResponse.json({ success: true, slug, plays: plays[slug] || 0 });
}
