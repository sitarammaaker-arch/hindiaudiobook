// ── Hindi Book Summaries — original Hindi summary pages ──────────────────────
// Search Console shows lots of "<book> in Hindi" / "<book> Hindi PDF" searches.
// We never offer PDFs (copyright); these pages answer that intent with an
// original Hindi summary and send readers to the audiobook page.
// Content lives in ./summaries/<slug>.json — add a file and register it below.

import zeroToOne from "./summaries/zero-to-one-in-hindi.json";
import theOneThing from "./summaries/the-one-thing-in-hindi.json";
import psychologyOfMoney from "./summaries/the-psychology-of-money-in-hindi.json";
import cantHurtMe from "./summaries/cant-hurt-me-in-hindi.json";
import darvas from "./summaries/how-i-made-2-million-in-the-stock-market-in-hindi.json";

export type SummaryLesson = {
  heading: string;
  body: string[];
  takeaway: string;
};

export type BookSummary = {
  slug: string;
  audiobookSlug: string;
  title: string;
  hindiTitle: string;
  author: string;
  category: string;
  seoTitle: string;
  metaDescription: string;
  oneLine: string;
  intro: string[];
  lessons: SummaryLesson[];
  whoShouldRead: string[];
  aboutAuthor: string[];
  faq: { q: string; a: string }[];
  closing: string;
};

// Bump when summaries are edited — shown on the page and used as dateModified
export const SUMMARIES_UPDATED = "2026-10-22";

export const summaries: BookSummary[] = [
  psychologyOfMoney,
  zeroToOne,
  theOneThing,
  darvas,
  cantHurtMe,
];

export function getSummaryBySlug(slug: string): BookSummary | undefined {
  return summaries.find((s) => s.slug === slug);
}

export function getSummaryForAudiobook(audiobookSlug: string): BookSummary | undefined {
  return summaries.find((s) => s.audiobookSlug === audiobookSlug);
}

// Hindi reading speed is roughly 180 words a minute
export function readingMinutes(s: BookSummary): number {
  const text = [
    ...s.intro,
    ...s.lessons.flatMap((l) => [l.heading, ...l.body, l.takeaway]),
    ...s.whoShouldRead,
    ...s.aboutAuthor,
    ...s.faq.flatMap((f) => [f.q, f.a]),
    s.closing,
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 180));
}
