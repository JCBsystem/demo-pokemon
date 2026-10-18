import { countIn, expect, test } from "./fixtures";

const facetParams = (url: URL) =>
  ["set", "type", "rarity"].filter((key) => url.searchParams.has(key));

test("facets live in the URL and narrow the list", async ({ page, gotoReady, checkA11y }) => {
  await gotoReady("/cards");
  const total = await countIn(page.getByTestId("result-count"));

  await gotoReady("/cards?set=base1&rarity=Common");
  await expect(page.getByTestId("facet-set-base1").getByRole("checkbox")).toBeChecked();
  await expect(page.getByTestId("facet-rarity-Common").getByRole("checkbox")).toBeChecked();
  const chips = page.getByTestId("filter-chip");
  await expect(chips).toHaveCount(2);
  await expect.poll(() => countIn(page.getByTestId("result-count"))).toBeLessThan(total);
  expect(await countIn(page.getByTestId("result-count"))).toBeGreaterThan(0);
  await checkA11y();

  await page.getByTestId("facet-type-Fire").click();
  await expect(page).toHaveURL((url) => url.searchParams.get("type") === "Fire");
  await expect(chips).toHaveCount(3);

  // Chip order is not part of the contract, so assert one facet param is gone.
  await chips.first().getByRole("button").click();
  await expect(page).toHaveURL((url) => facetParams(url).length === 2);
  await expect(chips).toHaveCount(2);

  await page.getByTestId("clear-filters").click();
  await expect(page).toHaveURL((url) => url.pathname === "/cards" && url.search === "");
  await expect(chips).toHaveCount(0);
});

test("empty state clears the search", async ({ page, gotoReady, checkA11y }) => {
  await gotoReady("/cards?q=zzzz");
  const empty = page.getByTestId("empty-state");
  await expect(empty).toBeVisible();
  await checkA11y();
  await empty.getByRole("button").click();
  await expect(page).toHaveURL((url) => !url.searchParams.has("q"));
  await expect(page.getByTestId("card-row").first()).toBeVisible();
});

test("sort is kept in the URL", async ({ page, gotoReady }) => {
  await gotoReady("/cards");
  await page.getByTestId("sort-select").getByRole("button").click();
  await page.getByRole("option", { name: "Name" }).click();
  await expect(page).toHaveURL((url) => url.searchParams.get("sort") === "name");
});
