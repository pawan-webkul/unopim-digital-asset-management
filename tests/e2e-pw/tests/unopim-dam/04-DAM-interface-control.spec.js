const { test, expect } = require('../../utils/fixtures');
test.describe('Verify visibility of DAM interface controls Test cases', () => {
test('Check the Search bar working', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  await  expect(adminPage.getByPlaceholder('Search').first()).toBeVisible();
  await adminPage.getByPlaceholder('Search').first().fill('bikes');
  await adminPage.keyboard.press('Enter');
  await expect(adminPage.locator('img[alt="bikes.jpeg"]')).toBeVisible();
});

test('Check the Filter option visibility', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  await expect(adminPage.locator('span.icon-filter')).toBeVisible();
  await expect(adminPage.locator('span', {hasText:'Filter'})).toBeVisible();
  await adminPage.locator('span', {hasText:'Filter'}).click();
  await expect(adminPage.getByText('Apply Filters')).toBeVisible();
  await expect(adminPage.getByPlaceholder('File Name')).toBeVisible();
  await expect(adminPage.getByPlaceholder('Tags')).toBeVisible();
});

test('Check the filter by applying', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  await expect(adminPage.locator('span.icon-filter')).toBeVisible();
  await expect(adminPage.locator('span', {hasText:'Filter'})).toBeVisible();
  await adminPage.locator('span', {hasText:'Filter'}).click();
  await expect(adminPage.getByText('Apply Filters')).toBeVisible();
  await expect(adminPage.getByPlaceholder('File Name')).toBeVisible();
  await adminPage.getByPlaceholder('File Name').fill('bikes.jpeg');
  await adminPage.locator('div.primary-button:has-text("Save")').click();
  await expect(adminPage.locator('img[alt="bikes.jpeg"]')).toBeVisible();
});

test('check by applying item per page', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  await expect(adminPage.locator('span', { hasText: '50', exact: true  }).first()).toBeVisible();
  await expect(adminPage.locator('span.icon-chevron-down')).toBeVisible();
  await adminPage.locator('span.icon-chevron-down').click();
  await adminPage.getByText('100').click();
  await expect(adminPage.locator('span', { hasText: '100' })).toBeVisible();
});

test('Click the Edit button on image/media', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
});

test('Check the Custom Download is visible', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-download')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Custom Download' })).toBeVisible();
});

test('Check the Rename is visible', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-rename')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Rename' })).toBeVisible();
});

test('Check the Re-Upload is visible', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-upload')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Re-Upload' })).toBeVisible();
});

test('Check the Delete is visible', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-delete')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Delete' })).toBeVisible();
});

test('Download the asset by clicking on Custom Download(Original, 1080x1080)', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-download')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Custom Download' })).toBeVisible();
  await adminPage.locator('span', { hasText: 'Custom Download' }).click();
  await expect(adminPage.getByText('Custom Download').nth(1)).toBeVisible();
  await expect(adminPage.getByText('Original').first()).toBeVisible();
  await adminPage.getByPlaceholder('200').first().fill('1080');
  await adminPage.getByPlaceholder('200').nth(1).fill('1080');
  const [download] = await Promise.all([
  adminPage.waitForEvent('download'),
  adminPage.getByRole('button', { name: 'Download', exact: true }).click(),
]);
  expect(download).toBeDefined();
});

test('Download the asset by clicking on Custom Download(JPG, 1080x1080)', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-download')).toBeVisible();
  await adminPage.getByRole('button', { name: ' Custom Download' }).click();
  await adminPage.locator('div').filter({ hasText: /^Original$/ }).click();
  await adminPage.getByRole('option', { name: 'JPG' }).locator('span').first().click();
  await adminPage.locator('input[name="width"]').click();
  await adminPage.locator('input[name="width"]').fill('1080');
  await adminPage.locator('input[name="height"]').click();
  await adminPage.locator('input[name="height"]').fill('1080');
  const downloadPromise = adminPage.waitForEvent('download');
  await adminPage.getByRole('button', { name: 'Download', exact: true }).click();
  const download = await downloadPromise;
});

