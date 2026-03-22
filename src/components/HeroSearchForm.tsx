"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
    else router.push("/search");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-6">
      <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-lg"
        style={{ border: "2px solid rgba(255,107,43,0.4)" }}>
        <div className="flex items-center gap-2 flex-1 px-4 min-w-0">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="#FF6B2B" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Atomic Habits, Rich Dad, Bhagavad Gita..."
            className="flex-1 py-3.5 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400 min-w-0"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3.5 font-bold text-sm text-white flex-shrink-0 hover:brightness-110 transition-all"
          style={{ background: "#FF6B2B" }}>
          Search Karein
        </button>
      </div>
    </form>
  );
}
