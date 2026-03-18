import { NextRequest, NextResponse } from "next/server";
import { incrementPlay, getAllPlays } from "@/lib/db";

export const dynamic = "force-dynamic";

const recentPlays = new Map<string, number>();
const COOLDOWN_MS = 30 * 1000;

function isRateLimited(ip: string, slug: string): boolean {
  const key = `${ip}:${slug}`;
  const last = recentPlays.get(key);
  if (last && Date.now() - last < COOLDOWN_MS) return true;
  recentPlays.set(key, Date.now());
  if (recentPlays.size > 1000) {
    const cutoff = Date.now() - COOLDOWN_MS;
    recentPlays.forEach((t, k) => { if (t < cutoff) recentPlays.delete(k); });
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ success: false }, { status: 400 });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip, slug)) return NextResponse.json({ success: true, skipped: true });

    const count = await incrementPlay(slug);
    return NextResponse.json({ success: true, slug, plays: count });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const plays = await getAllPlays();
  if (slug) return NextResponse.json({ success: true, slug, plays: plays[slug] || 0 });
  return NextResponse.json({ success: true, plays });
}
