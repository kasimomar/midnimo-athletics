import AxeBuilder from "@axe-core/playwright";
import { test as base, expect } from "@playwright/test";
import { baseURL, configured, integrationURLs } from "./settings";

type NetworkLog = { mediaRequests: number };

const test = base.extend<{ network: NetworkLog }>({
  network: [async ({ context, page }, use) => {
    const network: NetworkLog = { mediaRequests: 0 };
    const unexpected: string[] = [];
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await context.route("**/*", async route => {
      const request = route.request();
      const url = request.url();
      const method = request.method();
      if (url === integrationURLs.hero && method === "GET") {
        network.mediaRequests += 1;
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
  await expect(page.getByText("Loading…", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A place to play,");
});

test("visitors can navigate to program interest without horizontal overflow", async ({ page, isMobile }) => {
  const menu = page.getByRole("button", { name: "Toggle menu" });
  if (isMobile) await menu.click();
  await page.getByRole("link", { name: "Program Interest", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/#signup`);
  await expect(page.getByRole("heading", { name: "Program Interest" })).toBeVisible();
  if (isMobile) await expect(page.getByRole("link", { name: "Program Interest", exact: true })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test.describe("mobile navigation", () => {
  test.beforeEach(async ({ isMobile }) => {
    test.skip(!isMobile, "The disclosure is only available at mobile widths");
  });

  test("supports keyboard toggling and Escape with focus restoration", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    const panel = page.locator("#mobile-navigation");
    await expect(toggle).toHaveAttribute("aria-controls", "mobile-navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(panel.getByRole("link", { name: "Programs", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Space");
    await expect(panel).toBeVisible();
    await page.keyboard.press("Space");
    await expect(panel).toBeHidden();
    await page.keyboard.press("Tab");
    expect(await panel.evaluate(element => element.contains(document.activeElement))).toBe(false);
  });

  test("closes when focus leaves and when a link is activated", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    const panel = page.locator("#mobile-navigation");
    await toggle.focus();
    await page.keyboard.press("Enter");
    for (const name of ["Programs", "Program Interest", "Our Mission", "News", "Contact"]) {
      await page.keyboard.press("Tab");
      await expect(panel.getByRole("link", { name, exact: true })).toBeFocused();
    }
    await page.keyboard.press("Tab");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(await page.locator("header").evaluate(element => element.contains(document.activeElement))).toBe(false);
    await toggle.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(`${baseURL}/#signup`);
    await expect(panel).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(await panel.evaluate(element => element.contains(document.activeElement))).toBe(false);
  });

  test("keeps menu links reachable on short landscape screens", async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 320 });
    const toggle = page.getByRole("button", { name: "Toggle menu" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
    const contact = page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Contact", exact: true });
    await expect(contact).toBeFocused();
    const bounds = await contact.boundingBox();
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(320);
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(`${baseURL}/#contact`);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("resets the open panel across the desktop breakpoint", async ({ page }) => {
    const toggle = page.getByRole("button", { name: "Toggle menu", includeHidden: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(toggle).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("navigation", { name: "Primary", exact: true })).toBeVisible();
    await page.setViewportSize({ width: 393, height: 851 });
    await expect(toggle).toBeVisible();
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  });
});

test.describe("reduced-motion hero", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows a static hero without requesting video or hiding the title on scroll", async ({ page, network }) => {
    const title = page.getByRole("heading", { level: 1 });
    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.getByText("Midnimo Athletics · A nonprofit for youth", { exact: true })).toHaveCSS("opacity", "1");
    expect(network.mediaRequests).toBe(0);
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
    expect(await page.locator("#home").evaluate(element => element.clientHeight === innerHeight)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(title).toHaveCSS("opacity", "1");
    await expect(title).toHaveCSS("transform", "none");
    await expect(page.locator("header")).toHaveCSS("transition-duration", "0s");
  });

  test("responds to motion preference changes without reloading", async ({ page }) => {
    const title = page.getByRole("heading", { level: 1 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
    await expect(page.locator("video")).toHaveCount(configured ? 1 : 0);
    if (configured) await expect(page.locator("video")).toHaveAttribute("autoplay", "");
    await page.evaluate(() => window.scrollTo({ top: 200, behavior: "instant" }));
    await expect(title).not.toHaveCSS("transform", "none");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator("video")).toHaveCount(0);
    await expect(title).toHaveCSS("transform", "none");
    await expect(title).toHaveCSS("opacity", "1");
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  });
});


test("hero actions lead to programs and the contact section", async ({ page }) => {
  await page.getByRole("link", { name: "Explore Programs", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/#programs`);
  await expect(page.getByRole("heading", { name: "Community Programs", exact: true })).toBeVisible();
  await page.goto("/");
  await page.getByRole("link", { name: "Talk With Our Team", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/#contact`);
  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
});

test("contact and program interest fit a narrow phone screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.getByRole("link", { name: "Talk With Our Team", exact: true }).click();
  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("program interest offers the admin email without checkout or athlete collection", async ({ page }) => {
  const interest = page.getByRole("region", { name: "Program Interest" });
  await expect(interest.getByRole("link", { name: "Email About a Program" })).toHaveAttribute(
    "href", "mailto:admin@midnimoathletics.com?subject=Program%20inquiry%20%E2%80%94%20Midnimo%20Athletics",
  );
  await expect(interest).toContainText("any costs before enrolling");
  await expect(page.getByText(/\$70|Register & Pay|monthly billing|Pay with Stripe/)).toHaveCount(0);
  await expect(page.locator('a[href*="stripe"], a[href*="checkout.example.test"]')).toHaveCount(0);
  await expect(page.locator('input[name="athleteName"], input[name="emergencyContact"]')).toHaveCount(0);
  await interest.getByRole("link", { name: "Prepare a message for our team" }).click();
  await expect(page).toHaveURL(`${baseURL}/#contact`);
  await expect(page.locator("#contact").getByRole("link", { name: "admin@midnimoathletics.com", exact: true })).toHaveAttribute("href", "mailto:admin@midnimoathletics.com");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(3);
  if (configured) await expect(page.locator("video")).toHaveAttribute("src", integrationURLs.hero);
  else await expect(page.locator("video")).toHaveCount(0);
});

test("contact requires valid details before preparing a draft", async ({ page }) => {
  await page.getByRole("button", { name: "Prepare Email", exact: true }).click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await expect(page.getByRole("link", { name: "Open Email App" })).toHaveCount(0);
  await page.getByLabel("Name", { exact: true }).fill("Test Parent");
  await page.getByLabel("Email", { exact: true }).fill("not-an-email");
  await page.getByLabel("Message", { exact: true }).fill("Program question");
  await page.getByRole("button", { name: "Prepare Email", exact: true }).click();
  await expect(page.getByLabel("Email", { exact: true })).toBeFocused();
  await expect(page.getByRole("link", { name: "Open Email App" })).toHaveCount(0);
});

test("contact prepares an encoded email draft and invalidates it after editing", async ({ page }) => {
  const name = "Test & Family";
  const email = "test+family@example.com";
  const message = "Soccer & movement?\nWhat are the next steps #1 — thank you.";
  await page.getByLabel("Name", { exact: true }).fill(name);
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Message", { exact: true }).fill(message);
  await page.getByRole("button", { name: "Prepare Email", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Your draft is ready. Nothing has been sent.");
  const draft = page.getByRole("link", { name: "Open Email App", exact: true });
  const href = new URL((await draft.getAttribute("href"))!);
  expect(href.protocol).toBe("mailto:");
  expect(href.pathname).toBe("admin@midnimoathletics.com");
  expect(href.searchParams.get("subject")).toBe(`Message from ${name}`);
  expect(href.searchParams.get("body")).toBe(`${message}\n\nFrom: ${name} (${email})`);
  // Inspect the draft only; never open an email client or send a test message.
  await page.getByLabel("Message", { exact: true }).fill("Updated program question");
  await expect(draft).toHaveCount(0);
  await page.getByRole("button", { name: "Prepare Email", exact: true }).click();
  expect(new URL((await draft.getAttribute("href"))!).searchParams.get("body")).toContain("Updated program question");
});


test.describe("page accessibility", () => {
  test.use({ reducedMotion: "reduce" });

  test("exposes useful landmarks, headings, labels, and a working skip link", async ({ page }) => {
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
    await expect(page.getByRole("banner")).toHaveCount(1);
    await expect(page.getByRole("contentinfo")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const levels = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
    expect(levels.every((level, i) => i === 0 || level <= levels[i - 1] + 1)).toBe(true);
    const tree = await page.getByRole("main").ariaSnapshot();
    expect(tree).toContain('heading "The people behind Midnimo" [level=3]');
    expect(tree).toContain('textbox "Email"');
    await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("autocomplete", "email");
  });

  test("has no automated WCAG A/AA violations with the mobile menu closed or open", async ({ page, isMobile }) => {
    const scan = async () => {
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) }))).toEqual([]);
    };
    await scan();
    if (isMobile) {
      const toggle = page.getByRole("button", { name: "Toggle menu" });
      const size = await toggle.boundingBox();
      expect(size!.height).toBeGreaterThanOrEqual(44);
      expect(size!.width).toBeGreaterThanOrEqual(44);
      await toggle.click();
      await scan();
    }
  });

  test("keeps section content visible and stationary before scrolling and on hover", async ({ page }) => {
    for (const id of ["programs", "signup", "about", "news", "contact"]) {
      const section = page.locator(`#${id}`);
      expect(await section.locator("*").evaluateAll(nodes => nodes.filter(node => node.textContent?.trim()).every(node => {
        const style = getComputedStyle(node);
        return style.opacity !== "0" && style.transform === "none";
      }))).toBe(true);
      await section.getByRole("heading").first().hover();
      await expect(section.getByRole("heading").first()).toHaveCSS("transform", "none");
    }
  });
});

test("search and sharing previews identify the nonprofit and configured public domain", async ({ page }) => {
  await expect(page).toHaveTitle("Midnimo Athletics | Youth Sports & Community");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /A nonprofit welcoming all youth/);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://midnimo.example.test");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://midnimo.example.test/images/logo.png");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/images/logo.png");
  await expect(page.getByText("Coach Osman", { exact: true })).toBeVisible();
});

test("visitors can stop the decorative background video", async ({ page }) => {
  test.skip(!configured, "The video control is only available with configured media");
  await page.getByRole("button", { name: "Hide background video" }).click();
  await expect(page.locator("video")).toHaveCount(0);
  await page.getByRole("button", { name: "Show background video" }).click();
  await expect(page.locator("video")).toHaveCount(1);
});


test("hero eyebrow keeps AA text contrast even over a white video frame", async ({ page }) => {
  const colors = await page.locator("#home").evaluate(element => {
    const veil = element.querySelector(".pointer-events-none")!;
    const eyebrow = element.querySelector("p")!;
    return { veil: getComputedStyle(veil).backgroundColor, text: getComputedStyle(eyebrow).color };
  });
  const rgba = (color: string) => color.match(/[\d.]+/g)!.map(Number);
  const veil = rgba(colors.veil);
  const alpha = veil[3] ?? 1;
  const brightestBackground = veil.slice(0, 3).map(channel => channel * alpha + 255 * (1 - alpha));
  const luminance = (rgb: number[]) => rgb.slice(0, 3).reduce((sum, channel, index) => {
    const normalized = channel / 255;
    const linear = normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    return sum + linear * [0.2126, 0.7152, 0.0722][index];
  }, 0);
  const ratio = (luminance(rgba(colors.text)) + 0.05) / (luminance(brightestBackground) + 0.05);
  expect(ratio).toBeGreaterThanOrEqual(4.5);
});
