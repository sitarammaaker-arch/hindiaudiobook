// ── Client-safe utilities ─────────────────────────────────────────────────
// Yeh file browser aur server dono par kaam karta hai — NO fs/Node.js imports

export function makeSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function makeAuthorSlug(name: string): string {
  return makeSlug(name);
}

export function extractVideoId(input: string): string {
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v") || input;
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
  } catch {}
  return input.trim();
}
