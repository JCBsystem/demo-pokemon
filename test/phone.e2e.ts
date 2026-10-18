import { expect, expectNoAxeViolations, PHONE, test } from "./fixtures";

test.use({ viewport: PHONE });

test("dock Cards opens the binder", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("nav-cards").click();
  await expect(page.getByTestId("page-cards")).toBeVisible();
  await expect(page).toHaveURL("/cards");
});

test("Filters button opens the sheet", async ({ page }) => {
  await page.goto("/cards");
  await page.getByTestId("filters-open").click();
  await expect(page.getByTestId("filter-sheet")).toBeVisible();
});

test("dock Search focuses the binder search", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("nav-search").click();
  await expect(page).toHaveURL("/cards#search");
  await expect(page.getByTestId("binder-search")).toBeFocused();
});

test("phone page turns one page at a time", async ({ page }) => {
  await page.goto("/cards");
  await page.getByTestId("page-next").click();
  await expect(page).toHaveURL("/cards?page=2");
  await expect(page.getByTestId("page-indicator")).toHaveText("Page 2 of 238", {
    useInnerText: true,
  });
});

for (const { path, testId } of [
  { path: "/", testId: "page-home" },
  { path: "/cards", testId: "page-cards" },
]) {
  test(`${path} has no axe violations on a phone`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByTestId(testId)).toBeVisible();
    await expectNoAxeViolations(page);
  });
}
