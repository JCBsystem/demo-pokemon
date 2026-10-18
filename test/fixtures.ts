import AxeBuilder from "@axe-core/playwright";
import { test as base, expect, type Page } from "@playwright/test";

const OFFLINE_HOSTS =
  /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|images\.pokemontcg\.io)\//;

export const PHONE = { width: 390, height: 844 };

export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.route(OFFLINE_HOSTS, (route) => route.abort());
    await provide(page);
  },
});

export async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}

export { expect };
