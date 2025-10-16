import { Page } from "playwright";
import { getBrowser } from "./browser";
import type { StockCheckResult } from "./types";

export const fetchExpo2025GoodsStock = async (
  url: string
): Promise<StockCheckResult> => {
  const browser = getBrowser();
  const page: Page = await browser.newPage();

  try {
    console.log(`Checking stock for: ${url}`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

    const title = await page.title();

    const soldOut = page.locator(
      'p.eds-u-my2.eds-u-text-danger.eds-u-text8of8.eds-u-text-bold:has-text("この商品は現在品切れです")'
    );
    const isSoldOut =
      (await soldOut.count()) > 0 &&
      (await soldOut
        .first()
        .isVisible()
        .catch(() => false));

    const isInStock = !isSoldOut;

    return {
      url,
      title,
      isInStock,
      timestamp: new Date(),
    };
  } catch (e) {
    console.error("Error fetching Expo2025 goods stock:", e);
    return {
      url,
      isInStock: false,
      timestamp: new Date(),
      message: "エラー",
    };
  } finally {
    await page.close();
  }
};
