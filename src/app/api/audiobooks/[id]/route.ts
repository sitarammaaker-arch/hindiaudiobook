import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

type Audiobook = { id: number; [key: string]: unknown };

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const books = readJSON<Audiobook>("audiobooks.json");
  const id = Number(params.id);
  const filtered = books.filter((b) => b.id !== id);
  if (filtered.length === books.length) {
    return NextResponse.json({ success: false, error: "Audiobook nahi mila" }, { status: 404 });
  }
  writeJSON("audiobooks.json", filtered);
  return NextResponse.json({ success: true, message: "Audiobook delete ho gaya" });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const books = readJSON<Audiobook>("audiobooks.json");
  const id = Number(params.id);
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: "Audiobook nahi mila" }, { status: 404 });
  const updates = await req.json();
  books[idx] = { ...books[idx], ...updates };
  writeJSON("audiobooks.json", books);
  return NextResponse.json({ success: true, data: books[idx] });
}
