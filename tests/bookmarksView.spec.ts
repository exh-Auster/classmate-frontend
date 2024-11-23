import { test, expect } from '@playwright/test';

test('should display bookmarks header', async ({ page }) => {
  await page.goto('https://classmate-front.vercel.app/');

  await page.click('[data-testid="bookmarks-link"]');

  await expect(page.getByTestId('bookmarks-header')).toBeVisible();
});