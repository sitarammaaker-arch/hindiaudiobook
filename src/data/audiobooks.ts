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
  // ── TRADING PSYCHOLOGY (20,136 impressions — #1 traffic source) ──────────
  {
    id: 1,
    title: "The Disciplined Trader Hindi Audiobook",
    slug: "the-disciplined-trader-hindi",
    videoId: "Ks-_Mh1QhMc",
    thumbnail: "https://img.youtube.com/vi/Ks-_Mh1QhMc/hqdefault.jpg",
    duration: "4h 10m",
    category: "trading-psychology",
    author: "Mark Douglas",
    plays: 210000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `The Disciplined Trader — Mark Douglas ki yeh legendary book trading psychology ki duniya mein ek milestone hai. Yeh book sirf trading ke baare mein nahi hai — yeh aapke mann ko discipline karne ke baare mein hai.

Zyaadatar traders technically skilled hote hain lekin phir bhi lose karte hain — kyunki unka mindset sahi nahi hota. Fear, greed, hope, aur regret — yeh emotions trading decisions ko kharab kar deti hain. Mark Douglas ne explain kiya hai ki kaise in emotions ko identify karein aur inhe control karein.

Is Hindi audiobook mein aap seekhenge: consistently profitable trader kaise banen, loss ke baad emotional balance kaise rakhen, aur market ko objectivity se kaise dekhein. Yeh book har serious trader ke liye must-listen hai.`,
  },
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
    id: 3,
    title: "Trading in the Zone Hindi Audiobook",
    slug: "trading-in-the-zone-hindi",
    videoId: "D9oQKzSNNB0",
    thumbnail: "https://img.youtube.com/vi/D9oQKzSNNB0/hqdefault.jpg",
    duration: "3h 45m",
    category: "trading-psychology",
    author: "Mark Douglas",
    plays: 95000,
    trending: true,
    latest: true,
    audioUrl: "",
    description: `Trading in the Zone — Mark Douglas ki doosri masterpiece. "The Disciplined Trader" ke baad yeh book aapko agle level par le jaati hai.

Is book ka central idea hai "probabilistic thinking" — har trade ek independent event hai, aur market ka behavior inherently uncertain hai. Jo trader yeh accept kar leta hai woh consistently profitable ho jaata hai. Jo trader "sure shot" dhundhta rehta hai woh hamesha disappoint hota hai.

Hindi mein yeh audiobook sunn kar aap trading ke baare mein apna poora perspective badal lenge. Concepts jaise "The Five Fundamental Truths" aur "The Seven Principles of Consistency" aapki trading journey transform kar denge.`,
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
    description: `Think and Trade Like a Champion — Mark Minervini US Investing Championship jeet chuke hain multiple times. Is book mein woh apni proven SEPA (Specific Entry Point Analysis) methodology share karte hain.

Yeh sirf theory nahi — Minervini actual trades ke examples dete hain, specific setups batate hain, aur bataate hain kaise 100%+ returns achieve kiye. Hindi mein yeh audiobook sunna ek real trading education hai.

Stock selection, timing, position sizing, risk management — sab kuch step by step explain kiya gaya hai. Jo log stock market mein serious hain unke liye yeh audiobook ek hidden gem hai.`,
  },

  // ── WEALTH & FINANCE (15,761 impressions — #2 traffic source) ─────────────
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
    description: `Rich Dad Poor Dad — Robert Kiyosaki ki yeh legendary book financial education ki duniya mein revolution laayi. Apne do "pitaon" ki kahaniyaan sunaakar Kiyosaki ne samjhaya ki paisa kamaana ek skill hai aur paisa sambhalna ek alag skill.

Assets aur liabilities ka farq — yahi is book ka core message hai. Ameer log assets khareedते hain (jo unke liye paisa kamaata hai), gareeb log liabilities khareed kar unhe assets samajhte hain. Yeh simple concept aapki financial soch poori tarah badal dega.

Hindi mein sunne par yeh concepts aur bhi relatable lagte hain. School mein paise ki padhaai kyun nahi hoti, "Rat Race" kya hai, aur passive income kaise banayein — sab kuch is audiobook mein clearly explain kiya gaya hai.`,
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
    description: `Secrets of the Millionaire Mind — T. Harv Eker ka yeh groundbreaking book bataata hai ki ameer log aur gareeb log differently kyun sochte hain. Aapka "financial blueprint" kya hai — aur ise kaise reprogram karein?

Is Hindi audiobook mein aap seekhenge ki childhood mein jo money beliefs form hoti hain woh adult life mein kaise sabotage karti hain. "Money is the root of all evil" jaisi soch aapko kabhi ameer nahi hone degi.

17 ways mein ameer log aur middle class log alag sochte hain — ek ek karke samjhaya gaya hai. Yeh audiobook GSC par 7,537 impressions le rahi hai — matlab bahut log ise dhundh rahe hain. Ab yeh aapki site par available hai!`,
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
    description: `Zero to One — PayPal co-founder Peter Thiel ki yeh book startup aur innovation ke baare mein ek completely different perspective deti hai. "1 se n" tak jaana matlab existing cheezein copy karna hai — lekin "0 se 1" tak jaana matlab kuch truly new create karna hai.

Successful startups sirf achhe ideas nahi hote, woh monopolies create karte hain — ek aisi unique position jahan koi competitor nahi hota. Google, Facebook, Amazon — sab monopolies hain apne domains mein.

Entrepreneurs, students, aur investors ke liye very valuable hai yeh audiobook. Business ki duniya mein zero se start karke ek bada empire banane ki soch develop karne mein yeh book sabse helpful hai.`,
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
    description: `The Psychology of Money — Morgan Housel ki yeh nyi kitaab finance aur behavior science ka ek unique combination hai. Paisa kamaana ek skill hai, lekin paisa sambhalna ek alag hi skill hai — aur doosri zyada important hai.

19 short stories ke zariye money ke baare mein hum sab ki galat soch expose kiye hain. Ameer log zyada intelligent nahi hote — zyada patient hote hain. Long-term thinking aur compounding ka magic bahut powerful hai.

"Enough" ka concept, saving vs investing mindset, aur financial independence ka rasta — sab kuch simple Hindi mein explain kiya gaya hai. Koi complex formula nahi, sirf timeless wisdom.`,
  },

  // ── POWER & STRATEGY (5,283 impressions — 48 Laws alone) ─────────────────
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
    description: `48 Laws of Power — Robert Greene ki yeh controversial yet fascinating book power aur strategy ke timeless rules explain karti hai. History ke sabse powerful logon — Napoleon, Machiavelli, Sun Tzu — ke examples se 48 laws derive kiye gaye hain.

Yeh book uncomfortable truths bataati hai jo koi nahi batata. "Never outshine the master", "Always say less than necessary", "Crush your enemy totally" — yeh laws harsh lagte hain, lekin real world mein yahi hota hai.

Hindi mein yeh audiobook sunna ek eye-opening experience hai. Chahe aap defensive taur par samajhna chahein ki doosre kya games khel rahe hain, ya khud in laws ko apply karna chahein — dono ke liye equally valuable.`,
  },
  {
    id: 10,
    title: "Chanakya Neeti Hindi Audiobook",
    slug: "chanakya-neeti-hindi",
    videoId: "OEyUoaVGrqY",
    thumbnail: "https://img.youtube.com/vi/OEyUoaVGrqY/hqdefault.jpg",
    duration: "1h 30m",
    category: "power-strategy",
    author: "Acharya Chanakya",
    plays: 76000,
    trending: false,
    latest: true,
    audioUrl: "",
    description: `Chanakya Neeti — 2300 saal purana yeh granth aaj bhi utna hi relevant hai. Chanakya Maurya samrajya ke mahaan niti nishnat aur Chandragupta Maurya ke guru the.

Chanakya ke practical jiwan darshan mein: kaise dushman ko pehchanein, kaisa mitra chunein, paisa kaise bachayein, aur rajniti kaise karein — sab kuch bina lage-lipte seedha bataya gaya hai.

"Jo insaan apne paison ki raksha nahi kar sakta, woh doosron ki bhi nahi kar sakta." Chanakya ki neeti aapke rozana ke decisions mein kaam aati hai — office politics, family matters, ya financial planning — har jagah.`,
  },

  // ── STORY & NOVEL (6,915 impressions) ────────────────────────────────────
  {
    id: 11,
    title: "The Alchemist Hindi Audiobook",
    slug: "the-alchemist-hindi",
    videoId: "V1j82UVfAlM",
    thumbnail: "https://img.youtube.com/vi/V1j82UVfAlM/hqdefault.jpg",
    duration: "3h 15m",
    category: "story",
    author: "Paulo Coelho",
    plays: 98000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `The Alchemist — Paulo Coelho ki yeh masterpiece duniya ki sabse zyada padhee jaane waali books mein se ek hai. Santiago — ek chhota sa shepherd ladka jo apne sapnon ki duniya mein aage badhne ke liye sab kuch chhodta hai.

Santiago ko sapne mein Egyptian pyramids ke paas khazane ke baare mein pata chalta hai. Woh Spain chhod deta hai, Africa ki yaatra karta hai, desert cross karta hai, aur ek alchemist se milta hai jo use "Soul of the World" ka raaz batata hai.

"When you want something, all the universe conspires in helping you to achieve it." Yeh philosophical journey aapko apne "Personal Legend" ko paane ke liye inspire karegi.`,
  },
  {
    id: 12,
    title: "Sapiens Hindi Audiobook",
    slug: "sapiens-hindi",
    videoId: "oFJN0FLd7AE",
    thumbnail: "https://img.youtube.com/vi/oFJN0FLd7AE/hqdefault.jpg",
    duration: "6h 30m",
    category: "story",
    author: "Yuval Noah Harari",
    plays: 112000,
    trending: true,
    latest: false,
    audioUrl: "",
    description: `Sapiens — Yuval Noah Harari ki yeh global bestseller human history ko ek naye angle se dekhti hai. Homo Sapiens kaise 70,000 saal pehle ek ordinary mammal se Earth ke most powerful species ban gaye?

Teen major revolutions cover hoti hain: Cognitive Revolution, Agricultural Revolution, aur Scientific Revolution. Har revolution ne insaani zindagi ko fundamentally badla.

Hum collectively stories mein believe karte hain — paisa, religion, nations — yeh sab "inter-subjective realities" hain. Jo log history boredom se yaad karte the, unhe is audiobook mein ek thriller jaisa maza aata hai.`,
  },
  {
    id: 13,
    title: "Diary of a Young Girl Hindi Audiobook",
    slug: "diary-of-a-young-girl-hindi",
    videoId: "a-H8IPPJ4T4",
    thumbnail: "https://img.youtube.com/vi/a-H8IPPJ4T4/hqdefault.jpg",
    duration: "5h 20m",
    category: "story",
    author: "Anne Frank",
    plays: 43000,
    trending: false,
    latest: true,
    audioUrl: "",
    description: `Anne Frank ki Diary — yeh ek 13 saal ki Yahudi ladki ki diary hai jisne World War II ke samay Amsterdam mein 2 saal chhupkar bitaye. Yeh duniya ki sabse zyada padhee jaane waali personal accounts mein se ek hai.

Anne ki awaaz mein jo innocence aur hope hai — woh aapko andar se hila deti hai. Mushkil se mushkil haalat mein bhi insaan apni umeed nahi khota — yahi is audiobook ka sabse bada sandesh hai.

Yeh audiobook history ka ek crucial chapter hai jo har insaan ko sunna chahiye.`,
  },

  // ── MOTIVATIONAL / SELF HELP (4,470 impressions) ─────────────────────────
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
    description: `Atomic Habits — James Clear ki yeh bestselling book sikhati hai ki chhoti chhoti aadate kaise aapki poori zindagi badal sakti hain. 1% behtar hona — yeh chhota sa number samay ke saath dramatic results deta hai.

Habit Loop: Cue, Craving, Response, aur Reward. "Identity-based habits" — sirf goal nahi, woh insaan bano jo woh habit naturally karta hai. "Main ek healthy insaan hoon" — yahi fark hai.

Habit stacking, environment design, 2-minute rule — practical tools jo aaj se shuru kar sakte hain.`,
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
    description: `Ikigai — yeh Japanese concept "jeene ka karan" hai. Okinawa, Japan mein sabse zyada centenarians (100 saal ke log) rehte hain. Unka raaz? Ikigai!

Chaar circles: aap jo love karte hain, jo aap achha karte hain, jiske liye duniya ko zaroorat hai, aur jiske liye pay milta hai. Jahan yeh milte hain — wahin Ikigai hai.

Din ki shuruat kaise karein, stress manage karein, aur zindagi mein balance laayein — Japanese philosophy ki roshni mein.`,
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
    description: `Think and Grow Rich — 1937 mein likhi gayi yeh legendary book aaj bhi world's bestselling self-help books mein hai. 500 se zyada successful logon ka adhyayan — Andrew Carnegie, Thomas Edison, Henry Ford.

"Burning Desire", Faith, Auto-suggestion, Imagination, Planning, Persistence — success ke 13 principles jo har ameer insaan mein common hain.

"Whatever the mind can conceive and believe, it can achieve." Yeh audiobook aapko sochne par nahi, karne par majboor karta hai.`,
  },

  // ── SPIRITUAL (Gita + Ramcharitmanas strong content) ─────────────────────
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
    description: `Bhagavad Gita — Shri Krishna aur Arjun ke beech Kurukshetra ke maidan mein hua yeh param conversation "Song of God" hai. 18 adhyayon ka saar — life, duty, action, aur moksha ki gehri baatein.

"Karmanye vadhikaraste ma phaleshu kadachana" — sirf karm karo, fal ki chinta mat karo. Yeh duniya ka sabse powerful mantra hai anxiety door karne ka.

Karma Yoga, Bhakti Yoga, aur Gyan Yoga — teen raaste. Stress management, decision making, leadership — har field mein Gita guide karti hai.`,
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
    description: `Ramcharitmanas — Goswami Tulsidas ji ka yeh mahakavya Hindu dharma ka anmol ratna hai. Maryada Purushottam Shri Ram ka poora jeevan — janam, shiksha, Sita Mata se vivah, Lanka vijay, aur Ayodhya wapasi.

Baal Kand, Ayodhya Kand, Aranya Kand, Kishkindha Kand, Sundar Kand, Lanka Kand, Uttar Kand — sab kuch is audiobook mein. Dohe aur chaupaiyan seedha dil mein utarti hain.

Ghar par, safar mein, ya raat ko neend se pehle — Ramcharitmanas ka shravna mann ko prasann karta hai.`,
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
    description: `Mann Ki Shanti — Swami Vivekananda ji ke teachings par based yeh guided meditation aur spiritual guide hai. Stress, anxiety — is modern world mein yeh audiobook ek oasis ki tarah hai.

Dhyan kya hai, pranayama ke benefits, aur mann ko control karna — simple Hindi mein. "Uthho, jaago, aur tab tak mat ruko jab tak apna lakshya na paa lo."

Deep breathing, visualization, positive affirmations — sab ek jagah. Mann ki shanti toh sab chahte hain!`,
  },

  // ── KIDS (content available, future growth potential) ────────────────────
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
    description: `Panchatantra Ki Kahaniyaan — bachon ke liye sabse pyaari Hindi audiobook. Animals ke zariye bade-bade jeevan ke paath sikhati hain yeh ancient tales.

"Bandar aur Magarmachh", "Sher aur Chuha", "Titli aur Cheenti" — har kahani mein doston ki zaroorat, mehnat ki value, aur aqalmandi ki importance hai.

Imagination develop hoti hai, Hindi sudhrti hai, aur moral values bhi seedhe dil mein utarte hain. Bacche baar baar sunne ki zidd karte hain!`,
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
    description: `Bal Hanuman Ki Kahaniyaan — Hanuman ji ke bachpan aur amazing adventures. Suraj ko fal samajhkar khane ki koshish, Guru Suryadev se shiksha, Lanka dahan, aur Sanjivni buti laane ki heroic story.

Devotion, strength, aur loyalty ka sandesh. Bacche Hanuman ji se connect karte hain — masti bhari, strong, doston ke liye kuch bhi karne wale.

Background music aur awaaz itni engaging hai ki ghar ke sab log — bade bhi — sun lete hain!`,
  },
    {
    id: Date.now(), // Replace with next number in your list
    title: "Trading In The Zone Full Hindi Audiobook",
    slug: "trading-in-the-zone-full-hindi-audiobook",
    videoId: "XGJYX7-NsQM",
    thumbnail: "https://img.youtube.com/vi/XGJYX7-NsQM/hqdefault.jpg",
    duration: "8h 31m",
    category: "motivational",
    author: "by Mark Douglas",
    plays: 0,
    trending: true,
    latest: true,
    audioUrl: "",
    description: `Trading in the Zone — Full Hindi Audiobook | Mark Douglas
Kya aap ek aisa trader banna chahte hain jo consistently profit kamata hai? Kya aap haar trade ke baad emotionally devastated feel karte hain? Kya aap jaanna chahte hain ki duniya ke sabse successful traders ka secret kya hai?
Agar haan, toh Trading in the Zone Full Hindi Audiobook — Mark Douglas ki is masterpiece ko — aaj hi sunna shuru karein. Yeh sirf ek trading book nahi hai — yeh ek complete mental transformation guide hai jo aapki trading life hamesha ke liye badal degi.`,
  },
];

