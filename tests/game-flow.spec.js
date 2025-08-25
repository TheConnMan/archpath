import { test, expect } from '@playwright/test';

// Helper function to skip flavor selection and go to company selection
async function skipToCompanySelection(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  // Select any flavor to proceed to company selection
  const awsButton = page.getByRole('button').filter({ hasText: 'Amazon Web Services' }).first();
  if (await awsButton.isVisible()) {
    await awsButton.click();
  }
}

test.describe('ArchPath Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    await skipToCompanySelection(page);
  });

  test('displays main menu with all companies', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ArchPath' })).toBeVisible();
    await expect(page.getByText('Learn architectural evolution of tech companies')).toBeVisible();

    // Check all 5 companies are displayed
    await expect(page.getByRole('button', { name: /Netflix/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Slack/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Uber/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Spotify/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Instagram/ })).toBeVisible();
  });

  test('can select Netflix and start challenge', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Should be in game view now
    await expect(
      page.getByRole('heading', { name: 'Netflix Architecture Challenge' })
    ).toBeVisible();
    await expect(page.getByText('Video streaming platform')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Phase 1: MVP' })).toBeVisible();
  });

  test('complete Netflix MVP phase with perfect score', async ({ page }) => {
    // Start Netflix challenge
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Verify we're in MVP phase
    await expect(page.getByRole('heading', { name: 'Phase 1: MVP' })).toBeVisible();
    await expect(page.getByText('Phase Score')).toBeVisible();
    // Check initial score is 0 by looking for the score display area specifically
    await expect(page.locator('.text-right').getByText('0')).toBeVisible();

    // Select required MVP components from the component palette (using AWS names)
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Cognito' }).click();

    // Verify components are selected
    await expect(page.getByText('Your Architecture (3 components)')).toBeVisible();

    // Submit phase
    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Verify completion feedback
    await expect(page.getByText('Phase Complete!')).toBeVisible();
    await expect(page.getByText('+20')).toBeVisible();
    await expect(page.getByText('100% completion')).toBeVisible();

    // Click Continue to Next Phase button
    await page.getByRole('button', { name: 'Continue to Next Phase →' }).click();

    // Should be in Phase 2 now
    await expect(page.getByRole('heading', { name: 'Phase 2: First Scale' })).toBeVisible();
    await expect(page.locator('.text-right').getByText('20')).toBeVisible(); // Score should be updated
  });

  test('can navigate back to menu', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Click back to menu
    await page.getByRole('button', { name: '← Back to Menu' }).click();

    // Should be back on main menu
    await expect(page.getByRole('heading', { name: 'ArchPath' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Netflix/ })).toBeVisible();
  });

  test('component selection and removal works correctly', async ({ page }) => {
    await page.getByRole('button', { name: /Slack/ }).click();

    // Select a component from the palette (using AWS name)
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await expect(page.getByText('Your Architecture (1 components)')).toBeVisible();

    // Remove the component
    await page.getByRole('button', { name: '✕' }).click();
    await expect(page.getByText('Your Architecture (0 components)')).toBeVisible();
    await expect(page.getByText('No components selected yet')).toBeVisible();
  });
});
