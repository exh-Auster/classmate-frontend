import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://classmate-front.vercel.app/');
  });

test('sidebar groups should match newPostForm\'s dropdown', async ({ page }) => {
  // Extract group names from the sidebar
  const sidebarGroups = await page.$$eval('[data-testid="community-link"]', elements =>
    elements.map(el => el.textContent?.trim()).filter(Boolean)
  );

  await page.click('[data-testid="new-post-group-selection-dropdown"]');

  // Extract group names from the dropdown
  const dropdownGroups = await page.$$eval('[data-testid="new-post-group-selection-dropdown"] option', options =>
    options.map(option => option.textContent?.trim()).filter(Boolean)
  );

  expect(sidebarGroups).toEqual(dropdownGroups);
});