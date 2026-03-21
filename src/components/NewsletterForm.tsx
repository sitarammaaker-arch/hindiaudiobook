"use client";
import { useState } from "react";

const BREVO_FORM_URL = "https://76dde0b3.sibforms.com/serve/MUIFAJO791tJntoQgxOkjTepEV1ByObIENJje2XRqNwPDdhEn1BJYlcfdrS8zw31hHoIt-8VaS7HtHcdF_8LenYB47VgSs8u8Ixf9Zhly79w8Ai6yarZdqA-ZUDK74GCCUrhKxALLSSEhgSRERCcCTwvT3sY3xqJ1M0gdw4ccKF2H4wlDzrffmM63TX1BSbq-2U07M_RxbVmwq82iQ==";

export default function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      // 1. Save to our KV database
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source }),
      });
      const data = await res.json();

      // 2. Also submit to Brevo silently (background)
      try {
        const formData = new FormData();
        formData.append("EMAIL", email);
        if (name) formData.append("FIRSTNAME", name);
        await fetch(BREVO_FORM_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors", // Brevo allows cross-origin
        });
      } catch {} // Silent fail — Brevo is bonus

      if (data.success) {
        setStatus("success");
        setMsg("✅ Subscribe ho gaye! Nayi audiobooks ki notification milegi.");
        setEmail("");
        setName("");
      } else if (data.error?.includes("already")) {
        setStatus("success");
        setMsg("✅ Aap pehle se subscribe hain!");
      } else {
        setStatus("error");
        setMsg(data.error || "Kuch galat hua — dobara try karein");
      }
    } catch {
      setStatus("error");
      setMsg("Network error — dobara try karein");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 bg-green-500/20 border border-green-400/40 text-green-200 px-5 py-4 rounded-2xl max-w-md mx-auto">
        <span className="text-2xl">🎉</span>
        <p className="font-semibold text-sm">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Aapka naam (optional)"
          className="sm:w-36 px-4 py-3 rounded-xl text-gray-900 text-sm font-medium outline-none border-2 border-transparent focus:border-orange-400"
          style={{ background: "rgba(255,255,255,0.95)" }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Apna email daalo..."
          required
          className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm font-medium outline-none border-2 border-transparent focus:border-orange-400"
          style={{ background: "rgba(255,255,255,0.95)" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-70 whitespace-nowrap shadow-lg hover:-translate-y-0.5"
          style={{ background: "#FFD700", color: "#7C1D00" }}>
          {status === "loading" ? "⏳..." : "🔔 Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-300 text-xs text-center">{msg}</p>
      )}
      <p className="text-white/50 text-xs text-center">
        Spam nahi karenge • Kabhi bhi unsubscribe kar sakte hain
      </p>
    </form>
  );
}
