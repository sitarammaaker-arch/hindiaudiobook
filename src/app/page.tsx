import Link from "next/link";
import AudiobookCard from "@/components/AudiobookCard";
import {
  getAllAudiobooks, getAllChapterBooks, getCategoryCounts, categories,
  type Audiobook, type ChapterBook,
} from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  let allBooks: Audiobook[] = [];
  let chapterBooks: ChapterBook[] = [];
  let catCounts: Record<string, number> = {};

  try {
    [allBooks, chapterBooks, catCounts] = await Promise.all([
      getAllAudiobooks(),
      getAllChapterBooks(),
      getCategoryCounts(),
    ]);
  } catch {
    // Silent fallback — empty arrays, page still renders
  }

  const trending = allBooks.filter((b) => b.trending).sort((a, b) => (b.plays||0) - (a.plays||0)).slice(0, 9);
  const latest   = allBooks.filter((b) => b.latest).sort((a, b) => (b.plays||0) - (a.plays||0)).slice(0, 6);
  const topPlays = [...allBooks].sort((a, b) => (b.plays||0) - (a.plays||0)).slice(0, 6);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-16 md:py-24"
        style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2F2F52 60%, #FF6B2B22 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            🎧 {allBooks.length} Free Hindi Audiobooks
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-merriweather)" }}>
            Hindi Audiobooks<br />
            <span style={{ color: "#FF6B2B" }}>Bilkul Free</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Trading, Self Help, Story — sabhi audiobooks free mein sunein. Koi download nahi, koi signup nahi.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/search"
              className="bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg">
              🔍 Search Karein
            </Link>
            <Link href="/free-hindi-audiobooks"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              🆓 Free Books
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ── Categories Grid ── */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                📚 Categories
              </h2>
              <p className="text-gray-500 text-sm mt-1">Genre ke hisaab se browse karein</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl p-4 text-white transition-transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${cat.bgFrom}, ${cat.bgTo})` }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors rounded-2xl" />
                <div className="relative">
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="font-bold text-sm">{cat.label}</div>
                  <div className="text-white/70 text-xs mt-1">
                    {catCounts[cat.slug] || 0} audiobooks
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Trending ── */}
        {trending.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                  🔥 Trending Hindi Audiobooks
                </h2>
                <p className="text-gray-500 text-sm mt-1">Admin panel mein Trending select kiye books yahan dikhte hain</p>
              </div>
              <Link href="/free-hindi-audiobooks" className="text-[#FF6B2B] text-sm font-semibold hover:underline hidden sm:block">
                Sab dekhein →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
            </div>
          </section>
        )}

        {/* ── Latest ── */}
        {latest.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                  🆕 Nayi Hindi Audiobooks
                </h2>
                <p className="text-gray-500 text-sm mt-1">Admin panel mein Latest select kiye books</p>
              </div>
              <Link href="/free-hindi-audiobooks" className="text-[#FF6B2B] text-sm font-semibold hover:underline hidden sm:block">
                Sab dekhein →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
            </div>
          </section>
        )}

        {/* ── Most Played ── */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                👑 Sabse Zyada Sune Gaye
              </h2>
              <p className="text-gray-500 text-sm mt-1">Top {topPlays.length} most played audiobooks</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPlays.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
          </div>
        </section>

        {/* ── Category Sections — one per category with books ── */}
        {categories.map((cat) => {
          const catBooks = allBooks
            .filter((b) => b.category === cat.slug)
            .sort((a, b) => (b.plays||0) - (a.plays||0))
            .slice(0, 3);
          if (catBooks.length === 0) return null;
          return (
            <section key={cat.slug}>
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                    {cat.emoji} {cat.label} Audiobooks
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
                </div>
                <Link href={`/category/${cat.slug}`}
                  className="text-[#FF6B2B] text-sm font-semibold hover:underline hidden sm:block whitespace-nowrap ml-4">
                  Sab {catCounts[cat.slug]} dekhein →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catBooks.map((book) => <AudiobookCard key={book.id} audiobook={book} />)}
              </div>
              <div className="mt-4 sm:hidden">
                <Link href={`/category/${cat.slug}`}
                  className="block text-center text-[#FF6B2B] text-sm font-semibold py-3 border border-[rgba(255,107,43,0.3)] rounded-xl hover:bg-[#FFF1EB]">
                  Sab {catCounts[cat.slug]} {cat.label} Audiobooks →
                </Link>
              </div>
            </section>
          );
        })}

        {/* ── Chapter Books ── */}
        {chapterBooks.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                  📖 Chapter Wise Audiobooks
                </h2>
                <p className="text-gray-500 text-sm mt-1">Chapter by chapter sunein</p>
              </div>
              <Link href="/chapters" className="text-[#FF6B2B] text-sm font-semibold hover:underline hidden sm:block">
                Sab dekhein →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapterBooks.slice(0, 3).map((book) => {
                const cat = categories.find((c) => c.slug === book.category);
                return (
                  <Link key={book.id} href={`/audiobook/${book.slug}/chapters`} className="group block">
                    <div className="card bg-white overflow-hidden" style={{ borderRadius: "16px" }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${book.thumbnail})`,
                            backgroundSize: "cover", backgroundPosition: "center",
                            background: book.thumbnail
                              ? `url(${book.thumbnail}) center/cover`
                              : `linear-gradient(135deg, ${cat?.bgFrom || "#1A1A2E"}, ${cat?.bgTo || "#2F2F52"})`,
                          }} />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg">
                          📖 {book.totalChapters} chapters
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-lg">
                          {book.totalDuration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
                        <p className="text-xs text-gray-400 mb-3">by {book.author?.replace(/^by\s+/i, "")}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">{cat?.emoji} {cat?.label}</span>
                          <span className="text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-[#FF6B2B] group-hover:text-white transition-all"
                            style={{ background: "#FFF1EB", color: "#FF6B2B" }}>
                            ▶ Sunein
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── SEO Text ── */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">HindiAudiobook.com ke baare mein</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-3">
            <p>
              <strong>HindiAudiobook.com</strong> India ka sabse popular{" "}
              <strong>free Hindi audiobook platform</strong> hai. Yahan aap{" "}
              <strong>hindi audio books online</strong> sun sakte hain — koi download, koi registration ki zaroorat nahi.
            </p>
            <p>
              {categories.map((c) => c.label).join(", ")} — sabhi categories mein{" "}
              <strong>{allBooks.length}+ hindi audiobooks</strong> available hain, sabhi bilkul free.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[rgba(255,107,43,0.4)] hover:text-[#FF6B2B] hover:bg-[#FFF1EB] transition-all">
                {cat.emoji} {cat.label} Books
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
