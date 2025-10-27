Generate a playwright test for the following scenarios:

JIRA_TICKET: NC-Register

**Test Case 1: Verify error messages for empty fields on registration page**
1. Goto https://english-staging.fdc-inc.com/register
2. Click the submit button with empty fields
3. Verify the error messages is displayed
 - メールアドレスの形式が正しくないか、使用できない文字が含まれています(全角文字などは設定できません)。
 - パスワードを入力してください。

**Test Case 2: Verify error message for existing email on registration page**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email with "fdc.clyde+stg@gmail.com"
3. Populate password with "Password123!"
4. Verify the error message is displayed after clicking the submit button
 -指定されたメールアドレスは既に使用されています。ログインしてご利用ください。

**Test Case 3: Verify error message for invalid password on registration page**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email
3. Populate password without capital letter and symbols
4. Verify the error message is displayed after clicking the submit button
 -パスワードは大文字・小文字・数字・記号を全て含む8\～16文字以内で入力してください。
※記号は、! ” # $ % & \‘ ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~ が使用できます。

**Test Case 4: Verify successful registration and redirection to policy page**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email
 - use this email "fdc.clyde+playwright+(random)@gmail.com"
3. Populate password with capital letter and symbols
4. It will redirect to https://english-staging.fdc-inc.com/register/credit
5. Click the link the navigate to https://english-staging.fdc-inc.com/tos
6. If it opens in a new tab → switch to the new tab and verify its URL is https://english-staging.fdc-inc.com/tos

**Test Case 5: Verify successful registration and redirection to privacy page**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email
 - use this email "fdc.clyde+playwright+(random)@gmail.com"
3. Populate password with capital letter and symbols
4. It will redirect to https://english-staging.fdc-inc.com/register/credit
5. Click the link the navigate to https://english-staging.fdc-inc.com/privacy
6. If it opens in a new tab → switch to the new tab and verify its URL is https://english-staging.fdc-inc.com/privacy

**Test Case 6: Verify successful registration and redirection to credit page**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email
 - use this email "fdc.clyde+playwright+(random)@gmail.com"
3. Populate password with capital letter and symbols
4. It will redirect to https://english-staging.fdc-inc.com/register/credit
5. Verify if the page has title "プラン/お支払い方法"

**Test Case 7: Payment Plan - Verify error message for invalid credit card details**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email
 - use this email "fdc.clyde+playwright+(random)@gmail.com"
3. Populate password with capital letter and symbols
4. It will redirect to https://english-staging.fdc-inc.com/register/credit
5. Select the premium plan "年間プラン(月々払い)"
6. Wait for payment sections to load
7. Verify the credit card input fields are displayed
8. Populate credit card details with invalid test data
9. Click the checkbox label to agree "同意する"
 - Scroll to bottom if necessary
10. Click the submit button "申し込みを確定する"
11. Verify the error message is displayed
 -「カード番号」を入力してください。

**Test Case 8: Payment Plan - Verify successful credit card details submission**
1. Goto https://english-staging.fdc-inc.com/register
2. Populate email
 - use this email "fdc.clyde+playwright+(random)@gmail.com"
3. Populate password with capital letter and symbols
4. It will redirect to https://english-staging.fdc-inc.com/register/credit
5. Select the premium plan "年間プラン(月々払い)"
6. Wait for payment sections to load
7. Verify the credit card input fields are displayed
8. Populate credit card details with
 - カード名義 : FDC TEST
 - カード番号 : 5555 5555 5555 4444
 - セキュリティコード（半角英数）: random 3 digits
 - for month and year : select a future month and year
9. Click the checkbox label to agree "同意する"
 - Scroll to bottom if necessary
10. Click the submit button "申し込みを確定する"
11. Wait for loading animation to finish