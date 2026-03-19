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
      {
        source: "/:path*",
        has: [{ type: "host", value: "hindiaudiobook.com" }],
        destination: "https://www.hindiaudiobook.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
