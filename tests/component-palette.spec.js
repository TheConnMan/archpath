import { test, expect } from '@playwright/test';

test.describe('Component Palette', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Netflix/ }).click();
  });

  test('displays all component categories', async ({ page }) => {
    const categories = ['All', 'Compute', 'Database', 'Storage', 'Network', 'Messaging', 'Analytics', 'Security'];
    
    for (const category of categories) {
      await expect(page.getByRole('button', { name: category })).toBeVisible();
    }
  });

  test('filters components by category', async ({ page }) => {
    // Click on Compute category
    await page.getByRole('button', { name: 'Compute' }).click();
    
    // Should see compute components
    await expect(page.getByRole('button', { name: 'Web Server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'App Server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Serverless' })).toBeVisible();
    
    // Should NOT see database components
    await expect(page.getByRole('button', { name: 'Database' })).not.toBeVisible();
  });

  test('shows all components when All category selected', async ({ page }) => {
    // Click Database first
    await page.getByRole('button', { name: 'Database' }).click();
    
    // Then click All
    await page.getByRole('button', { name: 'All' }).click();
    
    // Should see all components again
    await expect(page.getByRole('button', { name: 'Web Server' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Database' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'CDN' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Load Balancer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Message Queue' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Monitoring' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Auth Service' })).toBeVisible();
  });

  test('components have educational tooltips', async ({ page }) => {
    // Check that Web Server has tooltip with educational content
    const webServerButton = page.getByRole('button', { name: 'Web Server' });
    await expect(webServerButton).toHaveAttribute('title', /Serves static content.*nginx.*Apache/);
    
    // Check Database tooltip
    const databaseButton = page.getByRole('button', { name: 'Database' });
    await expect(databaseButton).toHaveAttribute('title', /Persistent data storage.*PostgreSQL.*MySQL/);
  });

  test('help text is displayed', async ({ page }) => {
    await expect(page.getByText('Click components to add them to the current phase')).toBeVisible();
  });
});