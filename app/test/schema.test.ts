import { afterEach, expect, test, vi } from "vite-plus/test";
import { parseCards } from "../src/data/schema";
import fixture from "./fixtures/cards.json";

afterEach(() => {
  vi.restoreAllMocks();
});

test("every fixture item parses without warnings", () => {
  const warn = vi.spyOn(console, "warn");
  expect(parseCards(fixture)).toHaveLength(fixture.length);
  expect(warn).not.toHaveBeenCalled();
});

test("setCode is the id before the last hyphen", () => {
  const cards = parseCards(fixture);
  expect(cards.find((card) => card.id === "swsh10tg-TG08")?.setCode).toBe("swsh10tg");
  expect(cards.find((card) => card.id === "base1-100")?.setCode).toBe("base1");
});

test("unknown keys are stripped, not rejected", () => {
  expect(fixture.find((item) => item.id === "xy6-28")).toHaveProperty("ancientTrait");
  const card = parseCards(fixture).find((card) => card.id === "xy6-28");
  expect(card).toBeDefined();
  expect(card).not.toHaveProperty("ancientTrait");
});

test("broken items are dropped, good items kept, one warning logged", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const noImages = { ...fixture[0], images: undefined };
  const cards = parseCards([...fixture, { id: 1 }, noImages, { ...fixture[0], id: "nohyphen" }]);
  expect(cards).toHaveLength(fixture.length);
  expect(warn).toHaveBeenCalledOnce();
});

test("a non-array input throws", () => {
  expect(() => parseCards({ cards: [] })).toThrow();
});
