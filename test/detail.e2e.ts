import { expect, test } from "./fixtures";

test("detail tabs live in the URL", async ({ page, checkA11y }) => {
  await page.goto("/card/sm11-56?tab=weaknesses");
  await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("tab-panel")).toBeVisible();
  await expect(page.getByTestId("card-meta")).toContainText("sm11");
  await expect(page.getByTestId("card-meta")).toContainText("56");
  await checkA11y(page);

  await page.getByTestId("tab-legalities").click();
  await expect(page).toHaveURL(/tab=legalities/);
  await page.reload();
  await expect(page.getByTestId("tab-legalities")).toHaveAttribute("aria-selected", "true");
  await checkA11y(page);

  await page.getByTestId("tab-attacks").click();
  await expect(page.getByTestId("tab-attacks")).toHaveAttribute("aria-selected", "true");
  await expect(page).not.toHaveURL(/tab=/);
  await checkA11y(page);

  await page.getByTestId("back-to-cards").click();
  await expect(page).toHaveURL(/\/cards(\?|$)/);
  await expect(page.getByTestId("page-cards")).toBeVisible();
});
