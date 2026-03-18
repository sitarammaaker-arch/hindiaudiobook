"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Chapter, ChapterBook } from "@/data/chapters";

interface ChapterPlayerProps {
  chapter: Chapter;
  book: ChapterBook;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
}

// ── localStorage helpers ─────────────────────────────────────────────────────
function getSavedPosition(key: string): number {
  try { const v = localStorage.getItem(`resume_chapter_${key}`); return v ? parseFloat(v) : 0; }
  catch { return 0; }
}
function savePosition(key: string, seconds: number) {
  try { if (seconds > 5) localStorage.setItem(`resume_chapter_${key}`, String(Math.floor(seconds))); }
  catch {}
}
function clearPosition(key: string) {
  try { localStorage.removeItem(`resume_chapter_${key}`); } catch {}
}

export default function ChapterPlayer({
  chapter,
  book,
  prevChapter,
  nextChapter,
}: ChapterPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Resume states
  const [savedPosition, setSavedPosition] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [resumed, setResumed] = useState(false);

  const storageKey = `${book.slug}_${chapter.slug}`;

  const hasAudio = Boolean(chapter.audioUrl && chapter.audioUrl.trim() !== "");

  const fmt = (s: number) => {
    if (!isFinite(s) || isNaN(s)) return "0:00";
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const setupMediaSession = useCallback(() => {
    if (!("mediaSession" in navigator) || !hasAudio) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: chapter.title,
      artist: book.author,
      album: book.title,
      artwork: [{ src: chapter.thumbnail, sizes: "480x360", type: "image/jpeg" }],
    });
    const audio = audioRef.current;
    if (!audio) return;
    navigator.mediaSession.setActionHandler("play", () => { audio.play(); setIsPlaying(true); });
    navigator.mediaSession.setActionHandler("pause", () => { audio.pause(); setIsPlaying(false); });
    navigator.mediaSession.setActionHandler("seekbackward", () => { audio.currentTime = Math.max(0, audio.currentTime - 30); });
    navigator.mediaSession.setActionHandler("seekforward", () => { audio.currentTime = Math.min(audio.duration, audio.currentTime + 30); });
    navigator.mediaSession.setActionHandler("previoustrack", prevChapter
      ? () => { window.location.href = `/audiobook/${book.slug}/chapter/${prevChapter.slug}`; }
      : null
    );
    navigator.mediaSession.setActionHandler("nexttrack", nextChapter
      ? () => { window.location.href = `/audiobook/${book.slug}/chapter/${nextChapter.slug}`; }
      : null
    );
  }, [chapter, book, prevChapter, nextChapter, hasAudio]);

  useEffect(() => {
    if (!hasAudio) return;
    const audio = audioRef.current;
    if (!audio) return;

    // Check saved position
    const saved = getSavedPosition(storageKey);
    if (saved > 10) {
      setSavedPosition(saved);
      setShowResumePrompt(true);
    }

    const onMeta = () => { setTotalDuration(audio.duration); setIsLoading(false); };
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if ("mediaSession" in navigator && audio.duration) {
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          playbackRate: audio.playbackRate,
          position: audio.currentTime,
        });
      }
    };
    const onPlay = () => {
      setIsPlaying(true);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";

      // ── Track play count — fires once per session per chapter ────────────
      const trackSlug = book?.slug || chapter?.id;
      if (trackSlug) {
        const trackKey = `played_chapter_${trackSlug}_${chapter?.id}`;
        if (!sessionStorage.getItem(trackKey)) {
          sessionStorage.setItem(trackKey, "1");
          fetch("/api/track-play", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: book?.slug }),
          }).catch(() => {});
        }
      }
      saveTimerRef.current = setInterval(() => {
        savePosition(storageKey, audio.currentTime);
      }, 5000);
    };
    const onPause = () => {
      setIsPlaying(false);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
      savePosition(storageKey, audio.currentTime);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCompleted(true);
      clearPosition(storageKey);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    };
    const onError = () => { setError(true); setIsLoading(false); };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    setupMediaSession();

    return () => {
      savePosition(storageKey, audio.currentTime);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [setupMediaSession, hasAudio, storageKey]);

  // Resume handlers
  const handleResume = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = savedPosition;
    setCurrentTime(savedPosition);
    setShowResumePrompt(false);
    setResumed(true);
    audio.play().catch(() => setError(true));
    setTimeout(() => setResumed(false), 3000);
  };

  const handleStartOver = () => {
    const audio = audioRef.current;
    if (!audio) return;
    clearPosition(storageKey);
    audio.currentTime = 0;
    setCurrentTime(0);
    setSavedPosition(0);
    setShowResumePrompt(false);
    audio.play().catch(() => setError(true));
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    isPlaying ? audio.pause() : audio.play().catch(() => setError(true));
  };

  const skip = (s: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + s));
  };

  const changeSpeed = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  // ── Completed banner ──
  if (completed && nextChapter) {
    return (
      <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-2xl p-6 text-white text-center shadow-xl">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-bold text-lg mb-1">Chapter Complete!</h3>
        <p className="text-green-200 text-sm mb-5">Aapne yeh chapter poora sun liya!</p>
        <Link
          href={`/audiobook/${book.slug}/chapter/${nextChapter.slug}`}
          className="block bg-white text-green-800 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors shadow-md mb-3"
        >
          ▶ Agla Chapter — {nextChapter.title}
        </Link>
        <button
          onClick={() => { setCompleted(false); setCurrentTime(0); if (audioRef.current) { audioRef.current.currentTime = 0; } }}
          className="text-green-300 text-sm hover:text-white transition-colors"
        >
          Dobara Sunein ↺
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A2E] rounded-2xl p-5 shadow-2xl text-white">
      {hasAudio && (
        <audio ref={audioRef} src={chapter.audioUrl} preload="metadata" playsInline />
      )}

      {/* ── RESUME PROMPT ─────────────────────────────────────────────── */}
      {showResumePrompt && hasAudio && (
        <div className="mb-4 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-300 text-lg">⏱️</span>
            <div>
              <p className="text-yellow-200 text-sm font-bold">Aapne pehle yahan tak suna tha</p>
              <p className="text-yellow-300 text-xs mt-0.5">
                Saved: <span className="font-bold text-white">{fmt(savedPosition)}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleResume}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm py-2.5 rounded-xl transition-colors">
              ▶ {fmt(savedPosition)} se Resume
            </button>
            <button onClick={handleStartOver}
              className="px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
              Shuru se
            </button>
          </div>
        </div>
      )}

      {resumed && (
        <div className="mb-3 bg-green-500/20 border border-green-500/30 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-green-400 text-sm">✅</span>
          <p className="text-green-300 text-xs font-medium">{fmt(savedPosition)} se resume ho gaya!</p>
        </div>
      )}

      {/* Chapter info */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-white/20">
          <Image src={chapter.thumbnail} alt={chapter.title} fill className="object-cover" sizes="56px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="bg-[#FFF1EB]0/50 text-orange-100 text-xs px-2 py-0.5 rounded-full font-medium">
              Chapter {chapter.chapterNumber}
            </span>
            {chapter.isFree && (
              <span className="bg-green-500/30 text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">Free</span>
            )}
            {hasAudio ? (
              <span className="bg-green-500/30 text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">🔒 Lock Play ✅</span>
            ) : (
              <span className="bg-amber-500/30 text-amber-300 text-xs px-2 py-0.5 rounded-full font-medium">⚠️ YouTube</span>
            )}
          </div>
          <p className="font-semibold text-white text-sm leading-tight line-clamp-2">{chapter.title}</p>
          <p className="text-orange-200 text-xs mt-0.5">{book.author} · {chapter.duration}</p>
        </div>
      </div>

      {/* YouTube fallback */}
      {!hasAudio && (
        <div className="mb-4 rounded-xl overflow-hidden aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${chapter.videoId}?rel=0&modestbranding=1`}
            title={chapter.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* Progress bar (only for HTML5) */}
      {hasAudio && !error && (
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={totalDuration || 100}
            value={currentTime}
            onChange={(e) => {
              const t = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = t;
              setCurrentTime(t);
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #FF9A5C ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-orange-200 mt-1">
            <span>{fmt(currentTime)}</span>
            <span>{totalDuration ? fmt(totalDuration) : chapter.duration}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      {hasAudio && (
        <>
          {error ? (
            <div className="text-center py-3 text-amber-300 text-sm">
              ⚠️ Audio load nahi hua — YouTube par sunein
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4">
              {/* Prev chapter */}
              {prevChapter ? (
                <Link
                  href={`/audiobook/${book.slug}/chapter/${prevChapter.slug}`}
                  className="flex flex-col items-center text-orange-200 hover:text-white transition-colors"
                  title="Pichla Chapter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                  <span className="text-xs mt-0.5">Pichla</span>
                </Link>
              ) : (
                <div className="w-10" />
              )}

              {/* Skip back */}
              <button onClick={() => skip(-15)} className="text-orange-200 hover:text-white transition-colors flex flex-col items-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
                <span className="text-xs mt-0.5">15s</span>
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-14 h-14 rounded-full bg-white text-[#E85A1A] flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip fwd */}
              <button onClick={() => skip(15)} className="text-orange-200 hover:text-white transition-colors flex flex-col items-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                </svg>
                <span className="text-xs mt-0.5">15s</span>
              </button>

              {/* Next chapter */}
              {nextChapter ? (
                <Link
                  href={`/audiobook/${book.slug}/chapter/${nextChapter.slug}`}
                  className="flex flex-col items-center text-orange-200 hover:text-white transition-colors"
                  title="Agla Chapter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
                  </svg>
                  <span className="text-xs mt-0.5">Agla</span>
                </Link>
              ) : (
                <div className="w-10" />
              )}
            </div>
          )}

          {/* Speed + Volume */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-orange-200 text-xs">Speed:</span>
              {[0.75, 1, 1.25, 1.5, 2].map((r) => (
                <button
                  key={r}
                  onClick={() => changeSpeed(r)}
                  className={`text-xs px-1.5 py-1 rounded-lg font-semibold transition-colors ${
                    playbackRate === r ? "bg-[#FF6B2B] text-white" : "bg-white/10 text-orange-200 hover:bg-white/20"
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { const a = audioRef.current; if (a) { a.muted = !isMuted; setIsMuted(!isMuted); } }} className="text-orange-200 hover:text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {isMuted
                    ? <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    : <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  }
                </svg>
              </button>
              <input
                type="range" min={0} max={1} step={0.05} value={isMuted ? 0 : volume}
                onChange={(e) => { const v = Number(e.target.value); if (audioRef.current) audioRef.current.volume = v; setVolume(v); setIsMuted(v === 0); }}
                className="w-16 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #FF9A5C ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)` }}
              />
            </div>
          </div>
        </>
      )}

      {/* YouTube open button */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <a
          href={`https://www.youtube.com/watch?v=${chapter.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 13.8V9.4l5.4 2.2-5.4 2.2z" />
          </svg>
          YouTube par bhi dekh sakte hain
        </a>
      </div>
    </div>
  );
}
