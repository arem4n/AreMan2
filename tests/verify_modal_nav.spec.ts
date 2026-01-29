import { test, expect } from '@playwright/test';

test('navigation from home carousel to case study page', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('/');
  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });

  // Click on the active slide card
  const card = page.locator('.carousel-card-wrapper').filter({ hasText: /AREMAN/i }).locator('img').first();
  await card.click();

  // Modal should open.
  console.log('Waiting for modal...');
  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible();

  const verCasoBtn = modal.getByRole('link', { name: /Ver Caso de Estudio/i });
  console.log('Clicking Ver Caso de Estudio in modal...');
  await verCasoBtn.click();

  await expect(page.locator('#preloader')).not.toHaveClass(/preloader-hiding/);
  console.log('Preloader shown!');

  await expect(page).toHaveURL(/\/portafolio\/areman-escudo-heraldico/);
  console.log('Landed on case study page!');

  await expect(page.locator('#preloader')).toHaveClass(/preloader-hiding/, { timeout: 15000 });
  console.log('Preloader hidden!');
});
