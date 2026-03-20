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

async function ensureAuthorExists(authorName: string, bookSlug: string, authors: any[]): Promise<void> {
  const authorSlug = makeSlug(authorName);
  const existing = authors.find((a: any) => a.slug === authorSlug);
  if (existing) {
    if (!existing.books?.includes(bookSlug)) {
      existing.books = [...(existing.books || []), bookSlug];
    }
  } else {
    authors.push({
      slug: authorSlug, name: authorName, nationality: "Unknown", genre: [],
      shortBio: `${authorName} ki Hindi audiobooks free mein sunein — HindiAudiobook.com par.`,
      fullBio: `${authorName} ek popular author hain. Inki audiobooks HindiAudiobook.com par free mein available hain.`,
      famousFor: "", books: [bookSlug],
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { books: rawBooks } = await req.json();
    if (!Array.isArray(rawBooks) || rawBooks.length === 0) {
      return NextResponse.json({ success: false, error: "Koi books nahi mili" }, { status: 400 });
    }

    const existingBooks = await readJSONAsync<Audiobook>("audiobooks.json");
    const existingSlugs = new Set(existingBooks.map((b) => b.slug));
    let authors: any[] = (await getAllAuthorsFromKV()) ?? [...SEED_AUTHORS];

    const added: Audiobook[] = [];
    const skipped: string[] = [];
    const errors: string[] = [];

    for (const raw of rawBooks) {
      try {
        const title = raw.title?.trim();
        const author = raw.author?.trim()?.replace(/^by\s+/i, "");
        const videoIdRaw = raw.videoId?.trim() || raw.youtube_url?.trim() || raw.youtube?.trim();

        if (!title) { errors.push(`Row ${raw._row || "?"}: Title missing`); continue; }
        if (!videoIdRaw) { errors.push(`Row ${raw._row || "?"}: YouTube ID/URL missing (title: ${title})`); continue; }

        const videoId = extractVideoId(videoIdRaw);
        const slug = makeSlug(title);

        if (existingSlugs.has(slug)) { skipped.push(title); continue; }

        const newBook: Audiobook = {
          id: nextId([...existingBooks, ...added]),
          title, slug, videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          duration: raw.duration?.trim() || "Unknown",
          category: raw.category?.trim()?.toLowerCase().replace(/\s+/g, "-") || "self-help",
          author: author || "Unknown",
          description: raw.description?.trim() || "",
          trending: String(raw.trending).toLowerCase() === "true" || raw.trending === "1",
          latest: true,
          plays: 0, audioUrl: raw.audioUrl?.trim() || "",
          createdAt: new Date().toISOString(),
        };

        added.push(newBook);
        existingSlugs.add(slug);
        if (author) await ensureAuthorExists(author, slug, authors);
      } catch (e: any) {
        errors.push(`Row: ${raw.title || "?"} — ${e.message}`);
      }
    }

    if (added.length > 0) {
      await writeJSONAsync("audiobooks.json", [...existingBooks, ...added]);
      await saveAllAuthors(authors);
    }

    return NextResponse.json({
      success: true,
      added: added.length,
      skipped: skipped.length,
      errors: errors.length,
      message: `✅ ${added.length} books add hui, ${skipped.length} already existed, ${errors.length} errors`,
      skippedTitles: skipped,
      errorDetails: errors,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
