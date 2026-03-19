import { NextResponse } from "next/server";
import { readJSONAsync } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour server cache

type ViewCache = {
  updatedAt: string;
  views: Record<string, number>;
};

export async function GET() {
  try {
    const cached = await readJSONAsync<ViewCache>("yt-views-cache.json");
    if (cached.length > 0) {
      return NextResponse.json({
        success: true,
        views: cached[0].views,
        updatedAt: cached[0].updatedAt,
      }, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      });
    }
    return NextResponse.json({ success: false, views: {}, updatedAt: null });
  } catch {
    return NextResponse.json({ success: false, views: {}, updatedAt: null });
  }
}
