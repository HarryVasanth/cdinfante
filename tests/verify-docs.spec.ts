import { test, expect } from '@playwright/test';

test('verify docs page features', async ({ page }) => {
  await page.goto('http://localhost:5173/docs');

  // Wait for typography section
  await expect(page.locator('#typography')).toBeVisible();

  // Check for brand colors
  await expect(page.getByText('Brand Navy')).toBeVisible();

  // Capture screenshot before other checks that might fail
  await page.screenshot({
    path: '/home/jules/verification/docs_final_debug.png',
    fullPage: true,
  });

  // Check for radar chart (PT or EN)
  const radarText = await page
    .getByText(/Radar Chart|Gráfico de Radar/)
    .isVisible();
  expect(radarText).toBeTruthy();
});
