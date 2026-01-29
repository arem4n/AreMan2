import { test, expect } from '@playwright/test';

test('access to portafolio page', async ({ page }) => {
  await page.goto('/portafolio');
  const preloader = page.locator('#preloader');
  await expect(preloader).toHaveClass(/preloader-hiding/, { timeout: 15000 });

  await expect(page.getByText(/Manual LogoCodeX/i)).toBeVisible();
  console.log('LogoCodex page rendered!');
});
