import { test, expect } from '@playwright/test';

test('Verify successful login to secure area', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');

  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');

  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});
