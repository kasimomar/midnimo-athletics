import { test as base, expect } from "@playwright/test";
import { baseURL, configured, integrationURLs } from "./settings";

type NetworkLog = { submissions: unknown[] };

const test = base.extend<{ network: NetworkLog }>({
  network: [async ({ context, page }, use) => {
    const network: NetworkLog = { submissions: [] };
    const unexpected: string[] = [];
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await context.route("**/*", async route => {
      const request = route.request();
      const url = request.url();
      const method = request.method();
      if (url === integrationURLs.registration && method === "POST") {
        network.submissions.push(request.postDataJSON());
        await route.fulfill({ status: 200, body: "ok" });
      } else if (url === integrationURLs.checkout && method === "GET") {
        await route.fulfill({ contentType: "text/html", body: "<h1>Mock checkout</h1>" });
      } else if (url === integrationURLs.hero && method === "GET") {
        await route.fulfill({ status: 204 });
      } else if (new URL(url).origin === baseURL && ["GET", "HEAD"].includes(method)) {
        await route.continue();
      } else {
        unexpected.push(`${method} ${url}`);
        await route.abort();
      }
    });
    await use(network);
    expect(unexpected, "Unexpected requests are blocked, including real services").toEqual([]);
    expect(errors, "Uncaught browser errors").toEqual([]);
  }, { auto: true }],
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Loading…", { exact: true })).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Midnimo");
});

test("visitors can navigate to registration without horizontal overflow", async ({ page, isMobile }) => {
  const menu = page.getByRole("button", { name: "Toggle menu" });
  if (isMobile) await menu.click();
  await page.getByRole("link", { name: "Sign Up", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/#signup`);
  await expect(page.getByRole("heading", { name: "Register & Pay" })).toBeVisible();
  if (isMobile) await expect(page.getByRole("link", { name: "Sign Up", exact: true })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

if (!configured) {
  test("missing configuration disables registration and offers contact", async ({ page, network }) => {
    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.getByLabel("Athlete Full Name")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Registration unavailable" })).toBeDisabled();
    await expect(page.getByRole("link", { name: "Pay with Stripe", exact: true })).toHaveCount(0);
    await page.getByRole("status").getByRole("link", { name: "contact us" }).click();
    await expect(page).toHaveURL(`${baseURL}/#contact`);
    expect(network.submissions).toEqual([]);
  });
} else {
  test("required fields prevent an empty submission", async ({ page, network }) => {
    await page.getByRole("button", { name: "Continue to Payment", exact: true }).click();
    await expect(page.getByLabel("Parent / Guardian Name")).toBeFocused();
    await expect(page).toHaveURL(`${baseURL}/`);
    expect(network.submissions).toEqual([]);
  });

  test("registration sends the entered fields once and opens mocked checkout", async ({ page, network }) => {
    await expect(page.locator("video")).toHaveAttribute("src", integrationURLs.hero);
    await expect(page.getByRole("link", { name: "Pay with Stripe", exact: true })).toHaveAttribute("href", integrationURLs.checkout);
    await page.getByLabel("Parent / Guardian Name").fill("Test Parent");
    await page.getByLabel("Email Address").fill("test@example.com");
    await page.getByLabel("Phone Number").fill("202-555-0100");
    await page.getByLabel("Athlete Full Name").fill("Test Athlete");
    await page.getByLabel("Athlete Age").selectOption("8");
    await page.getByLabel("Emergency Contact").fill("Test Contact");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Continue to Payment", exact: true }).click();
    await expect(page).toHaveURL(integrationURLs.checkout);
    await expect(page.getByRole("heading", { name: "Mock checkout" })).toBeVisible();
    expect(network.submissions).toEqual([{
      parentName: "Test Parent", email: "test@example.com", phone: "202-555-0100",
      athleteName: "Test Athlete", age: "8", emergencyContact: "Test Contact",
    }]);
  });
}
