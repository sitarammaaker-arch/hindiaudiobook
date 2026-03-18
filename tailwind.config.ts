import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Brand Color System — Saffron Orange + Dark Navy ──────────────────
      colors: {
        brand: {
          DEFAULT: "#FF6B2B",
          hover:   "#E85A1A",
          light:   "#FFF1EB",
          secondary: "#FF9A5C",
          dark:    "#C94A15",
        },
        navy: {
          DEFAULT: "#1A1A2E",
          700: "#252540",
          600: "#2F2F52",
          500: "#3D3D66",
        },
        warm: {
          50:  "#FFF8F5",
          100: "#FFF1EB",
          200: "#FFD8C2",
          300: "#FFB899",
          bg:  "#FFF8F5",
          card:"#FFFFFF",
          muted:"#F5F0EB",
        },
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Merriweather", "Georgia", "serif"],
        display: ["Merriweather", "Georgia", "serif"],
        mono:    ["JetBrains Mono", "Menlo", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      lineHeight: {
        relaxed: "1.7",
        loose:   "1.8",
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight:   "-0.02em",
        snug:    "-0.01em",
      },

      // ── Spacing extras ────────────────────────────────────────────────────
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },

      // ── Shadows ────────────────────────────────────────────────────────────
      boxShadow: {
        card:  "0 1px 3px rgba(26,26,46,0.06), 0 1px 2px rgba(26,26,46,0.04)",
        hover: "0 8px 24px rgba(255,107,43,0.12), 0 2px 8px rgba(26,26,46,0.08)",
        brand: "0 4px 16px rgba(255,107,43,0.30)",
        nav:   "0 1px 0 rgba(26,26,46,0.08)",
      },

      // ── Animations ────────────────────────────────────────────────────────
      animation: {
        "fade-up":    "fadeUp 0.5s ease-out forwards",
        "fade-in":    "fadeIn 0.3s ease-out forwards",
        shimmer:      "shimmer 1.5s infinite",
        wave:         "wave 1s ease-in-out infinite",
        "pulse-brand":"pulseBrand 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        wave: {
          "0%,100%": { transform: "scaleY(0.4)" },
          "50%":     { transform: "scaleY(1)" },
        },
        pulseBrand: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
