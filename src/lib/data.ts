/**
 * Merged data layer:
 *  1. Static audiobooks.ts (hardcoded)
 *  2. Dynamic /tmp/audiobooks.json (admin uploads)
 *  3. Dynamic /tmp/plays.json (play counts — auto-updated)
 */

import { readJSON } from "./db";
import { audiobooks as staticAudiobooks, type Audiobook } from "@/data/audiobooks";
import { chapterBooks as staticChapterBooks, type ChapterBook } from "@/data/chapters";
import fs from "fs";
import path from "path";

type PlaysMap = Record<string, number>;

function readPlays(): PlaysMap {
  try {
    const file = path.join(
      process.env.VERCEL ? "/tmp/hindiaudiobook-data" : path.join(process.cwd(), "data"),
      "plays.json"
    );
    if (!fs.existsSync(file)) return {};
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch { return {}; }
}

export function getAllAudiobooks(): Audiobook[] {
  try {
    const dynamic = readJSON<Audiobook>("audiobooks.json");
    const plays   = readPlays();

    // Merge play counts into both static and dynamic books
    const merge = (book: Audiobook): Audiobook => ({
      ...book,
      plays: (plays[book.slug] ?? 0) + (book.plays || 0),
    });

    return [...staticAudiobooks.map(merge), ...dynamic.map(merge)];
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
