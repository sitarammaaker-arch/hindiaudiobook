import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import AudiobookCard from "@/components/AudiobookCard";
import AudioPlayer from "@/components/AudioPlayer";
import GoogleAd from "@/components/GoogleAd";
import StarRating from "@/components/StarRating";
import LiteYouTube from "@/components/LiteYouTube";
import { getAllAudiobooks, getBookBySlug, getRelatedBooks, categories } from "@/lib/data";
import { makeSlug } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return []; // Sab books KV se hain — build time par koi static slugs nahi
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBookBySlug(params.slug);
  if (!book) return {};
  const cat = categories.find((c) => c.slug === book.category);
  const authorName = book.author?.replace(/^by\s+/i, "") || book.author || "";
  return {
    title: `${book.title} — ${authorName} Free Hindi Audiobook`,
    description: `${book.title} by ${authorName} sunein bilkul free — HindiAudiobook.com. ${book.duration} ki yeh ${cat?.label || book.category} hindi audiobook. Download ki zaroorat nahi, seedha browser mein play karein.`,
    alternates: { canonical: `https://www.hindiaudiobook.com/audiobook/${book.slug}` },
    openGraph: {
      title: `${book.title} — Hindi Audiobook Free`,
      description: `${authorName} ki yeh ${book.duration} ki audiobook free mein sunein — HindiAudiobook.com`,
      url: `https://www.hindiaudiobook.com/audiobook/${book.slug}`,
      images: [{ url: book.thumbnail, width: 480, height: 360, alt: `${book.title} Hindi Audiobook` }],
      locale: "hi_IN", type: "website",
    },
  };
}

