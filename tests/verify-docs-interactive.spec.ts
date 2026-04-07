import { test, expect } from '@playwright/test';

test('verify docs page interactivity and writing posts section', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/docs');

  // Wait for the page to be fully loaded (check for title)
  await expect(
    page.getByText(
      /Brand & Identity Documentation|Documentação de Marca e Identidade/,
    ),
  ).toBeVisible();

  // Log all text content to debug
  const bodyText = await page.innerText('body');
  console.log('Body text length:', bodyText.length);

  // Take an initial screenshot to see what's on the screen
  await page.screenshot({
    path: '/home/jules/verification/docs_debug_1.png',
    fullPage: true,
  });

  // 1. Verify Writing Posts section exists
  const writingPostsSection = page.locator('#writing-posts');
  await expect(writingPostsSection).toBeVisible();

  // 2. Test Interactivity: Collapse
  const collapseHeader = page.getByTestId('collapse-header');
  await collapseHeader.click();
  await expect(page.getByTestId('collapse-content')).toBeVisible();

  // 3. Test Interactivity: Toast
  const triggerToastBtn = page.getByRole('button', { name: /Trigger Toast/i });
  await triggerToastBtn.click();
  await expect(
    page.getByText(
      /Changes saved successfully!|Alterações guardadas com sucesso!/,
    ),
  ).toBeVisible();

  // 4. Test Interactivity: Generate Input
  const generateBtn = page.locator('button:has(svg.lucide-zap)');
  const initialVal = await page.locator('input[readonly]').inputValue();
  await generateBtn.click();
  await page.waitForTimeout(1000);
  const newVal = await page.locator('input[readonly]').inputValue();
  expect(newVal).not.toBe(initialVal);

  // 5. Test Interactivity: Modal
  const openModalBtn = page.getByRole('button', { name: /Open Modal/i });
  await openModalBtn.click();
  await expect(page.getByTestId('modal-preview')).toBeVisible();

  // Take screenshot with modal open
  await page.screenshot({
    path: '/home/jules/verification/docs_modal_open.png',
    fullPage: true,
  });

  await page.getByTestId('modal-confirm-btn').click();
  await expect(page.getByTestId('modal-preview')).not.toBeVisible();

  // Final screenshot
  await page.screenshot({
    path: '/home/jules/verification/docs_interactive_final.png',
    fullPage: true,
  });
});
