import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function SectionHeader({ title, subtitle, viewAllHref, viewAllLabel = "Sab Dekhein" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="font-heading font-black"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
            color: "#1A1A2E",
            letterSpacing: "-0.02em",
            lineHeight: "1.2",
          }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm mt-1.5" style={{ color: "#9CA3AF" }}>{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link href={viewAllHref}
          className="section-viewall text-sm font-semibold flex items-center gap-1 flex-shrink-0"
          style={{ fontFamily: "var(--font-inter)" }}>
          {viewAllLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
