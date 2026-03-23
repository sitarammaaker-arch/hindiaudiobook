/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i3.ytimg.com" },
      { protocol: "https", hostname: "archive.org" },
      { protocol: "https", hostname: "**.archive.org" },
    ],
    // Unoptimized for external images — avoids domain issues
    unoptimized: true,
  },

  async redirects() {
    return [
      // ── Non-www → www ──────────────────────────────────────────
      {
        source: "/:path*",
        has: [{ type: "host", value: "hindiaudiobook.com" }],
        destination: "https://www.hindiaudiobook.com/:path*",
        permanent: true,
      },

      // ── Purani Squarespace product pages → Homepage ────────────
      {
        source: "/product-page/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products/:slug*",
        destination: "/",
        permanent: true,
      },

      // ── Purani category pages → Nearest new category ───────────
      {
        source: "/category/share-market-trading",
        destination: "/category/trading-psychology",
        permanent: true,
      },
      {
        source: "/category/self-help-personal-development",
        destination: "/category/self-help",
        permanent: true,
      },
      {
        source: "/category/spiritual-motivation",
        destination: "/category/spiritual",
        permanent: true,
      },
      {
        source: "/category/biography",
        destination: "/",
        permanent: true,
      },

      // ── Purane blog posts → Homepage ───────────────────────────
      {
        source: "/post/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/",
        permanent: true,
      },

      // ── Purani specific pages → Nearest new page ───────────────
      {
        source: "/podcast",
        destination: "/",
        permanent: true,
      },
      {
        source: "/plans",
        destination: "/",
        permanent: true,
      },
      {
        source: "/resource",
        destination: "/",
        permanent: true,
      },
      {
        source: "/plan",
        destination: "/",
        permanent: true,
      },
      {
        source: "/episodes",
        destination: "/",
        permanent: true,
      },
      {
        source: "/store",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "/",
        permanent: true,
      },
      {
        source: "/collections/:slug*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
