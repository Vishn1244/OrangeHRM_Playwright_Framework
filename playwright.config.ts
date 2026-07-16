import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const env = process.env.TEST_ENV || "dev";

dotenv.config({
    path: `./config/${env}.env`
});

console.log("BASE_URL =", process.env.BASE_URL);
console.log("APP_USERNAME =", process.env.APP_USERNAME);
console.log("APP_PASSWORD =", process.env.APP_PASSWORD);
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

    baseURL: process.env.BASE_URL,

    headless: true,

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