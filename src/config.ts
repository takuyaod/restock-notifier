import dotenv from "dotenv";

dotenv.config();

export const config = {
  targetUrl: process.env.TARGET_URL || "",
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  outputDir: process.env.OUTPUT_DIR || "./output",
};

if (!config.targetUrl) {
  throw new Error("TARGET_URL is required in .env file");
}
