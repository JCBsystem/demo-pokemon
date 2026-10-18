import { expect, test } from "./fixtures";

test("favourites survive a reload and show on the home page", async ({ page, gotoReady }) => {
  await gotoReady("/cards");
  const rows = page.getByTestId("card-row");
  await expect(rows.first()).toBeVisible();

  // Ids repeat in the collection: pick the first two distinct ones.
  const rowIds = await rows.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-card-id")),
  );
  const indexes = [0, rowIds.findIndex((id) => id !== rowIds[0])];
  const ids = indexes.map((index) => rowIds[index]);
  const toggles = indexes.map((index) => rows.nth(index).getByTestId("favourite-toggle"));

  for (const toggle of toggles) {
    await toggle.click();
    await expect(toggle).toHaveAttribute("data-favourited", "true");
  }

  await page.reload();
  await expect(page.getByTestId("page-cards")).toBeVisible();
  for (const toggle of toggles) await expect(toggle).toHaveAttribute("data-favourited", "true");
  const stored = await page.evaluate(() => localStorage.getItem("store"));
  expect(JSON.parse(stored ?? "{}").state.favourites).toEqual(ids);

  await gotoReady("/");
  const items = page.getByTestId("favourites-list").getByTestId("favourite-item");
  await expect(items).toHaveCount(2);
  await items.first().click();
  await expect(page).toHaveURL((url) => ids.some((id) => url.pathname === `/card/${id}`));

  const detailToggle = page.getByTestId("card-detail").getByTestId("favourite-toggle");
  await detailToggle.click();
  await expect(detailToggle).toHaveAttribute("data-favourited", "false");

  await page.getByTestId("nav-home").click();
  await expect(page.getByTestId("page-home")).toBeVisible();
  await expect(items).toHaveCount(1);
});