test('Download the asset by clicking on Custom Download(PNG, 1080x1080)', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-download')).toBeVisible();
  await adminPage.getByRole('button', { name: ' Custom Download' }).click();
  await adminPage.locator('div').filter({ hasText: /^Original$/ }).click();
  await adminPage.getByRole('option', { name: 'PNG' }).locator('span').first().click();
  await adminPage.locator('input[name="width"]').click();
  await adminPage.locator('input[name="width"]').fill('1080');
  await adminPage.locator('input[name="height"]').click();
  await adminPage.locator('input[name="height"]').fill('1080');
  const downloadPromise = adminPage.waitForEvent('download');
  await adminPage.getByRole('button', { name: 'Download', exact: true }).click();
  const download = await downloadPromise;
});

test('Download the asset by clicking on Custom Download(WEBP, 1080x1080)', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-download')).toBeVisible();
  await adminPage.getByRole('button', { name: ' Custom Download' }).click();
  await adminPage.locator('div').filter({ hasText: /^Original$/ }).click();
  await adminPage.getByRole('option', { name: 'WEBP' }).locator('span').first().click();
  await adminPage.locator('input[name="width"]').click();
  await adminPage.locator('input[name="width"]').fill('1080');
  await adminPage.locator('input[name="height"]').click();
  await adminPage.locator('input[name="height"]').fill('1080');
  const downloadPromise = adminPage.waitForEvent('download');
  await adminPage.getByRole('button', { name: 'Download', exact: true }).click();
  const download = await downloadPromise;
});

test('Click on Preview button', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-preview')).toBeVisible();
  await expect(adminPage.getByText('Preview', {exact:true})).toBeVisible();
  await adminPage.getByText('Preview', {exact:true}).click();
});

test('Check the Tags is available', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.getByText('Tags', { exact: true })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Choose or Create a Tag$/ })).toBeVisible();
});

test('Create the Tag for the asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.getByText('Tags', { exact: true })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Choose or Create a Tag$/ })).toBeVisible();
  await adminPage.locator('div').filter({ hasText: /^Choose or Create a Tag$/ }).click();
  await adminPage.getByRole('textbox', { name: 'tags-searchbox' }).fill('Super-Bikes');
  await adminPage.getByRole('textbox', { name: 'tags-searchbox' }).press('Enter');
  await expect(adminPage.locator('span', {hasText:'Super-Bikes'}).locator('..').locator('.multiselect__tag')).toBeVisible();
});

test('Checke the Directory path is visible', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.getByText('Directory Path')).toBeVisible();
  await expect(adminPage.getByText('Root/bikes.jpeg')).toBeVisible();
});

test('Check the Embedded Meta Info is available', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.getByText('Embedded Meta Info')).toBeVisible();
  await expect(adminPage.getByRole('columnheader', { name: 'Name' })).toBeVisible();
  await expect(adminPage.getByRole('cell', { name: 'Width' })).toBeVisible();
  await expect(adminPage.getByRole('cell', { name: 'Height' })).toBeVisible();
});

test('Click on Properties button', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-properties')).toBeVisible();
  await expect(adminPage.getByText('Properties', {exact:true})).toBeVisible();
  await adminPage.getByText('Properties', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?properties/);
});

test('Click on Create Property', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-properties')).toBeVisible();
  await expect(adminPage.getByText('Properties', {exact:true})).toBeVisible();
  await adminPage.getByText('Properties', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?properties/);
  await expect(adminPage.getByText('Asset Properties', {exact:true})).toBeVisible();
  await expect(adminPage.getByRole('button', { name: 'Create Property', exact: true })).toBeVisible();
  await adminPage.getByRole('button', { name: 'Create Property', exact: true }).click();
  await expect(adminPage.getByText('Create Property').nth(1)).toBeVisible();
});

