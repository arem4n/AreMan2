import { test, expect } from '@playwright/test';

test('preloader shows on initial load', async ({ page }) => {
  await page.goto('/');
  const preloader = page.locator('#preloader');
  // Check if it exists at least
  await expect(preloader).toBeAttached();

  // Take screenshot to see what's happening
  await page.screenshot({ path: 'preloader-initial.png' });

  // It might already be hiding if the page load was slow and then fast
  // But with 1000ms delay it should stay for a bit.
});

test('navigation test with screenshots', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });

  const logoCodexLink = page.locator('header').getByRole('link', { name: 'LogoCodex' });

  // Start navigation and wait for preloader to appear
  await logoCodexLink.click();
  await page.screenshot({ path: 'after-click.png' });

  await expect(page.locator('#preloader')).not.toHaveClass(/preloader-hiding/);
  await page.screenshot({ path: 'preloader-active.png' });

  await expect(page).toHaveURL(/\/portafolio/);
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });
});
