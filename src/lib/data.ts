// ── Unified Data Layer ─────────────────────────────────────────────────────
import { readJSONAsync, getAllPlays, getAllAuthorsFromKV, saveAllAuthors } from "./db";
import { audiobooks as staticBooks, categories, type Audiobook } from "@/data/audiobooks";
import { chapterBooks as staticChapterBooks, type ChapterBook } from "@/data/chapters";
import { SEED_AUTHORS, type Author } from "@/data/authors";

// ── Audiobooks ─────────────────────────────────────────────────────────────
export async function getAllAudiobooks(): Promise<Audiobook[]> {
  let dynamic: Audiobook[] = [];
  let plays: Record<string, number> = {};

  try { dynamic = await readJSONAsync<Audiobook>("audiobooks.json"); } catch {}
  try { plays = await getAllPlays(); } catch {}

  const merge = (b: Audiobook): Audiobook => ({
    ...b,
    plays: (plays[b.slug] ?? 0) + (b.plays || 0),
    author: b.author?.replace(/^by\s+/i, "") || b.author || "",
    category: b.category?.trim() || "self-help",
  });

  try {
    return [...staticBooks.map(merge), ...dynamic.map(merge)];
  } catch {
    return staticBooks;
  }
}

export async function getAllChapterBooks(): Promise<ChapterBook[]> {
  try {
    const dynamic = await readJSONAsync<ChapterBook>("books.json");
    return [...staticChapterBooks, ...dynamic];
  } catch {
    return staticChapterBooks;
  }
}

// ── Content quality (AdSense / SEO) ────────────────────────────────────────
// Pages with only a few words of our own text are "low-value content" for
// AdSense. They stay playable, but are noindexed, left out of the sitemap and
// get no manual ad units until a proper description is written.
export const MIN_INDEXABLE_WORDS = 100;

export function descriptionWordCount(book: Pick<Audiobook, "description">): number {
  return (book.description || "").split(/\s+/).filter(Boolean).length;
}

export function isIndexable(book: Pick<Audiobook, "description">): boolean {
  return descriptionWordCount(book) >= MIN_INDEXABLE_WORDS;
}

// An author's books: listed in author.books, or matched by full name, or by
// last name (e.g. "Douglas" matches "Mark Douglas").
export function getBooksForAuthor(author: Author, allBooks: Audiobook[]): Audiobook[] {
  const authorNameLower = author.name.toLowerCase();
  const authorLastName = author.name.split(" ").pop()?.toLowerCase() || "";
  return allBooks.filter((b) => {
    const bookAuthor = b.author?.replace(/^by\s+/i, "").toLowerCase().trim() || "";
    return (
      author.books?.includes(b.slug) ||
      bookAuthor === authorNameLower ||
      (authorLastName.length > 3 && bookAuthor.includes(authorLastName))
    );
  });
}

// Authors added through the admin get a one-line template bio ("X ek popular
// author hain…", sometimes with an "Admin se … Edit karein" note) until a real
// one is written. That text says nothing about the author, so don't show it.
const TEMPLATE_BIO = /ek popular author hain\. Inki audiobooks HindiAudiobook\.com par free mein available hain|Admin se is author ki bio update/i;

export function hasRealBio(author: Author): boolean {
  return !!author.fullBio && !TEMPLATE_BIO.test(author.fullBio);
}

// Index an author page only when it has its own text (a real bio) and links to
// at least one indexable book; otherwise it is a thin page.
export function isAuthorIndexable(author: Author, allBooks: Audiobook[]): boolean {
  return hasRealBio(author) && getBooksForAuthor(author, allBooks).some(isIndexable);
}

// Listing pages pass books to client components; descriptions aren't shown on
// cards, so drop them to keep the page payload small.
export function toCardBook(book: Audiobook): Audiobook {
  return { ...book, description: "" };
}

// ── Filtered queries ───────────────────────────────────────────────────────
export async function getBooksByCategory(slug: string): Promise<Audiobook[]> {
  try {
    const all = await getAllAudiobooks();
    return all.filter((b) => b.category === slug);
  } catch { return []; }
}

export async function getBookBySlug(slug: string): Promise<Audiobook | undefined> {
  try {
    const all = await getAllAudiobooks();
    return all.find((b) => b.slug === slug);
  } catch { return undefined; }
}

export async function getTrendingBooks(limit = 9): Promise<Audiobook[]> {
  try {
    const all = await getAllAudiobooks();
    return all.filter((b) => b.trending).sort((a, b) => (b.plays||0) - (a.plays||0)).slice(0, limit);
  } catch { return []; }
}

export async function getLatestBooks(limit = 9): Promise<Audiobook[]> {
  try {
    const all = await getAllAudiobooks();
    return all.filter((b) => b.latest).sort((a, b) => (b.plays||0) - (a.plays||0)).slice(0, limit);
  } catch { return []; }
}

export async function getRelatedBooks(slug: string, category: string, limit = 4): Promise<Audiobook[]> {
  try {
    const all = await getAllAudiobooks();
    return all.filter((b) => b.category === category && b.slug !== slug).slice(0, limit);
  } catch { return []; }
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  try {
    const all = await getAllAudiobooks();
    const counts: Record<string, number> = {};
    for (const cat of categories) counts[cat.slug] = 0;
    for (const b of all) {
      if (b.category && counts[b.category] !== undefined) counts[b.category]++;
    }
    return counts;
  } catch { return {}; }
}

// ── Authors ────────────────────────────────────────────────────────────────
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const kvAuthors = await getAllAuthorsFromKV();
    if (kvAuthors !== null && kvAuthors.length > 0) return kvAuthors as Author[];
    await saveAllAuthors(SEED_AUTHORS);
    return SEED_AUTHORS;
  } catch {
    return SEED_AUTHORS;
  }
}

// ── Re-exports ─────────────────────────────────────────────────────────────
export { categories };
export type { Audiobook, ChapterBook, Author };
