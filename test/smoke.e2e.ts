import { expect, test } from "./fixtures";

const pages = [
  { path: "/", testId: "page-home" },
  { path: "/cards", testId: "page-cards" },
  { path: "/card/sm11-56", testId: "page-card" },
];

for (const { path, testId } of pages) {
  test(`${path} renders with one h1 and no axe violations`, async ({ page, checkA11y }) => {
    await page.goto(path);
    await expect(page.getByTestId(testId)).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await checkA11y(page);
  });
}

test("unknown card id shows not found", async ({ page, checkA11y }) => {
  await page.goto("/card/base1-4");
  await expect(page.getByTestId("not-found")).toBeVisible();
  await checkA11y(page);
});
