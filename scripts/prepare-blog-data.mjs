// One-off migration script: ports old_app/data/tbp-blog.json into
// src/data/blog.json, rewriting image paths to be public/-relative and
// substituting a fallback image for posts whose source photo is missing
// (253 of 311 posts point at an `images/PICTURES/...` folder that was
// never actually present in the old site's assets — a pre-existing
// broken-image defect, not content to preserve as-is).
//
// Not part of the build. Re-run only if old_app's blog data changes:
//   node scripts/prepare-blog-data.mjs

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..", "..");
const sourcePath = path.join(repoRoot, "old_app", "data", "tbp-blog.json");
const publicImagesDir = path.join(__dirname, "..", "public", "images");
const outPath = path.join(__dirname, "..", "src", "data", "blog.json");

const FALLBACK_IMAGE = "/images/projects/24 AWOLOWO ROAD/24 AWOLOWO RD 1A copy.jpg";

const posts = JSON.parse(readFileSync(sourcePath, "utf-8"));

let fallbackCount = 0;

const prepared = posts.map((post) => {
  const relative = post.image.replace(/^\.\.\/images\//, "");
  const publicPath = `/images/${relative}`;
  const diskPath = path.join(publicImagesDir, relative);
  const resolvedImage = existsSync(diskPath) ? publicPath : FALLBACK_IMAGE;
  if (resolvedImage === FALLBACK_IMAGE) fallbackCount += 1;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    image: resolvedImage,
    date: post.date,
    readTime: post.readTime,
    author: post.author,
    content: post.content,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    serviceTags: post.serviceTags ?? [],
  };
});

writeFileSync(outPath, JSON.stringify(prepared, null, 2) + "\n");

console.log(`Wrote ${prepared.length} posts to ${path.relative(repoRoot, outPath)}`);
console.log(`${fallbackCount} posts fell back to the default image (source photo missing from old_app/images).`);
