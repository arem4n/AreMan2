
import { test, expect } from '@playwright/test';

test('Portfolio carousel alignment', async ({ page }) => {
  await page.goto('/');

  // Wait for the preloader to be hidden
  await page.waitForSelector('#preloader', { state: 'hidden' });

  // Scroll to the portfolio section
  await page.evaluate(() => {
    const portfolioSection = document.getElementById('portafolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView();
    }
  });

  // Wait for the carousel to be visible
  await page.waitForSelector('.carousel-card-wrapper');

  // Capture a screenshot of the portfolio section
  await page.screenshot({ path: 'portfolio_carousel_alignment.png' });
});
