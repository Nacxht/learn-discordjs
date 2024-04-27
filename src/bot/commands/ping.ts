import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export const ping = {
	cooldown: 2,
	data: new SlashCommandBuilder().setName("ping").setDescription(`Replies with "pong!"`),

	async execute(interaction: CommandInteraction) {
		return interaction.reply(`pong!`);
	},
};
