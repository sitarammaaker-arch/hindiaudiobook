"use client";
import { useState } from "react";
import Link from "next/link";

const WEB3FORMS_KEY = "498b01ae-c1b9-4e35-bef3-1cd81a03d54c";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: `[HindiAudiobook] ${form.subject}`,
          message: form.message,
          from_name: "HindiAudiobook Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMsg("✅ Message send ho gaya! Hum jald hi reply karenge.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setMsg("Kuch galat hua — dobara try karein");
      }
    } catch {
      setStatus("error");
      setMsg("Network error — dobara try karein");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF6B2B]">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">📩</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-merriweather)" }}>
          Humse Sampark Karein
        </h1>
        <p className="text-gray-500 text-lg">
          Koi sawaal, suggestion, ya book request? Hum sun rahe hain!
        </p>
      </div>

      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "🎧", title: "Book Request", desc: "Koi specific book chahiye? Batao!" },
          { icon: "🐛", title: "Bug Report", desc: "Kuch sahi kaam nahi kar raha?" },
          { icon: "💡", title: "Suggestion", desc: "Website improve karne ka idea?" },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="font-bold text-gray-900 text-sm">{item.title}</p>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">✉️ Message Bhejein</h2>

        {status === "success" ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-xl font-bold text-green-700 mb-2">Message Send Ho Gaya!</p>
            <p className="text-gray-500">{msg}</p>
            <button onClick={() => setStatus("idle")}
              className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              Aur Message Bhejein
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aapka Naam *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jaise: Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF6B2B] outline-none transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="aapka@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF6B2B] outline-none transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
              <select
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF6B2B] outline-none transition-colors text-sm bg-white">
                <option value="">Select karo...</option>
                <option value="Book Request">🎧 Book Request — Nayi audiobook chahiye</option>
                <option value="Bug Report">🐛 Bug Report — Kuch kaam nahi kar raha</option>
                <option value="Suggestion">💡 Suggestion — Website improvement idea</option>
                <option value="Copyright">⚖️ Copyright / DMCA Issue</option>
                <option value="Collaboration">🤝 Collaboration / Partnership</option>
                <option value="Other">📌 Kuch Aur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
              <textarea
                required rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Apna message yahan likhein..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF6B2B] outline-none transition-colors text-sm resize-none"
              />
            </div>

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                ❌ {msg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-60 shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #FF6B2B, #E85A1A)" }}>
              {status === "loading" ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Bhej rahe hain...</>
              ) : (
                <>✉️ Message Bhejein</>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Hum 24-48 ghante mein reply karte hain 📩
            </p>
          </form>
        )}
      </div>

      {/* Social links */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-4">Ya seedha yahan contact karein:</p>
        <div className="flex justify-center gap-4">
          <a href="https://youtube.com/@hindiaudiobook" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: "#FF000015", color: "#FF0000", border: "1px solid #FF000030" }}>
            ▶ YouTube
          </a>
          <a href="https://whatsapp.com/channel/0029Vao7mKBBVJl7j5Bm2S3i" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: "#25D36615", color: "#25D366", border: "1px solid #25D36630" }}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
