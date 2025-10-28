import { test, expect } from '@playwright/test';
import path from 'path';

const JIRA_TICKET = 'NJ-Inquiry';

import { uploadToDrive } from '../helpers/util';

function getScreenshotPath(tcNumber) {
  return path.join('screenshots', JIRA_TICKET, `TC-${tcNumber}.png`);
}

test.describe('NC-Inquiry Corporate Free Trial Flow', () => {
  test('Corporate page inquiry and free trial application', async ({ page }) => {
    // 1. Go to corporate page
    await page.goto('https://english-dev2.fdc-inc.com/zh-tw/corporate');
    await expect(page).toHaveURL(/corporate/);
    await expect(page.locator('text=企業英語培訓')).toBeVisible();

  // 2. Click request info/apply trial button (disambiguate selector)
  await page.getByRole('link', { name: '申請索取資料・免費試用' }).first().click();
    await expect(page).toHaveURL(/apply_trial/);
  await expect(page.getByRole('heading', { name: /索取資料・免費試用/ })).toBeVisible();

    // 3. Submit empty form and verify errors
    await page.getByRole('button', { name: '點擊此處申請' }).click();
  await expect(page.getByText('需求內容為必填欄位。請選擇項目。')).toBeVisible();
  await expect(page.getByText('公司名稱為必填欄位。請輸入正確內容。')).toBeVisible();
  await expect(page.getByText('負責人姓名為必填欄位。請輸入正確內容。')).toBeVisible();
  await expect(page.getByText('電子郵件地址為必填欄位。請輸入正確內容。')).toBeVisible();
  await expect(page.getByText('電子郵件（確認用）為必填欄位。請輸入正確內容。')).toBeVisible();
  await expect(page.getByText('電話號碼為必填欄位。請輸入正確內容。')).toBeVisible();
    await page.screenshot({ path: getScreenshotPath('003') });
    //await uploadToDrive(getScreenshotPath('003'), 'TC-003.png', JIRA_TICKET);

    // 4. Populate form fields and checkboxes
    await page.getByText('索取資料', { exact: true }).setChecked(true);
    await page.getByText('免費試用 (7天)').setChecked(true);
    await page.getByRole('textbox', { name: '○○股份有限公司' }).fill('自動化測試股份有限公司');
    await page.getByRole('textbox', { name: '○○業務部' }).fill('技術部');
    await page.getByRole('textbox', { name: '山田太郎' }).fill('測試人員');
    const email = `fdc.clyde+stg+${Date.now()}@gmail.com`;
    await page.getByRole('textbox', { name: 'email@example.com' }).fill(email);
    await page.getByRole('textbox', { name: '為了確認請再輸入一次' }).fill(email);
    await page.getByRole('textbox', { name: '00012345678' }).fill('0223456789');
    await page.getByRole('textbox', { name: 'https://example.com' }).fill('https://automation-test.com');
    await page.getByRole('button', { name: '點擊此處申請' }).click();
    await expect(page).toHaveURL(/apply_trial_confirm/);
  await expect(page.getByRole('heading', { name: /確認申請內容/ })).toBeVisible();
    await page.screenshot({ path: getScreenshotPath('004') });
    //await uploadToDrive(getScreenshotPath('004'), 'TC-004.png', JIRA_TICKET);

    // 5. Go back and verify data persistence
    // TODO: Comment out the code below if running the captcha bypass
    // START
    // await page.getByRole('button', { name: '返回' }).click();
    // await expect(page.getByRole('textbox', { name: 'email@example.com' })).toHaveValue(email);
    // await page.screenshot({ path: getScreenshotPath('005') });
    // await uploadToDrive(getScreenshotPath('005'), 'TC-005.png', JIRA_TICKET);
    // await page.getByRole('button', { name: '點擊此處申請' }).click();
    // await expect(page).toHaveURL(/apply_trial_confirm/);
    // END

    // TODO: Uncomment the code below for captcha bypass
    // Rerun it after 2 minutes
    
      await page.getByRole('button', { name: '提交' }).click();
      await expect(page).toHaveURL(/apply_trial_complete/);
      await expect(page.locator('text=感謝您的申請。')).toBeVisible();
      await page.screenshot({ path: getScreenshotPath('006') });
      await uploadToDrive(getScreenshotPath('006'), 'TC-006.png', JIRA_TICKET);
        const pdfLink = page.getByRole('link', { name: '點選URL確認' });
        await expect(pdfLink).toBeVisible();
        const [ linkPdf ] = await Promise.all([
            page.waitForEvent('popup'),
            pdfLink.click()
        ]);
        await linkPdf.waitForLoadState();
        await expect(linkPdf).toHaveURL(/corporate-docs\/nativecamp_corporate_service.pdf/);
        await linkPdf.waitForTimeout(2500);
        await linkPdf.screenshot({ path: getScreenshotPath('007') });
        await uploadToDrive(getScreenshotPath('007'), 'TC-007.png', JIRA_TICKET);

    const downloadButton = page.getByRole('link', { name: '下載資料' });
    await expect(downloadButton).toBeVisible();
    const [ download ] = await Promise.all([
      page.waitForEvent('download'),
      downloadButton.click()
    ]);
    await download.saveAs(path.join('test-results', 'nativecamp_corporate_service.pdf'));

  });
});
