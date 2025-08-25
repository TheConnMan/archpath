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

test.describe('Component Palette', () => {
  test.beforeEach(async ({ page }) => {
    await skipToCompanySelection(page);
    await page.getByRole('button', { name: /Netflix/ }).click();
  });

  test('displays all component categories', async ({ page }) => {
    const categories = [
      'All',
      'Compute',
      'Database',
      'Storage',
      'Network',
      'Messaging',
      'Analytics',
      'Security',
    ];

    for (const category of categories) {
      // Target category filter buttons specifically by their container
      await expect(page.locator('.flex.flex-wrap.gap-2').getByRole('button', { name: category })).toBeVisible();
    }
  });

  test('filters components by category', async ({ page }) => {
    // Click on Compute category filter button
    await page.locator('.flex.flex-wrap.gap-2').getByRole('button', { name: 'Compute' }).click();

    // Should see compute components in the components grid
    await expect(page.getByRole('button', { name: 'Web Server' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'App Server' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'Serverless' }).and(page.locator('.component-chip'))).toBeVisible();

    // Should NOT see database components in the components grid
    await expect(page.getByRole('button', { name: 'Database' }).and(page.locator('.component-chip'))).not.toBeVisible();
  });

  test('shows all components when All category selected', async ({ page }) => {
    // Click Database filter first
    await page.locator('.flex.flex-wrap.gap-2').getByRole('button', { name: 'Database' }).click();

    // Then click All filter
    await page.locator('.flex.flex-wrap.gap-2').getByRole('button', { name: 'All' }).click();

    // Should see all components again in the components grid
    await expect(page.getByRole('button', { name: 'Web Server' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'Database' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'CDN' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'Load Balancer' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'Message Queue' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'Monitoring' }).and(page.locator('.component-chip'))).toBeVisible();
    await expect(page.getByRole('button', { name: 'Auth Service' }).and(page.locator('.component-chip'))).toBeVisible();
  });

  test('components have educational tooltips', async ({ page }) => {
    // Check that Web Server component has tooltip with educational content
    const webServerButton = page.getByRole('button', { name: 'Web Server' }).and(page.locator('.component-chip'));
    await expect(webServerButton).toHaveAttribute('title', /Serves static content.*nginx.*Apache/);

    // Check Database component tooltip
    const databaseButton = page.getByRole('button', { name: 'Database' }).and(page.locator('.component-chip'));
    await expect(databaseButton).toHaveAttribute(
      'title',
      /Persistent data storage.*PostgreSQL.*MySQL/
    );
  });

  test('help text is displayed', async ({ page }) => {
    await expect(page.getByText('Click components to add/remove them from the current phase')).toBeVisible();
  });

  test('component selection highlighting works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Select Web Server component
    const webServerButton = page.getByRole('button', { name: 'Web Server' }).and(page.locator('.component-chip'));
    await webServerButton.click();

    // Check that component shows selected state with checkmark
    await expect(webServerButton.locator('text=✓')).toBeVisible();
    
    // Check that component has selected styling classes
    await expect(webServerButton).toHaveClass(/selected/);
    await expect(webServerButton).toHaveClass(/bg-gray-600/);
    
    // Select Database component
    const databaseButton = page.getByRole('button', { name: 'Database' }).and(page.locator('.component-chip'));
    await databaseButton.click();

    // Both components should show as selected
    await expect(webServerButton.locator('text=✓')).toBeVisible();
    await expect(databaseButton.locator('text=✓')).toBeVisible();

    // Verify they appear in the selected components list below
    await expect(page.getByText('Your Architecture (2 components)')).toBeVisible();
  });

  test('component toggle functionality (select and deselect)', async ({ page }) => {
    // Select Web Server component first time
    const webServerButton = page.getByRole('button', { name: 'Web Server' }).and(page.locator('.component-chip'));
    await webServerButton.click();

    // Should be selected
    await expect(webServerButton.locator('text=✓')).toBeVisible();
    await expect(page.getByText('Your Architecture (1 components)')).toBeVisible();

    // Click again to deselect
    await webServerButton.click();

    // Should no longer be selected
    await expect(webServerButton.locator('text=✓')).not.toBeVisible();
    await expect(page.getByText('Your Architecture (0 components)')).toBeVisible();
    await expect(page.getByText('No components selected yet')).toBeVisible();

    // Select multiple components and then deselect one
    await webServerButton.click();
    const databaseButton = page.getByRole('button', { name: 'Database' }).and(page.locator('.component-chip'));
    await databaseButton.click();

    // Should have 2 components selected
    await expect(page.getByText('Your Architecture (2 components)')).toBeVisible();

    // Deselect database
    await databaseButton.click();

    // Should have 1 component selected (Web Server)
    await expect(page.getByText('Your Architecture (1 components)')).toBeVisible();
    await expect(webServerButton.locator('text=✓')).toBeVisible();
    await expect(databaseButton.locator('text=✓')).not.toBeVisible();
  });
});
