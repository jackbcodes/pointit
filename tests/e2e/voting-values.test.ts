import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

const name = faker.person.firstName();

test('should use fibonacci values', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start game' }).click();
  await page.getByLabel('Your name').fill(name);
  await page.getByRole('button', { name: "Let's go" }).click();
  await expect(page.getByLabel('Your name')).not.toBeVisible();
  await expect(page.getByText(name)).toBeVisible();
  await expect(
    page.getByRole('radio', { name: '0', exact: true }),
  ).toBeVisible();
});

test('should use t-shirt size values', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start game' }).click();
  await page.getByLabel('Your name').fill(name);
  await page.getByText('T-shirt').click();
  await page.getByRole('button', { name: "Let's go" }).click();
  await expect(page.getByLabel('Your name')).not.toBeVisible();
  await expect(
    page.getByRole('radio', { name: 'XXS', exact: true }),
  ).toBeVisible();
});
