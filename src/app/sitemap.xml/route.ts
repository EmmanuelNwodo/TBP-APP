import { getSitemapGroups } from "@/lib/sitemap/data";
import { renderSitemapIndex, xmlResponse } from "@/lib/sitemap/xml";
import { SITE_URL } from "@/lib/seo";

/**
 * The submitted sitemap address, now a sitemap index.
 *
 * Generated per request for the same reason the previous implementation was:
 * building it during `next build` made deployments depend on the CMS, and a
 * partial read produced a file that looked complete. A CMS failure throws here
 * and surfaces as an error the crawler retries.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const groups = await getSitemapGroups();
  return xmlResponse(renderSitemapIndex(groups, SITE_URL));
}
