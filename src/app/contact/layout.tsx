import type { Metadata } from "next";

// page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: "Contact Us",
  description: "HindiAudiobook.com se sampark karein — book request, bug report ya koi bhi sawal.",
  alternates: { canonical: "https://www.hindiaudiobook.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
