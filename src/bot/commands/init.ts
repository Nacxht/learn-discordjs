import { REST, Routes } from "discord.js";
import { botConfig } from "../../config/config.js";
import { logger } from "../utils/logger.js";
import { ping, stringInput, choices, info } from "./basic.js";
import { ban } from "./moderation.js";

export const commands = { ping, stringInput, choices, info, ban };
const commandsData = Object.values(commands).map((command) => command.data);

export async function deployCommand() {
    const rest = new REST({ version: "10" }).setToken(botConfig.token);

    try {
        logger.info(`Started refreshing application (/) commands`);

        await rest.put(Routes.applicationGuildCommands(botConfig.clientId, botConfig.guildId), {
            body: commandsData,
        });

        logger.info(`Successfully reloaded application (/) commands`);
    } catch (error: any) {
        logger.error(`${error.name} - ${error.message}`);
    }
}
