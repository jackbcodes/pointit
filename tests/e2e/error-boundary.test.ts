import { expect, test } from '@playwright/test';

test('should show 404 page for invalid route', async ({ page }) => {
  await page.goto('/does-not-exist');
  await expect(page.getByText('404')).toBeVisible();
});

test('should show 404 page for game not found', async ({ page }) => {
  await page.goto('/game/does-not-exist');
  await expect(page.getByText('404')).toBeVisible();
});

test('should show default error page for unknown error', async ({ page }) => {
  await page.route('**/api/**', async (route) => await route.abort());
  await page.goto('/game/123');
  await expect(page.getByText('Uh oh')).toBeVisible();
});
