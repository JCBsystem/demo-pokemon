import AxeBuilder from "@axe-core/playwright";
import { test as base, expect, type Page } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await provide(page);
  },
});

export { expect };

export async function expectNoAxeViolations(page: Page, exclude?: string) {
  const builder = new AxeBuilder({ page });
  if (exclude) builder.exclude(exclude);
  const results = await builder.analyze();
  expect(results.violations).toEqual([]);
}
