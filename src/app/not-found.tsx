import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" style={{ background: "#FFF8F5" }}>
      <div className="text-center">
        {/* Waveform decoration */}
        <div className="flex items-end justify-center gap-1.5 mb-6" style={{ height: "64px" }}>
          {[3,5,8,10,12,10,8,5,3].map((h, i) => (
            <div key={i} className="rounded-full w-2.5"
              style={{
                height: `${h * 4}px`,
                background: i === 4 ? "#FF6B2B" : "rgba(255,107,43,0.3)",
              }} />
          ))}
        </div>
        <h1 className="font-heading font-black mb-3"
          style={{ fontSize: "5rem", color: "#1A1A2E", letterSpacing: "-0.03em", lineHeight: 1 }}>
          404
        </h1>
        <h2 className="font-heading font-bold text-xl mb-3" style={{ color: "#1A1A2E" }}>
          Yeh page nahi mila!
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "#9CA3AF", lineHeight: "1.7" }}>
          Jo page aap dhundh rahe hain woh exist nahi karta ya hata diya gaya hai.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary text-sm px-6 py-3">
            🏠 Home par jayein
          </Link>
          {/* CSS-only hover — no JS handler */}
          <Link href="/search"
            className="not-found-btn text-sm font-semibold px-6 py-3 rounded-full transition-colors"
            style={{ background: "#F5F0EB", color: "#5A5568", fontFamily: "var(--font-inter)" }}>
            🔍 Search karein
          </Link>
        </div>
      </div>
    </div>
  );
}
