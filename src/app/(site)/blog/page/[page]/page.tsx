import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Architecture Blog Nigeria | Project Management, Urban Development & Design Insights";
const DESCRIPTION =
  "Architecture blog Nigeria featuring expert insights on architectural design, project management services, urban development, sustainable building, and construction trends across Lagos, Abuja, and Port Harcourt.";

/**
 * Rendered on demand, matching /blog. Nothing is pre-rendered at build time,
 * so a slow or unreachable CMS can never fail a deployment; the CMS read
 * itself is still cached by the data layer.
 */
export const dynamic = "force-dynamic";

/** Parse `[page]`, rejecting anything that is not a plain integer above 1. */
function parsePage(raw: string): number | null {
  if (!/^[1-9][0-9]*$/.test(raw)) return null;
  const page = Number.parseInt(raw, 10);
  return Number.isSafeInteger(page) ? page : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: rawPage } = await params;
  const page = parsePage(rawPage);
  if (page === null) return {};

  const title = `${TITLE} | Page ${page}`;
  const url = absoluteUrl(`/blog/page/${page}`);

  return {
    title,
    description: DESCRIPTION,
    // Each paginated page is its own canonical: it lists different articles,
    // so pointing it at /blog would hide those links from indexing.
    alternates: { canonical: url },
    openGraph: { title, description: DESCRIPTION, url },
  };
}

export default async function BlogPaginationPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: rawPage } = await params;
  const page = parsePage(rawPage);

  if (page === null) notFound();
  // Page 1 lives at /blog; keep a single canonical URL for it.
  if (page === 1) permanentRedirect("/blog");

  return <BlogArchive page={page} />;
}
