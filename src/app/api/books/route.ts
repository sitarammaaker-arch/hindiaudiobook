import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, nextId, makeSlug, extractVideoId } from "@/lib/db";

type Chapter = {
  id: number;
  chapterNumber: number;
  title: string;
  slug: string;
  duration: string;
  description: string;
  audioUrl: string;
  videoId: string;
  thumbnail: string;
  isFree: boolean;
};

type Book = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  author: string;
  totalChapters: number;
  totalDuration: string;
  description: string;
  trending: boolean;
  latest: boolean;
  plays: number;
  hasChapters: true;
  chapters: Chapter[];
  createdAt: string;
};

export async function GET() {
  const books = readJSON<Book>("books.json");
  return NextResponse.json({ success: true, data: books, count: books.length });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, category, totalDuration, description, trending, latest, videoIdRaw } = body;

    if (!title?.trim()) return NextResponse.json({ success: false, error: "Title zaroori hai" }, { status: 400 });
    if (!author?.trim()) return NextResponse.json({ success: false, error: "Author zaroori hai" }, { status: 400 });

    const books = readJSON<Book>("books.json");
    const slug = makeSlug(title) + "-chapters";
    const videoId = extractVideoId(videoIdRaw || "");

    if (books.find((b) => b.slug === slug)) {
      return NextResponse.json({ success: false, error: "Is naam ki book already exist karti hai" }, { status: 409 });
    }

    const newBook: Book = {
      id: nextId(books),
      title: title.trim(),
      slug,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",
      category: category || "motivational",
      author: author.trim(),
      totalChapters: 0,
      totalDuration: totalDuration?.trim() || "Unknown",
      description: description?.trim() || "",
      trending: Boolean(trending),
      latest: Boolean(latest),
      plays: 0,
      hasChapters: true,
      chapters: [],
      createdAt: new Date().toISOString(),
    };

    books.push(newBook);
    writeJSON("books.json", books);

    return NextResponse.json({ success: true, data: newBook, message: "Book create ho gayi! Ab chapters add karein." });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
