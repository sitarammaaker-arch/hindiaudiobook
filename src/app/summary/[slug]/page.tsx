import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/audiobooks";
import { summaries, getSummaryBySlug, readingMinutes, SUMMARIES_UPDATED } from "@/data/summaries";
import { getBookBySlug } from "@/lib/data";

// Content is static (src/data/summaries), but the audiobook card reads Redis.
// The Upstash client uses no-store fetches, which fail during static
// generation (the card came out empty), so render on request like the
// audiobook pages; Redis reads are cached in lib/db.
export const dynamic = "force-dynamic";

const BASE = "https://www.hindiaudiobook.com";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return summaries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSummaryBySlug(params.slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.metaDescription,
    alternates: { canonical: `${BASE}/summary/${s.slug}` },
    openGraph: {
      title: s.seoTitle,
      description: s.metaDescription,
      url: `${BASE}/summary/${s.slug}`,
      type: "article",
      locale: "hi_IN",
    },
  };
}

export default async function SummaryPage({ params }: Props) {
  const s = getSummaryBySlug(params.slug);
  if (!s) notFound();

  // Audiobook card is optional — the summary must render even if Redis is down
  let book = null;
  try { book = (await getBookBySlug(s.audiobookSlug)) ?? null; } catch {}

  const category = categories.find((c) => c.slug === s.category);
  const bgFrom = category?.bgFrom ?? "#1A1A2E";
  const bgTo = category?.bgTo ?? "#2F2F52";
  const minutes = readingMinutes(s);
  const others = summaries.filter((o) => o.slug !== s.slug);
  const listenHref = `/audiobook/${s.audiobookSlug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": s.seoTitle,
    "description": s.metaDescription,
    "inLanguage": "hi",
    "dateModified": SUMMARIES_UPDATED,
    "url": `${BASE}/summary/${s.slug}`,
    "about": { "@type": "Book", "name": s.title, "author": { "@type": "Person", "name": s.author } },
    "publisher": { "@type": "Organization", "name": "HindiAudiobook.com", "url": BASE },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": s.faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
      { "@type": "ListItem", "position": 2, "name": "Hindi Summaries", "item": `${BASE}/summary` },
      { "@type": "ListItem", "position": 3, "name": s.title, "item": `${BASE}/summary/${s.slug}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 font-hindi">
      {/* Plain <script> (not next/script) so the JSON-LD is in the server HTML */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <Link href="/summary" className="hover:text-[#FF6B2B]">Hindi Summary</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{s.title}</span>
      </nav>

      {/* Header */}
      <header className="rounded-3xl p-7 md:p-10 text-white mb-8 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#FF6B2B" }} />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#FFB089" }}>
            📖 Book Summary in Hindi
          </p>
          <h1 className="font-black text-2xl md:text-4xl mb-2 leading-tight" style={{ color: "#FFFFFF" }}>
            {s.title} — {s.hindiTitle}
          </h1>
          <p className="text-white/70 text-base mb-4">लेखक: {s.author}</p>
          <p className="text-white/90 text-lg leading-relaxed mb-6">{s.oneLine}</p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
              ⏱ {minutes} मिनट में पढ़ें
            </span>
            <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
              💡 {s.lessons.length} मुख्य सबक
            </span>
            {category && (
              <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                {category.emoji} {category.label}
              </span>
            )}
          </div>
          <Link href={listenHref}
            className="inline-flex items-center gap-2 font-bold text-white px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
            style={{ background: "#FF6B2B" }}>
            🎧 पूरी Hindi Audiobook सुनें
          </Link>
        </div>
      </header>

      {/* Contents */}
      <nav aria-label="इस summary में" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-8">
        <p className="font-bold text-gray-900 mb-3">इस summary में</p>
        <ol className="space-y-1.5 text-sm">
          {s.lessons.map((l, i) => (
            <li key={i}>
              <a href={`#lesson-${i + 1}`} className="text-gray-700 hover:text-[#FF6B2B]">
                {i + 1}. {l.heading}
              </a>
            </li>
          ))}
          <li><a href="#who-should-read" className="text-gray-700 hover:text-[#FF6B2B]">यह किताब किसके लिए है</a></li>
          <li><a href="#faq" className="text-gray-700 hover:text-[#FF6B2B]">अक्सर पूछे जाने वाले सवाल</a></li>
        </ol>
      </nav>

      {/* Intro */}
      <section className="text-gray-800 text-[17px] leading-8 space-y-4 mb-10">
        {s.intro.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      {/* Lessons */}
      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{s.title} के {s.lessons.length} मुख्य सबक</h2>
        {s.lessons.map((l, i) => (
          <article key={i} id={`lesson-${i + 1}`} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm scroll-mt-24">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}>
                {i + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900 leading-snug pt-1">{l.heading}</h3>
            </div>
            <div className="text-gray-800 text-[17px] leading-8 space-y-3">
              {l.body.map((p, j) => <p key={j}>{p}</p>)}
            </div>
            <p className="mt-4 rounded-xl px-4 py-3 text-[15px] leading-7"
              style={{ background: "#FFF1EB", color: "#9A3412" }}>
              <strong>आज क्या करें:</strong> {l.takeaway}
            </p>
          </article>
        ))}
      </section>

      {/* Mid-page listen CTA */}
      <ListenCard href={listenHref} title={s.title} book={book} />

      {/* Who should read */}
      <section id="who-should-read" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-gray-900 mb-4">यह किताब किसके लिए है</h2>
        <ul className="space-y-2 text-gray-800 text-[17px] leading-7">
          {s.whoShouldRead.map((w, i) => (
            <li key={i} className="flex gap-2"><span className="text-[#FF6B2B]">✓</span><span>{w}</span></li>
          ))}
        </ul>
      </section>

      {/* About author */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">लेखक के बारे में: {s.author}</h2>
        <div className="text-gray-800 text-[17px] leading-8 space-y-3">
          {s.aboutAuthor.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-gray-900 mb-4">अक्सर पूछे जाने वाले सवाल</h2>
        <div className="space-y-3">
          {s.faq.map((f, i) => (
            <details key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm group" open={i === 0}>
              <summary className="cursor-pointer list-none p-5 font-semibold text-gray-900 flex justify-between gap-3">
                {f.q}
                <span className="text-[#FF6B2B] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-gray-700 text-[16px] leading-7">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mb-10">
        <p className="text-gray-800 text-[17px] leading-8 mb-5">{s.closing}</p>
        <ListenCard href={listenHref} title={s.title} book={book} />
      </section>

      {/* More summaries */}
      {others.length > 0 && (
        <section className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">और Hindi Summaries पढ़ें</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/summary/${o.slug}`}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-[rgba(255,107,43,0.4)] transition-colors">
                <p className="font-bold text-gray-900">{o.title}</p>
                <p className="text-sm text-gray-500">{o.author}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs text-gray-400 mt-10">
        यह summary HindiAudiobook.com ने अपने शब्दों में लिखी है, ताकि आप किताब के मुख्य विचार समझ सकें। पूरी किताब का अनुभव लेने के लिए audiobook सुनें या मूल किताब पढ़ें।
      </p>
    </div>
  );
}

function ListenCard({ href, title, book }: {
  href: string;
  title: string;
  book: { thumbnail?: string; duration?: string } | null;
}) {
  return (
    <Link href={href}
      className="flex items-center gap-4 rounded-2xl p-4 mb-10 border shadow-sm hover:shadow-md transition-shadow"
      style={{ background: "#FFF8F5", borderColor: "rgba(255,107,43,0.25)" }}>
      <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl"
        style={{ background: book?.thumbnail ? `url(${book.thumbnail}) center/cover` : "#1A1A2E" }}>
        {!book?.thumbnail && "🎧"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">पढ़ लिया? अब सुनिए</p>
        <p className="font-bold text-gray-900 leading-snug">{title} — Hindi Audiobook</p>
        {book?.duration && <p className="text-xs text-gray-500 mt-0.5">⏱ {book.duration} · 🆓 Free</p>}
      </div>
      <span className="font-bold text-white text-sm px-4 py-2 rounded-xl flex-shrink-0" style={{ background: "#FF6B2B" }}>
        ▶ सुनें
      </span>
    </Link>
  );
}
