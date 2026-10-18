import { expect, expectTypeOf, test } from "vite-plus/test";
import {
  activeFilters,
  cardSearchSchema,
  cardsSearchSchema,
  clearFacets,
  clearFilters,
  filterFromSearch,
  setQuery,
  toggleFacet,
  type CardsSearch,
} from "../src/data/urlFilter";

test("schema keeps absent keys absent", () => {
  expect(cardsSearchSchema.parse({})).toEqual({});
  expect(Object.keys(cardsSearchSchema.parse({ q: "pika" }))).toEqual(["q"]);
});

test("schema coerces JSON-parsed values and drops invalid enums", () => {
  const search = cardsSearchSchema.parse({ q: 123, sort: "price", tab: "nope" });
  expect(search.q).toBe("123");
  expect(search.sort).toBeUndefined();
  expect(search.tab).toBeUndefined();
  expect(cardSearchSchema.parse({ tab: "legalities" })).toEqual({ tab: "legalities" });
});

test("text params are exact optionals", () => {
  expectTypeOf<Pick<CardsSearch, "q" | "set" | "card">>().toEqualTypeOf<{
    q?: string;
    set?: string;
    card?: string;
  }>();
});

test("filterFromSearch splits lists and omits absent keys", () => {
  expect(filterFromSearch({})).toEqual({});
  expect(filterFromSearch({ set: "", type: ",," })).toEqual({});
  expect(
    filterFromSearch({
      q: "char",
      set: "base1,xy1",
      type: "Fire",
      rarity: "Rare Holo",
      sort: "set",
    }),
  ).toEqual({
    search: "char",
    sets: ["base1", "xy1"],
    types: ["Fire"],
    rarities: ["Rare Holo"],
    sort: "set",
  });
});

test("toggleFacet adds, then removes, then drops the key", () => {
  const added = toggleFacet({ q: "a" }, "set", "base1");
  expect(added).toEqual({ q: "a", set: "base1" });
  const two = toggleFacet(added, "set", "xy1");
  expect(two.set).toBe("base1,xy1");
  const one = toggleFacet(two, "set", "base1");
  expect(one.set).toBe("xy1");
  expect(toggleFacet(one, "set", "xy1")).toEqual({ q: "a" });
});

test("toggleFacet does not mutate its input", () => {
  const search: CardsSearch = { type: "Fire" };
  toggleFacet(search, "type", "Water");
  expect(search).toEqual({ type: "Fire" });
});

test("setQuery sets or removes q and drops the selected card", () => {
  expect(setQuery({ card: "base1-4", sort: "name" }, "pika")).toEqual({ q: "pika", sort: "name" });
  expect(setQuery({ q: "pika", set: "xy1" }, "")).toEqual({ set: "xy1" });
});

test("clearFacets keeps q, clearFilters drops it, both keep sort/card/tab", () => {
  const search: CardsSearch = {
    q: "pika",
    set: "xy1",
    type: "Fire",
    rarity: "Rare",
    sort: "name",
    card: "xy1-1",
    tab: "weaknesses",
  };
  const kept = { sort: "name", card: "xy1-1", tab: "weaknesses" };
  expect(clearFacets(search)).toEqual({ q: "pika", ...kept });
  expect(clearFilters(search)).toEqual(kept);
  expect(clearFilters({})).toEqual({});
});

test("activeFilters lists q first, then facet values in key order", () => {
  expect(activeFilters({})).toEqual([]);
  expect(activeFilters({ rarity: "Rare", q: "pika", set: "base1,xy1" })).toEqual([
    { key: "q", value: "pika" },
    { key: "set", value: "base1" },
    { key: "set", value: "xy1" },
    { key: "rarity", value: "Rare" },
  ]);
});

test("toggled search round-trips through the schema", () => {
  const search = toggleFacet(toggleFacet({ q: "pika" }, "type", "Fire"), "type", "Water");
  expect(cardsSearchSchema.parse(search)).toEqual(search);
  expect(filterFromSearch(cardsSearchSchema.parse(search)).types).toEqual(["Fire", "Water"]);
});
