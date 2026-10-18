import { expect, test } from "./fixtures";

test("filters load from the URL and write back to it", async ({ page }) => {
  await page.goto("/cards?set=xy1&rarity=Common");
  await expect(page.getByTestId("result-count")).toHaveText("36 cards");
  await expect(page.getByTestId("active-filter")).toHaveText(["xy1 ✕", "Common ✕"]);

  await page.getByTestId("filters-open-set").click();
  const sheet = page.getByTestId("filter-sheet");
  await expect(sheet.getByTestId("facet-set-xy1").getByRole("checkbox")).toBeChecked();
  await expect(sheet.getByTestId("facet-rarity-Common").getByRole("checkbox")).toBeChecked();

  await sheet.getByTestId("facet-type-Fire").click();
  await expect(page).toHaveURL(/[?&]type=Fire(&|$)/);

  await sheet.getByTestId("filters-done").click();
  await expect(sheet).toBeHidden();
  await page.getByTestId("filters-clear").click();
  await expect(page).toHaveURL("/cards");
});

test("sort writes to the URL", async ({ page }) => {
  await page.goto("/cards");
  await page.getByTestId("sort").click();
  await page.getByRole("option", { name: "Name" }).click();
  await expect(page).toHaveURL("/cards?sort=name");
});

test("page buttons turn the spread", async ({ page }) => {
  await page.goto("/cards");
  await expect(page.getByTestId("pocket")).toHaveCount(18);
  await page.getByTestId("page-next").click();
  await expect(page).toHaveURL("/cards?page=3");
  await expect(page.getByTestId("page-indicator")).toHaveText("Pages 3–4 of 238", {
    useInnerText: true,
  });
  await page.getByTestId("page-prev").click();
  await expect(page).toHaveURL("/cards");
});

test("ArrowRight turns the spread", async ({ page }) => {
  await page.goto("/cards");
  await expect(page.getByTestId("page-cards")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL("/cards?page=3");
});

test("an out-of-range page shows the last page and keeps the URL", async ({ page }) => {
  await page.goto("/cards?page=9999");
  await expect(page.getByTestId("page-indicator")).toHaveText("Page 238 of 238", {
    useInnerText: true,
  });
  await expect(page).toHaveURL("/cards?page=9999");
});
