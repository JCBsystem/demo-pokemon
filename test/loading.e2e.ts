import { expect, test } from "./fixtures";

test("splash shows while the collection loads", async ({ page, checkA11y }) => {
  let release = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/data/cards.json", async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto("/");
  await expect(page.getByTestId("splash")).toBeVisible();
  await checkA11y(page);
  release();
  await expect(page.getByTestId("page-home")).toBeVisible();
  await expect(page.getByTestId("splash")).toHaveCount(0);
});

test("load error shows a retry that recovers", async ({ page, checkA11y }) => {
  await page.route("**/data/cards.json", (route) => route.fulfill({ status: 500 }));
  await page.goto("/");
  await expect(page.getByTestId("error-state")).toBeVisible();
  await checkA11y(page);
  await page.unroute("**/data/cards.json");
  await page.getByTestId("error-state").getByTestId("retry").click();
  await expect(page.getByTestId("page-home")).toBeVisible();
});
