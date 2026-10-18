import { expect, test } from "vite-plus/test";
import { validateSearch } from "../src/routes/card/search";

test("validateSearch keeps a known tab and drops anything else", () => {
  expect(validateSearch({ tab: "legalities" })).toEqual({ tab: "legalities" });
  expect(validateSearch({ tab: "nope" })).toEqual({});
  expect(validateSearch({ tab: 3 })).toEqual({});
  expect(validateSearch({})).toEqual({});
});
