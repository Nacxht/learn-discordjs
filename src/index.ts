import { Client, GatewayIntentBits } from "discord.js";
import { botConfig } from "./config/config.js";
import { deployCommand } from "./bot/commands/init.js";
import { eventHandlerInit } from "./bot/events/init.js";

// Create new Client instance
const client: Client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
});

// Initializer
await deployCommand(); // Deploying commands
await eventHandlerInit(client); // Event handler

// Run bot
client.login(botConfig.token);
