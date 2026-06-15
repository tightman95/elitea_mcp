import { test, expect } from '@playwright/test';

test('Login with valid credentials shows secure area message', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Login/i })).toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /Login/i }).click();

  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});
