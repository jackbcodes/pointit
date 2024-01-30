import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('should join game', async ({ browser }) => {
  // Create two isolated browser contexts
  const userOneContext = await browser.newContext();
  const userTwoContext = await browser.newContext();

  // Create pages and interact with contexts independently
  const userOnePage = await userOneContext.newPage();
  const userTwoPage = await userTwoContext.newPage();

  const userOneName = faker.person.firstName();
  const userTwoName = faker.person.firstName();

  await userOnePage.goto('/');
  await userOnePage.getByRole('button', { name: 'Start game' }).click();
  await userOnePage.getByLabel('Your name').fill(userOneName);
  await userOnePage.getByRole('button', { name: "Let's go" }).click();

  await expect(
    userOnePage.getByRole('button', { name: 'Reveal' }),
  ).toBeVisible();

  const joinUrl = userOnePage.url().replace('game', 'join');

  await userTwoPage.goto(joinUrl);
  await userTwoPage.getByLabel('Your name').fill(userTwoName);
  await userTwoPage.getByRole('button', { name: "Let's go" }).click();
  await expect(userTwoPage.getByText(userOneName)).toBeVisible();

  await expect(userOnePage.getByText(userTwoName)).toBeVisible();
});
