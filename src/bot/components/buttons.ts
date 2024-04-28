import { ButtonBuilder, ButtonStyle } from "discord.js";

export class Button {
    customId: string;
    label: string;
    isDisable: boolean;

    constructor(customId: string, label: string, isDisable?: boolean) {
        this.customId = customId;
        this.label = label;
        this.isDisable = isDisable || false;
    }

    async buttonPrimary() {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel(this.label)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(this.isDisable);
    }

    async buttonSecondary() {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel(this.label)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(this.isDisable);
    }

    async buttonSuccess() {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel(this.label)
            .setStyle(ButtonStyle.Success)
            .setDisabled(this.isDisable);
    }

    async buttonDanger() {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel(this.label)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(this.isDisable);
    }

    async buttonLink(url: string) {
        return new ButtonBuilder()
            .setCustomId(this.customId)
            .setLabel(this.label)
            .setStyle(ButtonStyle.Link)
            .setDisabled(this.isDisable)
            .setURL(url);
    }
}
