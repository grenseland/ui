import assert from "node:assert/strict";
import { test } from "node:test";
import { byPosition, tabletSpan } from "./grid.ts";

test("tablet span halves the width and rounds up", () => {
  assert.equal(tabletSpan(1), 1);
  assert.equal(tabletSpan(3), 2);
  assert.equal(tabletSpan(6), 3);
  assert.equal(tabletSpan(12), 6);
});

test("items are read row by row", () => {
  const sorted = byPosition([{ x: 6, y: 0 }, { x: 0, y: 4 }, { x: 0, y: 0 }]);
  assert.deepEqual(sorted, [{ x: 0, y: 0 }, { x: 6, y: 0 }, { x: 0, y: 4 }]);
});
