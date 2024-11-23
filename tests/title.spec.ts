import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://classmate-front.vercel.app');

  await expect(page).toHaveTitle(/Classmate/);
});