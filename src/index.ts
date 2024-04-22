import { Client, Events, GatewayIntentBits } from "discord.js";
import { logger } from "./bot/utils/logger.js";
import { botConfig } from "./config/config.js";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Run the code (once) when the client is ready
client.once(Events.ClientReady, (readyClient) => {
	logger.info(`Bot is turned on`);
	logger.info(`Logged in as ${readyClient.user.tag}`);
});

client.login(botConfig.token);
