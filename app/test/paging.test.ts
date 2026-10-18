import { expect, test } from "vite-plus/test";
import { clampPage, PAGE_SIZE, pageCount, pageSlice } from "../src/data/paging";

const items = Array.from({ length: 20 }, (_, index) => index);

test("page size is a 3×3 binder page", () => {
  expect(PAGE_SIZE).toBe(9);
});

test("pageCount rounds up and never drops below one", () => {
  expect(pageCount(0)).toBe(1);
  expect(pageCount(9)).toBe(1);
  expect(pageCount(10)).toBe(2);
  expect(pageCount(2095)).toBe(233);
  expect(pageCount(5, 2)).toBe(3);
});

test("pageSlice returns the rows of a 1-based page", () => {
  expect(pageSlice(items, 1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  expect(pageSlice(items, 3)).toEqual([18, 19]);
  expect(pageSlice(items, 4)).toEqual([]);
  expect(pageSlice([], 1)).toEqual([]);
});

test("clampPage keeps the page inside the range", () => {
  expect(clampPage(0, 20)).toBe(1);
  expect(clampPage(-4, 20)).toBe(1);
  expect(clampPage(2, 20)).toBe(2);
  expect(clampPage(99, 20)).toBe(3);
  expect(clampPage(5, 0)).toBe(1);
});