// ── UPDATED CATEGORIES — GSC data se optimize kiya ──────────────────────────
// Old: motivational, story, finance, spiritual, kids (poor GSC match)
// New: trading-psychology (20K impr), wealth-finance (15K impr), power-strategy (5K),
//      story (6.9K), self-help (4.4K), spiritual, kids
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
    seoTitle: "Wealth & Finance Hindi Audiobooks — Rich Dad, Millionaire Mind",
    seoDesc: "Rich Dad Poor Dad, Secrets of Millionaire Mind, Zero to One Hindi audiobooks. Wealth building aur financial freedom ke liye.",
  },
  {
    slug: "power-strategy",
    label: "Power & Strategy",
    emoji: "👑",
    color: "from-amber-500 to-orange-600",
    bgFrom: "#f59e0b",
    bgTo: "#ea580c",
    description: "48 Laws of Power, Chanakya Neeti — power, influence and strategy",
    seoTitle: "Power & Strategy Hindi Audiobooks — 48 Laws of Power, Chanakya Neeti",
    seoDesc: "48 Laws of Power Hindi audiobook, Chanakya Neeti. Power aur strategy ke timeless principles Hindi mein sunein.",
  },
  {
    slug: "story",
    label: "Story & Novel",
    emoji: "📖",
    color: "from-purple-500 to-violet-600",
    bgFrom: "#a855f7",
    bgTo: "#7c3aed",
    description: "The Alchemist, Sapiens, inspiring stories — best Hindi story audiobooks",
    seoTitle: "Hindi Story Audiobooks — The Alchemist, Sapiens Hindi",
    seoDesc: "Best Hindi story audiobooks — The Alchemist Hindi, Sapiens, Diary of a Young Girl. Free mein sunein HindiAudiobook.com par.",
  },
  {
    slug: "self-help",
    label: "Self Help",
    emoji: "🔥",
    color: "from-red-500 to-pink-600",
    bgFrom: "#ef4444",
    bgTo: "#db2777",
    description: "Atomic Habits, Ikigai, Think & Grow Rich — self improvement books",
    seoTitle: "Self Help Hindi Audiobooks — Atomic Habits, Ikigai, Think & Grow Rich",
    seoDesc: "Motivational self help hindi audiobooks — Atomic Habits, Ikigai, Think and Grow Rich. Free mein sunein.",
  },
  {
    slug: "spiritual",
    label: "Spiritual",
    emoji: "🙏",
    color: "from-indigo-500 to-purple-600",
    bgFrom: "#6366f1",
    bgTo: "#9333ea",
    description: "Bhagavad Gita, Ramcharitmanas, meditation — spiritual audiobooks in Hindi",
    seoTitle: "Spiritual Hindi Audiobooks — Bhagavad Gita, Ramcharitmanas",
    seoDesc: "Spiritual Hindi audiobooks — Bhagavad Gita Saar, Ramcharitmanas, Mann Ki Shanti. Free mein sunein.",
  },
  {
    slug: "kids",
    label: "Kids Stories",
    emoji: "🧒",
    color: "from-pink-400 to-rose-500",
    bgFrom: "#f472b6",
    bgTo: "#f43f5e",
    description: "Panchatantra, Bal Hanuman — Hindi moral stories for children",
    seoTitle: "Kids Hindi Audio Stories — Panchatantra, Bal Hanuman",
    seoDesc: "Bachon ke liye free Hindi audio stories — Panchatantra, Bal Hanuman Ki Kahaniyaan. Moral stories in Hindi.",
  },
];

export function getAudiobookBySlug(slug: string): Audiobook | undefined {
  return audiobooks.find((a) => a.slug === slug);
}

export function getAudiobooksByCategory(category: string): Audiobook[] {
  return audiobooks.filter((a) => a.category === category);
}

export function getTrendingAudiobooks(): Audiobook[] {
  return audiobooks.filter((a) => a.trending);
}

export function getLatestAudiobooks(): Audiobook[] {
  return audiobooks.filter((a) => a.latest);
}

export function getRelatedAudiobooks(slug: string, category: string): Audiobook[] {
  return audiobooks
    .filter((a) => a.category === category && a.slug !== slug)
    .slice(0, 4);
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
