"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface RecentBook {
  slug: string;
  title: string;
  author: string;
  thumbnail: string;
  category: string;
  visitedAt: number;
}

const STORAGE_KEY = "ha_recently_listened";
const MAX_ITEMS = 6;

export function trackVisit(book: Omit<RecentBook, "visitedAt">) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const list: RecentBook[] = stored ? JSON.parse(stored) : [];
    const filtered = list.filter((b) => b.slug !== book.slug);
    const updated = [{ ...book, visitedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export default function RecentlyListened() {
  const [books, setBooks] = useState<RecentBook[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBooks(JSON.parse(stored));
    } catch {}
  }, []);

  if (books.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
          🕐 Aapne Haal Mein Sune
        </h2>
        <button
          onClick={() => { localStorage.removeItem(STORAGE_KEY); setBooks([]); }}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Clear
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {books.map((book) => (
          <Link key={book.slug} href={`/audiobook/${book.slug}`}
            className="flex-shrink-0 w-36 group">
            <div className="rounded-xl overflow-hidden mb-2 aspect-video"
              style={{
                background: `url(${book.thumbnail}) center/cover, #1A1A2E`,
                border: "2px solid transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FF6B2B")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
            />
            <p className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-[#FF6B2B] transition-colors">
              {book.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{book.author}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
