import { expect, expectNoAxeViolations, test } from "./fixtures";

const pages = [
  { path: "/", testId: "page-home" },
  { path: "/cards", testId: "page-cards" },
  { path: "/card/sm1-51", testId: "page-card" },
];

for (const { path, testId } of pages) {
  test(`${path} renders and has no axe violations`, async ({ page }) => {
    if (path === "/cards") test.slow();
    await page.goto(path);
    await expect(page.getByTestId(testId)).toBeVisible();
    await expectNoAxeViolations(page);
  });
}

test("splash and view transitions work with motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/data/cards.json", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await route.continue();
  });
  await page.goto("/");
  await expect(page.getByTestId("splash")).toBeVisible();
  await expect(page.getByTestId("page-home")).toBeVisible();
  await expect(page.getByTestId("splash")).toHaveCount(0);

  await page.getByTestId("nav-cards").click();
  await expect(page.getByTestId("page-cards")).toBeVisible();
  await page.getByTestId("card-link").first().click();
  await expect(page.getByTestId("page-card")).toBeVisible();
  await expect(page.getByTestId("card-name")).toBeVisible();
  await page.goBack();
  await expect(page.getByTestId("cards-grid")).toBeVisible();
});
