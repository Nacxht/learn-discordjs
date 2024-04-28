import {
    SlashCommandBuilder,
    CommandInteraction,
    CommandInteractionOptionResolver,
    AutocompleteInteraction,
} from "discord.js";
import { SlashCommand } from "../../../types/slashCommand.js";

// Basic slash command
export const ping: SlashCommand = {
    data: new SlashCommandBuilder().setName("ping").setDescription(`Replies with "pong!"`),

    async execute(interaction: CommandInteraction) {
        return interaction.reply(`pong!`);
    },
};

// String input
export const stringInput: SlashCommand = {
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

// Choices
export const choices: SlashCommand = {
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

// Subcommands
export const info: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Get information about a user or a server!")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("user")
                .setDescription("Info about a user")
                .addUserOption((option) => option.setName("target").setDescription("The user").setRequired(true))
        )
        .addSubcommand((subCommand) => subCommand.setName("server").setDescription("Info about the server")),

    async execute(interaction: CommandInteraction) {
        const subCommand: string = (interaction.options as CommandInteractionOptionResolver).getSubcommand();

        switch (subCommand) {
            case "user":
                const user = interaction.options.getUser("target", true);
                return interaction.reply(`Username: ${user.username}\nUser Id: ${user.id}`);

            case "server":
                return interaction.reply(
                    `Server Name: ${interaction.guild?.name}\nTotal Members: ${interaction.guild?.memberCount}`
                );

            default:
                return interaction.reply(`No subcommands matching ${subCommand} was foound`);
        }
    },
};

// Autocomplete
export const autocomplete: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("autocomplete")
        .setDescription("A command with autocomplete")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("phrase to testing autocomplete")
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction: AutocompleteInteraction) {
        const focusedValue = interaction.options.getFocused();
        const choices = [
            { id: 1, value: "no way" },
            { id: 2, value: "yes way" },
            { id: 3, value: "bawakdehel" },
            { id: 4, value: "babi" },
            { id: 5, value: "nigg" },
            { id: 6, value: "suck my dig" },
            { id: 7, value: "ligma balls" },
        ];

        // const filtered = choices.filter(choice => choice.start)
        console.log(focusedValue);
    },

    async execute(interaction: CommandInteraction) {
        return interaction.reply(`Replied`);
    },
};
