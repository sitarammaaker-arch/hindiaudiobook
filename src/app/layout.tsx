import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Replace XXXXXXXXXXXXXXXX with your actual AdSense Publisher ID ────────────
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX";

export const metadata: Metadata = {
  title: {
    default: "Free Hindi Audiobooks Online — Trading, Self Help, Spiritual | HindiAudiobook.com",
    template: "%s | HindiAudiobook.com",
  },
  description:
    "HindiAudiobook.com — India ka #1 free Hindi audiobook platform. 35+ Hindi audiobooks bilkul free — Trading Psychology, Rich Dad Poor Dad, Atomic Habits, Bhagavad Gita aur bahut kuch. Koi download nahi, koi signup nahi.",
  keywords: [
    // Top performing — exact match
    "hindi audiobook",
    "hindi audio books",
    "hindi audio book",
    "audiobook in hindi",
    "audio book in hindi",
    "hindi audiobooks",
    "audiobooks in hindi",
    "audiobook hindi",
    // Free/download intent
    "free hindi audiobook",
    "hindi audiobook free download mp3",
    "free hindi audio books",
    "hindi audio books free download",
    "free audio books in hindi",
    // Book-specific (highest traffic clusters)
    "the disciplined trader in hindi",
    "market wizards book in hindi",
    "48 laws of power in hindi audiobook",
    "secrets of the millionaire mind audiobook",
    "zero to one audiobook hindi",
    "trading in the zone audiobook in hindi",
    "the alchemist hindi audiobook",
    // Brand
    "hindiaudiobook.com",
    "hindiaudio",
  ],
  metadataBase: new URL("https://www.hindiaudiobook.com"),
  openGraph: {
    type: "website",
    locale: "hi_IN",
    siteName: "Hindi Audiobook",
    url: "https://www.hindiaudiobook.com",
    title: "Hindi Audiobook — Free Hindi Audiobooks Online Sunein",
    description: "India ka #1 free Hindi audiobook platform. Hazaron audiobooks — kabhi bhi, kahin bhi sunein.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hindiaudiobook",
    title: "Hindi Audiobook — Free Hindi Audiobooks Online",
    description: "Free Hindi audiobooks sunein — HindiAudiobook.com",
  },
  alternates: {
    canonical: "https://www.hindiaudiobook.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <head>
        {/* Google Fonts preconnect — performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: "#FFF8F5" }}>
        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
