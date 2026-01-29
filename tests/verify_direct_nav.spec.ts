import { test, expect } from '@playwright/test';

test('direct access to case study page', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('/portafolio/areman-escudo-heraldico');

  const preloader = page.locator('#preloader');
  await expect(preloader).toBeVisible();
  await expect(preloader).toHaveClass(/preloader-hiding/, { timeout: 15000 });

  // Check for content
  await expect(page.getByText(/Escudo Heráldico/i)).toBeVisible();
  console.log('Case study content visible!');
});
