import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/audiobooks";
import { getAllChapterBooks } from "@/lib/data";
import ChapterPlayer from "@/components/ChapterPlayer";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props { params: { slug: string; chapterSlug: string } }

async function getBookAndChapter(slug: string, chapterSlug: string) {
  const all = await getAllChapterBooks();
  const book = all.find((b) => b.slug === slug);
  if (!book) return null;
  const chapters = book.chapters || [];
  const chapter = chapters.find((c: any) => c.slug === chapterSlug);
  if (!chapter) return null;
  return { book, chapter, chapters };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getBookAndChapter(params.slug, params.chapterSlug);
  if (!result) return {};
  const { book, chapter } = result;
  return {
    title: `${chapter.title} — ${book.title}`,
    description: `${chapter.description || chapter.title} | ${book.title} by ${book.author} — HindiAudiobook.com par free sunein.`,
    alternates: { canonical: `https://www.hindiaudiobook.com/audiobook/${params.slug}/chapter/${params.chapterSlug}` },
  };
}

export default async function ChapterPlayerPage({ params }: Props) {
  const result = await getBookAndChapter(params.slug, params.chapterSlug);
  if (!result) notFound();

  const { book, chapter, chapters } = result!;
  const currentIdx = chapters.findIndex((c: any) => c.slug === chapter.slug);
  const prev = currentIdx > 0 ? chapters[currentIdx - 1] : null;
  const next = currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null;
  const category = categories.find((c) => c.slug === book.category);

  // Safe chapter object — fill missing fields
  const safeChapter = {
    ...chapter,
    thumbnail: chapter.thumbnail || "",
    description: chapter.description || "",
    chapterNumber: chapter.chapterNumber || currentIdx + 1,
    isFree: chapter.isFree ?? true,
    videoId: chapter.videoId || "",
    audioUrl: chapter.audioUrl || "",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <Link href="/chapters" className="hover:text-[#FF6B2B]">Chapter Books</Link>
        <span>/</span>
        <Link href={`/audiobook/${book.slug}/chapters`} className="hover:text-[#FF6B2B] line-clamp-1 max-w-[150px]">
          {book.title}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Chapter {chapter.chapterNumber || currentIdx + 1}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Player */}
        <div className="lg:col-span-2 space-y-6">
          <ChapterPlayer chapter={safeChapter as any} book={book} prevChapter={prev} nextChapter={next} />

          {/* Chapter description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-[#FFF1EB] text-[#E85A1A] rounded-xl flex items-center justify-center font-bold text-sm">
                {chapter.chapterNumber || currentIdx + 1}
              </span>
              <h1 className="text-lg font-bold text-gray-900">{chapter.title}</h1>
            </div>
            {chapter.description && <p className="text-gray-600 leading-relaxed">{chapter.description}</p>}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">⏱ {chapter.duration}</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">🆓 Free Chapter</span>
              {category && (
                <span style={{ background: `linear-gradient(to right, ${category.bgFrom}, ${category.bgTo})` }}
                  className="text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {category.emoji} {category.label}
                </span>
              )}
            </div>
          </div>

          {/* Prev/Next nav */}
          <div className="grid grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/audiobook/${book.slug}/chapter/${prev.slug}`}
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[rgba(255,107,43,0.3)] transition-all">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B2B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">Pichla Chapter</p>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#FF6B2B] line-clamp-1">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/audiobook/${book.slug}/chapter/${next.slug}`}
                className="group flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[rgba(255,107,43,0.3)] transition-all text-right">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400 mb-0.5">Agla Chapter</p>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#FF6B2B] line-clamp-1">{next.title}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B2B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* Sidebar — chapter list */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm">📚 Sabhi Chapters</h3>
              <Link href={`/audiobook/${book.slug}/chapters`} className="text-[#FF6B2B] text-xs hover:underline font-medium">
                Book Page →
              </Link>
            </div>

            {/* Progress */}
            <div className="px-4 py-3 bg-[#FFF1EB] border-b border-gray-100">
              <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                <span>Progress</span>
                <span>{currentIdx + 1} / {chapters.length}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF6B2B] rounded-full transition-all"
                  style={{ width: `${((currentIdx + 1) / chapters.length) * 100}%` }} />
              </div>
            </div>

            {/* Chapter links */}
            <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
              {chapters.map((ch: any, idx: number) => {
                const isActive = ch.slug === chapter.slug;
                const isDone = idx < currentIdx;
                return (
                  <Link key={ch.id || idx} href={`/audiobook/${book.slug}/chapter/${ch.slug}`}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive ? "bg-[#FFF1EB] border-l-2 border-[#FF6B2B]" : "hover:bg-gray-50"}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isActive ? "bg-[#FF6B2B] text-white" : isDone ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {isDone ? "✓" : isActive ? "▶" : (ch.chapterNumber || idx + 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold line-clamp-1 ${isActive ? "text-[#E85A1A]" : "text-gray-800"}`}>{ch.title}</p>
                      <p className="text-gray-400 text-xs">{ch.duration}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
