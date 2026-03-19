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

export const audiobooks: Audiobook[] = [
  // ── NOTE: "The Disciplined Trader" + "Trading in the Zone" removed from static
  // These are uploaded via Admin → stored in KV permanently ──

  // ── TRADING PSYCHOLOGY ────────────────────────────────────────────────────
  {
    id: 2,
    title: "Market Wizards Hindi Audiobook",
    slug: "market-wizards-hindi",
    videoId: "V1j82UVfAlM",
    thumbnail: "https://img.youtube.com/vi/V1j82UVfAlM/hqdefault.jpg",
    duration: "5h 20m",
    category: "trading-psychology",
    author: "Jack D. Schwager",
    plays: 138000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `Market Wizards — Jack Schwager ne duniya ke sabse successful traders ke interviews compile kiye hain is book mein. Paul Tudor Jones, Bruce Kovner, Michael Marcus — yeh log consistently crores kamate hain. Unka secret kya hai?

Is Hindi audiobook mein aap 17 legendary traders ki actual trading philosophy sunenge. Har trader ka approach alag hai — kuch technical analysis use karte hain, kuch fundamental, kuch pure intuition par. Lekin ek cheez common hai: risk management.

Yeh book aapko woh insider knowledge degi jo normal trading courses mein nahi milti. Ek baar sunoge toh baar baar sunna chahoge.`,
  },
  {
    id: 4,
    title: "Think and Trade Like a Champion Hindi",
    slug: "think-and-trade-like-a-champion-hindi",
    videoId: "YT5g5FEMPfo",
    thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
    duration: "2h 30m",
    category: "trading-psychology",
    author: "Mark Minervini",
    plays: 67000,
    trending: false,
    latest: true,
    audioUrl: "",
    description: `Think and Trade Like a Champion — Mark Minervini US Investing Championship jeet chuke hain multiple times. Is book mein woh apni proven SEPA methodology share karte hain.

Yeh sirf theory nahi — Minervini actual trades ke examples dete hain, specific setups batate hain, aur bataate hain kaise 100%+ returns achieve kiye. Hindi mein yeh audiobook sunna ek real trading education hai.`,
  },

  // ── WEALTH & FINANCE ──────────────────────────────────────────────────────
  {
    id: 5,
    title: "Rich Dad Poor Dad Hindi Audiobook",
    slug: "rich-dad-poor-dad-hindi",
    videoId: "oNDLlbLCMkI",
    thumbnail: "https://img.youtube.com/vi/oNDLlbLCMkI/hqdefault.jpg",
    duration: "2h 30m",
    category: "wealth-finance",
    author: "Robert Kiyosaki",
    plays: 167000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `Rich Dad Poor Dad — Robert Kiyosaki ki yeh legendary book financial education ki duniya mein revolution laayi. Assets aur liabilities ka farq — yahi is book ka core message hai.

School mein paise ki padhaai kyun nahi hoti, "Rat Race" kya hai, aur passive income kaise banayein — sab kuch is audiobook mein clearly explain kiya gaya hai.`,
  },
  {
    id: 6,
    title: "Secrets of the Millionaire Mind Hindi Audiobook",
    slug: "secrets-of-millionaire-mind-hindi",
    videoId: "vS5sC6dK5Vs",
    thumbnail: "https://img.youtube.com/vi/vS5sC6dK5Vs/hqdefault.jpg",
    duration: "2h 45m",
    category: "wealth-finance",
    author: "T. Harv Eker",
    plays: 43000,
    trending: true,
    latest: true,
    audioUrl: "",
    description: `Secrets of the Millionaire Mind — T. Harv Eker ka yeh groundbreaking book bataata hai ki ameer log aur gareeb log differently kyun sochte hain. Aapka "financial blueprint" kya hai — aur ise kaise reprogram karein?`,
  },
  {
    id: 7,
    title: "Zero to One Hindi Audiobook",
    slug: "zero-to-one-hindi",
    videoId: "rFZmbDSFXOA",
    thumbnail: "https://img.youtube.com/vi/rFZmbDSFXOA/hqdefault.jpg",
    duration: "3h 5m",
    category: "wealth-finance",
    author: "Peter Thiel",
    plays: 58000,
    trending: false,
    latest: false,
    audioUrl: "",
    description: `Zero to One — PayPal co-founder Peter Thiel ki yeh book startup aur innovation ke baare mein ek completely different perspective deti hai. "0 se 1" tak jaana matlab kuch truly new create karna hai.`,
  },
  {
    id: 8,
    title: "The Psychology of Money Hindi Audiobook",
    slug: "psychology-of-money-hindi",
    videoId: "vS5sC6dK5Vs",
    thumbnail: "https://img.youtube.com/vi/vS5sC6dK5Vs/hqdefault.jpg",
    duration: "2h 15m",
    category: "wealth-finance",
    author: "Morgan Housel",
    plays: 92000,
    trending: true,
    latest: true,
    audioUrl: "",
    description: `The Psychology of Money — Morgan Housel ki yeh kitaab finance aur behavior science ka unique combination hai. Paisa kamaana ek skill hai, lekin paisa sambhalna ek alag hi skill hai.`,
  },

  // ── POWER & STRATEGY ──────────────────────────────────────────────────────
  {
    id: 9,
    title: "48 Laws of Power Hindi Audiobook",
    slug: "48-laws-of-power-hindi",
    videoId: "OEyUoaVGrqY",
    thumbnail: "https://img.youtube.com/vi/OEyUoaVGrqY/hqdefault.jpg",
    duration: "6h 40m",
    category: "power-strategy",
    author: "Robert Greene",
    plays: 143000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `48 Laws of Power — Robert Greene ne history ke sabse powerful logon ka adhyayan karke yeh book likhi. Power kaise operate karti hai — covertly aur openly. Har law ek specific power dynamic explain karti hai.`,
  },
  {
    id: 10,
    title: "Chanakya Neeti Hindi Audiobook",
    slug: "chanakya-neeti-hindi",
    videoId: "XqZsoesa55w",
    thumbnail: "https://img.youtube.com/vi/XqZsoesa55w/hqdefault.jpg",
    duration: "1h 30m",
    category: "power-strategy",
    author: "Acharya Chanakya",
    plays: 76000,
    trending: false,
    latest: false,
    audioUrl: "",
    description: `Chanakya Neeti — Acharya Chanakya ki yeh timeless wisdom 2300 saal purani hai lekin aaj bhi utni hi relevant hai. Politics, business, relationships — har field mein Chanakya ki neeti kaam aati hai.`,
  },

  // ── STORY & NOVEL ────────────────────────────────────────────────────────
  {
    id: 11,
    title: "The Alchemist Hindi Audiobook",
    slug: "the-alchemist-hindi",
    videoId: "inpok4MKVLM",
    thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/hqdefault.jpg",
    duration: "3h 30m",
    category: "story",
    author: "Paulo Coelho",
    plays: 112000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `The Alchemist — Paulo Coelho ki yeh masterpiece 150+ million copies bik chuki hai. Santiago ki kahani — ek Andalusian shepherd ka sapna, safar, aur apna "Personal Legend" dhundhna.`,
  },
  {
    id: 12,
    title: "Sapiens Hindi Audiobook",
    slug: "sapiens-hindi",
    videoId: "qwERGcX-D0Q",
    thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
    duration: "7h 15m",
    category: "story",
    author: "Yuval Noah Harari",
    plays: 89000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `Sapiens — Yuval Noah Harari ne manav itihas ki poori kahani ek naye angle se sunaayi hai. 70,000 saal pehle se aaj tak — homo sapiens duniya ke sabse dominant species kaise bane?`,
  },
  {
    id: 13,
    title: "Diary of a Young Girl Hindi Audiobook",
    slug: "diary-of-a-young-girl-hindi",
    videoId: "WfKH6LQjFNI",
    thumbnail: "https://img.youtube.com/vi/WfKH6LQjFNI/hqdefault.jpg",
    duration: "5h 45m",
    category: "story",
    author: "Anne Frank",
    plays: 34000,
    trending: false,
    latest: false,
    audioUrl: "",
    description: `Diary of a Young Girl — Anne Frank ki yeh diary World War II ke dौरान Nazi occupation mein chhupe ek Jewish family ki kahani hai. 13 saal ki ladki ki raw, honest writing jo dil ko chhu jaati hai.`,
  },

  // ── SELF HELP ────────────────────────────────────────────────────────────
  {
    id: 14,
    title: "Atomic Habits Hindi Audiobook",
    slug: "atomic-habits-hindi",
    videoId: "YT5g5FEMPfo",
    thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
    duration: "2h 50m",
    category: "self-help",
    author: "James Clear",
    plays: 143000,
    trending: true,
    latest: true,
    audioUrl: "",
    description: `Atomic Habits — James Clear ki yeh bestselling book sikhati hai ki chhoti chhoti aadate kaise aapki poori zindagi badal sakti hain. 1% behtar hona — yeh chhota sa number samay ke saath dramatic results deta hai.`,
  },
  {
    id: 15,
    title: "Ikigai Hindi Audiobook",
    slug: "ikigai-hindi",
    videoId: "D9oQKzSNNB0",
    thumbnail: "https://img.youtube.com/vi/D9oQKzSNNB0/hqdefault.jpg",
    duration: "1h 45m",
    category: "self-help",
    author: "Hector Garcia",
    plays: 87500,
    trending: true,
    latest: true,
    audioUrl: "",
    description: `Ikigai — yeh Japanese concept "jeene ka karan" hai. Chaar circles ka milan: aap jo love karte hain, achha karte hain, duniya ko zaroorat hai, aur jiske liye pay milta hai. Wahin Ikigai hai.`,
  },
  {
    id: 16,
    title: "Think and Grow Rich Hindi Audiobook",
    slug: "think-and-grow-rich-hindi",
    videoId: "oNDLlbLCMkI",
    thumbnail: "https://img.youtube.com/vi/oNDLlbLCMkI/hqdefault.jpg",
    duration: "4h 0m",
    category: "self-help",
    author: "Napoleon Hill",
    plays: 134000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `Think and Grow Rich — 1937 mein likhi gayi yeh legendary book aaj bhi world's bestselling self-help books mein hai. 500 successful logon ka 20 saal adhyayan — success ke 13 principles.`,
  },

  // ── SPIRITUAL ────────────────────────────────────────────────────────────
  {
    id: 17,
    title: "Bhagavad Gita Saar Hindi Audiobook",
    slug: "bhagavad-gita-saar-hindi",
    videoId: "qwERGcX-D0Q",
    thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
    duration: "3h 40m",
    category: "spiritual",
    author: "Ved Vyasa",
    plays: 189000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `Bhagavad Gita — Shri Krishna aur Arjun ke beech Kurukshetra ke maidan mein hua yeh conversation "Song of God" hai. Karma Yoga, Bhakti Yoga, Gyan Yoga — teen raaste moksha ke.`,
  },
  {
    id: 18,
    title: "Ramcharitmanas Sampurn Hindi Audiobook",
    slug: "ramcharitmanas-hindi",
    videoId: "vMXjMHzmKFI",
    thumbnail: "https://img.youtube.com/vi/vMXjMHzmKFI/hqdefault.jpg",
    duration: "8h 20m",
    category: "spiritual",
    author: "Tulsidas",
    plays: 210000,
    trending: false,
    latest: false,
    audioUrl: "",
    description: `Ramcharitmanas — Goswami Tulsidas ji ka yeh mahakavya Hindu dharma ka anmol ratna hai. Maryada Purushottam Shri Ram ka poora jeevan — saat kaand, dohe aur chaupaiyan.`,
  },
  {
    id: 19,
    title: "Mann Ki Shanti — Meditation Guide Hindi",
    slug: "mann-ki-shanti-meditation",
    videoId: "inpok4MKVLM",
    thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/hqdefault.jpg",
    duration: "1h 20m",
    category: "spiritual",
    author: "Swami Vivekananda",
    plays: 79000,
    trending: false,
    latest: true,
    audioUrl: "",
    description: `Mann Ki Shanti — Swami Vivekananda ji ke teachings par based yeh guided meditation hai. Stress, anxiety door karne ka ek aasaan rasta — simple Hindi mein.`,
  },

  // ── KIDS ─────────────────────────────────────────────────────────────────
  {
    id: 20,
    title: "Panchatantra Ki Kahaniyaan Kids Audiobook",
    slug: "panchatantra-kahaniyaan-kids",
    videoId: "XqZsoesa55w",
    thumbnail: "https://img.youtube.com/vi/XqZsoesa55w/hqdefault.jpg",
    duration: "1h 10m",
    category: "kids",
    author: "Vishnu Sharma",
    plays: 54000,
    trending: false,
    latest: true,
    audioUrl: "",
    description: `Panchatantra Ki Kahaniyaan — bachon ke liye sabse pyaari Hindi audiobook. Animals ke zariye bade-bade jeevan ke paath — dosti, mehnat, aur aqalmandi ki stories.`,
  },
  {
    id: 21,
    title: "Bal Hanuman Ki Kahaniyaan",
    slug: "bal-hanuman-kahaniyaan",
    videoId: "WfKH6LQjFNI",
    thumbnail: "https://img.youtube.com/vi/WfKH6LQjFNI/hqdefault.jpg",
    duration: "55m",
    category: "kids",
    author: "Valmiki",
    plays: 67000,
    trending: false,
    latest: true,
    audioUrl: "",
    description: `Bal Hanuman Ki Kahaniyaan — Hanuman ji ke bachpan aur amazing adventures. Devotion, strength, aur loyalty ka sandesh — bacche aur bade dono enjoy karte hain.`,
  },
];

