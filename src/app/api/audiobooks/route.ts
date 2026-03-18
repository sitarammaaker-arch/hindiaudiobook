import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, nextId, makeSlug, extractVideoId } from "@/lib/db";

type Audiobook = {
  id: number;
  title: string;
  slug: string;
  videoId: string;
  thumbnail: string;
  duration: string;
  category: string;
  author: string;
  description: string;
  trending: boolean;
  latest: boolean;
  plays: number;
  audioUrl: string;
  createdAt: string;
};

export async function GET() {
  try {
    const books = readJSON<Audiobook>("audiobooks.json");
    return NextResponse.json({ success: true, data: books, count: books.length });
  } catch (err) {
    return NextResponse.json({ success: false, data: [], count: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, category, duration, videoIdRaw, audioUrl, trending, latest, description } = body;

    if (!title?.trim()) return NextResponse.json({ success: false, error: "Title zaroori hai" }, { status: 400 });
    if (!author?.trim()) return NextResponse.json({ success: false, error: "Author zaroori hai" }, { status: 400 });
    if (!videoIdRaw?.trim()) return NextResponse.json({ success: false, error: "YouTube Video ID zaroori hai" }, { status: 400 });

    const books = readJSON<Audiobook>("audiobooks.json");
    const videoId = extractVideoId(videoIdRaw);
    const slug = makeSlug(title);

    if (books.find((b) => b.slug === slug)) {
      return NextResponse.json({ success: false, error: "Is title ka audiobook already exist karta hai" }, { status: 409 });
    }

    const newBook: Audiobook = {
      id: nextId(books),
      title: title.trim(),
      slug,
      videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: duration?.trim() || "Unknown",
      category: category || "self-help",
      author: author.trim(),
      description: description?.trim() || "",
      trending: Boolean(trending),
      latest: Boolean(latest),
      plays: 0,
      audioUrl: audioUrl?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    books.push(newBook);
    writeJSON("audiobooks.json", books);

    return NextResponse.json({
      success: true,
      data: newBook,
      message: "Audiobook successfully add ho gaya!",
    });
  } catch (err: any) {
    console.error("POST /api/audiobooks error:", err);
    return NextResponse.json({
      success: false,
      error: err?.message || "Server error — dobara try karein",
    }, { status: 500 });
  }
}
