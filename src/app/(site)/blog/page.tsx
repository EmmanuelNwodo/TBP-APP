import type { Metadata } from "next";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Architecture Blog Nigeria | Project Management, Urban Development & Design Insights";
const DESCRIPTION =
  "Architecture blog Nigeria featuring expert insights on architectural design, project management services, urban development, sustainable building, and construction trends across Lagos, Abuja, and Port Harcourt.";

/**
 * Rendered on demand rather than pre-rendered at build time.
 *
 * Pre-rendering the archive made every deployment depend on a CMS request
 * succeeding during `next build`; a single connection timeout failed the whole
 * build. The underlying CMS read is still cached (see `REVALIDATE_SECONDS` in
 * lib/blog.ts), so this costs a cheap re-render, not a new CMS round trip.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/blog") },
};

export default function BlogPage() {
  return <BlogArchive page={1} />;
}