export default async function AudiobookDetailPage({ params }: Props) {
  const book = await getBookBySlug(params.slug);
  if (!book) notFound();

  const related = await getRelatedBooks(book.slug, book.category);
  const categorySlug = book.category?.trim() || "";
  const category = categories.find((c) => c.slug === categorySlug);
  const hasDirectAudio = Boolean(book.audioUrl?.trim());
  const authorName = book.author?.replace(/^by\s+/i, "") || book.author || "";

  // Convert "8h 31m" → "PT8H31M" for schema.org
  const toISODuration = (d: string) => {
    const h = d.match(/(\d+)h/)?.[1] || "0";
    const m = d.match(/(\d+)m/)?.[1] || "0";
    return `PT${h}H${m}M`;
  };

  const audioJsonLd = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": book.title,
    "description": (book.description || "").slice(0, 300),
    "duration": toISODuration(book.duration || "0h 0m"),
    "inLanguage": "hi",
    "author": { "@type": "Person", "name": authorName },
    "thumbnailUrl": book.thumbnail,
    "url": `https://www.hindiaudiobook.com/audiobook/${book.slug}`,
    "contentUrl": book.audioUrl || `https://www.youtube.com/watch?v=${book.videoId}`,
    "genre": category?.label || book.category,
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
    },
    "publisher": {
      "@type": "Organization",
      "name": "HindiAudiobook.com",
      "url": "https://www.hindiaudiobook.com",
    },
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Script id="audio-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(audioJsonLd) }} />
      <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <Link href={`/category/${book.category}`} className="hover:text-[#FF6B2B] flex items-center gap-1">
          {category?.emoji} <span className="hidden sm:inline">{category?.label || categorySlug}</span>
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Player */}
        <div className="lg:col-span-2 space-y-5">
          {hasDirectAudio ? (
            <AudioPlayer audioUrl={book.audioUrl} title={book.title} author={authorName} thumbnail={book.thumbnail} duration={book.duration} slug={book.slug} />
          ) : (
            <div className="rounded-2xl overflow-hidden bg-black shadow-xl">
              <LiteYouTube videoId={book.videoId} title={`${book.title} — Hindi Audiobook`} />
            </div>
          )}

          {/* Screen lock hint */}
          {!hasDirectAudio && (
            <p className="text-xs text-gray-400 text-center">
              💡 Screen lock ke baad sunne ke liye 🔒 Lock Screen ✅ badge wali books chunein
            </p>
          )}

          {/* Book meta badges */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">⏱ {book.duration}</span>
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">👁 {((book.plays||0) / 1000).toFixed(0)}K plays</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">🆓 Free</span>
            {hasDirectAudio && <span className="bg-[#FFF1EB] text-[#E85A1A] text-xs font-bold px-3 py-1.5 rounded-full">🔒 Lock Screen ✅</span>}
            {book.trending && <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full">🔥 Trending</span>}
          </div>

          {/* Title + author */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {category ? (
                <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
                  style={{ background: `linear-gradient(to right, ${category.bgFrom}, ${category.bgTo})` }}>
                  {category.emoji} {category.label}
                </span>
              ) : categorySlug ? (
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  {categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ) : null}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">{book.title}</h1>
            <p className="text-gray-500 font-medium">
              by{" "}
              <Link href={`/author/${makeSlug(authorName)}`}
                className="hover:text-[#FF6B2B] transition-colors hover:underline">
                {authorName}
              </Link>
            </p>
          </div>

          <GoogleAd slot="1234567890" />

          {/* Description */}
          {book.description && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📖 {book.title} — Hindi Audiobook ke Baare Mein</h2>
              <div className="text-gray-700 leading-relaxed space-y-3 text-sm">
                {book.description.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
              </div>
              {/* Internal links — SEO + UX */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3 font-medium">Aur explore karein:</p>
                <div className="flex flex-wrap gap-2">
                  {category && (
                    <Link href={`/category/${book.category}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                      style={{ background: "#FFF1EB", color: "#FF6B2B" }}>
                      {category.emoji} Aur {category.label} Audiobooks →
                    </Link>
                  )}
                  <Link href={`/author/${makeSlug(authorName)}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    ✍️ {authorName} ki aur books →
                  </Link>
                  <Link href="/free-hindi-audiobooks"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                    🎧 Saari Free Audiobooks →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Details sidebar */}
        <div className="lg:col-span-1 space-y-5">
          {/* Thumbnail */}
          <div className="rounded-2xl overflow-hidden shadow-md aspect-video"
            style={{ background: book.thumbnail ? `url(${book.thumbnail}) center/cover` : "#1A1A2E" }}>
            {!book.thumbnail && <div className="w-full h-full flex items-center justify-center text-4xl">🎧</div>}
          </div>

          {/* Details card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">📋 Audiobook Details</h3>
            <div className="space-y-3">
              {[
                { label: "Title",    value: book.title },
                { label: "Language", value: "Hindi 🇮🇳" },
                { label: "Category", value: category ? `${category.emoji} ${category.label}` : categorySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "General" },
                { label: "Duration", value: book.duration },
                { label: "Player",   value: hasDirectAudio ? "🟢 HTML5 (Lock Screen ✅)" : "🔴 YouTube Only" },
                { label: "Price",    value: "🆓 Bilkul Free" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start gap-3">
                  <span className="text-gray-400 text-xs flex-shrink-0">{item.label}</span>
                  <span className="text-gray-900 text-xs font-medium text-right">{item.value}</span>
                </div>
              ))}
              {/* Author — clickable */}
              <div className="flex justify-between items-start gap-3">
                <span className="text-gray-400 text-xs flex-shrink-0">Author</span>
                <Link href={`/author/${makeSlug(authorName)}`}
                  className="text-xs font-medium text-right hover:text-[#FF6B2B] transition-colors hover:underline"
                  style={{ color: "#FF6B2B" }}>
                  {authorName}
                </Link>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <a href={`https://www.youtube.com/watch?v=${book.videoId}`} target="_blank" rel="noopener noreferrer"
                className="block w-full text-white text-center font-bold py-3 rounded-xl transition-colors shadow-md text-sm"
                style={{ background: "#FF6B2B" }}>
                ▶ Play on YouTube
              </a>
              {!hasDirectAudio && (
                <p className="text-xs text-gray-400 text-center">
                  🔒 Lock Screen ke liye MP3 wali book chunein
                </p>
              )}
            </div>
          </div>

          {/* Star rating */}
          <StarRating audiobookSlug={book.slug} audiobookTitle={book.title} author={authorName} />

          <GoogleAd slot="0987654321" />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            🎧 More {category?.label || "Hindi"} Audiobooks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
          </div>
        </section>
      )}
    </div>
  );
}
