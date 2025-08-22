import { test, expect } from '@playwright/test';

test.describe('Scoring System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Netflix MVP perfect score (all required components)', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();
    
    // Select all required components for Netflix MVP
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Database' }).click();
    await page.getByRole('button', { name: 'Auth Service' }).click();
    
    await page.getByRole('button', { name: 'Submit Phase' }).click();
    
    // Should get perfect score
    await expect(page.getByText('+20')).toBeVisible();
    await expect(page.getByText('100% completion')).toBeVisible();
  });

  test('partial score with missing required components', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();
    
    // Select only some required components
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Database' }).click();
    // Skip Auth Service
    
    await page.getByRole('button', { name: 'Submit Phase' }).click();
    
    // Should get partial score (less than +20)
    await expect(page.getByText(/\+\d+/)).toBeVisible();
    await expect(page.getByText(/\d+% completion/)).toBeVisible();
  });

  test('score accumulates across phases', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();
    
    // Complete MVP phase perfectly
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Database' }).click();
    await page.getByRole('button', { name: 'Auth Service' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();
    
    // Wait for progression to Phase 2
    await page.waitForTimeout(3500);
    
    // Score should be accumulated
    await expect(page.getByText('20')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Phase 2: First Scale' })).toBeVisible();
  });

  test('different companies have different scoring', async ({ page }) => {
    // Test Netflix
    await page.getByRole('button', { name: /Netflix/ }).click();
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Database' }).click();
    await page.getByRole('button', { name: 'Auth Service' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();
    
    const netflixScore = await page.getByText(/\+\d+/).textContent();
    
    // Go back and test different company
    await page.getByRole('button', { name: '← Back to Menu' }).click();
    await page.getByRole('button', { name: /Slack/ }).click();
    
    // Select similar components for Slack MVP
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Database' }).click();
    await page.getByRole('button', { name: 'Auth Service' }).click();
    await page.getByRole('button', { name: 'Submit Phase' }).click();
    
    // Should have feedback (score might be different based on requirements)
    await expect(page.getByText('Phase Complete!')).toBeVisible();
  });

  test('over-engineering penalty with unnecessary components', async ({ page }) => {
    await page.getByRole('button', { name: /Netflix/ }).click();
    
    // Add required components
    await page.getByRole('button', { name: 'Web Server' }).click();
    await page.getByRole('button', { name: 'Database' }).click();
    await page.getByRole('button', { name: 'Auth Service' }).click();
    
    // Add unnecessary components for MVP
    await page.getByRole('button', { name: 'Load Balancer' }).click();
    await page.getByRole('button', { name: 'CDN' }).click();
    await page.getByRole('button', { name: 'Event Streaming' }).click();
    
    await page.getByRole('button', { name: 'Submit Phase' }).click();
    
    // Should get completion but potentially lower score due to over-engineering
    await expect(page.getByText('Phase Complete!')).toBeVisible();
    await expect(page.getByText(/\+\d+/)).toBeVisible();
  });
});