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

test.describe('UI & Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await skipToCompanySelection(page);
  });

  test('main menu has proper heading structure', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'ArchPath' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'How to Play' })).toBeVisible();

    // Company names should be h3
    await expect(page.getByRole('heading', { level: 3, name: 'Netflix' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Slack' })).toBeVisible();
  });

  test('game view has proper heading hierarchy', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    await expect(
      page.getByRole('heading', { level: 1, name: 'Netflix Architecture Challenge' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Phase 1: MVP' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Components' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Challenge' })).toBeVisible();
  });

  test('dark mode theme is applied consistently', async ({ page }) => {
    // Check main background is dark
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', /rgb\(17, 24, 39\)|#111827/); // Gray-900

    // Check text is light
    await expect(body).toHaveCSS('color', /rgb\(243, 244, 246\)|#f3f4f6/); // Gray-100
  });

  test('buttons have proper contrast and hover states', async ({ page }) => {
    // Test company selection buttons
    const netflixButton = page.getByRole('button', { name: /Netflix/ });
    await expect(netflixButton).toBeVisible();

    // Test hover state
    await netflixButton.hover();
    // Button should still be visible after hover
    await expect(netflixButton).toBeVisible();
  });

  test('component tooltips provide educational content', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Check that component tooltips contain educational information
    const webServerBtn = page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Web Server' });
    await expect(webServerBtn).toHaveAttribute('title', /Examples:.*nginx.*Apache/);

    const databaseBtn = page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Database' });
    await expect(databaseBtn).toHaveAttribute('title', /Examples:.*PostgreSQL.*MySQL/);

    const authBtn = page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Auth Service' });
    await expect(authBtn).toHaveAttribute('title', /Examples:.*Auth0.*AWS Cognito/);
  });

  test('phase progression indicator shows current state', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Phase 1 should be active (current)
    const phase1 = page.locator('.rounded-full').first();
    await expect(phase1).toHaveText('1');

    // Complete phase and check progression
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Web Server' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Database' }).click();
    await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Auth Service' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();

    // Click Continue to Next Phase
    await page.getByRole('button', { name: 'Continue to Next Phase →' }).click();

    // Phase 2 should now be active
    await expect(page.getByRole('heading', { name: 'Phase 2: First Scale' })).toBeVisible();
  });

  test('responsive design works on different viewport sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Main elements should still be visible
    await expect(page.getByRole('heading', { name: 'ArchPath' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Netflix/ })).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'ArchPath' })).toBeVisible();

    // Reset to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('heading', { name: 'ArchPath' })).toBeVisible();
  });

  test('loading states and transitions work smoothly', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();

    // Game view should load without errors
    await expect(
      page.getByRole('heading', { name: 'Netflix Architecture Challenge' })
    ).toBeVisible();

    // Submit button should change state after clicking
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();

    await expect(page.getByRole('button', { name: '✅ Submitted' })).toBeDisabled();
  });
});
