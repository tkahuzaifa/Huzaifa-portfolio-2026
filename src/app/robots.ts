import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://huzaifa-portfolio-v2.vercel.app/sitemap.xml",
  };
}
