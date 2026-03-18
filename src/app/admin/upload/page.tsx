"use client";
import { useState, useEffect, useCallback } from "react";
import ArchiveFetcher, { ArchiveFile, ArchiveMeta } from "@/components/ArchiveFetcher";

// ─── Types ────────────────────────────────────────────────────────────────────
type Audiobook = {
  id: number; title: string; slug: string; author: string;
  category: string; duration: string; videoId: string;
  audioUrl: string; thumbnail: string; trending: boolean;
  latest: boolean; plays: number; createdAt: string;
};
type Chapter = {
  id: number; chapterNumber: number; title: string; slug: string;
  duration: string; description: string; audioUrl: string;
  videoId: string; isFree: boolean;
};
type Book = {
  id: number; title: string; slug: string; author: string;
  category: string; totalChapters: number; totalDuration: string;
  description: string; trending: boolean; latest: boolean;
  thumbnail: string; chapters: Chapter[]; createdAt: string;
};
type Status = { type: "idle" | "loading" | "success" | "error"; message: string };

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: "trading-psychology", label: "📈 Trading Psychology" },
  { value: "wealth-finance",     label: "💰 Wealth & Finance" },
  { value: "power-strategy",     label: "👑 Power & Strategy" },
  { value: "story",              label: "📖 Story & Novel" },
  { value: "self-help",          label: "🔥 Self Help" },
  { value: "spiritual",          label: "🙏 Spiritual" },
  { value: "kids",               label: "🧒 Kids Stories" },
];

function extractVideoId(input: string): string {
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || input;
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
  } catch {}
  return input.trim();
}

// ─── Shared UI Components ─────────────────────────────────────────────────────
function StatusBar({ status }: { status: Status }) {
  if (status.type === "idle") return null;
  const styles = {
    loading: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error:   "bg-red-50 border-red-200 text-red-800",
  };
  const icons = { loading: "⏳", success: "✅", error: "❌" };
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${styles[status.type]}`}>
      <span className="text-lg flex-shrink-0">{icons[status.type]}</span>
      <p className="font-semibold text-sm">{status.message}</p>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent bg-white";
const selectCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white";

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div onClick={onChange} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked ? "bg-[#FF6B2B] border-indigo-600" : "border-gray-300 hover:border-indigo-400"}`}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

function SubmitBtn({ loading, label, color = "indigo" }: { loading: boolean; label: string; color?: "indigo" | "purple" | "green" }) {
  const bg = { indigo: "bg-[#FF6B2B] hover:bg-[#E85A1A]", purple: "bg-purple-600 hover:bg-purple-700", green: "bg-green-600 hover:bg-green-700" };
  return (
    <button type="submit" disabled={loading} className={`w-full ${bg[color]} disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm`}>
      {loading ? (
        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Upload ho raha hai...</>
      ) : (
        <><span>⬆️</span> {label}</>
      )}
    </button>
  );
}

