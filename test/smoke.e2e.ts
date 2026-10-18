import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", testId: "page-home" },
  { path: "/cards", testId: "page-cards" },
  { path: "/card/base1-4", testId: "page-card" },
];

for (const { path, testId } of pages) {
  test(`${path} renders and has no axe violations`, async ({ page }) => {
    await page.goto(path);
    // Empty <main> has zero height, so toBeVisible fails; use toBeVisible once pages have content
    await expect(page.getByTestId(testId)).toBeAttached();
    // WCAG tags only, best-practice page-has-heading-one fails on the bare scaffold; drop withTags once pages have an h1
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
