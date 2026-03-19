import { MetadataRoute } from "next";
import { getAllAudiobooks } from "@/lib/data";
import { categories } from "@/data/audiobooks";
import { authors } from "@/data/authors";
import { curatedLists } from "@/data/curated-lists";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE = "https://www.hindiaudiobook.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBooks = await getAllAudiobooks();

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${BASE}/free-hindi-audiobooks`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${BASE}/chapters`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/best`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE}/authors`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${BASE}/search`, priority: 0.6, changeFrequency: "weekly" as const },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE}/faq`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.4, changeFrequency: "monthly" as const },
    { url: `${BASE}/privacy-policy`, priority: 0.3, changeFrequency: "monthly" as const },
    { url: `${BASE}/terms-conditions`, priority: 0.3, changeFrequency: "monthly" as const },
    { url: `${BASE}/disclaimer`, priority: 0.3, changeFrequency: "monthly" as const },
    { url: `${BASE}/dmca`, priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const categoryPages = categories.map((c) => ({
    url: `${BASE}/category/${c.slug}`,
    priority: 0.8,
    changeFrequency: "daily" as const,
  }));

  const authorPages = authors.map((a) => ({
    url: `${BASE}/author/${a.slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const bestPages = curatedLists.map((l) => ({
    url: `${BASE}/best/${l.slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const bookPages = allBooks.map((b) => ({
    url: `${BASE}/audiobook/${b.slug}`,
    priority: 0.9,
    changeFrequency: "weekly" as const,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...authorPages,
    ...bestPages,
    ...bookPages,
  ];
}
