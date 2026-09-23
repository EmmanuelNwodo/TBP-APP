import { getSitemapGroup } from "@/lib/sitemap/data";
import { emptyGroup } from "@/lib/sitemap/inventory";
import { renderUrlSet, xmlResponse } from "@/lib/sitemap/xml";

/**
 * Built entirely from repository data, so this route makes no CMS request and
 * cannot fail because WordPress is slow or unreachable.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const group = await getSitemapGroup("service");

  // A group is only ever missing when its collection is empty. That renders as
  // a valid, empty <urlset> rather than the framework's HTML 404 page, because
  // an HTML body is exactly what a crawler reports as an unreadable sitemap.
  return xmlResponse(renderUrlSet(group ?? emptyGroup("service")));
}
