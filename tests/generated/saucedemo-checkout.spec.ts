import { test, expect } from '@playwright/test';

test('Complete checkout flow and verify Checkout Overview page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page.getByTestId('username')).toBeVisible();
  await expect(page.getByTestId('password')).toBeVisible();

  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.getByText('Products')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

  await expect(page.getByTestId('shopping-cart-link')).toContainText('1');
  await page.getByTestId('shopping-cart-link').click();

  await expect(page).toHaveURL(/cart\.html$/);
  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  await page.getByTestId('checkout').click();

  await expect(page.getByTestId('firstName')).toBeVisible();
  await page.getByTestId('firstName').fill('John');
  await page.getByTestId('lastName').fill('Doe');
  await page.getByTestId('postalCode').fill('560001');
  await page.getByTestId('continue').click();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.getByText('Checkout: Overview')).toBeVisible();
});
