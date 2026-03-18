import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync } from "@/lib/db";

export const dynamic = "force-dynamic";

type Chapter = { id: number; [key: string]: unknown };
type Book = { id: number; chapters: Chapter[]; totalChapters: number; [key: string]: unknown };

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
  try {
    const books = await readJSONAsync<Book>("books.json");
    const bookId = Number(params.id);
    const chapterId = Number(params.chapterId);

    const bookIdx = books.findIndex((b) => b.id === bookId);
    if (bookIdx === -1) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });

    books[bookIdx].chapters = books[bookIdx].chapters.filter((c) => c.id !== chapterId);
    books[bookIdx].totalChapters = books[bookIdx].chapters.length;

    await writeJSONAsync("books.json", books);
    return NextResponse.json({ success: true, message: "Chapter delete ho gaya" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
