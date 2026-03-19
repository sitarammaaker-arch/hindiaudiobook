import { NextRequest, NextResponse } from "next/server";
import { getAllAuthorsFromKV, saveAllAuthors, deleteAuthor } from "@/lib/db";
import { SEED_AUTHORS, type Author } from "@/data/authors";

export const dynamic = "force-dynamic";

async function getAuthors(): Promise<Author[]> {
  const kv = await getAllAuthorsFromKV();
  return (kv ?? SEED_AUTHORS) as Author[];
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json();
    const authors = await getAuthors();
    const idx = authors.findIndex((a) => a.slug === params.slug);
    if (idx === -1) return NextResponse.json({ success: false, error: "Author nahi mila" }, { status: 404 });

    authors[idx] = {
      ...authors[idx],
      ...body,
      slug: authors[idx].slug, // slug change nahi hoga
      genre: Array.isArray(body.genre) ? body.genre : (body.genre || authors[idx].genre),
      books: Array.isArray(body.books) ? body.books : (body.books || authors[idx].books),
    };

    await saveAllAuthors(authors);
    return NextResponse.json({ success: true, data: authors[idx] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await deleteAuthor(params.slug);
    return NextResponse.json({ success: true, message: "Author delete ho gaye" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
