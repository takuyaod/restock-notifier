import { initializeBrowser, closeBrowser } from "./browser";
import { config } from "./config";
import { fetchExpo2025GoodsStock } from "./fetch-expo2025-goods";
import { sendDiscordNotification } from "./notifier";

const main = async () => {
  try {
    await initializeBrowser();

    const targetUrl = config.targetUrl;
    const result = await fetchExpo2025GoodsStock(targetUrl);

    if (result.isInStock) {
      console.log("✅ 商品は在庫があります");

      await sendDiscordNotification(
        "🎉 Expo2025グッズ在庫あり！",
        `商品: ${result.title}\n\n在庫が復活しました！今すぐチェック！`,
        result.url,
        "success"
      );
    } else {
      console.log("❌ 商品は在庫切れです");
    }
  } catch (error) {
    await sendDiscordNotification(
      "❌ エラー発生",
      "Expo2025グッズ在庫チェックでエラーが発生しました",
      "",
      "error"
    ).catch(() => {});

    process.exit(1);
  } finally {
    await closeBrowser();
  }
};

main();
