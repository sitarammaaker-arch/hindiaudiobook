import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ArchiveFile = {
  name: string;
  format: string;
  size?: string;
  length?: string; // duration in seconds (string)
  title?: string;
  track?: string;
  url: string;
  durationFormatted: string;
  isAudio: boolean;
};

export type ArchiveMeta = {
  identifier: string;
  title: string;
  creator: string;       // author
  description: string;
  subject: string;
  mediatype: string;
  files: ArchiveFile[];
  audioFiles: ArchiveFile[];
  thumbnail: string;
  archiveUrl: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format seconds → "1h 23m" or "45m" */
function formatDuration(seconds: string | undefined): string {
  if (!seconds) return "";
  const s = parseFloat(seconds);
  if (isNaN(s) || s <= 0) return "";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

/** Extract Archive.org identifier from any URL format */
function extractIdentifier(input: string): string | null {
  input = input.trim();

  // Direct identifier (no slashes, no http)
  if (!input.includes("/") && !input.includes("http")) return input;

  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);

    // https://archive.org/details/IDENTIFIER
    // https://archive.org/details/IDENTIFIER/
    // https://archive.org/download/IDENTIFIER/file.mp3
    const match = url.pathname.match(/\/(details|download|stream|embed)\/([^/]+)/);
    if (match) return match[2];
  } catch {}

  // Fallback: last non-empty segment
  const parts = input.split("/").filter(Boolean);
  const idx = parts.findIndex((p) => p === "details" || p === "download" || p === "stream");
  if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];

  return null;
}

/** Clean up HTML tags from description */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1000);
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url?.trim()) {
      return NextResponse.json({ success: false, error: "Archive.org URL ya Identifier dein" }, { status: 400 });
    }

    const identifier = extractIdentifier(url);
    if (!identifier) {
      return NextResponse.json({ success: false, error: "Valid Archive.org URL nahi hai. Example: https://archive.org/details/IDENTIFIER" }, { status: 400 });
    }

    // ── Fetch metadata from Archive.org JSON API ──────────────────────────────
    const metaUrl = `https://archive.org/metadata/${identifier}`;
    const metaRes = await fetch(metaUrl, {
      headers: { "User-Agent": "HindiAudiobook/1.0 (https://www.hindiaudiobook.com)" },
      next: { revalidate: 0 },
    });

    if (!metaRes.ok) {
      return NextResponse.json(
        { success: false, error: `Archive.org se data nahi mila (${metaRes.status}). Identifier check karein: "${identifier}"` },
        { status: 404 }
      );
    }

    const raw = await metaRes.json();

    if (!raw?.metadata) {
      return NextResponse.json({ success: false, error: "Archive.org metadata nahi mila. Sahi URL hai?" }, { status: 404 });
    }

    const meta = raw.metadata;
    const filesRaw: Record<string, unknown>[] = raw.files || [];

    // ── Parse files ───────────────────────────────────────────────────────────
    const AUDIO_FORMATS = ["VBR MP3", "MP3", "64Kbps MP3", "128Kbps MP3", "192Kbps MP3", "Ogg Vorbis", "Ogg", "FLAC", "WAV", "M4A", "AAC"];
    const SKIP_PREFIXES = ["__", "itemimage", "thumbnail"];

    const allFiles: ArchiveFile[] = filesRaw
      .filter((f) => {
        const name = String(f.name || "");
        // Skip metadata/thumbnail files
        if (SKIP_PREFIXES.some((p) => name.toLowerCase().startsWith(p))) return false;
        return true;
      })
      .map((f) => {
        const name = String(f.name || "");
        const format = String(f.format || "");
        const isAudio = AUDIO_FORMATS.some((af) => format.toUpperCase().includes(af.toUpperCase())) ||
          /\.(mp3|ogg|flac|wav|m4a|aac|opus)$/i.test(name);

        return {
          name,
          format,
          size: f.size ? String(f.size) : undefined,
          length: f.length ? String(f.length) : undefined,
          title: f.title ? String(f.title) : undefined,
          track: f.track ? String(f.track) : undefined,
          url: `https://archive.org/download/${identifier}/${encodeURIComponent(name)}`,
          durationFormatted: formatDuration(f.length ? String(f.length) : undefined),
          isAudio,
        };
      });

    // ── Prefer original/best quality audio files ──────────────────────────────
    let audioFiles = allFiles.filter((f) => f.isAudio);

    // Remove duplicates: if both MP3 and VBR MP3 exist for same base name, keep one
    const seen = new Set<string>();
    audioFiles = audioFiles.filter((f) => {
      const base = f.name.replace(/\.(mp3|ogg|flac|wav|m4a|aac|opus)$/i, "").toLowerCase();
      if (seen.has(base)) return false;
      seen.add(base);
      return true;
    });

    // Sort by track number, then by filename
    audioFiles.sort((a, b) => {
      const ta = parseInt(a.track || "999");
      const tb = parseInt(b.track || "999");
      if (ta !== tb) return ta - tb;
      return a.name.localeCompare(b.name);
    });

    // ── Thumbnail ─────────────────────────────────────────────────────────────
    const thumbFile = allFiles.find((f) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name) &&
      (f.name.toLowerCase().includes("cover") || f.name.toLowerCase().includes("thumb") || f.name.toLowerCase().includes("image"))
    );
    const thumbnail = thumbFile
      ? `https://archive.org/download/${identifier}/${encodeURIComponent(thumbFile.name)}`
      : `https://archive.org/services/img/${identifier}`;

    // ── Build response ────────────────────────────────────────────────────────
    const result: ArchiveMeta = {
      identifier,
      title: String(meta.title || identifier),
      creator: Array.isArray(meta.creator) ? meta.creator[0] : String(meta.creator || "Unknown"),
      description: meta.description ? stripHtml(Array.isArray(meta.description) ? meta.description[0] : String(meta.description)) : "",
      subject: Array.isArray(meta.subject) ? meta.subject.join(", ") : String(meta.subject || ""),
      mediatype: String(meta.mediatype || ""),
      files: allFiles,
      audioFiles,
      thumbnail,
      archiveUrl: `https://archive.org/details/${identifier}`,
    };

    return NextResponse.json({
      success: true,
      data: result,
      message: `✅ ${audioFiles.length} audio files mile "${result.title}" mein`,
    });
  } catch (err) {
    console.error("Archive fetch error:", err);
    return NextResponse.json(
      { success: false, error: "Network error — internet connection check karein ya dobara try karein" },
      { status: 500 }
    );
  }
}
