import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/audiobooks";
import { getAllChapterBooks } from "@/lib/data";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props { params: { slug: string } }

async function getBook(slug: string) {
  const all = await getAllChapterBooks();
  return all.find((b) => b.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBook(params.slug);
  if (!book) return {};
  return {
    title: `${book.title} — Chapter Wise Hindi Audiobook`,
    description: `${book.title} by ${book.author} — ${book.totalChapters} chapters. Har chapter alag se HindiAudiobook.com par sunein.`,
    alternates: { canonical: `https://www.hindiaudiobook.com/audiobook/${book.slug}/chapters` },
  };
}

export default async function ChapterBookPage({ params }: Props) {
  const book = await getBook(params.slug);
  if (!book) notFound();

  const category = categories.find((c) => c.slug === book.category);
  const freeCount = book.chapters?.filter((c: any) => c.isFree).length || book.chapters?.length || 0;
  const chapters = book.chapters || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <Link href="/chapters" className="hover:text-[#FF6B2B]">Chapter Books</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{book.title}</span>
      </nav>

      {/* Book header */}
      <div className="bg-[#1A1A2E] rounded-3xl p-6 md:p-10 text-white mb-10 relative overflow-hidden">
        <div className="relative flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-36 h-28 sm:w-44 sm:h-32 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0"
            style={{ background: `url(${book.thumbnail}) center/cover, #2F2F52` }} />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {category && (
                <span style={{ background: `linear-gradient(to right, ${category.bgFrom}, ${category.bgTo})` }}
                  className="text-white text-xs font-bold px-3 py-1 rounded-full">
                  {category.emoji} {category.label}
                </span>
              )}
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                📚 {chapters.length} Chapters
              </span>
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                ⏱ {book.totalDuration}
              </span>
              <span className="bg-green-500/30 text-green-200 text-xs font-medium px-3 py-1 rounded-full">
                🆓 {freeCount} Free Chapters
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-orange-100 mb-1">by {book.author}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chapter list */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            📋 Sabhi Chapters ({chapters.length})
          </h2>

          {chapters.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500 font-medium">Abhi tak koi chapter add nahi hua</p>
              <p className="text-gray-400 text-sm mt-1">Admin → Chapter tab se chapters add karein</p>
            </div>
          ) : (
            <div className="space-y-3">
              {chapters.map((chapter: any, idx: number) => {
                const hasAudio = Boolean(chapter.audioUrl?.trim());
                return (
                  <Link
                    key={chapter.id || idx}
                    href={`/audiobook/${book.slug}/chapter/${chapter.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[rgba(255,107,43,0.3)] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF1EB] group-hover:bg-[#FF6B2B] text-[#FF6B2B] group-hover:text-white flex items-center justify-center font-bold text-sm transition-colors flex-shrink-0">
                      {chapter.chapterNumber || idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-[#FF6B2B] transition-colors">
                        {chapter.title}
                      </p>
                      {chapter.description && (
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{chapter.description}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-gray-500 text-xs font-medium">{chapter.duration}</span>
                      <div className="flex gap-1">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Free</span>
                        {hasAudio ? (
                          <span className="bg-[#FFF1EB] text-[#E85A1A] text-xs font-bold px-2 py-0.5 rounded-full">🔒✅</span>
                        ) : (
                          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">YT</span>
                        )}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#FF6B2B] transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Start CTA */}
          {chapters.length > 0 && (
            <div className="bg-[#FF6B2B] rounded-2xl p-5 text-white shadow-lg">
              <h3 className="font-bold mb-2">🎧 Sunna Shuru Karein</h3>
              <p className="text-orange-100 text-sm mb-4">Chapter 1 se shuru karein — bilkul free!</p>
              <Link href={`/audiobook/${book.slug}/chapter/${chapters[0].slug}`}
                className="block bg-white text-[#E85A1A] text-center font-bold py-3 rounded-xl hover:bg-[#FFF1EB] transition-colors">
                ▶ Chapter 1 Sunein
              </Link>
            </div>
          )}

          {/* Book details */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">📋 Book Details</h3>
            <div className="space-y-3">
              {[
                { label: "Author", value: book.author },
                { label: "Category", value: category ? `${category.emoji} ${category.label}` : book.category },
                { label: "Total Chapters", value: `${chapters.length} chapters` },
                { label: "Total Duration", value: book.totalDuration || "—" },
                { label: "Language", value: "Hindi 🇮🇳" },
                { label: "Price", value: "🆓 Free" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start gap-2">
                  <span className="text-gray-500 text-xs">{item.label}</span>
                  <span className="text-gray-900 text-xs font-semibold text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">📖 Is Book Ke Baare Mein</h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
