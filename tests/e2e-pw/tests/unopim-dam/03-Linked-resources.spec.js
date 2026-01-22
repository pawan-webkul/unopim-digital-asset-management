const { test, expect } = require('../../utils/fixtures');
test.describe('Linked the asset to product', () => {
  test('Create a Asset Type Attribute', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: ' Catalog' }).click();
    await adminPage.getByRole('link', { name: 'Attributes' }).click();
    await adminPage.getByRole('link', { name: 'Create Attribute' }).click();
    await adminPage.getByRole('textbox', { name: 'Code' }).click();
    await adminPage.getByRole('textbox', { name: 'Code' }).fill('product_asset');
    await adminPage.locator('input[name="type"]').locator('..').locator('.multiselect__placeholder').click();
    await adminPage.getByRole('option', { name: 'Asset' }).locator('span').first().click();
    await adminPage.locator('input[name="en_US\\[name\\]"]').click();
    await adminPage.locator('input[name="en_US\\[name\\]"]').fill('Product Asset');
    await adminPage.getByRole('button', { name: 'Save Attribute' }).click();
    await expect(adminPage.getByText(/Attribute Created Successfully/i)).toBeVisible();
  });

  test('Assign the attribute to the attribute family', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: ' Catalog' }).click();
    await adminPage.getByRole('link', { name: 'Attribute Families' }).click();
    await adminPage.getByText('defaultDefault').getByTitle('Edit').click();
    const dragHandle = await adminPage.locator('#unassigned-attributes i.icon-drag:near(:text("Product Asset"))').first();
    const dropTarget = await adminPage.locator('#assigned-attribute-groups .group_node').first();
    const dragBox = await dragHandle.boundingBox();
    const dropBox = await dropTarget.boundingBox();
    if (dragBox && dropBox) {
      await adminPage.mouse.move(dragBox.x + dragBox.width / 2, dragBox.y + dragBox.height / 2);
      await adminPage.mouse.down();
      await adminPage.mouse.move(dropBox.x + dropBox.width / 2, dropBox.y + dropBox.height / 2, { steps: 10 });
      await adminPage.mouse.up();
    }
    await adminPage.getByRole('button', { name: 'Save Attribute Family' }).click();
    await expect(adminPage.getByText(/Family updated successfully/i)).toBeVisible();
  });

  test('Create Product with the asset', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: ' Catalog' }).click();
    await adminPage.getByRole('link', { name: 'Products' }).click();
    await adminPage.getByRole('button', { name: 'Create Product' }).click();
    await adminPage.locator('div').filter({ hasText: /^Select option$/ }).first().click();
    await adminPage.getByRole('option', { name: 'Simple' }).locator('span').first().click();
    await adminPage.locator('div').filter({ hasText: /^Select option$/ }).click();
    await adminPage.getByRole('option', { name: 'Default' }).locator('span').first().click();
    await adminPage.locator('input[name="sku"]').click();
    await adminPage.locator('input[name="sku"]').fill('1082011');
    await adminPage.getByRole('button', { name: 'Save Product' }).click();
    await expect(adminPage.getByText(/Product created successfully/i)).toBeVisible();
    await adminPage.locator('label').filter({ hasText: 'Add Asset' }).click();
    await expect(adminPage.getByText('Assign Assets')).toBeVisible();
    await expect(adminPage.getByText('Directory')).toBeVisible();
    await expect(adminPage.getByRole('textbox', { name: 'Search', exact: true })).toBeVisible();
    await adminPage.getByRole('img', { name: 'bikes.jpeg' }).click();
    await expect(adminPage.getByText('Assign', { exact: true })).toBeVisible();
    await adminPage.getByText('Assign', { exact: true }).click();
    await adminPage.locator('#product_number').click();
    await adminPage.locator('#product_number').fill('1011');
    await adminPage.locator('#name').click();
    await adminPage.locator('#name').fill('1082011');
    await adminPage.locator('#url_key').click();
    await adminPage.locator('#url_key').fill('1082011');
    const shortDescFrame = adminPage.frameLocator('#short_description_ifr');
    await shortDescFrame.locator('body').click();
    await shortDescFrame.locator('body').type('This product is best in the market');
    const mainDescFrame = adminPage.frameLocator('#description_ifr');
    await mainDescFrame.locator('body').click();
    await mainDescFrame.locator('body').type('This product comes with high functionality and features');
    await adminPage.locator('#price').click();
    await adminPage.locator('#price').fill('1011');
    await adminPage.getByRole('button', { name: 'Save Product' }).click();
    await expect(adminPage.getByText(/Product updated successfully/i)).toBeVisible();
  });

  test('Create category field of type asset', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: ' Catalog' }).click();
    await adminPage.getByRole('link', { name: 'Category Fields' }).click();
    await adminPage.getByRole('link', { name: 'Create Category Field' }).click();
    await adminPage.getByRole('textbox', { name: 'Code' }).click();
    await adminPage.getByRole('textbox', { name: 'Code' }).fill('category_asset');
    await adminPage.waitForTimeout(500);
    await adminPage.locator('div').filter({ hasText: /^Select option$/ }).click();
    await adminPage.getByRole('option', { name: 'Asset' }).locator('span').first().click();
    await adminPage.waitForTimeout(500);
    await adminPage.locator('input[name="en_US\\[name\\]"]').click();
    await adminPage.locator('input[name="en_US\\[name\\]"]').fill('Category Asset');
    await adminPage.waitForTimeout(500);
    await adminPage.getByRole('button', { name: 'Save Category Field' }).click();
    await expect(adminPage.getByText(/Category Field Created Successfully/i)).toBeVisible();
  });

  test('Create Category with asset', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: ' Catalog' }).click();
    await adminPage.getByRole('link', { name: 'Categories' }).click();
    await adminPage.getByRole('link', { name: 'Create Category' }).click();
    await adminPage.locator('input[name="code"]').click();
    await adminPage.waitForTimeout(500);
    await adminPage.locator('input[name="code"]').type('test1');
    await adminPage.waitForTimeout(500);
    await adminPage.locator('#name').click();
    await adminPage.waitForTimeout(500);
    await adminPage.locator('#name').fill('Test1');
    await adminPage.waitForTimeout(500);
    await adminPage.locator('label').filter({ hasText: 'Add Asset' }).click();
    await expect(adminPage.getByText('Assign Assets')).toBeVisible();
    await expect(adminPage.getByText('Directory')).toBeVisible();
    await expect(adminPage.getByRole('textbox', { name: 'Search', exact: true })).toBeVisible();
    await adminPage.getByRole('img', { name: 'bikes.jpeg' }).click();
    await adminPage.waitForTimeout(500);
    await adminPage.getByText('Assign', { exact: true }).click();
    await adminPage.waitForTimeout(500);
    await adminPage.getByRole('button', { name: 'Save Category' }).click();
    await expect(adminPage.getByText(/Category created successfully/i)).toBeVisible();
  });

  test('Click on linked resources of the asset', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
    await imageLocator.locator('..').hover();
    await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
    await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
    await expect(adminPage.locator('span.icon-dam-link')).toBeVisible();
    await expect(adminPage.getByText('Linked Resources', { exact: true })).toBeVisible();
    await adminPage.getByText('Linked Resources', { exact: true }).click();
    await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?linked-resources/);
  });

  test('Check the linked resources of the asset', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
    await imageLocator.locator('..').hover();
    await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
    await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
    await expect(adminPage.locator('span.icon-dam-link')).toBeVisible();
    await expect(adminPage.getByText('Linked Resources', { exact: true })).toBeVisible();
    await adminPage.getByText('Linked Resources', { exact: true }).click();
    await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?linked-resources/);
    await expect(adminPage.getByText('CategoryCategory Code: test1')).toBeVisible();
    await expect(adminPage.getByText('ProductProduct Sku:')).toBeVisible();
  });
});