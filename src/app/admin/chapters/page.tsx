"use client";
import { useState } from "react";
import { chapterBooks } from "@/data/chapters";

type ChapterForm = {
  bookSlug: string;
  chapterNumber: string;
  title: string;
  duration: string;
  description: string;
  audioUrl: string;
  videoId: string;
  isFree: boolean;
};

const empty: ChapterForm = {
  bookSlug: chapterBooks[0]?.slug || "",
  chapterNumber: "",
  title: "",
  duration: "",
  description: "",
  audioUrl: "",
  videoId: "",
  isFree: false,
};

function makeSlug(n: string, title: string) {
  return `chapter-${n}-${title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-")}`;
}

function extractVideoId(input: string): string {
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || input;
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
  } catch {}
  return input.trim();
}

export default function AdminChaptersPage() {
  const [form, setForm] = useState<ChapterForm>(empty);
  const [videoInput, setVideoInput] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [newBookMode, setNewBookMode] = useState(false);
  const [newBookGenerated, setNewBookGenerated] = useState("");

  // New book form
  const [newBook, setNewBook] = useState({
    title: "", author: "", category: "self-help",
    totalChapters: "", totalDuration: "", description: "",
    trending: false, latest: true, thumbnail: "", firstVideoId: "",
  });

  const selectedBook = chapterBooks.find((b) => b.slug === form.bookSlug);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setVideoInput(raw);
    setForm((p) => ({ ...p, videoId: extractVideoId(raw) }));
  };

  const handleGenerate = () => {
    if (!form.title || !form.chapterNumber || !form.bookSlug) {
      alert("Book, Chapter Number aur Title zaroori hain!");
      return;
    }
    const slug = makeSlug(form.chapterNumber, form.title);
    const thumb = selectedBook?.thumbnail || `https://img.youtube.com/vi/${form.videoId}/hqdefault.jpg`;

    const code = `      {
        id: Date.now(), // Unique number lagao
        chapterNumber: ${form.chapterNumber},
        title: "${form.title}",
        slug: "${slug}",
        duration: "${form.duration || "Unknown"}",
        description: "${form.description || "Chapter description yahan likhein."}",
        audioUrl: "${form.audioUrl}", // MP3 URL — lock screen play ke liye
        videoId: "${form.videoId}",
        thumbnail: "${thumb}",
        isFree: ${form.isFree},
      },`;
    setGenerated(code);
  };

  const handleNewBookGenerate = () => {
    if (!newBook.title || !newBook.author) {
      alert("Title aur Author zaroori hain!");
      return;
    }
    const slug = newBook.title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-") + "-chapters";
    const thumb = newBook.firstVideoId
      ? `https://img.youtube.com/vi/${newBook.firstVideoId}/hqdefault.jpg`
      : newBook.thumbnail || "https://img.youtube.com/vi/VIDEOID/hqdefault.jpg";

    const code = `  {
    id: ${Date.now()},
    title: "${newBook.title} — Chapter Wise",
    slug: "${slug}",
    thumbnail: "${thumb}",
    category: "${newBook.category}",
    author: "${newBook.author}",
    totalChapters: ${newBook.totalChapters || 0},
    totalDuration: "${newBook.totalDuration || "Unknown"}",
    trending: ${newBook.trending},
    latest: ${newBook.latest},
    plays: 0,
    hasChapters: true,
    description: \`${newBook.description || "Book description yahan likhein..."}\`,
    chapters: [
      // Chapters yahan add karein (neeche wale form se generate karein)
    ],
  },`;
    setNewBookGenerated(code);
  };

  const copy = (text: string, cb: (v: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => { cb(true); setTimeout(() => cb(false), 2500); });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl md:text-3xl font-bold">Admin — Chapter Manager</h1>
          </div>
          <p className="text-purple-200 text-sm">
            Existing book mein chapter add karein ya naya chapter book create karein
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Tab toggle */}
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setNewBookMode(false)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${!newBookMode ? "bg-[#FF6B2B] text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}
          >
            ➕ Chapter Add Karein
          </button>
          <button
            onClick={() => setNewBookMode(true)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${newBookMode ? "bg-purple-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}
          >
            📖 Naya Chapter Book
          </button>
        </div>

        {/* ── ADD CHAPTER MODE ── */}
        {!newBookMode && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Existing Book Mein Chapter Add Karein</h2>

            {/* Book select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Book Chunein <span className="text-red-500">*</span>
              </label>
              <select
                name="bookSlug"
                value={form.bookSlug}
                onChange={handle}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white"
              >
                {chapterBooks.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.title} ({b.totalChapters} chapters)
                  </option>
                ))}
              </select>
              {selectedBook && (
                <p className="text-xs text-[#FF6B2B] mt-1">
                  ✅ Current chapters: {selectedBook.chapters.length} — Next chapter number: {selectedBook.chapters.length + 1}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Chapter number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Chapter Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="chapterNumber"
                  value={form.chapterNumber}
                  onChange={handle}
                  type="number"
                  min="1"
                  placeholder={selectedBook ? String(selectedBook.chapters.length + 1) : "1"}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handle}
                  placeholder="e.g. 35m"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Chapter Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handle}
                placeholder="e.g. Chapter 3 — Apna Business Banao"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
              />
              {form.title && form.chapterNumber && (
                <p className="text-xs text-gray-400 mt-1">
                  Slug: <code className="bg-gray-100 px-1 rounded">{makeSlug(form.chapterNumber, form.title)}</code>
                </p>
              )}
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">YouTube URL ya Video ID</label>
              <input
                value={videoInput}
                onChange={handleVideo}
                placeholder="https://youtube.com/watch?v=abc123 ya abc123"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
              />
              {form.videoId && <p className="text-xs text-green-600 mt-1">✅ ID: <code>{form.videoId}</code></p>}
            </div>

            {/* Audio URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                MP3 Audio URL
                <span className="ml-2 text-xs text-gray-400 font-normal">(Lock screen play ke liye)</span>
              </label>
              <input
                name="audioUrl"
                value={form.audioUrl}
                onChange={handle}
                placeholder="https://archive.org/download/your-file/chapter-1.mp3"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chapter Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handle}
                rows={3}
                placeholder="Is chapter mein kya hai — short summary..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] resize-none"
              />
            </div>

            {/* Free checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.isFree ? "bg-green-500 border-green-500" : "border-gray-300"}`}
                onClick={() => setForm(p => ({ ...p, isFree: !p.isFree }))}>
                {form.isFree && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
              </div>
              <span className="text-sm font-medium text-gray-700">🆓 Yeh chapter free hai (preview)</span>
            </label>

            <button
              onClick={handleGenerate}
              className="w-full bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
            >
              ⚡ Chapter Code Generate Karein
            </button>

            {/* Generated code */}
            {generated && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Generated Code</h3>
                  <button
                    onClick={() => copy(generated, setCopied)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${copied ? "bg-green-100 text-green-700" : "bg-[#FF6B2B] text-white hover:bg-[#E85A1A]"}`}
                  >
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-green-300 text-xs leading-relaxed whitespace-pre-wrap font-mono">{generated}</pre>
                </div>
                <div className="mt-4 bg-[#FFF1EB] rounded-xl p-4 border border-indigo-100">
                  <p className="font-bold text-indigo-900 text-sm mb-2">📌 Paste Kahan Karein?</p>
                  <ol className="space-y-1 text-sm text-indigo-800">
                    <li><span className="font-bold">1.</span> File kholein: <code className="bg-[#FFF1EB] px-1 rounded text-xs">src/data/chapters.ts</code></li>
                    <li><span className="font-bold">2.</span> <strong>{selectedBook?.title}</strong> ke chapters array mein last chapter ke baad paste karein</li>
                    <li><span className="font-bold">3.</span> <code className="bg-[#FFF1EB] px-1 rounded text-xs">totalChapters</code> number bhi update karein</li>
                    <li><span className="font-bold">4.</span> Save → <code className="bg-[#FFF1EB] px-1 rounded text-xs">git push</code> → Auto deploy ✅</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── NEW BOOK MODE ── */}
        {newBookMode && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Naya Chapter Book Create Karein</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Book Title <span className="text-red-500">*</span></label>
                <input value={newBook.title} onChange={e => setNewBook(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Sapiens" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Author <span className="text-red-500">*</span></label>
                <input value={newBook.author} onChange={e => setNewBook(p => ({ ...p, author: e.target.value }))}
                  placeholder="e.g. Yuval Harari" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <select value={newBook.category} onChange={e => setNewBook(p => ({ ...p, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                  {[["trading-psychology","📈 Trading Psychology"],["wealth-finance","💰 Wealth & Finance"],["power-strategy","👑 Power & Strategy"],["story","📖 Story & Novel"],["self-help","🔥 Self Help"],["spiritual","🙏 Spiritual"],["kids","🧒 Kids Stories"]].map(([v,l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Chapters (approx)</label>
                <input type="number" value={newBook.totalChapters} onChange={e => setNewBook(p => ({ ...p, totalChapters: e.target.value }))}
                  placeholder="e.g. 10" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Duration</label>
                <input value={newBook.totalDuration} onChange={e => setNewBook(p => ({ ...p, totalDuration: e.target.value }))}
                  placeholder="e.g. 5h 30m" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Chapter YouTube Video ID</label>
                <input value={newBook.firstVideoId} onChange={e => setNewBook(p => ({ ...p, firstVideoId: extractVideoId(e.target.value) }))}
                  placeholder="YouTube URL ya Video ID" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Book Description</label>
                <textarea value={newBook.description} onChange={e => setNewBook(p => ({ ...p, description: e.target.value }))}
                  rows={4} placeholder="Book ke baare mein..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${newBook.trending ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}
                  onClick={() => setNewBook(p => ({ ...p, trending: !p.trending }))}>
                  {newBook.trending && <svg className="w-3 h-3 text-white" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" strokeLinecap="round" /></svg>}
                </div>
                <span className="text-sm font-medium text-gray-700">🔥 Trending mein dikhao</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${newBook.latest ? "bg-[#FF6B2B] border-indigo-600" : "border-gray-300"}`}
                  onClick={() => setNewBook(p => ({ ...p, latest: !p.latest }))}>
                  {newBook.latest && <svg className="w-3 h-3 text-white" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" strokeLinecap="round" /></svg>}
                </div>
                <span className="text-sm font-medium text-gray-700">🆕 Latest mein dikhao</span>
              </label>
            </div>

            <button onClick={handleNewBookGenerate}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md">
              ⚡ New Book Code Generate Karein
            </button>

            {newBookGenerated && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Generated Code</h3>
                  <button onClick={() => copy(newBookGenerated, setCopied)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${copied ? "bg-green-100 text-green-700" : "bg-purple-600 text-white"}`}>
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-purple-300 text-xs whitespace-pre-wrap font-mono">{newBookGenerated}</pre>
                </div>
                <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="font-bold text-purple-900 text-sm mb-2">📌 Paste Kahan Karein?</p>
                  <ol className="space-y-1 text-sm text-purple-800">
                    <li><span className="font-bold">1.</span> <code className="bg-purple-100 px-1 rounded text-xs">src/data/chapters.ts</code> mein <code className="bg-purple-100 px-1 rounded text-xs">chapterBooks</code> array mein paste karein</li>
                    <li><span className="font-bold">2.</span> Phir "Chapter Add Karein" tab se chapters ek ek karke add karein</li>
                    <li><span className="font-bold">3.</span> Save → Deploy ✅</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick link */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Chapter books dekhne ke liye</p>
            <p className="text-gray-500 text-xs">Live page check karein</p>
          </div>
          <a href="/chapters" target="_blank"
            className="bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
            /chapters →
          </a>
        </div>
      </div>
    </div>
  );
}
