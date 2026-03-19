// ── Unified Data Layer ─────────────────────────────────────────────────────
// Single source of truth for ALL pages
// static audiobooks.ts + KV uploaded books = MERGED everywhere

import { readJSONAsync, getAllPlays } from "./db";
import { audiobooks as staticBooks, categories, type Audiobook } from "@/data/audiobooks";
import { chapterBooks as staticChapterBooks, type ChapterBook } from "@/data/chapters";

// ── Core fetch ─────────────────────────────────────────────────────────────
export async function getAllAudiobooks(): Promise<Audiobook[]> {
  try {
    const [dynamic, plays] = await Promise.all([
      readJSONAsync<Audiobook>("audiobooks.json"),
      getAllPlays(),
    ]);
    const merge = (b: Audiobook): Audiobook => ({
      ...b,
      plays: (plays[b.slug] ?? 0) + (b.plays || 0),
      author: b.author?.replace(/^by\s+/i, "") || b.author || "",
      category: b.category?.trim() || "self-help",
    });
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

// ── Filtered queries ───────────────────────────────────────────────────────
export async function getBooksByCategory(slug: string): Promise<Audiobook[]> {
  const all = await getAllAudiobooks();
  return all.filter((b) => b.category === slug);
}

export async function getBookBySlug(slug: string): Promise<Audiobook | undefined> {
  const all = await getAllAudiobooks();
  return all.find((b) => b.slug === slug);
}

export async function getTrendingBooks(limit = 9): Promise<Audiobook[]> {
  const all = await getAllAudiobooks();
  return all.filter((b) => b.trending).sort((a, b) => (b.plays || 0) - (a.plays || 0)).slice(0, limit);
}

export async function getLatestBooks(limit = 9): Promise<Audiobook[]> {
  const all = await getAllAudiobooks();
  return all.filter((b) => b.latest).sort((a, b) => (b.plays || 0) - (a.plays || 0)).slice(0, limit);
}

export async function getRelatedBooks(slug: string, category: string, limit = 4): Promise<Audiobook[]> {
  const all = await getAllAudiobooks();
  return all.filter((b) => b.category === category && b.slug !== slug).slice(0, limit);
}

// Category counts — for homepage category section
export async function getCategoryCounts(): Promise<Record<string, number>> {
  const all = await getAllAudiobooks();
  const counts: Record<string, number> = {};
  for (const cat of categories) counts[cat.slug] = 0;
  for (const b of all) {
    if (b.category && counts[b.category] !== undefined) counts[b.category]++;
  }
  return counts;
}

export { categories };
export type { Audiobook, ChapterBook };
