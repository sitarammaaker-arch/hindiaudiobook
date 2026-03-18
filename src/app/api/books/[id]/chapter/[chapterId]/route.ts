import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

type Chapter = { id: number; [key: string]: unknown };
type Book = { id: number; chapters: Chapter[]; totalChapters: number; [key: string]: unknown };

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
  const books = await readJSONAsync<Book>("books.json");
  const bookId = Number(params.id);
  const chapterId = Number(params.chapterId);

  const bookIdx = books.findIndex((b) => b.id === bookId);
  if (bookIdx === -1) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });

  const before = books[bookIdx].chapters.length;
  books[bookIdx].chapters = books[bookIdx].chapters.filter((c) => c.id !== chapterId);

  if (books[bookIdx].chapters.length === before) {
    return NextResponse.json({ success: false, error: "Chapter nahi mila" }, { status: 404 });
  }

  books[bookIdx].totalChapters = books[bookIdx].chapters.length;
  writeJSON("books.json", books);
  return NextResponse.json({ success: true, message: "Chapter delete ho gaya" });
}
