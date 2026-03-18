import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { chapterBooks, getTotalFreeChapters } from "@/data/chapters";
import { categories } from "@/data/audiobooks";

export const metadata: Metadata = {
  title: "Chapter Wise Hindi Audiobooks — Hindi Audiobook",
  description: "HindiAudiobook.com par Hindi audiobooks sunein chapter by chapter. Har chapter alag se — apni speed se sunein.",
  alternates: { canonical: "https://www.hindiaudiobook.com/chapters" },
};

export default function ChaptersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="bg-[#1A1A2E] rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative text-center">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#FFFFFF" }}>Chapter Wise Audiobooks</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Poori book ek saath nahi — har chapter alag se sunein. Apni speed se, apne time par.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { num: chapterBooks.length.toString(), label: "Books" },
              { num: chapterBooks.reduce((a, b) => a + b.totalChapters, 0).toString(), label: "Total Chapters" },
              { num: "100%", label: "Free" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{s.num}</div>
                <div className="text-orange-100 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapterBooks.map((book) => {
          const category = categories.find((c) => c.slug === book.category);
          const freeCount = getTotalFreeChapters(book);
          return (
            <div key={book.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[rgba(255,107,43,0.3)] transition-all duration-300 hover:-translate-y-1 group">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-200">
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {category && (
                    <span style={{ background: `linear-gradient(to right, ${category.bgFrom}, ${category.bgTo})` }} className="text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                      {category.emoji}
                    </span>
                  )}
                  <span className="bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
                    📚 {book.totalChapters} Chapters
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                  {book.totalDuration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 group-hover:text-[#FF6B2B] transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">by {book.author}</p>

                {/* Chapter progress dots */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {book.chapters.map((ch) => (
                    <div
                      key={ch.id}
                      title={ch.title}
                      className={`w-2 h-2 rounded-full ${ch.isFree ? "bg-green-400" : "bg-gray-200"}`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    🆓 {freeCount} Free
                  </span>
                  <span className="text-gray-400 text-xs">
                    👁 {(book.plays / 1000).toFixed(0)}K plays
                  </span>
                </div>

                <Link
                  href={`/audiobook/${book.slug}/chapters`}
                  className="block w-full bg-[#FF6B2B] hover:bg-[#E85A1A] text-white text-center font-bold py-2.5 rounded-xl transition-colors text-sm"
                >
                  Chapters Dekhein →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
