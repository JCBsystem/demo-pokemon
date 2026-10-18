import { expect, test } from "./fixtures";

test("favourites persist and show on home", async ({ page }) => {
  await page.goto("/cards");
  const toggles = page.getByTestId("page-cards").getByTestId("favourite-toggle");
  await toggles.nth(0).click();
  await toggles.nth(1).click();
  await expect(toggles.nth(0)).toHaveAttribute("aria-pressed", "true");
  await expect(toggles.nth(1)).toHaveAttribute("aria-pressed", "true");

  await page.reload();
  await expect(toggles.nth(0)).toHaveAttribute("aria-pressed", "true");
  await expect(toggles.nth(1)).toHaveAttribute("aria-pressed", "true");

  await page.getByTestId("index-home").click();
  const grid = page.getByTestId("favourites-grid");
  await expect(grid.getByTestId("pocket")).toHaveCount(2);
  await expect(page.getByTestId("page-home")).toContainText("2 pinned");

  await grid.getByTestId("pocket-link").first().click();
  await page.getByTestId("page-card").getByTestId("favourite-toggle").click();
  await page.getByTestId("index-home").click();
  await expect(grid.getByTestId("pocket")).toHaveCount(1);
  await expect(page.getByTestId("page-home")).toContainText("1 pinned");
});
