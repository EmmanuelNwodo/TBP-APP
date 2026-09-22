import type { NextConfig } from "next";

import path from "node:path";

import servicesData from "./src/data/services.json";
import { buildServiceMigrationRedirects, LEGACY_REDIRECTS } from "./src/lib/legacy-redirects";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "blog.buildingpractice.biz",
      },
    ],
  },

  /**
   * Single application redirect layer. Sources come from
   * `src/lib/legacy-redirects.ts`, which is also used by the article
   * link-normalisation pipeline so in-body links and HTTP redirects can never
   * disagree.
   *
   * Trailing-slash variants are handled by the project's global convention
   * (`trailingSlash` is left at its default `false`), so `/about-us/` is first
   * normalised to `/about-us` by Next.js and then redirected here.
   */
  async redirects() {
    return [
      // `/blog/page` on its own is not an article; send it to the archive
      // before the generic `/blog/:slug` article rule can claim it.
      {
        source: "/blog/page",
        destination: "/blog",
        permanent: true,
      },
      // Historic pagination. WordPress used a different page size, so page
      // numbers are not equivalent; the archive itself is the only safe
      // destination that is guaranteed to exist.
      {
        source: "/news/page/:page",
        destination: "/blog",
        permanent: true,
      },
      // Articles moved from /blog/<slug> to root-level /<slug>.
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Service-as-firm migration: every retired service URL goes straight to
      // its final canonical URL. Generated from the service source of truth,
      // so the two can never drift apart.
      ...buildServiceMigrationRedirects(servicesData).map((entry) => ({
        source: entry.source,
        destination: entry.destination,
        permanent: true,
      })),
      ...LEGACY_REDIRECTS.map((entry) => ({
        source: entry.source,
        destination: entry.destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
