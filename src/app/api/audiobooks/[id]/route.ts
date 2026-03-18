import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync } from "@/lib/db";

export const dynamic = "force-dynamic";

type Audiobook = {
  id: number; title: string; slug: string; videoId: string;
  thumbnail: string; duration: string; category: string;
  author: string; description: string; trending: boolean;
  latest: boolean; plays: number; audioUrl: string; createdAt: string;
};

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const books = await readJSONAsync<Audiobook>("audiobooks.json");
    const filtered = books.filter((b) => b.id !== id);
    if (filtered.length === books.length) {
      return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });
    }
    await writeJSONAsync("audiobooks.json", filtered);
    return NextResponse.json({ success: true, message: "Audiobook delete ho gayi" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const books = await readJSONAsync<Audiobook>("audiobooks.json");
    const idx = books.findIndex((b) => b.id === id);
    if (idx === -1) return NextResponse.json({ success: false, error: "Book nahi mili" }, { status: 404 });
    books[idx] = { ...books[idx], ...body };
    await writeJSONAsync("audiobooks.json", books);
    return NextResponse.json({ success: true, data: books[idx] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
