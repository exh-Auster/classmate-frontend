import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://classmate-front.vercel.app/');
  });

test('should display posts on the homepage', async ({ page }) => {
  await page.waitForSelector('[data-testid="post-item"]');
  
  const posts = await page.$$('[data-testid="post-item"]');
  expect(posts.length).toBeGreaterThan(0);
});