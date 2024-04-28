import { PermissionFlagsBits, SlashCommandBuilder, CommandInteraction } from "discord.js";

export const ban = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member")
        .addUserOption((option) =>
            option.setName("target").setDescription("The member to ban").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("reason").setDescription("The reason for banning")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction: CommandInteraction) {
        const data = {
            target: interaction.options.getUser("target", true),
            reason: interaction.options.get("reason")?.value || "No reason provided",
        };

        await interaction.reply(`Banning ${data.target.username} for reason ${data.reason}`);
        await interaction.guild?.members.ban(data.target);
    },
};
