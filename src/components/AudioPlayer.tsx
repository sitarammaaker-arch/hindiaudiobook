"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  slug?: string; // audiobook slug — used as localStorage key
}

// ── localStorage helpers ────────────────────────────────────────────────────
// Key format: "resume_audio_[slug]"
// Saves position every 5 seconds, clears when audio finishes

function getSavedPosition(slug: string): number {
  try {
    const val = localStorage.getItem(`resume_audio_${slug}`);
    return val ? parseFloat(val) : 0;
  } catch { return 0; }
}

function savePosition(slug: string, seconds: number) {
  try {
    if (seconds > 5) { // Don't save if less than 5 seconds
      localStorage.setItem(`resume_audio_${slug}`, String(Math.floor(seconds)));
    }
  } catch {}
}

function clearPosition(slug: string) {
  try {
    localStorage.removeItem(`resume_audio_${slug}`);
  } catch {}
}

export default function AudioPlayer({
  audioUrl,
  title,
  author,
  thumbnail,
  duration,
  slug,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Resume feature states
  const [savedPosition, setSavedPosition] = useState(0);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [resumed, setResumed] = useState(false);

  // Storage key — use slug if provided, else title
  const storageKey = slug || title.toLowerCase().replace(/\s+/g, "-");

  const formatTime = (secs: number) => {
    if (!isFinite(secs) || isNaN(secs)) return "0:00";
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.floor(secs % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // Media Session API — lock screen controls
  const setupMediaSession = useCallback(() => {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: author,
      album: "Hindi Audiobook — HindiAudiobook.com",
      artwork: [{ src: thumbnail, sizes: "480x360", type: "image/jpeg" }],
    });
    const audio = audioRef.current;
    if (!audio) return;
    navigator.mediaSession.setActionHandler("play", () => { audio.play(); setIsPlaying(true); });
    navigator.mediaSession.setActionHandler("pause", () => { audio.pause(); setIsPlaying(false); });
    navigator.mediaSession.setActionHandler("seekbackward", () => { audio.currentTime = Math.max(0, audio.currentTime - 30); });
    navigator.mediaSession.setActionHandler("seekforward", () => { audio.currentTime = Math.min(audio.duration, audio.currentTime + 30); });
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime != null) audio.currentTime = details.seekTime;
    });
  }, [title, author, thumbnail]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // ── Check saved position on load ────────────────────────────────────
    const saved = getSavedPosition(storageKey);
    if (saved > 10) { // Only show prompt if more than 10 seconds saved
      setSavedPosition(saved);
      setShowResumePrompt(true);
    }

    const onLoaded = () => {
      setTotalDuration(audio.duration);
      setIsLoading(false);
    };

    const onTimeUpdate = () => {
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

      // ── Track play count — fires once per session per book ───────────────
      if (slug) {
        const trackKey = `played_${slug}`;
        if (!sessionStorage.getItem(trackKey)) {
          sessionStorage.setItem(trackKey, "1");
          fetch("/api/track-play", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          }).catch(() => {}); // Silent fail — non-critical
        }
      }

      // ── Save position every 5 seconds while playing ──────────────────
      saveTimerRef.current = setInterval(() => {
        savePosition(storageKey, audio.currentTime);
      }, 5000);
    };

    const onPause = () => {
      setIsPlaying(false);
      if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
      // Save immediately on pause
      savePosition(storageKey, audio.currentTime);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    };

    const onEnded = () => {
      // Audio complete — clear saved position
      clearPosition(storageKey);
      setSavedPosition(0);
      setShowResumePrompt(false);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    };

    const onError = () => { setError(true); setIsLoading(false); };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);

    setupMediaSession();

    return () => {
      // Save position on component unmount (page leave)
      savePosition(storageKey, audio.currentTime);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [setupMediaSession, storageKey]);

  // ── Resume from saved position ────────────────────────────────────────────
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

  // ── Start from beginning ─────────────────────────────────────────────────
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
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play().catch(() => setError(true)); }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = Number(e.target.value);
    audio.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const v = Number(e.target.value);
    audio.volume = v;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
  };

  const changeSpeed = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">⚠️</div>
        <p className="text-red-700 font-semibold mb-1">Audio load nahi hua</p>
        <p className="text-red-500 text-sm">Audio URL check karein ya YouTube par sunein.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 shadow-2xl text-white"
      style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2F2F52 100%)" }}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" playsInline />

      {/* ── RESUME PROMPT ─────────────────────────────────────────────────── */}
      {showResumePrompt && (
        <div className="mb-5 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-300 text-lg">⏱️</span>
            <div>
              <p className="text-yellow-200 text-sm font-bold">Aapne pehle yahan tak suna tha</p>
              <p className="text-yellow-300 text-xs mt-0.5">
                Saved position: <span className="font-bold text-white">{formatTime(savedPosition)}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleResume}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              ▶ {formatTime(savedPosition)} se Resume
            </button>
            <button
              onClick={handleStartOver}
              className="px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
            >
              Shuru se
            </button>
          </div>
        </div>
      )}

      {/* ── RESUMED CONFIRMATION ──────────────────────────────────────────── */}
      {resumed && (
        <div className="mb-4 bg-green-500/20 border border-green-500/30 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-green-400">✅</span>
          <p className="text-green-300 text-xs font-medium">
            {formatTime(savedPosition)} se resume ho gaya!
          </p>
        </div>
      )}

      {/* Top: thumbnail + info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
          <Image src={thumbnail} alt={title} fill className="object-cover" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm leading-tight line-clamp-2">{title}</p>
          <p className="text-orange-200 text-xs mt-1">{author}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">
              {isPlaying ? "Ab Sun Rahe Hain" : "Paused"}
            </span>
            {/* Show saved indicator when not playing */}
            {!isPlaying && savedPosition > 10 && !showResumePrompt && (
              <span className="text-yellow-400/70 text-xs ml-1">
                · {formatTime(savedPosition)} saved
              </span>
            )}
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-center bg-white/10 rounded-xl px-3 py-2 text-center flex-shrink-0">
          <span className="text-lg">🔒</span>
          <span className="text-xs text-orange-100 leading-tight">Lock par<br/>bhi chalta hai</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <input
          ref={progressRef}
          type="range"
          min={0}
          max={totalDuration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #FF9A5C ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
          }}
        />
        <div className="flex justify-between text-xs text-orange-200 mt-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{totalDuration ? formatTime(totalDuration) : duration}</span>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <button onClick={() => skip(-30)} className="flex flex-col items-center text-orange-200 hover:text-white transition-colors group" title="30 second peechhe">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
          </svg>
          <span className="text-xs mt-0.5">30s</span>
        </button>

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-14 h-14 rounded-full bg-white text-[#1A1A2E] flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
        >
          {isLoading ? (
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
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

        <button onClick={() => skip(30)} className="flex flex-col items-center text-orange-200 hover:text-white transition-colors group" title="30 second aage">
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
          </svg>
          <span className="text-xs mt-0.5">30s</span>
        </button>
      </div>

      {/* Speed + Volume */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-orange-200 text-xs">Speed:</span>
          {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
            <button key={rate} onClick={() => changeSpeed(rate)}
              className={`text-xs px-2 py-1 rounded-lg font-semibold transition-colors ${playbackRate === rate ? "bg-brand text-white" : "bg-white/10 text-orange-200 hover:bg-white/20"}`}>
              {rate}x
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="text-orange-200 hover:text-white transition-colors">
            {isMuted || volume === 0 ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            )}
          </button>
          <input type="range" min={0} max={1} step={0.05} value={isMuted ? 0 : volume} onChange={handleVolume}
            className="w-20 h-1 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #FF9A5C ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)` }} />
        </div>
      </div>

      {/* Lock screen tip + auto-save indicator */}
      <div className="mt-4 space-y-2">
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl px-3 py-2 flex items-center gap-2 sm:hidden">
          <span className="text-green-400 text-sm">✅</span>
          <p className="text-green-300 text-xs">Screen lock karne ke baad bhi yeh audio chalti rahegi!</p>
        </div>
        <div className="bg-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-orange-200 text-xs">💾</span>
          <p className="text-orange-200 text-xs">
            Position automatically save hoti hai — wapas aaoge toh yahi se shuru hoga
          </p>
        </div>
      </div>
    </div>
  );
}
