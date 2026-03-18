# 🎧 Hindi Audiobook — www.HindiAudiobook.com

India ka Free Hindi Audiobook Platform — built with **Next.js 14 App Router** + **Tailwind CSS**.

## 🌐 Website Details

- **Website Name:** Hindi Audiobook
- **Domain:** https://www.hindiaudiobook.com
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** Hindi + English

## ✨ Features

- 🏠 Homepage — Hero, search, categories, trending & latest
- 🎵 Audiobook Detail — YouTube embed + HTML5 player (lock screen play)
- 📚 Chapter Wise — Book chapters with prev/next navigation
- 🔍 Search — Client-side with category filter
- ⬆️ Upload Dashboard — Archive.org auto-fetch + one-click upload
- 📱 Fully Responsive — Mobile-first
- 🤖 SEO Ready — Dynamic meta, sitemap, robots, canonical URLs
- 🔒 Lock Screen Play — Media Session API

## 🗂️ Folder Structure

```
src/
├── app/
│   ├── page.tsx                          ← Homepage
│   ├── layout.tsx                        ← Root layout
│   ├── sitemap.ts                        ← Auto sitemap (hindiaudiobook.com)
│   ├── robots.ts                         ← robots.txt
│   ├── audiobook/[slug]/page.tsx         ← Audiobook detail
│   ├── audiobook/[slug]/chapters/        ← Chapter list
│   ├── audiobook/[slug]/chapter/[slug]/  ← Chapter player
│   ├── category/[slug]/page.tsx          ← Category listing
│   ├── chapters/page.tsx                 ← All chapter books
│   ├── search/page.tsx                   ← Search
│   ├── admin/upload/page.tsx             ← Upload dashboard
│   └── api/
│       ├── archive/route.ts              ← Archive.org fetcher
│       ├── audiobooks/route.ts           ← CRUD audiobooks
│       └── books/[id]/route.ts           ← CRUD chapter books
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AudiobookCard.tsx
│   ├── AudioPlayer.tsx                   ← HTML5 player (lock screen)
│   ├── ChapterPlayer.tsx                 ← Chapter player with nav
│   ├── ArchiveFetcher.tsx                ← Archive.org URL → MP3 list
│   ├── SearchBar.tsx
│   ├── SectionHeader.tsx
│   └── SkeletonCard.tsx
├── data/
│   ├── audiobooks.ts                     ← Static audiobooks
│   └── chapters.ts                       ← Static chapter books
└── lib/
    ├── db.ts                             ← JSON file read/write
    └── data.ts                           ← Merge static + dynamic data
data/
├── audiobooks.json                       ← Uploaded audiobooks (runtime)
└── books.json                            ← Uploaded chapter books (runtime)
```

## 🚀 Setup

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 🌐 Deploy to Vercel

```bash
# Option 1: GitHub → Vercel (recommended)
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/YOUR_USERNAME/hindiaudiobook.git
git push -u origin main
# Connect repo at vercel.com → auto deploy

# Option 2: Vercel CLI
npm i -g vercel
vercel --prod
```

### After deploy — Custom Domain Setup

1. Vercel Dashboard → Project → Settings → Domains
2. Add: `www.hindiaudiobook.com`
3. Add: `hindiaudiobook.com` (auto-redirects to www)
4. Update DNS at your registrar:
   - CNAME: `www` → `cname.vercel-dns.com`
   - Or: A record for apex → Vercel IP

## ⬆️ Upload Workflow

```
/admin/upload → "🌐 Archive.org Fetch" → URL paste → Fetch
→ MP3 files list → Click to fill form → Upload button → Done!
```

## 📄 Pages & Routes

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/audiobook/[slug]` | Audiobook detail + player |
| `/audiobook/[slug]/chapters` | Chapter list |
| `/audiobook/[slug]/chapter/[chapterSlug]` | Chapter player |
| `/category/[slug]` | Category listing |
| `/chapters` | All chapter books |
| `/search?q=query` | Search results |
| `/admin/upload` | Upload dashboard |

## 🔧 Tech Stack

- **Next.js 14** — App Router, SSG, API Routes
- **TypeScript** — Full type safety
- **Tailwind CSS** — Styling
- **Media Session API** — Lock screen controls
- **Archive.org API** — Free MP3 hosting integration
