import { expect, test } from "./fixtures";

test.skip(({ isMobile }) => isMobile, "keyboard path is laptop only");

test("keyboard only: home to cards to a card and its tabs", async ({ page }) => {
  const focused = () => page.evaluate(() => document.activeElement?.getAttribute("data-testid"));
  const tabTo = async (testId: string, max: number) => {
    for (let i = 0; i < max && (await focused()) !== testId; i++) await page.keyboard.press("Tab");
    expect(await focused()).toBe(testId);
  };

  await page.goto("/");
  await expect(page.getByTestId("page-home")).toBeVisible();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.matches(":focus-visible"))).toBe(true);
  await tabTo("nav-cards", 15);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/cards$/);
  await expect(page.getByTestId("card-link").first()).toBeVisible();

  await tabTo("card-link", 40);
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("page-card")).toBeVisible();

  await tabTo("tab-attacks", 40);
  await page.keyboard.press("ArrowRight");
  await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByTestId("tab-legalities")).toHaveAttribute("aria-selected", "true");

  await page.goBack();
  await expect(page).toHaveURL(/\/cards$/);
});
