import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const MAX_TABS = 20;

async function tabTo(page: Page, target: Locator) {
  for (let presses = 0; presses < MAX_TABS; presses++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element.matches(":focus"))) break;
  }
  await expect(target).toBeFocused();
}

test("home to card and back with the keyboard only", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("page-home")).toBeVisible();
  await tabTo(page, page.getByTestId("index-cards"));
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/cards");

  await tabTo(page, page.getByTestId("pocket-link").first());
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("page-card")).toBeVisible();

  await tabTo(page, page.getByTestId("back-to-binder"));
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/cards");
});

test("Escape closes the filter sheet and ArrowRight then turns the page", async ({ page }) => {
  await page.goto("/cards");
  await page.getByTestId("filters-open-type").click();
  await expect(page.getByTestId("filter-sheet")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("filter-sheet")).toBeHidden();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL("/cards?page=3");
});
