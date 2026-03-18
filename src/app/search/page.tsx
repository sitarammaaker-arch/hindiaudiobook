"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AudiobookCard from "@/components/AudiobookCard";
import SearchBar from "@/components/SearchBar";
import { audiobooks, searchAudiobooks, categories } from "@/data/audiobooks";
import { SkeletonGrid } from "@/components/SkeletonCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const results = useMemo(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
    let books = query ? searchAudiobooks(query) : audiobooks;
    if (selectedCategory !== "all") {
      books = books.filter((b) => b.category === selectedCategory);
    }
    return books;
  }, [query, selectedCategory]);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, [query, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {query ? (
            <>
              &ldquo;<span className="text-[#FF6B2B]">{query}</span>&rdquo; ke results
            </>
          ) : (
            "🔍 Sabhi Audiobooks"
          )}
        </h1>
        <p className="text-gray-500">{results.length} audiobooks mile</p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all ${
            selectedCategory === "all"
              ? "bg-[#FF6B2B] text-white border-[#FF6B2B] shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-[rgba(255,107,43,0.4)]"
          }`}
        >
          🎧 Sabhi
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all ${
              selectedCategory === cat.slug
                ? "bg-[#FF6B2B] text-white border-[#FF6B2B] shadow-md"
                : "bg-white text-gray-700 border-gray-200 hover:border-[rgba(255,107,43,0.4)]"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {isLoading ? (
        <SkeletonGrid count={6} />
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Koi audiobook nahi mili</h2>
          <p className="text-gray-500 mb-6">
            &ldquo;{query}&rdquo; ke liye koi result nahi. Doosra keyword try karein.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Rich Dad", "Gita", "Motivational", "Kids"].map((s) => (
              <a
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="bg-[#FFF1EB] text-[#E85A1A] text-sm font-medium px-4 py-2 rounded-xl hover:bg-[#FFF1EB] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((book) => (
            <AudiobookCard key={book.id} audiobook={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-10"><SkeletonGrid count={6} /></div>}>
      <SearchResults />
    </Suspense>
  );
}
