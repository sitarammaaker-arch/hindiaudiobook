"use client";
import { useEffect } from "react";

// Tracks a "view" when user visits a YouTube-embed audiobook page
// Called once per session per slug — non-intrusive
export default function YouTubePlayTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const trackKey = `played_yt_${slug}`;
    if (sessionStorage.getItem(trackKey)) return; // Already tracked this session

    // Track on page visit (YouTube auto-plays or user clicks play)
    // We track page visit as a "play intent" for YouTube embeds
    const timer = setTimeout(() => {
      sessionStorage.setItem(trackKey, "1");
      fetch("/api/track-play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      }).catch(() => {});
    }, 5000); // Wait 5 seconds — confirms they actually stayed on page

    return () => clearTimeout(timer);
  }, [slug]);

  return null; // No UI — invisible tracker
}
