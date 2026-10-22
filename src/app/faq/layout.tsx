import type { Metadata } from "next";

// page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: "FAQ — Hindi Audiobooks ke Sawal Jawab",
  description: "HindiAudiobook.com ke baare mein aksar puche jaane wale sawal — free audiobooks kaise sunein, lock screen, download aur bahut kuch.",
  alternates: { canonical: "https://www.hindiaudiobook.com/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
