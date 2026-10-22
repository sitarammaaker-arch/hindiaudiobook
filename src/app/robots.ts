import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin screens and JSON endpoints have nothing for search results
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://www.hindiaudiobook.com/sitemap.xml",
  };
}
