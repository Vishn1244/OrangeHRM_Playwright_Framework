import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

    testDir: "./tests",

    fullyParallel: false,

    workers: 1,

    retries: 1,

    timeout: 90000,

    expect: {
        timeout: 30000,
    },

    reporter: [
        ["list"],
        ["html"]
    ],

    use: {

    baseURL: "https://opensource-demo.orangehrmlive.com",

    headless: false,

    actionTimeout: 60000,

    navigationTimeout: 60000,

    launchOptions: {
        slowMo: 200
    },

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure"

},

    projects: [

        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"]
            }
        },

        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"]
            }
        },

        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"]
            }
        }

    ]

});