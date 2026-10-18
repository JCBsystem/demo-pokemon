import { expect, expectNoAxeViolations, test } from "./fixtures";

const pokemon = "/card/sm1-51";
const trainer = "/card/dp6-130";
const repeated = "/card/ex8-59";

test("card detail shows the hero with the attacks tab selected", async ({ page }) => {
  await page.goto(pokemon);
  await expect(page.getByTestId("card-name")).toHaveText("Charjabug");
  await expect(page.getByTestId("card-hero")).toBeVisible();
  await expect(page.getByTestId("tab-attacks")).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("tabpanel")).toBeVisible();
});

test("the selected tab lives in the URL", async ({ page }) => {
  await page.goto(pokemon);
  await page.getByTestId("tab-legalities").click();
  await expect(page).toHaveURL(/tab=legalities/);
  await page.reload();
  await expect(page.getByTestId("tab-legalities")).toHaveAttribute("aria-selected", "true");
  await expect(page.getByTestId("tabpanel")).toContainText(/unlimited/i);

  await page.goto(`${pokemon}?tab=weaknesses`);
  await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
});

test("tabs switch with the arrow keys", async ({ page }) => {
  await page.goto(pokemon);
  await page.getByTestId("tab-attacks").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByTestId("tab-weaknesses")).toHaveAttribute("aria-selected", "true");
  await expect(page).toHaveURL(/tab=weaknesses/);
});

test("a favourite set on the detail page survives a reload and shows on home", async ({ page }) => {
  await page.goto(pokemon);
  const fav = page.getByTestId("fav-toggle");
  await fav.click();
  await expect(fav).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(fav).toHaveAttribute("aria-pressed", "true");
  await page.goto("/");
  await expect(page.getByTestId("favourites").getByTestId("card-tile")).toHaveCount(1);
});

test("copies, cards without attacks and unknown ids", async ({ page }) => {
  await page.goto(repeated);
  await expect(page.getByTestId("card-copies")).toContainText("×2");

  await page.goto(trainer);
  await expect(page.getByTestId("tabpanel")).toHaveText("No attacks.");

  await page.goto("/card/nope-1");
  await expect(page.getByTestId("card-missing")).toBeVisible();
});

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1280, height: 800 },
]) {
  test.describe(`${viewport.width}px`, () => {
    test.use({ viewport });

    test("card detail has no axe violations", async ({ page }) => {
      await page.goto(pokemon);
      await expect(page.getByTestId("card-name")).toBeVisible();
      await expect(page.getByTestId("card-hero")).toBeVisible();
      await expectNoAxeViolations(page);
    });
  });
}

test("not-found page has no axe violations", async ({ page }) => {
  await page.goto("/card/nope-1");
  await expect(page.getByTestId("card-missing")).toBeVisible();
  await expectNoAxeViolations(page);
});