// ── CATEGORIES ────────────────────────────────────────────────────────────────
export const categories = [
  {
    slug: "trading-psychology",
    label: "Trading Psychology",
    emoji: "📈",
    color: "from-blue-600 to-cyan-600",
    bgFrom: "#2563eb",
    bgTo: "#0891b2",
    description: "Market Wizards, Disciplined Trader, Trading in the Zone — stock market psychology books",
    seoTitle: "Trading Psychology Hindi Audiobooks — Market Wizards, Disciplined Trader",
    seoDesc: "Trading psychology books in Hindi — The Disciplined Trader, Market Wizards, Trading in the Zone. Stock market mindset books free mein sunein.",
  },
  {
    slug: "wealth-finance",
    label: "Wealth & Finance",
    emoji: "💰",
    color: "from-emerald-500 to-green-600",
    bgFrom: "#10b981",
    bgTo: "#16a34a",
    description: "Rich Dad Poor Dad, Millionaire Mind, Think & Grow Rich — wealth building books",
    seoTitle: "Wealth & Finance Hindi Audiobooks — Rich Dad Poor Dad, Millionaire Mind",
    seoDesc: "Personal finance aur wealth building books Hindi mein — Rich Dad Poor Dad, Secrets of Millionaire Mind, Psychology of Money. Free mein sunein.",
  },
  {
    slug: "power-strategy",
    label: "Power & Strategy",
    emoji: "👑",
    color: "from-amber-500 to-orange-600",
    bgFrom: "#f59e0b",
    bgTo: "#ea580c",
    description: "48 Laws of Power, Chanakya Neeti — power, influence and strategy books",
    seoTitle: "Power & Strategy Hindi Audiobooks — 48 Laws of Power, Chanakya Neeti",
    seoDesc: "Power aur strategy books Hindi mein — 48 Laws of Power, Chanakya Neeti. Leadership aur influence ke liye essential books free sunein.",
  },
  {
    slug: "story",
    label: "Story & Novel",
    emoji: "📖",
    color: "from-purple-500 to-violet-600",
    bgFrom: "#a855f7",
    bgTo: "#7c3aed",
    description: "The Alchemist, Sapiens, Diary of a Young Girl — bestselling stories in Hindi",
    seoTitle: "Story & Novel Hindi Audiobooks — Alchemist, Sapiens",
    seoDesc: "World ki best stories aur novels Hindi mein — The Alchemist, Sapiens, Diary of a Young Girl. Free mein sunein.",
  },
  {
    slug: "self-help",
    label: "Self Help",
    emoji: "🔥",
    color: "from-red-500 to-pink-600",
    bgFrom: "#ef4444",
    bgTo: "#db2777",
    description: "Atomic Habits, Ikigai, Think & Grow Rich — self improvement books",
    seoTitle: "Self Help Hindi Audiobooks — Atomic Habits, Ikigai, Think and Grow Rich",
    seoDesc: "Self improvement books Hindi mein — Atomic Habits, Ikigai, Think and Grow Rich. Apni zindagi behtar banane ke liye free audiobooks.",
  },
  {
    slug: "spiritual",
    label: "Spiritual",
    emoji: "🙏",
    color: "from-indigo-500 to-purple-600",
    bgFrom: "#6366f1",
    bgTo: "#9333ea",
    description: "Bhagavad Gita, Ramcharitmanas, Meditation — spiritual wisdom in Hindi",
    seoTitle: "Spiritual Hindi Audiobooks — Bhagavad Gita, Ramcharitmanas",
    seoDesc: "Spiritual aur religious books Hindi mein — Bhagavad Gita, Ramcharitmanas, Meditation Guide. Aatma ki shanti ke liye free audiobooks.",
  },
  {
    slug: "kids",
    label: "Kids Stories",
    emoji: "🧒",
    color: "from-pink-400 to-rose-500",
    bgFrom: "#f472b6",
    bgTo: "#f43f5e",
    description: "Panchatantra, Bal Hanuman — moral stories for children in Hindi",
    seoTitle: "Kids Hindi Audiobooks — Panchatantra, Bal Hanuman Kahaniyaan",
    seoDesc: "Bacchon ke liye Hindi audiobooks — Panchatantra Ki Kahaniyaan, Bal Hanuman. Moral values aur entertainment ek saath. Free sunein.",
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
