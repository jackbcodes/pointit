import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

const title = faker.lorem.words(3);

test.beforeEach(async ({ page }) => {
  const description = faker.lorem.lines(3);

  await page.goto('/');
  await page.getByRole('button', { name: 'Start game' }).click();
  await page.getByLabel('Your name').fill(faker.person.firstName());
  await page.getByRole('button', { name: "Let's go" }).click();
  await page.getByRole('button', { name: 'Add work item' }).click();
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Description').fill(description);
  await page.getByLabel('URL').fill(faker.internet.url());
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
  await expect(page.getByText(title)).toBeVisible();
  await expect(page.getByText(description)).toBeVisible();
});

test('should edit work item', async ({ page }) => {
  const newTitle = faker.word.words(3);
  const newDescription = faker.word.words(10);

  await page.getByRole('button', { name: 'Edit work item' }).click();
  await page.getByLabel('Title').fill(newTitle);
  await page.getByLabel('Description').fill(newDescription);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Save' })).not.toBeVisible();
  await expect(page.getByText(newTitle)).toBeVisible();
  await expect(page.getByText(newDescription)).toBeVisible();
});

test('should remove work item', async ({ page }) => {
  await page.getByRole('button', { name: 'Remove work item' }).click();
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible();
  await expect(page.getByText('No work item added')).toBeVisible();
});

test('should show external work item link', async ({ page }) => {
  await page.getByText(title).hover();
  await expect(
    page.getByRole('link', { name: 'Open work item' }),
  ).toBeVisible();
});
