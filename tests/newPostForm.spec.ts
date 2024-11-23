import { test, expect } from '@playwright/test';

test('post button should stay disabled until there is text input and group selection', async ({ page }) => {
  await page.goto('https://classmate-front.vercel.app/');

  const postButton = page.getByTestId('post-button');

  await expect(postButton).toBeDisabled();

  const postBodyInput = page.getByTestId('post-body-input-field');
  await postBodyInput.fill('Test!');

  await expect(postButton).toBeDisabled();

  const groupDropdown = page.getByTestId('new-post-group-selection-dropdown');
  await groupDropdown.click();
  
  await page.getByRole('option').first().click();

  await expect(postButton).toBeEnabled();

//   await postButton.click();

//   await expect(page.getByText('Test!')).toBeVisible();
});