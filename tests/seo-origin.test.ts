import test from "node:test";
import assert from "node:assert/strict";

import { __resolveSiteUrlForTests as resolveSiteUrl } from "../src/lib/seo.ts";

const CANONICAL = "https://www.buildingpractice.biz";

test("falls back to the canonical origin when the env var is absent", () => {
  assert.equal(resolveSiteUrl(undefined), CANONICAL);
});

test("an empty or whitespace env value never becomes the canonical origin", () => {
  assert.equal(resolveSiteUrl(""), CANONICAL);
  assert.equal(resolveSiteUrl("   "), CANONICAL);
});

test("a configured origin is used, with any trailing slash or path removed", () => {
  assert.equal(resolveSiteUrl("https://www.buildingpractice.biz/"), CANONICAL);
  assert.equal(resolveSiteUrl("https://www.buildingpractice.biz/some/path/"), CANONICAL);
  assert.equal(resolveSiteUrl("https://staging.example.com/"), "https://staging.example.com");
});

test("preview deployment hosts cannot become production canonicals", () => {
  assert.equal(resolveSiteUrl("https://tbp-app-git-main-team.vercel.app"), CANONICAL);
  assert.equal(resolveSiteUrl("https://something.vercel.sh"), CANONICAL);
});

test("the CMS origin cannot become the public canonical", () => {
  assert.equal(resolveSiteUrl("https://blog.buildingpractice.biz"), CANONICAL);
});

test("malformed or non-http values are rejected", () => {
  assert.equal(resolveSiteUrl("not a url"), CANONICAL);
  assert.equal(resolveSiteUrl("ftp://www.buildingpractice.biz"), CANONICAL);
  assert.equal(resolveSiteUrl("javascript:alert(1)"), CANONICAL);
});

test("the dead domain is never produced by the resolver", () => {
  for (const value of [undefined, "", "https://thebuildingpractice.com"]) {
    assert.notEqual(resolveSiteUrl(value), "https://thebuildingpractice.com");
  }
});
