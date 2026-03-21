import { test, expect } from '@playwright/test';

test('capture mobile screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/cdinfante/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'mobile_hero_verify.png', fullPage: false });
});
