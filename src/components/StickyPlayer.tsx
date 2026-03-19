"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  slug: string;
  nextBook?: { slug: string; title: string; thumbnail: string } | null;
}

export default function StickyPlayer({ videoId, title, author, thumbnail, slug, nextBook }: Props) {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Show sticky player after user scrolls past the main video
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
      style={{
        background: "#1A1A2E",
        borderTop: "1px solid rgba(255,107,43,0.3)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
      }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">

        {/* Thumbnail */}
        <div className="w-12 h-9 rounded-lg overflow-hidden flex-shrink-0"
          style={{ background: `url(${thumbnail}) center/cover`, minWidth: "48px" }} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold line-clamp-1">{title}</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>{author}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Play on YouTube */}
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            style={{ background: "#FF6B2B" }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="hidden sm:inline">YouTube</span>
          </a>

          {/* Next book */}
          {nextBook && (
            <Link
              href={`/audiobook/${nextBook.slug}`}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
              style={{ background: "rgba(255,255,255,0.1)", color: "#E5E7EB" }}>
              <span className="hidden sm:inline">Next</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          {/* Close */}
          <button
            onClick={() => setVisible(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(255,255,255,0.08)", color: "#9CA3AF" }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Next book preview strip */}
      {nextBook && (
        <div className="border-t px-4 py-2 flex items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,107,43,0.05)" }}>
          <span className="text-xs" style={{ color: "#9CA3AF" }}>Aage sunein:</span>
          <Link href={`/audiobook/${nextBook.slug}`}
            className="text-xs font-semibold hover:underline transition-colors line-clamp-1"
            style={{ color: "#FF6B2B" }}>
            {nextBook.title} →
          </Link>
        </div>
      )}
    </div>
  );
}
