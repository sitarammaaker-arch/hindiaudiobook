"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import AudiobookCard from "@/components/AudiobookCard";
import { categories, type Audiobook } from "@/data/audiobooks";

const POPULAR = [
  "Trading in the Zone", "Rich Dad Poor Dad", "Atomic Habits",
  "48 Laws of Power", "Bhagavad Gita", "Mark Douglas",
];

const DURATION_FILTERS = [
  { label: "Sab", value: "all" },
  { label: "< 2 ghante", value: "short" },
  { label: "2-5 ghante", value: "medium" },
  { label: "5+ ghante", value: "long" },
];

function toMins(d: string): number {
  const h = parseInt(d.match(/(\d+)h/)?.[1] || "0");
  const m = parseInt(d.match(/(\d+)m/)?.[1] || "0");
  return h * 60 + m;
}

export default function SearchPage() {
  const [query, setQuery]       = useState("");
  const [allBooks, setAllBooks] = useState<Audiobook[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [duration, setDuration] = useState("all");
  const [sortBy, setSort]       = useState<"relevant"|"popular"|"newest">("relevant");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);

    fetch("/api/all-audiobooks")
      .then((r) => r.json())
      .then((d) => {
        setAllBooks(d.data || []);
        setLoading(false);
        // Focus input after data loads — works on mobile too
        setTimeout(() => inputRef.current?.focus(), 100);
      })
      .catch(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    let books = allBooks;

    // Category filter
    if (activeCategory !== "all") books = books.filter((b) => b.category === activeCategory);

    // Duration filter
    if (duration === "short") books = books.filter((b) => toMins(b.duration || "0") < 120);
    if (duration === "medium") books = books.filter((b) => { const m = toMins(b.duration || "0"); return m >= 120 && m < 300; });
    if (duration === "long") books = books.filter((b) => toMins(b.duration || "0") >= 300);

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      books = books.filter((b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "popular") return [...books].sort((a, b) => (b.plays || 0) - (a.plays || 0));
    if (sortBy === "newest") return [...books].sort((a, b) =>
      new Date((b as any).createdAt || 0).getTime() - new Date((a as any).createdAt || 0).getTime()
    );
    return books;
  }, [query, allBooks, activeCategory, duration, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-merriweather)" }}>
        🔍 Hindi Audiobooks Search
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {loading ? "..." : `${allBooks.length} audiobooks mein search karein`}
      </p>

      {/* Search input */}
      <div className="relative mb-4">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Book ka naam, author, ya topic likhein..."
          className="w-full pl-12 pr-4 py-4 text-base rounded-2xl bg-white shadow-sm"
          style={{
            border: "1.5px solid #e5e7eb",
            outline: "none",
            boxShadow: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.style.borderColor = "#FF6B2B"}
          onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        {query && (
          <button onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">✕</button>
        )}
      </div>

      {/* Popular searches */}
      {!query && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-gray-400 self-center">Popular:</span>
          {POPULAR.map((p) => (
            <button key={p} onClick={() => setQuery(p)}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#FF6B2B] hover:text-[#FF6B2B] hover:bg-[#FFF1EB] transition-all shadow-sm">
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Filters row */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Category */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-2 font-medium">Category</p>
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setActiveCategory("all")}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all"
              style={{ background: activeCategory === "all" ? "#FF6B2B" : "white", color: activeCategory === "all" ? "white" : "#374151", borderColor: activeCategory === "all" ? "#FF6B2B" : "#E5E7EB" }}>
              Sab
            </button>
            {categories.map((cat) => {
              const count = allBooks.filter((b) => b.category === cat.slug).length;
              if (count === 0) return null;
              return (
                <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all"
                  style={{ background: activeCategory === cat.slug ? "#FF6B2B" : "white", color: activeCategory === cat.slug ? "white" : "#374151", borderColor: activeCategory === cat.slug ? "#FF6B2B" : "#E5E7EB" }}>
                  {cat.emoji} {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">Duration</p>
          <div className="flex gap-1.5">
            {DURATION_FILTERS.map((d) => (
              <button key={d.value} onClick={() => setDuration(d.value)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap"
                style={{ background: duration === d.value ? "#1A1A2E" : "white", color: duration === d.value ? "white" : "#374151", borderColor: duration === d.value ? "#1A1A2E" : "#E5E7EB" }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">Sort by</p>
          <div className="flex gap-1.5">
            {[{ v: "relevant", l: "Relevant" }, { v: "popular", l: "🔥 Popular" }, { v: "newest", l: "🆕 Naya" }].map((s) => (
              <button key={s.v} onClick={() => setSort(s.v as typeof sortBy)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all"
                style={{ background: sortBy === s.v ? "#FF6B2B" : "white", color: sortBy === s.v ? "white" : "#374151", borderColor: sortBy === s.v ? "#FF6B2B" : "#E5E7EB" }}>
                {s.l}
              </button>
            ))}
          </div>
        </div>
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
          <p className="text-gray-400 text-sm mt-2">Filter change karein ya dusra keyword try karein</p>
          <div className="flex gap-3 justify-center mt-4">
            {query && <button onClick={() => setQuery("")} className="text-[#FF6B2B] font-semibold hover:underline text-sm">Search clear karein</button>}
            {activeCategory !== "all" && <button onClick={() => setActiveCategory("all")} className="text-[#FF6B2B] font-semibold hover:underline text-sm">Category filter hatao</button>}
          </div>
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
