import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://usama-portfolio-v2.vercel.app/", lastModified: new Date() },
    {
      url: "https://usama-portfolio-v2.vercel.app/projects",
      lastModified: new Date(),
    },
  ];
}
