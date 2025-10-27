Generate a playwright test for the following scenarios:

JIRA_TICKET: NC-Inquiry

**Test Case 1: Access Corporate Page and Verify Translation**
1. Goto https://english-staging.fdc-inc.com/zh-tw/corporate
2. Verify if the user can access to corporate page
3. Click the link with text "諮詢"
4. Verify if page is translated to traditional Chinese
5. Try to submit the form without populating any fields
6. Verify the error messages are displayed

**Test Case 2: Submit Corporate Inquiry Form Successfully**
1. Goto https://english-staging.fdc-inc.com/zh-tw/corporate
2. Verify if the user can access to corporate page
3. Click the link with text "諮詢"
4. Populate the form fields
 - in the email field use this email "fdc.clyde+stg+(random)@gmail.com"
5. Submit the form
6. Should redirect to confirmation screen
7. Check the recaptcha box and wait for the verification to complete
8. Submit the form again with text of "送出"
9. Should redirect to complete screen by verifying the text "非常感謝您的諮詢。"
10. Click back on top button
11. Verify if it navigates back to the corporate page URL

**Test Case 3: Access Apply Trial Page**
1. Goto https://english-staging.fdc-inc.com/zh-tw/corporate
2. Verify if the user can access to corporate page
3. Click the request information and apply for a free trial button "申請索取資料・免費試用"
4. Redirect to apply trial page
5. Verify if the page is translated to traditional Chinese
6. Do not populate any fields and click the submit button "點擊此處申請"
7. Verify the error messages are displayed

**Test Case 4: Submit Apply Trial Form Successfully**
1. Goto https://english-staging.fdc-inc.com/zh-tw/corporate
2. Verify if the user can access to corporate page
3. Click the request information and apply for a free trial button "申請索取資料・免費試用"
4. Redirect to apply trial page
5. Verify if the page is translated to traditional Chinese
6. Populate the form fields and checkboxes
 - in the email field use this email "fdc.clyde+stg+(random)@gmail.com"
7. Submit the form
8. Should redirect to confirmation screen
9. Submit the form again with text of "提交"
10. Verify if it redirects to complete screen by verifying the text "感謝您的申請。"
11. Verify if the page is translated to traditional Chinese

**Test Case 5: Submit Apply Trial and Go back**
1. Goto https://english-staging.fdc-inc.com/zh-tw/corporate
2. Verify if the user can access to corporate page
3. Click the request information and apply for a free trial button "申請索取資料・免費試用"
4. Redirect to apply trial page
5. Verify if the page is translated to traditional Chinese
6. Populate the form fields and checkboxes
 - in the email field use this email "fdc.clyde+stg+(random)@gmail.com"
7. Submit the form
8. Should redirect to confirmation screen
9. Click the go back button "返回"
10. Verify if the data populated in the form is still there

**Test Case 6: Success Application and visible Download Buttons**
1. Goto https://english-staging.fdc-inc.com/zh-tw/corporate
2. Verify if the user can access to corporate page
3. Click the request information and apply for a free trial button "申請索取資料・免費試用"
4. Redirect to apply trial page
5. Verify if the page is translated to traditional Chinese
6. Populate the form fields and checkboxes
 - in the email field use this email "fdc.clyde+stg+(random)@gmail.com"
7. Submit the form
8. Should redirect to confirmation screen
9. Submit the form again with text of "提交"
10. Verify if it redirects to complete screen by verifying the text "感謝您的申請。"
11. Verify if the page is translated to traditional Chinese
12. Verify if the download buttons are visible "下載資料"
13. Click the download button and verify if the download successfully
14. Verify if the check with url link is displayed "點選URL確認"
15. Click the link and should redirect to the url links
 - user can be able to view the documents.