import {
    PermissionFlagsBits,
    SlashCommandBuilder,
    CommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
} from "discord.js";
import { Button } from "../components/buttons.js";

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

        const confirm = await new Button("confirm", "Confirm Ban").buttonDanger();
        const cancel = await new Button("cacncel", "Cancel").buttonSecondary();
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm);

        try {
            const response = await interaction.reply({
                content: `Are you sure want to ban ${data.target}\nFor reason "${data.reason}"?`,
                components: [row],
            });

            const confirmation = await response.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id,
                time: 60_000,
            });

            switch (confirmation.customId) {
                case "confirm":
                    await interaction.editReply({
                        content: `Banning ${data.target.username}\nFor reason: "${data.reason}"`,
                        components: [],
                    });
                    return interaction.guild?.members.ban(data.target);

                default:
                    return interaction.editReply({
                        content: `Cancelled to kicking ${data.target}`,
                        components: [],
                    });
            }
        } catch (error) {
            await interaction.editReply({
                content: `Confirmation not received within 1 minute, cancelling...`,
                components: [],
            });
        }

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

        const confirm = await new Button("confirm", "Confirm Kick").buttonDanger();
        const cancel = await new Button("cancel", "Cancel").buttonSecondary();
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm);

        try {
            const response = await interaction.reply({
                content: `Are you sure want to kick ${data.target}\nFor reason "${data.reason}"?`,
                components: [row],
            });

            const confirmation = await response.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id,
                time: 60_000,
            });

            switch (confirmation.customId) {
                case "confirm":
                    await interaction.editReply({
                        content: `Kicking ${data.target.username}\nFor reason: "${data.reason}"`,
                        components: [],
                    });
                    return interaction.guild?.members.kick(data.target);

                default:
                    return interaction.editReply({
                        content: `Cancelled to kicking ${data.target}`,
                        components: [],
                    });
            }
        } catch (error) {
            await interaction.editReply({
                content: `Confirmation not received within 1 minute, cancelling...`,
                components: [],
            });
        }
    },
};
