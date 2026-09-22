import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Public crawling stays fully open. Only the admin surface and the API
 * endpoints are disallowed - never CSS, JavaScript, fonts, images or any CMS
 * media the pages need in order to render.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
