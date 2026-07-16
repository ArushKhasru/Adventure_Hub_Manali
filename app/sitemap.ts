import type { MetadataRoute } from "next";

const siteUrl = "https://adventure-hub-manali.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/activities`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/hotel`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/travel`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/how-you-feel`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
