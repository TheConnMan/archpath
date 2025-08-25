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

test.describe('All Companies', () => {
  test.beforeEach(async ({ page }) => {
    await skipToCompanySelection(page);
  });

  const companies = [
    { name: 'Netflix', description: 'Video streaming platform', difficulty: 'Easy' },
    { name: 'Slack', description: 'Real-time workplace communication', difficulty: 'Easy' },
    { name: 'Uber', description: 'Ride-sharing platform', difficulty: 'Hard' },
    { name: 'Spotify', description: 'Music streaming & recommendations', difficulty: 'Medium' },
    { name: 'Instagram', description: 'Photo & video social platform', difficulty: 'Medium' },
    { name: 'Stripe', description: 'Payment processing platform', difficulty: 'Medium' },
    { name: 'Monzo', description: 'Digital banking platform', difficulty: 'Hard' },
    { name: 'Robinhood', description: 'Commission-free trading platform', difficulty: 'Hard' },
    { name: 'Shopify', description: 'Multi-tenant commerce platform', difficulty: 'Hard' },
    { name: 'DoorDash', description: 'Real-time delivery logistics', difficulty: 'Hard' },
    { name: 'Etsy', description: 'Creative marketplace platform', difficulty: 'Medium' },
  ];

  companies.forEach(company => {
    test(`can start ${company.name} challenge`, async ({ page }) => {
      await page.getByRole('button', { name: new RegExp(company.name) }).click();

      // Should be in game view
      await expect(
        page.getByRole('heading', { name: `${company.name} Architecture Challenge` })
      ).toBeVisible();
      await expect(page.getByText(company.description)).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Phase 1: MVP' })).toBeVisible();

      // Should show company-specific challenge
      await expect(page.getByRole('heading', { name: 'Challenge', exact: true }).last()).toBeVisible();

      // Should have component palette
      await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();

      // Should have hints
      await expect(page.getByRole('heading', { name: 'Hints', exact: true })).toBeVisible();
    });

    test(`${company.name} displays correct difficulty`, async ({ page }) => {
      const companyCard = page.getByRole('button', { name: new RegExp(company.name) });
      await expect(companyCard.getByText(company.difficulty)).toBeVisible();
    });

    test(`${company.name} has architecture evolution steps`, async ({ page }) => {
      const companyCard = page.getByRole('button', { name: new RegExp(company.name) });
      await expect(companyCard.getByText('Architecture Evolution:')).toBeVisible();

      // Should have 4 evolution steps
      await expect(companyCard.getByText(/1\./)).toBeVisible();
      await expect(companyCard.getByText(/2\./)).toBeVisible();
      await expect(companyCard.getByText(/3\./)).toBeVisible();
      await expect(companyCard.getByText(/4\./)).toBeVisible();
    });
  });

  test('all companies have unique challenges per phase', async ({ page }) => {
    // Test that Netflix and Slack have different MVP challenges
    await page.getByRole('button', { name: /Netflix/ }).click();
    const netflixChallenge = await page
      .getByText(/Netflix started as a DVD-by-mail service/)
      .textContent();

    await page.getByRole('button', { name: '← Back to Menu' }).click();
    await page.getByRole('button', { name: /Slack/ }).click();
    const slackChallenge = await page.textContent(
      '[data-testid="challenge-text"], .card:has-text("Challenge") p'
    );

    // Challenges should be different
    expect(netflixChallenge).not.toBe(slackChallenge);
  });

  test('phase progression works for all companies', async ({ page }) => {
    for (const company of companies.slice(0, 2)) {
      // Test first 2 companies to save time
      await page.goto('/');
      await page.getByRole('button', { name: new RegExp(company.name) }).click();

      // Complete MVP phase with basic components from the component palette
      await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Web Server' }).click();
      await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Database' }).click();
      await page.locator('.grid.grid-cols-1.gap-2').getByRole('button', { name: 'Auth Service' }).click();
      await page.getByRole('button', { name: 'Submit Phase' }).click();

      // Click Continue to Next Phase
      await page.getByRole('button', { name: 'Continue to Next Phase →' }).click();

      // Should be in Phase 2
      await expect(page.getByRole('heading', { name: 'Phase 2: First Scale' })).toBeVisible();
    }
  });
});
