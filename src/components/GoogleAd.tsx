"use client";
import { useEffect, useRef } from "react";

// ── Replace with your actual AdSense Publisher ID ────────────────────────────
// Format: ca-pub-XXXXXXXXXXXXXXXX
// Get it from: Google AdSense → Account → Account information
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX";

export type AdSlotType =
  | "banner"          // 728×90  — Header/Footer leaderboard
  | "rectangle"       // 300×250 — Sidebar, between content
  | "responsive"      // Auto    — Best for mobile (recommended by Google)
  | "in-article"      // Auto    — Inside article/description text
  | "in-feed";        // Auto    — Between content cards/grid

interface GoogleAdProps {
  slot: string;           // Your specific ad slot ID from AdSense
  type?: AdSlotType;
  className?: string;
  label?: boolean;        // Show "Advertisement" label (required by Google policy)
}

// Ad slot dimensions
const adStyles: Record<AdSlotType, { style: Record<string, string>; format?: string; fullWidth?: boolean }> = {
  banner:      { style: { display: "block", width: "728px", height: "90px" } },
  rectangle:   { style: { display: "block", width: "300px", height: "250px" } },
  responsive:  { style: { display: "block" }, format: "auto", fullWidth: true },
  "in-article":{ style: { display: "block", textAlign: "center" }, format: "fluid" },
  "in-feed":   { style: { display: "block" }, format: "fluid" },
};

export default function GoogleAd({
  slot,
  type = "responsive",
  className = "",
  label = true,
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Don't push ads in development (avoids AdSense errors during dev)
    if (process.env.NODE_ENV === "development") return;
    if (pushed.current) return;

    try {
      // Push ad after component mounts
      const w = window as typeof window & { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const config = adStyles[type];

  // In development — show placeholder so you can see ad placement
  if (process.env.NODE_ENV === "development") {
    const sizeLabel: Record<AdSlotType, string> = {
      banner: "728×90 Banner Ad",
      rectangle: "300×250 Rectangle Ad",
      responsive: "Responsive Ad",
      "in-article": "In-Article Ad",
      "in-feed": "In-Feed Ad",
    };
    return (
      <div className={`${className}`}>
        {label && (
          <p className="text-center text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">
            Advertisement
          </p>
        )}
        <div
          style={{ minHeight: type === "banner" ? "90px" : type === "rectangle" ? "250px" : "100px" }}
          className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 text-center"
        >
          <div className="text-gray-400 text-2xl mb-2">📢</div>
          <p className="text-gray-500 font-semibold text-sm">{sizeLabel[type]}</p>
          <p className="text-gray-400 text-xs mt-1">Slot: {slot}</p>
          <p className="text-gray-400 text-xs">Client: {ADSENSE_CLIENT}</p>
          <p className="text-[#FF6B2B] text-xs mt-2 font-medium">
            Production mein real ad dikhega
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden`}>
      {label && (
        <p className="text-center text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">
          Advertisement
        </p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={config.style as React.CSSProperties}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        {...(config.format ? { "data-ad-format": config.format } : {})}
        {...(config.fullWidth ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}
