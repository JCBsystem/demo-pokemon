import { expect, test } from "vite-plus/test";
import { toCardFilter, validateCardsSearch } from "../src/routes/cards/cardsSearch";

test("validateCardsSearch turns single values into arrays for array keys", () => {
  expect(
    validateCardsSearch({ type: "Fire", rarity: ["Rare Holo", "Common"], set: "base1" }),
  ).toEqual({ type: ["Fire"], rarity: ["Rare Holo", "Common"], set: ["base1"] });
});

test("validateCardsSearch drops invalid sort and panel values", () => {
  expect(validateCardsSearch({ q: "pika", sort: "price", panel: "colour" })).toEqual({ q: "pika" });
  expect(validateCardsSearch({ sort: "set", panel: "rarity" })).toEqual({
    sort: "set",
    panel: "rarity",
  });
});

test("validateCardsSearch drops unknown keys, empty values and wrong shapes", () => {
  expect(
    validateCardsSearch({
      tab: "attacks",
      q: "",
      type: [],
      rarity: ["", 3],
      set: 7,
      sort: ["name"],
    }),
  ).toEqual({});
});

test("validateCardsSearch on an empty object returns an empty object", () => {
  expect(validateCardsSearch({})).toEqual({});
});

test("toCardFilter maps search keys to filter keys and omits absent ones", () => {
  expect(
    toCardFilter({
      q: "pika",
      type: ["Fire"],
      rarity: ["Common"],
      set: ["base1"],
      sort: "name",
      panel: "type",
    }),
  ).toEqual({
    search: "pika",
    types: ["Fire"],
    rarities: ["Common"],
    sets: ["base1"],
    sort: "name",
  });
  expect(toCardFilter({})).toEqual({});
  expect(Object.keys(toCardFilter({ q: "a" }))).toEqual(["search"]);
});
