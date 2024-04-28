import { Client } from "discord.js";
import { logger } from "../utils/logger.js";
import { snakeToCamel } from "../utils/camel-caser.js";
import { commands } from "../commands/init.js";

export async function onReady(client: Client) {
	client.once("ready", (client) => {
		logger.info(`Logged in as ${client.user.tag} - ${client.user.id}`);
	});
}

export async function onInteractionCreate(client: Client) {
	client.on("interactionCreate", async (interaction) => {
		if (!interaction.isCommand()) return;
		const commandName = await snakeToCamel(interaction.commandName);
		const command = commands[commandName as keyof typeof commands];

		try {
			if (command) {
				command.execute(interaction);
			} else {
				logger.warn(`No commands matching "${interaction.commandName}" was found`);
			}
		} catch (error: any) {
			logger.error(`${error.name} - ${error.message}`);
			interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
		}
	});
}
