/**
 * This file merges:
 *  1. Static data from audiobooks.ts / chapters.ts (hardcoded samples)
 *  2. Dynamic data from data/audiobooks.json + data/books.json (uploaded via admin)
 *
 * Use these functions in Server Components for complete merged data.
 */

import { readJSON } from "./db";
import { audiobooks as staticAudiobooks, type Audiobook } from "@/data/audiobooks";
import { chapterBooks as staticChapterBooks, type ChapterBook } from "@/data/chapters";

export function getAllAudiobooks(): Audiobook[] {
  try {
    const dynamic = readJSON<Audiobook>("audiobooks.json");
    return [...staticAudiobooks, ...dynamic];
  } catch {
    return staticAudiobooks;
  }
}

export function getAllChapterBooks(): ChapterBook[] {
  try {
    const dynamic = readJSON<ChapterBook>("books.json");
    return [...staticChapterBooks, ...dynamic];
  } catch {
    return staticChapterBooks;
  }
}
