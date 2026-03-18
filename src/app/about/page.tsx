import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — HindiAudiobook.com | India ka #1 Free Hindi Audiobook Platform",
  description: "HindiAudiobook.com ke baare mein jaanein. India ka #1 free Hindi audiobook platform — humara mission, team aur story.",
  alternates: { canonical: "https://www.hindiaudiobook.com/about" },
};

export default function AboutPage() {
  return (
    <div style={{ background: "#FFF8F5" }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#9CA3AF" }}>
          <Link href="/" className="hover:text-[#FF6B2B] transition-colors">Home</Link>
          <span>/</span>
          <span style={{ color: "#1A1A2E" }}>About Us</span>
        </nav>

        {/* Hero */}
        <div className="rounded-3xl p-10 md:p-16 text-white text-center mb-12 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2F2F52 100%)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(255,107,43,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            {/* Waveform */}
            <div className="flex items-end justify-center gap-1.5 mb-6" style={{ height: "48px" }}>
              {[3,5,7,9,11,9,7,5,3].map((h, i) => (
                <div key={i} className="rounded-full w-2 wave-bar"
                  style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <h1 className="font-heading font-black text-3xl md:text-4xl mb-4"
              style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              India ka #1 Free Hindi Audiobook Platform
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.75)", lineHeight: "1.7" }}>
              HindiAudiobook.com — jahan knowledge ko sunna free hai
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 border shadow-sm" style={{ borderColor: "rgba(26,26,46,0.08)" }}>
            <h2 className="font-heading font-black text-2xl mb-5" style={{ color: "#1A1A2E", letterSpacing: "-0.02em" }}>
              Hamari Kahani 📖
            </h2>
            <div style={{ color: "#5A5568", lineHeight: "1.8", fontSize: "15px" }}>
              <p className="mb-4">
                HindiAudiobook.com ki shuruat ek simple observation se hui — <strong style={{ color: "#1A1A2E" }}>India mein millions log daily commute karte hain, lekin unke paas knowledge gain karne ka time nahi hota.</strong>
              </p>
              <p className="mb-4">
                Bus mein, metro mein, ya chalne ke dauran — agar best books Hindi mein freely available hoti toh kitna fark padta? Is sawaal ne HindiAudiobook.com banaya.
              </p>
              <p>
                Aaj yeh platform India ka sabse popular free Hindi audiobook directory hai jahan trading psychology se lekar spiritual books tak — sabhi freely available hain.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border shadow-sm" style={{ borderColor: "rgba(26,26,46,0.08)" }}>
            <h2 className="font-heading font-black text-2xl mb-5" style={{ color: "#1A1A2E", letterSpacing: "-0.02em" }}>
              Hamara Mission 🎯
            </h2>
            <div style={{ color: "#5A5568", lineHeight: "1.8", fontSize: "15px" }}>
              <p className="mb-4">
                <strong style={{ color: "#FF6B2B" }}>&quot;Knowledge ko har Indian ke liye accessible banana — language ki barrier ke bina.&quot;</strong>
              </p>
              <p className="mb-4">
                English mein jo best books hain — unhe Hindi mein sunna possible banana. Free mein. Download ki zaroorat ke bina. Seedha browser mein.
              </p>
              <p>
                Har book jo Hindi mein sun sakte hain, ek aur insaan ka life potentially change kar sakti hai.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-3xl p-8 md:p-10 mb-12"
          style={{ background: "linear-gradient(135deg, #FFF1EB, #FFF8F5)", border: "1px solid rgba(255,107,43,0.15)" }}>
          <h2 className="font-heading font-black text-2xl text-center mb-8" style={{ color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            HindiAudiobook.com in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "500+", label: "Hindi Audiobooks", icon: "🎧" },
              { num: "5 Lakh+", label: "Total Listeners", icon: "👥" },
              { num: "7", label: "Categories", icon: "📚" },
              { num: "3", label: "Countries (IN, PK, NP)", icon: "🌍" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-heading font-black text-2xl md:text-3xl mb-1"
                  style={{ color: "#FF6B2B", letterSpacing: "-0.02em" }}>
                  {s.num}
                </div>
                <div className="text-sm" style={{ color: "#9CA3AF" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What we offer */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border shadow-sm mb-12" style={{ borderColor: "rgba(26,26,46,0.08)" }}>
          <h2 className="font-heading font-black text-2xl mb-8" style={{ color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            Hum Kya Offer Karte Hain
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "📈",
                title: "Trading Psychology",
                desc: "Mark Douglas, Jack Schwager — stock market psychology books Hindi mein",
              },
              {
                icon: "💰",
                title: "Wealth & Finance",
                desc: "Rich Dad Poor Dad, Millionaire Mind — financial freedom ki journey",
              },
              {
                icon: "👑",
                title: "Power & Strategy",
                desc: "48 Laws of Power, Chanakya Neeti — timeless wisdom",
              },
              {
                icon: "🔥",
                title: "Self Help",
                desc: "Atomic Habits, Ikigai — personal development",
              },
              {
                icon: "📖",
                title: "Story & Novel",
                desc: "Alchemist, Sapiens — inspiring stories",
              },
              {
                icon: "🙏",
                title: "Spiritual",
                desc: "Bhagavad Gita, Ramcharitmanas — spiritual journey",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl"
                style={{ background: "#FFF8F5" }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-base mb-1" style={{ color: "#1A1A2E" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="font-heading font-black text-2xl mb-3" style={{ color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            Humse Milein
          </h2>
          <p className="text-sm mb-6" style={{ color: "#9CA3AF" }}>
            Suggestions, collaborations, ya koi sawaal? Hum sunna chahte hain!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-sm px-6 py-3">
              📩 Contact Us
            </Link>
            <Link href="/faq"
              className="text-sm font-semibold px-6 py-3 rounded-full border transition-colors"
              style={{ color: "#FF6B2B", borderColor: "rgba(255,107,43,0.3)", fontFamily: "var(--font-inter)" }}>
              ❓ FAQ Dekhen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
