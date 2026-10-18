import { expect, test } from "./fixtures";

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

test("drawer, filter sheet and full-page detail on a phone", async ({
  page,
  gotoReady,
  checkA11y,
}) => {
  await gotoReady("/");
  await checkA11y();

  await page.getByTestId("menu-button").click();
  const drawer = page.getByTestId("drawer");
  await expect(drawer).toBeVisible();
  await drawer.getByTestId("nav-cards").click();
  await expect(page).toHaveURL((url) => url.pathname === "/cards");
  await expect(page.getByTestId("page-cards")).toBeVisible();
  await expect(drawer).toBeHidden();
  await checkA11y();

  await page.getByTestId("filters-button").click();
  const sheet = page.getByTestId("filter-sheet");
  await expect(sheet).toBeVisible();
  await sheet.getByTestId("facet-rarity-Common").click();
  await expect(page).toHaveURL((url) => url.searchParams.get("rarity") === "Common");
  const apply = sheet.getByTestId("sheet-apply");
  await expect(apply).toHaveText(/Show [\d,]+ cards?/);
  await apply.click();
  await expect(sheet).toBeHidden();

  const first = page.getByTestId("card-row").first();
  const id = await first.getAttribute("data-card-id");
  await first.click();
  await expect(page).toHaveURL((url) => url.pathname === `/card/${id}`);
  await expect(page.getByTestId("page-card")).toBeVisible();
  await checkA11y();
});
