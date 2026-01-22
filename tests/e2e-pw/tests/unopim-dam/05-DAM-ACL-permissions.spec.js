const { test, expect } = require('../../utils/fixtures');
test.describe('Verify the ACL Permission of DAM Test cases', () => {
test('Check the DAM permission in roles section', async({adminPage})=>{
  await adminPage.getByRole('link', { name: ' Settings' }).click();
  await adminPage.getByRole('link', { name: 'Roles' }).click();
  await adminPage.getByRole('link', { name: 'Create Role' }).click();
  await expect(
  adminPage.locator('input[name="permission_type"]').locator('..').locator('.multiselect__tags')
  ).toHaveText('Custom');
  await expect(adminPage.locator('div').filter({ hasText: /^DAM$/ })).toBeVisible();
});

test('Click on the DAM permission', async({adminPage})=>{
  await adminPage.getByRole('link', { name: ' Settings' }).click();
  await adminPage.getByRole('link', { name: 'Roles' }).click();
  await adminPage.getByRole('link', { name: 'Create Role' }).click();
  await expect(
  adminPage.locator('input[name="permission_type"]').locator('..').locator('.multiselect__tags')
  ).toHaveText('Custom');
  await expect(adminPage.locator('div').filter({ hasText: /^DAM$/ })).toBeVisible();
  await adminPage.locator('div').filter({ hasText: /^DAM$/ }).click();
  await expect(adminPage.locator('div').filter({ hasText: /^Asset$/ })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Property$/ })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Comment$/ })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Linked Resources$/ }).first()).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Directory$/ })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Assign Asset$/, exact:true }).first()).toBeVisible();
});

test('Check all DAM permisssion should be checked when clicked', async({adminPage})=>{
  await adminPage.getByRole('link', { name: ' Settings' }).click();
  await adminPage.getByRole('link', { name: 'Roles' }).click();
  await adminPage.getByRole('link', { name: 'Create Role' }).click();
  await expect(
  adminPage.locator('input[name="permission_type"]').locator('..').locator('.multiselect__tags')
  ).toHaveText('Custom');
  await expect(adminPage.locator('div').filter({ hasText: /^DAM$/ })).toBeVisible();
  await adminPage.locator('div').filter({ hasText: /^DAM$/ }).click();
  await expect(adminPage.locator('input[type="checkbox"][value="dam"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Asset$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Property$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset.property"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Comment$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset.comment"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Linked Resources$/ }).first()).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset.linked_resources"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Directory$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.directory"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Assign Asset$/, exact:true }).first()).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset_assign"]')).toBeChecked();
});

test('Create new Role with all DAM permisssion', async({adminPage})=>{
  await adminPage.getByRole('link', { name: ' Settings' }).click();
  await adminPage.getByRole('link', { name: 'Roles' }).click();
  await adminPage.getByRole('link', { name: 'Create Role' }).click();
  await expect(
  adminPage.locator('input[name="permission_type"]').locator('..').locator('.multiselect__tags')
  ).toHaveText('Custom');
  await expect(adminPage.locator('div').filter({ hasText: /^Dashboard$/ }).nth(1)).toBeVisible();
  await adminPage.locator('div').filter({ hasText: /^Dashboard$/ }).nth(1).click();
  await expect(adminPage.locator('div').filter({ hasText: /^DAM$/ })).toBeVisible();
  await adminPage.locator('div').filter({ hasText: /^DAM$/ }).click();
  await expect(adminPage.locator('input[type="checkbox"][value="dam"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Asset$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Property$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset.property"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Comment$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset.comment"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Linked Resources$/ }).first()).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset.linked_resources"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Directory$/ })).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.directory"]')).toBeChecked();
  await expect(adminPage.locator('div').filter({ hasText: /^Assign Asset$/, exact:true }).first()).toBeVisible();
  await expect(adminPage.locator('input[type="checkbox"][value="dam.asset_assign"]')).toBeChecked();
  await adminPage.getByRole('textbox', { name: 'Name' }).click();
  await adminPage.getByRole('textbox', { name: 'Name' }).fill('DAM Manager');
  await adminPage.getByRole('textbox', { name: 'Description' }).click();
  await adminPage.getByRole('textbox', { name: 'Description' })
  .fill('This user have All DAM permissions only');
  await adminPage.getByRole('button', { name: 'Save Role' }).click();
  await expect(adminPage.getByText('Roles Created Successfully')).toBeVisible();
}); 

test('Assign the DAM role to a user', async({adminPage})=>{
  await adminPage.getByRole('link', { name: ' Settings' }).click();
  await adminPage.getByRole('link', { name: 'Users' }).click();
  await adminPage.getByRole('button', { name: 'Create User' }).click();
  await adminPage.getByRole('textbox', { name: 'Name' }).click();
  await adminPage.getByRole('textbox', { name: 'Name' }).fill('Testing Kumar');
  await adminPage.getByRole('textbox', { name: 'email@example.com' }).click();
  await adminPage.getByRole('textbox', { name: 'email@example.com' }).fill('testing@example.com');
  await adminPage.getByRole('textbox', { name: 'Password', exact: true }).click();
  await adminPage.getByRole('textbox', { name: 'Password', exact: true }).fill('test123');
  await adminPage.getByRole('textbox', { name: 'Confirm Password' }).click();
  await adminPage.getByRole('textbox', { name: 'Confirm Password' }).fill('test123');
  await adminPage.locator('div').filter({ hasText: /^UI Locale$/ }).click();
  await adminPage.getByRole('option', { name: 'English (United States)' }).locator('span').first().click();
  await adminPage.locator('div').filter({ hasText: /^Timezone$/ }).click();
  await adminPage.getByRole('textbox', { name: 'timezone-searchbox' }).fill('kolkata');
  await adminPage.getByRole('option', { name: 'Asia/Kolkata (+05:30)' }).locator('span').first().click();
  await adminPage.locator('div').filter({ hasText: /^Role$/ }).nth(1).click();
  await adminPage.getByRole('option', { name: 'DAM Manager' }).locator('span').first().click();
  await adminPage.locator('label[for="status"]').click();
  await adminPage.getByRole('button', { name: 'Save User' }).click();
  await expect(adminPage.getByText(/User created successfully/i)).toBeVisible();
});

test('logout and login by new user credential', async({adminPage})=>{
  await adminPage.click('button.rounded-full');
  await adminPage.getByRole('link', { name: 'Logout' }).click();
  await expect(adminPage).toHaveURL(/.*\/admin\/login$/);
  await adminPage.getByRole('textbox', { name: 'Email Address' }).fill('testing@example.com');
  await adminPage.getByRole('textbox', { name: 'Password' }).fill('test123');
  await adminPage.getByRole('button', { name: 'Sign In' }).click();
  await expect(adminPage).toHaveURL(/admin\/dashboard$/);
  await expect(adminPage.getByRole('link', { name: /Dashboard/ })).toBeVisible();
  await expect(adminPage.getByRole('link', { name: ' DAM' })).toBeVisible();
});
});