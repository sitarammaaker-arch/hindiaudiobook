export type Audiobook = {
  id: number;
  title: string;
  slug: string;
  videoId: string;
  thumbnail: string;
  duration: string;
  category: string;
  author: string;
  description: string;
  trending?: boolean;
  latest?: boolean;
  plays: number;
  audioUrl: string;
};

// ── All static books removed — data ab sirf Admin upload (KV) se aata hai ──
export const audiobooks: Audiobook[] = [];

// ── CATEGORIES ────────────────────────────────────────────────────────────────
export const categories = [
  {
    slug: "trading-psychology",
    label: "Trading Psychology",
    emoji: "📈",
    color: "from-blue-900 to-blue-800",
    bgFrom: "#0F2A4A",
    bgTo: "#1A3A5C",
    description: "Market Wizards, Disciplined Trader, Trading in the Zone — stock market psychology books",
    seoTitle: "Trading Psychology Hindi Audiobooks — Market Wizards, Disciplined Trader",
    seoDesc: "Trading psychology books in Hindi — The Disciplined Trader, Market Wizards, Trading in the Zone. Stock market mindset books free mein sunein.",
  },
  {
    slug: "wealth-finance",
    label: "Wealth & Finance",
    emoji: "💰",
    color: "from-emerald-900 to-emerald-800",
    bgFrom: "#0A2A1A",
    bgTo: "#0F3A24",
    description: "Rich Dad Poor Dad, Millionaire Mind, Think & Grow Rich — wealth building books",
    seoTitle: "Wealth & Finance Hindi Audiobooks — Rich Dad Poor Dad, Millionaire Mind",
    seoDesc: "Personal finance aur wealth building books Hindi mein — Rich Dad Poor Dad, Secrets of Millionaire Mind, Psychology of Money. Free mein sunein.",
  },
  {
    slug: "power-strategy",
    label: "Power & Strategy",
    emoji: "👑",
    color: "from-amber-900 to-orange-900",
    bgFrom: "#2A1A0A",
    bgTo: "#3A2410",
    description: "48 Laws of Power, Chanakya Neeti — power, influence and strategy books",
    seoTitle: "Power & Strategy Hindi Audiobooks — 48 Laws of Power, Chanakya Neeti",
    seoDesc: "Power aur strategy books Hindi mein — 48 Laws of Power, Chanakya Neeti. Free sunein.",
  },
  {
    slug: "story",
    label: "Story & Novel",
    emoji: "📖",
    color: "from-purple-900 to-violet-900",
    bgFrom: "#1A0A2A",
    bgTo: "#240F3A",
    description: "The Alchemist, Sapiens — bestselling stories in Hindi",
    seoTitle: "Story & Novel Hindi Audiobooks — Alchemist, Sapiens",
    seoDesc: "World ki best stories aur novels Hindi mein — The Alchemist, Sapiens. Free mein sunein.",
  },
  {
    slug: "self-help",
    label: "Self Help",
    emoji: "🔥",
    color: "from-red-900 to-rose-900",
    bgFrom: "#2A0A0A",
    bgTo: "#3A0F10",
    description: "Atomic Habits, Ikigai, Think & Grow Rich — self improvement books",
    seoTitle: "Self Help Hindi Audiobooks — Atomic Habits, Ikigai, Think and Grow Rich",
    seoDesc: "Self improvement books Hindi mein — Atomic Habits, Ikigai, Think and Grow Rich. Free audiobooks.",
  },
  {
    slug: "spiritual",
    label: "Spiritual",
    emoji: "🙏",
    color: "from-indigo-900 to-purple-900",
    bgFrom: "#0F0A2A",
    bgTo: "#1A0F3A",
    description: "Bhagavad Gita, Ramcharitmanas, Meditation — spiritual wisdom in Hindi",
    seoTitle: "Spiritual Hindi Audiobooks — Bhagavad Gita, Ramcharitmanas",
    seoDesc: "Spiritual aur religious books Hindi mein — Bhagavad Gita, Ramcharitmanas. Free audiobooks.",
  },
  {
    slug: "kids",
    label: "Kids Stories",
    emoji: "🧒",
    color: "from-pink-900 to-rose-900",
    bgFrom: "#2A0A1A",
    bgTo: "#3A0F24",
    description: "Panchatantra, Bal Hanuman — moral stories for children in Hindi",
    seoTitle: "Kids Hindi Audiobooks — Panchatantra, Bal Hanuman Kahaniyaan",
    seoDesc: "Bacchon ke liye Hindi audiobooks — Panchatantra Ki Kahaniyaan, Bal Hanuman. Free sunein.",
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────
export function getAudiobookBySlug(slug: string): Audiobook | undefined {
  return audiobooks.find((a) => a.slug === slug);
}

export function getAudiobooksByCategory(category: string): Audiobook[] {
  return audiobooks.filter((a) => a.category === category);
}

export function getRelatedAudiobooks(slug: string, category: string): Audiobook[] {
  return audiobooks.filter((a) => a.category === category && a.slug !== slug).slice(0, 4);
}

export function searchAudiobooks(query: string): Audiobook[] {
  const q = query.toLowerCase();
  return audiobooks.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
  );
}
