"use client";
import { useState, useEffect, useMemo } from "react";
import AudiobookCard from "@/components/AudiobookCard";
import { categories, type Audiobook } from "@/data/audiobooks";
import Link from "next/link";

export default function FreeHindiAudiobooksPage() {
  const [allBooks, setAllBooks]       = useState<Audiobook[]>([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setCategory] = useState("all");
  const [sortBy, setSort]             = useState<"popular"|"latest"|"shortest"|"longest">("popular");
  const [visibleCount, setVisible]    = useState(12);

  useEffect(() => {
    fetch("/api/all-audiobooks")
      .then((r) => r.json())
      .then((d) => { setAllBooks(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toMins = (d: string) => {
    const h = d?.match(/(\d+)h/)?.[1] || "0";
    const m = d?.match(/(\d+)m/)?.[1] || "0";
    return parseInt(h) * 60 + parseInt(m);
  };

  const filtered = useMemo(() => {
    let books = activeCategory === "all" ? allBooks : allBooks.filter((b) => b.category === activeCategory);
    const arr = [...books];
    if (sortBy === "popular")  return arr.sort((a, b) => (b.plays||0) - (a.plays||0));
    if (sortBy === "latest")   return arr.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()).reverse();
    if (sortBy === "shortest") return arr.sort((a, b) => toMins(a.duration) - toMins(b.duration));
    return arr.sort((a, b) => toMins(b.duration) - toMins(a.duration));
  }, [allBooks, activeCategory, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A1A2E, #2F2F52)" }}>
        <div className="relative">
          <div className="text-5xl mb-4">🎧</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFFFFF" }}>
            All Free Hindi Audiobooks
          </h1>
          <p className="text-white/80 text-lg mb-1">
            {loading ? "..." : `${allBooks.length} hindi audiobooks available`} — sabhi bilkul free
          </p>
          <p className="text-white/60 text-sm">Koi download nahi, koi registration nahi — seedha browser mein sunein</p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => { setCategory("all"); setVisible(12); }}
          className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
          style={{ background: activeCategory === "all" ? "#FF6B2B" : "white", color: activeCategory === "all" ? "white" : "#374151", borderColor: activeCategory === "all" ? "#FF6B2B" : "#E5E7EB" }}>
          🎧 Sab ({allBooks.length})
        </button>
        {categories.map((cat) => {
          const count = allBooks.filter((b) => b.category === cat.slug).length;
          if (count === 0) return null;
          return (
            <button key={cat.slug} onClick={() => { setCategory(cat.slug); setVisible(12); }}
              className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all"
              style={{ background: activeCategory === cat.slug ? "#FF6B2B" : "white", color: activeCategory === cat.slug ? "white" : "#374151", borderColor: activeCategory === cat.slug ? "#FF6B2B" : "#E5E7EB" }}>
              {cat.emoji} {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Sort + count */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-gray-600 text-sm font-medium">Sort:</span>
        {[
          { v: "popular",  l: "🔥 Most Popular" },
          { v: "shortest", l: "⚡ Shortest First" },
          { v: "longest",  l: "📚 Longest First" },
        ].map((opt) => (
          <button key={opt.v} onClick={() => setSort(opt.v as typeof sortBy)}
            className="text-sm font-medium px-4 py-2 rounded-xl border transition-all"
            style={{ background: sortBy === opt.v ? "#FF6B2B" : "white", color: sortBy === opt.v ? "white" : "#374151", borderColor: sortBy === opt.v ? "#FF6B2B" : "#E5E7EB" }}>
            {opt.l}
          </button>
        ))}
        <span className="ml-auto text-gray-500 text-sm">
          {loading ? "..." : `${visible.length} / ${filtered.length}`} audiobooks
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="aspect-video bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 animate-pulse rounded" style={{ width: "80%" }} />
                <div className="h-3 bg-gray-100 animate-pulse rounded" style={{ width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
          </div>
          {visibleCount < filtered.length && (
            <div className="text-center mt-10">
              <button onClick={() => setVisible((c) => c + 12)}
                className="bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-semibold px-10 py-3.5 rounded-xl transition-colors shadow-md">
                Load More Audiobooks ↓ ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
