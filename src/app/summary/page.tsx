import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/audiobooks";
import { summaries, readingMinutes } from "@/data/summaries";

export const metadata: Metadata = {
  title: "Book Summary in Hindi — मशहूर किताबों का सार हिंदी में",
  description: "मशहूर किताबों का आसान Hindi summary — मुख्य सबक, किसके लिए है किताब, और पूरी Hindi audiobook सुनने का link।",
  alternates: { canonical: "https://www.hindiaudiobook.com/summary" },
};

export default function SummaryIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-hindi">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Hindi Summary</span>
      </nav>

      <header className="rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1A1A2E, #2F2F52)" }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#FF6B2B" }} />
        <div className="relative">
          <div className="text-5xl mb-4">📖</div>
          <h1 className="font-black text-3xl md:text-4xl mb-3" style={{ color: "#FFFFFF" }}>
            Book Summary in Hindi
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            मशहूर किताबों के मुख्य विचार, आसान हिंदी में। हर summary में किताब के सबसे ज़रूरी सबक,
            उन्हें अपनी ज़िंदगी में लागू करने का तरीका, और पूरी Hindi audiobook सुनने का link है।
          </p>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-5">
        {summaries.map((s) => {
          const category = categories.find((c) => c.slug === s.category);
          return (
            <Link key={s.slug} href={`/summary/${s.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[rgba(255,107,43,0.4)] transition-all">
              <div className="h-2" style={{ background: `linear-gradient(90deg, ${category?.bgFrom ?? "#1A1A2E"}, #FF6B2B)` }} />
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  {category ? `${category.emoji} ${category.label}` : "Book Summary"} · ⏱ {readingMinutes(s)} मिनट
                </p>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B2B] transition-colors mb-1">
                  {s.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">{s.hindiTitle} · {s.author}</p>
                <p className="text-gray-700 text-[15px] leading-7 line-clamp-3">{s.oneLine}</p>
                <span className="inline-block mt-4 text-sm font-semibold" style={{ color: "#FF6B2B" }}>
                  Summary पढ़ें →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
