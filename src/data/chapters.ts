// ─────────────────────────────────────────────
// Chapter Types
// ─────────────────────────────────────────────
export type Chapter = {
  id: number;
  chapterNumber: number;       // 1, 2, 3 ...
  title: string;               // "Chapter 1: Pehli Mulakat"
  slug: string;                // "chapter-1-pehli-mulakat"
  duration: string;            // "32m"
  description: string;        // Short chapter summary
  audioUrl: string;           // Direct MP3 URL (lock screen play)
  videoId: string;            // YouTube video ID (fallback)
  thumbnail: string;          // Chapter thumbnail (or same as book)
  isFree: boolean;            // Free preview chapter or paid
};

export type ChapterBook = {
  id: number;
  title: string;
  slug: string;                // Route: /audiobook/[slug]
  thumbnail: string;
  category: string;
  author: string;
  totalChapters: number;
  totalDuration: string;       // Total book duration
  description: string;
  trending?: boolean;
  latest?: boolean;
  plays: number;
  hasChapters: true;           // Flag to distinguish from single audiobooks
  chapters: Chapter[];
};

// ─────────────────────────────────────────────
// Helper: make chapter slug
// ─────────────────────────────────────────────
function chSlug(n: number, title: string) {
  return `chapter-${n}-${title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")}`;
}

// ─────────────────────────────────────────────
// Sample Chapter Books (3 books with full chapters)
// Replace audioUrl with your real MP3 URLs
// Replace videoId with real YouTube IDs
// ─────────────────────────────────────────────
// Static dummy chapter books hataye gaye — ab sirf Admin se KV mein upload karo
// Admin → New Book tab → Chapter Book banao → Chapter tab se chapters add karo
export const chapterBooks: ChapterBook[] = [];

// ─────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────
export function getChapterBookBySlug(slug: string): ChapterBook | undefined {
  return chapterBooks.find((b) => b.slug === slug);
}

export function getChapterBySlug(
  bookSlug: string,
  chapterSlug: string
): { book: ChapterBook; chapter: Chapter } | undefined {
  const book = getChapterBookBySlug(bookSlug);
  if (!book) return undefined;
  const chapter = book.chapters.find((c: Chapter) => c.slug === chapterSlug);
  if (!chapter) return undefined;
  return { book, chapter };
}

export function getAdjacentChapters(
  book: ChapterBook,
  currentChapterId: number
): { prev: Chapter | null; next: Chapter | null } {
  const idx = book.chapters.findIndex((c: Chapter) => c.id === currentChapterId);
  return {
    prev: idx > 0 ? book.chapters[idx - 1] : null,
    next: idx < book.chapters.length - 1 ? book.chapters[idx + 1] : null,
  };
}

export function getTotalFreeChapters(book: ChapterBook): number {
  return book.chapters.filter((c: Chapter) => c.isFree).length;
}
