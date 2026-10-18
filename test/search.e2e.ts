import { expect, test } from "./fixtures";

test("search by name, preview a card, open it, remember the search", async ({
  page,
  gotoReady,
  checkA11y,
}) => {
  await gotoReady("/cards");
  const search = page.getByTestId("search-input");
  await search.focus();
  await page.keyboard.type("char");
  await expect(page).toHaveURL((url) => url.searchParams.get("q") === "char");
  await search.press("Enter");
  await expect(page.getByTestId("result-count")).toHaveText(/[\d,]+ results?/);

  const rows = page.getByTestId("card-row");
  for (const index of [0, 1, 2]) await expect(rows.nth(index)).toContainText(/char/i);
  await checkA11y();

  const first = rows.first();
  const id = await first.getAttribute("data-card-id");
  await first.click();
  await expect(page).toHaveURL((url) => url.searchParams.get("card") === id);
  const previewTitle = page.getByTestId("preview-pane").getByTestId("detail-title");
  await expect(previewTitle).toBeVisible();
  const name = (await previewTitle.textContent()) ?? "";
  await expect(first).toContainText(name);

  await page.getByTestId("preview-open").click();
  await expect(page).toHaveURL((url) => url.pathname === `/card/${id}`);
  await expect(page.getByTestId("page-card")).toBeVisible();
  await expect(page.getByTestId("detail-title")).toHaveText(name);

  await gotoReady("/");
  await expect(page.getByTestId("recent-search-item").first()).toContainText("char");
});
