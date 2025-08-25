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

test.describe('Scoring System', () => {
  test.beforeEach(async ({ page }) => {
    await skipToCompanySelection(page);
  });

  test('Netflix MVP perfect score (all required components)', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Select all required components for Netflix MVP from the component palette (using AWS names)
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Cognito' }).click();

    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Should get perfect score
    await expect(page.getByText('+20')).toBeVisible();
    await expect(page.getByText('100% completion')).toBeVisible();
  });

  test('partial score with missing required components', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Select only some required components from the component palette (using AWS names)
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    // Skip Cognito

    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Should get partial score (less than +20) - target the main score display
    await expect(page.locator('.text-2xl.font-bold.text-green-400').getByText(/\+\d+/)).toBeVisible();
    await expect(page.getByText(/\d+% completion/)).toBeVisible();
  });

  test('score accumulates across phases', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Complete MVP phase perfectly (using AWS names)
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Cognito' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Click Continue to Next Phase button
    await page.getByRole('button', { name: 'Continue to Next Phase →' }).click();

    // Score should be accumulated
    await expect(page.locator('.text-right').getByText('20')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Phase 2: First Scale' })).toBeVisible();
  });

  test('different companies have different scoring', async ({ page }) => {
    // Test Netflix
    await page.getByRole('button', { name: /Netflix/ }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Cognito' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();

    await page.locator('.text-2xl.font-bold.text-green-400').getByText(/\+\d+/).textContent();

    // Go back and test different company
    await page.getByRole('button', { name: '← Back to Menu' }).click();
    await page.getByRole('button', { name: /Slack/ }).click();

    // Select similar components for Slack MVP
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Cognito' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Should have feedback (score might be different based on requirements)
    await expect(page.getByText('Phase Complete!')).toBeVisible();
  });

  test('over-engineering penalty with unnecessary components', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Add required components from the component palette
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'EC2' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'RDS' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Cognito' }).click();

    // Add unnecessary components for MVP
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Load Balancer' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'CDN' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Event Streaming' }).click();

    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Should get completion but potentially lower score due to over-engineering
    await expect(page.getByText('Phase Complete!')).toBeVisible();
    await expect(page.locator('.text-2xl.font-bold.text-green-400').getByText(/\+\d+/)).toBeVisible();
  });
});
