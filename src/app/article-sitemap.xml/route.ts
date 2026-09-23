import { CmsUnavailableError } from "@/lib/blog";
import { getSitemapGroup } from "@/lib/sitemap/data";
import { emptyGroup } from "@/lib/sitemap/inventory";
import { renderUrlSet, xmlResponse, xmlUnavailableResponse } from "@/lib/sitemap/xml";

/**
 * The only sitemap that depends on WordPress.
 *
 * A CMS failure is answered with 503 + Retry-After rather than an uncaught
 * error, which the framework would turn into an HTML page. Publishing a
 * partial article list is not an option either: the missing URLs would look
 * retired, so the route serves the complete list or declines to answer.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const group = await getSitemapGroup("article");
    return xmlResponse(renderUrlSet(group ?? emptyGroup("article")));
  } catch (error) {
    if (error instanceof CmsUnavailableError) {
      console.error(`[sitemap] article sitemap unavailable: ${error.message}`);
      return xmlUnavailableResponse();
    }
    throw error;
  }
}
