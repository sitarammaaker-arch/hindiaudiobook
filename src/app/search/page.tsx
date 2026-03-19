"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import AudiobookCard from "@/components/AudiobookCard";
import { categories, type Audiobook } from "@/data/audiobooks";

export default function SearchPage() {
  const [query, setQuery]       = useState("");
  const [allBooks, setAllBooks] = useState<Audiobook[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/all-audiobooks")
      .then((r) => r.json())
      .then((d) => { setAllBooks(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    let books = allBooks;
    if (activeCategory !== "all") books = books.filter((b) => b.category === activeCategory);
    if (!query.trim()) return books;
    const q = query.toLowerCase();
    return books.filter((b) =>
      b.title?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      b.description?.toLowerCase().includes(q)
    );
  }, [query, allBooks, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-merriweather)" }}>
        🔍 Hindi Audiobooks Search
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        {loading ? "..." : `${allBooks.length} audiobooks mein search karein`}
      </p>

      {/* Search input */}
      <div className="relative mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Book ka naam, author, ya topic likhein..."
          autoFocus
          className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 focus:border-[#FF6B2B] rounded-2xl outline-none transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        {query && (
          <button onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveCategory("all")}
          className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
          style={{
            background: activeCategory === "all" ? "#FF6B2B" : "white",
            color: activeCategory === "all" ? "white" : "#374151",
            borderColor: activeCategory === "all" ? "#FF6B2B" : "#E5E7EB",
          }}>
          🎧 All ({allBooks.length})
        </button>
        {categories.map((cat) => {
          const count = allBooks.filter((b) => b.category === cat.slug).length;
          if (count === 0) return null;
          return (
            <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
              className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
              style={{
                background: activeCategory === cat.slug ? "#FF6B2B" : "white",
                color: activeCategory === cat.slug ? "white" : "#374151",
                borderColor: activeCategory === cat.slug ? "#FF6B2B" : "#E5E7EB",
              }}>
              {cat.emoji} {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-[#FF6B2B] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Books load ho rahi hain...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-xl font-semibold">
            {query ? `"${query}" ke liye koi book nahi mili` : "Koi book nahi mili"}
          </p>
          <p className="text-gray-400 text-sm mt-2">Dusra keyword try karein</p>
          {query && <button onClick={() => setQuery("")} className="mt-4 text-[#FF6B2B] font-semibold hover:underline">Search clear karein</button>}
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-5">
            {query ? `"${query}" ke liye ` : ""}<strong>{results.length}</strong> audiobooks mili
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
          </div>
        </>
      )}
    </div>
  );
}
