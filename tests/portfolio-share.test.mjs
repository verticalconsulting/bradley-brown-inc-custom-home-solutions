import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  copyPortfolioLink,
  PORTFOLIO_SHARE_DATA,
  PORTFOLIO_URL,
  sharePortfolio,
} from "../src/components/portfolio/portfolioShare.mjs";

const url = "https://bradleybrowninc.com/portfolio";

function legacyDocument(copyResult = true) {
  const state = { appended: false, removed: false, selected: false, restored: false };
  const field = {
    style: {},
    setAttribute() {},
    focus() {},
    select() { state.selected = true; },
    setSelectionRange(start, end) { state.range = [start, end]; },
    remove() { state.removed = true; },
  };
  return {
    state,
    document: {
      body: { appendChild(element) { state.appended = true; state.value = element.value; } },
      activeElement: { focus() { state.restored = true; } },
      createElement() { return field; },
      execCommand(command) { assert.equal(command, "copy"); return copyResult; },
    },
  };
}

test("destination is exactly the published portfolio and contains no tracking/customer data", () => {
  assert.equal(PORTFOLIO_URL, url);
  assert.deepEqual(PORTFOLIO_SHARE_DATA, {
    title: "Bradley Brown Inc. | Project Portfolio",
    text: "Explore Bradley Brown Inc.'s project portfolio.",
    url,
  });
});

test("native share receives the correct payload synchronously from the click path", async () => {
  let called = false;
  let copied = false;
  const pending = sharePortfolio({ navigator: {
    share(data) { called = true; assert.deepEqual(data, PORTFOLIO_SHARE_DATA); return Promise.resolve(); },
    clipboard: { writeText() { copied = true; } },
  } });
  assert.equal(called, true);
  assert.equal(await pending, "shared");
  assert.equal(copied, false);
});

test("unsupported native sharing falls back to clipboard", async () => {
  let copied;
  assert.equal(await sharePortfolio({ navigator: {
    clipboard: { async writeText(value) { copied = value; } },
  } }), "copied");
  assert.equal(copied, url);
});

test("copy link works independently even when native sharing exists", async () => {
  let copied;
  assert.equal(await copyPortfolioLink({ navigator: {
    share() { assert.fail("Copy link must not open a share sheet"); },
    clipboard: { async writeText(value) { copied = value; } },
  } }), "copied");
  assert.equal(copied, url);
});

test("native cancellation does not modify the clipboard", async () => {
  assert.equal(await sharePortfolio({ navigator: {
    async share() { throw Object.assign(new Error("Cancelled"), { name: "AbortError" }); },
    clipboard: { writeText() { assert.fail("Cancellation must not copy"); } },
  } }), "cancelled");
});

test("native share rejection falls back to copying", async () => {
  let copied;
  assert.equal(await sharePortfolio({ navigator: {
    async share() { throw new Error("Permission denied"); },
    clipboard: { async writeText(value) { copied = value; } },
  } }), "copied");
  assert.equal(copied, url);
});

test("legacy fallback copies exact URL, removes temporary field and restores focus", async () => {
  const { document, state } = legacyDocument();
  assert.equal(await copyPortfolioLink({ navigator: {}, document }), "copied");
  assert.deepEqual(state, {
    appended: true, removed: true, selected: true, restored: true,
    range: [0, url.length], value: url,
  });
});

test("denied clipboard permission tries legacy copy", async () => {
  const { document, state } = legacyDocument();
  assert.equal(await copyPortfolioLink({ navigator: {
    clipboard: { async writeText() { throw new Error("Denied"); } },
  }, document }), "copied");
  assert.equal(state.value, url);
});

test("failed legacy copy requests manual copy instead of falsely reporting success", async () => {
  const { document, state } = legacyDocument(false);
  assert.equal(await copyPortfolioLink({ navigator: {}, document }), "manual");
  assert.equal(state.removed, true);
  assert.equal(state.restored, true);
});

test("legacy exceptions still clean up and request manual copy", async () => {
  const { document, state } = legacyDocument();
  document.execCommand = () => { throw new Error("Unavailable"); };
  assert.equal(await copyPortfolioLink({ navigator: {}, document }), "manual");
  assert.equal(state.removed, true);
});

test("missing browser APIs fail safely", async () => {
  assert.equal(await sharePortfolio({}), "manual");
});

test("share panel is in normal document flow before gallery and preserves published filter", async () => {
  const page = await readFile(new URL("../src/pages/Portfolio.jsx", import.meta.url), "utf8");
  const panel = await readFile(new URL("../src/components/portfolio/PortfolioShare.jsx", import.meta.url), "utf8");
  assert.match(page, /Project\.filter\(\{ status: "published" \}/);
  assert.equal((page.match(/<PortfolioShare \/>/g) || []).length, 1);
  assert.ok(page.indexOf("<PortfolioShare />") < page.indexOf("{loading ? ("));
  assert.doesNotMatch(panel, /\b(?:fixed|sticky|absolute)\b|https:\/\/(?:www\.)?(?:facebook|instagram|tiktok)/);
  assert.match(panel, /min-h-11/);
  assert.match(panel, /flex-col/);
  assert.match(panel, /aria-live="polite"/);
  assert.match(panel, /type="button"/);
  assert.match(panel, /readOnly/);
});
