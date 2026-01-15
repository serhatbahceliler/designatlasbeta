import { MetadataRoute } from "next";
import { MOCK_ARTICLES } from "@/lib/articles";

const roadmaps = [
  "ux-designer",
  "ui-designer",
  "product-designer",
  "design-system",
  "design-thinking",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.designatlas.io";

  // Get article slugs from MOCK_ARTICLES array
  const kutuphaneArticleSlugs = MOCK_ARTICLES.map((article) => article.slug);

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ux-sozluk`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kutuphane`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...roadmaps.map((slug) => ({
      url: `${baseUrl}/roadmap/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...kutuphaneArticleSlugs.map((slug) => ({
      url: `${baseUrl}/kutuphane/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return routes;
}
