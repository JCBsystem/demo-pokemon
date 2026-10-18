import { expect, expectNoAxeViolations, test } from "./fixtures";

test("home shows the collection and browse entry points", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("page-home").getByRole("heading", { level: 1 })).toContainText(
    "cards",
  );
  await page.getByTestId("browse-type").first().click();
  await expect(page).toHaveURL(/\/cards\?.*type=/);
  await expect(page.getByTestId("page-cards")).toBeVisible();
});

test("quick search records a recent search that can be reopened and cleared", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("home-search").fill("char");
  await page.getByTestId("home-search").press("Enter");
  await expect(page).toHaveURL(/\/cards\?q=char$/);
  await expect(page.getByTestId("page-cards")).toBeVisible();

  await page.goto("/");
  const chips = page.getByTestId("recent-search");
  await expect(chips).toHaveCount(1);
  await expect(chips).toHaveText("char");
  await chips.click();
  await expect(page).toHaveURL(/\/cards\?q=char$/);

  await page.getByTestId("card-link").first().click();
  await expect(page.getByTestId("page-card")).toBeVisible();
  await expect(page.getByTestId("card-name")).toBeVisible();

  await page.goto("/");
  await page.getByTestId("recent-clear").click();
  await expect(page.getByTestId("recent-search")).toHaveCount(0);
});

test("a favourite pinned on /cards shows on home and survives a reload", async ({ page }) => {
  await page.goto("/cards");
  await page.getByTestId("fav-toggle").first().click();
  await page.goto("/");
  const favourites = page.getByTestId("favourites");
  await expect(favourites.getByTestId("card-tile")).toHaveCount(1);
  await expect(page.getByTestId("favourites-count")).toHaveText("1 pinned");
  await page.reload();
  await expect(favourites.getByTestId("card-tile")).toHaveCount(1);
});

test("home with a favourite and a recent search has no axe violations", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("home-search").fill("char");
  await page.getByTestId("home-search").press("Enter");
  await expect(page.getByTestId("page-cards")).toBeVisible();
  await page.getByTestId("fav-toggle").first().click();
  await page.goto("/");
  await expect(page.getByTestId("favourites").getByTestId("card-tile")).toHaveCount(1);
  await expect(page.getByTestId("recent-search")).toHaveCount(1);
  await expectNoAxeViolations(page);
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("home renders with the bottom navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("page-home")).toBeVisible();
    await expect(page.getByTestId("tab-search")).toBeVisible();
    await expect(page.getByTestId("nav-cards")).toBeHidden();
    await expectNoAxeViolations(page);
  });
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("keyboard alone goes from home to a card and switches its tab", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("page-home")).toBeVisible();
    const focused = async () => {
      const el = page.locator(":focus");
      return (await el.count()) > 0 ? el.getAttribute("data-testid") : null;
    };
    const tabTo = async (testId: string) => {
      for (let i = 0; i < 30 && (await focused()) !== testId; i++) {
        await page.keyboard.press("Tab");
      }
      expect(await focused()).toBe(testId);
    };

    await tabTo("nav-cards");
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("page-cards")).toBeVisible();
    await tabTo("card-link");
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("page-card")).toBeVisible();
    await tabTo("tab-attacks");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(":focus")).toHaveAttribute("data-testid", "tab-weaknesses");
    await expect(page).toHaveURL(/tab=weaknesses/);
  });
});
