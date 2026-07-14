import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AdminPage } from "../pages/AdminPage";

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
};

export const test = base.extend<MyFixtures>({

  // -------------------------
  // Login Page
  // -------------------------
  loginPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await use(loginPage);

  },

  // -------------------------
  // Dashboard Page
  // Auto Login
  // -------------------------
  dashboardPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.loginAndWait(
        "Admin",
        "admin123"
    );

    const dashboardPage = new DashboardPage(page);

    await use(dashboardPage);

},

  // -------------------------
  // Admin Page
  // Auto Login
  // -------------------------
  adminPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.loginAndWait(
      "Admin",
      "admin123"
    );

    const adminPage = new AdminPage(page);

    await adminPage.openAdmin();

    await use(adminPage);

  }

});

export { expect };