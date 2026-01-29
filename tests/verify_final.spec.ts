import { test, expect } from '@playwright/test';

test('preloader shows on initial load', async ({ page }) => {
  await page.goto('/');
  // Preloader should be visible initially
  const preloader = page.locator('#preloader');
  await expect(preloader).toBeVisible();
  // Wait for it to have the hiding class
  await expect(preloader).toHaveClass(/preloader-hiding/, { timeout: 15000 });
});

test('navigation to portafolio works with preloader', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });

  // Click on "LogoCodex" in the header
  const logoCodexLink = page.locator('header').getByRole('link', { name: 'LogoCodex' });
  await logoCodexLink.click();

  // Preloader should lose the hiding class during transition
  await expect(page.locator('#preloader')).not.toHaveClass(/preloader-hiding/);

  // Should land on /portafolio
  await expect(page).toHaveURL(/\/portafolio/);
  // And hide again
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });
});

test('navigation to a case study works', async ({ page }) => {
  await page.goto('/portafolio');
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });

  // Find a project link in AllCaseStudiesGrid.
  const projectLink = page.locator('a[href^="/portafolio/"]').first();
  await projectLink.click();

  // Preloader should show
  await expect(page.locator('#preloader')).not.toHaveClass(/preloader-hiding/);

  // URL should contain /portafolio/
  await expect(page).toHaveURL(/\/portafolio\/.+/);
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });
});
