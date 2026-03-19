import Link from "next/link";
import { Audiobook, categories } from "@/data/audiobooks";

export default function AudiobookCard({ audiobook }: { audiobook: Audiobook }) {
  const category = categories.find((c) => c.slug === audiobook.category?.trim());
  // Fix: strip "by " prefix if user typed it in admin form
  const authorName = audiobook.author?.replace(/^by\s+/i, "") || audiobook.author || "";

  return (
    <Link href={`/audiobook/${audiobook.slug}`} className="group block">
      <div className="card overflow-hidden bg-white" style={{ borderRadius: "16px" }}>

        {/* ── Thumbnail — using <img> to avoid Next.js domain restrictions ── */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#F5F0EB" }}>
          {audiobook.thumbnail ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={audiobook.thumbnail}
              alt={`${audiobook.title} — Hindi Audiobook`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            /* Fallback when no thumbnail */
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1A1A2E, #2F2F52)" }}>
              <span className="text-4xl">🎧</span>
            </div>
          )}

          {/* Play overlay */}
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

          {/* Category badge */}
          {category && (
            <div className="absolute top-2 left-2 bg-white/95 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm max-w-[140px] truncate"
              style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
              {category.emoji} {category.label}
            </div>
          )}

          {/* Trending badge */}
          {audiobook.trending && (
            <div className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full"
              style={{ background: "#FF6B2B", color: "white" }}>
              🔥
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-4">
          <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2 mb-1 card-title-hover"
            style={{ letterSpacing: "-0.01em" }}>
            {audiobook.title}
          </h3>
          <p className="text-xs mb-3" style={{ color: "#9CA3AF", fontFamily: "var(--font-inter)" }}>
            by {authorName}
          </p>

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
