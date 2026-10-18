import { expect, expectNoAxeViolations, test } from "./fixtures";

const grid = '[data-testid="cards-grid"]';

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("search narrows the grid and a card opens its detail", async ({ page }) => {
    await page.goto("/cards");
    await page.getByTestId("cards-search").fill("char");
    await expect(page).toHaveURL(/q=char/);
    await expect(page.getByTestId("cards-count")).toContainText("cards");
    await page.getByTestId("card-link").first().click();
    await expect(page.getByTestId("page-card")).toBeVisible();
    await expect(page).toHaveURL(/\/card\//);
  });

  test("filter sheet has no axe violations", async ({ page }) => {
    await page.goto("/cards");
    await page.getByTestId("filters-button").click();
    await expect(page.getByTestId("filter-panel")).toBeVisible();
    await expectNoAxeViolations(page, grid);
  });
});

test("filters in the URL drive chips and the grid", async ({ page }) => {
  await page.goto("/cards?type=Fire&rarity=Rare+Holo&sort=name");
  await expect(page.getByTestId("active-filter")).toHaveCount(2);
  await expect(page).toHaveURL(/\/cards\?type=Fire&rarity=Rare\+Holo&sort=name$/);
  const count = Number.parseInt(
    (await page.getByTestId("cards-count").innerText()).replaceAll(",", ""),
    10,
  );
  await expect(page.getByTestId("card-tile")).toHaveCount(count);

  await page.getByRole("button", { name: "Remove Fire" }).click();
  await expect(page).not.toHaveURL(/type=/);
  await expect(page).toHaveURL(/rarity=Rare\+Holo/);
  await expect(page.getByTestId("active-filter")).toHaveCount(1);
});

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("set popover applies two sets", async ({ page }) => {
    await page.goto("/cards");
    await page.getByTestId("chip-set").click();
    await expect(page.getByTestId("filter-panel")).toBeVisible();
    await page.getByTestId("filter-option").nth(0).click();
    await page.getByTestId("filter-option").nth(1).click();
    await expect(page.getByTestId("filter-apply")).toContainText("Show");
    await expectNoAxeViolations(page, grid);
    await page.getByTestId("filter-apply").click();
    await expect(page.getByTestId("filter-panel")).toHaveCount(0);
    await expect(page).toHaveURL(/set=[^&]+&set=/);
    await expect(page.getByTestId("chip-set")).toContainText("Set · 2");
  });

  test("panel deep link opens on the set section", async ({ page }) => {
    await page.goto("/cards?panel=set");
    await expect(page.getByTestId("filter-panel")).toBeVisible();
    await expect(page.getByTestId("filter-panel").getByRole("heading")).toHaveText("Set");
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("filter-panel")).toHaveCount(0);
    await expect(page).not.toHaveURL(/panel=/);
  });
});

test("no matches shows the empty state, which clears everything", async ({ page }) => {
  await page.goto("/cards?q=zzzz");
  await expect(page.getByTestId("cards-empty")).toBeVisible();
  await expect(page.getByTestId("cards-grid")).toHaveCount(0);
  await expectNoAxeViolations(page);
  await page.getByTestId("empty-clear").click();
  await expect(page).toHaveURL(/\/cards$/);
  await expect(page.getByTestId("cards-grid")).toBeVisible();
});

test("keyboard reaches a card and opens it", async ({ page }) => {
  await page.goto("/cards");
  await expect(page.getByTestId("cards-grid")).toBeVisible();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    if ((await page.locator(":focus").getAttribute("data-testid")) === "card-link") break;
  }
  await expect(page.locator(":focus")).toHaveAttribute("data-testid", "card-link");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("page-card")).toBeVisible();
});

test("a favourite set on the grid survives a reload", async ({ page }) => {
  await page.goto("/cards");
  const fav = page.getByTestId("fav-toggle").first();
  await expect(fav).toHaveAttribute("aria-pressed", "false");
  await fav.click();
  await expect(fav).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(fav).toHaveAttribute("aria-pressed", "true");
});
