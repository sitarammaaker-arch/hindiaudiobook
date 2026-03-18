"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import AudiobookCard from "@/components/AudiobookCard";
import { getAudiobooksByCategory, categories } from "@/data/audiobooks";

interface Props { params: { slug: string } }

export default function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  const allBooks = getAudiobooksByCategory(params.slug);

  const [sortBy, setSortBy] = useState<"popular" | "short" | "long">("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  const sorted = useMemo(() => {
    const arr = [...allBooks];
    if (sortBy === "popular") return arr.sort((a, b) => b.plays - a.plays);
    const toMins = (d: string) => {
      const h = d.match(/(\d+)h/)?.[1] || "0";
      const m = d.match(/(\d+)m/)?.[1] || "0";
      return parseInt(h) * 60 + parseInt(m);
    };
    if (sortBy === "short") return arr.sort((a, b) => toMins(a.duration) - toMins(b.duration));
    return arr.sort((a, b) => toMins(b.duration) - toMins(a.duration));
  }, [allBooks, sortBy]);

  const visible = sorted.slice(0, visibleCount);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-xl">Category nahi mila!</p>
        <Link href="/" className="text-[#FF6B2B] mt-4 inline-block hover:underline">Home par wapas jayein</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{category.emoji} {category.label} Hindi Audiobooks</span>
      </nav>

      {/* Category header — inline style to avoid Tailwind purge issue */}
      <div
        className="rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${category.bgFrom}, ${category.bgTo})` }}
      >
        <div className="absolute inset-0 bg-black/15 rounded-3xl" />
        <div className="relative">
          <div className="text-6xl mb-4">{category.emoji}</div>
          {/* H1 with SEO title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {category.seoTitle?.split(" — ")[0] || `${category.label} Hindi Audiobooks`}
          </h1>
          <p className="text-white/80 text-lg mb-2">
            {allBooks.length} free audiobooks — HindiAudiobook.com par sunein
          </p>
          <p className="text-white/60 text-sm max-w-2xl">{category.description}</p>
        </div>
      </div>

      {/* Other categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.filter((c) => c.slug !== params.slug).map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`}
            className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-[rgba(255,107,43,0.4)] hover:bg-[#FFF1EB] text-gray-700 hover:text-[#E85A1A] text-sm font-medium px-3 py-1.5 rounded-xl transition-all">
            {cat.emoji} {cat.label}
          </Link>
        ))}
      </div>

      {/* Sort */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-gray-600 text-sm font-medium">Sort:</span>
        {[
          { value: "popular", label: "🔥 Most Popular" },
          { value: "short", label: "⚡ Shortest First" },
          { value: "long", label: "📚 Longest First" },
        ].map((opt) => (
          <button key={opt.value} onClick={() => setSortBy(opt.value as typeof sortBy)}
            className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all ${sortBy === opt.value ? "bg-[#FF6B2B] text-white border-[#FF6B2B] shadow-md" : "bg-white text-gray-700 border-gray-200 hover:border-[rgba(255,107,43,0.4)]"}`}>
            {opt.label}
          </button>
        ))}
        <span className="ml-auto text-gray-500 text-sm">{visible.length} / {allBooks.length} audiobooks</span>
      </div>

      {allBooks.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-gray-500 text-xl">Is category mein abhi koi audiobook nahi hai</p>
          <p className="text-gray-400 text-sm mt-2">Jaldi add hogi — waapas aayein!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((book) => (
              <AudiobookCard key={book.id} audiobook={book} />
            ))}
          </div>
          {visibleCount < sorted.length && (
            <div className="text-center mt-10">
              <button onClick={() => setVisibleCount((c) => c + 6)}
                className="bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-semibold px-10 py-3.5 rounded-xl transition-colors shadow-md">
                Load More {category.label} Audiobooks ↓
              </button>
            </div>
          )}
        </>
      )}

      {/* SEO description block */}
      {category.seoDesc && (
        <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">{category.seoTitle}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{category.seoDesc}</p>
        </div>
      )}
    </div>
  );
}
