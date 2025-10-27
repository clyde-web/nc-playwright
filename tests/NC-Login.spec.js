import { test, expect } from '@playwright/test';
import path from 'path';
import { uploadToDrive } from '../helpers/util';

const JIRA_TICKET = 'NC-Login';

test.describe(JIRA_TICKET, () => {
  test('TC-001: Verify error message for invalid login', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/login');
    let errorMessage = '';
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
  await page.locator('#UserEmail', { visible: true }).fill('fdc.clyde+stg+light@gmail.com');
  await page.locator('#UserPassword', { visible: true }).fill('admin123s1');
      await page.locator('button:has-text("ログイン")').filter({ visible: true }).click();
      await page.waitForTimeout(1000);
      const errorLocator = page.locator('text=メールアドレス、またはパスワードに誤りがあります。');
      const lockLocator = page.locator('text=連続してログインに失敗したため、一時的にログインができません。時間をおいて再度お試しください。');
      if (await lockLocator.isVisible()) {
        errorMessage = 'locked';
        break;
      }
      if (await errorLocator.isVisible()) {
        errorMessage = 'invalid';
      } else {
        break;
      }
      attempts++;
    }
    expect(errorMessage).toBe('locked');
    const screenshotPath = path.join('screenshots', JIRA_TICKET, 'TC-001.png');
    await page.screenshot({ path: screenshotPath });
    await uploadToDrive(screenshotPath, 'TC-001.png', JIRA_TICKET);
  });

  test('TC-002: Verify error message for invalid login in Traditional Chinese', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/zh-tw/login');
    let errorMessage = '';
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
  await page.locator('input[name="data[User][email]"]', { visible: true }).fill('fdc.clyde+stg1@gmail.com');
  await page.locator('input[name="data[User][password]"]', { visible: true }).fill('admin123s1');
      await page.locator('button:has-text("登錄")').filter({ visible: true }).click();
      await page.waitForTimeout(1000);
      const errorLocator = page.locator('text=電子信箱或密碼錯誤。');
      const lockLocator = page.locator('text=因連續多次登入失敗，暫時無法登入。請稍後再試。');
      if (await lockLocator.isVisible()) {
        errorMessage = 'locked';
        break;
      }
      if (await errorLocator.isVisible()) {
        errorMessage = 'invalid';
      } else {
        break;
      }
      attempts++;
    }
    expect(errorMessage).toBe('locked');
    const screenshotPath = path.join('screenshots', JIRA_TICKET, 'TC-002.png');
    await page.screenshot({ path: screenshotPath });
    await uploadToDrive(screenshotPath, 'TC-002.png', JIRA_TICKET);
  });

  test('TC-003: Verify successful login', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/login');
  await page.locator('#UserEmail', { visible: true }).fill('fdc.clyde+stg2@gmail.com');
  await page.locator('#UserPassword', { visible: true }).fill('Admin123?');
  await page.locator('button:has-text("ログイン")').filter({ visible: true }).click();
    await page.waitForURL('**/mypage');
    expect(page.url()).toContain('/mypage');
    const screenshotPath = path.join('screenshots', JIRA_TICKET, 'TC-003.png');
    await page.screenshot({ path: screenshotPath });
    await uploadToDrive(screenshotPath, 'TC-003.png', JIRA_TICKET);
  });

  test('TC-004: Verify successful login in Traditional Chinese', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/zh-tw/login');
  await page.locator('input[name="data[User][email]"]', { visible: true }).fill('fdc.clyde+stg+zh-tw@gmail.com');
  await page.locator('input[name="data[User][password]"]', { visible: true }).fill('Admin123?');
  await page.locator('button:has-text("登錄")').filter({ visible: true }).click();
    await page.waitForURL('**/mypage');
    expect(page.url()).toContain('/mypage');
    const screenshotPath = path.join('screenshots', JIRA_TICKET, 'TC-004.png');
    await page.screenshot({ path: screenshotPath });
    await uploadToDrive(screenshotPath, 'TC-004.png', JIRA_TICKET);
  });
});
