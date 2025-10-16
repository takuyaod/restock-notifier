import { config } from "./config";

export type NotificationColor = "success" | "error" | "warning" | "info";

const DISCORD_COLORS: Record<NotificationColor, number> = {
  success: 0x00ff00,
  error: 0xff0000,
  warning: 0xffff00,
  info: 0x0099ff,
};

export const sendDiscordNotification = async (
  title: string,
  description: string,
  url: string,
  color: NotificationColor = "success"
): Promise<void> => {
  const webhookUrl = config.discordWebhookUrl;
  if (!webhookUrl) {
    console.log("DISCORD_WEBHOOK_URL not set, skipping notification");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: title,
            description: description,
            url: url,
            color: DISCORD_COLORS[color],
            timestamp: new Date().toISOString(),
            footer: {
              text: "グッズ再入荷チェッカー",
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord notification failed: ${response.statusText}`);
    }

    console.log("✅ Discord notification sent successfully");
  } catch (error) {
    console.error("❌ Failed to send Discord notification:", error);
    throw error;
  }
};
