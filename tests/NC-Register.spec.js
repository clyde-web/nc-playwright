import { test, expect } from '@playwright/test';
import path from 'path';
import { uploadToDrive } from '../helpers/util.js';

const JIRA_TICKET = 'NC-Register';
const screenshotDir = (tc) => path.join('screenshots', JIRA_TICKET, `${tc}.png`);

async function takeScreenshot(page, tcNumber) {
  const screenshotPath = screenshotDir(tcNumber);
  await page.screenshot({ path: screenshotPath });
  //await uploadToDrive(screenshotPath, `${tcNumber}.png`, JIRA_TICKET);
}

test.describe('NC-Register Scenarios', () => {
  test('TC-001: Error messages for empty fields', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page.locator('li.msg', { hasText: 'メールアドレスの形式が正しくないか、使用できない文字が含まれています' })).toBeVisible();
    await expect(page.locator('li.msg', { hasText: 'パスワードを入力してください。' })).toBeVisible();
    await takeScreenshot(page, 'TC-001');
  });

  test('TC-002: Error for existing email', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill('fdc.clyde+stg@gmail.com');
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Password123!');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page.locator('li.msg', { hasText: '指定されたメールアドレスは既に使用されています。ログインしてご利用ください。' })).toBeVisible();
    await takeScreenshot(page, 'TC-002');
  });

  test('TC-003: Error for invalid password', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(`fdc.clyde+playwright+test3+${Date.now()}@gmail.com`);
    await page.getByRole('textbox', { name: 'パスワード' }).fill('password123');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page.locator('li.msg', { hasText: 'パスワードは大文字・小文字・数字・記号を全て含む8' })).toBeVisible();
    await takeScreenshot(page, 'TC-003');
  });

  test('TC-004: Successful registration and TOS redirect', async ({ page, context }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    const email = `fdc.clyde+playwright+tc4+${Date.now()}@gmail.com`;
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Password123!');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page).toHaveURL(/\/register\/credit/);
    const [tosPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: '利用規約' }).click()
    ]);
    await tosPage.waitForLoadState();
    await expect(tosPage).toHaveURL('https://english-staging.fdc-inc.com/tos');
    await takeScreenshot(page, 'TC-004');
  });

  test('TC-005: Successful registration and privacy redirect', async ({ page, context }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    const email = `fdc.clyde+playwright+tc5+${Date.now()}@gmail.com`;
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Password123!');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page).toHaveURL(/\/register\/credit/);
    const [privacyPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: '個人情報保護方針' }).click()
    ]);
    await privacyPage.waitForLoadState();
    await expect(privacyPage).toHaveURL('https://english-staging.fdc-inc.com/privacy');
    await takeScreenshot(page, 'TC-005');
  });

  test('TC-006: Successful registration and credit page title', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    const email = `fdc.clyde+playwright+tc6+${Date.now()}@gmail.com`;
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Password123!');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page).toHaveURL(/\/register\/credit/);
    await expect(page.getByRole('heading', { name: 'プラン/お支払い方法' })).toBeVisible();
    await takeScreenshot(page, 'TC-006');
  });

  test('TC-007: Payment error for invalid card', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    const email = `fdc.clyde+playwright+tc7+${Date.now()}@gmail.com`;
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Password123!');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page).toHaveURL(/\/register\/credit/);
    await page.getByRole('textbox', { name: 'カード名義' }).fill('INVALID');
    await page.getByRole('textbox', { name: 'カード番号' }).fill('1234');
    await page.getByRole('textbox', { name: 'セキュリティコード（半角英数）' }).fill('000');
    await page.locator('#zeus_token_card_expires_month').selectOption(['12']);
    await page.locator('#zeus_token_card_expires_year').selectOption(['2030']);
    await page.getByText('同意する').click();
    await page.getByRole('button', { name: '申し込みを確定する' }).click();
    await expect(page.getByText('「カード番号」を入力してください。')).toBeVisible();
    //await takeScreenshot(page, 'TC-007');
  });

  test('TC-008: Payment success with valid card (expected to fail in test env)', async ({ page }) => {
    await page.goto('https://english-staging.fdc-inc.com/register');
    const email = `fdc.clyde+playwright+tc8+${Date.now()}@gmail.com`;
    await page.getByRole('textbox', { name: 'メールアドレス' }).fill(email);
    await page.getByRole('textbox', { name: 'パスワード' }).fill('Password123!');
    await page.getByRole('button', { name: '続ける' }).click();
    await expect(page).toHaveURL(/\/register\/credit/);
    await page.getByRole('textbox', { name: 'カード名義' }).fill('FDC TEST');
    await page.getByRole('textbox', { name: 'カード番号' }).fill('5555 5555 5555 4444');
    await page.getByRole('textbox', { name: 'セキュリティコード（半角英数）' }).fill('123');
    await page.locator('#zeus_token_card_expires_month').selectOption(['12']);
    await page.locator('#zeus_token_card_expires_year').selectOption(['2030']);
      // Click the label with text "同意する" until submit button is enabled
      const submitBtn = page.getByRole('button', { name: '申し込みを確定する' });
      const agreementLabel = page.getByText('同意する');
      while (await submitBtn.isDisabled()) {
        await agreementLabel.click();
        await page.waitForTimeout(200); // Wait for UI to update
      }
      await expect(submitBtn).toBeEnabled();
      await submitBtn.click();
    // Expect loading animation or success message (may fail in test env)
    // await expect(page.getByText('Please wait for a while')).toBeVisible();
    await takeScreenshot(page, 'TC-008');
  });
});