
import { test, expect } from '@playwright/test';

test('Simplified portfolio carousel verification', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const portfolioSection = page.locator('#portafolio');
  const activeCard = page.locator('.carousel-card-wrapper[style*="opacity: 1"]');
  const activeImage = activeCard.locator('img');

  // Wait for the portfolio section to be in the viewport
  await portfolioSection.scrollIntoViewIfNeeded();

  // 1. Verify Image Visibility
  await expect(activeImage).toBeVisible({ timeout: 10000 });

  // 2. Capture a screenshot for visual confirmation of all fixes
  await page.screenshot({ path: 'portfolio_final_verification.png', fullPage: true });
});
