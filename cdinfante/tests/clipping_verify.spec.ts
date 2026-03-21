import { test, expect } from '@playwright/test';

test('verify button clipping in hero section', async ({ page }) => {
  await page.goto('http://localhost:5173/cdinfante/');

  // Set a common desktop resolution
  await page.setViewportSize({ width: 1280, height: 720 });

  // Wait for animations
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'hero_desktop_clipping.png' });

  // Set a mobile resolution
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'hero_mobile_clipping.png' });

  // Set a small desktop resolution where clipping might occur due to large h1
  await page.setViewportSize({ width: 1024, height: 600 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'hero_small_desktop_clipping.png' });
});
