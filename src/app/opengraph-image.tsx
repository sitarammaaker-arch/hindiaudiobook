import { ImageResponse } from "next/og";

// Default share image for pages that don't set their own (audiobook and
// summary pages use the book thumbnail instead).
export const alt = "HindiAudiobook.com — Free Hindi Audiobooks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const bars = [80, 140, 220, 140, 80];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1A2E 0%, #2F2F52 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginBottom: 48 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 40, height: h, borderRadius: 20, background: i === 2 ? "#FF6B2B" : "rgba(255,107,43,0.6)" }} />
          ))}
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, display: "flex" }}>
          Hindi<span style={{ color: "#FF6B2B" }}>Audiobook</span>.com
        </div>
        <div style={{ fontSize: 40, marginTop: 20, color: "rgba(255,255,255,0.8)" }}>
          400+ Free Hindi Audiobooks — Online Sunein
        </div>
      </div>
    ),
    { ...size }
  );
}
