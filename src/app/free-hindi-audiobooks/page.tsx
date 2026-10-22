import type { Metadata } from "next";
import { getAllAudiobooks, toCardBook } from "@/lib/data";
import FreeAudiobooksClient from "./FreeAudiobooksClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Free Hindi Audiobooks — Online Sunein",
  description: "Saari free Hindi audiobooks ek jagah — self help, trading psychology, spiritual aur kahaniyan. Koi download nahi, seedha browser mein sunein.",
  alternates: { canonical: "https://www.hindiaudiobook.com/free-hindi-audiobooks" },
};

// Server-rendered so the book list is in the HTML (AdSense/Google saw "0 audiobooks" before)
export default async function FreeHindiAudiobooksPage() {
  const books = await getAllAudiobooks();
  return <FreeAudiobooksClient allBooks={books.map(toCardBook)} />;
}
