"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "🎧 Audiobooks ke Baare Mein",
    items: [
      {
        q: "HindiAudiobook.com par audiobooks sunna free hai?",
        a: "Haan, bilkul free hai! HindiAudiobook.com par sabhi audiobooks completely free hain. Koi subscription, koi registration, koi payment nahi. Seedha website par jaayein aur sunna shuru karein.",
      },
      {
        q: "Kya audiobooks download kar sakte hain?",
        a: "HindiAudiobook.com par audiobooks directly browser mein play hoti hain — download ki zaroorat nahi. Yeh actually better hai kyunki storage space nahi chahiye aur hamesha latest version milta hai. Kuch books Archive.org par hain jahan download option available hai.",
      },
      {
        q: "Phone lock karne ke baad bhi audio chalti rahegi?",
        a: "Haan! Jo audiobooks MP3 format mein hain (HTML5 player ke saath) woh phone lock karne ke baad bhi chalti rehti hain. Screen par green lock icon 🔒 dikhta hai to samjhein ki lock screen par bhi chalega. YouTube embed wali books lock screen par nahi chalti.",
      },
      {
        q: "Kya mujhe account banana padega?",
        a: "Nahi! Koi account, koi registration, koi email nahi chahiye. Seedha website kholein aur sunna shuru karein. Aapki progress (resume position, ratings) automatically browser mein save hoti hai.",
      },
      {
        q: "Agar beech mein band kar doon toh kya wahi se shuru hoga?",
        a: "Haan! HindiAudiobook.com mein Resume feature hai. Aapki position automatically save hoti hai. Wapas aaoge toh ek yellow prompt milega jisme 'Resume from X:XX' option hoga. Ek click mein wahi se shuru ho jayega.",
      },
    ],
  },
  {
    category: "📚 Content ke Baare Mein",
    items: [
      {
        q: "Kaunsi books available hain?",
        a: "HindiAudiobook.com par trading psychology (Mark Douglas, Jack Schwager), wealth & finance (Rich Dad Poor Dad, Millionaire Mind), power & strategy (48 Laws of Power, Chanakya Neeti), self help (Atomic Habits, Ikigai), story, spiritual, aur kids categories mein 500+ audiobooks available hain.",
      },
      {
        q: "Mujhe ek specific book chahiye jo nahi dikh rahi — kya suggest kar sakta hoon?",
        a: "Bilkul! Hum user suggestions ko seriously lete hain. Contact page par jaayein ya email karein contact@hindiaudiobook.com par. Subject mein 'Book Suggestion' likhein aur book ka naam batayein. Hum koshish karenge use add karne ki.",
      },
      {
        q: "Audio quality kaisi hai?",
        a: "Audio quality source par depend karti hai. YouTube wali books YouTube ki quality mein hain. Archive.org wali books wahan upload ki gayi quality mein hain. Hum high quality sources prefer karte hain lekin kuch books ke liye sirf ek hi source available hota hai.",
      },
      {
        q: "Books Hindi mein hain ya English mein?",
        a: "HindiAudiobook.com primarily Hindi language audiobooks feature karta hai. Kuch books ke notes ya descriptions English mein ho sakte hain lekin audio Hindi mein hi hai.",
      },
    ],
  },
  {
    category: "⚙️ Technical Issues",
    items: [
      {
        q: "Audio play nahi ho raha — kya karoon?",
        a: "Pehle browser refresh karein. Agar phir bhi nahi chala toh: 1) Browser cache clear karein, 2) Doosra browser try karein, 3) Kisi aur page par jaayein phir wapas aayein. Agar YouTube link hai toh directly YouTube par sunein.",
      },
      {
        q: "Mobile par kaise best experience milega?",
        a: "Chrome ya Safari use karein. Website fully mobile optimized hai. Headphones lagakar sunein for best experience. Background mein aur apps bhi chal sakte hain — audio nahi rukegi (MP3 books ke liye).",
      },
      {
        q: "Resume feature kaam nahi kar raha?",
        a: "Resume feature browser localStorage use karta hai. Agar aapne browser data clear kiya ya incognito mode use kar rahe hain toh resume kaam nahi karega. Normal mode mein use karein aur browser data clear na karein.",
      },
      {
        q: "Website bahut slow hai?",
        a: "Apna internet connection check karein. Website images YouTube se load hoti hain — agar YouTube slow hai toh images bhi slow dikhengi. Agar consistently slow hai toh humein report karein.",
      },
    ],
  },
  {
    category: "📋 Legal & Copyright",
    items: [
      {
        q: "Kya yeh books legal hain? Copyright issue toh nahi?",
        a: "HindiAudiobook.com legal content hi feature karta hai. Hum ya toh public domain books feature karte hain, ya YouTube/Archive.org se embed karte hain jinke original creators ne permission di hai. Hum khud koi copyrighted content host nahi karte.",
      },
      {
        q: "Mera copyrighted content yahan show ho raha hai — kaise remove karwaaun?",
        a: "Hum copyright seriously lete hain. Turant humein email karein: dmca@hindiaudiobook.com. Subject mein 'DMCA Takedown' likhein aur content ka URL batayein. 48 hours mein action lenge.",
      },
      {
        q: "Ads kyun hain? Kya site safe hai?",
        a: "HindiAudiobook.com free service provide karta hai — ads se site ka maintenance cost cover hota hai. Hum Google AdSense use karte hain jo safe aur trusted ad network hai. Koi malware ya harmful ads nahi hain.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div style={{ background: "#FFF8F5" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#9CA3AF" }}>
          <Link href="/" className="hover:text-[#FF6B2B] transition-colors">Home</Link>
          <span>/</span>
          <span style={{ color: "#1A1A2E" }}>FAQ</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-black mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "#9CA3AF", lineHeight: "1.7" }}>
            Aapke common sawaalon ke jawab yahan hain
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((cat) => (
            <div key={cat.category}>
              <h2 className="font-heading font-bold text-xl mb-4" style={{ color: "#1A1A2E", letterSpacing: "-0.01em" }}>
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, idx) => {
                  const key = `${cat.category}-${idx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key}
                      className="bg-white rounded-2xl border overflow-hidden transition-all"
                      style={{ borderColor: isOpen ? "rgba(255,107,43,0.3)" : "rgba(26,26,46,0.08)" }}>
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-start justify-between gap-4 p-5 text-left transition-colors"
                        style={{ background: isOpen ? "#FFF8F5" : "white" }}>
                        <span className="font-semibold text-sm leading-relaxed"
                          style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                          {item.q}
                        </span>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors mt-0.5"
                          style={{ background: isOpen ? "#FF6B2B" : "#F5F0EB" }}>
                          <svg className="w-3.5 h-3.5 transition-transform"
                            style={{ color: isOpen ? "white" : "#9CA3AF", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <div style={{ borderTop: "1px solid rgba(26,26,46,0.06)" }} className="pt-4">
                            <p className="text-sm leading-relaxed" style={{ color: "#5A5568", fontFamily: "var(--font-inter)", lineHeight: "1.7" }}>
                              {item.a}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center rounded-3xl p-8"
          style={{ background: "linear-gradient(135deg, #FFF1EB, #FFF8F5)", border: "1px solid rgba(255,107,43,0.15)" }}>
          <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#1A1A2E" }}>
            Jawab Nahi Mila?
          </h3>
          <p className="text-sm mb-6" style={{ color: "#9CA3AF" }}>
            Hum personally help karenge. Sirf message karein!
          </p>
          <Link href="/contact" className="btn-primary text-sm px-8 py-3">
            📩 Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