test('Verify the input fields of Create Property', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await adminPage.getByText('Properties', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?properties/);
  await adminPage.getByRole('button', { name: 'Create Property', exact: true }).click();
  await expect(adminPage.getByText('Create Property').nth(1)).toBeVisible();
  await expect(adminPage.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await expect(adminPage.getByRole('textbox', { name: 'Name' })).toBeEnabled();
  await expect(adminPage.locator('div').filter({ hasText: /^Type$/ })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Type$/ })).toBeEnabled();
  await expect(adminPage.locator('div').filter({ hasText: /^Language$/ })).toBeVisible();
  await expect(adminPage.locator('div').filter({ hasText: /^Language$/ })).toBeEnabled();
  await expect(adminPage.getByRole('textbox', { name: 'Value' })).toBeVisible();
  await expect(adminPage.getByRole('textbox', { name: 'Value' })).toBeEnabled();
  await expect(adminPage.getByRole('button', { name: 'Save' })).toBeVisible();
  await expect(adminPage.getByRole('button', { name: 'Save' })).toBeEnabled();
});

test('Check the create property field validation', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await adminPage.getByText('Properties', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?properties/);
  await adminPage.getByRole('button', { name: 'Create Property', exact: true }).click();
  await expect(adminPage.getByText('Create Property').nth(1)).toBeVisible();
  await adminPage.getByRole('button', { name: 'Save' }).click();
  await expect(adminPage.getByText('The Name field is required')).toBeVisible();
  await expect(adminPage.getByText('The Type field is required')).toBeVisible();
  await expect(adminPage.getByText('The Language field is required')).toBeVisible();
  await expect(adminPage.getByText('The Value field is required')).toBeVisible();
});

test('Create Property of asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await adminPage.getByText('Properties', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?properties/);
  await adminPage.getByRole('button', { name: 'Create Property', exact: true }).click();
  await expect(adminPage.getByText('Create Property').nth(1)).toBeVisible();
  await adminPage.getByRole('textbox', { name: 'Name' }).click();
  await adminPage.getByRole('textbox', { name: 'Name' }).fill('Quality');
  await adminPage.locator('div').filter({ hasText: /^Type$/ }).click();
  await adminPage.getByRole('option', { name: 'Text' }).locator('span').first().click();
  await adminPage.locator('div').filter({ hasText: /^Language$/ }).click();
  await adminPage.getByRole('option', { name: 'English (United States)' }).locator('span').first().click();
  await adminPage.getByRole('textbox', { name: 'Value' }).click();
  await adminPage.getByRole('textbox', { name: 'Value' }).fill('good');
  await adminPage.getByRole('button', { name: 'Save' }).click();
  await expect(adminPage.getByText('Asset Property Created')).toBeVisible();
});

test('Click on Comments button', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-notes')).toBeVisible();
  await expect(adminPage.getByText('Comments', {exact:true})).toBeVisible();
  await adminPage.getByText('Comments', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?comments/);
});

test('check the Comments fields', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-notes')).toBeVisible();
  await expect(adminPage.getByText('Comments', {exact:true})).toBeVisible();
  await adminPage.getByText('Comments', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?comments/);
  await expect(adminPage.getByRole('textbox', { name: 'Add Comment' })).toBeVisible();
  await expect(adminPage.getByRole('textbox', { name: 'Add Comment' })).toBeEnabled();
  await expect(adminPage.getByRole('button', { name: 'Post Comment' })).toBeVisible();
  await expect(adminPage.getByRole('button', { name: 'Post Comment' })).toBeEnabled();
  await expect(adminPage.locator('svg').first()).toBeVisible();
  await expect(adminPage.getByText('No Comments Yet')).toBeVisible();
  await expect(adminPage.getByText('No Comments Yet')).toBeEnabled();
});

test('Add Comments on Asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-notes')).toBeVisible();
  await expect(adminPage.getByText('Comments', {exact:true})).toBeVisible();
  await adminPage.getByText('Comments', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?comments/);
  await adminPage.getByRole('textbox', { name: 'Add Comment' }).click();
  await adminPage.getByRole('textbox', { name: 'Add Comment' }).fill('The image is of a superbike');
  await adminPage.getByRole('button', { name: 'Post Comment' }).click();
  await expect(adminPage.getByText('EExamplejust nowThe image is of a superbikeReply Post Reply', {exact:true})).toBeVisible();
});

