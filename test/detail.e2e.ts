import { expect, test } from "./fixtures";

test("detail tabs live in the URL", async ({ page, gotoReady, checkA11y }) => {
  await gotoReady("/card/base1-58");
  await expect(page.getByTestId("tab-attacks")).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL((url) => (url.searchParams.get("tab") ?? "attacks") === "attacks");

  await page.getByTestId("tab-weaknesses").click();
  await expect(page).toHaveURL((url) => url.searchParams.get("tab") === "weaknesses");
  await expect(page.getByTestId("tabpanel")).toHaveAttribute("data-tab", "weaknesses");
  await page.reload();
  await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
  await checkA11y();

  await gotoReady("/card/base1-58?tab=legalities");
  await expect(page.getByTestId("tab-legalities")).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("tabpanel")).toHaveAttribute("data-tab", "legalities");

  const image = page.getByTestId("card-image");
  expect(await image.evaluate((element) => element.tagName)).toBe("IMG");
  const box = await image.boundingBox();
  expect(Math.abs((box?.width ?? 0) / (box?.height ?? 1) - 5 / 7)).toBeLessThan(0.02);

  await page.getByTestId("back-link").click();
  await expect(page).toHaveURL((url) => url.pathname === "/cards");
  await expect(page.getByTestId("page-cards")).toBeVisible();
});

test("a repeated card shows its count and opens", async ({ page, gotoReady }) => {
  await gotoReady("/cards?q=char");
  const repeated = page
    .getByTestId("card-row")
    .filter({ has: page.getByTestId("row-count") })
    .first();
  await expect(repeated).toBeVisible();
  const id = await repeated.getAttribute("data-card-id");
  await gotoReady(`/card/${id}`);
  await expect(page.getByTestId("detail-title")).toBeVisible();
});

test("unknown card id shows not found", async ({ page, gotoReady, checkA11y }) => {
  await gotoReady("/card/nope-1");
  await expect(page.getByTestId("card-not-found")).toBeVisible();
  await checkA11y();
  await page.getByTestId("back-link").click();
  await expect(page.getByTestId("page-cards")).toBeVisible();
});
