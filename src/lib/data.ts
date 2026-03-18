// ── Merged data layer ──────────────────────────────────────────────────────
// getAllAudiobooks() = static (audiobooks.ts) + dynamic (Vercel KV / local JSON)
// Works in both Server Components and API routes

import { readJSONAsync, getAllPlays } from "./db";
import { audiobooks as staticAudiobooks, type Audiobook } from "@/data/audiobooks";
import { chapterBooks as staticChapterBooks, type ChapterBook } from "@/data/chapters";

export async function getAllAudiobooks(): Promise<Audiobook[]> {
  try {
    const [dynamic, plays] = await Promise.all([
      readJSONAsync<Audiobook>("audiobooks.json"),
      getAllPlays(),
    ]);

    const merge = (book: Audiobook): Audiobook => ({
      ...book,
      plays: (plays[book.slug] ?? 0) + (book.plays || 0),
    });

    return [...staticAudiobooks.map(merge), ...dynamic.map(merge)];
  } catch {
    return staticAudiobooks;
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
