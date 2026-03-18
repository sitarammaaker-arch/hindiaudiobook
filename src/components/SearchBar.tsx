"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div
        className="relative flex items-center overflow-hidden bg-white transition-all duration-200"
        style={{
          borderRadius: "999px",
          border: `2px solid ${focused ? "#FF6B2B" : "rgba(26,26,46,0.12)"}`,
          boxShadow: focused
            ? "0 0 0 4px rgba(255,107,43,0.12), 0 4px 24px rgba(26,26,46,0.08)"
            : "0 2px 12px rgba(26,26,46,0.08)",
        }}
      >
        <div className="absolute left-4 pointer-events-none"
          style={{ color: focused ? "#FF6B2B" : "#9CA3AF" }}>
          <svg className={large ? "w-5 h-5" : "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Audiobook ya author dhundein..."
          className={`w-full ${large ? "py-4 text-base" : "py-3 text-sm"} pl-11 pr-32 outline-none border-none bg-transparent`}
          style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}
        />

        <button type="submit"
          className="absolute right-1.5 btn-search font-semibold transition-colors duration-200"
          style={{
            background: "#FF6B2B",
            color: "white",
            borderRadius: "999px",
            padding: large ? "10px 20px" : "8px 16px",
            fontSize: large ? "0.9rem" : "0.8rem",
            fontFamily: "var(--font-inter)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(255,107,43,0.3)",
          }}>
          Search
        </button>
      </div>
    </form>
  );
}
