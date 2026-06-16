import { expect, test } from "@playwright/test";

test("public visitor can view a community orientation page", async ({ page }) => {
  await page.goto("/communities/harbor-repair-circle");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Harbor Repair Circle");
});

test("home page presents orientation instead of a feed", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Orientation, entry, and light continuity",
  );
  await expect(page.getByText("generic social", { exact: false })).toHaveCount(0);
});
