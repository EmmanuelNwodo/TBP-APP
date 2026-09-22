import { SITEMAP_STYLESHEET } from "@/lib/sitemap/stylesheet";
import { xmlResponse } from "@/lib/sitemap/xml";

/**
 * Shared presentation stylesheet for every sitemap. Static content, so it is
 * cached aggressively; the sitemaps themselves remain valid without it.
 */
export const dynamic = "force-static";

export function GET() {
  return xmlResponse(SITEMAP_STYLESHEET, "text/xsl; charset=utf-8");
}
