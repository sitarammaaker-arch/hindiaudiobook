// ─────────────────────────────────────────────
// Chapter Types
// ─────────────────────────────────────────────
export type Chapter = {
  id: number;
  chapterNumber: number;       // 1, 2, 3 ...
  title: string;               // "Chapter 1: Pehli Mulakat"
  slug: string;                // "chapter-1-pehli-mulakat"
  duration: string;            // "32m"
  description: string;        // Short chapter summary
  audioUrl: string;           // Direct MP3 URL (lock screen play)
  videoId: string;            // YouTube video ID (fallback)
  thumbnail: string;          // Chapter thumbnail (or same as book)
  isFree: boolean;            // Free preview chapter or paid
};

export type ChapterBook = {
  id: number;
  title: string;
  slug: string;                // Route: /audiobook/[slug]
  thumbnail: string;
  category: string;
  author: string;
  totalChapters: number;
  totalDuration: string;       // Total book duration
  description: string;
  trending?: boolean;
  latest?: boolean;
  plays: number;
  hasChapters: true;           // Flag to distinguish from single audiobooks
  chapters: Chapter[];
};

// ─────────────────────────────────────────────
// Helper: make chapter slug
// ─────────────────────────────────────────────
function chSlug(n: number, title: string) {
  return `chapter-${n}-${title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")}`;
}

