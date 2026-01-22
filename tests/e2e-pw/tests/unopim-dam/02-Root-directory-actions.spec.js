const { test, expect } = require('../../utils/fixtures');
test.describe('UnoPim DAM Root Directory Test cases', () => {
  test('Check DAM root Directory is available', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.
      getByText('Tool can help you organise, store, and manage all your media asset in one place')).toBeVisible();
    await expect(adminPage.locator('p', { hasText: 'Directory' })).toBeVisible();
    await expect(adminPage.locator('i.icon-dam-folder')).toBeVisible();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
  });

  test('Check Upload button is visible and clickable', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span.icon-dam-upload')).toBeVisible();
    await expect(adminPage.locator('label', { hasText: 'Upload' })).toBeVisible();
    await adminPage.locator('label', { hasText: 'Upload' }).click();
  });

  test('Right Click on Root Directory', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('i.icon-dam-folder')).toBeVisible();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
  });

  test('Check Right-Click Menu Options on Root', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await adminPage.waitForTimeout(1000);
    await expect(adminPage.locator('text=Upload files')).toBeVisible();
    await expect(adminPage.locator('text=Add directory')).toBeVisible();
    await expect(adminPage.locator('text=Rename')).toBeVisible();
    await expect(adminPage.locator('text=Delete', { exact: true })).toBeVisible();
    await expect(adminPage.locator('text=Copy Directory Structured')).toBeVisible();
    await expect(adminPage.locator('text=Download Zip')).toBeVisible();
  });

  test('Click on upload file option of Root menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Upload files')).toBeVisible();
    await adminPage.locator('text=Upload files').click();
  });

  test('Click on add directory option of Root menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Add Directory')).toBeVisible();
    await adminPage.locator('text=Add Directory').click();
  });

  test('Click on Rename option of Root menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Rename')).toBeVisible();
    await adminPage.locator('text=Rename').click();
  });

  test('Click on delete option of Root menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Delete', { exact: true })).toBeVisible();
    await adminPage.locator('text=Delete', { exact: true }).click();
    await expect(adminPage.getByText('Confirm Deletion')).toBeVisible();
    await expect(adminPage.getByText(
      'Deleting this directory will also delete all subdirectories inside it. This action is permanent and cannot be undone.',
      { exact: true }
    )).toBeVisible();
    await expect(adminPage.getByRole('button', { name: 'Delete' })).toBeVisible();
  });

  test('Delete Root Directory', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Delete', { exact: true })).toBeVisible();
    await adminPage.locator('text=Delete', { exact: true }).click();
    await expect(adminPage.getByText('Confirm Deletion')).toBeVisible();
    await expect(adminPage.getByText(
      'Deleting this directory will also delete all subdirectories inside it. This action is permanent and cannot be undone.',
      { exact: true }
    )).toBeVisible();
    await expect(adminPage.getByRole('button', { name: 'Delete' })).toBeVisible();
    await adminPage.getByRole('button', { name: 'Delete' }).click();
    await expect(adminPage.getByText('Directory cannot be deleted as it is Root Directory.')).toBeVisible();
  });

  test('Click on Copy Directory structured option of Root menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Copy Directory Structured')).toBeVisible();
    await adminPage.locator('text=Copy Directory Structured').click();
  });

  test('Verify Copy Directory message for empty Root', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Copy Directory Structured')).toBeVisible();
    await adminPage.locator('text=Copy Directory Structured').click();
    await expect(adminPage.getByText('Directory cannot be copy as it is Root Directory.')).toBeVisible();
  });

  test('Click on Download Zip option of Root menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Download Zip')).toBeVisible();
    await adminPage.locator('text=Download Zip').click();
  });

  test('Verify message after click Download Zip on empty Root', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Download Zip')).toBeVisible();
    await adminPage.locator('text=Download Zip').click();
    await expect(adminPage.getByText('This directory is empty.')).toBeVisible();
  });

  test('Upload a file to Root Directory', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    const [fileChooser] = await Promise.all([
      adminPage.waitForEvent('filechooser'),
      adminPage.locator('text=Upload files').click(),
    ]);
    await fileChooser.setFiles('utils/laptop.jpeg');
    await expect(adminPage.getByText('File Uploaded Successfully.')).toBeVisible();
  });

  test('Create a directory with empty name field by Root menu option', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Add Directory')).toBeVisible();
    await adminPage.locator('text=Add Directory').click();
    await expect(adminPage.getByText('Create Directory')).toBeVisible();
    await expect(adminPage.getByPlaceholder('Name')).toBeVisible();
    await expect(adminPage.getByRole('button', { name: 'Save Directory' })).toBeVisible();
    await adminPage.getByRole('button', { name: 'Save Directory' }).click();
    await expect(adminPage.getByText('The Name field is required')).toBeVisible();
  });

  test('Create a directory by Root menu option', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Add Directory')).toBeVisible();
    await adminPage.locator('text=Add Directory').click();
    await expect(adminPage.getByText('Create Directory')).toBeVisible();
    await expect(adminPage.getByPlaceholder('Name')).toBeVisible();
    await adminPage.getByPlaceholder('Name').fill('Electronics');
    await expect(adminPage.getByRole('button', { name: 'Save Directory' })).toBeVisible();
    await adminPage.getByRole('button', { name: 'Save Directory' }).click();
    await expect(adminPage.getByText('Directory created successfully')).toBeVisible();
    await expect(adminPage.locator('span', { hasText: 'Electronics' })).toBeVisible();
  });

  test('Click on Rename the Directory name by Right click', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Electronics' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Electronics' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Rename')).toBeVisible();
    await adminPage.locator('text=Rename').click();
    await expect(adminPage.getByText('Rename Directory')).toBeVisible();
    await expect(adminPage.getByPlaceholder('Name')).toHaveValue('Electronics');
    await expect(adminPage.getByRole('button', { name: 'Save Directory' })).toBeVisible();
  });

  test('Rename the Directory name by Right click', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Electronics' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Electronics' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Rename')).toBeVisible();
    await adminPage.locator('text=Rename').click();
    await expect(adminPage.getByText('Rename Directory')).toBeVisible();
    await expect(adminPage.getByPlaceholder('Name')).toHaveValue('Electronics');
    await adminPage.getByPlaceholder('Name').fill('Clothes');
    await expect(adminPage.getByRole('button', { name: 'Save Directory' })).toBeVisible();
    await adminPage.getByRole('button', { name: 'Save Directory' }).click();
    await expect(adminPage.getByText('Directory updated successfully')).toBeVisible();
    await expect(adminPage.locator('span', { hasText: 'Clothes', exact: true })).toBeVisible();
  });

  test('Click on Copy Directory structured option', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Clothes' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Clothes' }).click({ button: 'right' });
    await expect(adminPage.locator('text=Copy Directory Structured')).toBeVisible();
    await adminPage.locator('text=Copy Directory Structured').click();
    await expect(adminPage.getByText('Directory structure coping in-progress.')).toBeVisible();
    await adminPage.waitForTimeout(2000);
    await expect(adminPage.getByText('Clothes 1th copy', { exact: true })).toBeVisible();
  });

  test('Delete the Directory by right click menu', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Clothes', exact: true }).first()).toBeVisible();
    await adminPage.locator('span', { hasText: 'Clothes', exact: true }).first().click({ button: 'right' });
    await expect(adminPage.locator('text=Delete', { exact: true })).toBeVisible();
    await adminPage.locator('text=Delete', { exact: true }).click();
    await expect(adminPage.getByText('Confirm Deletion')).toBeVisible();
    await expect(adminPage.getByText(
      'Deleting this directory will also delete all subdirectories inside it. This action is permanent and cannot be undone.',
      { exact: true }
    )).toBeVisible();
    await expect(adminPage.getByRole('button', { name: 'Delete' })).toBeVisible();
    await adminPage.getByRole('button', { name: 'Delete' }).click();
    await expect(adminPage.getByText('Directory deleting in-progress')).toBeVisible();
    await adminPage.waitForTimeout(1000);
    await expect(adminPage.getByText('Action completed successfully')).toBeVisible();
  });

  test('Upload media by clicking on Upload button', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click();
    await expect(adminPage.locator('span.icon-dam-upload')).toBeVisible();
    await expect(adminPage.locator('label', { hasText: 'Upload' })).toBeVisible();
    const [fileChooser] = await Promise.all([
      adminPage.waitForEvent('filechooser'),
      adminPage.locator('text=Upload').click(),
    ]);
    await fileChooser.setFiles('utils/bikes.jpeg');
    await expect(adminPage.getByText('File Uploaded Successfully.')).toBeVisible();
  });

  test('Verify uploaded image is displayed in Root Directory', async ({ adminPage }) => {
    await adminPage.getByRole('link', { name: / DAM/ }).click();
    await expect(adminPage.locator('span', { hasText: 'Root' })).toBeVisible();
    await adminPage.locator('span', { hasText: 'Root' }).click();
    await expect(adminPage.locator('img[alt="bikes.jpeg"]')).toBeVisible();
  });
});