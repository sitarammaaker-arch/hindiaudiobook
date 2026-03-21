import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "transparent",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          paddingBottom: 2,
        }}
      >
        <div style={{ width: 5, height: 8,  borderRadius: 3, background: "rgba(255,107,43,0.5)"  }} />
        <div style={{ width: 5, height: 14, borderRadius: 3, background: "rgba(255,107,43,0.72)" }} />
        <div style={{ width: 5, height: 22, borderRadius: 3, background: "#FF6B2B"               }} />
        <div style={{ width: 5, height: 14, borderRadius: 3, background: "rgba(255,107,43,0.72)" }} />
        <div style={{ width: 5, height: 8,  borderRadius: 3, background: "rgba(255,107,43,0.5)"  }} />
      </div>
    ),
    { ...size }
  );
}
