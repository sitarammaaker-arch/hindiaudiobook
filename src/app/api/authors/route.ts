import { NextRequest, NextResponse } from "next/server";
import { getAllAuthorsFromKV, saveAllAuthors } from "@/lib/db";
import { SEED_AUTHORS, makeAuthorSlug, type Author } from "@/data/authors";

export const dynamic = "force-dynamic";

async function getAuthors(): Promise<Author[]> {
  const kv = await getAllAuthorsFromKV();
  if (kv !== null) return kv as Author[];
  await saveAllAuthors(SEED_AUTHORS);
  return SEED_AUTHORS;
}

export async function GET() {
  try {
    const authors = await getAuthors();
    return NextResponse.json({ success: true, data: authors, count: authors.length });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, nationality, born, died, genre, shortBio, fullBio, famousFor, books, wikipedia } = body;

    if (!name?.trim()) return NextResponse.json({ success: false, error: "Name zaroori hai" }, { status: 400 });

    const authors = await getAuthors();
    const slug = makeAuthorSlug(name);

    if (authors.find((a) => a.slug === slug)) {
      return NextResponse.json({ success: false, error: "Is naam ka author already exist karta hai" }, { status: 409 });
    }

    const newAuthor: Author = {
      slug,
      name: name.trim(),
      nationality: nationality?.trim() || "Unknown",
      ...(born ? { born: born.trim() } : {}),
      ...(died ? { died: died.trim() } : {}),
      genre: Array.isArray(genre) ? genre : (genre || "").split(",").map((g: string) => g.trim()).filter(Boolean),
      shortBio: shortBio?.trim() || "",
      fullBio: fullBio?.trim() || "",
      famousFor: famousFor?.trim() || "",
      books: Array.isArray(books) ? books : (books || "").split(",").map((b: string) => b.trim()).filter(Boolean),
      ...(wikipedia ? { wikipedia: wikipedia.trim() } : {}),
    };

    authors.push(newAuthor);
    await saveAllAuthors(authors);

    return NextResponse.json({ success: true, data: newAuthor, message: `"${newAuthor.name}" add ho gaye!` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
