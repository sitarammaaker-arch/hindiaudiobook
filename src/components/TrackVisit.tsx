"use client";
import { useEffect } from "react";
import { trackVisit } from "./RecentlyListened";

interface Props {
  slug: string;
  title: string;
  author: string;
  thumbnail: string;
  category: string;
}

export default function TrackVisit({ slug, title, author, thumbnail, category }: Props) {
  useEffect(() => {
    trackVisit({ slug, title, author, thumbnail, category });
  }, [slug, title, author, thumbnail, category]);
  return null;
}
