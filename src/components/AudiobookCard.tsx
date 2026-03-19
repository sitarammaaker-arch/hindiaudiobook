"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Audiobook, categories } from "@/data/audiobooks";

function buildThumbCandidates(audiobook: Audiobook): string[] {
  const candidates: string[] = [];

  if (audiobook.thumbnail) candidates.push(audiobook.thumbnail);

  if (audiobook.videoId) {
    candidates.push(`https://i.ytimg.com/vi/${audiobook.videoId}/hqdefault.jpg`);
    candidates.push(`https://img.youtube.com/vi/${audiobook.videoId}/hqdefault.jpg`);
    candidates.push(`https://i.ytimg.com/vi/${audiobook.videoId}/mqdefault.jpg`);
    candidates.push(`https://i.ytimg.com/vi/${audiobook.videoId}/default.jpg`);
  }

  // Remove duplicates while preserving order
  return [...new Set(candidates.filter(Boolean))];
}

export default function AudiobookCard({ audiobook }: { audiobook: Audiobook }) {
  const category = categories.find((c) => c.slug === audiobook.category);
  const thumbCandidates = useMemo(() => buildThumbCandidates(audiobook), [audiobook]);
  const [thumbIndex, setThumbIndex] = useState(0);
  const FALLBACK_THUMB = "data:image/svg+xml,%3Csvg xmlns%3D%22http%3A//www.w3.org/2000/svg%22 width%3D%22640%22 height%3D%22360%22 viewBox%3D%220 0 640 360%22%3E%3Crect width%3D%22640%22 height%3D%22360%22 fill%3D%22%23F5F0EB%22/%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 fill%3D%22%239CA3AF%22 font-family%3D%22Arial%2Csans-serif%22 font-size%3D%2226%22%3EThumbnail unavailable%3C/text%3E%3C/svg%3E";
  const activeThumb = thumbCandidates[thumbIndex] || FALLBACK_THUMB;

  return (
    <Link href={`/audiobook/${audiobook.slug}`} className="group block">
      <div className="card overflow-hidden bg-white" style={{ borderRadius: "16px" }}>

        {/* ── Thumbnail ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#F5F0EB" }}>
          <Image
            src={activeThumb}
            alt={`${audiobook.title} — Hindi Audiobook`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => {
              if (thumbIndex < thumbCandidates.length - 1) {
                setThumbIndex((idx) => idx + 1);
              }
            }}
          />

          {/* Play overlay — CSS only, no JS */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center"
            style={{ background: "rgba(26,26,46,0.35)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100"
              style={{ background: "#FF6B2B" }}>
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm"
            style={{ fontFamily: "var(--font-inter)" }}>
            {audiobook.duration}
          </div>

          {/* Category */}
          {category && (
            <div className="absolute top-2 left-2 bg-white/95 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm"
              style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
              {category.emoji} {category.label}
            </div>
          )}

          {/* Trending */}
          {audiobook.trending && (
            <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full"
              style={{ background: "#FF6B2B", color: "white" }}>
              🔥
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-4">
          {/* Title — CSS group-hover, no JS */}
          <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2 mb-1 card-title-hover"
            style={{ letterSpacing: "-0.01em" }}>
            {audiobook.title}
          </h3>
          <p className="text-xs mb-3" style={{ color: "#9CA3AF", fontFamily: "var(--font-inter)" }}>
            by {audiobook.author}
          </p>

          <div className="flex items-center justify-between gap-2">
            {/* Plays count */}
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#9CA3AF" }}>
              <span className="flex items-end gap-px" style={{ height: "12px" }}>
                {[1.5,2.5,3.5,2.5,1.5].map((h, i) => (
                  <span key={i} className="w-px rounded-full"
                    style={{ height: `${h * 3}px`, background: "#C4B5A5", display: "inline-block" }} />
                ))}
              </span>
              {(audiobook.plays / 1000).toFixed(0)}K
            </div>

            {/* CTA badge */}
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 group-hover:bg-[#FF6B2B] group-hover:text-white"
              style={{
                background: "#FFF1EB",
                color: "#FF6B2B",
                fontFamily: "var(--font-inter)",
              }}>
              ▶ Sunein
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
