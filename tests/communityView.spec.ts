import { test, expect } from '@playwright/test';

test('should display group title', async ({ page }) => {
  await page.goto('https://classmate-front.vercel.app/');

  await page.click('[data-testid="group-link"]:first-of-type');

  await expect(page.getByTestId('group-title')).toBeVisible();
});

test('should display group description', async ({ page }) => {
  await page.goto('https://classmate-front.vercel.app/');

  await page.click('[data-testid="group-link"]:first-of-type');

  await expect(page.getByTestId('group-description')).toBeVisible();
});

test('should display newPostForm', async ({ page }) => {
  await page.goto('https://classmate-front.vercel.app/');

  await page.click('[data-testid="group-link"]:first-of-type');

  await expect(page.getByTestId('new-post-form')).toBeVisible();
});

test('should display posts on the community view', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.click('[data-testid="group-link"]:first-of-type');

    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[data-testid="post-item"]');

    const posts = await page.$$('[data-testid="post-item"]');
    expect(posts.length).toBeGreaterThan(0);
});