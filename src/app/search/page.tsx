"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AudiobookCard from "@/components/AudiobookCard";
import SearchBar from "@/components/SearchBar";
import { categories } from "@/data/audiobooks";
import { SkeletonGrid } from "@/components/SkeletonCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch merged books (static + uploaded) from API
  useEffect(() => {
    fetch("/api/all-audiobooks")
      .then((r) => r.json())
      .then((d) => { setAllBooks(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    let books = allBooks;
    if (query) {
      const q = query.toLowerCase();
      books = books.filter((b) =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "all") {
      books = books.filter((b) => b.category === selectedCategory);
    }
    return books;
  }, [query, selectedCategory, allBooks]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SkeletonGrid count={6} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar large />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setSelectedCategory("all")}
          className="text-sm font-semibold px-4 py-2 rounded-full border transition-all"
          style={{
            background: selectedCategory === "all" ? "#FF6B2B" : "white",
            color: selectedCategory === "all" ? "white" : "#374151",
            borderColor: selectedCategory === "all" ? "#FF6B2B" : "#E5E7EB",
          }}>
          All ({allBooks.length})
        </button>
        {categories.map((cat) => {
          const count = allBooks.filter((b) => b.category === cat.slug).length;
          if (count === 0) return null;
          return (
            <button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)}
              className="text-sm font-medium px-4 py-2 rounded-full border transition-all"
              style={{
                background: selectedCategory === cat.slug ? "#FF6B2B" : "white",
                color: selectedCategory === cat.slug ? "white" : "#374151",
                borderColor: selectedCategory === cat.slug ? "#FF6B2B" : "#E5E7EB",
              }}>
              {cat.emoji} {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-xl" style={{ color: "#1A1A2E", letterSpacing: "-0.01em" }}>
          {query ? `"${query}" ke Results` : "Sabhi Hindi Audiobooks"}
          <span className="text-sm font-normal ml-2" style={{ color: "#9CA3AF" }}>
            ({results.length} audiobooks)
          </span>
        </h1>
      </div>

      {/* Results grid */}
      {results.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-heading font-bold text-xl mb-2" style={{ color: "#1A1A2E" }}>
            Koi result nahi mila
          </h2>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            &quot;{query}&quot; ke liye koi audiobook nahi mili. Doosra search karein.
          </p>
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
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-10">
        <SkeletonGrid count={6} />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
