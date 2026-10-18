import { expect, test } from "vite-plus/test";
import {
  activeFilterCount,
  cardsSearchSchema,
  searchToFilter,
  toggleValue,
  withoutPage,
} from "../src/routes/cards/search";

function parse(input: Record<string, unknown>) {
  return cardsSearchSchema.parse(input);
}

test("valid params pass through", () => {
  expect(
    parse({ q: "char", set: "xy1,sm1", type: "Fire", rarity: "Rare Holo", sort: "name", page: 3 }),
  ).toEqual({
    q: "char",
    set: "xy1,sm1",
    type: "Fire",
    rarity: "Rare Holo",
    sort: "name",
    page: 3,
  });
});

test("invalid values are dropped, never thrown", () => {
  const search = parse({ q: "", set: { a: 1 }, type: null, rarity: [], sort: "price", page: "x" });
  expect(Object.values(search).every((value) => value === undefined)).toBe(true);
  expect(parse({})).toEqual({});
});

test("numbers from the JSON search parser become strings", () => {
  expect(parse({ q: 25 }).q).toBe("25");
});

test("page is coerced to a positive integer or dropped", () => {
  expect(parse({ page: "4" }).page).toBe(4);
  expect(parse({ page: 1 }).page).toBe(1);
  expect(parse({ page: 0 }).page).toBeUndefined();
  expect(parse({ page: -2 }).page).toBeUndefined();
  expect(parse({ page: 2.5 }).page).toBeUndefined();
});

test("searchToFilter splits lists and omits absent keys", () => {
  expect(searchToFilter({})).toEqual({});
  expect(
    searchToFilter({ q: "pika", set: "xy1,sm1", rarity: "Rare Holo", sort: "set", page: 2 }),
  ).toEqual({
    search: "pika",
    sets: ["xy1", "sm1"],
    rarities: ["Rare Holo"],
    sort: "set",
  });
  expect(searchToFilter({ set: ",," })).toEqual({});
});

test("toggleValue adds, removes and empties", () => {
  expect(toggleValue(undefined, "xy1")).toBe("xy1");
  expect(toggleValue("xy1", "sm1")).toBe("xy1,sm1");
  expect(toggleValue("xy1,sm1,g1", "sm1")).toBe("xy1,g1");
  expect(toggleValue("xy1", "xy1")).toBeUndefined();
});

test("withoutPage and activeFilterCount", () => {
  expect(withoutPage({ q: "a", page: 3 })).toEqual({ q: "a" });
  expect(activeFilterCount({ q: "a", set: "xy1,sm1", rarity: "Common" })).toBe(3);
});
