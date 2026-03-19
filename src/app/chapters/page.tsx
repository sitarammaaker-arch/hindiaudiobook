"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { categories, type Audiobook } from "@/data/audiobooks";
import { type ChapterBook } from "@/data/chapters";

export default function ChaptersPage() {
  const [books, setBooks] = useState<ChapterBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then((r) => r.json())
      .then((d) => { setBooks(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Chapter Books</span>
      </nav>

      <div className="rounded-3xl p-8 text-white mb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A1A2E, #2F2F52)" }}>
        <div className="relative">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            Chapter Wise Hindi Audiobooks
          </h1>
          <p className="text-white/70">
            {loading ? "..." : `${books.length} books`} — chapter by chapter sunein
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="aspect-video bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 animate-pulse rounded w-4/5" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📖</div>
          <p className="text-gray-500 text-xl">Abhi koi chapter book nahi hai</p>
          <p className="text-gray-400 text-sm mt-2">Admin se add karein</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => {
            const cat = categories.find((c) => c.slug === book.category);
            return (
              <Link key={book.id} href={`/audiobook/${book.slug}/chapters`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: book.thumbnail ? `url(${book.thumbnail})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        background: book.thumbnail
                          ? `url(${book.thumbnail}) center/cover`
                          : `linear-gradient(135deg, ${cat?.bgFrom || "#1A1A2E"}, ${cat?.bgTo || "#2F2F52"})`,
                      }} />
                    <div className="absolute top-2 left-2 flex gap-1.5" style={{ zIndex: 2 }}>
                      {cat && (
                        <span className="text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm"
                          style={{ background: `linear-gradient(to right, ${cat.bgFrom}, ${cat.bgTo})` }}>
                          {cat.emoji} {cat.label}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg" style={{ zIndex: 2 }}>
                      📖 {book.totalChapters} chapters
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg" style={{ zIndex: 2 }}>
                      {book.totalDuration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-[#FF6B2B] transition-colors">
                      {book.title}
                    </h2>
                    <p className="text-xs text-gray-400 mb-3">
                      by {book.author?.replace(/^by\s+/i, "")}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{book.totalChapters} chapters</span>
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-[#FF6B2B] group-hover:text-white transition-all"
                        style={{ background: "#FFF1EB", color: "#FF6B2B" }}>
                        ▶ Sunein
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
