import Link from "next/link";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div style={{ background: "#FFF8F5" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#9CA3AF" }}>
          <Link href="/" className="hover-brand transition-colors" style={{ color: "#9CA3AF" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "#1A1A2E" }}>{title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading font-black mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            {title}
          </h1>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            Last updated: {lastUpdated} &nbsp;|&nbsp; HindiAudiobook.com
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border"
          style={{ borderColor: "rgba(26,26,46,0.08)" }}>
          <div className="legal-content" style={{ color: "#5A5568", lineHeight: "1.8", fontSize: "15px" }}>
            {children}
          </div>
        </div>

        {/* Footer legal nav — CSS hover only */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {[
            { label: "Privacy Policy",    href: "/privacy-policy" },
            { label: "Terms & Conditions",href: "/terms-conditions" },
            { label: "Disclaimer",        href: "/disclaimer" },
            { label: "DMCA",              href: "/dmca" },
            { label: "Contact Us",        href: "/contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="legal-nav-link text-xs font-medium px-4 py-2 rounded-full border transition-colors"
              style={{ color: "#9CA3AF", borderColor: "rgba(26,26,46,0.12)", fontFamily: "var(--font-inter)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Legal content styles */}
      <style>{`
        .legal-content h2 {
          font-family: var(--font-merriweather);
          font-size: 1.2rem;
          font-weight: 700;
          color: #1A1A2E;
          margin: 2rem 0 0.75rem;
          letter-spacing: -0.01em;
        }
        .legal-content h3 {
          font-family: var(--font-inter);
          font-size: 1rem;
          font-weight: 600;
          color: #1A1A2E;
          margin: 1.5rem 0 0.5rem;
        }
        .legal-content p { margin-bottom: 1rem; }
        .legal-content ul { margin: 0.75rem 0 1rem 1.5rem; }
        .legal-content li { margin-bottom: 0.4rem; list-style: disc; }
        .legal-content a { color: #FF6B2B; text-decoration: underline; }
        .legal-content strong { color: #1A1A2E; font-weight: 600; }
        .legal-content .highlight-box {
          background: #FFF1EB;
          border-left: 3px solid #FF6B2B;
          border-radius: 0 8px 8px 0;
          padding: 12px 16px;
          margin: 1rem 0;
        }
        .legal-nav-link:hover {
          color: #FF6B2B !important;
          border-color: rgba(255,107,43,0.3) !important;
        }
      `}</style>
    </div>
  );
}
