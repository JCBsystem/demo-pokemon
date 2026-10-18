import { expect, test } from "./fixtures";

test("search from home to a card detail, recent search survives reload", async ({
  page,
  checkA11y,
}) => {
  await page.goto("/");
  await page.getByTestId("search-input").fill("pika");
  await page.getByTestId("search-input").press("Enter");
  await expect(page).toHaveURL(/\/cards\?q=pika$/);
  await expect
    .poll(async () =>
      Number((await page.getByTestId("result-count").textContent())?.replace(/\D/g, "")),
    )
    .toBeGreaterThan(0);
  await checkA11y(page);

  await page.getByTestId("card-link").first().click();
  await expect(page.getByTestId("page-card")).toBeVisible();
  await expect(page.getByTestId("card-title")).toContainText("Pikachu");

  const home = page.getByTestId("page-home");
  await page.goto("/");
  await page.getByTestId("search-input").focus();
  await expect(home.getByTestId("recent-searches")).toBeVisible();
  await expect(home.getByTestId("recent-search").filter({ hasText: "pika" })).toBeVisible();
  await checkA11y(page);

  await page.reload();
  await page.getByTestId("search-input").focus();
  await expect(home.getByTestId("recent-search").filter({ hasText: "pika" })).toBeVisible();
});
