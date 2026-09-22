import { notFound } from "next/navigation";
import { getSitemapGroup } from "@/lib/sitemap/data";
import { renderUrlSet, xmlResponse } from "@/lib/sitemap/xml";

export const dynamic = "force-dynamic";

export async function GET() {
  const group = await getSitemapGroup("project");
  // An empty group is never published as a sitemap.
  if (!group) notFound();

  return xmlResponse(renderUrlSet(group));
}
