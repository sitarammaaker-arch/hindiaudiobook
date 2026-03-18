"use client";
import { useState } from "react";
import { categories } from "@/data/audiobooks";

type FormData = {
  title: string;
  author: string;
  category: string;
  duration: string;
  videoId: string;
  audioUrl: string;
  trending: boolean;
  latest: boolean;
  description: string;
};

const emptyForm: FormData = {
  title: "",
  author: "",
  category: "self-help",
  duration: "",
  videoId: "",
  audioUrl: "",
  trending: false,
  latest: true,
  description: "",
};

function extractVideoId(input: string): string {
  // Handle full YouTube URLs
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtube.com")) {
      return url.searchParams.get("v") || input;
    }
    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    }
  } catch {
    // Not a URL — treat as raw ID
  }
  return input.trim();
}

export default function AdminPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);
  const [videoIdInput, setVideoIdInput] = useState("");
  const [previewThumb, setPreviewThumb] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setVideoIdInput(raw);
    const id = extractVideoId(raw);
    setForm((prev) => ({ ...prev, videoId: id }));
    if (id.length >= 8) {
      setPreviewThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
    } else {
      setPreviewThumb("");
    }
  };

  // Generate slug from title
  const makeSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const handleGenerate = () => {
    if (!form.title || !form.author || !form.videoId) {
      alert("Title, Author aur YouTube Video ID zaroori hain!");
      return;
    }

    const slug = makeSlug(form.title);
    const thumbnail = `https://img.youtube.com/vi/${form.videoId}/hqdefault.jpg`;

    const entry = `  {
    id: Date.now(), // Replace with next number in your list
    title: "${form.title}",
    slug: "${slug}",
    videoId: "${form.videoId}",
    thumbnail: "${thumbnail}",
    duration: "${form.duration || "Unknown"}",
    category: "${form.category}",
    author: "${form.author}",
    plays: 0,
    trending: ${form.trending},
    latest: ${form.latest},
    audioUrl: "${form.audioUrl}",
    description: \`${form.description || "Description yahan add karein..."}\`,
  },`;

    setGenerated(entry);
    setStep(3);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setForm(emptyForm);
    setGenerated("");
    setVideoIdInput("");
    setPreviewThumb("");
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎛️</span>
            <h1 className="text-2xl md:text-3xl font-bold">Admin — Audiobook Add Karein</h1>
          </div>
          <p className="text-indigo-200 text-sm">
            Naya audiobook add karne ke liye form bharein → Code generate karein → Paste karein
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[
            { n: 1, label: "Basic Info" },
            { n: 2, label: "Audio & Options" },
            { n: 3, label: "Code Copy Karein" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s.n
                    ? "bg-[#FF6B2B] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s.n ? "✓" : s.n}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step >= s.n ? "text-[#E85A1A]" : "text-gray-400"}`}>
                {s.label}
              </span>
              {i < 2 && <div className="flex-1 h-0.5 bg-gray-200 mx-1 w-8" />}
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">

          {/* Section 1: Basic Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#FFF1EB] text-[#E85A1A] rounded-lg flex items-center justify-center text-sm font-bold">1</span>
              Basic Jaankari
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Audiobook Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Rich Dad Poor Dad Hindi Audiobook"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent"
                />
                {form.title && (
                  <p className="text-xs text-gray-400 mt-1">
                    Slug: <code className="bg-gray-100 px-1 rounded">{makeSlug(form.title)}</code>
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Author / Lekhak <span className="text-red-500">*</span>
                </label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="e.g. Robert Kiyosaki"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.emoji} {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Duration (Samay)
                </label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 2h 30m"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent"
                />
              </div>

              {/* YouTube URL / ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  YouTube URL ya Video ID <span className="text-red-500">*</span>
                </label>
                <input
                  value={videoIdInput}
                  onChange={handleVideoIdChange}
                  placeholder="https://youtube.com/watch?v=abc123 ya abc123"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent"
                />
                {form.videoId && (
                  <p className="text-xs text-green-600 mt-1 font-medium">
                    ✅ Video ID: <code>{form.videoId}</code>
                  </p>
                )}
              </div>
            </div>

            {/* Thumbnail preview */}
            {previewThumb && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 font-medium mb-2">📸 Thumbnail Preview:</p>
                <img
                  src={previewThumb}
                  alt="thumbnail preview"
                  className="w-48 rounded-lg shadow-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Section 2: Audio & Options */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-[#FFF1EB] text-[#E85A1A] rounded-lg flex items-center justify-center text-sm font-bold">2</span>
              Audio & Options
            </h2>
            <div className="space-y-4">
              {/* Audio URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  MP3 Audio URL
                  <span className="ml-2 text-xs text-gray-400 font-normal">(Lock screen play ke liye — optional)</span>
                </label>
                <input
                  name="audioUrl"
                  value={form.audioUrl}
                  onChange={handleChange}
                  placeholder="https://archive.org/download/your-file/audiobook.mp3"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent"
                />
                <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs text-blue-700 font-semibold mb-1">💡 Free MP3 Hosting Options:</p>
                  <ul className="text-xs text-blue-600 space-y-0.5">
                    <li>• <strong>archive.org</strong> — Free, unlimited (public domain content best)</li>
                    <li>• <strong>Cloudflare R2</strong> — 10GB free, fastest</li>
                    <li>• <strong>Backblaze B2</strong> — 10GB free, cheap</li>
                  </ul>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description (SEO ke liye 500-1000 words)
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Is audiobook ke baare mein likhen... (Hindi ya English dono chalega)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {form.description.length} characters
                </p>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="trending"
                      checked={form.trending}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.trending ? "bg-[#FF6B2B] border-indigo-600" : "border-gray-300"}`}>
                      {form.trending && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">🔥 Trending mein dikhao</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="latest"
                      checked={form.latest}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.latest ? "bg-[#FF6B2B] border-indigo-600" : "border-gray-300"}`}>
                      {form.latest && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">🆕 Latest mein dikhao</span>
                </label>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleGenerate}
              className="flex-1 bg-[#FF6B2B] hover:bg-[#E85A1A] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm"
            >
              ⚡ Code Generate Karein
            </button>
            <button
              onClick={handleReset}
              className="px-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* GENERATED CODE */}
        {generated && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 text-green-700 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Generated Code — Copy & Paste Karein
              </h2>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  copied
                    ? "bg-green-100 text-green-700"
                    : "bg-[#FF6B2B] hover:bg-[#E85A1A] text-white"
                }`}
              >
                {copied ? "✅ Copied!" : "📋 Copy Code"}
              </button>
            </div>

            {/* Code block */}
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-green-300 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {generated}
              </pre>
            </div>

            {/* Instructions */}
            <div className="mt-5 bg-[#FFF1EB] rounded-xl border border-indigo-100 p-5">
              <h3 className="font-bold text-indigo-900 mb-3 text-sm">
                📌 Yeh Code Kahan Paste Karein?
              </h3>
              <ol className="space-y-2 text-sm text-indigo-800">
                <li className="flex gap-2">
                  <span className="font-bold text-[#FF6B2B] flex-shrink-0">1.</span>
                  File kholein: <code className="bg-[#FFF1EB] px-1.5 py-0.5 rounded text-xs mx-1">src/data/audiobooks.ts</code>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#FF6B2B] flex-shrink-0">2.</span>
                  Array ke andar <strong>last entry ke baad</strong> (closing <code className="bg-[#FFF1EB] px-1.5 py-0.5 rounded text-xs">]</code> se pehle) paste karein
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#FF6B2B] flex-shrink-0">3.</span>
                  <code className="bg-[#FFF1EB] px-1.5 py-0.5 rounded text-xs">id</code> field mein next number lagao (e.g. 16, 17...)
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#FF6B2B] flex-shrink-0">4.</span>
                  File save karein → <code className="bg-[#FFF1EB] px-1.5 py-0.5 rounded text-xs">npm run dev</code> se check karein
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#FF6B2B] flex-shrink-0">5.</span>
                  Sab theek ho toh Vercel par deploy karein (neeche instructions hain)
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* VERCEL DEPLOYMENT GUIDE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            Vercel Par Deploy Kaise Karein
          </h2>

          {/* Method 1 - GitHub */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg">Method 1</span>
              GitHub ke zariye (Recommended ✅)
            </h3>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "GitHub Account Banao",
                  desc: "github.com par jaao → Sign Up karein (free hai)",
                  icon: "🐙",
                },
                {
                  step: "02",
                  title: "New Repository Banao",
                  desc: 'GitHub par "New Repository" click karein → Name: audiobook-directory → Public → Create',
                  icon: "📁",
                },
                {
                  step: "03",
                  title: "Code Upload Karein",
                  desc: "Project folder mein terminal kholein aur yeh commands chalao:",
                  icon: "💻",
                  code: `git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/AAPKA-USERNAME/audiobook-directory.git
git push -u origin main`,
                },
                {
                  step: "04",
                  title: "Vercel Connect Karein",
                  desc: "vercel.com par jaao → Log in with GitHub → New Project → audiobook-directory select karein → Deploy!",
                  icon: "▲",
                },
                {
                  step: "05",
                  title: "Live URL Milega",
                  desc: "2-3 minute mein aapki site live ho jaayegi! URL kuch aisa hoga:",
                  icon: "🌐",
                  code: "https://audiobook-directory-username.vercel.app",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF6B2B] text-white rounded-xl flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{item.icon}</span>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    </div>
                    <p className="text-gray-600 text-xs mb-2">{item.desc}</p>
                    {item.code && (
                      <pre className="bg-gray-900 text-green-300 text-xs p-3 rounded-lg overflow-x-auto font-mono">
                        {item.code}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-8" />

          {/* Method 2 - Vercel CLI */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-[#FF6B2B] text-white text-xs px-2 py-1 rounded-lg">Method 2</span>
              Vercel CLI se (Fast ⚡)
            </h3>
            <div className="bg-gray-900 rounded-xl p-4 space-y-1">
              {[
                { comment: "# Step 1: Node.js install hona chahiye (nodejs.org)", cmd: "" },
                { comment: "# Step 2: Vercel CLI install karein", cmd: "npm install -g vercel" },
                { comment: "# Step 3: Project folder mein jaao", cmd: "cd audiobook-directory" },
                { comment: "# Step 4: Dependencies install karein", cmd: "npm install" },
                { comment: "# Step 5: Deploy karein (pehli baar login maangega)", cmd: "vercel" },
                { comment: "# Step 6: Production deploy", cmd: "vercel --prod" },
              ].map((line, i) => (
                <div key={i}>
                  {line.comment && (
                    <p className="text-gray-500 text-xs font-mono">{line.comment}</p>
                  )}
                  {line.cmd && (
                    <p className="text-green-300 text-xs font-mono">$ {line.cmd}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-8" />

          {/* After deployment */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🔄</span>
              Naya Audiobook Add Karne Ke Baad Re-deploy Kaise Karein?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="font-semibold text-green-800 text-sm mb-2">GitHub Method (Auto)</p>
                <pre className="text-green-700 text-xs font-mono space-y-0.5">
                  <p>git add .</p>
                  <p>git commit -m "New audiobook added"</p>
                  <p>git push</p>
                  <p className="text-green-500 mt-1">→ Vercel automatically deploy kar dega! ✅</p>
                </pre>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="font-semibold text-blue-800 text-sm mb-2">CLI Method (Manual)</p>
                <pre className="text-blue-700 text-xs font-mono space-y-0.5">
                  <p>vercel --prod</p>
                  <p className="text-blue-500 mt-1">→ 2 minute mein live! ✅</p>
                </pre>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mt-6 mb-6" />

          {/* Common errors */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              Common Errors aur Solutions
            </h3>
            <div className="space-y-3">
              {[
                {
                  error: "npm command not found",
                  fix: "Node.js install karein: nodejs.org/en/download",
                  color: "red",
                },
                {
                  error: "git not recognized",
                  fix: "Git install karein: git-scm.com/downloads",
                  color: "red",
                },
                {
                  error: "Build failed on Vercel",
                  fix: "Local mein 'npm run build' chalao pehle — agar wahan bhi fail ho toh error message dekho",
                  color: "amber",
                },
                {
                  error: "Images not loading",
                  fix: "next.config.mjs mein img.youtube.com domain already allowed hai — check karein",
                  color: "amber",
                },
                {
                  error: "Custom domain lagana hai",
                  fix: "Vercel Dashboard → Project → Settings → Domains → Add domain",
                  color: "green",
                },
              ].map((item) => (
                <div
                  key={item.error}
                  className={`flex gap-3 p-3 rounded-xl border ${
                    item.color === "red"
                      ? "bg-red-50 border-red-100"
                      : item.color === "amber"
                      ? "bg-amber-50 border-amber-100"
                      : "bg-green-50 border-green-100"
                  }`}
                >
                  <span className="text-lg flex-shrink-0">
                    {item.color === "red" ? "❌" : item.color === "amber" ? "⚠️" : "✅"}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-xs">{item.error}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-6 bg-[#FFF1EB] border border-indigo-100 rounded-xl p-5">
            <h3 className="font-bold text-indigo-900 mb-3 text-sm">✅ Pre-Deploy Checklist</h3>
            <div className="space-y-2">
              {[
                "npm run build locally chalao — koi error nahi aana chahiye",
                "audiobooks.ts mein sahi data hai",
                "YouTube Video IDs sahi hain",
                "next.config.mjs mein image domains set hain",
                ".gitignore mein node_modules aur .next hain",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded" />
                  <span className="text-xs text-indigo-800">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
