import AxeBuilder from "@axe-core/playwright";
import { test as base, expect, type Locator, type Page } from "@playwright/test";

function rootFor(path: string): string {
  if (path.startsWith("/card/")) return "page-card";
  if (path.startsWith("/cards")) return "page-cards";
  return "page-home";
}

export const test = base.extend<{
  checkA11y: () => Promise<void>;
  gotoReady: (path: string) => Promise<Locator>;
}>({
  checkA11y: async ({ page }, provide) => {
    await provide(async () => {
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations).toEqual([]);
    });
  },
  gotoReady: async ({ page }, provide) => {
    await provide(async (path) => {
      await page.goto(path);
      const root = page.getByTestId(rootFor(path));
      await expect(root).toBeVisible();
      return root;
    });
  },
});

export { expect };

/** Parses "2,138 results" or "Show 12 cards" into a number. */
export async function countIn(locator: Locator): Promise<number> {
  await expect(locator).toHaveText(/\d/);
  const text = await locator.textContent();
  return Number((text ?? "").replaceAll(/\D/g, ""));
}

/** Presses `key` until focus is on (or inside) one of the `target` elements. */
export async function tabTo(page: Page, target: Locator, key = "Tab", max = 30): Promise<void> {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press(key);
    const focused = await target.evaluateAll((elements) =>
      elements.some((element) => element.contains(document.activeElement)),
    );
    if (focused) return;
  }
  throw new Error(`Focus did not reach the target within ${max} presses of ${key}`);
}
