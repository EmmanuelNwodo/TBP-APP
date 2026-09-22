import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { buildSitemapGroups } from "../src/lib/sitemap/inventory.ts";
import {
  WHATSAPP_ACCESSIBLE_NAME,
  WHATSAPP_CHAT_URL,
  WHATSAPP_PREFILLED_MESSAGE,
  WHATSAPP_VISIBLE_LABEL,
} from "../src/lib/whatsapp.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE = "https://www.buildingpractice.biz";

const COMPONENT = readFileSync(
  path.join(ROOT, "src/components/contact/WhatsAppChatButton.tsx"),
  "utf8",
);
const STYLES = readFileSync(
  path.join(ROOT, "src/components/contact/WhatsAppChatButton.module.css"),
  "utf8",
);
const SITE_LAYOUT = readFileSync(path.join(ROOT, "src/app/(site)/layout.tsx"), "utf8");
const CONFIG = readFileSync(path.join(ROOT, "src/lib/whatsapp.ts"), "utf8");

const NUMBER = "2349049721840";
const MESSAGE = WHATSAPP_PREFILLED_MESSAGE;

// --- Placement --------------------------------------------------------------

test("the component is rendered exactly once, in the shared public layout", () => {
  assert.equal(
    (SITE_LAYOUT.match(/<WhatsAppChatButton\s*\/>/g) ?? []).length,
    1,
    "must be rendered exactly once in (site)/layout.tsx",
  );
  assert.ok(SITE_LAYOUT.includes('from "@/components/contact/WhatsAppChatButton"'));
});

test("no other layout or page renders a second copy", () => {
  const files: string[] = [];
  (function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.tsx$/.test(entry)) files.push(full);
    }
  })(path.join(ROOT, "src"));

  const renderers = files.filter((file) => {
    if (file.endsWith(path.join("contact", "WhatsAppChatButton.tsx"))) return false;
    return /<WhatsAppChatButton\s*\/>/.test(readFileSync(file, "utf8"));
  });

  // The privacy page is the one documented exception: it lives outside the
  // (site) route group and so never mounts the shared layout.
  assert.deepEqual(
    renderers.map((f) => path.relative(ROOT, f).replace(/\\/g, "/")).sort(),
    ["src/app/(site)/layout.tsx", "src/app/privacy/page.tsx"],
    "only the shared public layout, plus the layout-less privacy page, may render it",
  );
});

test("the admin layout does not render it", () => {
  const adminLayout = readFileSync(path.join(ROOT, "src/app/admin/layout.tsx"), "utf8");
  assert.ok(!adminLayout.includes("WhatsAppChatButton"));
});

// --- Link correctness -------------------------------------------------------

test("the link points at the approved wa.me number", () => {
  const url = new URL(WHATSAPP_CHAT_URL);

  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, `/${NUMBER}`);
  assert.ok(WHATSAPP_CHAT_URL.startsWith(`https://wa.me/${NUMBER}`));
  // No spaces, no plus sign, digits only.
  assert.match(url.pathname.slice(1), /^\d+$/);
});

test("the prefilled message is correctly encoded and round-trips", () => {
  const url = new URL(WHATSAPP_CHAT_URL);

  assert.equal(url.searchParams.get("text"), MESSAGE);
  assert.ok(
    WHATSAPP_CHAT_URL.includes(`text=${encodeURIComponent(MESSAGE)}`),
    "query string must be produced by encodeURIComponent",
  );
  // A raw space or comma would mean the query string was hand-written.
  assert.ok(!WHATSAPP_CHAT_URL.includes(" "));
  assert.ok(!/[?&]text=[^&]*,/.test(WHATSAPP_CHAT_URL));
});

test("the URL is built with encodeURIComponent rather than hard-coded", () => {
  assert.ok(CONFIG.includes("encodeURIComponent("));
  assert.ok(!/https:\/\/wa\.me\/\d+\?text=[A-Za-z0-9%]/.test(CONFIG), "no hard-coded query string");
});

// --- Anchor semantics -------------------------------------------------------

test("the anchor opens in a new tab safely", () => {
  assert.ok(COMPONENT.includes('target="_blank"'));
  assert.ok(COMPONENT.includes('rel="noopener noreferrer"'));
});

test("the anchor is a crawl-safe server-rendered link", () => {
  assert.ok(COMPONENT.includes("href={WHATSAPP_CHAT_URL}"));
  assert.ok(!COMPONENT.includes('"use client"'), "must not be a client component");
  assert.ok(!/onClick|useEffect|useState/.test(COMPONENT), "must need no client-side JavaScript");
});

// --- Accessibility ----------------------------------------------------------

