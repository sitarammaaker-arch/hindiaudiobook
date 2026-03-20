import Link from "next/link";
import AudiobookCard from "@/components/AudiobookCard";
import GoogleAd from "@/components/GoogleAd";
import RecentlyListened from "@/components/RecentlyListened";
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
  // Nayi books — createdAt se sort karo, latest 6 dikhao
  const latest = [...allBooks]
    .sort((a, b) => new Date((b as any).createdAt || 0).getTime() - new Date((a as any).createdAt || 0).getTime())
    .slice(0, 6);
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
            Free Hindi Audiobooks<br />
            <span style={{ color: "#FF6B2B" }}>Bilkul Free — Online Sunein</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Trading Psychology, Self Help, Spiritual — sabhi Hindi audiobooks free mein sunein. Koi download nahi, koi signup nahi.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/search"
              className="bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg">
              🔍 Search Karein
            </Link>
            <Link href="/free-hindi-audiobooks"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
              📚 {allBooks.length} Audiobooks Dekhein
            </Link>
            <a href="https://whatsapp.com/channel/0029VaFSHSB1dAw9L0JBGn0P" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
              style={{ background: "#25D36622", border: "1px solid #25D36644", color: "#25D366" }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.05 1.027C5.979 1.027 1.027 5.979 1.027 12.05c0 1.951.498 3.783 1.372 5.382L1.027 23l5.721-1.497c1.543.839 3.3 1.323 5.169 1.323h.003c6.071 0 11.023-4.952 11.023-11.023S18.121 1.027 12.05 1.027z"/>
              </svg>
              WhatsApp Join Karein
            </a>
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

        {/* ── Ad between sections ── */}
        <GoogleAd slot="1122334455" />

        {/* ── Latest ── */}
        {latest.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-merriweather)" }}>
                  🆕 Nayi Hindi Audiobooks
                </h2>
                <p className="text-gray-500 text-sm mt-1">Sabse nayi upload ki gayi audiobooks</p>
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

        {/* Recently Listened — client side, shows if user has visited books */}
        <RecentlyListened />

      </div>
    </main>
  );
}
