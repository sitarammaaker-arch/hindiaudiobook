import type { Metadata } from "next";
import Link from "next/link";
import { curatedLists } from "@/data/curated-lists";
import { getAllAudiobooks } from "@/lib/data";
import { type Audiobook } from "@/data/audiobooks";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // ISR: 30 min

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
              {/* Card header — dark bg with saffron accent */}
              <div className="p-6 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${list.bgFrom}, ${list.bgTo})` }}>
                {/* Saffron top border accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "#FF6B2B" }} />
                {/* Subtle saffron glow */}
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full opacity-20"
                  style={{ background: "#FF6B2B", transform: "translate(30%, 30%)" }} />
                <div className="text-4xl mb-3">{list.emoji}</div>
                <h2 className="font-bold text-lg leading-snug text-white">{list.title}</h2>
                {/* Saffron pill badge */}
                <div className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(255,107,43,0.25)", color: "#FF8C5A", border: "1px solid rgba(255,107,43,0.3)" }}>
                  {books.length} audiobooks · Free
                </div>
              </div>
              {/* Card body */}
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{list.description}</p>
                <div className="flex items-center justify-end">
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
