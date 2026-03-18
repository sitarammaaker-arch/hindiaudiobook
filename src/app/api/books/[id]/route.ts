import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync, nextId } from "@/lib/db";

export const dynamic = "force-dynamic";

type Chapter = {
  id: number; chapterNumber: number; title: string; slug: string;
  duration: string; description: string; audioUrl: string;
  videoId: string; isFree: boolean;
};
type Book = {
  id: number; title: string; slug: string; author: string;
  category: string; totalChapters: number; totalDuration: string;
  description: string; trending: boolean; latest: boolean;
  thumbnail: string; chapters: Chapter[]; createdAt: string;
};

// GET single book
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const books = await readJSONAsync<Book>("books.json");
    const book = books.find((b) => b.id === Number(params.id));
    if (!book) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });
    return NextResponse.json({ success: true, data: book });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

// POST — add chapter to book
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const books = await readJSONAsync<Book>("books.json");
    const bookIdx = books.findIndex((b) => b.id === Number(params.id));
    if (bookIdx === -1) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });

    const newChapter: Chapter = {
      id: nextId(books[bookIdx].chapters),
      chapterNumber: books[bookIdx].chapters.length + 1,
      title: body.title?.trim() || "Chapter",
      slug: `chapter-${books[bookIdx].chapters.length + 1}-${(body.title || "").toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").substring(0, 40)}`,
      duration: body.duration?.trim() || "Unknown",
      description: body.description?.trim() || "",
      audioUrl: body.audioUrl?.trim() || "",
      videoId: body.videoId?.trim() || "",
      isFree: Boolean(body.isFree),
    };

    books[bookIdx].chapters.push(newChapter);
    books[bookIdx].totalChapters = books[bookIdx].chapters.length;
    await writeJSONAsync("books.json", books);

    return NextResponse.json({ success: true, data: newChapter, message: `Chapter "${newChapter.title}" add ho gaya!` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

// DELETE book
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const books = await readJSONAsync<Book>("books.json");
    const filtered = books.filter((b) => b.id !== Number(params.id));
    if (filtered.length === books.length) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });
    await writeJSONAsync("books.json", filtered);
    return NextResponse.json({ success: true, message: "Book delete ho gayi" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
