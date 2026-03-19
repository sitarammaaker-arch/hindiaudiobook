"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authors } from "@/data/authors";
import { type Audiobook } from "@/data/audiobooks";

export default function AuthorsPage() {
  const [allBooks, setAllBooks] = useState<Audiobook[]>([]);

  useEffect(() => {
    fetch("/api/all-audiobooks")
      .then((r) => r.json())
      .then((d) => setAllBooks(d.data || []));
  }, []);

  const getCount = (authorName: string) =>
    allBooks.filter((b) => b.author?.replace(/^by\s+/i, "").toLowerCase() === authorName.toLowerCase()).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">All Authors</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-merriweather)" }}>
        ✍️ Hindi Audiobook Authors
      </h1>
      <p className="text-gray-500 text-sm mb-10">
        {authors.length} authors ke audiobooks free mein sunein
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => {
          const initials = author.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
          const count = getCount(author.name);
          return (
            <Link key={author.slug} href={`/author/${author.slug}`} className="group">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[rgba(255,107,43,0.3)] transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                    style={{ background: "#FFF1EB", color: "#FF6B2B" }}>
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-900 group-hover:text-[#FF6B2B] transition-colors leading-tight">
                      {author.name}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">{author.nationality}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{author.shortBio}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {author.genre.slice(0, 2).map((g) => (
                      <span key={g} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#FFF1EB", color: "#E85A1A" }}>{g}</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{count || author.books.length} books</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
