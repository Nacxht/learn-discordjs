import {
    SlashCommandBuilder,
    CommandInteraction,
    SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export const ping = {
    data: new SlashCommandBuilder().setName("ping").setDescription(`Replies with "pong!"`),

    async execute(interaction: CommandInteraction) {
        return interaction.reply(`pong!`);
    },
};

export const stringInput = {
    data: new SlashCommandBuilder()
        .setName("string_input")
        .setDescription("Reply with your input")
        .addStringOption((option) =>
            option.setName("input").setDescription("The input to echo back").setRequired(true)
        ),

    async execute(interaction: CommandInteraction) {
        const userInput = interaction.options.get("input", true);
        return interaction.reply(`${userInput.value}`);
    },
};

export const choices = {
    data: new SlashCommandBuilder()
        .setName("choices")
        .setDescription("Reply with your choices")
        .addStringOption((option) =>
            option
                .setName("category")
                .setDescription("The choice to echo back")
                .setRequired(true)
                .addChoices(
                    { name: "Babi", value: `You choose "Babi"` },
                    { name: "Ordal", value: `You choose "Ordal"` },
                    { name: "No Way", value: `You choose "Yes Way"` }
                )
        ),

    async execute(interaction: CommandInteraction) {
        const userInput = interaction.options.get("category");

        return interaction.reply(`${userInput?.value}`);
    },
};

export const info = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get information about a user or a server!")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("user")
                .setDescription("Info about a user")
                .addUserOption((option) => option.setName("target").setDescription("The user"))
        )
        .addSubcommand((subCommand) =>
            subCommand.setName("server").setDescription("Info about the server")
        ),

    async execute(interaction: CommandInteraction) {
        const subCommand = interaction.options.get("Subcommand");
        console.log(subCommand);
    },
};
