import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync, nextId, makeSlug, extractVideoId } from "@/lib/db";

export const dynamic = "force-dynamic";

type Book = {
  id: number; title: string; slug: string; author: string;
  category: string; totalChapters: number; totalDuration: string;
  description: string; trending: boolean; latest: boolean;
  thumbnail: string; chapters: any[]; createdAt: string;
};

export async function GET() {
  try {
    const books = await readJSONAsync<Book>("books.json");
    return NextResponse.json({ success: true, data: books, count: books.length });
  } catch {
    return NextResponse.json({ success: false, data: [], count: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, category, totalDuration, videoIdRaw, thumbnail, trending, latest, description } = body;

    if (!title?.trim()) return NextResponse.json({ success: false, error: "Title zaroori hai" }, { status: 400 });
    if (!author?.trim()) return NextResponse.json({ success: false, error: "Author zaroori hai" }, { status: 400 });

    const books = await readJSONAsync<Book>("books.json");
    const slug = makeSlug(title);

    if (books.find((b) => b.slug === slug)) {
      return NextResponse.json({ success: false, error: "Is title ki book already exist karti hai" }, { status: 409 });
    }

    const videoId = videoIdRaw ? extractVideoId(videoIdRaw) : "";
    const newBook: Book = {
      id: nextId(books),
      title: title.trim(), slug,
      author: author.trim(),
      category: category || "self-help",
      totalChapters: 0,
      totalDuration: totalDuration?.trim() || "Unknown",
      description: description?.trim() || "",
      trending: Boolean(trending),
      latest: Boolean(latest),
      thumbnail: thumbnail?.trim() || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ""),
      chapters: [],
      createdAt: new Date().toISOString(),
    };

    books.push(newBook);
    await writeJSONAsync("books.json", books);

    return NextResponse.json({ success: true, data: newBook, message: `"${newBook.title}" create ho gayi!` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
