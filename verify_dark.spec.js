import { test, expect } from '@playwright/test';

test('dark mode verification', async ({ page }) => {
  await page.goto('http://localhost:5173/cdinfante/');

  // Find the theme toggle button (should have the Sun/Moon icon)
  const themeToggle = page.locator('button').filter({ has: page.locator('.lucide-sun, .lucide-moon') });
  await themeToggle.click();

  // Check if html has class 'dark'
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  // Take screenshot
  await page.screenshot({ path: 'dark_mode_verified.png' });
});
