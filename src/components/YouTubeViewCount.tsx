"use client";
import { useState, useEffect } from "react";

function formatViews(n: number): string {
  if (n >= 10_000_000) return (n / 1_000_000).toFixed(1) + " Cr";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 100_000) return (n / 100_000).toFixed(1) + "L";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function YouTubeViewCount({ videoId }: { videoId: string }) {
  const [views, setViews] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/get-views")
      .then((r) => r.json())
      .then((d) => {
        const v = d.views?.[videoId];
        if (v) {
          setViews(v);
          setUpdatedAt(d.updatedAt);
        }
      })
      .catch(() => {});
  }, [videoId]);

  if (!views) return (
    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
      👁 — plays
    </span>
  );

  const lastUpdate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("hi-IN", { day: "numeric", month: "short" })
    : null;

  return (
    <span className="flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full"
      title={lastUpdate ? `Last updated: ${lastUpdate}` : ""}>
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
      {formatViews(views)} YouTube views
    </span>
  );
}
