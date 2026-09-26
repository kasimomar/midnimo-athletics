import { defineConfig, devices } from "@playwright/test";
import { baseURL, configured, integrationURLs } from "./tests/e2e/settings";

export default defineConfig({
  testDir: "./tests/e2e",
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    serviceWorkers: "block",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run build && npm run start -- --hostname localhost --port 3100",
    url: baseURL,
    timeout: 180_000,
    // Never attach to a running app with unknown build-time integration values.
    reuseExistingServer: false,
    env: {
      NEXT_TELEMETRY_DISABLED: "1",
      SITE_URL: "https://midnimo.example.test",
      NEXT_PUBLIC_HERO_VIDEO_URL: configured ? integrationURLs.hero : "",
      NEXT_PUBLIC_REGISTRATION_ENDPOINT: configured ? integrationURLs.registration : "",
      NEXT_PUBLIC_STRIPE_PAYMENT_URL: configured ? integrationURLs.checkout : "",
    },
  },
});
