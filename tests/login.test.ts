import { test, expect } from '@playwright/test';
import { validCredentials, invalidCredentials } from '../test-data/credentials';

test.describe('Login Tests', () => {
  const loginUrl = '/practice-test-login/';

  test('Positive: Successful login with valid credentials', async ({ page }) => {
    await page.goto(loginUrl);
    await page.fill('#username', validCredentials.username);
    await page.fill('#password', validCredentials.password);
    //await page.getByRole('button', { name: 'Submit' }).click();
    await page.click('button[type="submit"]');
    await expect(page.locator('h1')).toHaveText('Logged In Successfully');
  });

  invalidCredentials.forEach((data, index) => {
    test(`Negative: Login failure with invalid credentials - ${index + 1}`, async ({ page }) => {
      await page.goto(loginUrl);
      await page.fill('#username', data.username);
      await page.fill('#password', data.password);
      await page.click('button[type="submit"]');
      await expect(page.locator('#error')).toBeVisible();
    });
  });
});