test('Click on History button', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-information')).toBeVisible();
  await expect(adminPage.getByText('History', {exact:true})).toBeVisible();
  await adminPage.getByText('History', {exact:true}).click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+\?history/);
});

test('Click on the Rename button', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-rename')).toBeVisible();
  await expect(adminPage.getByRole('button', { name: ' Rename' })).toBeVisible();
  await adminPage.getByRole('button', { name: ' Rename' }).click();
  await expect(adminPage.getByRole('textbox', { name: 'File Name' })).toBeVisible();
  await expect(adminPage.getByRole('button', { name: 'Save' })).toBeVisible();
});

test('Rename the asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="bikes.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-rename')).toBeVisible();
  await expect(adminPage.getByRole('button', { name: ' Rename' })).toBeVisible();
  await adminPage.getByRole('button', { name: ' Rename' }).click();
  await expect(adminPage.getByRole('textbox', { name: 'File Name' })).toBeVisible();
  await adminPage.getByRole('textbox', { name: 'File Name' }).fill('Super-bike.jpeg');
  await expect(adminPage.getByRole('button', { name: 'Save' })).toBeVisible();
  await adminPage.getByRole('button', { name: 'Save' }).click();
});

test('Click on Re-Upload', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="Super-bike.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-upload')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Re-Upload' })).toBeVisible();
  await adminPage.locator('span', { hasText: 'Re-Upload' }).click();
});

test('Re-Upload the asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="Super-bike.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-upload')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Re-Upload' })).toBeVisible();
  const [fileChooser] = await Promise.all([
  adminPage.waitForEvent('filechooser'),
  adminPage.locator('text=Upload').click(),
]);
  await fileChooser.setFiles('utils/berlin.jpeg');
});

test('Click on the Delete button', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="berlin.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-delete')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Delete' })).toBeVisible();
  await adminPage.locator('span', { hasText: 'Delete' }).click();
  await expect(adminPage.getByText('Confirm Deletion')).toBeVisible();
  await expect(adminPage.getByText('Are you sure you want to delete?')).toBeVisible();
  await expect(adminPage.getByRole('button', {name:'Delete', exact: true})).toBeVisible();
});

test('Delete the linked Asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="berlin.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-delete')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Delete' })).toBeVisible();
  await adminPage.locator('span', { hasText: 'Delete' }).click();
  await expect(adminPage.getByText('Confirm Deletion')).toBeVisible();
  await expect(adminPage.getByText('Are you sure you want to delete?')).toBeVisible();
  await expect(adminPage.getByRole('button', {name:'Delete', exact: true})).toBeVisible();
  await adminPage.getByRole('button', {name:'Delete', exact: true}).click();
  await expect(adminPage.
  getByText('Failed to delete asset as it is linked to resources (Asset Name: berlin.jpeg)')).toBeVisible();
});

test('Delete the Asset', async({adminPage})=>{
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const imageLocator = adminPage.locator('img[src*="laptop.jpeg"]');
  await imageLocator.locator('..').hover();
  await imageLocator.locator('..').locator('div.flex.justify-center >> div.icon-edit').click();
  await expect(adminPage).toHaveURL(/admin\/dam\/assets\/edit\/\d+/);
  await expect(adminPage.locator('span.icon-dam-delete')).toBeVisible();
  await expect(adminPage.locator('span', { hasText: 'Delete' })).toBeVisible();
  await adminPage.locator('span', { hasText: 'Delete' }).click();
  await expect(adminPage.getByText('Confirm Deletion')).toBeVisible();
  await expect(adminPage.getByText('Are you sure you want to delete?')).toBeVisible();
  await expect(adminPage.getByRole('button', {name:'Delete', exact: true})).toBeVisible();
  await adminPage.getByRole('button', {name:'Delete', exact: true}).click();
});

test('Deleted asset should not be available in asset list', async ({ adminPage }) => {
  await adminPage.getByRole('link', { name: / DAM/ }).click();
  const deletedAsset = adminPage.locator('img[src*="laptop.jpeg"]');
  await expect(deletedAsset).toHaveCount(0);
});
});
