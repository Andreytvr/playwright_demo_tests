import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "https://www.saucedemo.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    viewport: { width: 1920, height: 1280 },
  },
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
      },
    },
    {
      name: "Webkit",
      use: {
        browserName: "webkit",
      },
    },
  ],
  reporter: [["list"], ["allure-playwright"]],
  fullyParallel: true,
};

export default config;
