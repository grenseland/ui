import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

test("the scale has exactly 6 font sizes", () => {
  const sizes = css.match(/^\s*--text-[a-z0-9]+:\s*\d/gm) ?? [];
  assert.equal(sizes.length, 6);
});

test("the app has exactly 2 fonts", () => {
  const fonts = css.match(/^\s*--font-[a-z]+:/gm) ?? [];
  assert.equal(fonts.length, 2);
  const families = css.match(/font-family:[^;}]+/g) ?? [];
  for (const family of families) assert.match(family, /font-family:\s*(inherit|var\(--font-(sans|mono)\))/);
});

test("spacing uses the scale", () => {
  const rules = css.match(/\b(padding|margin|gap)[a-z-]*:[^;}]+/g) ?? [];
  assert.ok(rules.length > 0);
  for (const rule of rules) assert.doesNotMatch(rule, /\d(px|rem|em)/, rule);
});

test("every font-size uses a variable", () => {
  const sizes = css.match(/font-size:[^;}]+/g) ?? [];
  assert.ok(sizes.length > 0);
  for (const size of sizes) assert.match(size, /font-size:\s*var\(--text-/);
});

test("breakpoints are the two agreed ones", () => {
  const queries = new Set(css.match(/max-width:\s*\d+px/g));
  assert.deepEqual([...queries].sort(), ["max-width: 1023px", "max-width: 767px"]);
});
