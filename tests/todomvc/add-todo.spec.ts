import { test, expect } from '@playwright/test';

test('Add a todo item in TodoMVC', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Run only in Chrome');

  // Navigate to the TodoMVC demo page
  await page.goto('https://demo.playwright.dev/todomvc');

  // Take a snapshot (screenshot) after navigation
  await page.screenshot({ path: 'todomvc-1.png', fullPage: true });

  // Assert the heading exists
  await expect(page.getByRole('heading', { name: 'todos', level: 1 })).toBeVisible();

  // Find the textbox and add a todo
  const textbox = page.getByPlaceholder('What needs to be done?');
  await expect(textbox).toBeVisible();
  await textbox.fill('Buy groceries');
  await textbox.press('Enter');

  // Take a snapshot after adding the todo
  await page.screenshot({ path: 'todomvc-2.png', fullPage: true });

  // Assert the todo item is added
  const todoItem = page.getByRole('listitem').filter({ hasText: 'Buy groceries' });
  await expect(todoItem).toBeVisible();
  await expect(todoItem.getByRole('checkbox')).toBeVisible();

  // Assert the footer shows 1 item left
  await expect(page.getByText('1 item left')).toBeVisible();
});
