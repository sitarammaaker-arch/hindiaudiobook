"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // Simulate form submission (replace with actual email service like EmailJS/Formspree)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  const contactItems = [
    { icon: "📧", label: "General Enquiry", value: "contact@hindiaudiobook.com", href: "mailto:contact@hindiaudiobook.com" },
    { icon: "🚫", label: "DMCA / Copyright", value: "dmca@hindiaudiobook.com", href: "mailto:dmca@hindiaudiobook.com" },
    { icon: "🔒", label: "Privacy Issues", value: "privacy@hindiaudiobook.com", href: "mailto:privacy@hindiaudiobook.com" },
    { icon: "🤝", label: "Collaboration", value: "partner@hindiaudiobook.com", href: "mailto:partner@hindiaudiobook.com" },
  ];

  return (
    <div style={{ background: "#FFF8F5" }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#9CA3AF" }}>
          <Link href="/" className="hover:text-[#FF6B2B] transition-colors">Home</Link>
          <span>/</span>
          <span style={{ color: "#1A1A2E" }}>Contact Us</span>
        </nav>

        <div className="mb-10">
          <h1 className="font-heading font-black mb-2"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            Contact Us
          </h1>
          <p style={{ color: "#9CA3AF", lineHeight: "1.7" }}>
            Koi bhi sawaal, suggestion ya issue ho — hum sunn rahe hain. 48 hours mein reply karte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 border shadow-sm" style={{ borderColor: "rgba(26,26,46,0.08)" }}>
              <h2 className="font-heading font-bold text-xl mb-6" style={{ color: "#1A1A2E" }}>
                Message Bhejein
              </h2>

              {status === "sent" ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#1A1A2E" }}>
                    Message Bhej Diya!
                  </h3>
                  <p style={{ color: "#9CA3AF" }}>Hum 48 hours mein reply karenge aapke email par.</p>
                  <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 btn-primary text-sm px-6 py-2.5">
                    Naya Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                        Naam <span style={{ color: "#FF6B2B" }}>*</span>
                      </label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Aapka naam" required
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                        style={{ borderColor: "rgba(26,26,46,0.15)", fontFamily: "var(--font-inter)", color: "#1A1A2E" }}
                        onFocus={(e) => (e.target.style.borderColor = "#FF6B2B")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(26,26,46,0.15)")} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                        Email <span style={{ color: "#FF6B2B" }}>*</span>
                      </label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="aap@email.com" required
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                        style={{ borderColor: "rgba(26,26,46,0.15)", fontFamily: "var(--font-inter)", color: "#1A1A2E" }}
                        onFocus={(e) => (e.target.style.borderColor = "#FF6B2B")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(26,26,46,0.15)")} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                      Subject
                    </label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                      style={{ borderColor: "rgba(26,26,46,0.15)", fontFamily: "var(--font-inter)", color: form.subject ? "#1A1A2E" : "#9CA3AF" }}
                      onFocus={(e) => (e.target.style.borderColor = "#FF6B2B")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(26,26,46,0.15)")}>
                      <option value="">Subject chunein...</option>
                      <option value="general">General Inquiry</option>
                      <option value="suggestion">Book Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="dmca">Copyright Issue (DMCA)</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                      Message <span style={{ color: "#FF6B2B" }}>*</span>
                    </label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Aapka message yahan likhein..." rows={5} required
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                      style={{ borderColor: "rgba(26,26,46,0.15)", fontFamily: "var(--font-inter)", color: "#1A1A2E" }}
                      onFocus={(e) => (e.target.style.borderColor = "#FF6B2B")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(26,26,46,0.15)")} />
                  </div>

                  <button type="submit" disabled={status === "sending"}
                    className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
                    {status === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Bhej rahe hain...
                      </span>
                    ) : "📩 Message Bhejein"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact details */}
            <div className="bg-white rounded-3xl p-6 border shadow-sm" style={{ borderColor: "rgba(26,26,46,0.08)" }}>
              <h3 className="font-heading font-bold text-lg mb-5" style={{ color: "#1A1A2E" }}>
                Direct Contact
              </h3>
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <a key={item.label} href={item.href}
                    className="flex items-start gap-3 p-3 rounded-xl transition-colors group"
                    style={{ background: "#FFF8F5" }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: "#9CA3AF", fontFamily: "var(--font-inter)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-medium group-hover:text-[#FF6B2B] transition-colors"
                        style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="rounded-2xl p-5"
              style={{ background: "#FFF1EB", border: "1px solid rgba(255,107,43,0.2)" }}>
              <h4 className="font-heading font-bold mb-3" style={{ color: "#E85A1A" }}>
                ⏱ Response Time
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#5A5568", fontFamily: "var(--font-inter)" }}>
                <li>• General queries: 24-48 hours</li>
                <li>• DMCA/Copyright: 24 hours</li>
                <li>• Technical issues: 48-72 hours</li>
                <li>• Collaborations: 72 hours</li>
              </ul>
            </div>

            {/* FAQ link */}
            <Link href="/faq"
              className="flex items-center gap-3 p-5 bg-white rounded-2xl border shadow-sm transition-all hover:border-[rgba(255,107,43,0.3)] hover:shadow-md"
              style={{ borderColor: "rgba(26,26,46,0.08)" }}>
              <span className="text-2xl">❓</span>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1A1A2E", fontFamily: "var(--font-inter)" }}>
                  FAQ dekhen pehle
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                  Shayad aapka sawaal already answer ho
                </p>
              </div>
              <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "#FF6B2B" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
