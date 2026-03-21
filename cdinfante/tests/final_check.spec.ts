import { test, expect } from '@playwright/test';

test('final visual sweep', async ({ page }) => {
  // Desktop Dark Mode
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:5173/cdinfante/');
  await page.waitForLoadState('networkidle');

  // Toggle Dark Mode (it starts in light mode by default in my implementation state)
  // Actually the state is internal to App.tsx, so I'll click the toggle button
  const themeToggle = page.locator('button[aria-label="Toggle theme"]').first();
  await themeToggle.click();

  // Wait for transition
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'final_dark_desktop.png', fullPage: true });

  // Mobile Dark Mode
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'final_dark_mobile.png', fullPage: false });
});
