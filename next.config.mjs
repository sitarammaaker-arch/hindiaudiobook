/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com", "i.ytimg.com", "archive.org"],
  },

  // Redirect non-www → www (canonical domain)
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
