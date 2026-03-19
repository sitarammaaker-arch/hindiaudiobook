"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Audiobook, categories } from "@/data/audiobooks";
import { makeSlug } from "@/lib/utils";

// Read rating from localStorage
function getAvgRating(slug: string): { avg: number; total: number } | null {
  try {
    const seeds: Record<string, { total: number; score: number }> = {
      "trading-in-the-zone-full-hindi-audiobook":    { total: 203, score: 940 },
      "the-disciplined-trader-hindi-audiobook":       { total: 247, score: 1141 },
      "the-intelligent-investor-hindi-audiobook":     { total: 178, score: 818 },
      "rich-dad-poor-dad-hindi-audiobook":            { total: 412, score: 1895 },
      "48-laws-of-power-hindi-audiobook":             { total: 334, score: 1503 },
      "atomic-habits-hindi-audiobook":                { total: 445, score: 2047 },
      "the-alchemist-hindi-audiobook":                { total: 389, score: 1790 },
      "think-and-grow-rich-hindi-audiobook":          { total: 312, score: 1434 },
      "bhagawad-geeta-hindi-audiobook":               { total: 521, score: 2424 },
      "zero-to-one-hindi-audiobook":                  { total: 134, score: 590 },
    };
    const stored = localStorage.getItem(`rating_${slug}`);
    if (stored) {
      const d = JSON.parse(stored);
      if (d.totalRatings > 0) return { avg: d.avgRating, total: d.totalRatings };
    }
    const seed = seeds[slug];
    if (seed) return { avg: Math.round((seed.score / seed.total) * 10) / 10, total: seed.total };
    return null;
  } catch { return null; }
}

export default function AudiobookCard({ audiobook }: { audiobook: Audiobook }) {
  const category = categories.find((c) => c.slug === audiobook.category?.trim());
  const authorName = audiobook.author?.replace(/^by\s+/i, "") || audiobook.author || "";
  const authorSlug = makeSlug(authorName);
  const [rating, setRating] = useState<{ avg: number; total: number } | null>(null);

  useEffect(() => {
    setRating(getAvgRating(audiobook.slug));
  }, [audiobook.slug]);

  return (
    <Link href={`/audiobook/${audiobook.slug}`} className="group block">
      <div className="card overflow-hidden bg-white" style={{ borderRadius: "16px" }}>

        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#1A1A2E" }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
            <span style={{ fontSize: "2rem", opacity: 0.3 }}>🎧</span>
          </div>
          {audiobook.thumbnail && (
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${audiobook.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 1 }} />
          )}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
            style={{ background: "rgba(26,26,46,0.35)", zIndex: 2 }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "#FF6B2B" }}>
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg"
            style={{ zIndex: 3, fontFamily: "var(--font-inter)" }}>
            {audiobook.duration}
          </div>
          {category && (
            <div className="absolute top-2 left-2 bg-white/95 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm max-w-[140px] truncate"
              style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)", zIndex: 3 }}>
              {category.emoji} {category.label}
            </div>
          )}
          {audiobook.trending && (
            <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full"
              style={{ background: "#FF6B2B", color: "white", zIndex: 3 }}>
              🔥
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2 mb-1 card-title-hover"
            style={{ letterSpacing: "-0.01em" }}>
            {audiobook.title}
          </h3>
          <p className="text-xs mb-2" style={{ color: "#9CA3AF", fontFamily: "var(--font-inter)" }}>
            by{" "}
            <Link href={`/author/${authorSlug}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[#FF6B2B] transition-colors">
              {authorName}
            </Link>
          </p>

          {/* Star rating on card */}
          {rating && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400 text-xs">{"★".repeat(Math.round(rating.avg))}{"☆".repeat(5 - Math.round(rating.avg))}</span>
              <span className="text-xs font-medium text-gray-600">{rating.avg.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({rating.total > 999 ? (rating.total/1000).toFixed(1)+"K" : rating.total})</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#9CA3AF" }}>
              <span className="flex items-end gap-px" style={{ height: "12px" }}>
                {[1.5,2.5,3.5,2.5,1.5].map((h, i) => (
                  <span key={i} className="w-px rounded-full"
                    style={{ height: `${h * 3}px`, background: "#C4B5A5", display: "inline-block" }} />
                ))}
              </span>
              {((audiobook.plays || 0) / 1000).toFixed(0)}K
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 group-hover:bg-[#FF6B2B] group-hover:text-white"
              style={{ background: "#FFF1EB", color: "#FF6B2B", fontFamily: "var(--font-inter)" }}>
              ▶ Sunein
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
