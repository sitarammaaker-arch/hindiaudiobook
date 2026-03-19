// ── Authors Data ──────────────────────────────────────────────────────────────
// Authors are now stored in Vercel KV (key: ha:authors)
// Use getAllAuthors() from @/lib/data for runtime data
// Static array kept empty — seed via /api/seed-authors on first deploy

export type Author = {
  slug: string;
  name: string;
  nationality: string;
  born?: string;
  died?: string;
  genre: string[];
  shortBio: string;
  fullBio: string;
  famousFor: string;
  books: string[];
  wikipedia?: string;
};

// ── Seed data — 9 original authors (auto-loaded to KV on first request) ──────
export const SEED_AUTHORS: Author[] = [
  {
    slug: "mark-douglas",
    name: "Mark Douglas",
    nationality: "American",
    born: "1948",
    died: "2015",
    genre: ["Trading Psychology", "Finance", "Self Help"],
    famousFor: "The Disciplined Trader aur Trading in the Zone",
    shortBio: "Mark Douglas duniya ke sabse prasiddh trading psychology experts mein se ek hain. Unki books ne lakho traders ki soch badli.",
    fullBio: `Mark Douglas ek pioneering trading psychologist the jo trading world mein ek revolution laaye. Unka janam 1948 mein hua aur 2015 mein unka nidhan hua.

Douglas ne apni trading career mein dekha ki technically skilled traders bhi consistently fail karte hain — sirf isliye kyunki unka mental framework sahi nahi hota. Fear, greed, hope aur regret — yeh emotions trading decisions ko destroy kar dete hain.

Is insight ne unhe "The Disciplined Trader" likhne par majboor kiya — 1990 mein publish hua yeh book aaj bhi trading psychology ki foundation hai.

Unki doosri masterpiece "Trading in the Zone" (2000) ne "probabilistic thinking" ka concept introduce kiya. Douglas ka kehna tha ki har trade ek independent event hai.

Mark Douglas ne 25 saal se zyada time spend kiya traders ke saath — one-on-one coaching se lekar seminars tak. Unhe "the father of trading psychology" maana jaata hai.`,
    books: ["the-disciplined-trader-hindi", "trading-in-the-zone-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Mark_Douglas_(author)",
  },
  {
    slug: "jack-d-schwager",
    name: "Jack D. Schwager",
    nationality: "American",
    born: "1948",
    genre: ["Trading", "Finance", "Investing"],
    famousFor: "Market Wizards series — legendary traders ke interviews",
    shortBio: "Jack Schwager ne duniya ke sabse successful traders ke saath in-depth interviews karke Market Wizards series likhi — trading ka Bible.",
    fullBio: `Jack D. Schwager ek renowned author, fund manager aur commodity trading expert hain. Unka naam trading world mein "Market Wizards" series ki wajah se immortal ho gaya hai.

Schwager ka career 1971 mein shuru hua jab woh Wall Street par commodity research analyst bane.

"Market Wizards" (1989) mein unhone Paul Tudor Jones, Bruce Kovner, Michael Marcus aur doosre legendary traders ke saath extended interviews kiye. Har interview mein trader ki actual philosophy, methodology aur mindset explore ki gayi.

Is book ne trading literature mein revolution la diya. Schwager ne baad mein "The New Market Wizards", "Stock Market Wizards" bhi likhe.`,
    books: ["market-wizards-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Jack_Schwager",
  },
  {
    slug: "mark-minervini",
    name: "Mark Minervini",
    nationality: "American",
    born: "1960",
    genre: ["Trading", "Stock Market", "Investing"],
    famousFor: "US Investing Championship multiple times winner",
    shortBio: "Mark Minervini ne US Investing Championship multiple times jeeti hai. Unki SEPA methodology ne thousands of traders ko consistent returns diye.",
    fullBio: `Mark Minervini ek living legend hain stock trading world mein. Unhone US Investing Championship multiple times win ki hai.

Minervini ne formal finance education nahi li — woh self-taught trader hain. Unka SEPA (Specific Entry Point Analysis) framework consistently 100%+ annual returns generate karta hai.

"Think and Trade Like a Champion" mein unhone woh sab kuch share kiya hai jo ek average trader ko champion trader mein transform kar sakta hai.`,
    books: ["think-and-trade-like-a-champion-hindi"],
  },
  {
    slug: "robert-kiyosaki",
    name: "Robert Kiyosaki",
    nationality: "American",
    born: "1947",
    genre: ["Finance", "Wealth", "Business"],
    famousFor: "Rich Dad Poor Dad — world's #1 personal finance book",
    shortBio: "Robert Kiyosaki ne 'Rich Dad Poor Dad' likhkar financial education mein revolution la diya. Unki book 32 million se zyada copies bik chuki hai.",
    fullBio: `Robert Toru Kiyosaki ek American businessman, investor aur author hain jinhe "Rich Dad Poor Dad" ki wajah se global recognition mili.

Kiyosaki ne notice kiya ki unke padhe-likhe pita (Poor Dad) hamesha paison ke liye struggle karte rahe, jabki unke dost ke pita (Rich Dad) — jo school dropout the — millionaire ban gaye.

"Rich Dad Poor Dad" (1997) mein unhone "Rat Race" concept diya — ek loop jisme zyaadatar log phanse rehte hain. Assets aur liabilities ka farq sikhana unka mission ban gaya.

Unki books 50+ languages mein translate ho chuki hain aur 32 million+ copies bik chuki hain.`,
    books: ["rich-dad-poor-dad-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Robert_Kiyosaki",
  },
  {
    slug: "t-harv-eker",
    name: "T. Harv Eker",
    nationality: "Canadian-American",
    born: "1954",
    genre: ["Wealth", "Finance", "Self Help"],
    famousFor: "Secrets of the Millionaire Mind — financial blueprint concept",
    shortBio: "T. Harv Eker ne 'Secrets of the Millionaire Mind' mein explain kiya ki kaise aapka childhood money blueprint aapko ameer ya gareeb banata hai.",
    fullBio: `T. Harv Eker ek motivational speaker, businessman aur author hain. Eker ka khud ka safar remarkable hai — kaafi baar near-broke rahe.

Eker ne apna financial blueprint rewrite kiya aur 2.5 saal mein millionaire ban gaye. Yeh experience hi "Secrets of the Millionaire Mind" (2005) ki foundation bani.

Book mein 17 ways describe kiye hain jisme rich people aur poor/middle class people alag sochte hain.`,
    books: ["secrets-of-millionaire-mind-hindi"],
  },
  {
    slug: "robert-greene",
    name: "Robert Greene",
    nationality: "American",
    born: "1959",
    genre: ["Power", "Strategy", "Human Behavior"],
    famousFor: "48 Laws of Power — power dynamics ka definitive guide",
    shortBio: "Robert Greene ne history ke sabse powerful logon ka adhyayan karke 48 Laws of Power likhi — ek controversial yet essential guide to power.",
    fullBio: `Robert Greene ek American author hain jinhe "The 48 Laws of Power" ki wajah se worldwide recognition mili.

Greene ne University of California, Berkeley se classical studies mein degree li aur phir 80 se zyada jobs mein kaam kiya.

"The 48 Laws of Power" (1998) mein unhone Machiavelli, Sun Tzu, Napoleon jaise historical figures ke examples liye. Yeh book world's most successful people ki bookshelves par zaroor milti hai.`,
    books: ["48-laws-of-power-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Robert_Greene_(American_author)",
  },
  {
    slug: "james-clear",
    name: "James Clear",
    nationality: "American",
    born: "1986",
    genre: ["Self Help", "Habits", "Productivity"],
    famousFor: "Atomic Habits — habit formation ka definitive modern guide",
    shortBio: "James Clear ne 'Atomic Habits' mein scientifically prove kiya ki chhoti chhoti habits kaise dramatic life changes la sakti hain.",
    fullBio: `James Clear ek American author, entrepreneur aur speaker hain jinki book "Atomic Habits" (2018) ne self-improvement genre mein landmark status achieve kiya.

Clear ki personal story: high school mein serious head injury ke baad rehabilitation ke dauran unhone habits ki power realize ki.

"Atomic Habits" ka core argument hai ki improvement 1% ke chhote steps se hoti hai. "Identity-based habits" — sirf goal set mat karo, woh insaan ban jao.`,
    books: ["atomic-habits-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Atomic_Habits",
  },
  {
    slug: "napoleon-hill",
    name: "Napoleon Hill",
    nationality: "American",
    born: "1883",
    died: "1970",
    genre: ["Self Help", "Success", "Motivation"],
    famousFor: "Think and Grow Rich — success psychology ka timeless classic",
    shortBio: "Napoleon Hill ne 500 successful logon ka 20 saal adhyayan kiya aur Think and Grow Rich likhi — world's best-selling self help book.",
    fullBio: `Napoleon Hill ek American self-help author hain jinki "Think and Grow Rich" (1937) ab tak ki sabse influential self-help books mein se ek hai.

Hill ka life mission Andrew Carnegie ne define kiya — 500 successful Americans ka interview karein aur success ke principles document karein. Thomas Edison, Henry Ford sab shaamil the.

Hill ne identify kiya ki success ke 13 principles hain — Burning Desire, Faith, Persistence, aur aur. "Whatever the mind can conceive and believe, it can achieve."`,
    books: ["think-and-grow-rich-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Napoleon_Hill",
  },
  {
    slug: "paulo-coelho",
    name: "Paulo Coelho",
    nationality: "Brazilian",
    born: "1947",
    genre: ["Fiction", "Spiritual", "Philosophy"],
    famousFor: "The Alchemist — duniya ki sabse zyada padhee jaane wali books mein se ek",
    shortBio: "Paulo Coelho Brazilian novelist hain jinki 'The Alchemist' 65+ languages mein translate ho chuki hai.",
    fullBio: `Paulo Coelho ek Brazilian lyricist aur novelist hain jinka janam 1947 mein Rio de Janeiro mein hua.

"The Alchemist" (1988) originally Portuguese mein likhi gayi thi. Pehle publisher ne refuse kiya. Phir word-of-mouth itna powerful tha ki book 65+ languages mein translate ho gayi aur 150+ million copies bik chuki hain.

Book ka core message: "When you want something, all the universe conspires in helping you to achieve it."`,
    books: ["the-alchemist-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Paulo_Coelho",
  },
];

// ── Static fallback (used in author/[slug] page only — avoids build timeout) ──
export const authors = SEED_AUTHORS;

// ── Helper functions ──────────────────────────────────────────────────────────
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function makeAuthorSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
