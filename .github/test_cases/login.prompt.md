Generate a playwright test for the following scenarios:

JIRA_TICKET: NC-Login

**Test Case 1: Verify error message for invalid login**
1. goto https://english-staging.fdc-inc.com/login.
2. Populate email address with "fdc.clyde+stg+light@gmail.com".
3. Populate password with "admin123s1".
4. Click the button with an id of 'login-btn'.
5. Verify error message is displayed.
5. If the error message「メールアドレス、またはパスワードに誤りがあります。」 is displayed, repeat steps 2-4. Until it displays the error message 「連続してログインに失敗したため、一時的にログインができません。時間をおいて再度お試しください。」

**Test Case 2: Verify error message for invalid login in Traditional Chinese**
1. goto https://english-staging.fdc-inc.com/zh-tw/login.
2. Populate email address with "fdc.clyde+stg+zh-tw@gmail.com".
3. Populate password with "admin123s1".
4. Click the button with an id of 'login-btn'.
5. Verify error message is displayed.
5. If the error message「電子信箱或密碼錯誤。」 is displayed, repeat steps 2-4. Until it displays the error message 「因連續多次登入失敗，暫時無法登入。請稍後再試。」

**Test Case 3: Verify successful login**
1. goto https://english-staging.fdc-inc.com/login
2. Populate email address with "fdc.clyde+stg2@gmail.com"
3. Populate password with "Admin123?".
4. Click the button with an id of 'login-btn'.
5. Verify that the user is redirected to the mypage url 

**Test Case 4: Verify successful login in Traditional Chinese**
1. goto https://english-staging.fdc-inc.com/zh-tw/login
2. Populate email address with "fdc.clyde+stg+zh-tw@gmail.com"
3. Populate password with "Admin123?".
4. Click the button with an id of 'login-btn'.
5. Verify that the user is redirected to the mypage url 