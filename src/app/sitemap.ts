import { MetadataRoute } from "next";
import { audiobooks, categories } from "@/data/audiobooks";
import { chapterBooks } from "@/data/chapters";
import { authors } from "@/data/authors";
import { curatedLists } from "@/data/curated-lists";

const BASE = "https://www.hindiaudiobook.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static core pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/search`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/chapters`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/free-hindi-audiobooks`,lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/authors`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/best`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    // Trust pages — important for Google E-E-A-T
    { url: `${BASE}/about`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    // Legal pages — required for AdSense
    { url: `${BASE}/privacy-policy`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms-conditions`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/disclaimer`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/dmca`,                 lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Author pages — high priority (targets "X books hindi" queries)
  const authorPages: MetadataRoute.Sitemap = authors.map((a) => ({
    url: `${BASE}/author/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Curated Best-Of pages — high priority (targets "best X books hindi" queries)
  const bestPages: MetadataRoute.Sitemap = curatedLists.map((l) => ({
    url: `${BASE}/best/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Category pages — high priority (keyword-rich landing pages)
  // Ordered by GSC impressions: trading-psychology > wealth-finance > story > power-strategy > self-help > spiritual > kids
  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: c.slug === "trading-psychology" || c.slug === "wealth-finance" ? 0.95 : 0.9,
  }));

  // Individual audiobook pages
  // Priority based on traffic data: high-traffic books get 0.9, others 0.7
  const highTrafficSlugs = new Set([
    "rich-dad-poor-dad-hindi",
    "the-alchemist-hindi",
    "atomic-habits-hindi",
    "bhagavad-gita-saar-hindi",
    "think-and-grow-rich-hindi",
    "sapiens-hindi",
    "psychology-of-money-hindi",
    "ikigai-hindi",
    "ramcharitmanas-hindi",
    "zero-to-one-hindi",
  ]);

  const audiobookPages: MetadataRoute.Sitemap = audiobooks.map((a) => ({
    url: `${BASE}/audiobook/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: highTrafficSlugs.has(a.slug) ? 0.9 : 0.7,
  }));

  // Chapter book pages
  const chapterBookPages: MetadataRoute.Sitemap = chapterBooks.map((b) => ({
    url: `${BASE}/audiobook/${b.slug}/chapters`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Individual chapter pages
  const chapterPages: MetadataRoute.Sitemap = chapterBooks.flatMap((b) =>
    b.chapters.map((ch) => ({
      url: `${BASE}/audiobook/${b.slug}/chapter/${ch.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticPages,
    ...categoryPages,
    ...authorPages,
    ...bestPages,
    ...audiobookPages,
    ...chapterBookPages,
    ...chapterPages,
  ];
}