// ─── Bulk Chapter Upload Progress ────────────────────────────────────────────
type BulkStatus = { file: string; status: "pending" | "uploading" | "done" | "error"; message?: string };

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function UploadPage() {
  const [tab, setTab] = useState<"audiobook" | "book" | "chapter" | "manage">("audiobook");

  // ── Audiobook form state ──────────────────────────────────────────────────
  const [ab, setAb] = useState({
    title: "", author: "", category: "motivational", duration: "",
    videoId: "", audioUrl: "", description: "", trending: false, latest: true,
  });
  const [abStatus, setAbStatus] = useState<Status>({ type: "idle", message: "" });
  const [abThumb, setAbThumb] = useState("");
  const [showAbFetcher, setShowAbFetcher] = useState(false);

  // ── New Book form state ───────────────────────────────────────────────────
  const [bk, setBk] = useState({
    title: "", author: "", category: "motivational", totalDuration: "",
    description: "", trending: false, latest: true, videoId: "",
  });
  const [bkStatus, setBkStatus] = useState<Status>({ type: "idle", message: "" });
  const [showBkFetcher, setShowBkFetcher] = useState(false);

  // ── Chapter form state ────────────────────────────────────────────────────
  const [ch, setCh] = useState({
    bookId: "", chapterNumber: "", title: "", duration: "",
    description: "", audioUrl: "", videoId: "", isFree: false,
  });
  const [chStatus, setChStatus] = useState<Status>({ type: "idle", message: "" });
  const [showChFetcher, setShowChFetcher] = useState(false);
  const [bulkList, setBulkList] = useState<BulkStatus[]>([]);
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<{ file: ArchiveFile; meta: ArchiveMeta } | null>(null);
  const [pendingBulk, setPendingBulk] = useState<{ files: ArchiveFile[]; meta: ArchiveMeta } | null>(null);

  // ── Manage state ──────────────────────────────────────────────────────────
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<Status>({ type: "idle", message: "" });

  const loadData = useCallback(async () => {
    setManageLoading(true);
    try {
      const [r1, r2] = await Promise.all([fetch("/api/audiobooks"), fetch("/api/books")]);
      const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
      if (d1.success) setAudiobooks(d1.data);
      if (d2.success) setBooks(d2.data);
    } catch {}
    setManageLoading(false);
  }, []);

  useEffect(() => {
    if (tab === "manage" || tab === "chapter") loadData();
  }, [tab, loadData]);

  // ── Archive fetch handlers ────────────────────────────────────────────────

  // Single file selected → fill audiobook form
  const onAbArchiveFile = (file: ArchiveFile, meta: ArchiveMeta) => {
    setAb((p) => ({
      ...p,
      audioUrl: file.url,
      duration: file.durationFormatted || p.duration,
      title: p.title || meta.title,
      author: p.author || meta.creator,
      description: p.description || meta.description,
    }));
  };

  // Single file selected for book cover
  const onBkArchiveFile = (_file: ArchiveFile, meta: ArchiveMeta) => {
    setBk((p) => ({
      ...p,
      title: p.title || meta.title,
      author: p.author || meta.creator,
      description: p.description || meta.description,
    }));
  };

  // Single file selected → fill chapter form
  const onChArchiveFile = (file: ArchiveFile, meta: ArchiveMeta) => {
    setCh((p) => ({
      ...p,
      audioUrl: file.url,
      duration: file.durationFormatted || p.duration,
      title: p.title || file.title || file.name.replace(/\.[^.]+$/, ""),
    }));
    setBulkFiles({ file, meta });
  };

  // ALL files selected → bulk upload all chapters
  const onChArchiveAll = (files: ArchiveFile[], meta: ArchiveMeta) => {
    if (!ch.bookId) {
      setChStatus({ type: "error", message: "Pehle ek book chunein, phir 'Sabhi Chapters Auto-Fill' karein" });
      return;
    }
    setPendingBulk({ files, meta });
    setBulkList(files.map((f) => ({
      file: f.title || f.name.replace(/\.[^.]+$/, ""),
      status: "pending",
    })));
  };

  // ── Submit audiobook ──────────────────────────────────────────────────────
  const submitAudiobook = async (e: React.FormEvent) => {
    e.preventDefault();
    setAbStatus({ type: "loading", message: "Upload ho raha hai..." });
    try {
      const res = await fetch("/api/audiobooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ab, videoIdRaw: ab.videoId }),
      });
      const data = await res.json();
      if (data.success) {
        setAbStatus({ type: "success", message: `"${ab.title}" successfully add ho gaya! 🎉` });
        setAb({ title: "", author: "", category: "motivational", duration: "", videoId: "", audioUrl: "", description: "", trending: false, latest: true });
        setAbThumb(""); setShowAbFetcher(false);
      } else {
        setAbStatus({ type: "error", message: data.error || "Upload fail hua" });
      }
    } catch {
      setAbStatus({ type: "error", message: "Network error — dobara try karein" });
    }
  };

  // ── Submit new book ───────────────────────────────────────────────────────
  const submitBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBkStatus({ type: "loading", message: "Book create ho rahi hai..." });
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bk, videoIdRaw: bk.videoId }),
      });
      const data = await res.json();
      if (data.success) {
        setBkStatus({ type: "success", message: `"${bk.title}" create ho gayi! Ab "Chapter Add" tab se chapters add karein. 📚` });
        setBk({ title: "", author: "", category: "motivational", totalDuration: "", description: "", trending: false, latest: true, videoId: "" });
        setShowBkFetcher(false);
        loadData();
      } else {
        setBkStatus({ type: "error", message: data.error || "Book create fail hua" });
      }
    } catch {
      setBkStatus({ type: "error", message: "Network error" });
    }
  };

  // ── Submit single chapter ─────────────────────────────────────────────────
  const submitChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ch.bookId) { setChStatus({ type: "error", message: "Pehle book chunein" }); return; }
    setChStatus({ type: "loading", message: "Chapter add ho raha hai..." });
    try {
      const res = await fetch(`/api/books/${ch.bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ch, videoIdRaw: ch.videoId }),
      });
      const data = await res.json();
      if (data.success) {
        setChStatus({ type: "success", message: `Chapter "${ch.title}" add ho gaya! ✅` });
        setCh((p) => ({
          ...p, title: "", duration: "", description: "",
          audioUrl: "", videoId: "", isFree: false,
          chapterNumber: String(Number(p.chapterNumber) + 1),
        }));
        setBulkFiles(null);
        setShowChFetcher(false);
        loadData();
      } else {
        setChStatus({ type: "error", message: data.error || "Chapter add fail hua" });
      }
    } catch {
      setChStatus({ type: "error", message: "Network error" });
    }
  };

  // ── Bulk upload all chapters ──────────────────────────────────────────────
  const runBulkUpload = async () => {
    if (!pendingBulk || !ch.bookId) return;
    setBulkRunning(true);
    setChStatus({ type: "idle", message: "" });

    const { files, meta } = pendingBulk;
    const updatedList: BulkStatus[] = files.map((f) => ({
      file: f.title || f.name.replace(/\.[^.]+$/, ""),
      status: "pending",
    }));
    setBulkList([...updatedList]);

    // Get current chapter count for the selected book
    const currentBook = books.find((b) => b.id === Number(ch.bookId));
    let startChapter = (currentBook?.chapters.length || 0) + 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedList[i].status = "uploading";
      setBulkList([...updatedList]);

      const chapterTitle = file.title || file.name.replace(/\.[^.]+$/, "");

      try {
        const res = await fetch(`/api/books/${ch.bookId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: chapterTitle,
            chapterNumber: startChapter + i,
            duration: file.durationFormatted || "",
            description: `${meta.title} — ${chapterTitle}`,
            audioUrl: file.url,
            videoIdRaw: "",
            isFree: i === 0, // First chapter free
          }),
        });
        const data = await res.json();
        if (data.success) {
          updatedList[i].status = "done";
          updatedList[i].message = "✅ Added";
        } else {
          updatedList[i].status = "error";
          updatedList[i].message = data.error || "Failed";
        }
      } catch {
        updatedList[i].status = "error";
        updatedList[i].message = "Network error";
      }

      setBulkList([...updatedList]);
      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 200));
    }

    setBulkRunning(false);
    setPendingBulk(null);
    const doneCount = updatedList.filter((u) => u.status === "done").length;
    const errCount = updatedList.filter((u) => u.status === "error").length;
    setChStatus({
      type: doneCount > 0 ? "success" : "error",
      message: `${doneCount} chapters successfully add hue! ${errCount > 0 ? `(${errCount} fail)` : ""}`,
    });
    loadData();
  };

  // ── Delete helpers ────────────────────────────────────────────────────────
  const deleteAudiobook = async (id: number, title: string) => {
    if (!confirm(`"${title}" delete karna chahte hain?`)) return;
    setDeleteStatus({ type: "loading", message: "Delete ho raha hai..." });
    const res = await fetch(`/api/audiobooks/${id}`, { method: "DELETE" });
    const data = await res.json();
    setDeleteStatus(data.success
      ? { type: "success", message: `"${title}" delete ho gaya` }
      : { type: "error", message: data.error });
    if (data.success) loadData();
  };

  const deleteBook = async (id: number, title: string) => {
    if (!confirm(`"${title}" aur uske saare chapters delete karna chahte hain?`)) return;
    setDeleteStatus({ type: "loading", message: "Delete ho raha hai..." });
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    const data = await res.json();
    setDeleteStatus(data.success
      ? { type: "success", message: `"${title}" delete ho gayi` }
      : { type: "error", message: data.error });
    if (data.success) loadData();
  };

  const deleteChapter = async (bookId: number, chapterId: number, title: string) => {
    if (!confirm(`Chapter "${title}" delete karna chahte hain?`)) return;
    const res = await fetch(`/api/books/${bookId}/chapter/${chapterId}`, { method: "DELETE" });
    const data = await res.json();
    setDeleteStatus(data.success
      ? { type: "success", message: "Chapter delete ho gaya" }
      : { type: "error", message: data.error });
    if (data.success) loadData();
  };

  // ── Generate export code for audiobooks.ts ──────────────────────────────
  const generateExportCode = () => {
    const lines = audiobooks.map((book, i) => {
      const desc = (book.description || "").replace(/`/g, "'");
      const id = 22 + i;
      return [
        "  {",
        "    id: " + id + ",",
        '    title: "' + book.title + '",',
        '    slug: "' + book.slug + '",',
        '    videoId: "' + book.videoId + '",',
        '    thumbnail: "https://img.youtube.com/vi/' + book.videoId + '/hqdefault.jpg",',
        '    duration: "' + (book.duration || "Unknown") + '",',
        '    category: "' + book.category + '",',
        '    author: "' + book.author + '",',
        "    plays: 0,",
        "    trending: " + book.trending + ",",
        "    latest: " + book.latest + ",",
        '    audioUrl: "' + (book.audioUrl || "") + '",',
        "    description: `" + desc + "`,",
        "  },",
      ].join("\n");
    });
    return "// ── audiobooks.ts mein add karein (last book ke baad) ──\n" + lines.join("\n\n");
  };

  const generatePreviewCode = () => {
    return audiobooks.map((book, i) => {
      const desc = (book.description || "").substring(0, 80) + "...";
      return [
        "  { id: " + (22 + i) + ',',
        '    title: "' + book.title + '",',
        '    slug: "' + book.slug + '",',
        '    author: "' + book.author + '",',
        '    category: "' + book.category + '" },',
      ].join(" ");
    }).join("\n");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">⬆️</div>
          <div>
            <h1 className="text-2xl font-bold">Upload Dashboard</h1>
            <p className="text-indigo-200 text-sm">HindiAudiobook.com — Archive.org URL paste karo → Ek click mein upload karo</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Tabs */}
        <div className="grid grid-cols-4 gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          {[
            { id: "audiobook", label: "🎧 Audiobook" },
            { id: "book",      label: "📖 New Book" },
            { id: "chapter",   label: "📑 Chapter" },
            { id: "manage",    label: "🗂️ Manage" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${tab === t.id ? "bg-[#FF6B2B] text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: Audiobook ───────────────────────────────────────────── */}
        {tab === "audiobook" && (
          <form onSubmit={submitAudiobook} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎧</span>
                <h2 className="text-lg font-bold text-gray-900">Naya Audiobook Add Karein</h2>
              </div>
              <button type="button" onClick={() => setShowAbFetcher(!showAbFetcher)}
                className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${showAbFetcher ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"}`}>
                🌐 {showAbFetcher ? "Archive Hide" : "Archive.org Fetch"}
              </button>
            </div>

            <StatusBar status={abStatus} />

            {/* Archive fetcher */}
            {showAbFetcher && (
              <ArchiveFetcher mode="single" onSelectFile={onAbArchiveFile} />
            )}

            {/* If audioUrl filled from archive — show it */}
            {ab.audioUrl && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
                <span className="text-green-600 text-base flex-shrink-0">🎵</span>
                <div className="min-w-0">
                  <p className="text-green-800 text-xs font-semibold">Audio URL filled (Archive.org se):</p>
                  <p className="text-green-600 text-xs font-mono break-all line-clamp-1">{ab.audioUrl}</p>
                </div>
                <button type="button" onClick={() => setAb(p => ({ ...p, audioUrl: "" }))}
                  className="text-green-400 hover:text-red-500 flex-shrink-0 text-lg leading-none">×</button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Audiobook Title" required>
                  <input className={inputCls} placeholder="e.g. Rich Dad Poor Dad Hindi" value={ab.title} onChange={(e) => setAb(p => ({ ...p, title: e.target.value }))} />
                </Field>
              </div>
              <Field label="Author / Lekhak" required>
                <input className={inputCls} placeholder="e.g. Robert Kiyosaki" value={ab.author} onChange={(e) => setAb(p => ({ ...p, author: e.target.value }))} />
              </Field>
              <Field label="Category">
                <select className={selectCls} value={ab.category} onChange={(e) => setAb(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Duration">
                <input className={inputCls} placeholder="e.g. 2h 30m" value={ab.duration} onChange={(e) => setAb(p => ({ ...p, duration: e.target.value }))} />
              </Field>
              <Field label="YouTube URL ya Video ID" required>
                <input className={inputCls} placeholder="https://youtube.com/watch?v=..." value={ab.videoId}
                  onChange={(e) => {
                    const id = extractVideoId(e.target.value);
                    setAb(p => ({ ...p, videoId: e.target.value }));
                    setAbThumb(id.length >= 8 ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "");
                  }} />
                {abThumb && <img src={abThumb} alt="thumb" className="mt-2 w-28 rounded-lg shadow-sm" onError={(e) => (e.currentTarget.style.display = "none")} />}
              </Field>
              <div className="sm:col-span-2">
                <Field label="MP3 Audio URL (Archive.org se ya manual)">
                  <input className={inputCls} placeholder="https://archive.org/download/IDENTIFIER/file.mp3" value={ab.audioUrl} onChange={(e) => setAb(p => ({ ...p, audioUrl: e.target.value }))} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Description (SEO)">
                  <textarea className={inputCls + " resize-none"} rows={4} placeholder="Is audiobook ke baare mein likhein..." value={ab.description} onChange={(e) => setAb(p => ({ ...p, description: e.target.value }))} />
                </Field>
              </div>
              <Checkbox label="🔥 Trending mein dikhao" checked={ab.trending} onChange={() => setAb(p => ({ ...p, trending: !p.trending }))} />
              <Checkbox label="🆕 Latest mein dikhao" checked={ab.latest} onChange={() => setAb(p => ({ ...p, latest: !p.latest }))} />
            </div>
            <SubmitBtn loading={abStatus.type === "loading"} label="Audiobook Upload Karein" color="indigo" />
          </form>
        )}

        {/* ── TAB 2: New Book ────────────────────────────────────────────── */}
        {tab === "book" && (
          <form onSubmit={submitBook} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Naya Chapter Book Create Karein</h2>
                  <p className="text-gray-500 text-xs">Pehle book banao, phir Chapter tab se chapters add karo</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowBkFetcher(!showBkFetcher)}
                className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all flex-shrink-0 ${showBkFetcher ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"}`}>
                🌐 Archive.org
              </button>
            </div>

            <StatusBar status={bkStatus} />

            {showBkFetcher && (
              <ArchiveFetcher mode="single" onSelectFile={onBkArchiveFile} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Book Title" required>
                  <input className={inputCls} placeholder="e.g. Atomic Habits" value={bk.title} onChange={(e) => setBk(p => ({ ...p, title: e.target.value }))} />
                </Field>
              </div>
              <Field label="Author" required>
                <input className={inputCls} placeholder="e.g. James Clear" value={bk.author} onChange={(e) => setBk(p => ({ ...p, author: e.target.value }))} />
              </Field>
              <Field label="Category">
                <select className={selectCls} value={bk.category} onChange={(e) => setBk(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </Field>
              <Field label="Total Duration (approx)">
                <input className={inputCls} placeholder="e.g. 3h 45m" value={bk.totalDuration} onChange={(e) => setBk(p => ({ ...p, totalDuration: e.target.value }))} />
              </Field>
              <Field label="YouTube URL ya ID (cover ke liye)">
                <input className={inputCls} placeholder="YouTube URL ya Video ID" value={bk.videoId} onChange={(e) => setBk(p => ({ ...p, videoId: e.target.value }))} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Book Description">
                  <textarea className={inputCls + " resize-none"} rows={4} placeholder="Is book ke baare mein..." value={bk.description} onChange={(e) => setBk(p => ({ ...p, description: e.target.value }))} />
                </Field>
              </div>
              <Checkbox label="🔥 Trending" checked={bk.trending} onChange={() => setBk(p => ({ ...p, trending: !p.trending }))} />
              <Checkbox label="🆕 Latest" checked={bk.latest} onChange={() => setBk(p => ({ ...p, latest: !p.latest }))} />
            </div>
            <SubmitBtn loading={bkStatus.type === "loading"} label="Book Create Karein" color="purple" />
          </form>
        )}

        {/* ── TAB 3: Chapter ─────────────────────────────────────────────── */}
        {tab === "chapter" && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📑</span>
                  <h2 className="text-lg font-bold text-gray-900">Chapter Add Karein</h2>
                </div>
                <button type="button" onClick={() => setShowChFetcher(!showChFetcher)}
                  className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all flex-shrink-0 ${showChFetcher ? "bg-orange-500 text-white" : "bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200"}`}>
                  🌐 {showChFetcher ? "Archive Hide" : "Archive.org Auto-Fill"}
                </button>
              </div>

              <StatusBar status={chStatus} />

              {/* Book select — always visible */}
              <Field label="Book Chunein" required>
                {books.length === 0 ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    ⚠️ Koi chapter book nahi — pehle "New Book" tab se book banao
                  </div>
                ) : (
                  <select className={selectCls} value={ch.bookId}
                    onChange={(e) => {
                      const book = books.find(b => b.id === Number(e.target.value));
                      setCh(p => ({ ...p, bookId: e.target.value, chapterNumber: book ? String(book.chapters.length + 1) : "1" }));
                      setPendingBulk(null); setBulkList([]);
                    }}>
                    <option value="">— Book chunein —</option>
                    {books.map(b => <option key={b.id} value={b.id}>{b.title} ({b.totalChapters} chapters)</option>)}
                  </select>
                )}
              </Field>

              {/* Archive fetcher for chapter — shows BOTH single + bulk */}
              {showChFetcher && ch.bookId && (
                <ArchiveFetcher
                  mode="multi"
                  onSelectFile={onChArchiveFile}
                  onSelectAll={onChArchiveAll}
                />
              )}

              {showChFetcher && !ch.bookId && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 text-center">
                  ⚠️ Pehle upar se book chunein, phir Archive.org fetch karein
                </div>
              )}

              {/* Bulk upload section */}
              {pendingBulk && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-green-900 text-sm flex items-center gap-2">
                      ⚡ Bulk Upload — {pendingBulk.files.length} Chapters
                    </h3>
                    <button onClick={() => { setPendingBulk(null); setBulkList([]); }}
                      className="text-green-600 hover:text-red-500 text-xs font-medium">Cancel</button>
                  </div>
                  <p className="text-green-700 text-xs">"{pendingBulk.meta.title}" ke {pendingBulk.files.length} chapters ek saath upload honge</p>

                  {/* Progress list */}
                  {bulkList.length > 0 && (
                    <div className="space-y-1.5 max-h-52 overflow-y-auto">
                      {bulkList.map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                          item.status === "done" ? "bg-green-100" :
                          item.status === "error" ? "bg-red-50" :
                          item.status === "uploading" ? "bg-blue-50 animate-pulse" : "bg-white"
                        }`}>
                          <span className="flex-shrink-0 text-sm">
                            {item.status === "done" ? "✅" : item.status === "error" ? "❌" : item.status === "uploading" ? "⏳" : "⬜"}
                          </span>
                          <span className="flex-1 font-medium text-gray-800 line-clamp-1">{item.file}</span>
                          {item.message && <span className="text-gray-500">{item.message}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={runBulkUpload}
                    disabled={bulkRunning}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    {bulkRunning ? (
                      <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Upload ho raha hai ({bulkList.filter(b => b.status === "done").length}/{bulkList.length})...</>
                    ) : (
                      <><span>⚡</span> Sabhi {pendingBulk.files.length} Chapters Upload Karein</>
                    )}
                  </button>
                </div>
              )}

              {/* Single chapter form */}
              {ch.bookId && !pendingBulk && (
                <form onSubmit={submitChapter} className="space-y-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-4">Ya manually ek chapter add karein:</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Chapter Number" required>
                      <input type="number" min="1" className={inputCls} placeholder="1" value={ch.chapterNumber} onChange={(e) => setCh(p => ({ ...p, chapterNumber: e.target.value }))} />
                    </Field>
                    <Field label="Duration">
                      <input className={inputCls} placeholder="e.g. 35m" value={ch.duration} onChange={(e) => setCh(p => ({ ...p, duration: e.target.value }))} />
                    </Field>
                    <div className="col-span-2">
                      <Field label="Chapter Title" required>
                        <input className={inputCls} placeholder="e.g. Chapter 1 — Pehli Mulakat" value={ch.title} onChange={(e) => setCh(p => ({ ...p, title: e.target.value }))} />
                      </Field>
                    </div>
                    <div className="col-span-2">
                      <Field label="MP3 Audio URL (Archive.org ya koi bhi direct link)">
                        <input className={inputCls} placeholder="https://archive.org/download/IDENTIFIER/chapter.mp3" value={ch.audioUrl} onChange={(e) => setCh(p => ({ ...p, audioUrl: e.target.value }))} />
                      </Field>
                    </div>
                    <div className="col-span-2">
                      <Field label="YouTube URL ya Video ID">
                        <input className={inputCls} placeholder="YouTube URL ya VIDEO_ID" value={ch.videoId} onChange={(e) => setCh(p => ({ ...p, videoId: e.target.value }))} />
                      </Field>
                    </div>
                    <div className="col-span-2">
                      <Field label="Chapter Description">
                        <textarea className={inputCls + " resize-none"} rows={2} placeholder="Is chapter mein kya hai..." value={ch.description} onChange={(e) => setCh(p => ({ ...p, description: e.target.value }))} />
                      </Field>
                    </div>
                    <Checkbox label="🆓 Free Chapter (preview)" checked={ch.isFree} onChange={() => setCh(p => ({ ...p, isFree: !p.isFree }))} />
                  </div>
                  <SubmitBtn loading={chStatus.type === "loading"} label="Chapter Add Karein" color="green" />
                </form>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 4: Manage ──────────────────────────────────────────────── */}
        {tab === "manage" && (
          <div className="space-y-6">
            <StatusBar status={deleteStatus} />

            {manageLoading ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Load ho raha hai...</p>
              </div>
            ) : (
              <>
                {/* ── PERMANENT FIX PANEL ── */}
                <div className="rounded-2xl overflow-hidden border-2"
                  style={{ borderColor: "#FF6B2B", background: "#FFF8F5" }}>
                  <div className="px-5 py-4 flex items-start gap-3"
                    style={{ background: "#FFF1EB", borderBottom: "1px solid rgba(255,107,43,0.2)" }}>
                    <span className="text-2xl flex-shrink-0">⚠️</span>
                    <div>
                      <p className="font-bold text-sm" style={{ color: "#1A1A2E" }}>
                        Uploaded books git push ke baad lost ho jaati hain!
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#E85A1A", lineHeight: "1.6" }}>
                        Vercel redeploy hone par /tmp reset ho jaata hai. Permanent save ke liye neeche ka code copy karke
                        <strong> src/data/audiobooks.ts</strong> mein paste karein, phir git push karein.
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>
                        📋 Step 1 — Yeh code copy karein
                      </p>
                      <button
                        onClick={() => {
                          if (audiobooks.length === 0) return;
                          const code = generateExportCode();
                          navigator.clipboard.writeText(code)
                            .then(() => alert("Code copy ho gaya! Ab audiobooks.ts mein paste karein."))
                            .catch(() => {
                              const ta = document.getElementById("export-code") as HTMLTextAreaElement;
                              if (ta) { ta.value = code; ta.select(); }
                            });
                        }}
                        disabled={audiobooks.length === 0}
                        className="text-xs font-bold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
                        style={{ background: "#FF6B2B", color: "white", fontFamily: "var(--font-inter)" }}>
                        📋 Code Copy Karein
                      </button>
                    </div>

                    {audiobooks.length === 0 ? (
                      <p className="text-xs text-center py-4" style={{ color: "#9CA3AF" }}>
                        Koi uploaded book nahi hai — "Audiobook" tab se pehle add karein
                      </p>
                    ) : (
                      <textarea
                        id="export-code"
                        readOnly
                        rows={8}
                        className="w-full rounded-xl border text-xs p-3 resize-none"
                        style={{
                          background: "#1A1A2E",
                          color: "#FF9A5C",
                          borderColor: "rgba(255,107,43,0.3)",
                          fontFamily: "monospace",
                          lineHeight: "1.6",
                        }}
                        defaultValue={generatePreviewCode()}
                        onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                      />
                    )}

                    <div className="mt-4 space-y-2">
                      <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>
                        📁 Step 2 — audiobooks.ts mein paste karein
                      </p>
                      <div className="rounded-xl p-3 font-mono text-xs"
                        style={{ background: "#1A1A2E", color: "#98C379", lineHeight: "1.8" }}>
                        <span style={{ color: "#5C6370" }}>// VS Code mein yeh file kholein:</span><br />
                        <span style={{ color: "#FF9A5C" }}>src/data/audiobooks.ts</span><br />
                        <span style={{ color: "#5C6370" }}>// Last book ke closing brace {"}"} ke baad paste karein</span><br />
                        <span style={{ color: "#5C6370" }}>// Phir:</span><br />
                        <span style={{ color: "#61AFEF" }}>git add . && git commit -m "Add: new audiobooks" && git push</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Audiobooks", value: audiobooks.length, color: "indigo" },
                    { label: "Chapter Books", value: books.length, color: "purple" },
                    { label: "Total Chapters", value: books.reduce((a, b) => a + b.chapters.length, 0), color: "green" },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                      <p className={`text-3xl font-bold text-${s.color}-600`}>{s.value}</p>
                      <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Audiobooks */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      🎧 Audiobooks
                      <span className="bg-[#FFF1EB] text-[#E85A1A] text-xs font-bold px-2 py-0.5 rounded-full">{audiobooks.length}</span>
                    </h3>
                    <button onClick={loadData} className="text-[#FF6B2B] text-sm hover:underline font-medium">↻ Refresh</button>
                  </div>
                  {audiobooks.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">Koi audiobook nahi hai — "Audiobook" tab se add karein</div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {audiobooks.map(book => (
                        <div key={book.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50">
                          <img src={book.thumbnail} alt={book.title} className="w-12 h-9 rounded-lg object-cover flex-shrink-0 bg-gray-200" onError={e => (e.currentTarget.style.display = "none")} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm line-clamp-1">{book.title}</p>
                            <p className="text-gray-500 text-xs">{book.author} · {book.category} · {book.duration}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                              style={{ background: "#FFF1EB", color: "#E85A1A" }}>
                              👁 {(book.plays / 1000).toFixed(1)}K
                            </span>
                            {book.audioUrl && <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-0.5 rounded-full">🔒MP3</span>}
                            {book.trending && <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">🔥</span>}
                            <button onClick={() => deleteAudiobook(book.id, book.title)} className="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Chapter Books */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      📖 Chapter Books
                      <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">{books.length}</span>
                    </h3>
                  </div>
                  {books.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">Koi chapter book nahi — "New Book" tab se banao</div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {books.map(book => (
                        <div key={book.id} className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" onError={e => (e.currentTarget.style.display = "none")} />}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm line-clamp-1">{book.title}</p>
                              <p className="text-gray-500 text-xs">{book.author} · {book.totalChapters} chapters</p>
                            </div>
                            <button onClick={() => deleteBook(book.id, book.title)} className="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                          {book.chapters.length > 0 && (
                            <div className="ml-4 space-y-1">
                              {book.chapters.map(c => (
                                <div key={c.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                                  <span className="w-6 h-6 bg-[#FFF1EB] text-[#E85A1A] rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">{c.chapterNumber}</span>
                                  <p className="flex-1 text-xs font-medium text-gray-800 line-clamp-1">{c.title}</p>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <span className="text-xs text-gray-400">{c.duration}</span>
                                    {c.isFree && <span className="bg-green-100 text-green-600 text-xs px-1.5 py-0.5 rounded-full font-bold">Free</span>}
                                    {c.audioUrl && <span className="bg-[#FFF1EB] text-[#FF6B2B] text-xs px-1.5 py-0.5 rounded-full font-bold">🔒</span>}
                                    <button onClick={() => deleteChapter(book.id, c.id, c.title)} className="w-6 h-6 bg-red-50 hover:bg-red-100 text-red-400 rounded-lg flex items-center justify-center">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {book.chapters.length === 0 && <p className="ml-4 text-xs text-gray-400 italic">Koi chapter nahi — "Chapter" tab se add karein</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
