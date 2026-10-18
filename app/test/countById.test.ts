import { expect, test } from "vite-plus/test";
import { parseCards } from "../src/data/schema";
import { countById } from "../src/data/countById";
import fixture from "./fixtures/cards.json";

test("countById counts repeated ids across the whole collection", () => {
  const counts = countById(parseCards(fixture));
  expect(counts.get("base1-100")).toBe(3);
  expect(counts.get("base1-68")).toBe(1);
  expect(counts.get("nope-1")).toBeUndefined();
});

test("countById on an empty list is empty", () => {
  expect(countById([]).size).toBe(0);
});
