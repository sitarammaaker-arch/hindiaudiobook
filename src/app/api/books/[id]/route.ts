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
  totalChapters: number;
  chapters: Chapter[];
  [key: string]: unknown;
};

// POST /api/books/[id]/chapter — add chapter to book
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const books = await readJSONAsync<Book>("books.json");
    const bookId = Number(params.id);
    const idx = books.findIndex((b) => b.id === bookId);

    if (idx === -1) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });

    const body = await req.json();
    const { title, chapterNumber, duration, description, audioUrl, videoIdRaw, isFree } = body;

    if (!title?.trim()) return NextResponse.json({ success: false, error: "Chapter title zaroori hai" }, { status: 400 });

    const book = books[idx];
    const videoId = extractVideoId(videoIdRaw || "");
    const chapNum = Number(chapterNumber) || book.chapters.length + 1;

    // All chapter ids across all books for unique id
    const allChapIds = books.flatMap((b) => b.chapters.map((c) => c.id));
    const newChapterId = allChapIds.length > 0 ? Math.max(...allChapIds) + 1 : 1;

    const newChapter: Chapter = {
      id: newChapterId,
      chapterNumber: chapNum,
      title: title.trim(),
      slug: `chapter-${chapNum}-${makeSlug(title)}`,
      duration: duration?.trim() || "Unknown",
      description: description?.trim() || "",
      audioUrl: audioUrl?.trim() || "",
      videoId,
      thumbnail: book.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ""),
      isFree: Boolean(isFree),
    };

    book.chapters.push(newChapter);
    book.totalChapters = book.chapters.length;
    books[idx] = book;
    writeJSON("books.json", books);

    return NextResponse.json({ success: true, data: newChapter, message: `Chapter ${chapNum} add ho gaya!` });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/books/[id] — delete whole book
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const books = await readJSONAsync<Book>("books.json");
  const id = Number(params.id);
  const filtered = books.filter((b) => b.id !== id);
  if (filtered.length === books.length) {
    return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });
  }
  writeJSON("books.json", filtered);
  return NextResponse.json({ success: true, message: "Book delete ho gayi" });
}
