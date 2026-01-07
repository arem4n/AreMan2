
import { test, expect } from '@playwright/test';

test('Contact form submission', async ({ page }) => {
  await page.goto('/');

  // Wait for the preloader to be hidden
  await page.waitForSelector('#preloader', { state: 'hidden' });

  // Scroll to the contact form
  await page.evaluate(() => {
    const contactForm = document.getElementById('contacto');
    if (contactForm) {
      contactForm.scrollIntoView();
    }
  });

  // Fill out the form
  await page.fill('input[name="name"]', 'Test Name');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'This is a test message.');

  // Submit the form
  await page.click('button[type="submit"]', { force: true });

  // Wait for the success message to appear and verify it's visible
  const successMessageLocator = page.locator('p:text("¡Solicitud recibida! Te contactaré para agendar.")');
  await expect(successMessageLocator).toBeVisible();

  // Capture a screenshot of the form with the success message
  await page.screenshot({ path: 'contact_form_success.png' });
});
