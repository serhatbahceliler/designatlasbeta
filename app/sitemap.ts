import { MetadataRoute } from "next";

const roadmaps = [
  "ux-designer",
  "ui-designer",
  "product-designer",
  "design-system",
  "design-thinking",
];

const kutuphaneArticles = [
  "kullanilabilirlik-testi",
  "portfolio-case-study",
  "user-flow-task-flow",
  "kullanici-gorusmesi",
  "ux-nedir",
  "ui-nedir",
  "ux-ui-farki",
  "wireframe-nedir",
  "persona-olusturma",
  "ux-mulakat-sorulari",
  "product-design-nedir",
  "prototype-nedir",
  "wireframe-mockup-prototype",
  "information-architecture",
  "user-journey-map",
  "empathy-map",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.designatlas.io";

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
    ...kutuphaneArticles.map((slug) => ({
      url: `${baseUrl}/kutuphane/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return routes;
}
