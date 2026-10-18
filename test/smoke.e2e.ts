import { expect, expectNoAxeViolations, test } from "./fixtures";

const pages = [
  { path: "/", testId: "page-home" },
  { path: "/cards", testId: "page-cards" },
  { path: "/card/base3-53", testId: "page-card" },
];

for (const { path, testId } of pages) {
  test(`${path} renders one h1 and has no axe violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByTestId(testId)).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expectNoAxeViolations(page);
  });
}

test("empty search state has no axe violations", async ({ page }) => {
  await page.goto("/cards?q=zzzz");
  await expect(page.getByTestId("empty-state")).toBeVisible();
  await expectNoAxeViolations(page);
});

test("open filter sheet has no axe violations", async ({ page }) => {
  await page.goto("/cards");
  await page.getByTestId("filters-open-set").click();
  await expect(page.getByTestId("filter-sheet")).toBeVisible();
  await expectNoAxeViolations(page);
});

for (const tab of ["attacks", "weaknesses", "legalities"]) {
  test(`detail ${tab} tab has no axe violations`, async ({ page }) => {
    await page.goto(`/card/base3-53?tab=${tab}`);
    await expect(page.getByTestId(`panel-${tab}`)).toBeVisible();
    await expectNoAxeViolations(page);
  });
}
