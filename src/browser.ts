import { chromium, Browser } from "playwright";

let browser: Browser | null = null;

export const initializeBrowser = async (): Promise<void> => {
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

export const getBrowser = (): Browser => {
  if (!browser) {
    throw new Error("Browser not initialized");
  }
  return browser;
};

export const closeBrowser = async (): Promise<void> => {
  if (browser) {
    await browser.close();
  }
};
