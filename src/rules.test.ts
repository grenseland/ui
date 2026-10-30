import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

test("the scale has exactly 6 font sizes", () => {
  const sizes = css.match(/^\s*--text-[a-z0-9]+:\s*\d/gm) ?? [];
  assert.equal(sizes.length, 6);
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
