import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import AudiobookCard from "@/components/AudiobookCard";
import SearchBar from "@/components/SearchBar";
import SectionHeader from "@/components/SectionHeader";
import GoogleAd from "@/components/GoogleAd";
import { audiobooks, categories, getTrendingAudiobooks, getLatestAudiobooks } from "@/data/audiobooks";
import { chapterBooks, getTotalFreeChapters } from "@/data/chapters";

// ── SEO: Data-driven from GSC analysis ──────────────────────────────────────
// Top keywords from actual search data:
// "hindi audiobook" (349 clicks, pos 2.7) ✅ already ranking
// "hindi audio books" (304 clicks, pos 5.4) → target
// "hindi audiobook free download mp3" (134 clicks, pos 6.8) → target
// "market wizards book in hindi" (2906 impressions, pos 6.5) → quick win
// "48 laws of power in hindi audiobook" (1250 impressions) → quick win
// "secrets of millionaire mind audiobook" (7537 impressions, 0 clicks!) → big gap

export const metadata: Metadata = {
  title: "Hindi Audiobook — Free Hindi Audio Books Online Sunein | HindiAudiobook.com",
  description:
    "Hindi Audiobook sunein bilkul free — HindiAudiobook.com. Motivational, Finance, Spiritual, Story aur Kids hindi audio books. Market Wizards, 48 Laws of Power, Disciplined Trader, Millionaire Mind — sabhi available. Download ki zaroorat nahi.",
  alternates: {
    canonical: "https://www.hindiaudiobook.com",
  },
  openGraph: {
    title: "Hindi Audiobook — Free Hindi Audio Books Online | HindiAudiobook.com",
    description: "India ka #1 free Hindi audiobook platform. Hazaron hindi audio books — kabhi bhi, kahin bhi sunein. Download ki zaroorat nahi.",
    url: "https://www.hindiaudiobook.com",
    siteName: "Hindi Audiobook",
    locale: "hi_IN",
    type: "website",
  },
};

// ── Structured Data (JSON-LD) — helps Google rich results ───────────────────
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hindi Audiobook",
  "alternateName": "HindiAudiobook.com",
  "url": "https://www.hindiaudiobook.com",
  "description": "India ka #1 free Hindi audiobook platform",
  "inLanguage": "hi",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.hindiaudiobook.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hindi Audiobook",
  "url": "https://www.hindiaudiobook.com",
  "logo": "https://www.hindiaudiobook.com/logo.png",
  "sameAs": [
    "https://www.youtube.com/@hindiaudiobook"
  ]
};

