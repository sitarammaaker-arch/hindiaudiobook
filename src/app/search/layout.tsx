import type { Metadata } from "next";

// Search result pages have no content of their own — keep them out of Google
export const metadata: Metadata = {
  title: "Search Hindi Audiobooks",
  alternates: { canonical: "https://www.hindiaudiobook.com/search" },
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
