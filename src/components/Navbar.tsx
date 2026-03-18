"use client";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/audiobooks";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ background: "#1A1A2E", boxShadow: "0 1px 0 rgba(255,107,43,0.15)" }}
      className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            {/* Waveform logo mark */}
            <div className="flex items-end gap-0.5 h-8 w-8">
              {[3,5,7,5,3].map((h, i) => (
                <div key={i}
                  className="rounded-full flex-1"
                  style={{
                    height: `${h * 3}px`,
                    background: i === 2 ? "#FF6B2B" : "rgba(255,107,43,0.5)",
                    transition: "height 0.2s",
                  }}
                />
              ))}
            </div>
            <span className="font-heading font-black text-xl tracking-tight text-white">
              Hindi<span style={{ color: "#FF6B2B" }}>Audiobook</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/best", label: "Best Lists" },
              { href: "/authors", label: "Authors" },
              { href: "/chapters", label: "Chapters" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="text-gray-300 hover:text-white font-medium text-sm px-3 py-2 rounded-lg transition-colors hover:bg-white/10">
                {item.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative group">
              <button className="text-gray-300 hover:text-white font-medium text-sm px-3 py-2 rounded-lg transition-colors hover:bg-white/10 flex items-center gap-1">
                Categories
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors">
                    <span className="text-base">{cat.emoji}</span>
                    <span className="font-medium">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right side ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/free-hindi-audiobooks"
              className="text-gray-300 hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-white/10">
              🆓 Free
            </Link>
            <Link href="/search"
              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </Link>
          </div>

          {/* ── Mobile burger ── */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{ background: "#252540", borderTop: "1px solid rgba(255,107,43,0.2)" }}
          className="md:hidden px-4 py-4 space-y-1">
          {[
            { href: "/",                    label: "🏠 Home" },
            { href: "/best",               label: "🏆 Best Lists" },
            { href: "/authors",            label: "✍️ Authors" },
            { href: "/chapters",           label: "📚 Chapter Books" },
            { href: "/free-hindi-audiobooks", label: "🆓 Free Audiobooks" },
            { href: "/about",              label: "ℹ️ About Us" },
            { href: "/faq",                label: "❓ FAQ" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="block text-gray-200 font-medium py-2.5 px-3 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="pt-3 mt-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-3 font-semibold">Categories</p>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 py-2 px-3 text-sm text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}>
                  <span>{cat.emoji}</span>
                  <span className="truncate">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link href="/search"
              className="btn-primary w-full justify-center text-sm py-3"
              onClick={() => setMenuOpen(false)}>
              🔍 Search Audiobooks
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
