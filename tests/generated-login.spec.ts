import { test, expect } from '@playwright/test';

test('verify Herokuapp login succeeds with valid credentials', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /Login/i }).click();

  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
  await expect(page.getByRole('heading', { name: 'Secure Area' })).toBeVisible();
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  await expect(page.getByRole('link', { name: /Logout/i })).toBeVisible();
});
