import { test, expect } from '@playwright/test';

test.describe('Technology Flavor Selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear());
  });

  test('displays flavor selection screen on first visit', async ({ page }) => {
    // Should show flavor selection before company selection
    await expect(page.locator('h1')).toHaveText('Choose Your Tech Stack');
    
    // Should display all three flavor options
    await expect(page.getByRole('button').filter({ hasText: 'Amazon Web Services' }).first()).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'Google Cloud Platform' }).first()).toBeVisible();
    await expect(page.getByRole('button').filter({ hasText: 'Open Source' }).first()).toBeVisible();
  });

  test('can select AWS flavor and proceed to company selection', async ({ page }) => {
    // Click AWS flavor
    await page.getByRole('button').filter({ hasText: 'Amazon Web Services' }).first().click();
    
    // Should navigate to company selection
    await expect(page.locator('h1')).toHaveText('ArchPath');
    await expect(page.locator('text=Netflix')).toBeVisible();
    
    // Should show "Change Technology Stack" link
    await expect(page.locator('text=Change Technology Stack')).toBeVisible();
  });

  test('can select GCP flavor and see GCP-specific component names', async ({ page }) => {
    // Select GCP flavor
    await page.getByRole('button').filter({ hasText: 'Google Cloud Platform' }).first().click();
    
    // Select Netflix to start game
    await page.getByRole('button', { name: /Netflix.*Start Challenge/ }).click();
    
    // Should see GCP-specific component names
    await expect(page.locator('text=Compute Engine')).toBeVisible(); // Instead of Web Server
    await expect(page.locator('text=CloudSQL')).toBeVisible(); // Instead of Database
    await expect(page.locator('text=Cloud Storage')).toBeVisible(); // Instead of File Storage
  });

  test('can select Open Source flavor and see OSS component names', async ({ page }) => {
    // Select Open Source flavor
    await page.click('text=Open Source');
    
    // Select Netflix to start game
    await page.click('text=Netflix >> text=Start Challenge');
    
    // Should see Open Source component names
    await expect(page.locator('text=Docker')).toBeVisible(); // Instead of Web Server
    await expect(page.locator('text=PostgreSQL')).toBeVisible(); // Instead of Database
    await expect(page.locator('text=MinIO')).toBeVisible(); // Instead of File Storage
  });

  test('flavor preference persists across page reloads', async ({ page }) => {
    // Select AWS flavor
    await page.click('text=Amazon Web Services');
    
    // Reload page
    await page.reload();
    
    // Should skip flavor selection and go to company selection
    await expect(page.locator('h1')).toHaveText('ArchPath');
    
    // Start a game to verify AWS names are shown
    await page.click('text=Netflix >> text=Start Challenge');
    
    // Should see AWS component names
    await expect(page.locator('text=EC2')).toBeVisible();
    await expect(page.locator('text=RDS')).toBeVisible();
  });

  test('can change flavor from company selection screen', async ({ page }) => {
    // Select AWS initially
    await page.click('text=Amazon Web Services');
    
    // Click "Change Technology Stack" link
    await page.click('text=Change Technology Stack');
    
    // Should return to flavor selection
    await expect(page.locator('h1')).toHaveText('Choose Your Tech Stack');
    
    // Select GCP instead
    await page.click('text=Google Cloud Platform');
    
    // Start game and verify GCP names
    await page.click('text=Netflix >> text=Start Challenge');
    await expect(page.locator('text=Compute Engine')).toBeVisible();
  });

  test('can change flavor mid-game using settings button', async ({ page }) => {
    // Select AWS flavor and start game
    await page.click('text=Amazon Web Services');
    await page.click('text=Netflix >> text=Start Challenge');
    
    // Verify AWS names initially
    await expect(page.locator('text=EC2')).toBeVisible();
    
    // Click settings button to open flavor selector
    await page.click('button[title="Change technology stack"]');
    
    // Should see flavor dropdown
    await expect(page.locator('text=Technology Stack:')).toBeVisible();
    
    // Select GCP
    await page.click('text=Google Cloud Platform');
    
    // Should see component names change to GCP
    await expect(page.locator('text=Compute Engine')).toBeVisible();
    await expect(page.locator('text=EC2')).not.toBeVisible();
  });

  test('component tooltips show equivalents across flavors', async ({ page }) => {
    // Select AWS flavor and start game
    await page.click('text=Amazon Web Services');
    await page.click('text=Netflix >> text=Start Challenge');
    
    // Hover over a component to see tooltip
    await page.hover('text=EC2');
    
    // Tooltip should show equivalents
    // Note: Playwright doesn't easily test tooltip content, but we can verify the tooltip attribute exists
    const tooltip = await page.locator('button:has-text("EC2")').getAttribute('title');
    expect(tooltip).toContain('AWS: EC2');
    expect(tooltip).toContain('GCP: Compute Engine');
    expect(tooltip).toContain('Open Source: Docker');
  });

  test('flavor selection maintains game state and progress', async ({ page }) => {
    // Select AWS flavor and start game
    await page.click('text=Amazon Web Services');
    await page.click('text=Netflix >> text=Start Challenge');
    
    // Select some components
    await page.click('text=EC2');
    await page.click('text=RDS');
    
    // Change flavor mid-game
    await page.click('button[title="Change technology stack"]');
    await page.click('text=Google Cloud Platform');
    
    // Components should still be selected (just with different names)
    await expect(page.locator('.selected:has-text("Compute Engine")')).toBeVisible();
    await expect(page.locator('.selected:has-text("CloudSQL")')).toBeVisible();
    
    // Can still submit phase
    await page.click('text=Submit Phase');
    await expect(page.locator('text=✅ Submitted')).toBeVisible();
  });

  test('all flavor options display correct example technologies', async ({ page }) => {
    // Check AWS examples
    const awsCard = page.locator('text=Amazon Web Services').locator('..');
    await expect(awsCard.locator('text=EC2')).toBeVisible();
    await expect(awsCard.locator('text=RDS')).toBeVisible();
    await expect(awsCard.locator('text=S3')).toBeVisible();
    await expect(awsCard.locator('text=Lambda')).toBeVisible();
    
    // Check GCP examples
    const gcpCard = page.locator('text=Google Cloud Platform').locator('..');
    await expect(gcpCard.locator('text=Compute Engine')).toBeVisible();
    await expect(gcpCard.locator('text=CloudSQL')).toBeVisible();
    await expect(gcpCard.locator('text=Cloud Storage')).toBeVisible();
    await expect(gcpCard.locator('text=Cloud Functions')).toBeVisible();
    
    // Check OSS examples
    const ossCard = page.locator('text=Open Source').locator('..');
    await expect(ossCard.locator('text=Docker')).toBeVisible();
    await expect(ossCard.locator('text=PostgreSQL')).toBeVisible();
    await expect(ossCard.locator('text=MinIO')).toBeVisible();
    await expect(ossCard.locator('text=Kafka')).toBeVisible();
  });

  test('flavor dropdown closes when clicking outside', async ({ page }) => {
    // Setup game and open flavor dropdown
    await page.click('text=Amazon Web Services');
    await page.click('text=Netflix >> text=Start Challenge');
    await page.click('button[title="Change technology stack"]');
    
    // Dropdown should be visible
    await expect(page.locator('text=Technology Stack:')).toBeVisible();
    
    // Click outside the dropdown
    await page.click('h1');
    
    // Dropdown should close
    await expect(page.locator('text=Technology Stack:')).not.toBeVisible();
  });

  test('flavor selection works correctly with all companies', async ({ page }) => {
    // Test with multiple companies
    const companies = ['Netflix', 'Slack', 'Uber'];
    
    for (const company of companies) {
      // Select GCP flavor
      await page.click('text=Google Cloud Platform');
      
      // Start company challenge
      await page.click(`text=${company} >> text=Start Challenge`);
      
      // Verify GCP component names are shown
      await expect(page.locator('text=Compute Engine')).toBeVisible();
      
      // Go back to menu to test next company
      await page.click('text=← Back to Menu');
      
      // Clear storage and reload to reset flavor selection
      await page.evaluate(() => localStorage.clear());
      await page.reload();
    }
  });
});