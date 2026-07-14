import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Empty Username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        '',
        'admin123'
    );

    await loginPage.verifyRequiredMessage();

});