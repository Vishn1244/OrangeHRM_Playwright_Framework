import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Invalid Password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'Admin',
        'WrongPassword'
    );

    await loginPage.verifyInvalidCredentials();

});