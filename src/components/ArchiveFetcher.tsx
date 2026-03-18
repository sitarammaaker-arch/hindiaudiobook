"use client";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ArchiveFile = {
  name: string;
  format: string;
  size?: string;
  length?: string;
  title?: string;
  track?: string;
  url: string;
  durationFormatted: string;
  isAudio: boolean;
};

export type ArchiveMeta = {
  identifier: string;
  title: string;
  creator: string;
  description: string;
  subject: string;
  mediatype: string;
  files: ArchiveFile[];
  audioFiles: ArchiveFile[];
  thumbnail: string;
  archiveUrl: string;
};

type Props = {
  /** Called when user clicks "Use This" on a single file */
  onSelectFile?: (file: ArchiveFile, meta: ArchiveMeta) => void;
  /** Called when user clicks "Fill All Chapters" (returns all audio files) */
  onSelectAll?: (files: ArchiveFile[], meta: ArchiveMeta) => void;
  /** Which mode to show — "single" for audiobook tab, "multi" for chapter tab */
  mode: "single" | "multi";
};

export default function ArchiveFetcher({ onSelectFile, onSelectAll, mode }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<ArchiveMeta | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const fetch = async () => {
    if (!url.trim()) { setError("URL ya identifier dein"); return; }
    setLoading(true);
    setError("");
    setMeta(null);
    setSelectedIdx(null);

    try {
      const res = await window.fetch("/api/archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setMeta(data.data);
      } else {
        setError(data.error || "Fetch fail hua");
      }
    } catch {
      setError("Network error — dobara try karein");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") fetch();
  };

  const handleSelectFile = (file: ArchiveFile, idx: number) => {
    setSelectedIdx(idx);
    onSelectFile?.(file, meta!);
  };

  const handleSelectAll = () => {
    if (meta) onSelectAll?.(meta.audioFiles, meta);
  };

  // ── Format file size ────────────────────────────────────────────
  const formatSize = (bytes?: string) => {
    if (!bytes) return "";
    const n = parseInt(bytes);
    if (isNaN(n)) return "";
    if (n > 1_000_000) return `${(n / 1_000_000).toFixed(1)} MB`;
    if (n > 1_000) return `${(n / 1_000).toFixed(0)} KB`;
    return `${n} B`;
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          🌐
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Archive.org Auto-Fetch</h3>
          <p className="text-orange-700 text-xs">URL paste karo → MP3 links automatically fill ho jaayenge</p>
        </div>
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKey}
          placeholder="https://archive.org/details/rich-dad-poor-dad-hindi"
          className="flex-1 border border-orange-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
        />
        <button
          onClick={fetch}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 flex-shrink-0 text-sm"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Fetch...
            </>
          ) : (
            <>🔍 Fetch</>
          )}
        </button>
      </div>

      {/* Help text */}
      <div className="flex flex-wrap gap-2">
        {[
          "archive.org/details/IDENTIFIER",
          "archive.org/download/IDENTIFIER/file.mp3",
          "Sirf IDENTIFIER bhi kaam karta hai",
        ].map((hint) => (
          <span key={hint} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-lg">{hint}</span>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <span className="text-red-500 text-base flex-shrink-0">❌</span>
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Results */}
      {meta && (
        <div className="space-y-3">
          {/* Book info card */}
          <div className="bg-white rounded-xl border border-orange-100 p-4 flex gap-3 shadow-sm">
            <img
              src={meta.thumbnail}
              alt={meta.title}
              className="w-16 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm line-clamp-1">{meta.title}</p>
              <p className="text-gray-500 text-xs">{meta.creator}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  🎵 {meta.audioFiles.length} audio files
                </span>
                <a
                  href={meta.archiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 text-xs hover:underline"
                >
                  Archive.org ↗
                </a>
              </div>
            </div>
          </div>

          {/* "Fill All" button for multi mode */}
          {mode === "multi" && meta.audioFiles.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <span>⚡</span>
              Sabhi {meta.audioFiles.length} Chapters Auto-Fill Karein
            </button>
          )}

          {/* Files list */}
          {meta.audioFiles.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-amber-800 text-sm font-semibold">⚠️ Koi audio file nahi mili</p>
              <p className="text-amber-600 text-xs mt-1">Yeh item audio nahi hai, ya files private hain</p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              <p className="text-xs font-semibold text-gray-600 px-1">
                Audio Files — click karein form mein fill karne ke liye:
              </p>
              {meta.audioFiles.map((file, idx) => (
                <div
                  key={file.name}
                  onClick={() => handleSelectFile(file, idx)}
                  className={`group flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedIdx === idx
                      ? "bg-[#FFF1EB] border-[rgba(255,107,43,0.4)] shadow-sm"
                      : "bg-white border-gray-100 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  {/* Track number or play icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    selectedIdx === idx ? "bg-[#FF6B2B] text-white" : "bg-gray-100 text-gray-600 group-hover:bg-orange-500 group-hover:text-white"
                  }`}>
                    {selectedIdx === idx ? "✓" : (file.track || String(idx + 1))}
                  </div>

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold line-clamp-1 ${selectedIdx === idx ? "text-[#E85A1A]" : "text-gray-800"}`}>
                      {file.title || file.name.replace(/\.[^.]+$/, "")}
                    </p>
                    <p className="text-gray-400 text-xs line-clamp-1 font-mono">{file.name}</p>
                  </div>

                  {/* Duration + size */}
                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                    {file.durationFormatted && (
                      <span className="text-xs font-medium text-gray-600">{file.durationFormatted}</span>
                    )}
                    {file.size && (
                      <span className="text-xs text-gray-400">{formatSize(file.size)}</span>
                    )}
                    <span className="text-xs text-orange-500 font-medium">{file.format}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected file URL preview */}
          {selectedIdx !== null && mode === "single" && (
            <div className="bg-[#FFF1EB] border border-[rgba(255,107,43,0.3)] rounded-xl p-3">
              <p className="text-xs font-semibold text-[#E85A1A] mb-1">✅ Selected URL (form mein fill ho gaya):</p>
              <p className="text-xs text-[#FF6B2B] font-mono break-all line-clamp-2">
                {meta.audioFiles[selectedIdx]?.url}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
