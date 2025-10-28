import { test, expect } from '@playwright/test';
import path from 'path';
import { uploadToDrive } from '../helpers/util.js';

const JIRA_TICKET = 'NJ-Inquiry';

test.describe('NJ-48692 Corporate Page Traditional Chinese', () => {
  test('TC-001: Access Corporate Page and Verify Translation', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/zh-tw/corporate');
    await expect(page).toHaveURL(/corporate/);
  await expect(page.locator('h1')).toContainText('English training for corporate companies');
    await page.getByRole('link', { name: '諮詢' }).first().click();
    await expect(page).toHaveURL(/corporate\/cs/);
    await expect(page.locator('h1')).toContainText('諮詢');
    // Try to submit the form without populating any fields
    await page.getByRole('button', { name: '前往確認畫面' }).click();
    // Verify error messages are displayed
    await expect(page.locator('text=公司名稱為必填欄位')).toBeVisible();
    await expect(page.locator('text=姓名是必填欄位')).toBeVisible();
    await expect(page.locator('text=電子郵件地址為必填欄位')).toBeVisible();
    await expect(page.locator('text=電話號碼為必填欄位')).toBeVisible();
    await expect(page.locator('text=請輸入內容')).toBeVisible();
    // Screenshot
    const screenshotPath = path.join('screenshots', JIRA_TICKET, 'TC-001.png');
    await page.screenshot({ path: screenshotPath });
    //await uploadToDrive(screenshotPath, 'TC-001.png', JIRA_TICKET);
  });

  test('TC-002: Submit Corporate Inquiry Form Successfully', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/zh-tw/corporate');
    await expect(page).toHaveURL(/corporate/);
  await expect(page.locator('h1')).toContainText('English training for corporate companies');
    await page.getByRole('link', { name: '諮詢' }).first().click();
    await expect(page).toHaveURL(/corporate\/cs/);
    await expect(page.locator('h1')).toContainText('諮詢');
    // Populate the form fields
    await page.getByRole('textbox', { name: '○○股份有限公司' }).fill('測試股份有限公司');
    await page.getByRole('textbox', { name: '山田太郎' }).fill('測試者');
    await page.locator('#CorporationCompanyUrl').fill('https://test.com');
    await page.locator('#CorporationEmail').fill('test@example.com');
    await page.locator('#CorporationEmailConfirm').fill('test@example.com');
    await page.getByRole('textbox', { name: '00012345678' }).fill('0912345678');
    await page.getByRole('textbox', { name: '請輸入您的諮詢內容。' }).fill('這是一個自動化測試表單提交。');
    // Submit the form
    await page.getByRole('button', { name: '前往確認畫面' }).click();
    await expect(page).toHaveURL(/corporate\/cs\/confirm/);
    await expect(page.locator('text=請確認內容後，按下送出按鈕。')).toBeVisible();
    // Should redirect to confirmation screen
    await page.getByRole('button', { name: '送出' }).click();
    await expect(page).toHaveURL(/corporate\/cs\/complete/);
    // Should redirect to complete screen by verifying the text
    await expect(page.locator('text=非常感謝您的諮詢。')).toBeVisible();
    // Screenshot
    const screenshotPath = path.join('screenshots', JIRA_TICKET, 'TC-002.png');
    await page.screenshot({ path: screenshotPath });
    //await uploadToDrive(screenshotPath, 'TC-002.png', JIRA_TICKET);
  });
});
