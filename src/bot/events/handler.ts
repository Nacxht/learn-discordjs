import { Client, CommandInteractionOptionResolver } from "discord.js";
import { logger } from "../utils/logger.js";
import { snakeToCamel } from "../utils/camel-caser.js";
import { commands } from "../commands/init.js";
import { SlashCommand } from "../../../types/slashCommand.js";

export async function onReady(client: Client) {
    client.once("ready", (client) => {
        logger.info(`Logged in as ${client.user.tag} - ${client.user.id}`);
    });
}

export async function onInteractionCreate(client: Client) {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const camelCommandName = await snakeToCamel(interaction.commandName);
        const command = commands[camelCommandName as keyof typeof commands] as SlashCommand;

        if (!command) {
            logger.warn(`No commands matching "${interaction.commandName}" was found`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error: any) {
            logger.error(`${error.name} - ${error.message}`);
        }
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isAutocomplete()) return;
        const camelCommandName = await snakeToCamel(interaction.commandName);
        const command = commands[camelCommandName as keyof typeof commands] as SlashCommand;

        try {
            if (!command) return;
            if (!(typeof command.autocomplete === "function")) return;

            await command.autocomplete(interaction);
        } catch (error: any) {
            logger.error(`${error.name} - ${error.message}`);
        }
    });
}
