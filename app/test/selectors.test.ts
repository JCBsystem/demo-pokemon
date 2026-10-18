import { expect, test } from "vite-plus/test";
import { cardSchema, parseCards } from "../src/data/schema";
import { cardById, facets, filterCards } from "../src/data/selectors";
import fixture from "./fixtures/cards.json";

const cards = parseCards(fixture);

function minimalCard(id: string, name: string, number: string) {
  return cardSchema.parse({
    id,
    name,
    number,
    supertype: "Pokémon",
    images: { small: "s.png", large: "l.png" },
    legalities: {},
  });
}

function ids(list: { id: string }[]): string[] {
  return list.map((card) => card.id);
}

test("cardById returns the first match", () => {
  expect(cardById(cards, "base1-100")).toBe(cards.find((card) => card.id === "base1-100"));
  expect(cardById(cards, "nope-1")).toBeUndefined();
});

test("set facet counts every row, repeats included", () => {
  const { sets } = facets(cards);
  expect(sets.find((facet) => facet.value === "base1")?.count).toBe(5);
  expect(sets.map((facet) => facet.value)).toEqual([
    "base1",
    "base3",
    "dp6",
    "ex15",
    "g1",
    "swsh10tg",
    "tk2b",
    "xy6",
  ]);
});

test("rarity facet leaves out cards without a rarity", () => {
  const { rarities } = facets(cards);
  expect(rarities.reduce((total, facet) => total + facet.count, 0)).toBe(11);
  expect(rarities.find((facet) => facet.value === "Common")?.count).toBe(6);
});

test("type facet counts each entry and repeated rows", () => {
  const vulpix = cardById(cards, "base1-68");
  if (vulpix === undefined) throw new Error("fixture lacks base1-68");
  const { types } = facets([...cards, vulpix]);
  expect(types).toEqual([
    { value: "Colorless", count: 1 },
    { value: "Fighting", count: 1 },
    { value: "Fire", count: 2 },
    { value: "Metal", count: 1 },
    { value: "Psychic", count: 3 },
  ]);
});

test("search ignores case and diacritics", () => {
  expect(ids(filterCards(cards, { search: "pokemon" }))).toEqual(["base1-85"]);
  expect(ids(filterCards(cards, { search: "POKÉMON" }))).toEqual(["base1-85"]);
  expect(ids(filterCards(cards, { search: "nidoran" }))).toEqual(["ex15-56"]);
});

test("empty filter keeps every row in source order", () => {
  expect(filterCards(cards, {})).toEqual(cards);
  expect(filterCards(cards, { sets: [], search: "" })).toEqual(cards);
});

test("values within a facet are OR, facets are AND", () => {
  expect(filterCards(cards, { sets: ["base1", "tk2b"] })).toHaveLength(6);
  expect(ids(filterCards(cards, { sets: ["base1"], rarities: ["Common"] }))).toEqual([
    "base1-68",
    "base1-100",
    "base1-100",
    "base1-100",
  ]);
  expect(ids(filterCards(cards, { types: ["Psychic"], sets: ["g1"] }))).toEqual(["g1-RC15"]);
});

test("sort by set orders by set code, then number naturally", () => {
  expect(ids(filterCards(cards, { sort: "set" }))).toEqual([
    "base1-68",
    "base1-85",
    "base1-100",
    "base1-100",
    "base1-100",
    "base3-18",
    "dp6-140",
    "ex15-56",
    "g1-RC15",
    "swsh10tg-TG08",
    "tk2b-11",
    "xy6-28",
  ]);

  const mixed = ["RC17", "116a", "RC2", "2"].map((number) =>
    minimalCard(`g1-${number}`, "Meowstic", number),
  );
  expect(filterCards(mixed, { sort: "set" }).map((card) => card.number)).toEqual([
    "2",
    "116a",
    "RC2",
    "RC17",
  ]);
});

test("sort by name ignores diacritics", () => {
  const named = [minimalCard("a-1", "Pokemon Z", "1"), minimalCard("a-2", "Pokémon B", "2")];
  expect(filterCards(named, { sort: "name" }).map((card) => card.name)).toEqual([
    "Pokémon B",
    "Pokemon Z",
  ]);
});

test("filterCards does not mutate its input", () => {
  const before = [...cards];
  filterCards(cards, { sort: "name" });
  filterCards(cards, { sort: "set", sets: ["base1"] });
  expect(cards).toEqual(before);
});
