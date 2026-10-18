import { expect, test } from "vite-plus/test";
import { countById } from "../src/data/copies";
import { parseCards } from "../src/data/schema";
import fixture from "./fixtures/cards.json";

test("countById counts repeated rows per id", () => {
  const counts = countById(parseCards(fixture));
  expect(counts.get("base1-100")).toBe(3);
  expect(counts.get("base3-18")).toBe(1);
  expect(counts.get("nope-1")).toBeUndefined();
});
