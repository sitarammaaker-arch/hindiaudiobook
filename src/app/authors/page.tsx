import type { Metadata } from "next";
import Link from "next/link";
import { authors, makeAuthorSlug } from "@/data/authors";
import { getAllAudiobooks } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hindi Audiobook Authors — Sabhi Lekhak | HindiAudiobook.com",
  description: "Mark Douglas, Robert Kiyosaki, Robert Greene, James Clear — sabhi famous authors ki Hindi audiobooks free mein sunein HindiAudiobook.com par.",
  alternates: { canonical: "https://www.hindiaudiobook.com/authors" },
};

const normalizeName = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

type AuthorCard = {
  slug: string;
  name: string;
  nationality: string;
  shortBio: string;
  genre: string[];
  bookCount: number;
};

export default async function AuthorsPage() {
  const allBooks = await getAllAudiobooks();
  const staticByName = new Map(authors.map((a) => [normalizeName(a.name), a]));
  const dynamicCounts = new Map<string, { name: string; count: number }>();

  for (const book of allBooks) {
    const name = book.author?.trim();
    if (!name) continue;
    const key = normalizeName(name);
    const current = dynamicCounts.get(key);
    dynamicCounts.set(key, { name, count: (current?.count ?? 0) + 1 });
  }

  const staticCards: AuthorCard[] = authors.map((author) => {
    const bySlugLinks = allBooks.filter((b) => author.books.includes(b.slug)).length;
    const byName = dynamicCounts.get(normalizeName(author.name))?.count ?? 0;
    return {
      slug: author.slug,
      name: author.name,
      nationality: author.nationality,
      shortBio: author.shortBio,
      genre: author.genre,
      bookCount: Math.max(bySlugLinks, byName),
    };
  });

  const dynamicOnlyCards: AuthorCard[] = [...dynamicCounts.entries()]
    .filter(([normalized]) => !staticByName.has(normalized))
    .map(([, value]) => ({
      slug: makeAuthorSlug(value.name),
      name: value.name,
      nationality: "Author",
      shortBio: `${value.name} ki uploaded Hindi audiobooks sunne ke liye profile dekhein.`,
      genre: ["Audiobooks"],
      bookCount: value.count,
    }));

  const authorCards = [...staticCards, ...dynamicOnlyCards]
    .sort((a, b) => b.bookCount - a.bookCount || a.name.localeCompare(b.name));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">All Authors</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hindi Audiobook Authors</h1>
        <p className="text-gray-500">World ke famous authors ki best books — Hindi mein bilkul free</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {authorCards.map((author) => {
          const initials = author.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
          return (
            <Link key={author.slug} href={`/author/${author.slug}`}
              className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[rgba(255,107,43,0.3)] hover:shadow-lg shadow-sm transition-all duration-300 hover:-translate-y-1 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#FFF1EB] flex items-center justify-center text-[#E85A1A] font-bold text-lg flex-shrink-0 group-hover:bg-[#FF6B2B] group-hover:text-white transition-colors">
                {initials}
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-gray-900 group-hover:text-[#E85A1A] transition-colors">{author.name}</h2>
                <p className="text-gray-500 text-xs mt-0.5">{author.nationality}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{author.shortBio}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {author.genre.slice(0, 2).map((g) => (
                    <span key={g} className="bg-[#FFF1EB] text-[#FF6B2B] text-xs px-2 py-0.5 rounded-full">{g}</span>
                  ))}
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                    {author.bookCount} book{author.bookCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
