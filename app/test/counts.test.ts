import { expect, test } from "vite-plus/test";
import { byCount, countIds } from "../src/data/counts";
import { parseCards } from "../src/data/schema";
import fixture from "./fixtures/cards.json";

const cards = parseCards(fixture);

test("countIds counts repeated rows per id", () => {
  const first = cards[0];
  if (first === undefined) throw new Error("empty fixture");
  const counts = countIds([...cards, first, first]);
  expect(counts.get(first.id)).toBe((countIds(cards).get(first.id) ?? 0) + 2);
  expect(countIds([]).size).toBe(0);
});

test("byCount sorts by count desc, ties by value, without mutating", () => {
  const facets = [
    { value: "xy10", count: 2 },
    { value: "base1", count: 5 },
    { value: "xy2", count: 2 },
  ];
  expect(byCount(facets).map((facet) => facet.value)).toEqual(["base1", "xy2", "xy10"]);
  expect(facets[0]?.value).toBe("xy10");
});
