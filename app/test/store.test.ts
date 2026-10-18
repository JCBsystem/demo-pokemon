import { beforeEach, expect, test } from "vite-plus/test";
import { useStore } from "../src/store";

beforeEach(() => {
  useStore.setState(useStore.getInitialState());
});

test("toggleFavourite adds then removes an id", () => {
  useStore.getState().toggleFavourite("base1-4");
  expect(useStore.getState().favourites).toEqual(["base1-4"]);
  useStore.getState().toggleFavourite("base1-4");
  expect(useStore.getState().favourites).toEqual([]);
});

test("addRecentSearch puts newest first and moves a repeat to the front", () => {
  const { addRecentSearch } = useStore.getState();
  addRecentSearch("pikachu");
  addRecentSearch("charizard");
  addRecentSearch("pikachu");
  expect(useStore.getState().recentSearches).toEqual(["pikachu", "charizard"]);
});

test("addRecentSearch keeps at most 10", () => {
  const { addRecentSearch } = useStore.getState();
  for (let i = 1; i <= 12; i++) addRecentSearch(`q${i}`);
  const { recentSearches } = useStore.getState();
  expect(recentSearches).toHaveLength(10);
  expect(recentSearches[0]).toBe("q12");
  expect(recentSearches.at(-1)).toBe("q3");
});

test("addRecentSearch trims and ignores empty input", () => {
  const { addRecentSearch } = useStore.getState();
  addRecentSearch("  mew  ");
  addRecentSearch("   ");
  addRecentSearch("");
  expect(useStore.getState().recentSearches).toEqual(["mew"]);
});
