// ── Best-Of Curated Lists — High-intent SEO pages ───────────────────────────
// These pages target informational queries that AudioFile, Audible rank for.
// Each list = a dedicated URL = a dedicated ranking opportunity.
// GSC opportunities: "best trading psychology books hindi", "top self help hindi"

export type CuratedList = {
  slug: string;
  title: string;
  emoji: string;
  seoTitle: string;
  description: string;
  longDescription: string;
  bgFrom: string;
  bgTo: string;
  books: string[];           // audiobook slugs
  targetKeywords: string[];  // for internal tracking
  updatedYear: number;
};

export const curatedLists: CuratedList[] = [
  {
    slug: "best-trading-psychology-books-hindi",
    title: "Best Trading Psychology Hindi Audiobooks",
    emoji: "📈",
    seoTitle: "Best Trading Psychology Books Hindi — Top 4 Audiobooks 2025",
    description: "Stock market mein consistently profitable banne ke liye yeh 4 books essential hain",
    longDescription: `Trading mein loss sirf galat analysis ki wajah se nahi hota — zyaadatar cases mein psychology galat hoti hai. Fear of missing out, revenge trading, overleveraging — yeh sab mental mistakes hain.

Duniya ke sabse successful traders ek cheez mein agree karte hain: technical knowledge secondary hai, mental discipline primary hai. Is curated list mein woh 4 books hain jo specifically trading mindset build karne ke liye likhee gayi hain.

Mark Douglas — jise "Father of Trading Psychology" kaha jaata hai — ki dono books yahan hain. Aur Jack Schwager ki Market Wizards, jisme 17 legendary traders ne directly bataya hai ki woh kya differently karte hain.

In sabhi books ko Hindi mein sunn kar aap woh mental framework develop kar sakte hain jo ek average trader ko champion trader mein badalta hai.`,
    bgFrom: "#2563eb",
    bgTo: "#0891b2",
    books: [
      "the-disciplined-trader-hindi",
      "trading-in-the-zone-hindi",
      "market-wizards-hindi",
      "think-and-trade-like-a-champion-hindi",
    ],
    targetKeywords: ["best trading psychology books hindi", "trading books hindi", "stock market books hindi audiobook"],
    updatedYear: 2025,
  },
  {
    slug: "best-wealth-building-books-hindi",
    title: "Best Wealth Building Hindi Audiobooks",
    emoji: "💰",
    seoTitle: "Best Wealth Building Books Hindi — Top 4 Free Audiobooks 2025",
    description: "Financial freedom ke liye — Rich Dad se Millionaire Mind tak — yeh 4 books ek complete wealth education hain",
    longDescription: `School mein hume sirf ek hi raasta sikhaya jaata hai — padho, job lo, save karo, retire karo. Lekin yeh "Rat Race" hai jisme zyaadatar log poori zindagi struggle karte hain.

Financial freedom ka raasta alag hai — aur is curated list ki 4 books woh raasta clearly dikhati hain.

Robert Kiyosaki ne "Rich Dad Poor Dad" mein assets vs liabilities ka fundamental difference explain kiya. T. Harv Eker ne "Millionaire Mind" mein bataya ki ameer aur gareeb ki soch mein kya fark hota hai. Peter Thiel ne "Zero to One" mein monopoly businesses ki power explain ki. Morgan Housel ne "Psychology of Money" mein bataya ki paisa manage karna ek behavior hai, math nahi.

Yeh charon books milkar ek complete financial education deti hain — school mein jo kabhi nahi sikhaya gaya.`,
    bgFrom: "#10b981",
    bgTo: "#16a34a",
    books: [
      "rich-dad-poor-dad-hindi",
      "secrets-of-millionaire-mind-hindi",
      "zero-to-one-hindi",
      "psychology-of-money-hindi",
    ],
    targetKeywords: ["best wealth books hindi", "financial freedom hindi audiobook", "rich dad poor dad hindi"],
    updatedYear: 2025,
  },
  {
    slug: "best-self-help-hindi-audiobooks",
    title: "Best Self Help Hindi Audiobooks",
    emoji: "🔥",
    seoTitle: "Best Self Help Hindi Audiobooks — Top 3 Life Changing Books 2025",
    description: "Atomic Habits, Ikigai, Think & Grow Rich — yeh 3 books milkar aapki poori life transform kar sakti hain",
    longDescription: `Millions of people har saal self-help books khareedti hain lekin zyaadatar koi change nahi aata. Kyun? Kyunki galat books padhte hain, ya padh kar chhod dete hain.

Is list mein sirf woh 3 books hain jinhe actually implement kiya ja sakta hai — aur jinse results actually aate hain.

James Clear ki "Atomic Habits" scientifically proven framework deti hai — chhoti 1% improvements jo compounded hokar life-changing results deti hain. Hector Garcia ki "Ikigai" aapko apna life purpose dhundhne mein help karti hai. Napoleon Hill ki "Think and Grow Rich" 80 saal se consistently best self-help book rahi hai — 500 successful logon ka 20 saal ka research.

Teeno books ko Hindi mein sun kar aap apni life ka direction set kar sakte hain aur actually chhote lekin consistent steps lena shuru kar sakte hain.`,
    bgFrom: "#ef4444",
    bgTo: "#db2777",
    books: [
      "atomic-habits-hindi",
      "ikigai-hindi",
      "think-and-grow-rich-hindi",
    ],
    targetKeywords: ["best self help books hindi", "motivational audiobook hindi free", "atomic habits hindi"],
    updatedYear: 2025,
  },
  {
    slug: "best-power-strategy-books-hindi",
    title: "Best Power & Strategy Hindi Audiobooks",
    emoji: "👑",
    seoTitle: "Best Power & Strategy Books Hindi — 48 Laws of Power, Chanakya 2025",
    description: "48 Laws of Power aur Chanakya Neeti — power aur strategy ke timeless principles jo aaj bhi kaam aate hain",
    longDescription: `Power dynamics real hain — office mein, society mein, everywhere. Jo log inhe samjhte hain woh aage jaate hain. Jo nahi samjhte woh peeche reh jaate hain.

Robert Greene ne "48 Laws of Power" mein history ke sabse powerful logon — Napoleon, Machiavelli, Elizabeth I — ke real examples se 48 laws derive kiye. Yeh book controversial hai kyunki yeh uncomfortable truths batati hai. Lekin ignore karna aapko vulnerable banata hai.

Aur Chanakya — 2300 saal pehle India mein — ne wahi principles document kiye the jo aaj bhi work karte hain. Chanakya Neeti time-tested wisdom hai.

In dono books ko Hindi mein sunn kar aap samjhenge ki duniya actually kaise kaam karti hai — aur apni life mein woh intelligence apply kar sakte hain.`,
    bgFrom: "#f59e0b",
    bgTo: "#ea580c",
    books: [
      "48-laws-of-power-hindi",
      "chanakya-neeti-hindi",
    ],
    targetKeywords: ["48 laws of power hindi audiobook", "chanakya neeti hindi", "power strategy books hindi"],
    updatedYear: 2025,
  },
  {
    slug: "best-story-audiobooks-hindi",
    title: "Best Story Hindi Audiobooks",
    emoji: "📖",
    seoTitle: "Best Hindi Story Audiobooks — Alchemist, Sapiens, Diary of Young Girl 2025",
    description: "Inspiring stories jo sirf entertain nahi karti — sochne par bhi majboor karti hain",
    longDescription: `Kuch stories sirf time pass nahi karti — woh aapka perspective permanently change kar deti hain. Is list mein woh 3 stories hain jinhone millions of people ki soch badli.

Paulo Coelho ki "The Alchemist" 150 million copies bik chuki hai — ek young shepherd ki journey jo batati hai ki apne sapnon ko follow karna kaise possible hai. "The Alchemist Hindi Edition audiobook" already 5,649 impressions le rahi hai Google par.

Yuval Noah Harari ki "Sapiens" human history ko ek thriller ki tarah present karti hai — aap samjhenge ki 70,000 saal mein Homo Sapiens kaise dominant species bana.

Anne Frank ki diary World War II mein ek 13-year-old ki real story hai — hope aur courage ki most powerful testimony ever written.

Teeno books Hindi mein sun kar aap entertain bhi honge aur kuch deeply valuable bhi seekhenge.`,
    bgFrom: "#a855f7",
    bgTo: "#7c3aed",
    books: [
      "the-alchemist-hindi",
      "sapiens-hindi",
      "diary-of-a-young-girl-hindi",
    ],
    targetKeywords: ["best hindi story audiobooks", "alchemist hindi audiobook", "sapiens hindi audiobook"],
    updatedYear: 2025,
  },
];

export function getCuratedListBySlug(slug: string): CuratedList | undefined {
  return curatedLists.find((l) => l.slug === slug);
}
