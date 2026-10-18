import { expect, test } from "vite-plus/test";
import { parseSearch, stringifySearch } from "../src/routes/search";

test("parseSearch reads single keys as strings and repeated keys as arrays", () => {
  expect(parseSearch("?q=pika&type=Fire&type=Water&sort=name")).toEqual({
    q: "pika",
    type: ["Fire", "Water"],
    sort: "name",
  });
});

test("parseSearch works without a leading ? and keeps numbers as strings", () => {
  expect(parseSearch("page=2")).toEqual({ page: "2" });
  expect(parseSearch("")).toEqual({});
});

test("stringifySearch writes arrays as repeated keys and omits empty values", () => {
  expect(
    stringifySearch({
      q: "pika",
      type: ["Fire", "Water"],
      page: 2,
      open: true,
      set: [],
      rarity: "",
      sort: undefined,
      panel: null,
    }),
  ).toBe("?q=pika&type=Fire&type=Water&page=2&open=true");
});

test("stringifySearch returns an empty string when nothing is left", () => {
  expect(stringifySearch({})).toBe("");
  expect(stringifySearch({ q: "", type: [] })).toBe("");
});

test("spaces and special characters are encoded and round-trip", () => {
  const search = { q: "Mr. Mime & co", rarity: ["Rare Holo", "Common"] };
  const str = stringifySearch(search);
  expect(str).toBe("?q=Mr.+Mime+%26+co&rarity=Rare+Holo&rarity=Common");
  expect(parseSearch(str)).toEqual(search);
  expect(parseSearch("?rarity=Rare%20Holo")).toEqual({ rarity: "Rare Holo" });
});
