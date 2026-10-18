import { expect, test } from "./fixtures";

test("quick search finds Pikachu and remembers the search", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("quick-search").fill("pikachu");
  await page.getByTestId("quick-search").press("Enter");

  await expect(page).toHaveURL("/cards?q=pikachu");
  await expect(page.getByTestId("result-count")).toHaveText("19 cards");

  await page.getByTestId("pocket-link").first().click();
  await expect(page.getByTestId("page-card")).toBeVisible();
  await expect(page.getByTestId("card-name")).toHaveText("Pikachu");

  await page.getByTestId("index-home").click();
  const recent = page.getByTestId("recent-search");
  await expect(recent).toHaveText(["pikachu"]);
  await page.reload();
  await expect(recent).toHaveText(["pikachu"]);
});
