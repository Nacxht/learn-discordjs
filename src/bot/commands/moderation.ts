import { PermissionFlagsBits, SlashCommandBuilder, CommandInteraction } from "discord.js";

// Ban
export const ban = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a member")
        .addUserOption((option) => option.setName("target").setDescription("The member to ban").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("The reason for banning"))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction: CommandInteraction) {
        const data = {
            target: interaction.options.getUser("target", true),
            reason: interaction.options.get("reason")?.value || "No reason provided",
        };

        await interaction.reply(`Banning: ${data.target.username}\nFor reason: ${data.reason}`);
        return interaction.guild?.members.ban(data.target);
    },
};

// Kick
export const kick = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member")
        .addUserOption((option) => option.setName("target").setDescription("The member to kick").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("The reason for kicking"))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(interaction: CommandInteraction) {
        const data = {
            target: interaction.options.getUser("target", true),
            reason: interaction.options.get("reason")?.value || "No reason provided",
        };

        await interaction.reply(`Kicking: ${data.target.username}\nFor reason: ${data.reason}`);
        return interaction.guild?.members.kick(data.target);
    },
};