export default function HomePage() {
  const trending = getTrendingAudiobooks();
  const latest = getLatestAudiobooks();

  return (
    <>
      {/* Structured Data for Google */}
      <Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* ── Hero Section — Light warm white, brand orange accents ── */}
      <section className="relative overflow-hidden" style={{ background: "#FFF8F5" }}>
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #FF6B2B, transparent)" }} />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #FF9A5C, transparent)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">

          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-8 border"
            style={{ background: "#FFF1EB", color: "#E85A1A", borderColor: "rgba(255,107,43,0.25)" }}>
            <span className="flex items-end gap-px h-4">
              {[2,3,4,3,2].map((h, i) => (
                <span key={i} className="w-1 rounded-full wave-bar"
                  style={{ height: `${h * 4}px`, animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
            India ka #1 Free Hindi Audiobook Platform
          </div>

          {/* H1 — dark navy, Merriweather */}
          <h1 className="font-heading font-black mb-5 leading-tight mx-auto"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#1A1A2E",
              letterSpacing: "-0.03em",
              maxWidth: "720px",
            }}>
            Free Hindi Audiobooks{" "}
            <span style={{ color: "#FF6B2B" }}>Online Sunein</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg mb-3 mx-auto"
            style={{ color: "#5A5568", maxWidth: "540px", lineHeight: "1.7" }}>
            Hindi audio books, audiobooks in Hindi — bilkul free. Kabhi bhi, kahin bhi sunein.
          </p>
          <p className="text-sm mb-10" style={{ color: "#9CA3AF" }}>
            Market Wizards · 48 Laws of Power · Disciplined Trader · Millionaire Mind
          </p>

          <SearchBar large />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
            {[
              { num: "500+", label: "Hindi Audiobooks" },
              { num: "5 Lakh+", label: "Listeners" },
              { num: "7", label: "Categories" },
              { num: "100%", label: "Free" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading font-black text-2xl md:text-3xl"
                  style={{ color: "#FF6B2B", letterSpacing: "-0.02em" }}>
                  {s.num}
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "#9CA3AF" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── SEO: Quick Links to top keyword pages ── */}
        <section aria-label="Popular audiobook categories">
          <SectionHeader title="📚 Categories" subtitle="Apni pasandida genre chunein" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                title={`${cat.label} Hindi Audiobooks — Free`}
                className="group bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-lg border border-gray-100 hover:border-[rgba(255,107,43,0.3)] transition-all duration-300 hover:-translate-y-1"
              >
                <div style={{ background: `linear-gradient(135deg, ${cat.bgFrom}, ${cat.bgTo})` }} className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </div>
                <p className="font-semibold text-gray-800 text-sm group-hover:text-[#FF6B2B] transition-colors">
                  {cat.label}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {audiobooks.filter((a) => a.category === cat.slug).length} audiobooks
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Trending ── */}
        <section aria-label="Trending Hindi Audiobooks">
          <SectionHeader
            title="🔥 Trending Hindi Audiobooks"
            subtitle="Sabse zyada sune jaane wale hindi audio books"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((book) => (
              <AudiobookCard key={book.id} audiobook={book} />
            ))}
          </div>
        </section>

        {/* ── AD SLOT 1: After Trending (high visibility) ──────────────────────
            Best performing position: user just engaged with content, now reading more.
            Use: Responsive ad (works on all screen sizes)
            Replace "1234567890" with your actual ad slot ID from AdSense
        ───────────────────────────────────────────────────────────────────── */}
        <GoogleAd
          slot="1234567890"
          type="responsive"
          className="my-2"
        />

        {/* ── High-traffic book clusters — direct links (GSC data) ── */}
        {/* These 5 books account for 30,000+ impressions */}
        <section aria-label="Most searched Hindi audiobooks" className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <SectionHeader
            title="🔍 Most Searched Hindi Audiobooks"
            subtitle="Google par sabse zyada dhundhe jaate hain"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { title: "Disciplined Trader", slug: "the-disciplined-trader-hindi", emoji: "📈", desc: "Trading mindset" },
              { title: "Market Wizards", slug: "market-wizards-hindi", emoji: "🧙", desc: "Trading legends" },
              { title: "48 Laws of Power", slug: "48-laws-of-power-hindi", emoji: "👑", desc: "Power & strategy" },
              { title: "Millionaire Mind", slug: "secrets-of-millionaire-mind-hindi", emoji: "💰", desc: "Wealth mindset" },
              { title: "Zero to One", slug: "zero-to-one-hindi", emoji: "🚀", desc: "Startup thinking" },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/audiobook/${item.slug}`}
                className="group bg-gray-50 hover:bg-[#FFF1EB] border border-gray-100 hover:border-[rgba(255,107,43,0.3)] rounded-2xl p-4 text-center transition-all"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="font-semibold text-gray-900 text-xs group-hover:text-[#E85A1A] leading-snug mb-1">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Chapter Books ── */}
        <section aria-label="Chapter wise Hindi audiobooks">
          <SectionHeader
            title="📚 Chapter Wise Audiobooks"
            subtitle="Har chapter alag se sunein — apni speed se"
            viewAllHref="/chapters"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapterBooks.map((book) => {
              const cat = categories.find((c) => c.slug === book.category);
              const freeCount = getTotalFreeChapters(book);
              return (
                <div key={book.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[rgba(255,107,43,0.3)] transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative aspect-video overflow-hidden bg-gray-200">
                    <Image src={book.thumbnail} alt={`${book.title} — Hindi Audiobook`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#FF6B2B] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">📚 {book.totalChapters} Chapters</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">{book.totalDuration}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-[#FF6B2B] transition-colors mb-1">{book.title}</h3>
                    <p className="text-gray-500 text-xs mb-3">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">🆓 {freeCount} Free</span>
                      <Link href={`/audiobook/${book.slug}/chapters`} className="bg-[#FFF1EB] text-[#E85A1A] hover:bg-[#FF6B2B] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
                        Sunein →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── AD SLOT 2: Before CTA Banner (mid-page, high CTR zone) ──────────────
            Position: Between chapter books and CTA — users scrolled deep = engaged.
            Replace "0987654321" with your actual slot ID
        ──────────────────────────────────────────────────────────────────────── */}
        <GoogleAd
          slot="0987654321"
          type="responsive"
          className="my-2"
        />

        {/* ── CTA Banner — brand orange ── */}
        <section className="rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2F2F52 50%, #1A1A2E 100%)" }}>
          {/* Orange accent glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,107,43,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            {/* Waveform decoration */}
            <div className="flex items-end justify-center gap-1 h-10 mb-4">
              {[3,5,7,9,11,9,7,5,3].map((h, i) => (
                <div key={i} className="w-1.5 rounded-full wave-bar"
                  style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <h2 className="font-heading font-black text-2xl md:text-3xl mb-3"
              style={{ letterSpacing: "-0.02em", color: "#FFFFFF" }}>
              Free Hindi Audiobooks Sunna Shuru Karein!
            </h2>
            <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.7" }}>
              Hindi audio books — free download ki zaroorat nahi. Seedha browser mein sunein.
            </p>
            <p className="text-xs mb-8" style={{ color: "rgba(255,107,43,0.8)" }}>
              Mobile par bhi · Commute mein bhi · Screen lock karne ke baad bhi ✅
            </p>
            <Link href="/search" className="btn-primary inline-flex items-center gap-2 text-sm px-8 py-3.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore All Hindi Audiobooks
            </Link>
          </div>
        </section>

        {/* ── Latest ── */}
        <section aria-label="Latest Hindi Audiobooks">
          <SectionHeader
            title="🆕 Latest Hindi Audiobooks"
            subtitle="Nayi hindi audio books add hoti rehti hain"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((book) => (
              <AudiobookCard key={book.id} audiobook={book} />
            ))}
          </div>
        </section>

        {/* ── All Audiobooks ── */}
        <section aria-label="All free Hindi audiobooks">
          <SectionHeader
            title="🎙️ All Free Hindi Audiobooks"
            subtitle={`${audiobooks.length} hindi audiobooks available — sabhi bilkul free`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {audiobooks.map((book) => (
              <AudiobookCard key={book.id} audiobook={book} />
            ))}
          </div>
        </section>

        {/* ── SEO Text Block — targets long-tail keywords ── */}
        {/* This helps rank for informational queries */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">HindiAudiobook.com ke baare mein</h2>
          <div className="prose prose-sm max-w-none text-gray-600 space-y-3">
            <p>
              <strong>HindiAudiobook.com</strong> India ka sabse popular <strong>free Hindi audiobook platform</strong> hai. Yahan aap <strong>hindi audio books online</strong> sun sakte hain — koi download, koi registration ki zaroorat nahi.
            </p>
            <p>
              Hamare collection mein best-selling books jaise <strong>Market Wizards Hindi</strong>, <strong>48 Laws of Power Hindi Audiobook</strong>, <strong>The Disciplined Trader in Hindi</strong>, <strong>Secrets of the Millionaire Mind audiobook</strong>, <strong>Zero to One Hindi</strong>, aur bahut saari aur <strong>audiobooks in Hindi</strong> available hain.
            </p>
            <p>
              Chahe aap <strong>motivational audiobooks</strong> sunna chahein, <strong>finance books in Hindi</strong>, <strong>spiritual audiobooks</strong>, ya <strong>kids stories in Hindi</strong> — sabhi ek jagah milenge. Aur sabse khaas baat — yeh <strong>Hindi audiobook free download</strong> ki zaroorat ke bina seedha play hoti hain — phone lock karne par bhi!
            </p>
          </div>
          {/* Internal linking to key pages — helps crawlers */}
          <div className="flex flex-wrap gap-3 mt-5">
            {[
              { label: "Trading Psychology Books", href: "/category/trading-psychology" },
              { label: "Wealth & Finance Hindi", href: "/category/wealth-finance" },
              { label: "Best Trading Books 2025", href: "/best/best-trading-psychology-books-hindi" },
              { label: "Best Self Help Hindi", href: "/best/best-self-help-hindi-audiobooks" },
              { label: "Mark Douglas Audiobooks", href: "/author/mark-douglas" },
              { label: "Robert Kiyosaki Hindi", href: "/author/robert-kiyosaki" },
              { label: "All Best Lists", href: "/best" },
              { label: "All Authors", href: "/authors" },
              { label: "Chapter Wise Books", href: "/chapters" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-[#FF6B2B] hover:text-[#E85A1A] text-sm font-medium bg-[#FFF1EB] hover:bg-[#FFF1EB] px-3 py-1.5 rounded-xl transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
