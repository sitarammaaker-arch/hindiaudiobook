import type { Metadata } from "next";
import Link from "next/link";
import AudiobookCard from "@/components/AudiobookCard";
import { audiobooks, categories } from "@/data/audiobooks";

// Target keywords from GSC:
// "hindi audiobook free download mp3" — 134 clicks, 1400 impressions, pos 6.75
// "free hindi audio books" — 86 clicks, 657 impressions, pos 7.49
// "free audio stories online listen in hindi" — 35 clicks, 363 impressions, pos 9.3
// "free hindi audiobooks online" — 2 clicks, 352 impressions, pos 4.98 (low CTR = fix title!)

export const metadata: Metadata = {
  title: "Free Hindi Audiobooks — Hindi Audio Books Free Download MP3 | HindiAudiobook.com",
  description:
    "Free Hindi audiobooks sunein online — HindiAudiobook.com. Hindi audio books free download MP3 ki zaroorat nahi, seedha browser mein play karein. 500+ free hindi audiobooks available.",
  alternates: { canonical: "https://www.hindiaudiobook.com/free-hindi-audiobooks" },
  openGraph: {
    title: "Free Hindi Audiobooks — Audio Books Free Online",
    description: "500+ free hindi audiobooks online. Download ki zaroorat nahi — seedha sunein.",
    url: "https://www.hindiaudiobook.com/free-hindi-audiobooks",
  },
};

export default function FreeHindiAudiobooksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Free Hindi Audiobooks</span>
      </nav>

      {/* H1 — exact keyword match */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-green-200">
          🆓 100% Free — Koi Download Nahi, Koi Registration Nahi
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Free Hindi Audiobooks Online
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-2">
          Hindi audio books free mein sunein — HindiAudiobook.com par. MP3 download ki zaroorat nahi — seedha browser mein play karein.
        </p>
        <p className="text-gray-500 text-sm">
          Mobile par bhi chalta hai · Screen lock pe bhi chalta hai · 500+ audiobooks available
        </p>
      </div>

      {/* Why no download needed — targets "free hindi audiobook download mp3" intent */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: "🎧", title: "Seedha Sunein", desc: "Koi download nahi — browser mein directly play karein" },
          { icon: "🔒", title: "Lock Screen Play", desc: "Phone lock karne ke baad bhi audio chalti rehti hai" },
          { icon: "📱", title: "Mobile Friendly", desc: "79% listeners mobile par sunte hain — perfectly optimized" },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Category quick links */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Category se chunein:</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[rgba(255,107,43,0.4)] hover:bg-[#FFF1EB] text-gray-700 hover:text-[#E85A1A] text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
              {cat.emoji} Free {cat.label} Hindi Audiobooks
            </Link>
          ))}
        </div>
      </div>

      {/* All free audiobooks grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Sabhi Free Hindi Audiobooks ({audiobooks.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {audiobooks.map((book) => (
          <AudiobookCard key={book.id} audiobook={book} />
        ))}
      </div>
    </div>
  );
}
