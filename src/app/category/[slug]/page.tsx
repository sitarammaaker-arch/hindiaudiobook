import type { Metadata } from "next";
import { categories, getBooksByCategory, toCardBook } from "@/lib/data";
import CategoryClient from "./CategoryClient";

export const dynamic = "force-dynamic";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: category.seoTitle || `${category.label} Hindi Audiobooks — Free`,
    description: category.description,
    alternates: { canonical: `https://www.hindiaudiobook.com/category/${category.slug}` },
  };
}

// Server-rendered so the book list is in the HTML (AdSense/Google saw an empty page before)
export default async function CategoryPage({ params }: Props) {
  const books = await getBooksByCategory(params.slug);
  return <CategoryClient slug={params.slug} allBooks={books.map(toCardBook)} />;
}
