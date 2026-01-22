const { test, expect } = require('../../utils/fixtures');
test.describe('UnoPim DAM installation Test cases', () => {
test('DAM module should be visible in sidebar', async ({ adminPage }) => {
  await expect(adminPage.getByRole('link', { name: / DAM/ })).toBeVisible();
});

test('DAM icon should be visible in sidebar', async ({ adminPage }) => {
  await expect(adminPage.locator('span.icon-dam-menu')).toBeVisible();
});

test('DAM option should be clickable', async ({ adminPage }) => {
  await adminPage.getByRole('link', {name: / DAM/}).click();
  await expect(adminPage).toHaveURL(/admin\/dam$/);
});

test('Check that DAM page is open or not', async({adminPage})=>{
  await expect(adminPage.getByRole('link', { name: / DAM/ })).toBeVisible();
  await adminPage.getByRole('link', {name: / DAM/}).click();
  await expect(adminPage).toHaveURL(/admin\/dam$/);
  await expect(adminPage.
  getByText('Tool can help you organise, store, and manage all your media asset in one place')).toBeVisible();
});
});