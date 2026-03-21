import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#1A1A2E",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 10,
          paddingBottom: 24,
        }}
      >
        <div style={{ width: 24, height: 44,  borderRadius: 12, background: "rgba(255,107,43,0.5)"  }} />
        <div style={{ width: 24, height: 80,  borderRadius: 12, background: "rgba(255,107,43,0.72)" }} />
        <div style={{ width: 24, height: 118, borderRadius: 12, background: "#FF6B2B"               }} />
        <div style={{ width: 24, height: 80,  borderRadius: 12, background: "rgba(255,107,43,0.72)" }} />
        <div style={{ width: 24, height: 44,  borderRadius: 12, background: "rgba(255,107,43,0.5)"  }} />
      </div>
    ),
    { ...size }
  );
}
