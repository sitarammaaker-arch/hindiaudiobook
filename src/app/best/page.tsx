import type { Metadata } from "next";
import Link from "next/link";
import { curatedLists } from "@/data/curated-lists";
import { getAllAudiobooks } from "@/lib/data";
import { type Audiobook } from "@/data/audiobooks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Best Hindi Audiobooks Lists — Top Curated Collections | HindiAudiobook.com",
  description: "Best trading psychology, wealth, self-help, power & story Hindi audiobooks. Expert-curated lists — free mein sunein.",
  alternates: { canonical: "https://www.hindiaudiobook.com/best" },
};

export default async function BestListsPage() {
  const allBooks = await getAllAudiobooks();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Best Lists</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Best Hindi Audiobook Lists</h1>
        <p className="text-gray-500">Expert-curated collections — har topic ke liye best books ek jagah</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {curatedLists.map((list) => {
          const books = list.books
            .map((slug) => allBooks.find((b) => b.slug === slug))
            .filter(Boolean) as Audiobook[];

          return (
            <Link key={list.slug} href={`/best/${list.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[rgba(255,107,43,0.3)] hover:shadow-xl shadow-sm transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${list.bgFrom}, ${list.bgTo})` }}>
                <div className="text-4xl mb-3">{list.emoji}</div>
                <h2 className="font-bold text-lg leading-snug">{list.title}</h2>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{list.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{books.length} audiobooks · Free</span>
                  <span className="bg-[#FFF1EB] group-hover:bg-[#FF6B2B] text-[#E85A1A] group-hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors">
                    Dekhein →
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
