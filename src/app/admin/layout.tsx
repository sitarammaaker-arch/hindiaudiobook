"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const adminNavLinks = [
  { href: "/admin/upload", label: "⬆️ Upload", desc: "Audiobooks upload karein" },
  { href: "/admin/upload#chapter", label: "📑 Chapters", desc: "Chapters add karein" },
  { href: "/admin/upload#manage", label: "🗂️ Manage", desc: "Content manage karein" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin-auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin top bar */}
      <div className="bg-gray-900 text-white px-4 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[#FFF1EB]0 rounded-lg flex items-center justify-center text-sm group-hover:bg-indigo-400 transition-colors">
              🎧
            </div>
            <span className="text-white font-semibold text-sm hidden sm:block">
              HindiAudiobook <span className="text-gray-400">/ Admin</span>
            </span>
          </Link>

          {/* Admin nav links */}
          <div className="hidden md:flex items-center gap-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white hover:bg-white/10 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View site */}
          <Link
            href="/"
            target="_blank"
            className="text-gray-400 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all hidden sm:flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </Link>

          {/* Admin badge */}
          <div className="flex items-center gap-1.5 bg-green-900/50 border border-green-700/50 px-3 py-1.5 rounded-lg">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">Admin</span>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 bg-red-900/40 hover:bg-red-800/60 border border-red-700/40 text-red-300 hover:text-red-200 text-xs font-medium px-3 py-1.5 rounded-lg transition-all disabled:opacity-60"
          >
            {loggingOut ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            )}
            Logout
          </button>
        </div>
      </div>

      {/* Page content */}
      {children}
    </div>
  );
}