test("the button has an accessible name containing its visible label", () => {
  assert.ok(
    /aria-label=\{WHATSAPP_ACCESSIBLE_NAME\}/.test(COMPONENT),
    "anchor must carry aria-label",
  );

  const name = WHATSAPP_ACCESSIBLE_NAME;
  const visible = WHATSAPP_VISIBLE_LABEL;
  assert.ok(name.length > 0 && visible.length > 0);
  assert.ok(name.toLowerCase().includes("whatsapp"), "name should identify the channel");
  assert.ok(
    name.toLowerCase().includes(visible.toLowerCase()),
    "WCAG 2.5.3: the accessible name must contain the visible label",
  );
});

test("the icon is hidden from assistive technology", () => {
  assert.match(COMPONENT, /<i className=\{`bx bxl-whatsapp \$\{styles\.icon\}`\} aria-hidden="true"/);
});

test("the touch target meets the 44px minimum at every breakpoint", () => {
  const sizes = [...STYLES.matchAll(/--wa-size:\s*(\d+)px/g)].map((m) => Number(m[1]));
  assert.ok(sizes.length >= 2, "expected a desktop and a mobile size");
  for (const size of sizes) assert.ok(size >= 44, `touch target ${size}px is below 44px`);
});

test("focus, reduced-motion and print styles are present", () => {
  assert.ok(STYLES.includes(":focus-visible"), "keyboard focus state");
  assert.ok(STYLES.includes("outline:"), "visible focus indicator");
  assert.ok(STYLES.includes("@media (prefers-reduced-motion: reduce)"));
  assert.ok(/@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none/.test(STYLES));
  assert.ok(/@media print[\s\S]*display: none/.test(STYLES));
});

test("the button sits below the header so it cannot cover the mobile nav", () => {
  const zIndex = Number(/z-index:\s*(\d+)/.exec(STYLES)?.[1]);
  const headerZ = Number(
    /z-index:\s*(\d+)/.exec(readFileSync(path.join(ROOT, "src/components/layout/Header.module.css"), "utf8"))?.[1],
  );
  assert.ok(Number.isFinite(zIndex) && Number.isFinite(headerZ));
  assert.ok(zIndex < headerZ, `z-index ${zIndex} must be below the header's ${headerZ}`);
  assert.ok(zIndex > 100, "but still above ordinary page content");
});

test("it is offset above the existing floating theme toggle", () => {
  assert.ok(STYLES.includes("--wa-stack"), "stack offset must be declared");
  assert.ok(STYLES.includes("env(safe-area-inset-bottom)"), "safe-area inset respected");
  assert.ok(STYLES.includes("env(safe-area-inset-right)"));
  assert.ok(STYLES.includes("position: fixed"), "fixed positioning avoids layout shift");
});

// --- No third-party payload -------------------------------------------------

test("no external widget script or remote asset is introduced", () => {
  for (const source of [COMPONENT, STYLES, CONFIG]) {
    assert.ok(!/<script/i.test(source), "no script tag");
    assert.ok(!/\bsrc=/.test(source), "no remote asset");
    assert.ok(!/@import\s+url\(/.test(source), "no remote stylesheet");
    assert.ok(!/localStorage|sessionStorage|document\.cookie/.test(source), "no storage or cookies");
  }
  // Only wa.me may appear as an external host.
  const hosts = [...CONFIG.matchAll(/https?:\/\/([^/"`\s]+)/g)].map((m) => m[1]);
  assert.deepEqual([...new Set(hosts)], ["wa.me"]);
});

test("the layout gained no third-party script", () => {
  assert.ok(!/<script/i.test(SITE_LAYOUT));
});

// --- SEO safety -------------------------------------------------------------

test("the component does not alter sitemap membership", () => {
  const services = JSON.parse(readFileSync(path.join(ROOT, "src/data/services.json"), "utf8"));
  const projects = JSON.parse(readFileSync(path.join(ROOT, "src/data/projects.json"), "utf8"));
  const team = JSON.parse(readFileSync(path.join(ROOT, "src/data/team.json"), "utf8"));
  const articles = Array.from({ length: 286 }, (_, i) => ({
    id: i + 1,
    slug: `article-${i + 1}`,
    modified: "2026-09-01T00:00:00Z",
  }));

  const groups = buildSitemapGroups({ siteUrl: SITE, services, projects, team, articles });
  const urls = groups.flatMap((g) => g.urls.map((u) => u.loc));

  assert.equal(urls.length, 426);
  assert.equal(new Set(urls).size, 426);
  assert.ok(!urls.some((u) => u.includes("wa.me")), "no WhatsApp URL in any sitemap");
  assert.ok(!urls.some((u) => u.includes("whatsapp")));
});

test("structured data was not changed to advertise WhatsApp", () => {
  const rootLayout = readFileSync(path.join(ROOT, "src/app/layout.tsx"), "utf8");
  assert.ok(!rootLayout.includes("wa.me"), "root layout JSON-LD must stay unchanged");
});
