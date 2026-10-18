import { expect, test } from "vite-plus/test";
import {
  hasFilters,
  parseCardsSearch,
  parseSearch,
  sortByHp,
  stringifySearch,
  toCardFilter,
} from "../src/data/cardsSearch";
import { parseCards } from "../src/data/schema";
import fixture from "./fixtures/cards.json";

const cards = parseCards(fixture);

test("parseSearch keeps repeated keys as arrays and single keys as strings", () => {
  expect(parseSearch("?q=char&type=Fire&type=Water&sort=hp")).toEqual({
    q: "char",
    type: ["Fire", "Water"],
    sort: "hp",
  });
  expect(parseSearch("")).toEqual({});
});

test("stringifySearch writes repeated keys and skips empty values", () => {
  expect(stringifySearch({ q: "char", type: ["Fire", "Water"], set: undefined, sort: "" })).toBe(
    "?q=char&type=Fire&type=Water",
  );
  expect(stringifySearch({})).toBe("");
});

test("search params round trip through the URL", () => {
  const search = { q: "Rare Holo", set: ["xy1", "sm1"], rarity: ["Rare Holo"], sort: "hp" };
  expect(parseCardsSearch(parseSearch(stringifySearch(search)))).toEqual(search);
});

test("parseCardsSearch accepts single values, dedupes and drops junk", () => {
  expect(parseCardsSearch({ set: "xy1", type: ["Fire", "Fire", 3], q: "", sort: "price" })).toEqual(
    { set: ["xy1"], type: ["Fire"] },
  );
  expect(parseCardsSearch({ nope: 1 })).toEqual({});
});

test("toCardFilter omits absent keys and leaves hp sort to the page", () => {
  expect(toCardFilter({ q: "char", set: ["xy1"], sort: "set" })).toEqual({
    search: "char",
    sets: ["xy1"],
    sort: "set",
  });
  expect(toCardFilter({ sort: "hp" })).toEqual({});
  expect(toCardFilter({})).toEqual({});
});

test("sortByHp goes high to low with cards lacking hp last", () => {
  const sorted = sortByHp(cards);
  const hps = sorted.map((card) => card.hp);
  const numeric = hps.filter((hp) => hp !== undefined).map(Number);
  expect(numeric).toEqual(numeric.toSorted((a, b) => b - a));
  expect(hps.lastIndexOf(undefined)).toBe(hps.length - 1);
  expect(hps.indexOf(undefined)).toBe(numeric.length);
});

test("hasFilters ignores sort", () => {
  expect(hasFilters({ sort: "hp" })).toBe(false);
  expect(hasFilters({ type: ["Fire"] })).toBe(true);
});
