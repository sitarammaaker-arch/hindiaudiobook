import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync } from "@/lib/db";

export const dynamic = "force-dynamic";

const YT_API_KEY = process.env.YOUTUBE_API_KEY;
const CACHE_KEY = "yt-views-cache.json";

type ViewCache = {
  updatedAt: string;
  views: Record<string, number>;
};

async function fetchYouTubeViews(videoIds: string[]): Promise<Record<string, number>> {
  if (!YT_API_KEY) throw new Error("YOUTUBE_API_KEY not set in Vercel env vars");
  const ids = videoIds.join(",");
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${YT_API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  const data = await res.json();
  const result: Record<string, number> = {};
  for (const item of data.items || []) {
    result[item.id] = parseInt(item.statistics?.viewCount || "0", 10);
  }
  return result;
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const books = await readJSONAsync<{ videoId: string; slug: string }>("audiobooks.json");
    if (books.length === 0) return NextResponse.json({ success: false, message: "No books" });

    const uniqueIds = Array.from(new Set(books.map((b) => b.videoId).filter(Boolean)));
    let allViews: Record<string, number> = {};
    for (let i = 0; i < uniqueIds.length; i += 50) {
      const batch = uniqueIds.slice(i, i + 50);
      const batchViews = await fetchYouTubeViews(batch);
      allViews = { ...allViews, ...batchViews };
    }

    const cache: ViewCache = { updatedAt: new Date().toISOString(), views: allViews };
    await writeJSONAsync(CACHE_KEY, [cache]);

    return NextResponse.json({
      success: true,
      message: `${Object.keys(allViews).length} videos updated`,
      updatedAt: cache.updatedAt,
      views: allViews,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
