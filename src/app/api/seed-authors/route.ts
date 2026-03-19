import { NextResponse } from "next/server";
import { saveAllAuthors, getAllAuthorsFromKV, readJSONAsync, makeSlug } from "@/lib/db";
import { SEED_AUTHORS } from "@/data/authors";

export const dynamic = "force-dynamic";

type Audiobook = { slug: string; author: string; };

export async function GET() {
  try {
    // Get existing KV authors (or start with seed)
    let authors: any[] = (await getAllAuthorsFromKV()) ?? [...SEED_AUTHORS];

    // Get all uploaded books from KV
    const uploadedBooks = await readJSONAsync<Audiobook>("audiobooks.json");

    let newAuthorsCreated = 0;
    let booksLinked = 0;

    for (const book of uploadedBooks) {
      if (!book.author) continue;

      const authorName = book.author.replace(/^by\s+/i, "").trim();
      if (!authorName) continue;

      const authorSlug = makeSlug(authorName);
      const existing = authors.find((a: any) => a.slug === authorSlug);

      if (existing) {
        // Add book to existing author if not already there
        if (!existing.books?.includes(book.slug)) {
          existing.books = [...(existing.books || []), book.slug];
          booksLinked++;
        }
      } else {
        // Create new author entry
        authors.push({
          slug: authorSlug,
          name: authorName,
          nationality: "Unknown",
          genre: [],
          shortBio: `${authorName} ki Hindi audiobooks free mein sunein — HindiAudiobook.com par.`,
          fullBio: `${authorName} ek popular author hain. Inki audiobooks HindiAudiobook.com par free mein available hain.\n\nAdmin se is author ki bio update kar sakte hain — Authors tab mein jaayein aur Edit karein.`,
          famousFor: "",
          books: [book.slug],
        });
        newAuthorsCreated++;
      }
    }

    await saveAllAuthors(authors);

    return NextResponse.json({
      success: true,
      message: `Sync complete — ${newAuthorsCreated} naye authors created, ${booksLinked} books linked`,
      totalAuthors: authors.length,
      authors: authors.map((a: any) => ({ slug: a.slug, name: a.name, books: a.books?.length || 0 })),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
