import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import AudiobookCard from "@/components/AudiobookCard";
import { curatedLists, getCuratedListBySlug } from "@/data/curated-lists";
import { getAllAudiobooks } from "@/lib/data";
import { type Audiobook } from "@/data/audiobooks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return curatedLists.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const list = getCuratedListBySlug(params.slug);
  if (!list) return {};
  return {
    title: `${list.seoTitle} | HindiAudiobook.com`,
    description: list.description + " Sabhi free mein HindiAudiobook.com par sunein.",
    alternates: { canonical: `https://www.hindiaudiobook.com/best/${list.slug}` },
  };
}

export default async function CuratedListPage({ params }: Props) {
  const list = getCuratedListBySlug(params.slug);
  if (!list) notFound();

  // Get ALL books (static + KV) and filter by list slugs
  const allBooks = await getAllAudiobooks();
  const books = list.books
    .map((slug) => allBooks.find((b) => b.slug === slug))
    .filter(Boolean) as Audiobook[];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": list.seoTitle,
    "description": list.description,
    "numberOfItems": books.length,
    "url": `https://www.hindiaudiobook.com/best/${list.slug}`,
    "itemListElement": books.map((book, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": book.title,
      "url": `https://www.hindiaudiobook.com/audiobook/${book.slug}`,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Script id="list-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <Link href="/best" className="hover:text-[#FF6B2B]">Best Lists</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{list.title}</span>
      </nav>

      {/* Header */}
      <div className="rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${list.bgFrom}, ${list.bgTo})` }}>
        <div className="absolute inset-0 bg-black/10 rounded-3xl" />
        <div className="relative">
          <div className="text-5xl mb-4">{list.emoji}</div>
          <h1 className="font-heading font-black text-2xl md:text-3xl mb-2"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            {list.seoTitle}
          </h1>
          <p className="text-white/80 text-lg">{list.description}</p>
          <div className="flex items-center gap-3 mt-4">
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {books.length} Audiobooks
            </span>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Updated {list.updatedYear}
            </span>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              🆓 Sabhi Free
            </span>
          </div>
        </div>
      </div>

      {/* Why this list */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Yeh {books.length} books kyun zaroori hain?
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-4">
          {list.longDescription.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Numbered book list */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {list.emoji} {list.title} — Complete List
        </h2>
        <div className="space-y-4">
          {books.map((book, index) => (
            <div key={book.id} className="flex gap-4 items-start bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-[rgba(255,107,43,0.3)] hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 text-white"
                style={{ background: `linear-gradient(135deg, ${list.bgFrom}, ${list.bgTo})` }}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/audiobook/${book.slug}`}
                  className="font-bold text-gray-900 group-hover:text-[#FF6B2B] transition-colors text-base leading-tight block">
                  {book.title}
                </Link>
                <p className="text-gray-500 text-sm mt-0.5">by {book.author?.replace(/^by\s+/i, "")} · {book.duration}</p>
                {book.description && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {book.description.split("\n\n")[0].slice(0, 150)}
                  </p>
                )}
                <Link href={`/audiobook/${book.slug}`}
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold px-4 py-1.5 rounded-xl transition-colors"
                  style={{ background: "#FFF1EB", color: "#FF6B2B" }}>
                  ▶ Sunein Free
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card grid */}
      {books.length > 0 && (
        <div className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <AudiobookCard key={book.id} audiobook={book} />
            ))}
          </div>
        </div>
      )}

      {/* More lists */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Aur Best Lists dekhen</h3>
        <div className="flex flex-wrap gap-3">
          {curatedLists.filter((l) => l.slug !== params.slug).map((l) => (
            <Link key={l.slug} href={`/best/${l.slug}`}
              className="flex items-center gap-2 bg-gray-50 hover:bg-[#FFF1EB] border border-gray-100 hover:border-[rgba(255,107,43,0.3)] text-gray-700 hover:text-[#FF6B2B] text-sm font-medium px-3 py-2 rounded-xl transition-all">
              {l.emoji} {l.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
