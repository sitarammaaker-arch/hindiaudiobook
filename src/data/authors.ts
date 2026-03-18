// ── Authors Data — SEO-optimized bios for each audiobook author ─────────────
// Har author ka dedicated page: /author/[slug]
// GSC data: "mark douglas books" = 104 impressions, "jack schwager" = 5 impressions

export type Author = {
  slug: string;
  name: string;
  nameHindi?: string;       // Hindi mein naam (optional)
  nationality: string;
  born?: string;
  died?: string;
  genre: string[];
  shortBio: string;         // 1-2 lines — card mein
  fullBio: string;          // 300-500 words — SEO rich
  famousFor: string;        // Most famous book/achievement
  books: string[];          // Audiobook slugs — link to these pages
  image?: string;           // Author photo (optional — use initials if not available)
  wikipedia?: string;
};

export const authors: Author[] = [
  // ── TRADING AUTHORS ──────────────────────────────────────────────────────
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

Is insight ne unhe "The Disciplined Trader" likhne par majboor kiya — 1990 mein publish hua yeh book aaj bhi trading psychology ki foundation hai. Isme unhone explain kiya ki kaise traders apni beliefs aur emotions ko identify karke unhe control kar sakte hain.

Unki doosri masterpiece "Trading in the Zone" (2000) ne ek aur step aage jaake "probabilistic thinking" ka concept introduce kiya. Douglas ka kehna tha ki har trade ek independent event hai — aur jo trader yeh truly accept kar leta hai, woh consistently profitable ho jaata hai.

Mark Douglas ne 25 saal se zyada time spend kiya traders ke saath kaam karte hue — one-on-one coaching se lekar seminars tak. Unke students duniya bhar mein hain aur sabhi unhe "the father of trading psychology" mante hain.

Hindi mein unki audiobooks sunn kar aap woh mental discipline develop kar sakte hain jo ek successful trader ko chahiye hoti hai.`,
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

Schwager ka career 1971 mein shuru hua jab woh Wall Street par commodity research analyst bane. Unke paas economics aur finance mein deep expertise thi lekin unhone realize kiya ki sabse valuable knowledge woh hai jo successful traders khud share karte hain.

Yahi insight unhe "Market Wizards" (1989) likhne par le gayi — ek groundbreaking book jisme unhone Paul Tudor Jones, Bruce Kovner, Michael Marcus aur doosre legendary traders ke saath extended interviews kiye. Har interview mein trader ki actual philosophy, methodology aur mindset explore ki gayi.

Is book ne trading literature mein revolution la diya. Pehli baar common readers ko pata chala ki actually successful traders kaise sochte hain, kaise risk manage karte hain, aur kyun zyaadatar traders fail karte hain.

Schwager ne baad mein "The New Market Wizards", "Stock Market Wizards" aur "Hedge Fund Market Wizards" bhi likhe — sab bestsellers bane. Unka kaam trading education ka ek permanent pillar ban gaya hai.

Hindi mein Market Wizards audiobook sunn kar aap directly world's best traders ki wisdom absorb kar sakte hain — bina kisi formula ya system ke, sirf real experiences se.`,
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
    fullBio: `Mark Minervini ek living legend hain stock trading world mein. Unhone US Investing Championship multiple times win ki hai — ek competition jisme real money ke saath trade kiya jaata hai aur sabse zyada returns wala jeetta hai.

Minervini ne formal finance education nahi li. Woh self-taught trader hain jinhe sirf results matter karte hain — theory nahi. Unka career 1983 mein shuru hua aur pehle kuch saal mein woh kaafi lose kiya. Lekin unhone har mistake se seekha aur ek systematic approach develop kiya.

Unka SEPA (Specific Entry Point Analysis) framework woh methodology hai jo consistently 100%+ annual returns generate karti hai. Yeh sirf technical analysis nahi — isme fundamental strength, relative performance, market timing aur precise risk management sab combine hote hain.

"Think and Trade Like a Champion" mein Minervini ne woh sab kuch share kiya hai jo ek average trader ko champion trader mein transform kar sakta hai. Real trades, real numbers, real mistakes — sab transparent tarike se.

Hindi mein unki audiobook sunn kar aap ek proven champion ki mindset aur methodology seedha absorb kar sakte hain.`,
    books: ["think-and-trade-like-a-champion-hindi"],
  },

  // ── WEALTH & FINANCE AUTHORS ─────────────────────────────────────────────
  {
    slug: "robert-kiyosaki",
    name: "Robert Kiyosaki",
    nationality: "American",
    born: "1947",
    genre: ["Finance", "Wealth", "Business"],
    famousFor: "Rich Dad Poor Dad — world's #1 personal finance book",
    shortBio: "Robert Kiyosaki ne 'Rich Dad Poor Dad' likhkar financial education mein revolution la diya. Unki book 32 million se zyada copies bik chuki hai.",
    fullBio: `Robert Toru Kiyosaki ek American businessman, investor aur author hain jinhe "Rich Dad Poor Dad" ki wajah se global recognition mili. Unka janam 1947 mein Hawaii mein hua.

Kiyosaki ki life ka turning point tab aaya jab unhone notice kiya ki unke padhe-likhe pita (Poor Dad) hamesha paison ke liye struggle karte rahe, jabki unke dost ke pita (Rich Dad) — jo school dropout the — millionaire ban gaye. Yeh contrast unki financial education ka core bana.

"Rich Dad Poor Dad" (1997) mein Kiyosaki ne un beliefs ko challenge kiya jo school mein sikhaye jaate hain — "achhi job lo, save karo, ghar kharido." Unka argument tha ki yeh sab "Rat Race" hai — ek loop jisme zyaadatar log phanse rehte hain.

Unhe assets aur liabilities ka farq sikhana unka mission ban gaya. Assets woh hain jo aapki jeb mein paisa daalte hain (stocks, rental properties, business), liabilities woh hain jo paisa nikalte hain (car loan, home loan).

Kiyosaki ne CASHFLOW game bhi banaya — ek board game jo financial literacy sikhata hai. Unki books 50+ languages mein translate ho chuki hain aur 32 million+ copies bik chuki hain — yeh personal finance ki duniya mein record hai.

Hindi mein Rich Dad Poor Dad audiobook sunn kar aap woh financial mindset develop kar sakte hain jo school kabhi nahi sikhata.`,
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
    fullBio: `T. Harv Eker ek motivational speaker, businessman aur author hain jinki book "Secrets of the Millionaire Mind" ne financial psychology ko popular banaya.

Eker ka khud ka safar remarkable hai. Woh kaafi baar near-broke rahe — alag alag businesses try kiye lekin hamesha fail hote rahe. Phir ek din unhe realize hua ki problem unki strategies mein nahi, unke "financial blueprint" mein thi.

Yeh blueprint woh programming hai jo childhood mein form hoti hai — parents, teachers aur society se. "Money is the root of all evil", "Rich people are greedy", "We can't afford it" — yeh sab negative money beliefs unconsciously aapke financial decisions control karte hain.

Eker ne apna financial blueprint rewrite kiya aur phir ek retail fitness store business mein invest kiya. 2.5 saal mein woh millionaire ban gaye. Yeh experience hi "Secrets of the Millionaire Mind" (2005) ki foundation bani.

Book mein unhone 17 ways describe kiye hain jisme rich people aur poor/middle class people alag sochte hain. Har "wealth file" ko reprogram karna possible hai — aur yahi is book ka core message hai.

Hindi mein yeh audiobook sun kar aap apni deep-rooted money beliefs identify kar sakte hain aur unhe change kar sakte hain.`,
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
    fullBio: `Robert Greene ek American author hain jinhe "The 48 Laws of Power" ki wajah se worldwide recognition mili. Unka janam 1959 mein Los Angeles mein hua.

Greene ne University of California, Berkeley se classical studies mein degree li aur phir 80 se zyada jobs mein kaam kiya — editor, translator, movie director assistant, researcher. Yeh diverse experiences unhe human nature aur power dynamics ki deep samajh dete rahe.

"The 48 Laws of Power" (1998) likhne ki inspiration tab mili jab woh Hollywood mein kaam karte waqt dekh rahe the ki power kaise operate karti hai — often covertly. Unhone decide kiya ki yeh dynamics clearly explain kiye jaane chahiye taaki log defend ho sakein.

Book mein unhone Machiavelli, Sun Tzu, Napoleon, Louis XIV, Catherine the Great jaise historical figures ke examples liye. Har law ek specific power dynamic explain karti hai — "Never outshine the master", "Always say less than necessary", "Use absence to increase respect and honor."

Yeh book controversial hai — kuch log ise manipulative kehte hain, kuch ise essential reality check. Lekin fact yeh hai ki yeh book world's most successful people ki bookshelves par zaroor milti hai.

Hindi mein "48 Laws of Power" audiobook sunn kar aap power dynamics samjhenge — whether to use them or protect yourself from others who do.`,
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
    fullBio: `James Clear ek American author, entrepreneur aur speaker hain jinki book "Atomic Habits" (2018) ne self-improvement genre mein landmark status achieve kiya hai.

Clear ki personal story remarkable hai. High school baseball team mein khelne wale Clear ko ek serious head injury ho gayi jisne unki sporting career khatam kar di. Rehabilitation ke dauran unhone habits ki power realize ki — kaise chhoti daily actions compounded hoti hain.

"Atomic Habits" likhne se pehle Clear ne apni website jamesclear.com par regularly articles likhna shuru kiya. Unke 2-3 sentence rules, frameworks aur insights itne powerful the ki newsletter subscribers 500,000 tak pahunch gaye — without any book.

Book mein unka core argument hai ki improvement 1% ke chhote steps se hoti hai, dramatic overnight changes se nahi. 1% daily improvement = 37x better in one year. Yeh compound interest of self-improvement hai.

Clear ne "identity-based habits" ka revolutionary concept diya — sirf goal set mat karo, woh insaan ban jao jo woh habit naturally karta hai. "Main ek writer hoon" sochna vs "Main likhna chahta hoon" — pehla identity build karta hai, doosra sirf desire.

Hindi mein Atomic Habits audiobook sunn kar aap woh practical framework paayenge jo aapki life mein real, lasting change la sakta hai.`,
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
    fullBio: `Napoleon Hill ek American self-help author hain jinki "Think and Grow Rich" (1937) ab tak ki sabse influential self-help books mein se ek hai. Unka janam 1883 mein Virginia mein hua aur nidhan 1970 mein hua.

Hill ka life mission Andrew Carnegie ne define kiya — American steel magnate ne Hill ko challenge diya ki woh 500 successful Americans ka interview karein aur success ke principles document karein. Carnegie ne khud 20 saal tak introductions diye — Thomas Edison, Henry Ford, Franklin D. Roosevelt sab shaamil the.

Yeh 20 saal ka research "Think and Grow Rich" mein culminate hua. Hill ने identify kiya ki success ke 13 principles hain — Burning Desire, Faith, Auto-Suggestion, Specialized Knowledge, Imagination, Organized Planning, Decision, Persistence, Power of the Master Mind, The Mystery of Sex Transmutation, The Subconscious Mind, The Brain, aur The Sixth Sense.

Hill ka most powerful concept tha "burning desire" — success ke liye sirf wishing nahi, obsessive wanting chahiye. "Whatever the mind can conceive and believe, it can achieve" — yeh unka most quoted line hai.

80+ saal baad bhi yeh book equally relevant hai. Hindi mein sun kar yeh timeless wisdom aur bhi accessible ho jaati hai.`,
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
    shortBio: "Paulo Coelho Brazilian novelist hain jinki 'The Alchemist' 65+ languages mein translate ho chuki hai. Yeh book aapko apne Personal Legend follow karne ki inspiration deti hai.",
    fullBio: `Paulo Coelho ek Brazilian lyricist aur novelist hain jinka janam 1947 mein Rio de Janeiro mein hua. Woh 20th century ke sabse widely read authors mein se ek hain.

Coelho ka personal journey bhi ek inspiring story hai. Young age mein unhone apna dream pursue kiya — writer banana — lekin family ne forcibly psychiatric institution mein bheja. Unhone tab bhi nahi maana. Theatre mein kaam kiya, rock music ke lyrics likhe, phir pilgrimage par gaye.

"The Alchemist" (1988) originally Portuguese mein likhi gayi thi. Pehle publisher ne refuse kiya. Doosre ne 900 copies print ki. Phir jab book spread honi shuru hui, toh word-of-mouth itna powerful tha ki ek ke baad ek publisher ne international rights liye.

Aaj "The Alchemist" 65+ languages mein translate ho chuki hai aur 150+ million copies bik chuki hain — publishing history mein ek record. Yeh most translated book by a living author bhi hai.

Book ka core message hai — "When you want something, all the universe conspires in helping you to achieve it." Santiago ki kahani sirf ek adventure story nahi — yeh aapko apne "Personal Legend" — apne true purpose — ki taraf jaane ki himalayan inspiration hai.

Hindi mein The Alchemist audiobook sunna ek life-changing experience hai.`,
    books: ["the-alchemist-hindi"],
    wikipedia: "https://en.wikipedia.org/wiki/Paulo_Coelho",
  },
];

// Helper functions
export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((a) => a.name === name);
}

export function makeAuthorSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
