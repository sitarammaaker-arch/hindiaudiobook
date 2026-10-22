import { NextRequest, NextResponse } from "next/server";
import { gunzipSync } from "zlib";
import { requireAdmin } from "@/lib/adminAuth";
import {
  listScheduledSummaries, validateSummary, upsertScheduledSummaries, deleteScheduledSummary,
} from "@/lib/summaries";

export const dynamic = "force-dynamic";

// GET: schedule overview (no summary text) — admin only, since it reveals
// titles and dates of summaries that are not live yet
export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const all = await listScheduledSummaries();
  const now = Date.now();
  const data = all
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      audiobookSlug: s.audiobookSlug,
      publishAt: s.publishAt ?? null,
      live: !s.publishAt || Date.parse(s.publishAt) <= now,
    }))
    .sort((a, b) => (a.publishAt ?? "").localeCompare(b.publishAt ?? ""));
  return NextResponse.json({ success: true, count: data.length, data });
}

// PUT: add or replace summaries by slug.
// Body: { summaries: BookSummary[] } or { gz: "<base64 gzip of that array>" }
// (gzip keeps large Devanagari batches small).
export async function PUT(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  try {
    const body = await req.json();
    const items = body.gz
      ? JSON.parse(gunzipSync(Buffer.from(body.gz, "base64")).toString("utf8"))
      : body.summaries;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "summaries array zaroori hai" }, { status: 400 });
    }
    for (const s of items) {
      const err = validateSummary(s);
      if (err) return NextResponse.json({ success: false, error: err }, { status: 400 });
    }
    const total = await upsertScheduledSummaries(items);
    return NextResponse.json({ success: true, saved: items.length, total });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

// DELETE ?slug=...
export async function DELETE(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ success: false, error: "slug zaroori hai" }, { status: 400 });
  const total = await deleteScheduledSummary(slug);
  return NextResponse.json({ success: true, total });
}
