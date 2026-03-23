import { test, expect } from '@playwright/test';

test('verify sports pages and navigation', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Check if home title exists
  await expect(page.locator('h1')).toContainText('Clube Desportivo');

  // Find a sports card (Handball) and click it
  // Need to be careful with "Andebol" vs "Andebol" if i18n is not set yet, but default is pt.
  const handballCard = page.locator('h3:has-text("Andebol")');
  await handballCard.click();

  // Should be on sports page
  await expect(page).toHaveURL(/\/sports\/handball/);

  // Verify sport name is visible
  await expect(page.locator('h1')).toContainText('Andebol');

  // Check if the post is loaded (using the title from the news)
  await expect(page.locator('h2')).toContainText('Andebol em Destaque');

  // Go back home
  await page.click('text=Voltar ao Início');
  await expect(page).toHaveURL('http://localhost:5173/');

  // Try another sport (Road Running)
  const roadRunningCard = page.locator('h3:has-text("Corrida de Estrada")');
  await roadRunningCard.click();
  await expect(page).toHaveURL(/\/sports\/road-running/);
  await expect(page.locator('h1')).toContainText('Corrida de Estrada');
  await expect(page.locator('h2')).toContainText('Campeonato Nacional de Clubes');

  // Verify responsive view screenshot
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'verification/mobile_sport_page.png' });

  // Back to desktop and dark mode
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/');
  await page.click('[aria-label="Toggle theme"]');
  await page.locator('h3:has-text("Judo")').click();
  await page.screenshot({ path: 'verification/dark_mode_judo.png' });
});
