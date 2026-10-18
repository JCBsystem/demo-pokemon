import { expect, test } from "./fixtures";

test("the tab is driven by the URL", async ({ page }) => {
  await page.goto("/card/base3-53?tab=weaknesses");
  await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("panel-weaknesses")).toBeVisible();

  await page.getByTestId("tab-legalities").click();
  await expect(page).toHaveURL("/card/base3-53?tab=legalities");
  await page.reload();
  await expect(page.getByTestId("tab-legalities")).toHaveAttribute("aria-selected", "true");
});

test("an unknown card shows the empty pocket and links back", async ({ page }) => {
  await page.goto("/card/nope-1");
  await expect(page.getByRole("heading", { name: "This pocket is empty" })).toBeVisible();
  await page.getByTestId("back-to-binder").click();
  await expect(page.getByTestId("page-cards")).toBeVisible();
  await expect(page).toHaveURL("/cards");
});

test("repeated cards show the copies chip", async ({ page }) => {
  await page.goto("/card/sm11-56");
  await expect(page.getByTestId("copies")).toBeVisible();
});
