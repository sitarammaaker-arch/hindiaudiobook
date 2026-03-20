import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync, nextId, makeSlug, extractVideoId, getAllAuthorsFromKV, saveAllAuthors } from "@/lib/db";
import { SEED_AUTHORS } from "@/data/authors";

export const dynamic = "force-dynamic";

type Audiobook = {
  id: number; title: string; slug: string; videoId: string;
  thumbnail: string; duration: string; category: string;
  author: string; description: string; trending: boolean;
  latest: boolean; plays: number; audioUrl: string; createdAt: string;
};

// ── Auto-create author in KV if not exists ────────────────────────────────
async function ensureAuthorExists(authorName: string, bookSlug: string): Promise<void> {
  try {
    const authorSlug = makeSlug(authorName);
    let authors: any[] = (await getAllAuthorsFromKV()) ?? [...SEED_AUTHORS];

    const existing = authors.find((a: any) => a.slug === authorSlug);

    if (existing) {
      // Author exists — add book slug if not already there
      if (!existing.books?.includes(bookSlug)) {
        existing.books = [...(existing.books || []), bookSlug];
        await saveAllAuthors(authors);
      }
    } else {
      // New author — auto-create with basic info
      const newAuthor = {
        slug: authorSlug,
        name: authorName,
        nationality: "Unknown",
        genre: [],
        shortBio: `${authorName} ki Hindi audiobooks free mein sunein — HindiAudiobook.com par.`,
        fullBio: `${authorName} ek popular author hain. Inki audiobooks HindiAudiobook.com par free mein available hain.`,
        famousFor: "",
        books: [bookSlug],
      };
      authors.push(newAuthor);
      await saveAllAuthors(authors);
    }
  } catch (e) {
    console.error("Author auto-create error:", e);
    // Don't fail book upload if author creation fails
  }
}

export async function GET() {
  try {
    const books = await readJSONAsync<Audiobook>("audiobooks.json");
    return NextResponse.json({ success: true, data: books, count: books.length });
  } catch {
    return NextResponse.json({ success: false, data: [], count: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, category, duration, videoIdRaw, audioUrl, trending, latest, description } = body;

    if (!title?.trim()) return NextResponse.json({ success: false, error: "Title zaroori hai" }, { status: 400 });
    if (!author?.trim()) return NextResponse.json({ success: false, error: "Author zaroori hai" }, { status: 400 });
    if (!videoIdRaw?.trim()) return NextResponse.json({ success: false, error: "YouTube Video ID zaroori hai" }, { status: 400 });

    const books = await readJSONAsync<Audiobook>("audiobooks.json");
    const videoId = extractVideoId(videoIdRaw);
    const slug = makeSlug(title);
    const authorName = author.trim().replace(/^by\s+/i, "");

    if (books.find((b) => b.slug === slug)) {
      return NextResponse.json({ success: false, error: "Is title ka audiobook already exist karta hai" }, { status: 409 });
    }

    const newBook: Audiobook = {
      id: nextId(books),
      title: title.trim(), slug, videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      duration: duration?.trim() || "Unknown",
      category: category || "self-help",
      author: authorName,
      description: description?.trim() || "",
      trending: Boolean(trending),
      latest: true, // Naye upload hamesha "Latest" section mein dikhein
      plays: 0, audioUrl: audioUrl?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    books.push(newBook);
    await writeJSONAsync("audiobooks.json", books);

    // Auto-create/update author in KV
    await ensureAuthorExists(authorName, slug);

    return NextResponse.json({ success: true, data: newBook, message: `"${newBook.title}" successfully add ho gaya! 🎉` });
  } catch (err: any) {
    console.error("POST /api/audiobooks error:", err);
    return NextResponse.json({ success: false, error: err?.message || "Server error" }, { status: 500 });
  }
}
