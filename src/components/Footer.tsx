import Link from "next/link";
import { categories } from "@/data/audiobooks";

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A2E" }} className="text-gray-300 pt-14 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* ── Brand ── */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit">
              <div className="flex items-end gap-0.5 h-7 w-7">
                {[3,5,7,5,3].map((h, i) => (
                  <div key={i} className="rounded-full flex-1"
                    style={{ height: `${h * 2.5}px`, background: i === 2 ? "#FF6B2B" : "rgba(255,107,43,0.4)" }} />
                ))}
              </div>
              <span className="font-heading font-black text-lg text-white tracking-tight">
                Hindi<span style={{ color: "#FF6B2B" }}>Audiobook</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: "#9CA3AF", lineHeight: "1.7" }}>
              India ka #1 free Hindi audiobook platform. Hazaron audio books — kabhi bhi, kahin bhi sunein.
              <br />
              <span className="text-xs" style={{ color: "rgba(255,107,43,0.7)" }}>www.HindiAudiobook.com</span>
            </p>

            <div className="flex gap-3">
              {[
                { label: "YouTube", href: "https://youtube.com/@hindiaudiobook" },
                { label: "Telegram", href: "#" },
                { label: "Instagram", href: "#" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="nav-social text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#9CA3AF" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Categories ── */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase"
              style={{ fontFamily: "var(--font-inter)" }}>
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`}
                    className="footer-link text-sm flex items-center gap-2 py-0.5">
                    <span>{cat.emoji}</span> {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase"
              style={{ fontFamily: "var(--font-inter)" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home",             href: "/" },
                { label: "About Us",         href: "/about" },
                { label: "Best Lists",       href: "/best" },
                { label: "All Authors",      href: "/authors" },
                { label: "Free Audiobooks",  href: "/free-hindi-audiobooks" },
                { label: "Chapters",         href: "/chapters" },
                { label: "FAQ",              href: "/faq" },
                { label: "Contact Us",       href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link text-sm block py-0.5">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Legal links bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} className="pt-6 pb-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
            {[
              { label: "Privacy Policy",   href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-conditions" },
              { label: "Disclaimer",       href: "/disclaimer" },
              { label: "DMCA",             href: "/dmca" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="footer-link text-xs">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          className="pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#5A5568" }}>
            © {new Date().getFullYear()} HindiAudiobook.com — Sab hak surakshit hain.
          </p>
          <p className="text-xs" style={{ color: "#5A5568" }}>
            Made with ❤️ for India&apos;s audio lovers
          </p>
        </div>

        {/* ── Hidden admin link — CSS hover only, no JS ── */}
        <div className="flex justify-center mt-4">
          <Link href="/admin/login" title="Admin" aria-label="Admin" className="admin-lock">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"
              style={{ color: "#9CA3AF" }}>
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
