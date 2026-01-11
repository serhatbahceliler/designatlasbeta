import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/", "/api/", "/case-atolyesi"],
    },
    sitemap: "https://www.designatlas.io/sitemap.xml",
  };
}
