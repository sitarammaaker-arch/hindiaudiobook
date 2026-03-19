import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import AudiobookCard from "@/components/AudiobookCard";
import { getAllAuthors, getAllAudiobooks } from "@/lib/data";
import type { Author } from "@/data/authors";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true; // naye KV authors ke liye bhi page render hoga

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const authors = await getAllAuthors();
  const author = authors.find((a: Author) => a.slug === params.slug);
  if (!author) return {};
  return {
    title: `${author.name} — Hindi Audiobooks Free | HindiAudiobook.com`,
    description: `${author.name} ki sabhi Hindi audiobooks free mein sunein. ${author.shortBio}`,
    alternates: { canonical: `https://www.hindiaudiobook.com/author/${author.slug}` },
  };
}

const avatarColors: Record<string, { bg: string; text: string }> = {
  "mark-douglas":    { bg: "#E6F1FB", text: "#185FA5" },
  "jack-d-schwager": { bg: "#E1F5EE", text: "#0F6E56" },
  "mark-minervini":  { bg: "#FAEEDA", text: "#854F0B" },
  "robert-kiyosaki": { bg: "#EAF3DE", text: "#3B6D11" },
  "t-harv-eker":     { bg: "#FAEEDA", text: "#854F0B" },
  "robert-greene":   { bg: "#FCEBEB", text: "#A32D2D" },
  "james-clear":     { bg: "#EEEDFE", text: "#534AB7" },
  "napoleon-hill":   { bg: "#FAECE7", text: "#993C1D" },
  "paulo-coelho":    { bg: "#EEEDFE", text: "#534AB7" },
};

export default async function AuthorPage({ params }: Props) {
  const [authors, allBooks] = await Promise.all([getAllAuthors(), getAllAudiobooks()]);
  const author = authors.find((a: Author) => a.slug === params.slug);
  if (!author) notFound();

  // Books by this author — match by slug list OR by author name
  const authorBooks = allBooks.filter((b) =>
    author.books?.includes(b.slug) ||
    b.author?.replace(/^by\s+/i, "").toLowerCase() === author.name.toLowerCase()
  );

  const initials = author.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  const avatarColor = avatarColors[author.slug] ?? { bg: "#F1EFE8", text: "#5F5E5A" };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "nationality": author.nationality,
    "knowsAbout": (author.genre || []).join(", "),
    "description": author.shortBio,
    "url": `https://www.hindiaudiobook.com/author/${author.slug}`,
    ...(author.wikipedia ? { "sameAs": author.wikipedia } : {}),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Script id="author-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <Link href="/authors" className="hover:text-[#FF6B2B]">Authors</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{author.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Profile card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-md"
                style={{ background: avatarColor.bg, color: avatarColor.text }}>
                {initials}
              </div>
              <h1 className="text-xl font-bold text-gray-900 text-center">{author.name}</h1>
              <p className="text-sm font-medium mt-1" style={{ color: "#FF6B2B" }}>{author.nationality}</p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "Famous For", value: author.famousFor },
                { label: "Genre", value: (author.genre || []).join(", ") },
                ...(author.born ? [{ label: "Born", value: author.born + (author.died ? ` — ${author.died}` : "") }] : []),
                { label: "Books on Site", value: `${authorBooks.length} audiobook${authorBooks.length !== 1 ? "s" : ""}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="text-gray-800 text-sm font-medium mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {(author.genre || []).map((g: string) => (
                <span key={g} className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#FFF1EB", color: "#E85A1A" }}>
                  {g}
                </span>
              ))}
            </div>

            {author.wikipedia && (
              <a href={author.wikipedia} target="_blank" rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B2B] text-xs transition-colors">
                🌐 Wikipedia par padhein
              </a>
            )}
          </div>
        </div>

        {/* Right: Bio + Books */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{author.name} ke baare mein</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {(author.fullBio || author.shortBio || "").split("\n\n").map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              🎧 {author.name} ki Hindi Audiobooks ({authorBooks.length})
            </h2>
            {authorBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {authorBooks.map((book) => (
                  <AudiobookCard key={book.id} audiobook={book} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                <p className="text-gray-500">Jaldi add hogi — Admin se upload karein!</p>
              </div>
            )}
          </div>

          {/* Related authors */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Similar Authors</h3>
            <div className="flex flex-wrap gap-3">
              {authors
                .filter((a: Author) =>
                  a.slug !== author.slug &&
                  (a.genre || []).some((g: string) => (author.genre || []).includes(g))
                )
                .slice(0, 6)
                .map((a: Author) => (
                  <Link key={a.slug} href={`/author/${a.slug}`}
                    className="flex items-center gap-2 bg-gray-50 hover:bg-[#FFF1EB] border border-gray-100 hover:border-[rgba(255,107,43,0.3)] text-gray-700 hover:text-[#FF6B2B] text-sm font-medium px-3 py-2 rounded-xl transition-all">
                    <span className="w-6 h-6 bg-[#FFF1EB] rounded-full flex items-center justify-center text-xs font-bold text-[#FF6B2B]">
                      {a.name.split(" ")[0][0]}
                    </span>
                    {a.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
