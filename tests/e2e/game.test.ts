import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start game' }).click();
  await page.getByLabel('Your name').fill(faker.person.firstName());
  await page.getByRole('button', { name: "Let's go" }).click();
});

test('should vote and reveal', async ({ page }) => {
  await page.getByRole('radio', { name: '8' }).click();
  await page.getByRole('button', { name: 'Reveal' }).click();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  await expect(page.getByText('Average:8')).toBeVisible();
});

test('should change name', async ({ page }) => {
  const newName = faker.person.firstName();

  await page.getByRole('button', { name: 'Change name' }).click();
  await page.getByLabel('Your name').fill(newName);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
  await expect(page.getByText(newName)).toBeVisible();
});

test('should toggle spectator mode', async ({ page }) => {
  await page.getByLabel('Toggle spectator mode').click();
  await expect(page.getByText('No spectators')).not.toBeVisible();
  await page.getByLabel('Toggle spectator mode').click();
  await expect(page.getByText('No spectators')).toBeVisible();
});

test('should leave game', async ({ page }) => {
  await page.getByRole('button', { name: 'Leave game' }).click();
  await page.getByRole('button', { name: 'Leave' }).click();
  await expect(page.getByRole('button', { name: 'Start game' })).toBeVisible();
});
