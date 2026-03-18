import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import AudiobookCard from "@/components/AudiobookCard";
import AudioPlayer from "@/components/AudioPlayer";
import GoogleAd from "@/components/GoogleAd";
import StarRating from "@/components/StarRating";
import YouTubePlayTracker from "@/components/YouTubePlayTracker";
import { getAllAudiobooks } from "@/lib/data";
import {
  audiobooks,
  getAudiobookBySlug,
  getRelatedAudiobooks,
  categories,
  type Audiobook,
} from "@/data/audiobooks";

// ── force-dynamic: uploaded books (KV) ke liye har request par fresh render ──
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props { params: { slug: string } }

// generateStaticParams: sirf static books ke liye — uploaded books dynamic hongi
export async function generateStaticParams() {
  return audiobooks.map((a) => ({ slug: a.slug }));
}

// Helper — static + KV dono se book dhundho
async function findBook(slug: string): Promise<Audiobook | undefined> {
  // Static mein pehle check karo (fast)
  const staticBook = getAudiobookBySlug(slug);
  if (staticBook) return staticBook;
  // KV uploaded books mein dhundho
  const allBooks = await getAllAudiobooks();
  return allBooks.find((b) => b.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await findBook(params.slug);
  if (!book) return {};
  const cat = categories.find((c) => c.slug === book.category);
  // Title formula: [Book Name] Hindi Audiobook — [Category] | HindiAudiobook.com
  // Matches search intent: "X hindi audiobook", "X in hindi audiobook free"
  return {
    title: `${book.title} — Free Hindi Audiobook Online | HindiAudiobook.com`,
    description: `${book.title} by ${book.author} sunein bilkul free — HindiAudiobook.com. ${book.duration} ki yeh ${cat?.label || book.category} hindi audiobook. Download ki zaroorat nahi, seedha browser mein play karein. ${book.audioUrl ? "Screen lock pe bhi chalta hai." : ""}`,
    alternates: {
      canonical: `https://www.hindiaudiobook.com/audiobook/${book.slug}`,
    },
    openGraph: {
      title: `${book.title} — Hindi Audiobook Free`,
      description: `${book.author} ki yeh ${book.duration} ki audiobook free mein sunein — HindiAudiobook.com`,
      url: `https://www.hindiaudiobook.com/audiobook/${book.slug}`,
      siteName: "Hindi Audiobook",
      images: [{ url: book.thumbnail, width: 480, height: 360, alt: `${book.title} Hindi Audiobook` }],
      locale: "hi_IN",
      type: "website",
    },
  };
}

export default async function AudiobookDetailPage({ params }: Props) {
  const book = await findBook(params.slug);
  if (!book) notFound();

  const allBooks    = await getAllAudiobooks();
  const related     = allBooks.filter((b) => b.category === book!.category && b.slug !== book!.slug).slice(0, 4);
  const category    = categories.find((c) => c.slug === book!.category);
  const hasDirectAudio = Boolean(book!.audioUrl && book!.audioUrl.trim() !== "");

  // AudioObject structured data — helps Google show rich results
  const audioJsonLd = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": book.title,
    "description": book.description.slice(0, 300),
    "duration": book.duration,
    "inLanguage": "hi",
    "author": {
      "@type": "Person",
      "name": book.author,
    },
    "thumbnailUrl": book.thumbnail,
    "url": `https://www.hindiaudiobook.com/audiobook/${book.slug}`,
    "contentUrl": book.audioUrl || `https://www.youtube.com/watch?v=${book.videoId}`,
    "genre": category?.label || book.category,
    "keywords": `${book.title}, ${book.author}, hindi audiobook, free hindi audio book, ${book.category} audiobook hindi`,
    "publisher": {
      "@type": "Organization",
      "name": "Hindi Audiobook",
      "url": "https://www.hindiaudiobook.com",
    },
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hindiaudiobook.com" },
      { "@type": "ListItem", "position": 2, "name": `${category?.label} Audiobooks`, "item": `https://www.hindiaudiobook.com/category/${book.category}` },
      { "@type": "ListItem", "position": 3, "name": book.title, "item": `https://www.hindiaudiobook.com/audiobook/${book.slug}` },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Script id="audio-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioJsonLd) }} />
      <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb — mobile optimized */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#FF6B2B] transition-colors flex-shrink-0">Home</Link>
        <span className="flex-shrink-0">/</span>
        <Link href={`/category/${book.category}`} className="hover:text-[#FF6B2B] transition-colors flex-shrink-0">
          {category?.emoji} <span className="hidden sm:inline">{category?.label}</span><span className="sm:hidden">{category?.label?.split(" ")[0]}</span>
        </Link>
        <span className="flex-shrink-0">/</span>
        <span className="text-gray-900 font-medium line-clamp-1 min-w-0 truncate">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">

          {/* Player */}
          {hasDirectAudio ? (
            <AudioPlayer audioUrl={book.audioUrl} title={book.title} author={book.author} thumbnail={book.thumbnail} duration={book.duration} slug={book.slug} />
          ) : (
            <div>
              {/* YouTube play tracker — 5 sec par count hoga */}
              <YouTubePlayTracker slug={book.slug} />
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${book.videoId}?rel=0&modestbranding=1`}
                  title={`${book.title} — Hindi Audiobook`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              {/* Soft info hint — non-intrusive for visitors */}
              <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                style={{ background: "#FFF8F5", color: "#9CA3AF", fontFamily: "var(--font-inter)" }}>
                <span>💡</span>
                <span>Screen lock ke baad sunne ke liye <strong style={{ color: "#FF6B2B" }}>🔒 Lock Screen ✅</strong> badge wali books chunein</span>
              </div>
            </div>
          )}

          {/* Title + badges */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {category && (
                <span style={{ background: `linear-gradient(to right, ${category.bgFrom}, ${category.bgTo})` }} className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {category.emoji} {category.label}
                </span>
              )}
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">⏱ {book.duration}</span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">👁 {(book.plays / 1000).toFixed(0)}K plays</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">🆓 Free</span>
              {hasDirectAudio && <span className="bg-[#FFF1EB] text-[#E85A1A] text-xs font-bold px-3 py-1.5 rounded-full">🔒 Lock Screen ✅</span>}
            </div>
            {/* H1 with keyword: "[Book] Hindi Audiobook" */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">{book.title}</h1>
            <p className="text-gray-500 font-medium">by {book.author}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a href={`https://www.youtube.com/watch?v=${book.videoId}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 13.8V9.4l5.4 2.2-5.4 2.2z" />
              </svg>
              YouTube par Sunein
            </a>
            <button className="flex items-center gap-2 bg-[#FFF1EB] hover:bg-[#FFF1EB] text-[#E85A1A] font-semibold px-6 py-3 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Karein
            </button>
          </div>

          {/* SEO Description */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📖 {book.title} — Hindi Audiobook ke Baare Mein</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {book.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* ── AD SLOT 3 ── */}
          <GoogleAd slot="1122334455" type="in-article" className="my-2" />

          {/* ── Star Ratings — AggregateRating schema = Google ⭐ in search ── */}
          <StarRating
            audiobookSlug={book.slug}
            audiobookTitle={book.title}
            author={book.author}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-5 shadow-md">
              <Image src={book.thumbnail} alt={`${book.title} Hindi Audiobook`} fill className="object-cover" sizes="350px" />
            </div>
            <h3 className="font-bold text-gray-900 mb-5">📋 Audiobook Details</h3>
            <div className="space-y-3">
              {[
                { label: "Title", value: book.title },
                { label: "Author", value: book.author },
                { label: "Category", value: `${category?.emoji} ${category?.label}` },
                { label: "Language", value: "Hindi 🇮🇳" },
                { label: "Player", value: hasDirectAudio ? "🟢 HTML5 (Lock Screen ✅)" : "🔴 YouTube Only" },
                { label: "Price", value: "🆓 Bilkul Free" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start gap-3">
                  <span className="text-gray-500 text-sm flex-shrink-0">{item.label}</span>
                  <span className="text-gray-900 text-sm font-medium text-right">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-5 pt-5">
              <a href={`https://www.youtube.com/watch?v=${book.videoId}`} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-[#FF6B2B] hover:bg-[#E85A1A] text-white text-center font-bold py-3 rounded-xl transition-colors shadow-md">
                ▶ Play on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Audiobooks */}
      {related.length > 0 && (
        <section className="mt-16" aria-label={`More ${category?.label} Hindi Audiobooks`}>
          {/* ── AD SLOT 4: Before Related (between content sections) ────────────
              Users scrolling to related books = still engaged.
              Replace "5544332211" with your actual slot ID
          ────────────────────────────────────────────────────────────────── */}
          <GoogleAd
            slot="5544332211"
            type="responsive"
            className="mb-8"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎧 More {category?.label} Hindi Audiobooks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((b) => (
              <AudiobookCard key={b.id} audiobook={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