// ─────────────────────────────────────────────
// Sample Chapter Books (3 books with full chapters)
// Replace audioUrl with your real MP3 URLs
// Replace videoId with real YouTube IDs
// ─────────────────────────────────────────────
export const chapterBooks: ChapterBook[] = [
  // ──────────────────────────────────────────
  // BOOK 1: Rich Dad Poor Dad
  // ──────────────────────────────────────────
  {
    id: 101,
    title: "Rich Dad Poor Dad — Chapter Wise",
    slug: "rich-dad-poor-dad-chapters",
    thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
    category: "wealth-finance",
    author: "Robert Kiyosaki",
    totalChapters: 9,
    totalDuration: "4h 30m",
    trending: true,
    latest: true,
    plays: 95000,
    hasChapters: true,
    description: `Rich Dad Poor Dad ka yeh chapter-wise collection aapko ek ek karke financial wisdom deta hai. Har chapter ek naya sabak lekar aata hai — assets vs liabilities, rat race, aur financial freedom ka rasta.

Robert Kiyosaki ne apne do "pitaon" ke through yeh sikhaya ki paise ke baare mein sochne ka tarika hi sab kuch badal deta hai. Yeh audiobook aapki financial soch ko fundamentally transform kar sakti hai.`,
    chapters: [
      {
        id: 1001,
        chapterNumber: 1,
        title: "Rich Dad, Poor Dad — Introduction",
        slug: chSlug(1, "Introduction"),
        duration: "28m",
        description: "Kiyosaki apne do pitaon se milwaate hain — ek padhe-likhe lekin gareeb, doosre kam padhe lekin ameer. Do alag soch, do alag zindagiyaan.",
        audioUrl: "", // Add your MP3 URL here
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: true,
      },
      {
        id: 1002,
        chapterNumber: 2,
        title: "Chapter 1 — Rich Log Paise Ke Liye Kaam Nahi Karte",
        slug: chSlug(2, "Rich Log Paise Ke Liye Kaam Nahi Karte"),
        duration: "35m",
        description: "Ameer log apne liye paise kaam karwate hain. Fear aur greed — yeh do emotions zyaadatar logon ko poori zindagi naukri mein fansaye rakhte hain.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: true,
      },
      {
        id: 1003,
        chapterNumber: 3,
        title: "Chapter 2 — Financial Literacy Kyun Zaroori Hai",
        slug: chSlug(3, "Financial Literacy Kyun Zaroori Hai"),
        duration: "32m",
        description: "Assets aur liabilities ka farq samajhna — yahi sabse important financial lesson hai. School mein yeh kyun nahi padhaya jaata?",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 1004,
        chapterNumber: 4,
        title: "Chapter 3 — Apna Business Banao",
        slug: chSlug(4, "Apna Business Banao"),
        duration: "29m",
        description: "Naukri aur business mein farq. Kiyosaki kehte hain — apna profession alag ho sakta hai lekin apna business zaroor banao.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 1005,
        chapterNumber: 5,
        title: "Chapter 4 — Taxes Ka Itihaas aur Corporations",
        slug: chSlug(5, "Taxes Ka Itihaas aur Corporations"),
        duration: "33m",
        description: "Ameer log tax kyun kam dete hain? Corporation ka use karke legal tarike se tax bachana — yeh sirf ameer logon ka secret tha, ab tumhara bhi.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 1006,
        chapterNumber: 6,
        title: "Chapter 5 — Ameer Log Paise Ka Aavishkaar Karte Hain",
        slug: chSlug(6, "Ameer Log Paise Ka Aavishkaar Karte Hain"),
        duration: "36m",
        description: "Real estate aur investment ke opportunities kaise dhundhe jaate hain. Jo doosron ko nahi dikhta, ameer log woh dekhte hain.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 1007,
        chapterNumber: 7,
        title: "Chapter 6 — Seekhne Ke Liye Kaam Karo",
        slug: chSlug(7, "Seekhne Ke Liye Kaam Karo"),
        duration: "27m",
        description: "Paise ke liye kaam karna vs skills seekhne ke liye kaam karna — dono mein zameen aasman ka farq hai.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 1008,
        chapterNumber: 8,
        title: "Chapter 7 — Obstacles Aur Unhe Kaise Overcome Karein",
        slug: chSlug(8, "Obstacles Aur Unhe Kaise Overcome Karein"),
        duration: "31m",
        description: "Fear, cynicism, laziness, bad habits, arrogance — yeh paanch obstacles hain jo logon ko financial freedom se door rakhte hain.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 1009,
        chapterNumber: 9,
        title: "Chapter 8 — Shuruat Kaise Karein (Conclusion)",
        slug: chSlug(9, "Shuruat Kaise Karein"),
        duration: "39m",
        description: "10 actionable steps jo aaj se shuru kar sakte hain. Kiyosaki ka final message — action lena sabse zaroori hai.",
        audioUrl: "",
        videoId: "Ks-_Mh1QhMc",
        thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
        isFree: true,
      },
    ],
  },

  // ──────────────────────────────────────────
  // BOOK 2: Atomic Habits
  // ──────────────────────────────────────────
  {
    id: 102,
    title: "Atomic Habits — Chapter Wise",
    slug: "atomic-habits-chapters",
    thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
    category: "self-help",
    author: "James Clear",
    totalChapters: 8,
    totalDuration: "3h 45m",
    trending: true,
    latest: false,
    plays: 112000,
    hasChapters: true,
    description: `Atomic Habits ka chapter-wise audiobook — har chapter mein ek powerful habit-building concept. James Clear ne science aur practicality ko milaakar ek aisaa system banaya hai jo sach mein kaam karta hai.

Chhoti chhoti aadate milkar badi zindagi banati hain. Yeh audiobook aapko step by step ek better version of yourself banana sikhayega.`,
    chapters: [
      {
        id: 2001,
        chapterNumber: 1,
        title: "Introduction — Chhoti Aadat Ka Bada Asar",
        slug: chSlug(1, "Chhoti Aadat Ka Bada Asar"),
        duration: "25m",
        description: "1% behtar hona — yeh chhota sa number samay ke saath kitna bada ban jaata hai. British Cycling team ka example aur aggregation of marginal gains.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: true,
      },
      {
        id: 2002,
        chapterNumber: 2,
        title: "Chapter 1 — Habits Ki Identity",
        slug: chSlug(2, "Habits Ki Identity"),
        duration: "30m",
        description: "Sirf outcomes ya processes par focus mat karo — apni identity badlo. 'Main ek writer hoon' vs 'Main likhna chahta hoon' — fark samjho.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: true,
      },
      {
        id: 2003,
        chapterNumber: 3,
        title: "Chapter 2 — Habit Loop: Cue, Craving, Response, Reward",
        slug: chSlug(3, "Habit Loop"),
        duration: "28m",
        description: "Har habit ek 4-step loop follow karti hai. Iss loop ko samajhna hi nai aadat banana ya buri aadat todne ki chabi hai.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 2004,
        chapterNumber: 4,
        title: "Chapter 3 — Pehla Niyam: Obvious Banao",
        slug: chSlug(4, "Obvious Banao"),
        duration: "29m",
        description: "Implementation intentions aur habit stacking. Nai aadat ke liye specific time aur place set karo — 'Main [BEHAVIOR] karunga [TIME] par [LOCATION] mein.'",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 2005,
        chapterNumber: 5,
        title: "Chapter 4 — Doosra Niyam: Attractive Banao",
        slug: chSlug(5, "Attractive Banao"),
        duration: "27m",
        description: "Temptation bundling: jo kaam karna hai usse jo kaam karna chahte ho usse jodo. Dopamine ka role habits mein.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 2006,
        chapterNumber: 6,
        title: "Chapter 5 — Teesra Niyam: Easy Banao",
        slug: chSlug(6, "Easy Banao"),
        duration: "31m",
        description: "2-minute rule: Koi bhi nai aadat 2 minute se shuru karo. Friction kam karo aur environment design karo taaki achhi aadat naturally ho.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 2007,
        chapterNumber: 7,
        title: "Chapter 6 — Chautha Niyam: Satisfying Banao",
        slug: chSlug(7, "Satisfying Banao"),
        duration: "32m",
        description: "Habit tracking aur immediate rewards. Cardinal rule of behavior change: jo satisfying lagta hai woh dobara kiya jaata hai.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 2008,
        chapterNumber: 8,
        title: "Conclusion — Goldilocks Rule aur Lifelong Learning",
        slug: chSlug(8, "Goldilocks Rule aur Lifelong Learning"),
        duration: "23m",
        description: "Peak motivation tab hoti hai jab kaam na bahut easy ho, na bahut mushkil. Continuous improvement ka science aur final takeaways.",
        audioUrl: "",
        videoId: "YT5g5FEMPfo",
        thumbnail: "https://img.youtube.com/vi/YT5g5FEMPfo/hqdefault.jpg",
        isFree: true,
      },
    ],
  },

  // ──────────────────────────────────────────
  // BOOK 3: Bhagavad Gita
  // ──────────────────────────────────────────
  {
    id: 103,
    title: "Bhagavad Gita — 18 Adhyay (Chapter Wise)",
    slug: "bhagavad-gita-chapters",
    thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
    category: "spiritual",
    author: "Ved Vyasa / Shri Krishna",
    totalChapters: 6,
    totalDuration: "5h 20m",
    trending: false,
    latest: true,
    plays: 178000,
    hasChapters: true,
    description: `Bhagavad Gita ke 18 adhyayon ko 6 parts mein sunein — har part mein teen adhyay. Shri Krishna ka param gyan Arjun ke through humtak pahunchta hai.

Yeh chapter-wise collection unke liye hai jo poori Gita ek baar mein nahi sun sakte. Roz ek chapter sunein aur apni zindagi mein Gita ke gyan ko utarein.`,
    chapters: [
      {
        id: 3001,
        chapterNumber: 1,
        title: "Adhyay 1-3 — Arjun Vishad aur Karma Yoga",
        slug: chSlug(1, "Arjun Vishad aur Karma Yoga"),
        duration: "52m",
        description: "Arjun ka vishad (grief), Shri Krishna ka pehla updesh, aur Karma Yoga — bina fal ki ichha ke karm karna. 'Karmanye vadhikaraste ma phaleshu kadachana.'",
        audioUrl: "",
        videoId: "qwERGcX-D0Q",
        thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
        isFree: true,
      },
      {
        id: 3002,
        chapterNumber: 2,
        title: "Adhyay 4-6 — Gyan Yoga aur Dhyan Yoga",
        slug: chSlug(2, "Gyan Yoga aur Dhyan Yoga"),
        duration: "58m",
        description: "Karma ka rahasya, gyan ki mahima, aur sthitapragya (stable mind) kya hoti hai. Meditation aur self-discipline par Shri Krishna ka marg.",
        audioUrl: "",
        videoId: "qwERGcX-D0Q",
        thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
        isFree: true,
      },
      {
        id: 3003,
        chapterNumber: 3,
        title: "Adhyay 7-9 — Vigyan Yoga aur Raj Vidya",
        slug: chSlug(3, "Vigyan Yoga aur Raj Vidya"),
        duration: "55m",
        description: "Ishwar ka swaroop, maya ka rahasya, aur bhakti yoga ka mahatva. 'Ye yatha maam prapadyante taams tathaiva bhajaamyaham.'",
        audioUrl: "",
        videoId: "qwERGcX-D0Q",
        thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 3004,
        chapterNumber: 4,
        title: "Adhyay 10-12 — Vibhuti Yoga aur Vishwaroop",
        slug: chSlug(4, "Vibhuti Yoga aur Vishwaroop"),
        duration: "62m",
        description: "Shri Krishna apni divya vibhutiyan batate hain. Arjun ko Vishwaroop ka darshan — sabse dramatic aur adbhut adhyay. Bhakti yoga ka saaransh.",
        audioUrl: "",
        videoId: "qwERGcX-D0Q",
        thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 3005,
        chapterNumber: 5,
        title: "Adhyay 13-15 — Kshetra aur Purushottam Yoga",
        slug: chSlug(5, "Kshetra aur Purushottam Yoga"),
        duration: "48m",
        description: "Sharir aur atma ka farq (kshetra aur kshetragna), prakriti ke teen gunas (sattva, rajas, tamas), aur Purushottam — param atma.",
        audioUrl: "",
        videoId: "qwERGcX-D0Q",
        thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
        isFree: false,
      },
      {
        id: 3006,
        chapterNumber: 6,
        title: "Adhyay 16-18 — Moksha Yoga (Conclusion)",
        slug: chSlug(6, "Moksha Yoga Conclusion"),
        duration: "45m",
        description: "Daivi aur aasuri sampada, shraddha ke teen prakar, aur antim updesh — sarva dharman parityajya. Gita ka sampurn saaransh aur moksha ka marg.",
        audioUrl: "",
        videoId: "qwERGcX-D0Q",
        thumbnail: "https://img.youtube.com/vi/qwERGcX-D0Q/hqdefault.jpg",
        isFree: true,
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────
export function getChapterBookBySlug(slug: string): ChapterBook | undefined {
  return chapterBooks.find((b) => b.slug === slug);
}

export function getChapterBySlug(
  bookSlug: string,
  chapterSlug: string
): { book: ChapterBook; chapter: Chapter } | undefined {
  const book = getChapterBookBySlug(bookSlug);
  if (!book) return undefined;
  const chapter = book.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return undefined;
  return { book, chapter };
}

export function getAdjacentChapters(
  book: ChapterBook,
  currentChapterId: number
): { prev: Chapter | null; next: Chapter | null } {
  const idx = book.chapters.findIndex((c) => c.id === currentChapterId);
  return {
    prev: idx > 0 ? book.chapters[idx - 1] : null,
    next: idx < book.chapters.length - 1 ? book.chapters[idx + 1] : null,
  };
}

export function getTotalFreeChapters(book: ChapterBook): number {
  return book.chapters.filter((c) => c.isFree).length;
}
