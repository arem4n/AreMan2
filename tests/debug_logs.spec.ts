import { test, expect } from '@playwright/test';

test('debug preloader with logs', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('/');
  const preloader = page.locator('#preloader');

  console.log('Waiting for preloader-hiding class...');
  await expect(preloader).toHaveClass(/preloader-hiding/, { timeout: 15000 });
  console.log('Preloader hidden!');

  const logoCodexLink = page.locator('header').getByRole('link', { name: 'LogoCodex' });

  console.log('Clicking LogoCodex link...');
  await logoCodexLink.click();

  console.log('Waiting for preloader to show...');
  await expect(preloader).not.toHaveClass(/preloader-hiding/);
  console.log('Preloader shown!');

  console.log('Waiting for URL change...');
  await expect(page).toHaveURL(/\/portafolio/);

  console.log('Waiting for preloader to hide again...');
  await expect(preloader).toHaveClass(/preloader-hiding/, { timeout: 15000 });
  console.log('Preloader hidden again!');
});
